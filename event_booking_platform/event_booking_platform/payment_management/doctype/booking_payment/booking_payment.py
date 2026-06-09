# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
from frappe import _


class BookingPayment(Document):

    def validate(self):
        self.validate_amount()
        self.set_vendor_from_booking()

    def validate_amount(self):
        if self.amount <= 0:
            frappe.throw(_("Payment amount must be greater than zero."))

    def set_vendor_from_booking(self):
        if self.booking and not self.vendor:
            vendor = frappe.db.get_value("Vendor Booking", self.booking, "vendor")
            if vendor:
                self.vendor = vendor

    def on_submit(self):
        """Called from hooks.py - update booking paid amount."""
        self.update_booking_payment_status()

    def on_cancel(self):
        """Called from hooks.py - recalculate paid amount."""
        self.update_booking_payment_status()

    def update_booking_payment_status(self):
        """Recalculate paid amount for the linked booking."""
        if self.booking:
            booking = frappe.get_doc("Vendor Booking", self.booking)
            booking.calculate_amounts()
            booking.set_payment_status()
            booking.save(ignore_permissions=True)
