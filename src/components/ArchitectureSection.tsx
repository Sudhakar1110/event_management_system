interface TreeNode {
  name: string;
  type: "dir" | "file";
  lang?: string;
  children?: TreeNode[];
}

// Local tree definition with proper types
const localFileTree: TreeNode[] = [
  {
    name: "event_booking_platform/",
    type: "dir",
    children: [
      { name: "hooks.py", type: "file", lang: "python" },
      { name: "setup.py", type: "file", lang: "python" },
      { name: "requirements.txt", type: "file", lang: "text" },
      { name: "tasks.py", type: "file", lang: "python" },
      { name: "README.md", type: "file", lang: "markdown" },
      {
        name: "event_booking_platform/",
        type: "dir",
        children: [
          { name: "__init__.py", type: "file", lang: "python" },
          { name: "config/", type: "dir", children: [
            { name: "desktop.py", type: "file", lang: "python" }
          ]},
          { name: "fixtures/", type: "dir", children: [
            { name: "roles.json", type: "file", lang: "json" },
            { name: "workflow.json", type: "file", lang: "json" },
            { name: "notification.json", type: "file", lang: "json" },
            { name: "workspace.json", type: "file", lang: "json" },
            { name: "vendor_category.json", type: "file", lang: "json" },
          ]},
          { name: "utils/", type: "dir", children: [
            { name: "calculations.py", type: "file", lang: "python" },
            { name: "notifications.py", type: "file", lang: "python" },
            { name: "api.py", type: "file", lang: "python" },
          ]},
          { name: "vendor_management/", type: "dir", children: [
            { name: "__init__.py", type: "file", lang: "python" },
            { name: "doctype/", type: "dir", children: [
              { name: "vendor_profile/", type: "dir" },
              { name: "vendor_package/", type: "dir" },
              { name: "vendor_review/", type: "dir" },
            ]}
          ]},
          { name: "booking_management/", type: "dir", children: [
            { name: "__init__.py", type: "file", lang: "python" },
            { name: "doctype/", type: "dir", children: [
              { name: "vendor_booking/", type: "dir" },
              { name: "hall_booking/", type: "dir" },
            ]}
          ]},
          { name: "payment_management/", type: "dir", children: [
            { name: "__init__.py", type: "file", lang: "python" },
            { name: "doctype/", type: "dir", children: [
              { name: "booking_payment/", type: "dir" },
              { name: "refund_request/", type: "dir" },
            ]}
          ]},
          { name: "event_management/", type: "dir", children: [
            { name: "doctype/", type: "dir", children: [
              { name: "event_request/", type: "dir" },
              { name: "event_plan/", type: "dir" },
            ]}
          ]},
          { name: "www/", type: "dir", children: [
            { name: "vendors.html", type: "file", lang: "html" },
            { name: "vendor.html", type: "file", lang: "html" },
            { name: "book.html", type: "file", lang: "html" },
            { name: "my-bookings.html", type: "file", lang: "html" },
          ]},
          { name: "public/", type: "dir", children: [
            { name: "js/", type: "dir", children: [
              { name: "vendor_booking.js", type: "file", lang: "javascript" },
              { name: "vendor_profile.js", type: "file", lang: "javascript" },
            ]},
            { name: "css/", type: "dir", children: [
              { name: "event_booking.css", type: "file", lang: "css" },
            ]}
          ]},
        ]
      }
    ]
  }
];

function TreeItem({ node, depth = 0 }: { node: TreeNode; depth?: number }) {
  const indent = depth * 16;
  const isDir = node.type === "dir";

  const langColor: Record<string, string> = {
    python: "text-yellow-400",
    json: "text-emerald-400",
    javascript: "text-blue-400",
    html: "text-orange-400",
    css: "text-pink-400",
    text: "text-gray-400",
    markdown: "text-cyan-400",
    bash: "text-lime-400",
  };

  const langLabel: Record<string, string> = {
    python: ".py",
    json: ".json",
    javascript: ".js",
    html: ".html",
    css: ".css",
  };

  return (
    <div>
      <div
        className="flex items-center gap-2 py-0.5 px-2 rounded hover:bg-gray-800/50 group cursor-default"
        style={{ paddingLeft: `${indent + 8}px` }}
      >
        {isDir ? (
          <span className="text-yellow-500 text-sm">📁</span>
        ) : (
          <span className={`text-xs font-mono ${langColor[node.lang || ""] || "text-gray-500"}`}>
            {langLabel[node.lang || ""] || "📄"}
          </span>
        )}
        <span className={`text-sm font-mono ${isDir ? "text-yellow-300 font-semibold" : "text-gray-300"}`}>
          {node.name}
        </span>
        {node.lang && (
          <span className={`text-xs opacity-0 group-hover:opacity-100 transition-opacity ${langColor[node.lang]}`}>
            [{node.lang}]
          </span>
        )}
      </div>
      {node.children?.map((child, i) => (
        <TreeItem key={i} node={child} depth={depth + 1} />
      ))}
    </div>
  );
}

