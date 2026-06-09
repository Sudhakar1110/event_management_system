import { workflows, roles } from "../data/appStructure";

const stateColors: Record<string, string> = {
  "Draft": "bg-gray-700 border-gray-600 text-gray-200",
  "Requested": "bg-amber-900/60 border-amber-700 text-amber-200",
  "Confirmed": "bg-blue-900/60 border-blue-700 text-blue-200",
  "In Progress": "bg-cyan-900/60 border-cyan-700 text-cyan-200",
  "Completed": "bg-emerald-900/60 border-emerald-700 text-emerald-200",
  "Cancelled": "bg-red-900/60 border-red-700 text-red-200",
  "Pending Approval": "bg-orange-900/60 border-orange-700 text-orange-200",
  "Active": "bg-green-900/60 border-green-700 text-green-200",
  "Suspended": "bg-rose-900/60 border-rose-700 text-rose-200",
};

const roleDescriptions: Record<string, { icon: string; perms: string[] }> = {
  "Event Booking Manager": {
    icon: "👑",
    perms: ["Full CRUD on all DocTypes", "Submit & Cancel Bookings", "Approve Vendors", "Access all Reports", "Configure Settings"]
  },
  "Event Booking User": {
    icon: "📝",
    perms: ["Create & Edit Bookings", "View Vendors", "Add Payments", "View own Reports"]
  },
  "Vendor": {
    icon: "🏪",
    perms: ["Manage own Vendor Profile", "View assigned Bookings", "Confirm/Decline Requests", "View own Reviews", "Portal Access"]
  },
  "Event Customer": {
    icon: "👰",
    perms: ["View Vendors (Portal)", "Create Bookings", "View own Bookings", "Submit Reviews", "Manage Wishlist"]
  },
  "Event Booking Accounts": {
    icon: "💰",
    perms: ["Manage Payments", "View Payment Reports", "Process Refunds", "Export Financial Data"]
  },
  "Event Booking Report User": {
    icon: "📊",
    perms: ["Access all Reports", "View Dashboards", "Export Report Data"]
  },
};

const notifications = [
  { event: "Booking Requested", recipients: "Vendor Email", channel: "Email", trigger: "booking_status → Requested" },
  { event: "Booking Confirmed", recipients: "Customer Email", channel: "Email", trigger: "booking_status → Confirmed" },
  { event: "Payment Received", recipients: "Customer Email", channel: "Email", trigger: "Booking Payment Submit" },
  { event: "Booking Cancelled", recipients: "Customer + Vendor", channel: "Email", trigger: "booking_status → Cancelled" },
  { event: "Vendor Approved", recipients: "Vendor Email", channel: "Email", trigger: "status → Active" },
  { event: "Event Reminder (3 days)", recipients: "Customer + Vendor", channel: "Email", trigger: "Scheduler Daily" },
  { event: "Payment Due Alert", recipients: "Customer Email", channel: "Email", trigger: "Scheduler Daily" },
];

