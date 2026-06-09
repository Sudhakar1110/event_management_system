const workspaceLinks = [
  {
    section: "Vendor Management",
    icon: "🏪",
    color: "from-violet-600 to-purple-700",
    links: [
      { label: "Vendor Profile", type: "DocType", onboard: true },
      { label: "Vendor Category", type: "DocType" },
      { label: "Vendor Package", type: "DocType" },
      { label: "Vendor Review", type: "DocType" },
      { label: "Vendor Availability", type: "DocType" },
    ]
  },
  {
    section: "Booking Management",
    icon: "📖",
    color: "from-cyan-600 to-blue-700",
    links: [
      { label: "Vendor Booking", type: "DocType", onboard: true },
      { label: "Hall Booking", type: "DocType" },
      { label: "Package Booking", type: "DocType" },
      { label: "Booking Cancellation", type: "DocType" },
    ]
  },
  {
    section: "Payment Management",
    icon: "💳",
    color: "from-emerald-600 to-green-700",
    links: [
      { label: "Booking Payment", type: "DocType", onboard: true },
      { label: "Payment Installment", type: "DocType" },
      { label: "Refund Request", type: "DocType" },
    ]
  },
  {
    section: "Event Management",
    icon: "📅",
    color: "from-amber-600 to-orange-700",
    links: [
      { label: "Event Request", type: "DocType", onboard: true },
      { label: "Event Plan", type: "DocType" },
      { label: "Event Type", type: "DocType" },
      { label: "Event Customer", type: "DocType" },
    ]
  },
  {
    section: "Reports",
    icon: "📊",
    color: "from-rose-600 to-pink-700",
    links: [
      { label: "Booking Report", type: "Report" },
      { label: "Vendor Performance Report", type: "Report" },
      { label: "Revenue Analysis Report", type: "Report" },
      { label: "Payment Collection Report", type: "Report" },
    ]
  },
  {
    section: "Configuration",
    icon: "⚙️",
    color: "from-gray-600 to-slate-700",
    links: [
      { label: "Event Booking Settings", type: "DocType" },
      { label: "Payment Settings", type: "DocType" },
      { label: "Notification Settings", type: "DocType" },
      { label: "Review Rating Settings", type: "DocType" },
    ]
  }
];

const shortcuts = [
  { label: "Vendor Booking", color: "Purple", badge: "12 Requested", icon: "📖" },
  { label: "New Vendor", color: "Green", icon: "🆕" },
  { label: "New Event Request", color: "Orange", icon: "📅" },
  { label: "Revenue Analysis", color: "Blue", icon: "📈" },
];

export default function WorkspacePreview() {
  return (
    <div className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-purple-400 text-sm font-semibold uppercase tracking-widest">Frappe Desk</span>
          <h3 className="text-3xl font-black text-white mt-2 mb-3">Workspace Configuration</h3>
          <p className="text-gray-400 max-w-xl mx-auto">
            The <code className="text-purple-300 font-mono">workspace.json</code> fixture creates the complete
            EventSphere workspace in Frappe Desk with shortcuts, cards, charts, and number cards.
          </p>
        </div>

        {/* Mock Frappe Desk UI */}
        <div className="bg-white/5 border border-gray-700 rounded-2xl overflow-hidden shadow-2xl">
          {/* Desk Header */}
          <div className="bg-gray-800 px-6 py-3 flex items-center gap-3 border-b border-gray-700">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <div className="flex-1 flex items-center justify-center">
              <div className="bg-gray-700 rounded-lg px-4 py-1 text-gray-400 text-xs font-mono flex-1 max-w-64 text-center">
                https://your-site.local/event-booking-platform
              </div>
            </div>
          </div>

          {/* Desk Sidebar + Content */}
          <div className="flex">
            {/* Sidebar */}
            <div className="w-52 bg-gray-900/80 border-r border-gray-800 p-4 hidden lg:block min-h-96">
              <div className="text-gray-500 text-xs uppercase tracking-widest mb-3">Modules</div>
              <div className="space-y-1">
                {["Event Booking Platform", "Accounting", "Buying", "CRM", "HR"].map((mod, i) => (
                  <div
                    key={mod}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs ${
                      i === 0 ? "bg-purple-900/50 text-purple-300" : "text-gray-500 hover:text-gray-300"
                    }`}
                  >
                    {i === 0 ? "💍" : ""}
                    {mod}
                  </div>
                ))}
              </div>
            </div>

            {/* Workspace Content */}
            <div className="flex-1 p-6 overflow-x-auto">
              {/* Workspace Header */}
              <div className="mb-6">
                <h2 className="text-white font-bold text-xl mb-1">Event Booking Platform</h2>
                <div className="h-0.5 bg-gradient-to-r from-violet-600 to-transparent rounded" />
              </div>

              {/* Shortcuts */}
              <div className="mb-6">
                <div className="text-gray-500 text-xs uppercase tracking-widest mb-3">Shortcuts</div>
                <div className="flex flex-wrap gap-3">
                  {shortcuts.map((s) => (
                    <div
                      key={s.label}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-800/80 border border-gray-700 rounded-xl cursor-pointer hover:border-purple-700/50 transition-all"
                    >
                      <span>{s.icon}</span>
                      <span className="text-gray-200 text-sm">{s.label}</span>
                      {s.badge && (
                        <span className="px-1.5 py-0.5 bg-amber-600/80 rounded text-white text-xs font-bold">
                          {s.badge}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Number Cards */}
              <div className="mb-6">
                <div className="text-gray-500 text-xs uppercase tracking-widest mb-3">Number Cards</div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: "Total Bookings", value: "284", trend: "+12%" },
                    { label: "Active Vendors", value: "48", trend: "+3%" },
                    { label: "Monthly Revenue", value: "₹2.4L", trend: "+18%" },
                    { label: "Pending Requests", value: "12", trend: "-2" },
                  ].map((card) => (
                    <div key={card.label} className="bg-gray-800/60 border border-gray-700 rounded-xl p-3 text-center">
                      <div className="text-2xl font-black text-white">{card.value}</div>
                      <div className="text-gray-400 text-xs">{card.label}</div>
                      <div className={`text-xs mt-1 ${card.trend.startsWith("+") ? "text-emerald-400" : "text-red-400"}`}>
                        {card.trend}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Links / Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {workspaceLinks.map((group) => (
                  <div key={group.section} className="bg-gray-800/40 border border-gray-700/60 rounded-xl overflow-hidden">
                    <div className={`bg-gradient-to-r ${group.color} px-4 py-2.5 flex items-center gap-2`}>
                      <span className="text-sm">{group.icon}</span>
                      <span className="text-white font-semibold text-xs">{group.section}</span>
                    </div>
                    <div className="p-3 space-y-1">
                      {group.links.map((link) => (
                        <div
                          key={link.label}
                          className="flex items-center justify-between px-2 py-1.5 hover:bg-gray-700/50 rounded cursor-pointer group"
                        >
                          <div className="flex items-center gap-2">
                            {link.onboard && <span className="w-1.5 h-1.5 bg-purple-500 rounded-full" />}
                            <span className="text-gray-200 text-xs">{link.label}</span>
                          </div>
                          <span className={`text-xs opacity-60 ${link.type === "Report" ? "text-cyan-400" : "text-gray-500"}`}>
                            {link.type}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-gray-500 text-sm">
          <span>🏠 Workspace auto-created from </span>
          <code className="text-purple-300 font-mono text-xs">fixtures/workspace.json</code>
          <span> — appears immediately after </span>
          <code className="text-emerald-300 font-mono text-xs">bench migrate</code>
        </div>
      </div>
    </div>
  );
}