const layers = [
  {
    name: "Presentation Layer",
    color: "from-violet-600 to-purple-700",
    icon: "🖥️",
    components: ["Frappe Desk (Workspace)", "Portal Pages (www/)", "Website Pages", "Print Formats", "Dashboard Views"]
  },
  {
    name: "Application Layer",
    color: "from-blue-600 to-cyan-700",
    icon: "⚙️",
    components: ["DocType Controllers (Python)", "Whitelisted API Methods", "Client Scripts (JS)", "Workflow Engine", "Notification System"]
  },
  {
    name: "Business Logic Layer",
    color: "from-emerald-600 to-green-700",
    icon: "🔧",
    components: ["Booking Calculations", "Payment Processing", "Availability Engine", "Rating Aggregation", "Scheduler Tasks"]
  },
  {
    name: "Data Layer",
    color: "from-orange-600 to-amber-700",
    icon: "🗄️",
    components: ["MariaDB (DocTypes)", "Redis Cache", "File System (Assets)", "ERPNext Integration", "Fixtures / Seed Data"]
  }
];

const erpnextIntegrations = [
  { from: "Vendor Profile", to: "Supplier", desc: "Auto-create ERPNext Supplier on vendor approval" },
  { from: "Booking Payment", to: "Payment Entry", desc: "Submit payment creates linked Payment Entry" },
  { from: "Event Customer", to: "Customer", desc: "Event customer linked to ERPNext Customer" },
  { from: "Hall Booking", to: "Sales Invoice", desc: "Confirmed hall booking generates Sales Invoice" },
  { from: "Refund Request", to: "Journal Entry", desc: "Approved refunds create Journal Entry" },
];

export default function ArchitectureSection() {
  return (
    <section className="py-24 bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-purple-400 text-sm font-semibold uppercase tracking-widest">App Architecture</span>
          <h2 className="text-4xl font-black text-white mt-2 mb-4">Technical Architecture</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Built following Frappe's modular architecture with clean separation of concerns,
            fully integrated with ERPNext v15+.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 mb-16">
          {/* Layer Architecture */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-purple-900/60 rounded-lg flex items-center justify-center text-sm">🏗️</span>
              Application Layers
            </h3>
            <div className="space-y-3">
              {layers.map((layer) => (
                <div key={layer.name} className="bg-gray-900/60 border border-gray-800 rounded-xl overflow-hidden">
                  <div className={`bg-gradient-to-r ${layer.color} px-4 py-3 flex items-center gap-2`}>
                    <span>{layer.icon}</span>
                    <span className="text-white font-semibold text-sm">{layer.name}</span>
                  </div>
                  <div className="p-3 flex flex-wrap gap-2">
                    {layer.components.map((c) => (
                      <span key={c} className="px-2 py-1 bg-gray-800 border border-gray-700 rounded text-gray-300 text-xs font-mono">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* File Tree */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-8 bg-purple-900/60 rounded-lg flex items-center justify-center text-sm">📂</span>
              Project Directory Structure
            </h3>
            <div className="bg-gray-900/80 border border-gray-800 rounded-xl p-4 font-mono text-sm overflow-y-auto max-h-96">
              <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-800">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-gray-500 text-xs ml-2">~/frappe-bench/apps/event_booking_platform</span>
              </div>
              {localFileTree.map((node: TreeNode, i: number) => (
                <TreeItem key={i} node={node} depth={0} />
              ))}
            </div>
          </div>
        </div>

        {/* ERPNext Integration */}
        <div className="mb-16">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="w-8 h-8 bg-emerald-900/60 rounded-lg flex items-center justify-center text-sm">🔗</span>
            ERPNext Integration Points
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {erpnextIntegrations.map((item) => (
              <div key={item.from} className="bg-gray-900/60 border border-gray-800 rounded-xl p-4 hover:border-emerald-800/50 transition-colors">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 bg-purple-900/60 border border-purple-800/50 rounded text-purple-300 text-xs font-mono">
                    {item.from}
                  </span>
                  <span className="text-gray-600">→</span>
                  <span className="px-2 py-0.5 bg-emerald-900/60 border border-emerald-800/50 rounded text-emerald-300 text-xs font-mono">
                    {item.to}
                  </span>
                </div>
                <p className="text-gray-400 text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Frappe Components Summary */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-white mb-6">Complete Frappe Components</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { icon: "📋", label: "DocTypes", count: "40+" },
              { icon: "👶", label: "Child Tables", count: "15+" },
              { icon: "🏠", label: "Workspaces", count: "1" },
              { icon: "📊", label: "Script Reports", count: "7" },
              { icon: "📈", label: "Dashboard Charts", count: "8" },
              { icon: "🔢", label: "Number Cards", count: "6" },
              { icon: "🔔", label: "Notifications", count: "5+" },
              { icon: "📧", label: "Email Templates", count: "8+" },
              { icon: "🖨️", label: "Print Formats", count: "4" },
              { icon: "🌐", label: "Portal Pages", count: "6" },
              { icon: "🌍", label: "Website Pages", count: "5" },
              { icon: "🔌", label: "API Endpoints", count: "10+" },
              { icon: "🔐", label: "Roles", count: "6" },
              { icon: "📦", label: "Fixtures", count: "14" },
              { icon: "🔄", label: "Workflows", count: "2" },
              { icon: "📜", label: "Client Scripts", count: "4" },
              { icon: "⚙️", label: "Server Scripts", count: "3" },
              { icon: "📅", label: "Scheduler Tasks", count: "6" },
              { icon: "🔍", label: "Global Search", count: "4 DTYPEs" },
              { icon: "🗂️", label: "Modules", count: "7" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 p-3 bg-gray-800/40 rounded-lg border border-gray-700/50 hover:border-purple-700/30 transition-colors">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <div className="text-white text-sm font-semibold">{item.count}</div>
                  <div className="text-gray-500 text-xs">{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
