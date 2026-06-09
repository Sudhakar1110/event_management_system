// event_booking_platform.js — Global JS for Event Booking Platform
// This file is loaded globally via hooks.py app_include_js

frappe.provide('event_booking_platform');

event_booking_platform = {
    /**
     * Format a number as Indian Rupee currency
     */
    format_currency: function(amount) {
        return '₹' + format_number(flt(amount), null, 2);
    },

    /**
     * Get vendor name from booking
     */
    get_vendor_name: function(booking_name, callback) {
        frappe.db.get_value('Vendor Booking', booking_name, 'booking_title', callback);
    }
};

// Initialize tooltips and UI enhancements on page load
$(document).ready(function() {
    // Add custom styling for booking status indicators
    $('.booking-status').each(function() {
        var status = $(this).text().trim();
        var colors = {
            'Draft': 'gray',
            'Requested': 'orange',
            'Confirmed': 'blue',
            'In Progress': 'purple',
            'Completed': 'green',
            'Cancelled': 'red',
            'Pending Approval': 'yellow'
        };
        if (colors[status]) {
            $(this).addClass('indicator ' + colors[status]);
        }
    });
});
