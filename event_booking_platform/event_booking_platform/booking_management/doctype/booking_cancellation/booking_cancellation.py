# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
from frappe import _


class BookingCancellation(Document):
    def on_submit(self):
        """Update the original booking status to Cancelled."""
        if self.booking:
            booking = frappe.get_doc("Vendor Booking", self.booking)
            booking.booking_status = "Cancelled"
            booking.save(ignore_permissions=True)

    def validate(self):
        if self.refund_amount < 0:
            frappe.throw(_("Refund amount cannot be negative."))
