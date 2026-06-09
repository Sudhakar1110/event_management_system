# -*- coding: utf-8 -*-
# validators.py — Shared Validation Utilities
from __future__ import unicode_literals
import frappe
from frappe import _
from frappe.utils import flt, getdate, today


def validate_event_dates(event_date, event_end_date=None):
    """Validate event date is not in the past and end date is after start date."""
    if event_date and getdate(event_date) < getdate(today()):
        frappe.throw(_("Event Date cannot be in the past."))
    if event_end_date and event_date:
        if getdate(event_end_date) < getdate(event_date):
            frappe.throw(_("Event End Date must be on or after Event Date."))


def validate_rating(rating):
    """Validate rating is between 1 and 5."""
    rating = flt(rating)
    if rating < 1 or rating > 5:
        frappe.throw(_("Rating must be between 1 and 5."))
    return rating


def validate_payment_mode(mode):
    """Validate payment mode is supported."""
    valid_modes = ["UPI", "Credit Card", "Debit Card", "Net Banking", "Cash", "Cheque", "Bank Transfer"]
    if mode not in valid_modes:
        frappe.throw(_("Invalid payment mode: {0}").format(mode))