export default function WorkflowSection() {
  return (
    <section className="py-24 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-purple-400 text-sm font-semibold uppercase tracking-widest">Business Logic</span>
          <h2 className="text-4xl font-black text-white mt-2 mb-4">Workflows, Roles & Notifications</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Complete lifecycle management with Frappe's built-in workflow engine,
            role-based permissions, and automated email notifications.
          </p>
        </div>

        {/* Workflows */}
        <div className="mb-16">
          <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
            <span className="w-8 h-8 bg-violet-900/60 rounded-lg flex items-center justify-center">🔄</span>
            Workflow Definitions
          </h3>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {workflows.map((wf) => (
              <div key={wf.name} className="bg-gray-900/80 border border-gray-800 rounded-2xl overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-800 bg-gray-800/40">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🔄</span>
                    <div>
                      <h4 className="text-white font-bold">{wf.name}</h4>
                      <span className="text-gray-500 text-xs font-mono">Document Type: {wf.document_type}</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  {/* States */}
                  <div className="mb-6">
                    <p className="text-gray-500 text-xs uppercase tracking-widest mb-3">States</p>
                    <div className="flex flex-wrap gap-2">
                      {wf.states.map((state) => (
                        <span
                          key={state.state}
                          className={`px-3 py-1.5 rounded-lg border text-xs font-semibold ${stateColors[state.state] || "bg-gray-800 border-gray-700 text-gray-300"}`}
                        >
                          {state.state}
                          {state.doc_status === 1 && <span className="ml-1 opacity-60">[submit]</span>}
                          {state.doc_status === 2 && <span className="ml-1 opacity-60">[cancel]</span>}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Transitions */}
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-widest mb-3">Transitions</p>
                    <div className="space-y-2">
                      {wf.transitions.map((tr, i) => (
                        <div key={i} className="flex items-center gap-2 p-2 bg-gray-800/40 rounded-lg text-xs">
                          <span className={`px-2 py-0.5 rounded border ${stateColors[tr.state] || "bg-gray-700 border-gray-600 text-gray-300"}`}>
                            {tr.state}
                          </span>
                          <span className="text-gray-500">→</span>
                          <span className="px-2 py-0.5 bg-purple-900/50 border border-purple-800/50 rounded text-purple-300 font-semibold">
                            {tr.action}
                          </span>
                          <span className="text-gray-500">→</span>
                          <span className={`px-2 py-0.5 rounded border ${stateColors[tr.next_state] || "bg-gray-700 border-gray-600 text-gray-300"}`}>
                            {tr.next_state}
                          </span>
                          <span className="ml-auto text-gray-600 italic">{tr.allowed}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Lifecycle Diagram */}
        <div className="mb-16 bg-gray-900/80 border border-gray-800 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
            <span className="w-8 h-8 bg-cyan-900/60 rounded-lg flex items-center justify-center">📍</span>
            Complete Booking Lifecycle
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { state: "Customer\nRegistration", icon: "👤", color: "from-gray-700 to-gray-800" },
              { state: "Vendor\nSearch", icon: "🔍", color: "from-blue-900 to-blue-800" },
              { state: "Request\nBooking", icon: "📝", color: "from-amber-900 to-amber-800" },
              { state: "Vendor\nConfirms", icon: "✅", color: "from-violet-900 to-violet-800" },
              { state: "Advance\nPayment", icon: "💳", color: "from-emerald-900 to-emerald-800" },
              { state: "Event\nExecution", icon: "🎉", color: "from-purple-900 to-purple-800" },
              { state: "Final\nPayment", icon: "💰", color: "from-green-900 to-green-800" },
              { state: "Review &\nRating", icon: "⭐", color: "from-yellow-900 to-yellow-800" },
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className={`bg-gradient-to-br ${step.color} border border-gray-700 rounded-xl p-3 text-center min-w-20`}>
                  <div className="text-2xl mb-1">{step.icon}</div>
                  <div className="text-white text-xs font-semibold leading-tight whitespace-pre-line">{step.state}</div>
                  <div className="text-gray-500 text-xs">Step {i + 1}</div>
                </div>
                {i < 7 && <span className="text-gray-600 text-xl hidden sm:block">›</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Roles */}
        <div className="mb-16">
          <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
            <span className="w-8 h-8 bg-rose-900/60 rounded-lg flex items-center justify-center">🔐</span>
            Custom Roles & Permissions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {roles.map((role) => {
              const detail = roleDescriptions[role.role_name];
              return (
                <div key={role.role_name} className="bg-gray-900/60 border border-gray-800 rounded-xl p-5 hover:border-purple-800/50 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{detail?.icon || "👤"}</span>
                    <div>
                      <div className="text-white font-semibold text-sm">{role.role_name}</div>
                      <div className="text-gray-600 text-xs">{role.description}</div>
                    </div>
                  </div>
                  {detail && (
                    <ul className="space-y-1">
                      {detail.perms.map((perm) => (
                        <li key={perm} className="flex items-center gap-2 text-gray-400 text-xs">
                          <span className="text-emerald-500">✓</span>
                          {perm}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Notifications */}
        <div>
          <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
            <span className="w-8 h-8 bg-orange-900/60 rounded-lg flex items-center justify-center">🔔</span>
            Automated Notifications
          </h3>
          <div className="overflow-x-auto rounded-xl border border-gray-800">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-800/60 border-b border-gray-700">
                  <th className="text-left px-4 py-3 text-gray-400 font-semibold text-xs uppercase">Notification Event</th>
                  <th className="text-left px-4 py-3 text-gray-400 font-semibold text-xs uppercase">Recipients</th>
                  <th className="text-left px-4 py-3 text-gray-400 font-semibold text-xs uppercase">Channel</th>
                  <th className="text-left px-4 py-3 text-gray-400 font-semibold text-xs uppercase">Trigger</th>
                </tr>
              </thead>
              <tbody>
                {notifications.map((notif, i) => (
                  <tr key={i} className="border-b border-gray-800/60 hover:bg-gray-800/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                        <span className="text-white text-sm font-medium">{notif.event}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-300 text-sm">{notif.recipients}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-blue-900/50 border border-blue-800/50 rounded text-blue-300 text-xs">{notif.channel}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-xs font-mono">{notif.trigger}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
