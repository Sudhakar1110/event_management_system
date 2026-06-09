export const APP_NAME = "event_booking_platform";
export const APP_TITLE = "EventSphere — Event Booking Platform";
export const APP_VERSION = "1.0.0";

export const modules = [
  {
    id: "vendor_management",
    label: "Vendor Management",
    icon: "Store",
    color: "from-violet-600 to-purple-700",
    description: "Manage all event vendors including halls, photographers, caterers, decorators and more",
    doctypes: [
      "Vendor Category", "Vendor Profile", "Vendor Package", "Vendor Package Item",
      "Vendor Review", "Vendor Availability", "Vendor Document", "Vendor Gallery",
      "Wedding Hall", "Banquet Hall", "Photographer", "Videographer", "Decorator",
      "Caterer", "Makeup Artist", "Event Planner", "DJ Provider",
      "Transportation Provider", "Flower Decorator"
    ]
  },
  {
    id: "customer_management",
    label: "Customer Management",
    icon: "Users",
    color: "from-rose-500 to-pink-600",
    description: "Customer registration, profiles, preferences and booking history",
    doctypes: [
      "Event Customer", "Customer Preference", "Saved Vendor", "Customer Event Profile"
    ]
  },
  {
    id: "event_management",
    label: "Event Management",
    icon: "Calendar",
    color: "from-amber-500 to-orange-600",
    description: "Event types, planning, budget tracking, guest and schedule management",
    doctypes: [
      "Event Type", "Event Request", "Event Plan", "Event Budget Item",
      "Event Guest", "Event Schedule", "Event Checklist Item"
    ]
  },
  {
    id: "booking_management",
    label: "Booking Management",
    icon: "BookOpen",
    color: "from-cyan-500 to-blue-600",
    description: "Complete booking lifecycle from request to confirmation, modification and cancellation",
    doctypes: [
      "Vendor Booking", "Hall Booking", "Package Booking",
      "Booking Modification Log", "Booking Cancellation"
    ]
  },
  {
    id: "payment_management",
    label: "Payment Management",
    icon: "CreditCard",
    color: "from-emerald-500 to-green-600",
    description: "UPI, card, cash payments, advance tracking and refund management",
    doctypes: [
      "Booking Payment", "Payment Installment", "Refund Request"
    ]
  },
  {
    id: "marketplace",
    label: "Marketplace",
    icon: "ShoppingBag",
    color: "from-fuchsia-500 to-pink-600",
    description: "Search, filter, compare, wishlist and recommendation features",
    doctypes: [
      "Vendor Wishlist", "Package Comparison", "Vendor Recommendation"
    ]
  },
  {
    id: "configuration",
    label: "Configuration",
    icon: "Settings",
    color: "from-slate-500 to-gray-600",
    description: "Platform settings for vendors, payments, notifications and reviews",
    doctypes: [
      "Event Booking Settings", "Vendor Settings",
      "Notification Settings", "Payment Settings", "Review Rating Settings"
    ]
  }
];

export const doctypeDetails: Record<string, any> = {
  "Vendor Category": {
    module: "Vendor Management",
    autoname: "field:category_name",
    is_tree: false,
    track_changes: 1,
    fields: [
      { fieldname: "category_name", label: "Category Name", fieldtype: "Data", reqd: 1, in_list_view: 1, in_global_search: 1 },
      { fieldname: "parent_category", label: "Parent Category", fieldtype: "Link", options: "Vendor Category", in_list_view: 1 },
      { fieldname: "icon", label: "Icon (FontAwesome class)", fieldtype: "Data" },
      { fieldname: "image", label: "Image", fieldtype: "Attach Image" },
      { fieldname: "description", label: "Description", fieldtype: "Text Editor" },
      { fieldname: "is_active", label: "Is Active", fieldtype: "Check", default: "1" },
      { fieldname: "sort_order", label: "Sort Order", fieldtype: "Int", default: "0" }
    ],
    permissions: [
      { role: "Event Booking Manager", read: 1, write: 1, create: 1, delete: 1 },
      { role: "System Manager", read: 1, write: 1, create: 1, delete: 1 },
      { role: "Guest", read: 1 }
    ]
  },
  "Vendor Profile": {
    module: "Vendor Management",
    autoname: "naming_series:",
    naming_series: "VND-.YYYY.-.####",
    is_submittable: 0,
    track_changes: 1,
    title_field: "vendor_name",
    image_field: "profile_image",
    fields: [
      { fieldname: "naming_series", label: "Series", fieldtype: "Select", options: "VND-.YYYY.-.####" },
      { fieldname: "vendor_name", label: "Vendor Name", fieldtype: "Data", reqd: 1, in_list_view: 1, in_global_search: 1 },
      { fieldname: "vendor_category", label: "Vendor Category", fieldtype: "Link", options: "Vendor Category", reqd: 1, in_list_view: 1, in_standard_filter: 1 },
      { fieldname: "profile_image", label: "Profile Image", fieldtype: "Attach Image" },
      { fieldname: "column_break_1", fieldtype: "Column Break" },
      { fieldname: "status", label: "Status", fieldtype: "Select", options: "Active\nInactive\nPending Approval\nSuspended", default: "Pending Approval", in_list_view: 1, in_standard_filter: 1 },
      { fieldname: "rating", label: "Average Rating", fieldtype: "Float", precision: "1", read_only: 1 },
      { fieldname: "total_reviews", label: "Total Reviews", fieldtype: "Int", read_only: 1 },
      { fieldname: "section_contact", label: "Contact Details", fieldtype: "Section Break" },
      { fieldname: "contact_person", label: "Contact Person", fieldtype: "Data", reqd: 1 },
      { fieldname: "email", label: "Email", fieldtype: "Data", options: "Email", reqd: 1 },
      { fieldname: "phone", label: "Phone", fieldtype: "Data", options: "Phone", reqd: 1 },
      { fieldname: "whatsapp", label: "WhatsApp", fieldtype: "Data", options: "Phone" },
      { fieldname: "column_break_2", fieldtype: "Column Break" },
      { fieldname: "website", label: "Website", fieldtype: "Data", options: "URL" },
      { fieldname: "instagram", label: "Instagram", fieldtype: "Data" },
      { fieldname: "facebook", label: "Facebook", fieldtype: "Data" },
      { fieldname: "youtube", label: "YouTube", fieldtype: "Data" },
      { fieldname: "section_location", label: "Location", fieldtype: "Section Break" },
      { fieldname: "city", label: "City", fieldtype: "Data", reqd: 1, in_list_view: 1, in_standard_filter: 1 },
      { fieldname: "state", label: "State", fieldtype: "Data", reqd: 1 },
      { fieldname: "pincode", label: "Pincode", fieldtype: "Data" },
      { fieldname: "column_break_3", fieldtype: "Column Break" },
      { fieldname: "service_areas", label: "Service Areas", fieldtype: "Text" },
      { fieldname: "geolocation", label: "Geolocation", fieldtype: "Geolocation" },
      { fieldname: "section_business", label: "Business Details", fieldtype: "Section Break" },
      { fieldname: "business_description", label: "Business Description", fieldtype: "Text Editor" },
      { fieldname: "years_in_business", label: "Years in Business", fieldtype: "Int" },
      { fieldname: "team_size", label: "Team Size", fieldtype: "Int" },
      { fieldname: "column_break_4", fieldtype: "Column Break" },
      { fieldname: "min_price", label: "Minimum Price (₹)", fieldtype: "Currency", reqd: 1 },
      { fieldname: "max_price", label: "Maximum Price (₹)", fieldtype: "Currency" },
      { fieldname: "price_unit", label: "Price Unit", fieldtype: "Select", options: "Per Event\nPer Day\nPer Hour\nPer Person\nPer Plate" },
      { fieldname: "advance_required", label: "Advance Required (%)", fieldtype: "Percent" },
      { fieldname: "section_packages", label: "Packages", fieldtype: "Section Break" },
      { fieldname: "packages", label: "Packages", fieldtype: "Table", options: "Vendor Package" },
      { fieldname: "section_gallery", label: "Gallery", fieldtype: "Section Break" },
      { fieldname: "gallery", label: "Gallery", fieldtype: "Table", options: "Vendor Gallery" },
      { fieldname: "section_documents", label: "Documents & Verification", fieldtype: "Section Break" },
      { fieldname: "gst_number", label: "GST Number", fieldtype: "Data" },
      { fieldname: "pan_number", label: "PAN Number", fieldtype: "Data" },
      { fieldname: "is_verified", label: "Is Verified", fieldtype: "Check" },
      { fieldname: "verification_date", label: "Verification Date", fieldtype: "Date" },
      { fieldname: "documents", label: "Documents", fieldtype: "Table", options: "Vendor Document" },
      { fieldname: "section_linked", label: "ERPNext Integration", fieldtype: "Section Break" },
      { fieldname: "supplier", label: "Supplier", fieldtype: "Link", options: "Supplier" },
      { fieldname: "user", label: "Portal User", fieldtype: "Link", options: "User" }
    ],
    permissions: [
      { role: "Event Booking Manager", read: 1, write: 1, create: 1, delete: 1, submit: 0 },
      { role: "Vendor", read: 1, write: 1, create: 1 },
      { role: "System Manager", read: 1, write: 1, create: 1, delete: 1 },
      { role: "Guest", read: 1 }
    ]
  },
  "Vendor Booking": {
    module: "Booking Management",
    autoname: "naming_series:",
    naming_series: "BKG-.YYYY.MM.-.####",
    is_submittable: 1,
    track_changes: 1,
    title_field: "booking_title",
    fields: [
      { fieldname: "naming_series", label: "Series", fieldtype: "Select", options: "BKG-.YYYY.MM.-.####" },
      { fieldname: "booking_title", label: "Booking Title", fieldtype: "Data", reqd: 1, in_list_view: 1 },
      { fieldname: "customer", label: "Customer", fieldtype: "Link", options: "Event Customer", reqd: 1, in_list_view: 1, in_standard_filter: 1 },
      { fieldname: "vendor", label: "Vendor", fieldtype: "Link", options: "Vendor Profile", reqd: 1, in_list_view: 1, in_standard_filter: 1 },
      { fieldname: "column_break_1", fieldtype: "Column Break" },
      { fieldname: "booking_status", label: "Booking Status", fieldtype: "Select", options: "Draft\nRequested\nConfirmed\nIn Progress\nCompleted\nCancelled", default: "Draft", in_list_view: 1, in_standard_filter: 1 },
      { fieldname: "event_request", label: "Event Request", fieldtype: "Link", options: "Event Request" },
      { fieldname: "booking_date", label: "Booking Date", fieldtype: "Date", reqd: 1, in_list_view: 1 },
      { fieldname: "section_event", label: "Event Details", fieldtype: "Section Break" },
      { fieldname: "event_type", label: "Event Type", fieldtype: "Link", options: "Event Type" },
      { fieldname: "event_date", label: "Event Date", fieldtype: "Date", reqd: 1 },
      { fieldname: "event_end_date", label: "Event End Date", fieldtype: "Date" },
      { fieldname: "event_time", label: "Event Time", fieldtype: "Time" },
      { fieldname: "column_break_2", fieldtype: "Column Break" },
      { fieldname: "venue", label: "Venue / City", fieldtype: "Data" },
      { fieldname: "guest_count", label: "Expected Guests", fieldtype: "Int" },
      { fieldname: "special_requirements", label: "Special Requirements", fieldtype: "Text Editor" },
      { fieldname: "section_package", label: "Package & Pricing", fieldtype: "Section Break" },
      { fieldname: "package", label: "Selected Package", fieldtype: "Link", options: "Vendor Package" },
      { fieldname: "custom_requirements", label: "Custom Requirements", fieldtype: "Table", options: "Booking Custom Item" },
      { fieldname: "column_break_3", fieldtype: "Column Break" },
      { fieldname: "base_amount", label: "Base Amount (₹)", fieldtype: "Currency" },
      { fieldname: "discount_percent", label: "Discount (%)", fieldtype: "Percent" },
      { fieldname: "discount_amount", label: "Discount Amount (₹)", fieldtype: "Currency", read_only: 1 },
      { fieldname: "taxable_amount", label: "Taxable Amount (₹)", fieldtype: "Currency", read_only: 1 },
      { fieldname: "gst_percent", label: "GST (%)", fieldtype: "Percent", default: "18" },
      { fieldname: "gst_amount", label: "GST Amount (₹)", fieldtype: "Currency", read_only: 1 },
      { fieldname: "total_amount", label: "Total Amount (₹)", fieldtype: "Currency", read_only: 1, bold: 1 },
      { fieldname: "section_payment", label: "Payment Summary", fieldtype: "Section Break" },
      { fieldname: "advance_percent", label: "Advance Required (%)", fieldtype: "Percent" },
      { fieldname: "advance_amount", label: "Advance Amount (₹)", fieldtype: "Currency", read_only: 1 },
      { fieldname: "paid_amount", label: "Paid Amount (₹)", fieldtype: "Currency", read_only: 1 },
      { fieldname: "balance_amount", label: "Balance Amount (₹)", fieldtype: "Currency", read_only: 1 },
      { fieldname: "payment_status", label: "Payment Status", fieldtype: "Select", options: "Unpaid\nPartially Paid\nFully Paid\nRefunded", read_only: 1 },
      { fieldname: "section_notes", label: "Notes & Terms", fieldtype: "Section Break" },
      { fieldname: "vendor_notes", label: "Vendor Notes", fieldtype: "Text Editor" },
      { fieldname: "terms_conditions", label: "Terms & Conditions", fieldtype: "Text Editor" },
      { fieldname: "cancellation_policy", label: "Cancellation Policy", fieldtype: "Text Editor" }
    ],
    permissions: [
      { role: "Event Booking Manager", read: 1, write: 1, create: 1, delete: 1, submit: 1, cancel: 1, amend: 1 },
      { role: "Event Booking User", read: 1, write: 1, create: 1 },
      { role: "Vendor", read: 1, write: 1 },
      { role: "Customer", read: 1 }
    ]
  },
  "Event Request": {
    module: "Event Management",
    autoname: "naming_series:",
    naming_series: "EVT-.YYYY.MM.-.####",
    is_submittable: 1,
    track_changes: 1,
    fields: [
      { fieldname: "naming_series", label: "Series", fieldtype: "Select", options: "EVT-.YYYY.MM.-.####" },
      { fieldname: "event_title", label: "Event Title", fieldtype: "Data", reqd: 1, in_list_view: 1 },
      { fieldname: "customer", label: "Customer", fieldtype: "Link", options: "Event Customer", reqd: 1, in_list_view: 1 },
      { fieldname: "event_type", label: "Event Type", fieldtype: "Link", options: "Event Type", reqd: 1, in_list_view: 1 },
      { fieldname: "column_break_1", fieldtype: "Column Break" },
      { fieldname: "status", label: "Status", fieldtype: "Select", options: "Draft\nOpen\nIn Planning\nVendors Confirmed\nCompleted\nCancelled", default: "Draft", in_list_view: 1 },
      { fieldname: "event_date", label: "Event Date", fieldtype: "Date", reqd: 1, in_list_view: 1 },
      { fieldname: "event_end_date", label: "End Date", fieldtype: "Date" },
      { fieldname: "section_details", label: "Event Details", fieldtype: "Section Break" },
      { fieldname: "city", label: "City", fieldtype: "Data", reqd: 1 },
      { fieldname: "state", label: "State", fieldtype: "Data" },
      { fieldname: "venue_type", label: "Venue Type", fieldtype: "Select", options: "Indoor\nOutdoor\nDestination\nBeach\nGarden\nBanquet Hall\nFarmhouse\nResort" },
      { fieldname: "column_break_2", fieldtype: "Column Break" },
      { fieldname: "guest_count", label: "Expected Guests", fieldtype: "Int", reqd: 1 },
      { fieldname: "total_budget", label: "Total Budget (₹)", fieldtype: "Currency", reqd: 1 },
      { fieldname: "special_notes", label: "Special Notes / Theme", fieldtype: "Text Editor" },
      { fieldname: "section_services", label: "Services Required", fieldtype: "Section Break" },
      { fieldname: "services_required", label: "Services Required", fieldtype: "Table", options: "Event Service Requirement" },
      { fieldname: "section_planning", label: "Planning", fieldtype: "Section Break" },
      { fieldname: "event_plan", label: "Event Plan", fieldtype: "Link", options: "Event Plan" },
      { fieldname: "assigned_planner", label: "Assigned Planner", fieldtype: "Link", options: "Vendor Profile" }
    ]
  },
  "Booking Payment": {
    module: "Payment Management",
    autoname: "naming_series:",
    naming_series: "PAY-.YYYY.MM.-.####",
    is_submittable: 1,
    track_changes: 1,
    fields: [
      { fieldname: "naming_series", label: "Series", fieldtype: "Select", options: "PAY-.YYYY.MM.-.####" },
      { fieldname: "booking", label: "Booking", fieldtype: "Link", options: "Vendor Booking", reqd: 1, in_list_view: 1 },
      { fieldname: "customer", label: "Customer", fieldtype: "Link", options: "Event Customer", reqd: 1, in_list_view: 1 },
      { fieldname: "payment_date", label: "Payment Date", fieldtype: "Date", reqd: 1, in_list_view: 1 },
      { fieldname: "column_break_1", fieldtype: "Column Break" },
      { fieldname: "payment_type", label: "Payment Type", fieldtype: "Select", options: "Advance\nInstallment\nFinal Payment\nRefund", reqd: 1, in_list_view: 1 },
      { fieldname: "payment_mode", label: "Payment Mode", fieldtype: "Select", options: "UPI\nCredit Card\nDebit Card\nNet Banking\nCash\nCheque\nBank Transfer", reqd: 1, in_list_view: 1 },
      { fieldname: "status", label: "Status", fieldtype: "Select", options: "Pending\nCompleted\nFailed\nRefunded", default: "Pending", in_list_view: 1 },
      { fieldname: "section_amount", label: "Payment Amount", fieldtype: "Section Break" },
      { fieldname: "amount", label: "Amount (₹)", fieldtype: "Currency", reqd: 1, bold: 1 },
      { fieldname: "transaction_id", label: "Transaction ID / UTR", fieldtype: "Data" },
      { fieldname: "upi_id", label: "UPI ID", fieldtype: "Data", depends_on: "eval:doc.payment_mode=='UPI'" },
      { fieldname: "column_break_2", fieldtype: "Column Break" },
      { fieldname: "payment_screenshot", label: "Payment Screenshot", fieldtype: "Attach Image" },
      { fieldname: "payment_receipt", label: "Payment Receipt", fieldtype: "Attach" },
      { fieldname: "remarks", label: "Remarks", fieldtype: "Text" },
      { fieldname: "section_erpnext", label: "ERPNext Integration", fieldtype: "Section Break" },
      { fieldname: "payment_entry", label: "Payment Entry", fieldtype: "Link", options: "Payment Entry", read_only: 1 }
    ]
  }
};

