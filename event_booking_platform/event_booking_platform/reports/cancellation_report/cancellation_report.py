# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import frappe
from frappe import _


def execute(filters=None):
    columns = [
        {"label": _("Booking"), "fieldname": "name", "fieldtype": "Link", "options": "Booking Cancellation", "width": 130},
        {"label": _("Customer"), "fieldname": "customer", "fieldtype": "Link", "options": "Event Customer", "width": 140},
        {"label": _("Vendor"), "fieldname": "vendor", "fieldtype": "Link", "options": "Vendor Profile", "width": 160},
        {"label": _("Cancellation Date"), "fieldname": "cancellation_date", "fieldtype": "Date", "width": 120},
        {"label": _("Status"), "fieldname": "status", "fieldtype": "Data", "width": 100},
    ]
    data = frappe.db.sql("""
        SELECT name, customer, vendor, cancellation_date, status
        FROM `tabBooking Cancellation`
        ORDER BY creation DESC
    """, as_dict=True)
    return columns, data
