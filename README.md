# Event Booking Platform

Complete Event Booking Marketplace (WeddingWire-inspired) built natively for Frappe Framework v15+ and ERPNext v15+.

## Features

- **Vendor Management** — Manage all event vendors (halls, photographers, caterers, decorators, etc.)
- **Customer Management** — Customer registration, profiles, preferences and booking history
- **Event Management** — Event types, planning, budget tracking, guest and schedule management
- **Booking Management** — Complete booking lifecycle from request to confirmation, modification and cancellation
- **Payment Management** — UPI, card, cash payments, advance tracking and refund management
- **Marketplace** — Search, filter, compare, wishlist and recommendation features
- **Configuration** — Platform settings for vendors, payments, notifications and reviews
- **Portal Pages** — Vendor marketplace, booking form, customer dashboard, vendor dashboard
- **Reports & Dashboards** — 7 Script Reports, 8 Dashboard Charts, 6 Number Cards
- **Workflows** — Vendor Booking Workflow, Vendor Profile Approval Workflow
- **Email Notifications** — Automated booking confirmation, payment receipts, event reminders

## Installation

```bash
# Get the app (explicitly name it to match the app code)
bench get-app event_booking_platform https://github.com/Sudhakar1110/event_management_system.git --branch main

# Install on site
bench --site your-site.local install-app event_booking_platform

# Run migrations
bench --site your-site.local migrate

# Build assets
bench build --app event_booking_platform

# Restart
bench restart && bench --site your-site.local clear-cache

# Load demo data (optional)
bench --site your-site.local execute event_booking_platform.fixtures.demo_data.load_demo_data
```

## Modules

| Module | Description | DocTypes |
|--------|-------------|---------|
| Vendor Management | Manage vendors, categories, packages | 8+ DocTypes |
| Customer Management | Customer profiles and preferences | 4 DocTypes |
| Event Management | Event types, planning, budget | 7+ DocTypes |
| Booking Management | Full booking lifecycle | 6 DocTypes |
| Payment Management | Payments, installments, refunds | 3 DocTypes |
| Marketplace | Wishlist, comparisons, recommendations | 3 DocTypes |
| Configuration | Platform settings | 5 DocTypes |

## Roles

- Event Booking Manager — Full access to all modules
- Event Booking User — Create and manage bookings
- Vendor — Vendor portal access
- Event Customer — Customer portal access
- Event Booking Accounts — Payment management
- Event Booking Report User — Report access

## CI

This app uses GitHub Actions for CI. The following workflows are configured:

- **CI**: Installs this app and runs unit tests on every push.
- **Linters**: Runs [Frappe Semgrep Rules](https://github.com/frappe/semgrep-rules) and [pip-audit](https://pypi.org/project/pip-audit/) on every pull request.

## License

MIT
