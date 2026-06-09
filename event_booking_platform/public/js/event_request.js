// public/js/event_request.js — Client Script
frappe.ui.form.on('Event Request', {
    refresh: function(frm) {
        if (!frm.is_new()) {
            frm.add_custom_button(__('Create Booking'), function() {
                frappe.new_doc('Vendor Booking', {
                    event_request: frm.doc.name,
                    customer: frm.doc.customer,
                    event_type: frm.doc.event_type,
                    event_date: frm.doc.event_date,
                    guest_count: frm.doc.guest_count
                });
            }, __('Actions'));
        }
    }
});
