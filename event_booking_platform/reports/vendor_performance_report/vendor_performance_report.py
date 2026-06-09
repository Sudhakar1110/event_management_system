# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import frappe
from frappe import _


def execute(filters=None):
    columns = [
        {"label": _("Vendor"), "fieldname": "vendor", "fieldtype": "Link", "options": "Vendor Profile", "width": 160},
        {"label": _("Category"), "fieldname": "vendor_category", "fieldtype": "Data", "width": 120},
        {"label": _("Total Bookings"), "fieldname": "total_bookings", "fieldtype": "Int", "width": 110},
        {"label": _("Revenue"), "fieldname": "total_revenue", "fieldtype": "Currency", "width": 120},
        {"label": _("Avg Rating"), "fieldname": "rating", "fieldtype": "Float", "width": 90, "precision": 1},
        {"label": _("Cancellations"), "fieldname": "cancellations", "fieldtype": "Int", "width": 110},
    ]
    data = frappe.db.sql("""
        SELECT vp.name as vendor, vp.vendor_category, vp.rating,
               COALESCE(book.total_bookings, 0) as total_bookings,
               COALESCE(book.total_revenue, 0) as total_revenue,
               COALESCE(cancel.cancellations, 0) as cancellations
        FROM `tabVendor Profile` vp
        LEFT JOIN (
            SELECT vendor, COUNT(*) as total_bookings, SUM(total_amount) as total_revenue
            FROM `tabVendor Booking` WHERE docstatus = 1 GROUP BY vendor
        ) book ON vp.name = book.vendor
        LEFT JOIN (
            SELECT vendor, COUNT(*) as cancellations
            FROM `tabVendor Booking` WHERE booking_status = 'Cancelled' GROUP BY vendor
        ) cancel ON vp.name = cancel.vendor
        WHERE vp.status = 'Active'
        ORDER BY total_revenue DESC
    """, as_dict=True)
    return columns, data
