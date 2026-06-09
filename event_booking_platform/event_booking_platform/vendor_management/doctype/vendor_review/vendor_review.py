# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import frappe
from frappe.model.document import Document
from frappe import _


class VendorReview(Document):

    def validate(self):
        self.validate_rating()

    def validate_rating(self):
        if self.rating < 1 or self.rating > 5:
            frappe.throw(_("Rating must be between 1 and 5."))

    def on_submit(self):
        self.update_vendor_rating()

    def on_cancel(self):
        self.update_vendor_rating()

    def update_vendor_rating(self):
        """Recalculate vendor's average rating."""
        _recalc_vendor_rating(self.vendor)


def update_vendor_rating(doc, method=None):
    """Standalone function for hooks.py doc_events."""
    _recalc_vendor_rating(doc.vendor)


def _recalc_vendor_rating(vendor):
    """Shared logic to recalculate vendor's average rating."""
    result = frappe.db.sql("""
        SELECT AVG(rating) as avg_rating, COUNT(name) as total
        FROM `tabVendor Review`
        WHERE vendor = %s AND docstatus = 1
    """, vendor, as_dict=True)
    if result:
        frappe.db.set_value("Vendor Profile", vendor, {
            "rating": round(result[0].avg_rating or 0, 1),
            "total_reviews": result[0].total or 0
        })
