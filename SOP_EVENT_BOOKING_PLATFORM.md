# Standard Operating Procedure (SOP)
## Event Booking Platform — Frappe v15 / ERPNext v15

**Document Version:** 1.0  
**App Version:** 1.0.0  
**Last Updated:** June 2026  
**Department:** Operations / Event Management  

---

## Table of Contents

1. [System Overview](#1-system-overview)
2. [Installation & Setup](#2-installation--setup)
3. [System Architecture](#3-system-architecture)
4. [User Roles & Permissions](#4-user-roles--permissions)
5. [Module Operations](#5-module-operations)
   - 5.1 Vendor Management
   - 5.2 Customer Management
   - 5.3 Event Management
   - 5.4 Booking Management
   - 5.5 Payment Management
   - 5.6 Marketplace
   - 5.7 Configuration
   - 5.8 Reports & Dashboards
6. [Workflows](#6-workflows)
7. [Portal Operations](#7-portal-operations)
8. [Notifications & Communications](#8-notifications--communications)
9. [Scheduled Tasks](#9-scheduled-tasks)
10. [Troubleshooting](#10-troubleshooting)
11. [Maintenance Checklist](#11-maintenance-checklist)
12. [Appendices](#12-appendices)

---

## 1. System Overview

### 1.1 Purpose

The **Event Booking Platform** is a complete event booking marketplace built on Frappe Framework v15+ and ERPNext v15+. It enables:

- Event vendors to list services and manage packages
- Customers to discover vendors, compare packages, and book services
- Platform managers to oversee bookings, payments, and operations

### 1.2 Key Capabilities

| Capability | Description |
|---|---|
| **Vendor Onboarding** | Vendors register profiles; managers approve via workflow |
| **Service Discovery** | Customers search/filter vendors by category, city, rating |
| **Booking Lifecycle** | Draft → Requested → Confirmed → In Progress → Completed |
| **Payment Processing** | UPI, cards, net banking, cash — advance + final payment |
| **Event Planning** | Budget tracking, guest lists, schedules, checklists |
| **Automated Notifications** | Booking confirmations, payment receipts, event reminders |
| **Analytics & Reports** | 7 script reports, 8 dashboard charts, 6 number cards |

### 1.3 Technology Stack

| Component | Technology |
|---|---|
| Framework | Frappe Framework v15.x |
| ERP | ERPNext v15.x |
| Database | MariaDB 10.x |
| Python | 3.10+ |
| Frontend | Frappe Desk + Portal (Jinja) |
| Task Scheduler | Frappe Scheduler (RQ/Redis) |

---

## 2. Installation & Setup

### 2.1 Prerequisites

- Frappe Bench v15.x installed and configured
- ERPNext v15.x installed on target site
- Python 3.10+
- Node.js 18+
- Redis server running
- MariaDB 10.6+

### 2.2 Installation Steps

```bash
# 1. Get the app from repository
bench get-app event_booking_platform \
  https://github.com/Sudhakar1110/event_management_system.git \
  --branch main

# 2. Install on target site
bench --site your-site.local install-app event_booking_platform

# 3. Run database migrations
bench --site your-site.local migrate

# 4. Build frontend assets
bench build --app event_booking_platform

# 5. Clear cache and restart
bench --site your-site.local clear-cache
bench restart

# 6. Verify installation
bench --site your-site.local console
# In console: frappe.get_installed_apps()
```

### 2.3 Demo Data

```bash
bench --site your-site.local execute \
  event_booking_platform.fixtures.demo_data.load_demo_data
```

This creates ~620 interconnected records:
- 20 customers, 20 vendors, 60 packages
- 25 event requests, 15 event plans
- 65 vendor bookings, 15 hall bookings, 15 package bookings
- 90 payments, cancellations, refunds
- Reviews, wishlist, comparisons, recommendations

### 2.4 Fixtures Auto-loading

On `bench migrate`, the following fixtures are automatically loaded via `hooks.py`:

| Fixture | Purpose |
|---|---|
| `Role` | 6 custom roles |
| `Workflow State` | 9 workflow states |
| `Workflow Action Master` | 9 workflow actions |
| `Workflow` | 2 workflows (Vendor Booking, Vendor Profile Approval) |
| `Notification` | 5 email notification templates |
| `Email Template` | 8 email templates |
| `Print Format` | 4 print formats |
| `Workspace` | 1 workspace with links/shortcuts |
| `Dashboard Chart` | 8 dashboard charts |
| `Number Card` | 6 number cards |
| `Vendor Category` | Category master data |
| `Event Type` | Event type master data |
| `Event Booking Settings` | Platform configuration singleton |

---

## 3. System Architecture

### 3.1 Module Map

```
event_booking_platform/
├── vendor_management/        # Vendors, categories, packages, reviews
├── customer_management/      # Customers, profiles, preferences
├── event_management/         # Event types, requests, plans
├── booking_management/       # Vendor, hall, package bookings
├── payment_management/       # Payments, installments, refunds
├── marketplace/              # Wishlist, comparisons, recommendations
├── configuration/            # Platform settings (5 singleton doctypes)
├── reports/                  # 7 script reports
├── templates/                # Email templates + print formats
├── www/                      # Portal pages (vendor marketplace, booking)
├── public/                   # JS/CSS assets
├── utils/                    # Shared utilities (API, calculations, etc.)
└── fixtures/                 # Pre-loaded master data + demo data
```

### 3.2 DocType Relationship Diagram

```
Vendor Profile
├── Vendor Package (standalone, linked via Vendor Profile Package Link)
│   └── Vendor Package Item (child table)
├── Vendor Gallery (child table)
├── Vendor Document (child table)
└── Vendor Availability (standalone)

Event Customer
├── Customer Preference (standalone)
├── Saved Vendor (standalone)
└── Customer Event Profile (child table of Customer)

Event Request
└── Event Service Requirement (child table)

Event Plan
├── Event Budget Item (child table)
├── Event Guest (child table)
├── Event Schedule (child table)
└── Event Checklist Item (child table)

Vendor Booking
├── Booking Custom Item (child table)
├── Booking Payment (standalone)
├── Booking Cancellation (standalone)
├── Refund Request (standalone)
└── Booking Modification Log (child table)
```

### 3.3 Naming Conventions

| DocType | Series / Pattern | Example |
|---|---|---|
| Vendor Profile | `VND-.YYYY.-.####` | VND-2026-0042 |
| Vendor Package | `format:{vendor}-{package_name}` | VND-2026-0042-Platinum |
| Vendor Review | `REV-.YYYY.-.####` | REV-2026-0015 |
| Vendor Booking | `BKG-.YYYY.MM.-.####` | BKG-2026-06-0032 |
| Hall Booking | `HBK-.YYYY.MM.-.####` | HBK-2026-06-0008 |
| Package Booking | `PBK-.YYYY.MM.-.####` | PBK-2026-06-0012 |
| Booking Cancellation | `CNCL-.YYYY.MM.-.####` | CNCL-2026-06-0004 |
| Event Request | `EVT-.YYYY.MM.-.####` | EVT-2026-06-0018 |
| Vendor Category | `field:category_name` | Wedding Hall |
| Event Type | `field:event_type_name` | Wedding |

---

## 4. User Roles & Permissions

### 4.1 Role Matrix

| Role | Desk Access | Capabilities |
|---|---|---|
| **Event Booking Manager** | ✅ Full Desk | Full CRUD on all doctypes. Submit, cancel, amend. Workflow transitions. Report access. |
| **System Manager** | ✅ Full Desk | Inherits all (standard Frappe role, added to Vendor Profile). |
| **Event Booking User** | ✅ Full Desk | Create/edit Vendor Bookings. Cannot manage vendors or configuration. |
| **Event Booking Accounts** | ✅ Full Desk | Payment management, refund processing. |
| **Event Booking Report User** | ✅ Full Desk | Read-only access to reports. |
| **Vendor** | ❌ No Desk | Portal access. Can manage own bookings, respond to requests. |
| **Event Customer** | ❌ No Desk | Portal access. Book vendors, view bookings, leave reviews. |
| **Guest** | ❌ No Desk | Public vendor listing read access. |

### 4.2 Assigning Roles

```bash
# Via Frappe Desk
User List → Select User → Add Roles → [Select Role]

# Via CLI
bench --site your-site.local console
>>> user = frappe.get_doc("User", "vendor@email.com")
>>> user.add_roles("Vendor")
>>> user.save()
```

---

## 5. Module Operations

### 5.1 Vendor Management

#### 5.1.1 Vendor Category
- **Path:** Workspace > Vendor Management > Vendor Category
- **Purpose:** Classify vendors (Wedding Hall, Photographer, Caterer, etc.)
- **Key Fields:** Category Name, Parent Category (hierarchical), Icon, Image
- **Note:** Categories are pre-loaded as fixtures; edit or add new ones as needed

#### 5.1.2 Vendor Profile
- **Path:** Workspace > Vendor Management > Vendor Profile
- **Key Sections:**
  - **Basic Info:** Vendor name, category, profile image
  - **Contact:** Person, email, phone, WhatsApp, social links
  - **Location:** City, state, service areas, geolocation
  - **Business:** Description, years in business, team size
  - **Pricing:** Min/max price, price unit, advance %
  - **Packages:** Link to Vendor Packages (standalone doctype)
  - **Gallery:** Images organized by category (Venue, Decoration, etc.)
  - **Documents:** GST, PAN, verification documents
  - **ERPNext Integration:** Link to Supplier, Portal User

- **Workflow:** Pending Approval → Active | Suspended
- **Statuses:** Active, Inactive, Pending Approval, Suspended

#### 5.1.3 Vendor Package
- **Path:** Workspace > Vendor Management > Vendor Package
- **Purpose:** Service packages/tiers offered by vendors
- **Key Fields:** Vendor (Link), Package Name, Price, Duration, Max Guests
- **Child Table:** Vendor Package Item (itemized breakdown)
- **Note:** Standalone doctype — accessible from Workspace

#### 5.1.4 Vendor Review
- **Path:** Workspace > Vendor Management > Vendor Review
- **Submission:** Customers submit reviews for completed bookings
- **Key Fields:** Vendor, Customer, Booking (unique), Rating (1-5), Review Title/Text
- **Auto-update:** Submitting a review automatically recalculates the vendor's average rating and total review count

#### 5.1.5 Vendor Availability
- **Path:** Workspace > Vendor Management > Vendor Availability
- **Purpose:** Block dates or mark availability
- **Auto-creation:** Created automatically when bookings are confirmed (status: "Booked")
- **Manual:** Can manually block dates (status: "Blocked")

### 5.2 Customer Management

#### 5.2.1 Event Customer
- **Path:** Workspace > (Custom Report/List)
- **Key Fields:** Full Name, Email, Phone, City, DOB
- **Preferences:** Preferred event types, budget range
- **Tracking:** Total bookings count, total spent, last booking date

#### 5.2.2 Customer Preference
- **Purpose:** Track customer preferences for personalization
- **Types:** Event Type, Vendor Category, Cuisine, Theme, Budget Range, City

#### 5.2.3 Saved Vendor
- **Purpose:** Customers save/favorite vendors for quick access
- **Fields:** Customer, Vendor, Is Favorite, Notes

### 5.3 Event Management

#### 5.3.1 Event Type
- **Path:** Workspace > Event Management > Event Type
- **Purpose:** Classify events (Wedding, Reception, Birthday, etc.)
- **Note:** Pre-loaded as fixture; can be extended

#### 5.3.2 Event Request
- **Path:** Workspace > Event Management > Event Request
- **Purpose:** Customer initiates an event request specifying requirements
- **Key Fields:** Event Title, Customer, Event Type, Date, Venue Type, Guest Count, Budget
- **Child Table:** Services Required (links to Vendor Categories with budget)
- **Statuses:** Draft → Open → In Planning → Vendors Confirmed → Completed → Cancelled

#### 5.3.3 Event Plan
- **Path:** Workspace > Event Management > Event Plan
- **Purpose:** Detailed planning with budget, guests, schedule, checklist
- **Child Tables:**
  - Event Budget Item — Category, estimated vs actual cost
  - Event Guest — Name, contact, relation, RSVP status
  - Event Schedule — Activity, start/end time, assigned to
  - Event Checklist Item — Task, status, due date

### 5.4 Booking Management

#### 5.4.1 Vendor Booking (Primary Booking DocType)
- **Path:** Workspace > Booking Management > Vendor Booking
- **Purpose:** Core booking record linking customer → vendor
- **Submission:** Required; only Confirmed or Completed can be submitted
- **Key Sections:**
  - **Booking Info:** Title, Customer, Vendor, Status
  - **Event Details:** Type, date, venue, guests, requirements
  - **Package & Pricing:** Selected package, base amount, discount, GST (18%), total
  - **Payment Summary:** Advance %, paid, balance, payment status
  - **Notes & Terms:** Vendor notes, terms, cancellation policy

- **Status Flow (Workflow):** Draft → Requested → Confirmed → In Progress → Completed
- **Alternative paths:** Requested → Cancelled, Confirmed → Cancelled

#### 5.4.2 Hall Booking
- **Purpose:** Dedicated venue/hall booking (lighter than Vendor Booking)
- **Statuses:** Draft → Confirmed → In Progress → Completed → Cancelled

#### 5.4.3 Package Booking
- **Purpose:** Book a specific vendor package directly
- **Fields:** Links to Vendor Package, simplified pricing

#### 5.4.4 Booking Cancellation
- **Path:** Workspace > Booking Management > (via Vendor Booking)
- **Reasons:** Customer Request, Vendor Unavailable, Payment Issue, Date Conflict, Change of Plans, Other
- **Statuses:** Pending → Approved → Processed → Rejected
- **Refund amount:** Calculated based on cancellation policy and paid amount

#### 5.4.5 Booking Modification Log
- **Purpose:** Auto-track changes to bookings (field changed, old/new values)
- **Log clearing:** Automatically purged every 90 days

### 5.5 Payment Management

#### 5.5.1 Booking Payment
- **Path:** Workspace > Booking Management > Booking Payment
- **Purpose:** Record payments made against a booking
- **Key Fields:** Booking (Link), Customer, Vendor, Amount, Payment Mode, Transaction ID
- **Payment Modes:** UPI, Credit Card, Debit Card, Net Banking, Cash, Cheque, Bank Transfer
- **Payment Types:** Advance, Installment, Final Payment, Refund
- **Statuses:** Completed, Pending, Failed, Refunded
- **Auto-update:** Submitting a payment recalculates the booking's paid_amount and payment_status

#### 5.5.2 Refund Request
- **Path:** Workspace > Booking Management > Refund Request
- **Purpose:** Process refunds for cancelled/overpaid bookings
- **Fields:** Links to Booking, Cancellation, Payment; approval tracking
- **Statuses:** Pending → Approved → Processed → Rejected

### 5.6 Marketplace

#### 5.6.1 Vendor Wishlist
- **Path:** (Background/reporting)
- **Purpose:** Customers save vendors to wishlist for future reference

#### 5.6.2 Vendor Recommendation
- **Purpose:** Automated or manual vendor recommendations for customers
- **Fields:** Customer, Vendor, Recommendation Reason, Score

#### 5.6.3 Package Comparison
- **Purpose:** Customers compare multiple vendor packages side-by-side
- **Fields:** Customer, Packages (comma-separated names), Notes

### 5.7 Configuration

Five **Single** doctypes for platform configuration:

| Setting | Purpose | Key Fields |
|---|---|---|
| **Event Booking Settings** | Core platform config | Platform name, email, currency, GST%, min/max amounts, feature toggles |
| **Vendor Settings** | Vendor management rules | Require approval, auto-approve, commission %, payout cycle |
| **Payment Settings** | Payment gateway config | UPI ID, gateway name, advance %, refund days |
| **Notification Settings** | Email notification controls | Enable/disable, sender info, reminder timing |
| **Review Rating Settings** | Review moderation rules | Enable reviews, require booking, moderation, auto-publish |

### 5.8 Reports & Dashboards

#### 5.8.1 Workspace Dashboard
- **Path:** Workspace > Event Booking Platform
- **Number Cards:** Total Bookings, Active Vendors, Monthly Revenue, Pending Bookings
- **Charts:** Monthly Bookings (Bar), Revenue by Category (Donut)
- **Shortcuts:** Vendor Bookings (with filter), New Vendor, New Event Request, Revenue Analysis

#### 5.8.2 Standard Reports (Script Reports)

| Report | Reference DocType | Purpose |
|---|---|---|
| **Booking Report** | Vendor Booking | Comprehensive booking listing and analysis |
| **Vendor Performance Report** | Vendor Profile | Vendor metrics, booking counts, revenue |
| **Revenue Analysis Report** | Booking Payment | Revenue trends, payment mode analysis |
| **Customer Activity Report** | Event Customer | Customer engagement and booking history |
| **Payment Collection Report** | Booking Payment | Payment status, due amounts, collection efficiency |
| **Cancellation Report** | Booking Cancellation | Cancellation patterns, reasons, refund amounts |
| **Event Analytics Report** | Event Request | Event types, trends, regional distribution |

#### 5.8.3 Dashboard Charts

| Chart Name | Type | Source |
|---|---|---|
| Monthly Bookings | Bar (Timeseries) | Vendor Booking |
| Revenue by Category | Donut | Vendor Profile (min_price) |
| Booking Status Distribution | Donut (Group By) | Vendor Booking |
| Top Vendors by Revenue | Bar (Sum) | Vendor Booking (total_amount) |
| Payment Mode Analysis | Pie (Group By) | Booking Payment |
| Event Type Trends | Line (Timeseries) | Event Request |
| City-wise Bookings | Bar (Group By) | Vendor Booking (venue) |
| Customer Growth | Line (Timeseries) | Event Customer |

---

## 6. Workflows

### 6.1 Vendor Booking Workflow

```
                  ┌─────────┐
                  │  Draft  │
                  └────┬────┘
                       │ Submit Request (Event Booking User)
                       ▼
                  ┌───────────┐
          ┌───────│ Requested │────────┐
          │       └─────┬─────┘        │
          │ Confirm     │              │ Reject (Vendor)
          │ (Vendor)    │              │
          ▼             │              ▼
   ┌───────────┐        │       ┌───────────┐
   │ Confirmed │◄───────┘       │ Cancelled │
   └─────┬─────┘                └───────────┘
         │
         │ Start Event (Event Booking Manager)
         ▼
   ┌─────────────┐
   │ In Progress │
   └──────┬──────┘
          │ Complete Event (Event Booking Manager)
          ▼
    ┌───────────┐
    │ Completed │ (Submitted)
    └───────────┘
          │
   ┌──────┴──────┐
   │  Cancelled  │  ← Cancel Booking (Event Booking Manager)
   └─────────────┘     from Confirmed only
```

**DocStatus mapping:**
- Draft → Requested → Confirmed → In Progress → Completed (docstatus = 1)
- Cancelled (docstatus = 2)

### 6.2 Vendor Profile Approval Workflow

```
   ┌──────────────────┐
   │ Pending Approval │
   └────────┬─────────┘
            │
    ┌───────┴───────┐
    │               │
    ▼               ▼
┌────────┐   ┌───────────┐
│ Active │   │ Suspended │
└───┬────┘   └─────┬─────┘
    │              │
    └──────┬───────┘
           │
    Reactivate / Suspend
           │
           ▼
    (Cycle between Active ↔ Suspended)
```

**Transitions allowed by:** Event Booking Manager only

---

## 7. Portal Operations

### 7.1 Customer Portal Pages

| Route | Page | Purpose |
|---|---|---|
| `/vendors` | Vendor Marketplace | Browse all vendors with search/filter |
| `/vendors/<category>` | Category filtered | Filter vendors by category |
| `/vendor/<vendor_name>` | Vendor Profile | View vendor details and packages |
| `/book/<vendor>` | Booking Form | Create a booking request |
| `/my-bookings` | My Bookings | View/manage customer's bookings |
| `/my-events` | My Events | View customer's event requests and plans |

### 7.2 Vendor Portal Pages

| Route | Page | Purpose |
|---|---|---|
| `/vendor-dashboard` | Vendor Dashboard | Overview of bookings and stats |
| `/vendor-bookings` | My Bookings | Manage bookings for this vendor |

### 7.3 Portal Menu Configuration

Configured in `hooks.py` under `portal_menu_items`:

| Menu Item | Role Required | Route |
|---|---|---|
| My Bookings | Event Customer | `/my-bookings` |
| My Events | Event Customer | `/my-events` |
| Find Vendors | Event Customer | `/vendors` |
| Vendor Dashboard | Vendor | `/vendor-dashboard` |
| My Bookings | Vendor | `/vendor-bookings` |

---

## 8. Notifications & Communications

### 8.1 Automated Email Notifications

| Notification Name | Trigger | Recipient |
|---|---|---|
| Booking Confirmation — Customer | `booking_status` → "Confirmed" | Customer email |
| New Booking Request — Vendor | `booking_status` → "Requested" | Vendor email |
| Payment Received Confirmation | Booking Payment submitted | Customer email |
| Booking Cancellation Alert | `booking_status` → "Cancelled" | Customer + Vendor |
| Vendor Profile Approved | `status` → "Active" | Vendor email |

### 8.2 Email Templates (for custom sends)

| Template | Purpose |
|---|---|
| `booking_confirmation` | Manual booking confirmation email |
| `booking_request` | New booking notification |
| `payment_receipt` | Payment confirmation |
| `event_reminder_customer` | Upcoming event reminder (customer) |
| `event_reminder_vendor` | Upcoming event reminder (vendor) |
| `vendor_approved` | Vendor approval notification |
| `cancellation_notice` | Booking cancellation alert |
| `monthly_revenue_summary` | Monthly revenue report to managers |
| `vendor_weekly_report` | Weekly performance report to vendors |

### 8.3 Print Formats

| Format | DocType | Use Case |
|---|---|---|
| Booking Confirmation | Vendor Booking | Customer-facing booking PDF |
| Tax Invoice | Vendor Booking | GST-compliant invoice |
| Payment Receipt | Booking Payment | Payment acknowledgment |
| Vendor Profile Card | Vendor Profile | Vendor summary card |

---

## 9. Scheduled Tasks

### 9.1 Daily Tasks (runs at midnight)

| Task | Function | Purpose |
|---|---|---|
| Event Reminders | `tasks.send_upcoming_event_reminders` | Send 3-day advance reminders for confirmed bookings |
| Payment Due Check | `tasks.check_payment_due_dates` | Flag overdue advance payments |
| Rating Update | `tasks.update_vendor_ratings` | Recalculate vendor average ratings from reviews |

### 9.2 Weekly Tasks (runs on Sunday)

| Task | Function | Purpose |
|---|---|---|
| Vendor Reports | `tasks.generate_weekly_vendor_reports` | Email weekly performance stats to vendors |
| Wishlist Cleanup | `tasks.cleanup_expired_wishlists` | Delete wishlist entries older than 90 days |

### 9.3 Monthly Tasks (runs on 1st of month)

| Task | Function | Purpose |
|---|---|---|
| Revenue Summary | `tasks.generate_monthly_revenue_summary` | Email monthly revenue report to Event Booking Managers |

### 9.4 Log Clearing

| Log Type | Retention Period |
|---|---|
| Booking Modification Log | 90 days |

### 9.5 Managing Scheduled Tasks

```bash
# Check scheduler status
bench --site your-site.local scheduler status

# Enable scheduler
bench --site your-site.local scheduler enable

# Manually trigger a task
bench --site your-site.local execute event_booking_platform.tasks.update_vendor_ratings

# Disable scheduler for maintenance
bench --site your-site.local scheduler disable
```

---

## 10. Troubleshooting

### 10.1 Common Errors

| Error | Likely Cause | Resolution |
|---|---|---|
| `Unknown column 'parent' in 'WHERE'` | A Table field references a doctype that is not marked `istable: 1` | Add `"istable": 1` to the child doctype JSON, run `bench migrate` |
| `Page vendor-package not found` | Vendor Package is marked as `istable: 1` (child table) but workspace expects standalone | Remove `"istable": 1`, ensure a bridge child table exists for the parent relationship, run `bench migrate` |
| `Workflow State transition not allowed` | Attempting to set invalid status directly via code | Use `doc.flags.ignore_workflow = True` for bulk operations, or use `frappe.db.set_value()` to bypass workflow |
| `Duplicate entry for key 'PRIMARY'` | Child table autoname uses `{parent}` which resolves to empty during inline insert | Insert parent doc first, then `append()` child records, then `save()` |
| `Fixture load failed` | Fixture JSON references a doctype that doesn't exist | Verify all referenced doctypes are installed; check fixture load order in `hooks.py` |
| Notification not sending | `receiver_by_document_field` references a field that doesn't exist on the document | Verify field name exists as a field on the document (not fetched_from) |

### 10.2 Diagnostic Commands

```bash
# Check app status
bench --site your-site.local console
>>> frappe.get_installed_apps()
>>> frappe.get_single_value("Event Booking Settings", "platform_name")

# Verify doctype schema
bench --site your-site.local console
>>> frappe.get_meta("Vendor Profile")
>>> frappe.get_meta("Vendor Package").istable

# Check workflow state
bench --site your-site.local console
>>> frappe.get_all("Workflow", filters={"document_type": "Vendor Booking"})

# Test notifications
bench --site your-site.local console
>>> frappe.sendmail(recipients="test@example.com", subject="Test", message="Testing")

# Check scheduler logs
bench --site your-site.local console
>>> frappe.logger().info("Manual test log entry")
```

### 10.3 Recovery Procedures

#### Re-running Demo Data After Failed Attempt
```bash
# 1. Clear orphaned child records
bench --site your-site.local console
>>> frappe.db.sql("DELETE FROM `tabEvent Service Requirement` WHERE name LIKE '-%'")
>>> frappe.db.commit()

# 2. Re-run demo data
bench --site your-site.local execute \
  event_booking_platform.fixtures.demo_data.load_demo_data
```

#### Fixing Broken Child Table References
```bash
# If a doctype was incorrectly marked as istable (child table)
# 1. Edit the JSON to remove "istable": 1
# 2. Create a new child table with a Link field to the standalone doctype
# 3. Update the parent doctype's Table field to reference the new child table
# 4. Run bench migrate
```

---

## 11. Maintenance Checklist

### 11.1 Daily

- [ ] Check scheduler is running: `bench --site your-site.local scheduler status`
- [ ] Monitor error logs: `bench --site your-site.local console` → `frappe.log_error(...)` check
- [ ] Verify pending bookings are being processed

### 11.2 Weekly

- [ ] Review vendor performance reports
- [ ] Check pending vendor approvals
- [ ] Monitor payment collections and overdue amounts
- [ ] Backup database: `bench --site your-site.local backup`

### 11.3 Monthly

- [ ] Generate and review monthly revenue summary
- [ ] Review and clean up cancelled bookings
- [ ] Verify scheduled tasks ran successfully
- [ ] Audit user roles and permissions
- [ ] Check disk space and log rotation
- [ ] Review and update vendor categories if needed

### 11.4 Quarterly

- [ ] Full database backup
- [ ] Review and optimize database tables
- [ ] Update app: `bench pull && bench migrate && bench build`
- [ ] Audit fixtures for data consistency
- [ ] Test portal pages for all user roles
- [ ] Verify all reports render correctly
- [ ] Review and update email templates

### 11.5 Yearly

- [ ] Full security audit
- [ ] Review and archive old records (>1 year)
- [ ] Update naming series if format changes needed
- [ ] Review and update workflow configurations
- [ ] Test disaster recovery procedures

---

## 12. Appendices

### Appendix A: ERPNext Integration

The app integrates with ERPNext via custom fields on standard doctypes:

| ERPNext DocType | Custom Fields Added |
|---|---|
| **Supplier** | `event_vendor` (Link → Vendor Profile), `vendor_category` (Link → Vendor Category), `is_event_vendor` (Check) |
| **Customer** | `event_customer` (Link → Event Customer), `preferred_event_type` (Link → Event Type), `total_events` (Int, read-only) |
| **Payment Entry** | `booking_payment` (Link → Booking Payment), `event_booking_ref` (Link → Vendor Booking) |

These are managed via `fixtures/custom_fields.json`.

### Appendix B: API Endpoints (Whitelisted)

| Method | Endpoint | Purpose |
|---|---|---|
| `vendor_profile.get_vendor_by_user` | GET | Get vendor profile for current user |
| `vendor_profile.get_vendor_booking_stats` | GET | Get booking statistics for a vendor |
| `vendor_booking.get_vendor_packages` | GET | Get active packages for a vendor |
| `vendor_booking.check_vendor_availability` | GET | Check if vendor is available on a date |
| `vendor_booking.get_booking_summary` | GET | Get booking summary for a specific booking |

### Appendix C: File Structure

```
event_booking_platform/
├── hooks.py                    # App configuration, fixtures, doc_events
├── modules.txt                 # Module registration
├── patches.txt                 # Patch migration registry
├── setup.py / pyproject.toml   # Python packaging
├── event_booking_platform/     # Main app package
│   ├── booking_management/     # Booking DocTypes + reports
│   ├── configuration/          # Singleton settings DocTypes
│   ├── customer_management/    # Customer DocTypes
│   ├── event_management/       # Event DocTypes
│   ├── fixtures/               # Pre-loaded data (JSON + demo_data.py)
│   ├── marketplace/            # Wishlist, recommendations, comparisons
│   ├── patches/                # Migration patches
│   ├── payment_management/     # Payment DocTypes
│   ├── public/                 # JS/CSS assets
│   ├── reports/                # Script report implementations
│   ├── templates/              # Email + print templates
│   ├── utils/                  # Shared utilities
│   ├── vendor_management/      # Vendor DocTypes
│   └── www/                    # Portal pages
```

### Appendix D: Quick Reference Commands

```bash
# App Management
bench get-app event_booking_platform <repo-url>
bench --site <site> install-app event_booking_platform
bench --site <site> uninstall-app event_booking_platform
bench --site <site> migrate
bench build --app event_booking_platform
bench --site <site> clear-cache
bench restart

# Demo Data
bench --site <site> execute event_booking_platform.fixtures.demo_data.load_demo_data

# Console
bench --site <site> console

# Backup
bench --site <site> backup

# Scheduler
bench --site <site> scheduler enable|disable|status
bench --site <site> execute event_booking_platform.tasks.<function_name>

# Logs
bench --site <site> logs
```

---

*End of SOP Document — Event Booking Platform v1.0.0*
