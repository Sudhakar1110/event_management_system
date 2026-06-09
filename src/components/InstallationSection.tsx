import { useState } from "react";

const installSteps = [
  {
    step: 1,
    title: "Prerequisites",
    icon: "📋",
    color: "from-gray-700 to-gray-800",
    content: [
      "Ubuntu 22.04 LTS (Recommended) or 20.04",
      "Python 3.10+ (3.11 recommended)",
      "Node.js 18+ (LTS)",
      "ERPNext v15+ with Frappe Bench v5+",
      "MariaDB 10.6+ or MySQL 8.0+",
      "Redis 6.0+",
      "Nginx (production) or built-in dev server",
    ]
  },
  {
    step: 2,
    title: "Get the App",
    icon: "📦",
    color: "from-blue-900 to-blue-800",
    command: "bench get-app event_booking_platform https://github.com/your-org/event_booking_platform.git",
    content: ["Clones the app into your frappe-bench/apps directory", "Installs Python dependencies from requirements.txt"]
  },
  {
    step: 3,
    title: "Install on Site",
    icon: "🔧",
    color: "from-violet-900 to-violet-800",
    command: "bench --site your-site.local install-app event_booking_platform",
    content: ["Registers app with the site", "Creates DocType tables in database"]
  },
  {
    step: 4,
    title: "Run Migrations",
    icon: "🗄️",
    color: "from-emerald-900 to-emerald-800",
    command: "bench --site your-site.local migrate",
    content: ["Creates all database tables for 40+ DocTypes", "Applies fixtures (Roles, Workflows, Workspace)", "Seeds default Vendor Categories and Event Types"]
  },
  {
    step: 5,
    title: "Build Assets",
    icon: "🏗️",
    color: "from-amber-900 to-amber-800",
    command: "bench build --app event_booking_platform",
    content: ["Compiles JavaScript and CSS assets", "Copies files to public directory"]
  },
  {
    step: 6,
    title: "Restart & Clear Cache",
    icon: "🔄",
    color: "from-pink-900 to-pink-800",
    command: "bench restart && bench --site your-site.local clear-cache",
    content: ["Restarts all Frappe services", "Clears Redis cache and browser caches"]
  },
  {
    step: 7,
    title: "Load Demo Data (Optional)",
    icon: "🎭",
    color: "from-cyan-900 to-cyan-800",
    command: "bench --site your-site.local execute event_booking_platform.fixtures.demo_data.load_demo_data",
    content: ["Creates 20+ sample Vendor Profiles", "Adds 50+ sample Vendor Bookings", "Generates realistic payment history", "Populates reviews and ratings"]
  }
];

const verifyChecklist = [
  "Workspace 'Event Booking Platform' appears in Frappe Desk",
  "Role 'Event Booking Manager' can be assigned to users",
  "Vendor Category list shows default categories",
  "Event Type list shows: Wedding, Reception, Engagement, etc.",
  "Vendor Profile DocType is accessible",
  "Vendor Booking form loads with all fields",
  "Booking Payment DocType is accessible",
  "Portal page /vendors is accessible",
  "Dashboard charts render on Workspace",
  "Number Cards show data on Workspace",
  "Script Reports appear under Event Booking Platform module",
  "Workflow is active for Vendor Booking",
];

const troubleshootItems = [
  {
    issue: "Module not showing in Desk",
    solution: "Clear cache: bench --site site.local clear-cache && bench restart"
  },
  {
    issue: "DocType migration errors",
    solution: "Check for naming conflicts. Run: bench --site site.local migrate --skip-failing"
  },
  {
    issue: "Fixtures not loading",
    solution: "bench --site site.local export-fixtures --app event_booking_platform then re-migrate"
  },
  {
    issue: "Permission denied errors",
    solution: "Assign 'Event Booking Manager' role to your user in Setup > Users"
  },
  {
    issue: "Portal pages returning 404",
    solution: "bench build and ensure website_route_rules in hooks.py are correct"
  },
  {
    issue: "Email notifications not sending",
    solution: "Configure SMTP in Setup > Email Settings. Check Notification doctype is enabled."
  },
];

