# hooks.py — Event Booking Platform
app_name = "event_booking_platform"
app_title = "Event Booking Platform"
app_publisher = "Your Company"
app_description = "Complete Event Booking Marketplace for Frappe/ERPNext v15+"
app_email = "support@yourcompany.com"
app_license = "MIT"
app_version = "1.0.0"
required_apps = ["frappe", "erpnext"]

# ──────────────────────────────────────────
# App Screens / Onboarding
# ──────────────────────────────────────────
add_to_apps_screen = [
    {
        "name": "event_booking_platform",
        "logo": "/assets/event_booking_platform/images/logo.png",
        "title": "Event Booking",
        "route": "/event-booking",
        "has_permission": "event_booking_platform.utils.api.has_app_permission"
    }
]

# ──────────────────────────────────────────
# Fixtures
# ──────────────────────────────────────────
fixtures = [
    {"dt": "Role", "filters": [["role_name", "like", "Event Booking%"]]},
    {"dt": "Role", "filters": [["role_name", "=", "Vendor"]]},
    {"dt": "Role", "filters": [["role_name", "=", "Event Customer"]]},
    {"dt": "Workflow", "filters": [["module", "=", "Event Booking Platform"]]},
    {"dt": "Workflow State", "filters": [
        ["workflow_state_name", "in", [
            "Draft","Requested","Confirmed","In Progress",
            "Completed","Cancelled","Pending Approval","Active","Suspended"
        ]]
    ]},
    {"dt": "Workflow Action Master", "filters": [
        ["name", "in", [
            "Submit Request","Confirm Booking","Reject","Start Event",
            "Complete","Cancel","Approve Vendor","Suspend","Reactivate"
        ]]
    ]},
    {"dt": "Notification", "filters": [["module", "=", "Event Booking Platform"]]},
    {"dt": "Email Template", "filters": [["module", "=", "Event Booking Platform"]]},
    {"dt": "Print Format", "filters": [["module", "=", "Event Booking Platform"]]},
    {"dt": "Workspace", "filters": [["module", "=", "Event Booking Platform"]]},
    {"dt": "Dashboard Chart", "filters": [["module", "=", "Event Booking Platform"]]},
    {"dt": "Number Card", "filters": [["module", "=", "Event Booking Platform"]]},
    "Vendor Category",
    "Event Type",
    {"dt": "Event Booking Settings"},
]

# ──────────────────────────────────────────
# Doc Events
# ──────────────────────────────────────────
doc_events = {
    "Vendor Booking": {
        "validate":          "event_booking_platform.booking_management.doctype.vendor_booking.vendor_booking.validate",
        "before_submit":     "event_booking_platform.booking_management.doctype.vendor_booking.vendor_booking.before_submit",
        "on_submit":         "event_booking_platform.booking_management.doctype.vendor_booking.vendor_booking.on_submit",
        "on_cancel":         "event_booking_platform.booking_management.doctype.vendor_booking.vendor_booking.on_cancel",
        "after_insert":      "event_booking_platform.utils.notifications.booking_created",
    },
    "Booking Payment": {
        "on_submit":         "event_booking_platform.payment_management.doctype.booking_payment.booking_payment.on_submit",
        "on_cancel":         "event_booking_platform.payment_management.doctype.booking_payment.booking_payment.on_cancel",
    },
    "Vendor Profile": {
        "after_insert":      "event_booking_platform.vendor_management.doctype.vendor_profile.vendor_profile.after_insert",
        "on_update":         "event_booking_platform.vendor_management.doctype.vendor_profile.vendor_profile.on_update",
    },
    "Vendor Review": {
        "after_insert":      "event_booking_platform.vendor_management.doctype.vendor_review.vendor_review.update_vendor_rating",
    },
}

# ──────────────────────────────────────────
# Scheduler Events
# ──────────────────────────────────────────
scheduler_events = {
    "daily": [
        "event_booking_platform.tasks.send_upcoming_event_reminders",
        "event_booking_platform.tasks.check_payment_due_dates",
        "event_booking_platform.tasks.update_vendor_ratings",
    ],
    "weekly": [
        "event_booking_platform.tasks.generate_weekly_vendor_reports",
        "event_booking_platform.tasks.cleanup_expired_wishlists",
    ],
    "monthly": [
        "event_booking_platform.tasks.generate_monthly_revenue_summary",
    ],
}

# ──────────────────────────────────────────
# Website & Portal
# ──────────────────────────────────────────
website_route_rules = [
    {"from_route": "/vendors/<category>", "to_route": "vendors"},
    {"from_route": "/vendor/<vendor_name>", "to_route": "vendor"},
    {"from_route": "/book/<vendor>", "to_route": "book"},
    {"from_route": "/my-bookings", "to_route": "my_bookings"},
    {"from_route": "/my-events", "to_route": "my_events"},
]

portal_menu_items = [
    {"title": "My Bookings", "route": "/my-bookings", "role": "Event Customer"},
    {"title": "My Events", "route": "/my-events", "role": "Event Customer"},
    {"title": "Find Vendors", "route": "/vendors", "role": "Event Customer"},
    {"title": "Vendor Dashboard", "route": "/vendor-dashboard", "role": "Vendor"},
    {"title": "My Bookings", "route": "/vendor-bookings", "role": "Vendor"},
]

# ──────────────────────────────────────────
# JS / CSS Assets
# ──────────────────────────────────────────
app_include_css = "/assets/event_booking_platform/css/event_booking.css"
app_include_js  = "/assets/event_booking_platform/js/event_booking_platform.js"

doctype_js = {
    "Vendor Booking":   "public/js/vendor_booking.js",
    "Vendor Profile":   "public/js/vendor_profile.js",
    "Booking Payment":  "public/js/booking_payment.js",
    "Event Request":    "public/js/event_request.js",
}

# ──────────────────────────────────────────
# Global Search
# ──────────────────────────────────────────
global_search_doctypes = {
    "Default": [
        {"doctype": "Vendor Profile"},
        {"doctype": "Event Customer"},
        {"doctype": "Vendor Booking"},
        {"doctype": "Event Request"},
    ]
}

# ──────────────────────────────────────────
# Override Standard Methods
# ──────────────────────────────────────────
override_whitelisted_methods = {}

# ──────────────────────────────────────────
# Custom Fields on ERPNext DocTypes
# ──────────────────────────────────────────
# Managed via fixtures/custom_fields.json

# ──────────────────────────────────────────
# Log Clearing
# ──────────────────────────────────────────
default_log_clearing_doctypes = {
    "Booking Modification Log": 90,
}
