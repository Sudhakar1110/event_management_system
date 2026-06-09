# -*- coding: utf-8 -*-
# fixtures/demo_data.py — Load realistic demo data
from __future__ import unicode_literals
import frappe
from frappe.utils import today, add_days


def load_demo_data():
    """Load complete demo dataset for EventSphere testing."""
    frappe.flags.ignore_permissions = True

    print("Loading EventSphere Demo Data...")

    try:
        customers = create_demo_customers()
        print("  Created {0} Event Customers".format(len(customers)))
    except Exception as e:
        print("  Error creating customers: {0}".format(str(e)))
        frappe.db.rollback()
        return

    try:
        vendors = create_demo_vendors()
        print("  Created {0} Vendor Profiles".format(len(vendors)))
    except Exception as e:
        print("  Error creating vendors: {0}".format(str(e)))
        frappe.db.rollback()
        return

    frappe.db.commit()
    print("Demo data loaded successfully!")


def create_demo_customers():
    customers = []
    demo_data = [
        {"full_name": "Priya Sharma", "email": "priya@example.com", "phone": "9876543210", "city": "Mumbai"},
        {"full_name": "Rohan Kapoor", "email": "rohan@example.com", "phone": "9876543211", "city": "Delhi"},
        {"full_name": "Anjali Gupta", "email": "anjali@example.com", "phone": "9876543212", "city": "Bangalore"},
        {"full_name": "Vikram Mehta", "email": "vikram@example.com", "phone": "9876543213", "city": "Hyderabad"},
        {"full_name": "Neha Patel", "email": "neha@example.com", "phone": "9876543214", "city": "Chennai"},
    ]
    for data in demo_data:
        if not frappe.db.exists("Event Customer", {"email": data["email"]}):
            doc = frappe.get_doc({"doctype": "Event Customer"} | data)
            doc.insert()
            customers.append(doc.name)
    return customers


def create_demo_vendors():
    vendors = []
    demo_data = [
        {"vendor_name": "The Grand Mahal", "vendor_category": "Wedding Hall", "city": "Mumbai", "state": "Maharashtra",
         "min_price": 350000, "contact_person": "Ramesh Patel", "email": "ramesh@grandmahal.in", "phone": "9876543210",
         "business_description": "Luxurious wedding hall in the heart of Mumbai.", "advance_required": 30, "status": "Active", "is_verified": 1},
        {"vendor_name": "Lens & Light Photography", "vendor_category": "Photographer", "city": "Delhi", "state": "Delhi",
         "min_price": 45000, "contact_person": "Aman Sharma", "email": "aman@lenslight.in", "phone": "9123456789",
         "business_description": "Award-winning wedding photographers.", "advance_required": 50, "status": "Active", "is_verified": 1},
        {"vendor_name": "Royal Caterers", "vendor_category": "Caterer", "city": "Bangalore", "state": "Karnataka",
         "min_price": 500, "contact_person": "Suresh Kumar", "email": "suresh@royalcaterers.in", "phone": "9988776655",
         "business_description": "Premium catering services.", "advance_required": 40, "status": "Active", "is_verified": 1},
        {"vendor_name": "Bloom & Blossom Decor", "vendor_category": "Decorator", "city": "Jaipur", "state": "Rajasthan",
         "min_price": 75000, "contact_person": "Meera Devi", "email": "meera@bloomdecor.in", "phone": "9876512345",
         "business_description": "Creative event decoration and design.", "advance_required": 30, "status": "Active", "is_verified": 0},
        {"vendor_name": "Glam Studio", "vendor_category": "Makeup Artist", "city": "Mumbai", "state": "Maharashtra",
         "min_price": 12000, "contact_person": "Kavita Singh", "email": "kavita@glamstudio.in", "phone": "9876549876",
         "business_description": "Professional bridal and event makeup.", "advance_required": 50, "status": "Active", "is_verified": 1},
    ]
    for data in demo_data:
        vendor_cat = frappe.db.get_value("Vendor Category", {"category_name": data["vendor_category"]})
        if vendor_cat:
            data["vendor_category"] = vendor_cat
        if not frappe.db.exists("Vendor Profile", {"email": data["email"]}):
            doc = frappe.get_doc({"doctype": "Vendor Profile", "price_unit": "Per Event"} | data)
            doc.insert()
            vendors.append(doc.name)
    return vendors
