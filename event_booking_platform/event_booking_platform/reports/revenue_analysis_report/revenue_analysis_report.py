# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import frappe
from frappe import _


def execute(filters=None):
    columns = [
        {"label": _("Month"), "fieldname": "month", "fieldtype": "Data", "width": 100},
        {"label": _("Gross Revenue"), "fieldname": "gross_revenue", "fieldtype": "Currency", "width": 120},
        {"label": _("GST"), "fieldname": "gst_amount", "fieldtype": "Currency", "width": 100},
        {"label": _("Net Revenue"), "fieldname": "net_revenue", "fieldtype": "Currency", "width": 120},
    ]
    data = frappe.db.sql("""
        SELECT DATE_FORMAT(event_date, '%%Y-%%m') as month,
               SUM(total_amount) as gross_revenue,
               SUM(gst_amount) as gst_amount,
               SUM(total_amount - gst_amount) as net_revenue
        FROM `tabVendor Booking`
        WHERE docstatus = 1
        GROUP BY DATE_FORMAT(event_date, '%%Y-%%m')
        ORDER BY month DESC
    """, as_dict=True)
    return columns, data