export default function InstallationSection() {
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [copiedCmd, setCopiedCmd] = useState<number | null>(null);

  const toggleStep = (step: number) => {
    setCompletedSteps(prev =>
      prev.includes(step) ? prev.filter(s => s !== step) : [...prev, step]
    );
  };

  const toggleCheck = (i: number) => {
    setCheckedItems(prev =>
      prev.includes(i) ? prev.filter(c => c !== i) : [...prev, i]
    );
  };

  const copyCommand = async (cmd: string, stepNum: number) => {
    await navigator.clipboard.writeText(cmd);
    setCopiedCmd(stepNum);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <section className="py-24 bg-gray-900">
      <div className="max-w-5xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-purple-400 text-sm font-semibold uppercase tracking-widest">Get Started</span>
          <h2 className="text-4xl font-black text-white mt-2 mb-4">Installation Guide</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Step-by-step installation on a clean ERPNext v15 environment.
            Complete setup in under 15 minutes.
          </p>
          <div className="flex items-center justify-center gap-4 mt-6">
            <span className="px-3 py-1.5 bg-purple-900/60 border border-purple-800/50 rounded-lg text-purple-300 text-sm">
              Frappe v15+
            </span>
            <span className="px-3 py-1.5 bg-emerald-900/60 border border-emerald-800/50 rounded-lg text-emerald-300 text-sm">
              ERPNext v15+
            </span>
            <span className="px-3 py-1.5 bg-blue-900/60 border border-blue-800/50 rounded-lg text-blue-300 text-sm">
              Python 3.10+
            </span>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-8 p-4 bg-gray-800/40 border border-gray-700/50 rounded-xl flex items-center gap-4">
          <div className="flex-1 bg-gray-700 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-violet-600 to-purple-500 rounded-full transition-all duration-500"
              style={{ width: `${(completedSteps.length / installSteps.length) * 100}%` }}
            />
          </div>
          <span className="text-white text-sm font-semibold min-w-16">
            {completedSteps.length}/{installSteps.length} Steps
          </span>
        </div>

        {/* Installation Steps */}
        <div className="space-y-4 mb-16">
          {installSteps.map((step) => {
            const done = completedSteps.includes(step.step);
            return (
              <div
                key={step.step}
                className={`border rounded-xl overflow-hidden transition-all duration-200 ${
                  done ? "border-emerald-800/60 bg-emerald-950/20" : "border-gray-800 bg-gray-900/60"
                }`}
              >
                <div
                  className="flex items-center gap-4 p-5 cursor-pointer"
                  onClick={() => toggleStep(step.step)}
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                    <span className="text-2xl">{step.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500 text-sm font-mono">Step {step.step}</span>
                      <span className={`text-base font-bold ${done ? "text-emerald-300" : "text-white"}`}>
                        {step.title}
                      </span>
                    </div>
                    {step.command && (
                      <code className="text-xs text-gray-500 font-mono truncate block mt-0.5">
                        $ {step.command.slice(0, 60)}{step.command.length > 60 ? "..." : ""}
                      </code>
                    )}
                  </div>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                    done ? "bg-emerald-600 text-white" : "bg-gray-700 text-gray-500"
                  }`}>
                    {done ? "✓" : step.step}
                  </div>
                </div>

                {/* Details */}
                <div className="px-5 pb-5 pt-0">
                  {step.command && (
                    <div className="bg-gray-950 border border-gray-800 rounded-xl p-4 font-mono mb-4 relative group">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                          <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                        </div>
                        <span className="text-gray-600 text-xs">bash</span>
                        <button
                          onClick={() => copyCommand(step.command!, step.step)}
                          className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-xs text-gray-500 hover:text-white px-2 py-0.5 bg-gray-800 rounded"
                        >
                          {copiedCmd === step.step ? "✓ Copied" : "Copy"}
                        </button>
                      </div>
                      <div className="text-sm">
                        <span className="text-emerald-400">$ </span>
                        <span className="text-gray-200 break-all">{step.command}</span>
                      </div>
                    </div>
                  )}
                  <ul className="space-y-1.5">
                    {step.content.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-gray-400 text-sm">
                        <span className="text-purple-500 mt-0.5">›</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Verification Checklist */}
        <div className="mb-16 bg-gray-900/60 border border-gray-800 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
            <span>✅</span> Post-Installation Verification
          </h3>
          <p className="text-gray-400 text-sm mb-6">Tick each item to confirm successful installation:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {verifyChecklist.map((item, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                  checkedItems.includes(i)
                    ? "border-emerald-800/60 bg-emerald-950/30"
                    : "border-gray-800/60 hover:border-gray-700"
                }`}
                onClick={() => toggleCheck(i)}
              >
                <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                  checkedItems.includes(i) ? "bg-emerald-600" : "bg-gray-700"
                }`}>
                  {checkedItems.includes(i) && <span className="text-white text-xs">✓</span>}
                </div>
                <span className={`text-sm ${checkedItems.includes(i) ? "text-emerald-300" : "text-gray-300"}`}>
                  {item}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <span className="text-gray-500 text-sm">
              {checkedItems.length}/{verifyChecklist.length} items verified
              {checkedItems.length === verifyChecklist.length ? " — 🎉 Installation complete!" : ""}
            </span>
          </div>
        </div>

        {/* Troubleshooting */}
        <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span>🔧</span> Troubleshooting
          </h3>
          <div className="space-y-4">
            {troubleshootItems.map((item, i) => (
              <div key={i} className="flex gap-4 p-4 bg-gray-800/40 border border-gray-700/50 rounded-xl">
                <span className="text-red-400 text-xl flex-shrink-0">⚠</span>
                <div>
                  <div className="text-white font-semibold text-sm mb-1">{item.issue}</div>
                  <div className="text-gray-400 text-sm">{item.solution}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
