// public/js/booking_payment.js — Client Script
frappe.ui.form.on('Booking Payment', {
    refresh: function(frm) {
        if (frm.doc.docstatus === 1) {
            frm.add_custom_button(__('View Booking'), function() {
                frappe.set_route('Form', 'Vendor Booking', frm.doc.booking);
            });
        }
    },

    booking: function(frm) {
        if (!frm.doc.booking) return;
        frappe.db.get_value('Vendor Booking', frm.doc.booking,
            ['customer', 'balance_amount', 'total_amount', 'paid_amount']
        ).then(function(r) {
            var vals = r.message;
            frm.set_value('customer', vals.customer);
            frm.set_value('amount', vals.balance_amount);
        });
    },

    payment_mode: function(frm) {
        frm.set_df_property('upi_id', 'hidden', frm.doc.payment_mode !== 'UPI');
    }
});
