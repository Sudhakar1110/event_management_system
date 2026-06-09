# -*- coding: utf-8 -*-
# calculations.py — Booking & Payment Calculation Utilities
from __future__ import unicode_literals
import frappe
from frappe.utils import flt


def calculate_booking_amounts(base_amount, discount_percent=0, gst_percent=18):
    """Calculate complete breakdown of booking amounts."""
    base = flt(base_amount)
    discount_pct = flt(discount_percent)
    gst_pct = flt(gst_percent)

    discount_amt = base * discount_pct / 100.0
    taxable = base - discount_amt
    gst_amt = taxable * gst_pct / 100.0
    total = taxable + gst_amt

    return {
        "base_amount": base,
        "discount_percent": discount_pct,
        "discount_amount": discount_amt,
        "taxable_amount": taxable,
        "gst_percent": gst_pct,
        "gst_amount": gst_amt,
        "total_amount": total,
    }


def calculate_advance_amount(total_amount, advance_percent=30):
    """Calculate advance amount based on percentage of total."""
    return flt(total_amount) * flt(advance_percent) / 100.0


def calculate_paid_amount(booking_name):
    """Get total paid amount from submitted payments for a booking."""
    paid = frappe.db.sql("""
        SELECT COALESCE(SUM(amount), 0)
        FROM `tabBooking Payment`
        WHERE booking = %s AND docstatus = 1 AND status = 'Completed'
    """, booking_name)[0][0]
    return flt(paid)


def calculate_balance_amount(total_amount, paid_amount):
    """Calculate remaining balance."""
    return flt(total_amount) - flt(paid_amount)


def get_payment_status(total_amount, paid_amount):
    """Determine payment status based on amounts."""
    total = flt(total_amount)
    paid = flt(paid_amount)
    if total == 0:
        return "Unpaid"
    elif paid >= total:
        return "Fully Paid"
    elif paid > 0:
        return "Partially Paid"
    else:
        return "Unpaid"