export const reports = [
  {
    name: "Booking Report",
    type: "Script Report",
    module: "Booking Management",
    description: "Complete booking analysis with vendor, customer, date, amount and status filters",
    filters: ["Date Range", "Vendor", "Customer", "Booking Status", "Event Type", "City"],
    columns: ["Booking ID", "Customer", "Vendor", "Event Date", "Event Type", "Total Amount", "Paid Amount", "Status"]
  },
  {
    name: "Vendor Performance Report",
    type: "Script Report",
    module: "Vendor Management",
    description: "Vendor-wise bookings, revenue, ratings and cancellation analysis",
    filters: ["Vendor Category", "Vendor", "Date Range", "City"],
    columns: ["Vendor", "Category", "Total Bookings", "Revenue", "Avg Rating", "Cancellations", "Completion Rate"]
  },
  {
    name: "Revenue Analysis Report",
    type: "Script Report",
    module: "Payment Management",
    description: "Monthly and yearly revenue breakdown by vendor category, payment mode and event type",
    filters: ["Date Range", "Vendor Category", "Event Type", "Payment Mode"],
    columns: ["Month", "Category", "Gross Revenue", "GST", "Net Revenue", "Advance Collected", "Balance Pending"]
  },
  {
    name: "Customer Activity Report",
    type: "Script Report",
    module: "Customer Management",
    description: "Customer booking frequency, spend, preferred vendors and event types",
    filters: ["Customer", "Date Range", "City"],
    columns: ["Customer", "Total Events", "Total Spend", "Avg Booking Value", "Preferred Category", "Last Booking"]
  },
  {
    name: "Payment Collection Report",
    type: "Script Report",
    module: "Payment Management",
    description: "Payment-wise collection summary with pending dues and overdue tracking",
    filters: ["Date Range", "Payment Mode", "Status", "Vendor"],
    columns: ["Date", "Booking", "Customer", "Vendor", "Amount", "Mode", "Status", "Transaction ID"]
  },
  {
    name: "Cancellation Report",
    type: "Script Report",
    module: "Booking Management",
    description: "Cancellation trends, reasons and refund status analysis",
    filters: ["Date Range", "Vendor", "Customer", "Cancellation Reason"],
    columns: ["Booking", "Customer", "Vendor", "Event Date", "Cancel Date", "Amount", "Refund Status", "Reason"]
  },
  {
    name: "Event Analytics Report",
    type: "Script Report",
    module: "Event Management",
    description: "Event type, seasonality, city-wise booking trends and insights",
    filters: ["Date Range", "Event Type", "City", "State"],
    columns: ["Event Type", "Month", "City", "Total Events", "Avg Budget", "Avg Guests", "Popular Vendor Category"]
  }
];

export const dashboardCharts = [
  { name: "Monthly Bookings", type: "Bar", module: "Booking Management", based_on: "Vendor Booking" },
  { name: "Revenue by Category", type: "Donut", module: "Vendor Management", based_on: "Vendor Profile" },
  { name: "Booking Status Distribution", type: "Donut", module: "Booking Management", based_on: "Vendor Booking" },
  { name: "Top Vendors by Revenue", type: "Bar", module: "Vendor Management", based_on: "Vendor Booking" },
  { name: "Payment Mode Analysis", type: "Pie", module: "Payment Management", based_on: "Booking Payment" },
  { name: "Event Type Trends", type: "Line", module: "Event Management", based_on: "Event Request" },
  { name: "City-wise Bookings", type: "Bar", module: "Booking Management", based_on: "Vendor Booking" },
  { name: "Customer Growth", type: "Line", module: "Customer Management", based_on: "Event Customer" }
];

export const numberCards = [
  { name: "Total Bookings", module: "Booking Management", doctype: "Vendor Booking", function: "Count", color: "#7c3aed" },
  { name: "Active Vendors", module: "Vendor Management", doctype: "Vendor Profile", function: "Count", filters: [["status", "=", "Active"]], color: "#059669" },
  { name: "Monthly Revenue", module: "Payment Management", doctype: "Booking Payment", function: "Sum", aggregate_function_based_on: "amount", color: "#d97706" },
  { name: "Pending Bookings", module: "Booking Management", doctype: "Vendor Booking", function: "Count", filters: [["booking_status", "=", "Requested"]], color: "#dc2626" },
  { name: "Total Customers", module: "Customer Management", doctype: "Event Customer", function: "Count", color: "#2563eb" },
  { name: "Completed Events", module: "Event Management", doctype: "Event Request", function: "Count", filters: [["status", "=", "Completed"]], color: "#16a34a" }
];

export const roles = [
  { role_name: "Event Booking Manager", description: "Full access to all event booking modules" },
  { role_name: "Event Booking User", description: "Can create and manage bookings" },
  { role_name: "Vendor", description: "Vendor portal access - manage own profile, bookings" },
  { role_name: "Event Customer", description: "Customer portal access - view and manage own bookings" },
  { role_name: "Event Booking Accounts", description: "Payment and financial management access" },
  { role_name: "Event Booking Report User", description: "Access to all event booking reports" }
];

export const workflows = [
  {
    name: "Vendor Booking Workflow",
    document_type: "Vendor Booking",
    states: [
      { state: "Draft", doc_status: 0, style: "default" },
      { state: "Requested", doc_status: 0, style: "warning" },
      { state: "Confirmed", doc_status: 0, style: "primary" },
      { state: "In Progress", doc_status: 0, style: "info" },
      { state: "Completed", doc_status: 1, style: "success" },
      { state: "Cancelled", doc_status: 2, style: "danger" }
    ],
    transitions: [
      { state: "Draft", action: "Submit Request", next_state: "Requested", allowed: "Event Booking User" },
      { state: "Requested", action: "Confirm Booking", next_state: "Confirmed", allowed: "Vendor" },
      { state: "Requested", action: "Reject", next_state: "Cancelled", allowed: "Vendor" },
      { state: "Confirmed", action: "Start Event", next_state: "In Progress", allowed: "Event Booking Manager" },
      { state: "In Progress", action: "Complete", next_state: "Completed", allowed: "Event Booking Manager" },
      { state: "Confirmed", action: "Cancel", next_state: "Cancelled", allowed: "Event Booking Manager" }
    ]
  },
  {
    name: "Vendor Profile Approval",
    document_type: "Vendor Profile",
    states: [
      { state: "Pending Approval", doc_status: 0, style: "warning" },
      { state: "Active", doc_status: 0, style: "success" },
      { state: "Suspended", doc_status: 0, style: "danger" }
    ],
    transitions: [
      { state: "Pending Approval", action: "Approve Vendor", next_state: "Active", allowed: "Event Booking Manager" },
      { state: "Pending Approval", action: "Reject", next_state: "Suspended", allowed: "Event Booking Manager" },
      { state: "Active", action: "Suspend", next_state: "Suspended", allowed: "Event Booking Manager" },
      { state: "Suspended", action: "Reactivate", next_state: "Active", allowed: "Event Booking Manager" }
    ]
  }
];

