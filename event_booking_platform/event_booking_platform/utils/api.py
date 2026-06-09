# -*- coding: utf-8 -*-
# api.py — Public Whitelisted API Endpoints
from __future__ import unicode_literals
import frappe
from frappe import _
from frappe.utils import cint, flt


@frappe.whitelist(allow_guest=True)
def search_vendors(
    category=None,
    city=None,
    min_price=None,
    max_price=None,
    rating=None,
    event_date=None,
    search_text=None,
    page=1,
    page_size=12
):
    """
    Public vendor search API — used by portal and website pages.
    Returns paginated list of active, verified vendors.
    """
    page = cint(page) or 1
    page_size = min(cint(page_size) or 12, 50)
    offset = (page - 1) * page_size

    conditions = ["vp.status = 'Active'"]
    params = {}

    if category:
        conditions.append("vp.vendor_category = %(category)s")
        params["category"] = category

    if city:
        conditions.append("vp.city LIKE %(city)s")
        params["city"] = "%{0}%".format(city)

    if min_price:
        conditions.append("vp.min_price >= %(min_price)s")
        params["min_price"] = flt(min_price)

    if max_price:
        conditions.append("(vp.max_price <= %(max_price)s OR vp.max_price IS NULL)")
        params["max_price"] = flt(max_price)

    if rating:
        conditions.append("vp.rating >= %(rating)s")
        params["rating"] = flt(rating)

    if search_text:
        conditions.append("""(
            vp.vendor_name LIKE %(search_text)s OR
            vp.city LIKE %(search_text)s OR
            vp.business_description LIKE %(search_text)s
        )""")
        params["search_text"] = "%{0}%".format(search_text)

    if event_date:
        conditions.append("""vp.name NOT IN (
            SELECT vendor FROM `tabVendor Availability`
            WHERE date = %(event_date)s AND status IN ('Blocked','Booked')
        )""")
        params["event_date"] = event_date

    where_clause = " AND ".join(conditions)

    vendors = frappe.db.sql("""
        SELECT
            vp.name, vp.vendor_name, vp.vendor_category, vp.profile_image,
            vp.city, vp.state, vp.min_price, vp.max_price, vp.price_unit,
            vp.rating, vp.total_reviews, vp.is_verified,
            vp.years_in_business, vp.business_description
        FROM `tabVendor Profile` vp
        WHERE {0}
        ORDER BY vp.rating DESC, vp.total_reviews DESC
        LIMIT %(limit)s OFFSET %(offset)s
    """.format(where_clause), params, as_dict=True)

    params["limit"] = page_size
    params["offset"] = offset

    total_count = frappe.db.sql("""
        SELECT COUNT(*) FROM `tabVendor Profile` vp
        WHERE {0}
    """.format(where_clause), params)[0][0]

    return {
        "vendors": vendors,
        "total": total_count,
        "page": page,
        "page_size": page_size,
        "total_pages": max(1, (total_count + page_size - 1) // page_size)
    }


@frappe.whitelist(allow_guest=True)
def get_vendor_detail(vendor_name):
    """Get full vendor profile including packages, gallery and reviews."""
    vendor = frappe.get_doc("Vendor Profile", vendor_name)
    if vendor.status != "Active":
        frappe.throw(_("Vendor not found or inactive."), frappe.DoesNotExistError)

    reviews = frappe.get_all(
        "Vendor Review",
        filters={"vendor": vendor_name, "docstatus": 1},
        fields=["reviewer_name", "rating", "review_title", "review_text",
                "event_type", "event_date", "helpful_count", "creation"],
        order_by="creation desc",
        limit=10
    )
    packages = frappe.get_all(
        "Vendor Package",
        filters={"vendor": vendor_name, "is_active": 1},
        fields=["name", "package_name", "price", "description",
                "duration", "max_guests", "inclusions"]
    )
    return {
        "vendor": vendor.as_dict(),
        "packages": packages,
        "reviews": reviews,
    }


@frappe.whitelist()
def create_booking(vendor, event_date, event_type, guest_count,
                   package=None, total_budget=None, special_requirements=None):
    """Create a new booking from the portal."""
    frappe.has_permission("Vendor Booking", "create", throw=True)

    customer = frappe.db.get_value(
        "Event Customer", {"user": frappe.session.user}
    )
    if not customer:
        frappe.throw(_("Please complete your customer profile first."))

    vendor_doc = frappe.get_doc("Vendor Profile", vendor)

    booking = frappe.get_doc({
        "doctype": "Vendor Booking",
        "booking_title": "{0} — {1}".format(vendor_doc.vendor_name, event_date),
        "customer": customer,
        "vendor": vendor,
        "event_date": event_date,
        "event_type": event_type,
        "guest_count": cint(guest_count),
        "package": package,
        "base_amount": flt(total_budget) or vendor_doc.min_price,
        "special_requirements": special_requirements,
        "advance_percent": vendor_doc.advance_required or 30,
        "booking_status": "Draft",
        "gst_percent": 18
    })
    booking.insert(ignore_permissions=False)
    return {"booking": booking.name, "status": "created"}


@frappe.whitelist()
def toggle_wishlist(vendor):
    """Add or remove a vendor from the customer's wishlist."""
    customer = frappe.db.get_value(
        "Event Customer", {"user": frappe.session.user}
    )
    if not customer:
        frappe.throw(_("Customer profile not found."))

    existing = frappe.db.get_value(
        "Vendor Wishlist", {"customer": customer, "vendor": vendor}
    )
    if existing:
        frappe.delete_doc("Vendor Wishlist", existing, ignore_permissions=True)
        return {"action": "removed"}
    else:
        frappe.get_doc({
            "doctype": "Vendor Wishlist",
            "customer": customer,
            "vendor": vendor
        }).insert(ignore_permissions=True)
        return {"action": "added"}


@frappe.whitelist()
def submit_review(vendor, booking, rating, review_title, review_text, event_type=None):
    """Submit a review for a completed booking."""
    if cint(rating) < 1 or cint(rating) > 5:
        frappe.throw(_("Rating must be between 1 and 5."))

    customer = frappe.db.get_value(
        "Event Customer", {"user": frappe.session.user}
    )
    booking_customer = frappe.db.get_value("Vendor Booking", booking, "customer")
    if booking_customer != customer:
        frappe.throw(_("You can only review your own bookings."))

    if frappe.db.exists("Vendor Review", {"booking": booking}):
        frappe.throw(_("You have already reviewed this booking."))

    review = frappe.get_doc({
        "doctype": "Vendor Review",
        "vendor": vendor,
        "booking": booking,
        "customer": customer,
        "reviewer_name": frappe.db.get_value("Event Customer", customer, "full_name"),
        "rating": cint(rating),
        "review_title": review_title,
        "review_text": review_text,
        "event_type": event_type
    })
    review.insert(ignore_permissions=False)
    review.submit()
    return {"review": review.name, "status": "submitted"}


def has_app_permission():
    """Permission check for app access."""
    return frappe.has_permission("Vendor Booking", "read")
