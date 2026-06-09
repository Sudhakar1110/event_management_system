# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
from frappe import _


class RefundRequest(Document):

    def validate(self):
        if self.amount <= 0:
            frappe.throw(_("Refund amount must be greater than zero."))

    def on_submit(self):
        """Update the linked booking's payment status after refund."""
        if self.status not in ("Approved", "Processed"):
            frappe.throw(_("Only Approved or Processed refunds can be submitted."))
