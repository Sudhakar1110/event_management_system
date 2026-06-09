# -*- coding: utf-8 -*-
# tasks.py — Scheduled Tasks for Event Booking Platform
from __future__ import unicode_literals
import frappe
from frappe import _
from frappe.utils import today, add_days


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
        customer_email = frappe.db.get_value(
            "Event Customer", booking.customer, "email"
        )
        if customer_email:
            frappe.sendmail(
                recipients=[customer_email],
                template="event_reminder_customer",
                args=booking,
                subject=_("Reminder: Your event is in 3 days — {0}").format(booking.booking_title),
                delayed=False
            )

        vendor_email = frappe.db.get_value(
            "Vendor Profile", booking.vendor, "email"
        )
        if vendor_email:
            frappe.sendmail(
                recipients=[vendor_email],
                template="event_reminder_vendor",
                args=booking,
                subject=_("Upcoming Event Reminder: {0}").format(booking.booking_title),
                delayed=False
            )

    frappe.logger().info(
        "Event reminders sent for {0} bookings on {1}".format(len(bookings), reminder_date)
    )


def check_payment_due_dates():
    """Flag overdue advance payments and notify customers."""
    overdue_bookings = frappe.db.sql("""
        SELECT vb.name, vb.booking_title, vb.customer,
               vb.advance_amount, vb.paid_amount, vb.event_date
        FROM `tabVendor Booking` vb
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
                subject=_("Payment Reminder: {0}").format(booking.booking_title),
                message=_("""
                    Dear Customer,<br><br>
                    Your advance payment of ₹{0:,.2f} for
                    booking <b>{1}</b> (Event on {2})
                    is pending. Please complete the payment to confirm your booking.<br><br>
                    <a href="/my-bookings/{3}">View Booking</a>
                """).format(booking.advance_amount, booking.booking_title, booking.event_date, booking.name),
                delayed=False
            )

    frappe.logger().info(
        "Payment reminders sent for {0} bookings".format(len(overdue_bookings))
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
            FROM `tabVendor Review`
            WHERE vendor = %s AND docstatus = 1
        """, vendor.name, as_dict=True)
        if result:
            frappe.db.set_value("Vendor Profile", vendor.name, {
                "rating": round(result[0].avg_rating or 0, 1),
                "total_reviews": result[0].total or 0
            })
    frappe.db.commit()
    frappe.logger().info("Updated ratings for {0} vendors".format(len(vendors)))


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
            FROM `tabVendor Booking`
            WHERE vendor = %s
              AND booking_date >= %s
              AND docstatus IN (0,1)
        """, (vendor.name, week_start), as_dict=True)[0]

        if stats.total_bookings:
            frappe.sendmail(
                recipients=[vendor.email],
                template="vendor_weekly_report",
                args={"vendor": vendor, "stats": stats, "period": week_start},
                subject=_("Your Weekly Performance Report — {0}").format(vendor.vendor_name),
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
            subject=_("Monthly Revenue Summary — Event Booking Platform"),
            template="monthly_revenue_summary",
            args={"month": frappe.utils.get_datetime().strftime("%B %Y")},
            delayed=False
        )


def cleanup_expired_wishlists():
    """Remove wishlist entries older than 90 days."""
    frappe.db.sql("""
        DELETE FROM `tabVendor Wishlist`
        WHERE creation < DATE_SUB(NOW(), INTERVAL 90 DAY)
    """)
    frappe.db.commit()
