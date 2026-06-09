// public/js/vendor_booking.js — Client Script
frappe.ui.form.on('Vendor Booking', {
    refresh: function(frm) {
        if (!frm.is_new()) {
            frm.add_custom_button(__('Add Payment'), function() {
                frappe.new_doc('Booking Payment', {
                    booking: frm.doc.name,
                    customer: frm.doc.customer,
                    amount: frm.doc.balance_amount,
                    payment_type: frm.doc.paid_amount === 0 ? 'Advance' : 'Installment'
                });
            }, __('Actions'));

            if (frm.doc.booking_status === 'Confirmed' || frm.doc.booking_status === 'Completed') {
                frm.add_custom_button(__('Check Vendor Availability'), function() {
                    frappe.call({
                        method: 'event_booking_platform.booking_management.doctype.vendor_booking.vendor_booking.check_vendor_availability',
                        args: { vendor: frm.doc.vendor, event_date: frm.doc.event_date },
                        callback: function(r) {
                            frappe.msgprint({
                                title: __('Availability Status'),
                                message: r.message.available
                                    ? __('✅ Vendor is available')
                                    : __('❌ Vendor is NOT available'),
                                indicator: r.message.available ? 'green' : 'red'
                            });
                        }
                    });
                }, __('Actions'));
            }
        }
    },

    vendor: function(frm) {
        if (!frm.doc.vendor) return;
        frappe.call({
            method: 'event_booking_platform.booking_management.doctype.vendor_booking.vendor_booking.get_vendor_packages',
            args: { vendor: frm.doc.vendor },
            callback: function(r) {
                if (r.message && r.message.length) {
                    frm.set_df_property('package', 'options', [''].concat(r.message.map(function(p) { return p.name; })).join('\n'));
                }
            }
        });
    },

    package: function(frm) {
        if (!frm.doc.package) return;
        frappe.db.get_doc('Vendor Package', frm.doc.package).then(function(pkg) {
            frm.set_value('base_amount', pkg.price);
        });
    },

    base_amount: function(frm) { frm.trigger('calculate_totals'); },
    discount_percent: function(frm) { frm.trigger('calculate_totals'); },
    gst_percent: function(frm) { frm.trigger('calculate_totals'); },
    advance_percent: function(frm) { frm.trigger('calculate_totals'); },

    calculate_totals: function(frm) {
        var base = flt(frm.doc.base_amount);
        var discPct = flt(frm.doc.discount_percent);
        var gstPct = flt(frm.doc.gst_percent, 18);

        var discAmt = base * discPct / 100;
        var taxable = base - discAmt;
        var gstAmt = taxable * gstPct / 100;
        var total = taxable + gstAmt;

        frm.set_value('discount_amount', discAmt);
        frm.set_value('taxable_amount', taxable);
        frm.set_value('gst_amount', gstAmt);
        frm.set_value('total_amount', total);

        var advPct = flt(frm.doc.advance_percent);
        frm.set_value('advance_amount', total * advPct / 100);
    }
});
