# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import frappe
from frappe import _
from frappe.model.document import Document
from frappe.utils import getdate, today


class EventRequest(Document):

    def validate(self):
        self.validate_dates()

    def validate_dates(self):
        if self.event_date and getdate(self.event_date) < getdate(today()):
            frappe.throw(_("Event Date cannot be in the past."))
        if self.event_end_date and self.event_date and getdate(self.event_end_date) < getdate(self.event_date):
            frappe.throw(_("Event End Date must be on or after Event Date."))
