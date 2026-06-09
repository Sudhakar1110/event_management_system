from __future__ import unicode_literals
import frappe

def get_context(context):
    context.no_cache = 1
    customer = frappe.db.get_value("Event Customer", {"user": frappe.session.user})
    if customer:
        context.bookings = frappe.get_all("Vendor Booking",
            filters={"customer": customer},
            fields=["name", "booking_title", "vendor", "event_date", "booking_status", "total_amount", "paid_amount"],
            order_by="creation desc"
        )
    else:
        context.bookings = []
    return context