export const fileTree = [
  {
    name: "event_booking_platform/",
    type: "dir",
    children: [
      { name: "hooks.py", type: "file", lang: "python" },
      { name: "setup.py", type: "file", lang: "python" },
      { name: "requirements.txt", type: "file", lang: "text" },
      { name: "tasks.py", type: "file", lang: "python" },
      { name: "MANIFEST.in", type: "file", lang: "text" },
      { name: "README.md", type: "file", lang: "markdown" },
      {
        name: "event_booking_platform/",
        type: "dir",
        children: [
          { name: "__init__.py", type: "file", lang: "python" },
          { name: "config/", type: "dir", children: [
            { name: "__init__.py", type: "file" },
            { name: "desktop.py", type: "file", lang: "python" },
            { name: "docs.py", type: "file", lang: "python" }
          ]},
          { name: "fixtures/", type: "dir", children: [
            { name: "roles.json", type: "file", lang: "json" },
            { name: "custom_fields.json", type: "file", lang: "json" },
            { name: "workflow.json", type: "file", lang: "json" },
            { name: "workflow_state.json", type: "file", lang: "json" },
            { name: "workflow_action.json", type: "file", lang: "json" },
            { name: "notification.json", type: "file", lang: "json" },
            { name: "email_template.json", type: "file", lang: "json" },
            { name: "print_format.json", type: "file", lang: "json" },
            { name: "workspace.json", type: "file", lang: "json" },
            { name: "report.json", type: "file", lang: "json" },
            { name: "dashboard_chart.json", type: "file", lang: "json" },
            { name: "number_card.json", type: "file", lang: "json" },
            { name: "vendor_category.json", type: "file", lang: "json" },
            { name: "event_type.json", type: "file", lang: "json" }
          ]},
          { name: "utils/", type: "dir", children: [
            { name: "__init__.py", type: "file" },
            { name: "calculations.py", type: "file", lang: "python" },
            { name: "notifications.py", type: "file", lang: "python" },
            { name: "validators.py", type: "file", lang: "python" },
            { name: "api.py", type: "file", lang: "python" }
          ]},
          { name: "vendor_management/", type: "dir", children: [
            { name: "__init__.py", type: "file" },
            { name: "doctype/", type: "dir", children: [
              { name: "vendor_category/", type: "dir" },
              { name: "vendor_profile/", type: "dir" },
              { name: "vendor_package/", type: "dir" },
              { name: "vendor_gallery/", type: "dir" },
              { name: "vendor_review/", type: "dir" },
              { name: "vendor_availability/", type: "dir" },
              { name: "vendor_document/", type: "dir" }
            ]}
          ]},
          { name: "customer_management/", type: "dir", children: [
            { name: "__init__.py", type: "file" },
            { name: "doctype/", type: "dir", children: [
              { name: "event_customer/", type: "dir" },
              { name: "customer_preference/", type: "dir" },
              { name: "saved_vendor/", type: "dir" }
            ]}
          ]},
          { name: "event_management/", type: "dir", children: [
            { name: "__init__.py", type: "file" },
            { name: "doctype/", type: "dir", children: [
              { name: "event_type/", type: "dir" },
              { name: "event_request/", type: "dir" },
              { name: "event_plan/", type: "dir" },
              { name: "event_guest/", type: "dir" },
              { name: "event_schedule/", type: "dir" }
            ]}
          ]},
          { name: "booking_management/", type: "dir", children: [
            { name: "__init__.py", type: "file" },
            { name: "doctype/", type: "dir", children: [
              { name: "vendor_booking/", type: "dir" },
              { name: "hall_booking/", type: "dir" },
              { name: "package_booking/", type: "dir" },
              { name: "booking_modification_log/", type: "dir" },
              { name: "booking_cancellation/", type: "dir" }
            ]}
          ]},
          { name: "payment_management/", type: "dir", children: [
            { name: "__init__.py", type: "file" },
            { name: "doctype/", type: "dir", children: [
              { name: "booking_payment/", type: "dir" },
              { name: "payment_installment/", type: "dir" },
              { name: "refund_request/", type: "dir" }
            ]}
          ]},
          { name: "marketplace/", type: "dir", children: [
            { name: "__init__.py", type: "file" },
            { name: "doctype/", type: "dir" }
          ]},
          { name: "configuration/", type: "dir", children: [
            { name: "__init__.py", type: "file" },
            { name: "doctype/", type: "dir", children: [
              { name: "event_booking_settings/", type: "dir" },
              { name: "vendor_settings/", type: "dir" },
              { name: "payment_settings/", type: "dir" }
            ]}
          ]},
          { name: "www/", type: "dir", children: [
            { name: "vendors.html", type: "file", lang: "html" },
            { name: "vendors.py", type: "file", lang: "python" },
            { name: "vendor.html", type: "file", lang: "html" },
            { name: "vendor.py", type: "file", lang: "python" },
            { name: "book.html", type: "file", lang: "html" },
            { name: "book.py", type: "file", lang: "python" },
            { name: "my-bookings.html", type: "file", lang: "html" },
            { name: "my-bookings.py", type: "file", lang: "python" },
            { name: "my-events.html", type: "file", lang: "html" }
          ]},
          { name: "public/", type: "dir", children: [
            { name: "js/", type: "dir", children: [
              { name: "vendor_booking.js", type: "file", lang: "javascript" },
              { name: "vendor_profile.js", type: "file", lang: "javascript" },
              { name: "booking_payment.js", type: "file", lang: "javascript" }
            ]},
            { name: "css/", type: "dir", children: [
              { name: "event_booking.css", type: "file", lang: "css" }
            ]}
          ]},
          { name: "templates/", type: "dir", children: [
            { name: "emails/", type: "dir" },
            { name: "print_formats/", type: "dir" }
          ]}
        ]
      }
    ]
  }
];

