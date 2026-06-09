# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import frappe
from frappe import _


def execute(filters=None):
    columns = [
        {"label": _("Customer"), "fieldname": "customer", "fieldtype": "Link", "options": "Event Customer", "width": 140},
        {"label": _("Total Events"), "fieldname": "total_events", "fieldtype": "Int", "width": 100},
        {"label": _("Total Spend"), "fieldname": "total_spend", "fieldtype": "Currency", "width": 120},
        {"label": _("Avg Booking Value"), "fieldname": "avg_value", "fieldtype": "Currency", "width": 120},
    ]
    data = frappe.db.sql("""
        SELECT customer, COUNT(*) as total_events, SUM(total_amount) as total_spend,
               AVG(total_amount) as avg_value
        FROM `tabVendor Booking`
        WHERE docstatus = 1
        GROUP BY customer
        ORDER BY total_spend DESC
    """, as_dict=True)
    return columns, data
