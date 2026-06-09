const componentGroups = [
  {
    title: "Core DocTypes",
    icon: "📋",
    color: "violet",
    items: [
      { name: "Vendor Profile", desc: "Full vendor management with ERPNext Supplier link", tag: "Submittable" },
      { name: "Vendor Booking", desc: "Complete booking lifecycle, auto-calculations", tag: "Submittable" },
      { name: "Booking Payment", desc: "Multi-mode payment with Payment Entry integration", tag: "Submittable" },
      { name: "Event Request", desc: "Customer event planning with service requirements", tag: "Submittable" },
      { name: "Vendor Review", desc: "Rating & review system with auto-aggregation", tag: "Submittable" },
      { name: "Hall Booking", desc: "Wedding/banquet hall specific booking form", tag: "Submittable" },
      { name: "Refund Request", desc: "Refund workflow with Journal Entry creation", tag: "Submittable" },
      { name: "Event Customer", desc: "Customer profile linked to ERPNext Customer", tag: "Standard" },
    ]
  },
  {
    title: "Child Tables",
    icon: "👶",
    color: "blue",
    items: [
      { name: "Vendor Package Item", desc: "Package inclusions and pricing", tag: "Child" },
      { name: "Vendor Gallery", desc: "Photo gallery images per vendor", tag: "Child" },
      { name: "Vendor Document", desc: "KYC and business documents", tag: "Child" },
      { name: "Booking Custom Item", desc: "Custom requirements per booking", tag: "Child" },
      { name: "Event Service Requirement", desc: "Services needed for an event", tag: "Child" },
      { name: "Event Budget Item", desc: "Budget allocation per service", tag: "Child" },
      { name: "Event Guest", desc: "Guest list with RSVP tracking", tag: "Child" },
      { name: "Event Schedule", desc: "Timeline of event activities", tag: "Child" },
    ]
  },
  {
    title: "Single DocTypes (Settings)",
    icon: "⚙️",
    color: "gray",
    items: [
      { name: "Event Booking Settings", desc: "Global app settings, branding, limits", tag: "Single" },
      { name: "Vendor Settings", desc: "Approval flow, commission, verification rules", tag: "Single" },
      { name: "Payment Settings", desc: "UPI ID, payment gateway, advance %, refund policy", tag: "Single" },
      { name: "Notification Settings", desc: "Email/WhatsApp toggle per notification type", tag: "Single" },
      { name: "Review Rating Settings", desc: "Min reviews, moderation, display rules", tag: "Single" },
    ]
  },
  {
    title: "Portal & Website Pages",
    icon: "🌐",
    color: "cyan",
    items: [
      { name: "/vendors", desc: "Vendor marketplace with search & filters", tag: "www/" },
      { name: "/vendor/<name>", desc: "Vendor detail page with packages, gallery, reviews", tag: "www/" },
      { name: "/book/<vendor>", desc: "Booking form with date picker and package selection", tag: "www/" },
      { name: "/my-bookings", desc: "Customer booking list and status tracking", tag: "Portal" },
      { name: "/my-events", desc: "Customer event planning dashboard", tag: "Portal" },
      { name: "/vendor-dashboard", desc: "Vendor performance dashboard", tag: "Portal" },
    ]
  },
  {
    title: "Email Templates",
    icon: "📧",
    color: "orange",
    items: [
      { name: "Booking Confirmation", desc: "HTML template for booking confirmed emails", tag: "Template" },
      { name: "New Booking Request", desc: "Vendor notification for new requests", tag: "Template" },
      { name: "Payment Receipt", desc: "Payment acknowledgement with details", tag: "Template" },
      { name: "Event Reminder", desc: "3-day event reminder for customer & vendor", tag: "Template" },
      { name: "Vendor Approved", desc: "Welcome email on vendor profile approval", tag: "Template" },
      { name: "Weekly Vendor Report", desc: "Weekly performance summary for vendors", tag: "Template" },
      { name: "Cancellation Notice", desc: "Booking cancellation with refund info", tag: "Template" },
      { name: "Monthly Revenue Summary", desc: "Monthly report for admins", tag: "Template" },
    ]
  },
  {
    title: "Print Formats",
    icon: "🖨️",
    color: "pink",
    items: [
      { name: "Booking Confirmation", desc: "Detailed booking confirmation with payment summary", tag: "Print" },
      { name: "Tax Invoice", desc: "GST-compliant invoice for vendor services", tag: "Print" },
      { name: "Payment Receipt", desc: "Official payment receipt with transaction details", tag: "Print" },
      { name: "Vendor Profile Card", desc: "Printable vendor profile sheet", tag: "Print" },
    ]
  },
];

const tagColors: Record<string, string> = {
  "Submittable": "bg-blue-900/50 text-blue-300 border-blue-800/50",
  "Standard": "bg-gray-800/60 text-gray-400 border-gray-700/50",
  "Child": "bg-pink-900/50 text-pink-300 border-pink-800/50",
  "Single": "bg-amber-900/50 text-amber-300 border-amber-800/50",
  "www/": "bg-cyan-900/50 text-cyan-300 border-cyan-800/50",
  "Portal": "bg-teal-900/50 text-teal-300 border-teal-800/50",
  "Template": "bg-orange-900/50 text-orange-300 border-orange-800/50",
  "Print": "bg-rose-900/50 text-rose-300 border-rose-800/50",
};