export const codeSnippets: Record<string, { lang: string; code: string }> = {
  hooks: {
    lang: "python",
    code: `# hooks.py — Event Booking Platform
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
    {"from_route": "/my-bookings", "to_route": "my-bookings"},
    {"from_route": "/my-events", "to_route": "my-events"},
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
`
  },
  vendorBookingPy: {
    lang: "python",
    code: `# vendor_booking.py — Controller
import frappe
from frappe import _
from frappe.model.document import Document
from frappe.utils import flt, getdate, today, add_days


class VendorBooking(Document):

    # ─── Validation ─────────────────────────────────────────
    def validate(self):
        self.validate_dates()
        self.validate_vendor_availability()
        self.calculate_amounts()
        self.set_payment_status()
        self.validate_advance_payment()

    def validate_dates(self):
        if self.event_date and getdate(self.event_date) < getdate(today()):
            frappe.throw(_("Event Date cannot be in the past."))
        if self.event_end_date and self.event_date:
            if getdate(self.event_end_date) < getdate(self.event_date):
                frappe.throw(_("Event End Date must be on or after Event Date."))

    def validate_vendor_availability(self):
        if not self.vendor or not self.event_date:
            return
        # Check if vendor has blocked the date
        blocked = frappe.db.exists("Vendor Availability", {
            "vendor": self.vendor,
            "date": self.event_date,
            "status": "Blocked"
        })
        if blocked:
            frappe.throw(_(
                "Vendor {0} is not available on {1}. Please choose another date."
            ).format(self.vendor, self.event_date))

        # Check for overlapping confirmed bookings
        overlap = frappe.db.sql("""
            SELECT name FROM \`tabVendor Booking\`
            WHERE vendor = %(vendor)s
              AND event_date = %(event_date)s
              AND booking_status IN ('Confirmed', 'In Progress')
              AND name != %(name)s
              AND docstatus = 1
        """, {"vendor": self.vendor, "event_date": self.event_date, "name": self.name or ""})
        if overlap:
            frappe.throw(_(
                "Vendor {0} already has a confirmed booking on {1}. Booking: {2}"
            ).format(self.vendor, self.event_date, overlap[0][0]))

    def calculate_amounts(self):
        base = flt(self.base_amount)
        discount_pct = flt(self.discount_percent)
        gst_pct = flt(self.gst_percent, 18)

        discount_amt = base * discount_pct / 100
        taxable = base - discount_amt
        gst_amt = taxable * gst_pct / 100
        total = taxable + gst_amt

        self.discount_amount = discount_amt
        self.taxable_amount = taxable
        self.gst_amount = gst_amt
        self.total_amount = total

        # Advance
        adv_pct = flt(self.advance_percent)
        self.advance_amount = total * adv_pct / 100

        # Paid amount from submitted payments
        paid = frappe.db.sql("""
            SELECT COALESCE(SUM(amount), 0) FROM \`tabBooking Payment\`
            WHERE booking = %s AND docstatus = 1 AND status = 'Completed'
        """, self.name)[0][0]
        self.paid_amount = flt(paid)
        self.balance_amount = total - flt(paid)

    def set_payment_status(self):
        total = flt(self.total_amount)
        paid = flt(self.paid_amount)
        if total == 0:
            self.payment_status = "Unpaid"
        elif paid >= total:
            self.payment_status = "Fully Paid"
        elif paid > 0:
            self.payment_status = "Partially Paid"
        else:
            self.payment_status = "Unpaid"

    def validate_advance_payment(self):
        if self.booking_status == "Confirmed" and self.payment_status == "Unpaid":
            if flt(self.advance_amount) > 0:
                frappe.msgprint(
                    _("Reminder: Advance payment of ₹{0} is pending.").format(
                        frappe.format(self.advance_amount, {"fieldtype": "Currency"})
                    ),
                    indicator="orange"
                )

    # ─── Submission ─────────────────────────────────────────
    def before_submit(self):
        if self.booking_status not in ("Confirmed", "Completed"):
            frappe.throw(_("Only Confirmed or Completed bookings can be submitted."))

    def on_submit(self):
        self.create_vendor_availability_block()
        frappe.enqueue(
            "event_booking_platform.utils.notifications.send_booking_confirmation",
            booking=self.name,
            queue="short"
        )

    def on_cancel(self):
        self.remove_vendor_availability_block()
        self.booking_status = "Cancelled"
        self.save(ignore_permissions=True)

    # ─── Helpers ────────────────────────────────────────────
    def create_vendor_availability_block(self):
        if not frappe.db.exists("Vendor Availability", {
            "vendor": self.vendor,
            "date": self.event_date,
            "reference_booking": self.name
        }):
            doc = frappe.get_doc({
                "doctype": "Vendor Availability",
                "vendor": self.vendor,
                "date": self.event_date,
                "status": "Booked",
                "reference_booking": self.name,
                "notes": f"Booked for {self.booking_title}"
            })
            doc.insert(ignore_permissions=True)

    def remove_vendor_availability_block(self):
        name = frappe.db.get_value("Vendor Availability", {
            "vendor": self.vendor,
            "reference_booking": self.name
        })
        if name:
            frappe.delete_doc("Vendor Availability", name, ignore_permissions=True)


# ─── Whitelisted API Methods ────────────────────────────────
@frappe.whitelist()
def get_vendor_packages(vendor):
    """Return packages for a vendor — used in booking form."""
    return frappe.get_all(
        "Vendor Package",
        filters={"vendor": vendor, "is_active": 1},
        fields=["name", "package_name", "price", "description", "inclusions"]
    )

@frappe.whitelist()
def check_vendor_availability(vendor, event_date):
    """Return availability status for a vendor on given date."""
    blocked = frappe.db.exists("Vendor Availability", {
        "vendor": vendor, "date": event_date, "status": ["in", ["Blocked", "Booked"]]
    })
    return {"available": not blocked}

@frappe.whitelist()
def get_booking_summary(booking_name):
    """Return booking summary dict for portal/API use."""
    doc = frappe.get_doc("Vendor Booking", booking_name)
    frappe.has_permission("Vendor Booking", "read", doc=doc, throw=True)
    return {
        "name": doc.name,
        "booking_title": doc.booking_title,
        "status": doc.booking_status,
        "event_date": doc.event_date,
        "vendor": doc.vendor,
        "total_amount": doc.total_amount,
        "paid_amount": doc.paid_amount,
        "balance_amount": doc.balance_amount,
        "payment_status": doc.payment_status,
    }
`
  },
  vendorBookingJson: {
    lang: "json",
    code: `{
  "actions": [],
  "allow_rename": 0,
  "autoname": "naming_series:",
  "creation": "2024-01-01 00:00:00",
  "docstatus": 0,
  "doctype": "DocType",
  "document_type": "Document",
  "engine": "InnoDB",
  "field_order": [
    "naming_series","booking_title","customer","vendor",
    "column_break_1","booking_status","event_request","booking_date",
    "section_event","event_type","event_date","event_end_date","event_time",
    "column_break_2","venue","guest_count","special_requirements",
    "section_package","package","custom_requirements",
    "column_break_3","base_amount","discount_percent","discount_amount",
    "taxable_amount","gst_percent","gst_amount","total_amount",
    "section_payment","advance_percent","advance_amount",
    "paid_amount","balance_amount","payment_status",
    "section_notes","vendor_notes","terms_conditions","cancellation_policy"
  ],
  "fields": [
    {
      "fieldname": "naming_series",
      "fieldtype": "Select",
      "label": "Series",
      "options": "BKG-.YYYY.MM.-.####",
      "set_only_once": 1
    },
    {
      "bold": 1,
      "fieldname": "booking_title",
      "fieldtype": "Data",
      "in_list_view": 1,
      "label": "Booking Title",
      "reqd": 1
    },
    {
      "fieldname": "customer",
      "fieldtype": "Link",
      "in_list_view": 1,
      "in_standard_filter": 1,
      "label": "Customer",
      "options": "Event Customer",
      "reqd": 1,
      "search_index": 1
    },
    {
      "fieldname": "vendor",
      "fieldtype": "Link",
      "in_list_view": 1,
      "in_standard_filter": 1,
      "label": "Vendor",
      "options": "Vendor Profile",
      "reqd": 1,
      "search_index": 1
    },
    {
      "fieldname": "column_break_1",
      "fieldtype": "Column Break"
    },
    {
      "default": "Draft",
      "fieldname": "booking_status",
      "fieldtype": "Select",
      "in_list_view": 1,
      "in_standard_filter": 1,
      "label": "Booking Status",
      "options": "Draft\\nRequested\\nConfirmed\\nIn Progress\\nCompleted\\nCancelled"
    },
    {
      "fieldname": "event_date",
      "fieldtype": "Date",
      "in_list_view": 1,
      "label": "Event Date",
      "reqd": 1
    },
    {
      "fieldname": "total_amount",
      "fieldtype": "Currency",
      "label": "Total Amount (₹)",
      "read_only": 1,
      "bold": 1
    },
    {
      "fieldname": "payment_status",
      "fieldtype": "Select",
      "label": "Payment Status",
      "options": "Unpaid\\nPartially Paid\\nFully Paid\\nRefunded",
      "read_only": 1
    }
  ],
  "icon": "fa fa-calendar",
  "is_submittable": 1,
  "modified": "2024-01-01 00:00:00",
  "modified_by": "Administrator",
  "module": "Booking Management",
  "name": "Vendor Booking",
  "naming_rule": "By Naming Series",
  "owner": "Administrator",
  "permissions": [
    {
      "cancel": 1,
      "create": 1,
      "delete": 1,
      "email": 1,
      "export": 1,
      "print": 1,
      "read": 1,
      "report": 1,
      "role": "Event Booking Manager",
      "share": 1,
      "submit": 1,
      "write": 1
    },
    {
      "create": 1,
      "read": 1,
      "role": "Event Booking User",
      "write": 1
    },
    {
      "read": 1,
      "role": "Vendor",
      "write": 1
    },
    {
      "read": 1,
      "role": "Event Customer"
    }
  ],
  "sort_field": "modified",
  "sort_order": "DESC",
  "states": [],
  "title_field": "booking_title",
  "track_changes": 1
}`
  },
  workspaceJson: {
    lang: "json",
    code: `{
  "charts": [
    {
      "chart_name": "Monthly Bookings",
      "label": "Monthly Bookings"
    },
    {
      "chart_name": "Revenue by Category",
      "label": "Revenue by Category"
    }
  ],
  "content": "[{\\"type\\":\\"header\\",\\"data\\":{\\"text\\":\\"<span class=\\\\\\"h4\\\\\\"><b>EventSphere Dashboard</b></span>\\",\\"col\\":12}},{\\"type\\":\\"card\\",\\"data\\":{\\"card_name\\":\\"Vendor Management\\",\\"col\\":4}},{\\"type\\":\\"card\\",\\"data\\":{\\"card_name\\":\\"Booking Management\\",\\"col\\":4}},{\\"type\\":\\"card\\",\\"data\\":{\\"card_name\\":\\"Event Management\\",\\"col\\":4}},{\\"type\\":\\"chart\\",\\"data\\":{\\"chart_name\\":\\"Monthly Bookings\\",\\"col\\":6}},{\\"type\\":\\"chart\\",\\"data\\":{\\"chart_name\\":\\"Revenue by Category\\",\\"col\\":6}}]",
  "creation": "2024-01-01 00:00:00",
  "docstatus": 0,
  "doctype": "Workspace",
  "for_user": "",
  "hide_custom": 0,
  "icon": "calendar",
  "idx": 0,
  "is_default": 1,
  "is_hidden": 0,
  "label": "Event Booking Platform",
  "links": [
    {
      "dependencies": "",
      "hidden": 0,
      "is_query_report": 0,
      "label": "Vendor Management",
      "link_count": 0,
      "onboard": 1,
      "type": "Card Break"
    },
    {
      "dependencies": "",
      "hidden": 0,
      "is_query_report": 0,
      "label": "Vendor Profile",
      "link_count": 0,
      "link_to": "Vendor Profile",
      "link_type": "DocType",
      "onboard": 1,
      "type": "Link"
    },
    {
      "label": "Vendor Category",
      "link_to": "Vendor Category",
      "link_type": "DocType",
      "type": "Link"
    },
    {
      "label": "Vendor Package",
      "link_to": "Vendor Package",
      "link_type": "DocType",
      "type": "Link"
    },
    {
      "label": "Vendor Review",
      "link_to": "Vendor Review",
      "link_type": "DocType",
      "type": "Link"
    },
    {
      "label": "Vendor Availability",
      "link_to": "Vendor Availability",
      "link_type": "DocType",
      "type": "Link"
    },
    {
      "label": "Booking Management",
      "type": "Card Break"
    },
    {
      "label": "Vendor Booking",
      "link_to": "Vendor Booking",
      "link_type": "DocType",
      "onboard": 1,
      "type": "Link"
    },
    {
      "label": "Hall Booking",
      "link_to": "Hall Booking",
      "link_type": "DocType",
      "type": "Link"
    },
    {
      "label": "Booking Payment",
      "link_to": "Booking Payment",
      "link_type": "DocType",
      "type": "Link"
    },
    {
      "label": "Refund Request",
      "link_to": "Refund Request",
      "link_type": "DocType",
      "type": "Link"
    },
    {
      "label": "Event Management",
      "type": "Card Break"
    },
    {
      "label": "Event Request",
      "link_to": "Event Request",
      "link_type": "DocType",
      "onboard": 1,
      "type": "Link"
    },
    {
      "label": "Event Plan",
      "link_to": "Event Plan",
      "link_type": "DocType",
      "type": "Link"
    },
    {
      "label": "Event Type",
      "link_to": "Event Type",
      "link_type": "DocType",
      "type": "Link"
    },
    {
      "label": "Reports",
      "type": "Card Break"
    },
    {
      "is_query_report": 1,
      "label": "Booking Report",
      "link_to": "Booking Report",
      "link_type": "Report",
      "type": "Link"
    },
    {
      "is_query_report": 1,
      "label": "Vendor Performance Report",
      "link_to": "Vendor Performance Report",
      "link_type": "Report",
      "type": "Link"
    },
    {
      "is_query_report": 1,
      "label": "Revenue Analysis Report",
      "link_to": "Revenue Analysis Report",
      "link_type": "Report",
      "type": "Link"
    },
    {
      "is_query_report": 1,
      "label": "Payment Collection Report",
      "link_to": "Payment Collection Report",
      "link_type": "Report",
      "type": "Link"
    },
    {
      "label": "Configuration",
      "type": "Card Break"
    },
    {
      "label": "Event Booking Settings",
      "link_to": "Event Booking Settings",
      "link_type": "DocType",
      "type": "Link"
    },
    {
      "label": "Payment Settings",
      "link_to": "Payment Settings",
      "link_type": "DocType",
      "type": "Link"
    },
    {
      "label": "Notification Settings",
      "link_to": "Notification Settings",
      "link_type": "DocType",
      "type": "Link"
    }
  ],
  "modified": "2024-01-01 00:00:00",
  "modified_by": "Administrator",
  "module": "Event Booking Platform",
  "name": "Event Booking Platform",
  "number_cards": [
    {"label": "Total Bookings", "card_name": "Total Bookings"},
    {"label": "Active Vendors", "card_name": "Active Vendors"},
    {"label": "Monthly Revenue", "card_name": "Monthly Revenue"},
    {"label": "Pending Bookings", "card_name": "Pending Bookings"}
  ],
  "owner": "Administrator",
  "parent_page": "",
  "public": 1,
  "restrict_to_domain": "",
  "roles": [],
  "sequence_id": 1.0,
  "shortcuts": [
    {
      "color": "Purple",
      "format": "{} Bookings",
      "label": "Vendor Booking",
      "link_to": "Vendor Booking",
      "stats_filter": "{\\"booking_status\\": \\"Requested\\"}",
      "type": "DocType"
    },
    {
      "color": "Green",
      "label": "New Vendor",
      "link_to": "Vendor Profile",
      "type": "DocType"
    },
    {
      "color": "Orange",
      "label": "New Event Request",
      "link_to": "Event Request",
      "type": "DocType"
    },
    {
      "color": "Blue",
      "label": "Revenue Analysis",
      "link_to": "Revenue Analysis Report",
      "type": "Report"
    }
  ],
  "title": "Event Booking Platform"
}`
  },
  taskspy: {
    lang: "python",
    code: `# tasks.py — Scheduled Tasks
import frappe
from frappe import _
from frappe.utils import today, add_days, getdate, nowdate


def send_upcoming_event_reminders():
    """Send reminder notifications for events happening in next 3 days."""
    reminder_date = add_days(today(), 3)
    bookings = frappe.get_all(
        "Vendor Booking",
        filters={
            "event_date": reminder_date,
            "booking_status": "Confirmed",
            "docstatus": 1
        },
        fields=["name", "booking_title", "customer", "vendor", "event_date"]
    )
    for booking in bookings:
        # Send to customer
        customer_email = frappe.db.get_value(
            "Event Customer", booking.customer, "email"
        )
        if customer_email:
            frappe.sendmail(
                recipients=[customer_email],
                template="event_reminder_customer",
                args={
                    "booking_title": booking.booking_title,
                    "event_date": booking.event_date,
                    "vendor": booking.vendor,
                    "booking_id": booking.name,
                },
                subject=f"Reminder: Your event is in 3 days — {booking.booking_title}",
                delayed=False
            )

        # Send to vendor
        vendor_email = frappe.db.get_value(
            "Vendor Profile", booking.vendor, "email"
        )
        if vendor_email:
            frappe.sendmail(
                recipients=[vendor_email],
                template="event_reminder_vendor",
                args={"booking": booking},
                subject=f"Upcoming Event Reminder: {booking.booking_title}",
                delayed=False
            )

    frappe.logger().info(
        f"Event reminders sent for {len(bookings)} bookings on {reminder_date}"
    )


def check_payment_due_dates():
    """Flag overdue advance payments and notify customers."""
    overdue_bookings = frappe.db.sql("""
        SELECT vb.name, vb.booking_title, vb.customer,
               vb.advance_amount, vb.paid_amount, vb.event_date
        FROM \`tabVendor Booking\` vb
        WHERE vb.booking_status = 'Confirmed'
          AND vb.payment_status = 'Unpaid'
          AND vb.advance_amount > 0
          AND vb.event_date >= %(today)s
          AND vb.docstatus = 1
    """, {"today": today()}, as_dict=True)

    for booking in overdue_bookings:
        customer_email = frappe.db.get_value(
            "Event Customer", booking.customer, "email"
        )
        if customer_email:
            frappe.sendmail(
                recipients=[customer_email],
                subject=f"Payment Reminder: {booking.booking_title}",
                message=f"""
                    Dear Customer,<br><br>
                    Your advance payment of ₹{booking.advance_amount:,.2f} for
                    booking <b>{booking.booking_title}</b> (Event on {booking.event_date})
                    is pending. Please complete the payment to confirm your booking.<br><br>
                    <a href="/my-bookings/{booking.name}">View Booking</a>
                """,
                delayed=False
            )

    frappe.logger().info(
        f"Payment reminders sent for {len(overdue_bookings)} bookings"
    )


def update_vendor_ratings():
    """Recalculate average ratings for all active vendors."""
    vendors = frappe.get_all(
        "Vendor Profile",
        filters={"status": "Active"},
        fields=["name"]
    )
    for vendor in vendors:
        result = frappe.db.sql("""
            SELECT AVG(rating) as avg_rating, COUNT(name) as total
            FROM \`tabVendor Review\`
            WHERE vendor = %s AND docstatus = 1
        """, vendor.name, as_dict=True)
        if result:
            frappe.db.set_value("Vendor Profile", vendor.name, {
                "rating": round(result[0].avg_rating or 0, 1),
                "total_reviews": result[0].total or 0
            })
    frappe.db.commit()
    frappe.logger().info(f"Updated ratings for {len(vendors)} vendors")


def generate_weekly_vendor_reports():
    """Email weekly performance summary to vendors."""
    vendors = frappe.get_all(
        "Vendor Profile",
        filters={"status": "Active"},
        fields=["name", "vendor_name", "email"]
    )
    week_start = add_days(today(), -7)
    for vendor in vendors:
        if not vendor.email:
            continue
        stats = frappe.db.sql("""
            SELECT
                COUNT(*) as total_bookings,
                SUM(total_amount) as total_revenue,
                COUNT(CASE WHEN booking_status='Confirmed' THEN 1 END) as confirmed,
                COUNT(CASE WHEN booking_status='Cancelled' THEN 1 END) as cancelled
            FROM \`tabVendor Booking\`
            WHERE vendor = %s
              AND booking_date >= %s
              AND docstatus IN (0,1)
        """, (vendor.name, week_start), as_dict=True)[0]

        if stats.total_bookings:
            frappe.sendmail(
                recipients=[vendor.email],
                template="vendor_weekly_report",
                args={"vendor": vendor, "stats": stats, "period": week_start},
                subject=f"Your Weekly Performance Report — {vendor.vendor_name}",
                delayed=True
            )


def generate_monthly_revenue_summary():
    """Generate and email monthly revenue report to Event Booking Managers."""
    managers = frappe.get_all(
        "Has Role",
        filters={"role": "Event Booking Manager"},
        fields=["parent"],
        pluck="parent"
    )
    manager_emails = [
        frappe.db.get_value("User", m, "email") for m in managers if m
    ]
    if manager_emails:
        frappe.sendmail(
            recipients=manager_emails,
            subject="Monthly Revenue Summary — Event Booking Platform",
            template="monthly_revenue_summary",
            args={"month": frappe.utils.get_datetime().strftime("%B %Y")},
            delayed=False
        )


def cleanup_expired_wishlists():
    """Remove wishlist entries older than 90 days."""
    frappe.db.sql("""
        DELETE FROM \`tabVendor Wishlist\`
        WHERE creation < DATE_SUB(NOW(), INTERVAL 90 DAY)
    """)
    frappe.db.commit()
`
  },
  bookingReportPy: {
    lang: "python",
    code: `# booking_report.py — Script Report
import frappe
from frappe import _
from frappe.utils import getdate


def execute(filters=None):
    columns = get_columns()
    data = get_data(filters)
    chart = get_chart(data)
    summary = get_summary(data)
    return columns, data, None, chart, summary


def get_columns():
    return [
        {
            "label": _("Booking ID"),
            "fieldname": "name",
            "fieldtype": "Link",
            "options": "Vendor Booking",
            "width": 130
        },
        {
            "label": _("Booking Title"),
            "fieldname": "booking_title",
            "fieldtype": "Data",
            "width": 180
        },
        {
            "label": _("Customer"),
            "fieldname": "customer",
            "fieldtype": "Link",
            "options": "Event Customer",
            "width": 140
        },
        {
            "label": _("Vendor"),
            "fieldname": "vendor",
            "fieldtype": "Link",
            "options": "Vendor Profile",
            "width": 160
        },
        {
            "label": _("Vendor Category"),
            "fieldname": "vendor_category",
            "fieldtype": "Link",
            "options": "Vendor Category",
            "width": 140
        },
        {
            "label": _("Event Type"),
            "fieldname": "event_type",
            "fieldtype": "Link",
            "options": "Event Type",
            "width": 120
        },
        {
            "label": _("Event Date"),
            "fieldname": "event_date",
            "fieldtype": "Date",
            "width": 100
        },
        {
            "label": _("City"),
            "fieldname": "venue",
            "fieldtype": "Data",
            "width": 100
        },
        {
            "label": _("Total Amount"),
            "fieldname": "total_amount",
            "fieldtype": "Currency",
            "width": 120
        },
        {
            "label": _("Paid Amount"),
            "fieldname": "paid_amount",
            "fieldtype": "Currency",
            "width": 110
        },
        {
            "label": _("Balance"),
            "fieldname": "balance_amount",
            "fieldtype": "Currency",
            "width": 110
        },
        {
            "label": _("Booking Status"),
            "fieldname": "booking_status",
            "fieldtype": "Data",
            "width": 120
        },
        {
            "label": _("Payment Status"),
            "fieldname": "payment_status",
            "fieldtype": "Data",
            "width": 120
        }
    ]


def get_data(filters):
    conditions = build_conditions(filters)
    return frappe.db.sql("""
        SELECT
            vb.name,
            vb.booking_title,
            vb.customer,
            vb.vendor,
            vp.vendor_category,
            vb.event_type,
            vb.event_date,
            vb.venue,
            vb.total_amount,
            vb.paid_amount,
            vb.balance_amount,
            vb.booking_status,
            vb.payment_status,
            vb.booking_date
        FROM \`tabVendor Booking\` vb
        LEFT JOIN \`tabVendor Profile\` vp ON vb.vendor = vp.name
        WHERE vb.docstatus IN (0,1)
        {conditions}
        ORDER BY vb.event_date DESC
    """.format(conditions=conditions), filters, as_dict=True)


def build_conditions(filters):
    conditions = []
    if filters.get("from_date"):
        conditions.append("AND vb.event_date >= %(from_date)s")
    if filters.get("to_date"):
        conditions.append("AND vb.event_date <= %(to_date)s")
    if filters.get("vendor"):
        conditions.append("AND vb.vendor = %(vendor)s")
    if filters.get("customer"):
        conditions.append("AND vb.customer = %(customer)s")
    if filters.get("booking_status"):
        conditions.append("AND vb.booking_status = %(booking_status)s")
    if filters.get("event_type"):
        conditions.append("AND vb.event_type = %(event_type)s")
    return " ".join(conditions)


def get_chart(data):
    if not data:
        return None
    monthly = {}
    for row in data:
        if row.event_date:
            key = str(row.event_date)[:7]  # YYYY-MM
            monthly[key] = monthly.get(key, 0) + (row.total_amount or 0)

    months = sorted(monthly.keys())
    return {
        "data": {
            "labels": months,
            "datasets": [{"name": _("Revenue"), "values": [monthly[m] for m in months]}]
        },
        "type": "bar",
        "fieldtype": "Currency",
        "colors": ["#7c3aed"]
    }


def get_summary(data):
    total_bookings = len(data)
    total_revenue = sum(r.total_amount or 0 for r in data)
    total_paid = sum(r.paid_amount or 0 for r in data)
    total_balance = sum(r.balance_amount or 0 for r in data)
    return [
        {"label": _("Total Bookings"), "value": total_bookings, "datatype": "Int", "indicator": "Blue"},
        {"label": _("Total Revenue"), "value": total_revenue, "datatype": "Currency", "indicator": "Green"},
        {"label": _("Amount Collected"), "value": total_paid, "datatype": "Currency", "indicator": "Green"},
        {"label": _("Amount Pending"), "value": total_balance, "datatype": "Currency", "indicator": "Orange"},
    ]
`
  },
  vendorSearchApi: {
    lang: "python",
    code: `# api.py — Public Whitelisted API Endpoints
import frappe
from frappe import _
from frappe.utils import cint, flt


@frappe.whitelist(allow_guest=True)
def search_vendors(
    category=None,
    city=None,
    min_price=None,
    max_price=None,
    rating=None,
    event_date=None,
    search_text=None,
    page=1,
    page_size=12
):
    """
    Public vendor search API — used by portal and website pages.
    Returns paginated list of active, verified vendors.
    """
    page = cint(page) or 1
    page_size = min(cint(page_size) or 12, 50)
    offset = (page - 1) * page_size

    conditions = ["vp.status = 'Active'"]
    params = {}

    if category:
        conditions.append("vp.vendor_category = %(category)s")
        params["category"] = category

    if city:
        conditions.append("vp.city LIKE %(city)s")
        params["city"] = f"%{city}%"

    if min_price:
        conditions.append("vp.min_price >= %(min_price)s")
        params["min_price"] = flt(min_price)

    if max_price:
        conditions.append("vp.max_price <= %(max_price)s OR vp.max_price IS NULL")
        params["max_price"] = flt(max_price)

    if rating:
        conditions.append("vp.rating >= %(rating)s")
        params["rating"] = flt(rating)

    if search_text:
        conditions.append("""(
            vp.vendor_name LIKE %(search_text)s OR
            vp.city LIKE %(search_text)s OR
            vp.business_description LIKE %(search_text)s
        )""")
        params["search_text"] = f"%{search_text}%"

    # Availability check
    if event_date:
        conditions.append("""vp.name NOT IN (
            SELECT vendor FROM \`tabVendor Availability\`
            WHERE date = %(event_date)s AND status IN ('Blocked','Booked')
        )""")
        params["event_date"] = event_date

    where_clause = " AND ".join(conditions)
    params["limit"] = page_size
    params["offset"] = offset

    vendors = frappe.db.sql(f"""
        SELECT
            vp.name, vp.vendor_name, vp.vendor_category, vp.profile_image,
            vp.city, vp.state, vp.min_price, vp.max_price, vp.price_unit,
            vp.rating, vp.total_reviews, vp.is_verified,
            vp.years_in_business, vp.business_description
        FROM \`tabVendor Profile\` vp
        WHERE {where_clause}
        ORDER BY vp.rating DESC, vp.total_reviews DESC
        LIMIT %(limit)s OFFSET %(offset)s
    """, params, as_dict=True)

    total_count = frappe.db.sql(f"""
        SELECT COUNT(*) FROM \`tabVendor Profile\` vp
        WHERE {where_clause}
    """, params)[0][0]

    return {
        "vendors": vendors,
        "total": total_count,
        "page": page,
        "page_size": page_size,
        "total_pages": (total_count + page_size - 1) // page_size
    }


@frappe.whitelist(allow_guest=True)
def get_vendor_detail(vendor_name):
    """Get full vendor profile including packages, gallery and reviews."""
    vendor = frappe.get_doc("Vendor Profile", vendor_name)
    if vendor.status != "Active":
        frappe.throw(_("Vendor not found or inactive."), frappe.DoesNotExistError)

    reviews = frappe.get_all(
        "Vendor Review",
        filters={"vendor": vendor_name, "docstatus": 1},
        fields=["reviewer_name", "rating", "review_title", "review_text",
                "event_type", "event_date", "helpful_count", "creation"],
        order_by="creation desc",
        limit=10
    )
    packages = frappe.get_all(
        "Vendor Package",
        filters={"vendor": vendor_name, "is_active": 1},
        fields=["name", "package_name", "price", "description",
                "duration", "max_guests", "inclusions"]
    )
    gallery = frappe.get_all(
        "Vendor Gallery",
        filters={"parent": vendor_name},
        fields=["image", "caption", "category"]
    )
    return {
        "vendor": vendor.as_dict(),
        "packages": packages,
        "reviews": reviews,
        "gallery": gallery
    }


@frappe.whitelist()
def create_booking(vendor, event_date, event_type, guest_count,
                   package=None, total_budget=None, special_requirements=None):
    """Create a new booking from the portal."""
    frappe.has_permission("Vendor Booking", "create", throw=True)

    # Get or create Event Customer for current user
    customer = frappe.db.get_value(
        "Event Customer", {"user": frappe.session.user}
    )
    if not customer:
        frappe.throw(_("Please complete your customer profile first."))

    vendor_doc = frappe.get_doc("Vendor Profile", vendor)

    booking = frappe.get_doc({
        "doctype": "Vendor Booking",
        "booking_title": f"{vendor_doc.vendor_name} — {event_date}",
        "customer": customer,
        "vendor": vendor,
        "event_date": event_date,
        "event_type": event_type,
        "guest_count": cint(guest_count),
        "package": package,
        "base_amount": flt(total_budget) or vendor_doc.min_price,
        "special_requirements": special_requirements,
        "advance_percent": vendor_doc.advance_required or 30,
        "booking_status": "Draft",
        "gst_percent": 18
    })
    booking.insert(ignore_permissions=False)
    return {"booking": booking.name, "status": "created"}


@frappe.whitelist()
def toggle_wishlist(vendor):
    """Add or remove a vendor from the customer's wishlist."""
    customer = frappe.db.get_value(
        "Event Customer", {"user": frappe.session.user}
    )
    if not customer:
        frappe.throw(_("Customer profile not found."))

    existing = frappe.db.get_value(
        "Vendor Wishlist", {"customer": customer, "vendor": vendor}
    )
    if existing:
        frappe.delete_doc("Vendor Wishlist", existing, ignore_permissions=True)
        return {"action": "removed"}
    else:
        frappe.get_doc({
            "doctype": "Vendor Wishlist",
            "customer": customer,
            "vendor": vendor
        }).insert(ignore_permissions=True)
        return {"action": "added"}


@frappe.whitelist()
def submit_review(vendor, booking, rating, review_title, review_text, event_type=None):
    """Submit a review for a completed booking."""
    if cint(rating) < 1 or cint(rating) > 5:
        frappe.throw(_("Rating must be between 1 and 5."))

    # Verify booking belongs to current user's customer profile
    customer = frappe.db.get_value(
        "Event Customer", {"user": frappe.session.user}
    )
    booking_customer = frappe.db.get_value("Vendor Booking", booking, "customer")
    if booking_customer != customer:
        frappe.throw(_("You can only review your own bookings."))

    # Check if already reviewed
    if frappe.db.exists("Vendor Review", {"booking": booking}):
        frappe.throw(_("You have already reviewed this booking."))

    review = frappe.get_doc({
        "doctype": "Vendor Review",
        "vendor": vendor,
        "booking": booking,
        "customer": customer,
        "reviewer_name": frappe.db.get_value("Event Customer", customer, "full_name"),
        "rating": cint(rating),
        "review_title": review_title,
        "review_text": review_text,
        "event_type": event_type
    })
    review.insert(ignore_permissions=False)
    review.submit()
    return {"review": review.name, "status": "submitted"}


def has_app_permission():
    return frappe.has_permission("Vendor Booking", "read")
`
  },
  vendorPortalHtml: {
    lang: "html",
    code: `{# www/vendors.html — Vendor Marketplace Portal Page #}
{% extends "templates/web.html" %}

{% block title %}Find Wedding & Event Vendors — EventSphere{% endblock %}

{% block head_include %}
<link rel="stylesheet" href="/assets/event_booking_platform/css/event_booking.css">
<meta name="description" content="Find verified wedding and event vendors — Halls, Photographers, Caterers, Decorators and more.">
{% endblock %}

{% block page_content %}
<div class="eb-vendors-page">

  {# ── Hero Search Bar ── #}
  <section class="eb-hero-search bg-gradient-purple text-white py-16">
    <div class="container mx-auto px-4 text-center">
      <h1 class="text-4xl font-bold mb-4">Find the Perfect Vendors for Your Event</h1>
      <p class="text-xl opacity-90 mb-8">
        Verified vendors across India — Weddings, Receptions, Corporate Events & more
      </p>
      <div class="eb-search-box bg-white rounded-2xl p-4 max-w-4xl mx-auto shadow-xl">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input type="text" id="search-text" placeholder="Search vendors..."
                 class="eb-input col-span-1" />
          <select id="category-filter" class="eb-input">
            <option value="">All Categories</option>
            {% for cat in categories %}
            <option value="{{ cat.name }}">{{ cat.category_name }}</option>
            {% endfor %}
          </select>
          <input type="text" id="city-filter" placeholder="City / Location"
                 class="eb-input" />
          <button onclick="searchVendors()" class="eb-btn-primary rounded-xl">
            🔍 Search
          </button>
        </div>
        <div class="mt-3 flex flex-wrap gap-2 justify-center">
          <span class="eb-tag-filter" onclick="filterByCategory('Wedding Hall')">💍 Wedding Halls</span>
          <span class="eb-tag-filter" onclick="filterByCategory('Photographer')">📸 Photographers</span>
          <span class="eb-tag-filter" onclick="filterByCategory('Caterer')">🍽️ Caterers</span>
          <span class="eb-tag-filter" onclick="filterByCategory('Decorator')">🌸 Decorators</span>
          <span class="eb-tag-filter" onclick="filterByCategory('DJ Provider')">🎵 DJs</span>
          <span class="eb-tag-filter" onclick="filterByCategory('Makeup Artist')">💄 Makeup Artists</span>
        </div>
      </div>
    </div>
  </section>

  {# ── Filters + Results ── #}
  <section class="py-10">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">

        {# Sidebar Filters #}
        <aside class="lg:col-span-1">
          <div class="eb-filter-card sticky top-4">
            <h3 class="text-lg font-semibold mb-4">🎛️ Filters</h3>
            <div class="space-y-4">
              <div>
                <label class="eb-label">Budget Range</label>
                <div class="flex gap-2">
                  <input type="number" id="min-price" placeholder="Min ₹" class="eb-input-sm" />
                  <input type="number" id="max-price" placeholder="Max ₹" class="eb-input-sm" />
                </div>
              </div>
              <div>
                <label class="eb-label">Minimum Rating</label>
                <select id="rating-filter" class="eb-input">
                  <option value="">Any Rating</option>
                  <option value="4">4★ & above</option>
                  <option value="3">3★ & above</option>
                  <option value="2">2★ & above</option>
                </select>
              </div>
              <div>
                <label class="eb-label">Event Date</label>
                <input type="date" id="event-date-filter" class="eb-input" />
              </div>
              <div>
                <label class="eb-label">Verified Only</label>
                <input type="checkbox" id="verified-filter" class="eb-checkbox" />
                <span class="ml-2 text-sm">Show verified vendors only</span>
              </div>
              <button onclick="applyFilters()"
                      class="eb-btn-primary w-full mt-2">Apply Filters</button>
              <button onclick="clearFilters()"
                      class="eb-btn-outline w-full">Clear All</button>
            </div>
          </div>
        </aside>

        {# Vendor Grid #}
        <main class="lg:col-span-3">
          <div class="flex justify-between items-center mb-6">
            <p class="text-gray-600">
              Showing <span id="results-count" class="font-semibold">0</span> vendors
            </p>
            <select id="sort-by" class="eb-input-sm" onchange="searchVendors()">
              <option value="rating">Top Rated</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>

          <div id="vendors-grid" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {# Populated by JavaScript #}
          </div>

          <div id="load-more-container" class="text-center mt-8 hidden">
            <button onclick="loadMore()" class="eb-btn-outline">Load More</button>
          </div>

          <div id="no-results" class="text-center py-16 hidden">
            <div class="text-6xl mb-4">🔍</div>
            <h3 class="text-xl font-semibold text-gray-700">No vendors found</h3>
            <p class="text-gray-500 mt-2">Try adjusting your filters or search terms</p>
          </div>
        </main>
      </div>
    </div>
  </section>
</div>

<template id="vendor-card-template">
  <div class="eb-vendor-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl
               transition-all duration-300 bg-white border border-gray-100">
    <div class="relative">
      <img src="" alt="" class="vendor-img w-full h-48 object-cover" />
      <span class="vendor-category absolute top-3 left-3 eb-badge-category"></span>
      <button class="vendor-wishlist absolute top-3 right-3 eb-wishlist-btn"
              title="Add to wishlist">♡</button>
      <div class="vendor-verified absolute bottom-3 right-3 hidden">
        <span class="eb-badge-verified">✓ Verified</span>
      </div>
    </div>
    <div class="p-4">
      <h3 class="vendor-name font-semibold text-gray-900 text-lg mb-1"></h3>
      <p class="vendor-city text-gray-500 text-sm mb-2">📍</p>
      <div class="flex items-center gap-2 mb-3">
        <div class="vendor-stars text-yellow-400"></div>
        <span class="vendor-reviews text-gray-500 text-sm"></span>
      </div>
      <div class="flex justify-between items-center">
        <div>
          <span class="text-gray-400 text-xs">Starting from</span>
          <div class="vendor-price font-bold text-purple-700 text-lg"></div>
        </div>
        <a href="" class="vendor-link eb-btn-primary-sm rounded-lg">View →</a>
      </div>
    </div>
  </div>
</template>
{% endblock %}

{% block script %}
<script>
let currentPage = 1;
let currentFilters = {};

async function searchVendors(page = 1) {
  currentPage = page;
  const params = {
    category: document.getElementById('category-filter').value,
    city: document.getElementById('city-filter').value,
    min_price: document.getElementById('min-price').value,
    max_price: document.getElementById('max-price').value,
    rating: document.getElementById('rating-filter').value,
    event_date: document.getElementById('event-date-filter').value,
    search_text: document.getElementById('search-text').value,
    page: page,
    page_size: 12
  };

  try {
    const response = await frappe.call({
      method: 'event_booking_platform.utils.api.search_vendors',
      args: params,
      freeze: false
    });
    const result = response.message;
    renderVendors(result.vendors, page === 1);
    document.getElementById('results-count').textContent = result.total;
    const loadMoreBtn = document.getElementById('load-more-container');
    loadMoreBtn.classList.toggle('hidden', result.page >= result.total_pages);
    document.getElementById('no-results').classList.toggle('hidden', result.total > 0);
  } catch(err) {
    console.error('Search error:', err);
  }
}

function renderVendors(vendors, reset = true) {
  const grid = document.getElementById('vendors-grid');
  if (reset) grid.innerHTML = '';
  const template = document.getElementById('vendor-card-template');

  vendors.forEach(vendor => {
    const card = template.content.cloneNode(true);
    card.querySelector('.vendor-img').src = vendor.profile_image || '/assets/event_booking_platform/images/placeholder.jpg';
    card.querySelector('.vendor-img').alt = vendor.vendor_name;
    card.querySelector('.vendor-category').textContent = vendor.vendor_category;
    card.querySelector('.vendor-name').textContent = vendor.vendor_name;
    card.querySelector('.vendor-city').textContent = '📍 ' + [vendor.city, vendor.state].filter(Boolean).join(', ');
    const stars = '★'.repeat(Math.round(vendor.rating || 0)) + '☆'.repeat(5 - Math.round(vendor.rating || 0));
    card.querySelector('.vendor-stars').textContent = stars;
    card.querySelector('.vendor-reviews').textContent = '(' + (vendor.total_reviews || 0) + ' reviews)';
    card.querySelector('.vendor-price').textContent = '₹' + (vendor.min_price || 0).toLocaleString('en-IN');
    const link = card.querySelector('.vendor-link');
    link.href = '/vendor/' + encodeURIComponent(vendor.name);
    if (vendor.is_verified) {
      card.querySelector('.vendor-verified').classList.remove('hidden');
    }
    const wishlistBtn = card.querySelector('.vendor-wishlist');
    wishlistBtn.addEventListener('click', () => toggleWishlist(vendor.name, wishlistBtn));
    grid.appendChild(card);
  });
}

async function toggleWishlist(vendor, btn) {
  if (!frappe.session.user || frappe.session.user === 'Guest') {
    window.location.href = '/login?redirect-to=' + window.location.pathname;
    return;
  }
  const r = await frappe.call({
    method: 'event_booking_platform.utils.api.toggle_wishlist',
    args: { vendor }
  });
  btn.textContent = r.message.action === 'added' ? '♥' : '♡';
}

function filterByCategory(cat) {
  document.getElementById('category-filter').value = cat;
  searchVendors();
}

function applyFilters() { searchVendors(1); }
function clearFilters() {
  ['search-text','city-filter','min-price','max-price','rating-filter','event-date-filter'].forEach(id => {
    document.getElementById(id).value = '';
  });
  document.getElementById('category-filter').value = '';
  searchVendors(1);
}
function loadMore() { searchVendors(++currentPage); }

// Initial load
document.addEventListener('DOMContentLoaded', () => searchVendors(1));
</script>
{% endblock %}
`
  },
  bookingPaymentJs: {
    lang: "javascript",
    code: `// public/js/booking_payment.js — Client Script
frappe.ui.form.on('Booking Payment', {

    refresh(frm) {
        frm.trigger('set_payment_mode_fields');

        if (frm.doc.docstatus === 1) {
            frm.add_custom_button(__('View Booking'), () => {
                frappe.set_route('Form', 'Vendor Booking', frm.doc.booking);
            });
            if (frm.doc.status === 'Completed' && frm.doc.payment_entry) {
                frm.add_custom_button(__('View Payment Entry'), () => {
                    frappe.set_route('Form', 'Payment Entry', frm.doc.payment_entry);
                });
            }
        }

        // Show payment QR for UPI
        if (frm.doc.payment_mode === 'UPI' && frm.doc.upi_id) {
            frm.trigger('show_upi_qr');
        }
    },

    booking(frm) {
        if (!frm.doc.booking) return;
        frappe.db.get_doc('Vendor Booking', frm.doc.booking).then(doc => {
            frm.set_value('customer', doc.customer);
            frm.set_value('amount', doc.balance_amount);
            frappe.msgprint({
                title: __('Booking Summary'),
                message: \`
                    <table class="table table-sm">
                        <tr><td><b>Booking:</b></td><td>\${doc.name}</td></tr>
                        <tr><td><b>Total Amount:</b></td><td>₹\${frappe.format(doc.total_amount, {fieldtype:'Currency'})}</td></tr>
                        <tr><td><b>Paid:</b></td><td>₹\${frappe.format(doc.paid_amount, {fieldtype:'Currency'})}</td></tr>
                        <tr><td><b>Balance:</b></td><td><b>₹\${frappe.format(doc.balance_amount, {fieldtype:'Currency'})}</b></td></tr>
                    </table>
                \`,
                indicator: 'blue'
            });
        });
    },

    payment_mode(frm) {
        frm.trigger('set_payment_mode_fields');
    },

    set_payment_mode_fields(frm) {
        const mode = frm.doc.payment_mode;
        frm.set_df_property('upi_id', 'hidden', mode !== 'UPI');
        frm.set_df_property('transaction_id', 'label',
            mode === 'UPI' ? __('UPI Transaction ID / UTR') :
            mode === 'Credit Card' || mode === 'Debit Card' ? __('Card Reference No.') :
            mode === 'Cheque' ? __('Cheque Number') :
            __('Transaction ID')
        );
    },

    amount(frm) {
        if (!frm.doc.booking || !frm.doc.amount) return;
        frappe.db.get_value('Vendor Booking', frm.doc.booking,
            ['advance_amount', 'total_amount', 'paid_amount']
        ).then(r => {
            const vals = r.message;
            const balance = vals.total_amount - vals.paid_amount;
            if (frm.doc.amount > balance + 1) {
                frappe.msgprint({
                    title: __('Warning'),
                    message: __('Amount exceeds balance of ₹{0}', [
                        frappe.format(balance, {fieldtype: 'Currency'})
                    ]),
                    indicator: 'orange'
                });
            }
        });
    },

    show_upi_qr(frm) {
        // Generate UPI deep link for QR
        const upiId = frm.doc.upi_id;
        const amount = frm.doc.amount;
        const note = \`Booking \${frm.doc.booking}\`;
        if (upiId && amount) {
            const upiLink = \`upi://pay?pa=\${upiId}&am=\${amount}&tn=\${encodeURIComponent(note)}&cu=INR\`;
            frm.set_df_property('upi_qr_placeholder', 'hidden', false);
            // QR would be rendered via qrcode library in production
        }
    },

    validate(frm) {
        if (!frm.doc.transaction_id && frm.doc.payment_mode !== 'Cash') {
            frappe.msgprint({
                title: __('Missing Transaction ID'),
                message: __('Please enter the Transaction ID / UTR for online payments.'),
                indicator: 'orange'
            });
        }
    }
});

// ─── Vendor Booking Client Script ─────────────────────
frappe.ui.form.on('Vendor Booking', {

    refresh(frm) {
        if (!frm.is_new()) {
            frm.add_custom_button(__('Add Payment'), () => {
                frappe.new_doc('Booking Payment', {
                    booking: frm.doc.name,
                    customer: frm.doc.customer,
                    amount: frm.doc.balance_amount,
                    payment_type: frm.doc.paid_amount === 0 ? 'Advance' : 'Installment'
                });
            }, __('Actions'));

            if (frm.doc.booking_status === 'Completed') {
                frm.add_custom_button(__('Request Cancellation'), () => {
                    frappe.new_doc('Booking Cancellation', {
                        booking: frm.doc.name
                    });
                }, __('Actions'));
            }

            frm.add_custom_button(__('Check Vendor Availability'), () => {
                frappe.call({
                    method: 'event_booking_platform.booking_management.doctype.vendor_booking.vendor_booking.check_vendor_availability',
                    args: {
                        vendor: frm.doc.vendor,
                        event_date: frm.doc.event_date
                    },
                    callback(r) {
                        const status = r.message;
                        frappe.msgprint({
                            title: __('Availability Status'),
                            message: status.available
                                ? __('✅ Vendor is available on {0}', [frm.doc.event_date])
                                : __('❌ Vendor is NOT available on {0}', [frm.doc.event_date]),
                            indicator: status.available ? 'green' : 'red'
                        });
                    }
                });
            }, __('Actions'));

            frm.trigger('show_payment_summary');
        }
    },

    show_payment_summary(frm) {
        if (frm.doc.total_amount) {
            const paidPct = frm.doc.total_amount > 0
                ? Math.round((frm.doc.paid_amount / frm.doc.total_amount) * 100)
                : 0;
            const color = paidPct >= 100 ? '#16a34a' : paidPct > 0 ? '#d97706' : '#dc2626';
            frm.dashboard.add_indicator(
                \`Payment: \${paidPct}% (₹\${frappe.format(frm.doc.paid_amount, {fieldtype:'Currency'})} / ₹\${frappe.format(frm.doc.total_amount, {fieldtype:'Currency'})})\`,
                paidPct >= 100 ? 'green' : paidPct > 0 ? 'orange' : 'red'
            );
        }
    },

    vendor(frm) {
        if (!frm.doc.vendor) return;
        frappe.call({
            method: 'event_booking_platform.booking_management.doctype.vendor_booking.vendor_booking.get_vendor_packages',
            args: { vendor: frm.doc.vendor },
            callback(r) {
                if (r.message && r.message.length) {
                    frm.set_df_property('package', 'options',
                        [''].concat(r.message.map(p => p.name)).join('\\n')
                    );
                }
            }
        });
        // Auto-fill advance percent from vendor settings
        frappe.db.get_value('Vendor Profile', frm.doc.vendor, 'advance_required').then(r => {
            if (r.message && r.message.advance_required) {
                frm.set_value('advance_percent', r.message.advance_required);
            }
        });
    },

    package(frm) {
        if (!frm.doc.package) return;
        frappe.db.get_doc('Vendor Package', frm.doc.package).then(pkg => {
            frm.set_value('base_amount', pkg.price);
            frappe.msgprint({
                title: __('Package: {0}', [pkg.package_name]),
                message: pkg.description || pkg.inclusions || '',
                indicator: 'blue'
            });
        });
    },

    base_amount(frm) { frm.trigger('calculate_totals'); },
    discount_percent(frm) { frm.trigger('calculate_totals'); },
    gst_percent(frm) { frm.trigger('calculate_totals'); },
    advance_percent(frm) { frm.trigger('calculate_totals'); },

    calculate_totals(frm) {
        const base = flt(frm.doc.base_amount);
        const discPct = flt(frm.doc.discount_percent);
        const gstPct = flt(frm.doc.gst_percent, 18);
        const advPct = flt(frm.doc.advance_percent);

        const discAmt = base * discPct / 100;
        const taxable = base - discAmt;
        const gstAmt = taxable * gstPct / 100;
        const total = taxable + gstAmt;

        frm.set_value('discount_amount', discAmt);
        frm.set_value('taxable_amount', taxable);
        frm.set_value('gst_amount', gstAmt);
        frm.set_value('total_amount', total);
        frm.set_value('advance_amount', total * advPct / 100);
    }
});
`
  },
  notificationsJson: {
    lang: "json",
    code: `[
  {
    "name": "Booking Confirmation — Customer",
    "subject": "Your Booking is Confirmed! 🎉 — {{ doc.booking_title }}",
    "document_type": "Vendor Booking",
    "event": "Value Change",
    "value_changed": "booking_status",
    "condition": "doc.booking_status == 'Confirmed'",
    "send_to_all_assignees": 0,
    "recipients": [
      {
        "receiver_by_document_field": "customer_email",
        "cc": ""
      }
    ],
    "message": "<p>Dear {{ frappe.db.get_value('Event Customer', doc.customer, 'full_name') }},</p><p>Great news! Your booking <strong>{{ doc.name }}</strong> has been confirmed.</p><table><tr><td>Event:</td><td>{{ doc.booking_title }}</td></tr><tr><td>Vendor:</td><td>{{ doc.vendor }}</td></tr><tr><td>Event Date:</td><td>{{ doc.event_date }}</td></tr><tr><td>Total Amount:</td><td>₹{{ '{:,.2f}'.format(doc.total_amount) }}</td></tr><tr><td>Advance Due:</td><td>₹{{ '{:,.2f}'.format(doc.advance_amount) }}</td></tr></table><p><a href='/my-bookings/{{ doc.name }}'>View Booking Details</a></p>",
    "module": "Event Booking Platform",
    "enabled": 1,
    "channel": "Email"
  },
  {
    "name": "New Booking Request — Vendor",
    "subject": "New Booking Request for {{ doc.event_date }} — EventSphere",
    "document_type": "Vendor Booking",
    "event": "Value Change",
    "value_changed": "booking_status",
    "condition": "doc.booking_status == 'Requested'",
    "recipients": [
      {
        "receiver_by_document_field": "vendor_email",
        "cc": ""
      }
    ],
    "message": "<p>You have received a new booking request on EventSphere.</p><table><tr><td>Booking ID:</td><td>{{ doc.name }}</td></tr><tr><td>Event Date:</td><td>{{ doc.event_date }}</td></tr><tr><td>Event Type:</td><td>{{ doc.event_type }}</td></tr><tr><td>Guests:</td><td>{{ doc.guest_count }}</td></tr><tr><td>Budget:</td><td>₹{{ '{:,.2f}'.format(doc.total_amount) }}</td></tr></table><p>Please login to your vendor dashboard to confirm or decline this request within 24 hours.</p>",
    "module": "Event Booking Platform",
    "enabled": 1,
    "channel": "Email"
  },
  {
    "name": "Payment Received Confirmation",
    "subject": "Payment of ₹{{ '{:,.2f}'.format(doc.amount) }} Received — {{ doc.booking }}",
    "document_type": "Booking Payment",
    "event": "on_submit",
    "recipients": [
      {"receiver_by_document_field": "customer_email"}
    ],
    "message": "<p>We have received your payment.</p><table><tr><td>Payment ID:</td><td>{{ doc.name }}</td></tr><tr><td>Booking:</td><td>{{ doc.booking }}</td></tr><tr><td>Amount:</td><td>₹{{ '{:,.2f}'.format(doc.amount) }}</td></tr><tr><td>Mode:</td><td>{{ doc.payment_mode }}</td></tr><tr><td>Transaction ID:</td><td>{{ doc.transaction_id or 'N/A' }}</td></tr></table>",
    "module": "Event Booking Platform",
    "enabled": 1
  },
  {
    "name": "Booking Cancellation Alert",
    "subject": "Booking Cancelled — {{ doc.booking_title }}",
    "document_type": "Vendor Booking",
    "event": "Value Change",
    "value_changed": "booking_status",
    "condition": "doc.booking_status == 'Cancelled'",
    "recipients": [
      {"receiver_by_document_field": "customer_email"},
      {"receiver_by_document_field": "vendor_email"}
    ],
    "message": "<p>Booking <strong>{{ doc.name }}</strong> — {{ doc.booking_title }} has been cancelled.</p><p>If you believe this is an error, please contact support immediately.</p>",
    "module": "Event Booking Platform",
    "enabled": 1
  },
  {
    "name": "Vendor Profile Approved",
    "subject": "Your Vendor Profile is Now Active on EventSphere! 🎊",
    "document_type": "Vendor Profile",
    "event": "Value Change",
    "value_changed": "status",
    "condition": "doc.status == 'Active'",
    "recipients": [{"receiver_by_document_field": "email"}],
    "message": "<p>Congratulations {{ doc.contact_person }}!</p><p>Your vendor profile <strong>{{ doc.vendor_name }}</strong> has been approved and is now live on EventSphere.</p><p>Customers can now discover and book your services. <a href='/vendor/{{ doc.name }}'>View your profile</a>.</p>",
    "module": "Event Booking Platform",
    "enabled": 1
  }
]
`
  },
  rolesJson: {
    lang: "json",
    code: `[
  {
    "doctype": "Role",
    "role_name": "Event Booking Manager",
    "desk_access": 1,
    "is_custom": 1,
    "two_factor_auth": 0,
    "disabled": 0,
    "restrict_to_domain": ""
  },
  {
    "doctype": "Role",
    "role_name": "Event Booking User",
    "desk_access": 1,
    "is_custom": 1,
    "disabled": 0
  },
  {
    "doctype": "Role",
    "role_name": "Vendor",
    "desk_access": 0,
    "is_custom": 1,
    "disabled": 0
  },
  {
    "doctype": "Role",
    "role_name": "Event Customer",
    "desk_access": 0,
    "is_custom": 1,
    "disabled": 0
  },
  {
    "doctype": "Role",
    "role_name": "Event Booking Accounts",
    "desk_access": 1,
    "is_custom": 1,
    "disabled": 0
  },
  {
    "doctype": "Role",
    "role_name": "Event Booking Report User",
    "desk_access": 1,
    "is_custom": 1,
    "disabled": 0
  }
]
`
  },
  demoDataPy: {
    lang: "python",
    code: `# fixtures/demo_data.py — Load realistic demo data
import frappe
from frappe.utils import today, add_days, add_months
import random


def load_demo_data():
    """Load complete demo dataset for EventSphere testing."""
    frappe.flags.ignore_permissions = True
    
    print("🎪 Loading EventSphere Demo Data...")
    
    # 1. Create demo customers
    customers = create_demo_customers()
    print(f"  ✓ Created {len(customers)} Event Customers")
    
    # 2. Create demo vendors
    vendors = create_demo_vendors()
    print(f"  ✓ Created {len(vendors)} Vendor Profiles")
    
    # 3. Create demo bookings
    bookings = create_demo_bookings(customers, vendors)
    print(f"  ✓ Created {len(bookings)} Vendor Bookings")
    
    # 4. Create demo payments
    payments = create_demo_payments(bookings)
    print(f"  ✓ Created {len(payments)} Booking Payments")
    
    # 5. Create demo reviews
    reviews = create_demo_reviews(bookings, vendors)
    print(f"  ✓ Created {len(reviews)} Vendor Reviews")
    
    frappe.db.commit()
    print("✅ Demo data loaded successfully!")
    print("   Login to Frappe Desk > Event Booking Platform to explore.")


DEMO_VENDORS = [
    {
        "vendor_name": "The Grand Mahal",
        "vendor_category": "Wedding Hall",
        "city": "Mumbai", "state": "Maharashtra",
        "min_price": 350000, "max_price": 800000,
        "price_unit": "Per Event",
        "contact_person": "Ramesh Patel", "email": "ramesh@grandmahal.in",
        "phone": "9876543210", "years_in_business": 12,
        "business_description": "Luxurious wedding hall in the heart of Mumbai with capacity for 1000+ guests.",
        "advance_required": 30, "status": "Active", "is_verified": 1, "rating": 4.8
    },
    {
        "vendor_name": "Lens & Light Photography",
        "vendor_category": "Photographer",
        "city": "Delhi", "state": "Delhi",
        "min_price": 45000, "max_price": 150000,
        "price_unit": "Per Event",
        "contact_person": "Aman Sharma", "email": "aman@lenslight.in",
        "phone": "9123456789", "years_in_business": 8,
        "business_description": "Award-winning wedding photographers with cinematic storytelling approach.",
        "advance_required": 50, "status": "Active", "is_verified": 1, "rating": 4.9
    },
    {
        "vendor_name": "Royal Caterers",
        "vendor_category": "Caterer",
        "city": "Bangalore", "state": "Karnataka",
        "min_price": 500, "max_price": 1500,
        "price_unit": "Per Plate",
        "contact_person": "Suresh Kumar", "email": "suresh@royalcaterers.in",
        "phone": "9988776655", "years_in_business": 15,
        "business_description": "Premium multi-cuisine catering for all events. Live counters & buffet specialists.",
        "advance_required": 25, "status": "Active", "is_verified": 1, "rating": 4.6
    },
    {
        "vendor_name": "Bloom & Blossom Decor",
        "vendor_category": "Decorator",
        "city": "Jaipur", "state": "Rajasthan",
        "min_price": 75000, "max_price": 300000,
        "price_unit": "Per Event",
        "contact_person": "Priya Singh", "email": "priya@bloomdecor.in",
        "phone": "9765432109", "years_in_business": 6,
        "advance_required": 40, "status": "Active", "is_verified": 0, "rating": 4.7
    },
    {
        "vendor_name": "Perfect Weddings Co.",
        "vendor_category": "Event Planner",
        "city": "Hyderabad", "state": "Telangana",
        "min_price": 150000, "max_price": 500000,
        "price_unit": "Per Event",
        "contact_person": "Kavya Reddy", "email": "kavya@perfectweddings.in",
        "phone": "9654321098", "years_in_business": 10,
        "advance_required": 35, "status": "Active", "is_verified": 1, "rating": 4.9
    },
]

DEMO_CUSTOMERS = [
    {"full_name": "Priya Sharma", "email": "priya.sharma@example.com", "phone": "9876501234", "city": "Mumbai"},
    {"full_name": "Rohan Kapoor", "email": "rohan.kapoor@example.com", "phone": "9876502345", "city": "Delhi"},
    {"full_name": "Anjali Gupta", "email": "anjali.gupta@example.com", "phone": "9876503456", "city": "Bangalore"},
    {"full_name": "Vikram Mehta", "email": "vikram.mehta@example.com", "phone": "9876504567", "city": "Hyderabad"},
    {"full_name": "Sneha Joshi", "email": "sneha.joshi@example.com", "phone": "9876505678", "city": "Pune"},
]


def create_demo_customers():
    created = []
    for c in DEMO_CUSTOMERS:
        if not frappe.db.exists("Event Customer", {"email": c["email"]}):
            doc = frappe.get_doc({"doctype": "Event Customer", **c})
            doc.insert(ignore_permissions=True)
            created.append(doc.name)
    return created


def create_demo_vendors():
    created = []
    for v in DEMO_VENDORS:
        if not frappe.db.exists("Vendor Profile", {"vendor_name": v["vendor_name"]}):
            doc = frappe.get_doc({"doctype": "Vendor Profile", **v})
            doc.insert(ignore_permissions=True)
            created.append(doc.name)
    return created


def create_demo_bookings(customers, vendors):
    created = []
    event_types = frappe.get_all("Event Type", pluck="name")
    
    for i, customer in enumerate(customers[:4]):
        vendor = vendors[i % len(vendors)] if vendors else None
        if not vendor:
            continue
        
        event_date = add_days(today(), random.randint(15, 120))
        base_amount = random.randint(50000, 300000)
        
        doc = frappe.get_doc({
            "doctype": "Vendor Booking",
            "booking_title": f"Demo Booking {i+1}",
            "customer": customer,
            "vendor": vendor,
            "event_date": event_date,
            "event_type": event_types[i % len(event_types)] if event_types else None,
            "guest_count": random.randint(100, 500),
            "base_amount": base_amount,
            "gst_percent": 18,
            "advance_percent": 30,
            "booking_status": ["Confirmed", "Requested", "Completed"][i % 3],
        })
        doc.insert(ignore_permissions=True)
        created.append(doc.name)
    return created


def create_demo_payments(bookings):
    created = []
    for booking in bookings[:3]:
        b = frappe.get_doc("Vendor Booking", booking)
        pay = frappe.get_doc({
            "doctype": "Booking Payment",
            "booking": booking,
            "customer": b.customer,
            "payment_date": today(),
            "payment_type": "Advance",
            "payment_mode": random.choice(["UPI", "Credit Card", "Bank Transfer"]),
            "amount": b.advance_amount or 10000,
            "transaction_id": f"TXN{random.randint(100000, 999999)}",
            "status": "Completed",
        })
        pay.insert(ignore_permissions=True)
        created.append(pay.name)
    return created


def create_demo_reviews(bookings, vendors):
    created = []
    reviews_text = [
        "Absolutely stunning venue! The decorations were breathtaking and the service was impeccable.",
        "Outstanding photographer! Captured every moment beautifully. Highly recommended!",
        "Delicious food, excellent presentation. All guests were very happy with the catering.",
    ]
    for i, booking in enumerate(bookings[:3]):
        b = frappe.get_doc("Vendor Booking", booking)
        if b.booking_status == "Completed":
            rev = frappe.get_doc({
                "doctype": "Vendor Review",
                "vendor": b.vendor,
                "booking": booking,
                "customer": b.customer,
                "reviewer_name": frappe.db.get_value("Event Customer", b.customer, "full_name"),
                "rating": random.randint(4, 5),
                "review_title": "Great Experience!",
                "review_text": reviews_text[i % len(reviews_text)],
            })
            rev.insert(ignore_permissions=True)
            created.append(rev.name)
    return created
`
  },
  printFormatHtml: {
    lang: "html",
    code: `{# Booking Confirmation Print Format — print_formats/booking_confirmation.html #}
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'DejaVu Sans', Arial, sans-serif; font-size: 12px; color: #333; }
    .header { background: linear-gradient(135deg, #7c3aed, #9333ea); color: white; padding: 20px 30px; }
    .header h1 { margin: 0; font-size: 22px; }
    .header .subtitle { opacity: 0.85; font-size: 13px; margin-top: 4px; }
    .booking-id { font-family: monospace; font-size: 14px; background: rgba(255,255,255,0.2);
                  padding: 4px 10px; border-radius: 4px; display: inline-block; margin-top: 8px; }
    .content { padding: 25px 30px; }
    .section { margin-bottom: 20px; }
    .section-title { font-size: 11px; font-weight: bold; color: #7c3aed;
                     text-transform: uppercase; letter-spacing: 1px; 
                     border-bottom: 2px solid #7c3aed; padding-bottom: 4px; margin-bottom: 12px; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
    .field { display: flex; flex-direction: column; }
    .field-label { font-size: 10px; color: #888; text-transform: uppercase; letter-spacing: 0.5px; }
    .field-value { font-size: 13px; font-weight: 600; color: #111; margin-top: 2px; }
    .amount-box { background: #f3f0ff; border: 2px solid #7c3aed; border-radius: 8px;
                  padding: 15px; text-align: center; }
    .amount-box .total { font-size: 24px; font-weight: 900; color: #7c3aed; }
    .amount-box .label { color: #888; font-size: 11px; }
    .status-badge { padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: bold;
                    display: inline-block; }
    .status-confirmed { background: #dbeafe; color: #1d4ed8; }
    .status-completed { background: #d1fae5; color: #065f46; }
    .status-pending { background: #fef3c7; color: #92400e; }
    .payment-table { width: 100%; border-collapse: collapse; }
    .payment-table th { background: #f5f3ff; padding: 8px; text-align: left; font-size: 11px; color: #666; }
    .payment-table td { padding: 8px; border-bottom: 1px solid #eee; font-size: 12px; }
    .footer { background: #f9f9f9; border-top: 2px solid #e5e7eb; padding: 15px 30px;
              text-align: center; font-size: 10px; color: #888; }
    .qr-placeholder { width: 80px; height: 80px; border: 2px dashed #ccc;
                      display: flex; align-items: center; justify-content: center; color: #ccc; }
    @media print {
      .header { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }
  </style>
</head>
<body>

<div class="header">
  <h1>💍 EventSphere</h1>
  <div class="subtitle">Event Booking Platform — Booking Confirmation</div>
  <div class="booking-id">{{ doc.name }}</div>
</div>

<div class="content">

  <div class="section">
    <div class="section-title">Booking Details</div>
    <div class="grid">
      <div class="field">
        <span class="field-label">Booking Title</span>
        <span class="field-value">{{ doc.booking_title }}</span>
      </div>
      <div class="field">
        <span class="field-label">Status</span>
        <span class="status-badge status-{{ doc.booking_status|lower }}">{{ doc.booking_status }}</span>
      </div>
      <div class="field">
        <span class="field-label">Booking Date</span>
        <span class="field-value">{{ frappe.format(doc.booking_date, {'fieldtype':'Date'}) }}</span>
      </div>
      <div class="field">
        <span class="field-label">Event Type</span>
        <span class="field-value">{{ doc.event_type or '—' }}</span>
      </div>
    </div>
  </div>

  <div class="grid">
    <div class="section">
      <div class="section-title">Customer Details</div>
      {% set customer = frappe.get_doc('Event Customer', doc.customer) %}
      <div class="field"><span class="field-label">Name</span>
        <span class="field-value">{{ customer.full_name }}</span></div>
      <div class="field"><span class="field-label">Email</span>
        <span class="field-value">{{ customer.email }}</span></div>
      <div class="field"><span class="field-label">Phone</span>
        <span class="field-value">{{ customer.phone }}</span></div>
    </div>
    <div class="section">
      <div class="section-title">Vendor Details</div>
      {% set vendor = frappe.get_doc('Vendor Profile', doc.vendor) %}
      <div class="field"><span class="field-label">Vendor Name</span>
        <span class="field-value">{{ vendor.vendor_name }}</span></div>
      <div class="field"><span class="field-label">Category</span>
        <span class="field-value">{{ vendor.vendor_category }}</span></div>
      <div class="field"><span class="field-label">Contact</span>
        <span class="field-value">{{ vendor.phone }}</span></div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Event Information</div>
    <div class="grid">
      <div class="field"><span class="field-label">Event Date</span>
        <span class="field-value">{{ frappe.format(doc.event_date, {'fieldtype':'Date'}) }}</span></div>
      <div class="field"><span class="field-label">Expected Guests</span>
        <span class="field-value">{{ doc.guest_count or '—' }}</span></div>
      <div class="field"><span class="field-label">Venue / City</span>
        <span class="field-value">{{ doc.venue or '—' }}</span></div>
      <div class="field"><span class="field-label">Selected Package</span>
        <span class="field-value">{{ doc.package or 'Custom' }}</span></div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">Payment Summary</div>
    <table class="payment-table">
      <thead>
        <tr><th>Description</th><th style="text-align:right">Amount (₹)</th></tr>
      </thead>
      <tbody>
        <tr><td>Base Amount</td><td style="text-align:right">{{ '%.2f'|format(doc.base_amount or 0) }}</td></tr>
        <tr><td>Discount ({{ doc.discount_percent }}%)</td>
            <td style="text-align:right">- {{ '%.2f'|format(doc.discount_amount or 0) }}</td></tr>
        <tr><td>Taxable Amount</td>
            <td style="text-align:right">{{ '%.2f'|format(doc.taxable_amount or 0) }}</td></tr>
        <tr><td>GST ({{ doc.gst_percent }}%)</td>
            <td style="text-align:right">{{ '%.2f'|format(doc.gst_amount or 0) }}</td></tr>
        <tr style="font-weight:bold; background:#f3f0ff">
          <td>Total Amount</td>
          <td style="text-align:right; color:#7c3aed">{{ '%.2f'|format(doc.total_amount or 0) }}</td></tr>
        <tr><td>Amount Paid</td>
            <td style="text-align:right; color:#059669">{{ '%.2f'|format(doc.paid_amount or 0) }}</td></tr>
        <tr style="font-weight:bold">
          <td>Balance Due</td>
          <td style="text-align:right; color:#dc2626">{{ '%.2f'|format(doc.balance_amount or 0) }}</td></tr>
      </tbody>
    </table>
  </div>

  {% if doc.terms_conditions %}
  <div class="section">
    <div class="section-title">Terms & Conditions</div>
    <p style="font-size:11px; color:#555; line-height:1.6">{{ doc.terms_conditions }}</p>
  </div>
  {% endif %}

</div>

<div class="footer">
  <p>Generated by EventSphere — Event Booking Platform</p>
  <p>This is a system-generated document. For queries, contact us at support@eventsphere.in</p>
</div>

</body>
</html>
`
  },
  installationCommands: {
    lang: "bash",
    code: `# ════════════════════════════════════════════════════════════
# EventSphere — Event Booking Platform
# Installation Guide for Frappe/ERPNext v15+
# ════════════════════════════════════════════════════════════

# ── Prerequisites ──────────────────────────────────────────
# Frappe Bench v5+, ERPNext v15+, Python 3.10+, Node.js 18+

# ── Step 1: Get the App ────────────────────────────────────
bench get-app event_booking_platform \\
    https://github.com/your-org/event_booking_platform.git

# ── Step 2: Install on Site ────────────────────────────────
bench --site your-site.local install-app event_booking_platform

# ── Step 3: Run Database Migration ─────────────────────────
bench --site your-site.local migrate

# ── Step 4: Build Assets ───────────────────────────────────
bench build --app event_booking_platform

# ── Step 5: Restart & Clear Cache ──────────────────────────
bench restart
bench --site your-site.local clear-cache
bench --site your-site.local clear-website-cache

# ── Step 6: Export Fixtures (for fresh installs) ───────────
bench --site your-site.local export-fixtures \\
    --app event_booking_platform

# ── Step 7: Load Demo Data (optional) ──────────────────────
bench --site your-site.local execute \\
    event_booking_platform.fixtures.demo_data.load_demo_data

# ════════════════════════════════════════════════════════════
# Verify Installation
# ════════════════════════════════════════════════════════════
bench --site your-site.local console
# In console:
# >>> import frappe
# >>> frappe.get_all('Vendor Profile', limit=5)
# >>> frappe.get_all('Vendor Booking', limit=5)

# ════════════════════════════════════════════════════════════
# Development Commands
# ════════════════════════════════════════════════════════════

# Watch for JS/CSS changes
bench watch

# Run tests
bench --site your-site.local run-tests \\
    --app event_booking_platform

# Create new DocType
bench new-doctype --app event_booking_platform

# Update app from Git
bench update --app event_booking_platform

# ════════════════════════════════════════════════════════════
# Troubleshooting
# ════════════════════════════════════════════════════════════

# Fix permission errors
bench --site your-site.local set-user-roles Administrator

# Reset to a clean state (CAUTION: drops all data)
bench --site your-site.local reinstall

# Check app is registered
bench --site your-site.local list-apps

# Rebuild search index
bench --site your-site.local rebuild-global-search
`
  }
};
