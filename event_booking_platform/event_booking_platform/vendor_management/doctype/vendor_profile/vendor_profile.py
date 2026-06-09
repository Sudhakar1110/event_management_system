# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import frappe
from frappe import _
from frappe.model.document import Document


class VendorProfile(Document):

    def validate(self):
        self.validate_prices()
        self.set_title()

    def validate_prices(self):
        if self.min_price and self.max_price and self.min_price > self.max_price:
            frappe.throw(_("Minimum Price cannot be greater than Maximum Price."))

    def set_title(self):
        self.title = self.vendor_name

    def after_insert(self):
        """Called from hooks.py"""
        pass

    def on_update(self):
        """Called from hooks.py"""
        pass


@frappe.whitelist()
def get_vendor_by_user(user=None):
    """Get vendor profile linked to the current user."""
    user = user or frappe.session.user
    vendor = frappe.db.get_value("Vendor Profile", {"user": user}, "name")
    return vendor


@frappe.whitelist()
def get_vendor_booking_stats(vendor_name):
    """Get booking statistics for a vendor."""
    stats = frappe.db.sql("""
        SELECT
            COUNT(*) as total_bookings,
            SUM(CASE WHEN booking_status = 'Completed' THEN 1 ELSE 0 END) as completed,
            SUM(CASE WHEN booking_status = 'Confirmed' THEN 1 ELSE 0 END) as confirmed,
            SUM(CASE WHEN booking_status = 'Cancelled' THEN 1 ELSE 0 END) as cancelled,
            COALESCE(SUM(total_amount), 0) as total_revenue
        FROM `tabVendor Booking`
        WHERE vendor = %s AND docstatus = 1
    """, vendor_name, as_dict=True)[0]

    return {
        "total_bookings": stats.total_bookings or 0,
        "completed": stats.completed or 0,
        "confirmed": stats.confirmed or 0,
        "cancelled": stats.cancelled or 0,
        "total_revenue": stats.total_revenue or 0
    }
