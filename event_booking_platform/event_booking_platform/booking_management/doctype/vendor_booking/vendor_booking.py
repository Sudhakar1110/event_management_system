# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import frappe
from frappe import _
from frappe.model.document import Document
from frappe.utils import flt, getdate, today


class VendorBooking(Document):

    def validate(self):
        self.validate_dates()
        self.validate_vendor_availability()
        self.calculate_amounts()
        self.set_payment_status()

    def validate_dates(self):
        if self.event_date and getdate(self.event_date) < getdate(today()):
            frappe.throw(_("Event Date cannot be in the past."))
        if self.event_end_date and self.event_date:
            if getdate(self.event_end_date) < getdate(self.event_date):
                frappe.throw(_("Event End Date must be on or after Event Date."))

    def validate_vendor_availability(self):
        if not self.vendor or not self.event_date:
            return
        blocked = frappe.db.exists("Vendor Availability", {
            "vendor": self.vendor,
            "date": self.event_date,
            "status": "Blocked"
        })
        if blocked:
            frappe.throw(_(
                "Vendor {0} is not available on {1}. Please choose another date."
            ).format(self.vendor, self.event_date))
        overlap = frappe.db.sql("""
            SELECT name FROM `tabVendor Booking`
            WHERE vendor = %(vendor)s
              AND event_date = %(event_date)s
              AND booking_status IN ('Confirmed', 'In Progress')
              AND name != %(name)s
              AND docstatus = 1
        """, {"vendor": self.vendor, "event_date": self.event_date, "name": self.name or ""})
        if overlap:
            frappe.throw(_(
                "Vendor {0} already has a confirmed booking on {1}. Booking: {2}"
            ).format(self.vendor, self.event_date, overlap[0][0]))

    def calculate_amounts(self):
        base = flt(self.base_amount)
        discount_pct = flt(self.discount_percent)
        gst_pct = flt(self.gst_percent, 18)

        discount_amt = base * discount_pct / 100.0
        taxable = base - discount_amt
        gst_amt = taxable * gst_pct / 100.0
        total = taxable + gst_amt

        self.discount_amount = discount_amt
        self.taxable_amount = taxable
        self.gst_amount = gst_amt
        self.total_amount = total

        adv_pct = flt(self.advance_percent)
        self.advance_amount = total * adv_pct / 100.0

        paid = frappe.db.sql("""
            SELECT COALESCE(SUM(amount), 0) FROM `tabBooking Payment`
            WHERE booking = %s AND docstatus = 1 AND status = 'Completed'
        """, self.name)[0][0]
        self.paid_amount = flt(paid)
        self.balance_amount = total - flt(paid)

    def set_payment_status(self):
        total = flt(self.total_amount)
        paid = flt(self.paid_amount)
        if total == 0:
            self.payment_status = "Unpaid"
        elif paid >= total:
            self.payment_status = "Fully Paid"
        elif paid > 0:
            self.payment_status = "Partially Paid"
        else:
            self.payment_status = "Unpaid"

    def before_submit(self):
        if self.booking_status not in ("Confirmed", "Completed"):
            frappe.throw(_("Only Confirmed or Completed bookings can be submitted."))

    def on_submit(self):
        self.create_vendor_availability_block()

    def on_cancel(self):
        self.remove_vendor_availability_block()
        self.booking_status = "Cancelled"
        self.save(ignore_permissions=True)

    def create_vendor_availability_block(self):
        if not frappe.db.exists("Vendor Availability", {
            "vendor": self.vendor,
            "date": self.event_date,
            "reference_booking": self.name
        }):
            doc = frappe.get_doc({
                "doctype": "Vendor Availability",
                "vendor": self.vendor,
                "date": self.event_date,
                "status": "Booked",
                "reference_booking": self.name,
                "notes": "Booked for {0}".format(self.booking_title)
            })
            doc.insert(ignore_permissions=True)

    def remove_vendor_availability_block(self):
        name = frappe.db.get_value("Vendor Availability", {
            "vendor": self.vendor,
            "reference_booking": self.name
        })
        if name:
            frappe.delete_doc("Vendor Availability", name, ignore_permissions=True)


@frappe.whitelist()
def get_vendor_packages(vendor):
    return frappe.get_all(
        "Vendor Package",
        filters={"vendor": vendor, "is_active": 1},
        fields=["name", "package_name", "price", "description", "inclusions"]
    )


@frappe.whitelist()
def check_vendor_availability(vendor, event_date):
    blocked = frappe.db.exists("Vendor Availability", {
        "vendor": vendor, "date": event_date, "status": ["in", ["Blocked", "Booked"]]
    })
    return {"available": not blocked}


@frappe.whitelist()
def get_booking_summary(booking_name):
    doc = frappe.get_doc("Vendor Booking", booking_name)
    frappe.has_permission("Vendor Booking", "read", doc=doc, throw=True)
    return {
        "name": doc.name,
        "booking_title": doc.booking_title,
        "status": doc.booking_status,
        "event_date": str(doc.event_date) if doc.event_date else None,
        "vendor": doc.vendor,
        "total_amount": doc.total_amount,
        "paid_amount": doc.paid_amount,
        "balance_amount": doc.balance_amount,
        "payment_status": doc.payment_status,
    }
