# -*- coding: utf-8 -*-
# notifications.py — Event Notification Utilities
from __future__ import unicode_literals
import frappe
from frappe import _


def booking_created(doc, method=None):
    """Called after_insert of Vendor Booking."""
    pass


def send_booking_confirmation(booking):
    """Send booking confirmation email - enqueued from on_submit."""
    try:
        doc = frappe.get_doc("Vendor Booking", booking)
        customer_email = frappe.db.get_value("Event Customer", doc.customer, "email")
        if customer_email:
            frappe.sendmail(
                recipients=[customer_email],
                subject=_("Booking Confirmed: {0}").format(doc.booking_title),
                template="booking_confirmation",
                args={"doc": doc},
                delayed=False,
            )
    except Exception as e:
        frappe.log_error(f"Failed to send booking confirmation for {booking}: {str(e)}", "Event Booking Notification")


def send_payment_receipt(payment):
    """Send payment receipt email."""
    try:
        doc = frappe.get_doc("Booking Payment", payment)
        customer_email = frappe.db.get_value("Event Customer", doc.customer, "email")
        if customer_email:
            frappe.sendmail(
                recipients=[customer_email],
                subject=_("Payment Received: {0}").format(doc.amount),
                template="payment_receipt",
                args={"doc": doc},
                delayed=False,
            )
    except Exception as e:
        frappe.log_error(f"Failed to send payment receipt for {payment}: {str(e)}", "Event Booking Notification")


def send_cancellation_notice(booking):
    """Send cancellation notification."""
    try:
        doc = frappe.get_doc("Vendor Booking", booking)
        customer_email = frappe.db.get_value("Event Customer", doc.customer, "email")
        vendor_email = frappe.db.get_value("Vendor Profile", doc.vendor, "email")
        recipients = [e for e in [customer_email, vendor_email] if e]
        if recipients:
            frappe.sendmail(
                recipients=recipients,
                subject=_("Booking Cancelled: {0}").format(doc.booking_title),
                template="cancellation_notice",
                args={"doc": doc},
                delayed=False,
            )
    except Exception as e:
        frappe.log_error(f"Failed to send cancellation notice for {booking}: {str(e)}", "Event Booking Notification")
