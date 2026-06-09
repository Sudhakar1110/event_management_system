from __future__ import unicode_literals
import frappe

def get_context(context):
    context.no_cache = 1
    vendor_name = frappe.form_dict.get("vendor")
    vendor = frappe.get_doc("Vendor Profile", vendor_name)
    if vendor.status != "Active":
        frappe.throw("Vendor not found or inactive.", frappe.DoesNotExistError)
    context.vendor = vendor
    context.event_types = frappe.get_all("Event Type",
        filters={"is_active": 1},
        fields=["name", "event_type_name"]
    )
    return context
