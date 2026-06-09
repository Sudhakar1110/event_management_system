# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import frappe
from frappe import _


def execute(filters=None):
    columns = [
        {"label": _("Date"), "fieldname": "payment_date", "fieldtype": "Date", "width": 100},
        {"label": _("Booking"), "fieldname": "booking", "fieldtype": "Link", "options": "Vendor Booking", "width": 130},
        {"label": _("Customer"), "fieldname": "customer", "fieldtype": "Data", "width": 140},
        {"label": _("Amount"), "fieldname": "amount", "fieldtype": "Currency", "width": 110},
        {"label": _("Mode"), "fieldname": "payment_mode", "fieldtype": "Data", "width": 100},
        {"label": _("Status"), "fieldname": "status", "fieldtype": "Data", "width": 100},
    ]
    data = frappe.db.sql("""
        SELECT payment_date, booking, customer, amount, payment_mode, status
        FROM `tabBooking Payment`
        WHERE docstatus = 1
        ORDER BY payment_date DESC
    """, as_dict=True)
    return columns, data
