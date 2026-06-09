from __future__ import unicode_literals
import frappe

def get_context(context):
    context.categories = frappe.get_all("Vendor Category",
        filters={"is_active": 1},
        fields=["name", "category_name"],
        order_by="sort_order asc"
    )
    return context
