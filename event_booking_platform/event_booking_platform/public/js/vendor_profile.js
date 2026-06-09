// public/js/vendor_profile.js — Client Script
frappe.ui.form.on('Vendor Profile', {
    refresh: function(frm) {
        if (!frm.is_new()) {
            frm.add_custom_button(__('View Bookings'), function() {
                frappe.set_route('List', 'Vendor Booking', {vendor: frm.doc.name});
            });

            frm.add_custom_button(__('View Reviews'), function() {
                frappe.set_route('List', 'Vendor Review', {vendor: frm.doc.name});
            });

            frm.add_custom_button(__('View Packages'), function() {
                frappe.set_route('List', 'Vendor Package', {vendor: frm.doc.name});
            });
        }
    },

    vendor_name: function(frm) {
        frm.set_value('vendor_name', frm.doc.vendor_name);
    }
});
