# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import frappe
from frappe import _


def execute(filters=None):
    columns = get_columns()
    data = get_data(filters)
    chart = get_chart(data)
    summary = get_summary(data)
    return columns, data, None, chart, summary


def get_columns():
    return [
        {"label": _("Booking ID"), "fieldname": "name", "fieldtype": "Link", "options": "Vendor Booking", "width": 130},
        {"label": _("Booking Title"), "fieldname": "booking_title", "fieldtype": "Data", "width": 180},
        {"label": _("Customer"), "fieldname": "customer", "fieldtype": "Link", "options": "Event Customer", "width": 140},
        {"label": _("Vendor"), "fieldname": "vendor", "fieldtype": "Link", "options": "Vendor Profile", "width": 160},
        {"label": _("Vendor Category"), "fieldname": "vendor_category", "fieldtype": "Link", "options": "Vendor Category", "width": 140},
        {"label": _("Event Type"), "fieldname": "event_type", "fieldtype": "Link", "options": "Event Type", "width": 120},
        {"label": _("Event Date"), "fieldname": "event_date", "fieldtype": "Date", "width": 100},
        {"label": _("Total Amount"), "fieldname": "total_amount", "fieldtype": "Currency", "width": 120},
        {"label": _("Paid Amount"), "fieldname": "paid_amount", "fieldtype": "Currency", "width": 110},
        {"label": _("Balance"), "fieldname": "balance_amount", "fieldtype": "Currency", "width": 110},
        {"label": _("Booking Status"), "fieldname": "booking_status", "fieldtype": "Data", "width": 120},
        {"label": _("Payment Status"), "fieldname": "payment_status", "fieldtype": "Data", "width": 120},
    ]


def get_data(filters):
    conditions = build_conditions(filters)
    return frappe.db.sql("""
        SELECT vb.name, vb.booking_title, vb.customer, vb.vendor, vp.vendor_category,
               vb.event_type, vb.event_date, vb.total_amount, vb.paid_amount,
               vb.balance_amount, vb.booking_status, vb.payment_status
        FROM `tabVendor Booking` vb
        LEFT JOIN `tabVendor Profile` vp ON vb.vendor = vp.name
        WHERE vb.docstatus IN (0,1) {0}
        ORDER BY vb.event_date DESC
    """.format(conditions), filters, as_dict=True)


def build_conditions(filters):
    conditions = []
    if filters:
        if filters.get("from_date"):
            conditions.append("AND vb.event_date >= %(from_date)s")
        if filters.get("to_date"):
            conditions.append("AND vb.event_date <= %(to_date)s")
        if filters.get("vendor"):
            conditions.append("AND vb.vendor = %(vendor)s")
        if filters.get("customer"):
            conditions.append("AND vb.customer = %(customer)s")
        if filters.get("booking_status"):
            conditions.append("AND vb.booking_status = %(booking_status)s")
    return " ".join(conditions)


def get_chart(data):
    if not data:
        return None
    monthly = {}
    for row in data:
        if row.event_date:
            key = str(row.event_date)[:7]
            monthly[key] = monthly.get(key, 0) + (row.total_amount or 0)
    months = sorted(monthly.keys())
    return {
        "data": {"labels": months, "datasets": [{"name": _("Revenue"), "values": [monthly[m] for m in months]}]},
        "type": "bar",
        "fieldtype": "Currency",
        "colors": ["#7c3aed"]
    }


def get_summary(data):
    return [
        {"label": _("Total Bookings"), "value": len(data), "datatype": "Int", "indicator": "Blue"},
        {"label": _("Total Revenue"), "value": sum((r.total_amount or 0) for r in data), "datatype": "Currency", "indicator": "Green"},
        {"label": _("Amount Collected"), "value": sum((r.paid_amount or 0) for r in data), "datatype": "Currency", "indicator": "Green"},
        {"label": _("Amount Pending"), "value": sum((r.balance_amount or 0) for r in data), "datatype": "Currency", "indicator": "Orange"},
    ]