const borderColors: Record<string, string> = {
  violet: "border-violet-900/50 hover:border-violet-700/50",
  blue: "border-blue-900/50 hover:border-blue-700/50",
  gray: "border-gray-800 hover:border-gray-700",
  cyan: "border-cyan-900/50 hover:border-cyan-700/50",
  orange: "border-orange-900/50 hover:border-orange-700/50",
  pink: "border-pink-900/50 hover:border-pink-700/50",
};

const headerColors: Record<string, string> = {
  violet: "bg-gradient-to-r from-violet-950/60 to-purple-950/40",
  blue: "bg-gradient-to-r from-blue-950/60 to-cyan-950/40",
  gray: "bg-gradient-to-r from-gray-800/60 to-gray-900/40",
  cyan: "bg-gradient-to-r from-cyan-950/60 to-teal-950/40",
  orange: "bg-gradient-to-r from-orange-950/60 to-amber-950/40",
  pink: "bg-gradient-to-r from-pink-950/60 to-rose-950/40",
};

export default function FrappeComponentsSection() {
  return (
    <section className="py-24 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-purple-400 text-sm font-semibold uppercase tracking-widest">Complete Component List</span>
          <h2 className="text-4xl font-black text-white mt-2 mb-4">Every Frappe Component Included</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From DocTypes and Child Tables to Portal Pages and Print Formats —
            every component is production-ready with proper permissions and validation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {componentGroups.map((group) => (
            <div
              key={group.title}
              className={`bg-gray-900/60 border rounded-2xl overflow-hidden transition-all duration-200 ${borderColors[group.color]}`}
            >
              {/* Group Header */}
              <div className={`px-5 py-4 border-b border-gray-800 ${headerColors[group.color]}`}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{group.icon}</span>
                  <div>
                    <h3 className="text-white font-bold">{group.title}</h3>
                    <span className="text-gray-500 text-xs">{group.items.length} components</span>
                  </div>
                </div>
              </div>

              {/* Items */}
              <div className="divide-y divide-gray-800/60">
                {group.items.map((item) => (
                  <div key={item.name} className="px-5 py-3 flex items-start justify-between gap-3 hover:bg-gray-800/30 transition-colors">
                    <div className="min-w-0 flex-1">
                      <div className="text-gray-200 text-sm font-medium truncate" title={item.name}>
                        {item.name}
                      </div>
                      <div className="text-gray-500 text-xs mt-0.5 leading-relaxed">{item.desc}</div>
                    </div>
                    <span className={`px-2 py-0.5 rounded border text-xs font-mono flex-shrink-0 ${tagColors[item.tag] || "bg-gray-800 text-gray-400 border-gray-700"}`}>
                      {item.tag}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Summary Row */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {[
            { count: "40+", label: "DocTypes" },
            { count: "15+", label: "Child Tables" },
            { count: "5", label: "Settings" },
            { count: "7", label: "Reports" },
            { count: "8", label: "Charts" },
            { count: "6", label: "Portal Pages" },
            { count: "8", label: "Email Templates" },
            { count: "4", label: "Print Formats" },
          ].map((item) => (
            <div key={item.label} className="bg-gray-900/60 border border-gray-800 rounded-xl p-3 text-center">
              <div className="text-xl font-black text-purple-400">{item.count}</div>
              <div className="text-gray-600 text-xs">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Custom Fields on ERPNext DocTypes */}
        <div className="mt-12 bg-gray-900/60 border border-gray-800 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span>🔗</span> Custom Fields on ERPNext DocTypes
            <span className="text-xs text-gray-500 font-normal ml-2">via fixtures/custom_fields.json</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                doctype: "Supplier",
                fields: ["event_vendor (Link → Vendor Profile)", "vendor_category (Data)", "is_event_vendor (Check)"]
              },
              {
                doctype: "Customer",
                fields: ["event_customer (Link → Event Customer)", "preferred_event_type (Link → Event Type)", "total_events (Int, read-only)"]
              },
              {
                doctype: "Payment Entry",
                fields: ["booking_payment (Link → Booking Payment)", "event_booking_ref (Link → Vendor Booking)"]
              },
              {
                doctype: "Sales Invoice",
                fields: ["vendor_booking (Link → Vendor Booking)", "hall_booking (Link → Hall Booking)", "event_date (Date)"]
              },
              {
                doctype: "Journal Entry",
                fields: ["refund_request (Link → Refund Request)", "booking_ref (Link → Vendor Booking)"]
              },
              {
                doctype: "User",
                fields: ["vendor_profile (Link → Vendor Profile)", "event_customer_profile (Link → Event Customer)"]
              },
            ].map((cf) => (
              <div key={cf.doctype} className="bg-gray-800/40 border border-gray-700/50 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 bg-emerald-900/60 border border-emerald-800/50 rounded text-emerald-300 text-xs font-mono">
                    {cf.doctype}
                  </span>
                </div>
                <ul className="space-y-1.5">
                  {cf.fields.map((field) => (
                    <li key={field} className="flex items-start gap-1.5 text-xs text-gray-400">
                      <span className="text-purple-500 mt-0.5">+</span>
                      <code className="text-gray-300 font-mono text-xs">{field}</code>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
