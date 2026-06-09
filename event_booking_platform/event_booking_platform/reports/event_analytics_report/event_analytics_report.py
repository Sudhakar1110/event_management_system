# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import frappe
from frappe import _


def execute(filters=None):
    columns = [
        {"label": _("Event Type"), "fieldname": "event_type", "fieldtype": "Link", "options": "Event Type", "width": 130},
        {"label": _("Month"), "fieldname": "month", "fieldtype": "Data", "width": 80},
        {"label": _("Total Events"), "fieldname": "total_events", "fieldtype": "Int", "width": 100},
        {"label": _("Avg Budget"), "fieldname": "avg_budget", "fieldtype": "Currency", "width": 120},
    ]
    data = frappe.db.sql("""
        SELECT et.event_type_name as event_type,
               DATE_FORMAT(er.event_date, '%%Y-%%m') as month,
               COUNT(*) as total_events,
               AVG(er.total_budget) as avg_budget
        FROM `tabEvent Request` er
        JOIN `tabEvent Type` et ON er.event_type = et.name
        GROUP BY et.event_type_name, DATE_FORMAT(er.event_date, '%%Y-%%m')
        ORDER BY month DESC, total_events DESC
    """, as_dict=True)
    return columns, data
