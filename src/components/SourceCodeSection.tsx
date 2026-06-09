import { useState } from "react";
import { codeSnippets } from "../data/appStructure";

const snippetMenu = [
  { id: "hooks", label: "hooks.py", icon: "⚙️", desc: "App configuration & doc events" },
  { id: "vendorBookingPy", label: "vendor_booking.py", icon: "🐍", desc: "Booking controller" },
  { id: "vendorBookingJson", label: "vendor_booking.json", icon: "📋", desc: "DocType definition" },
  { id: "workspaceJson", label: "workspace.json", icon: "🏠", desc: "Frappe Workspace config" },
  { id: "taskspy", label: "tasks.py", icon: "⏰", desc: "Scheduler tasks" },
  { id: "bookingReportPy", label: "booking_report.py", icon: "📊", desc: "Script Report" },
  { id: "vendorSearchApi", label: "api.py", icon: "🔌", desc: "Public API endpoints" },
  { id: "vendorPortalHtml", label: "vendors.html", icon: "🌐", desc: "Portal page template" },
  { id: "bookingPaymentJs", label: "vendor_booking.js", icon: "⚡", desc: "Client scripts" },
  { id: "notificationsJson", label: "notification.json", icon: "🔔", desc: "Notification fixtures" },
  { id: "rolesJson", label: "roles.json", icon: "🔐", desc: "Role fixtures" },
  { id: "demoDataPy", label: "demo_data.py", icon: "🎭", desc: "Demo data loader" },
  { id: "printFormatHtml", label: "booking_confirmation.html", icon: "🖨️", desc: "Print format template" },
  { id: "installationCommands", label: "install.sh", icon: "🚀", desc: "Installation guide" },
];

const langColors: Record<string, { bg: string; badge: string; label: string }> = {
  python: { bg: "bg-yellow-950/30", badge: "bg-yellow-900/60 text-yellow-300 border-yellow-800/50", label: "Python" },
  json: { bg: "bg-emerald-950/30", badge: "bg-emerald-900/60 text-emerald-300 border-emerald-800/50", label: "JSON" },
  javascript: { bg: "bg-blue-950/30", badge: "bg-blue-900/60 text-blue-300 border-blue-800/50", label: "JavaScript" },
  html: { bg: "bg-orange-950/30", badge: "bg-orange-900/60 text-orange-300 border-orange-800/50", label: "Jinja/HTML" },
  bash: { bg: "bg-lime-950/30", badge: "bg-lime-900/60 text-lime-300 border-lime-800/50", label: "Bash" },
};

function tokenizeLine(line: string, lang: string) {
  if (lang === "python") return <PythonLine line={line} />;
  if (lang === "json") return <JsonLine line={line} />;
  if (lang === "javascript") return <JsLine line={line} />;
  if (lang === "bash") return <BashLine line={line} />;
  return <span className="text-gray-300">{line}</span>;
}

function PythonLine({ line }: { line: string }) {
  const trimmed = line.trim();
  if (trimmed.startsWith("#")) {
    return <span className="text-emerald-600 italic">{line}</span>;
  }

  return (
    <span>
      {line.split(/(@\w+|"""[\s\S]*?"""|"[^"]*"|'[^']*'|\b(?:import|from|def|class|return|if|elif|else|for|in|not|and|or|True|False|None|self|try|except|raise|with|as|pass)\b|\bfrappe\b)/g).map((part, i) => {
        if (/^@\w+/.test(part)) return <span key={i} className="text-violet-400">{part}</span>;
        if (/^("""[\s\S]*?"""|"[^"]*"|'[^']*')/.test(part)) return <span key={i} className="text-amber-400">{part}</span>;
        if (/^(import|from|def|class|return|if|elif|else|for|in|not|and|or|True|False|None|self|try|except|raise|with|as|pass)$/.test(part)) return <span key={i} className="text-purple-400 font-semibold">{part}</span>;
        if (part === "frappe") return <span key={i} className="text-cyan-400">{part}</span>;
        return <span key={i} className="text-gray-200">{part}</span>;
      })}
    </span>
  );
}

function JsonLine({ line }: { line: string }) {
  // Keys
  if (/^\s*"[^"]+"\s*:/.test(line)) {
    const match = line.match(/^(\s*)"([^"]+)"(\s*:\s*)(.*)$/);
    if (match) {
      return (
        <span>
          <span className="text-gray-500">{match[1]}</span>
          <span className="text-cyan-300">"{match[2]}"</span>
          <span className="text-gray-400">{match[3]}</span>
          <JsonValue value={match[4]} />
        </span>
      );
    }
  }
  // String values
  if (/^\s*"/.test(line) && !line.includes(": ")) {
    return <span className="text-amber-300">{line}</span>;
  }
  // Numbers / booleans
  if (/^\s*(true|false|null|\d)/.test(line.trim())) {
    return <span className="text-emerald-400">{line}</span>;
  }
  return <span className="text-gray-400">{line}</span>;
}

function JsonValue({ value }: { value: string }) {
  const trimmed = value.trim().replace(/,$/, "");
  if (/^"/.test(trimmed)) return <span className="text-amber-300">{value}</span>;
  if (/^(true|false|null)/.test(trimmed)) return <span className="text-emerald-400">{value}</span>;
  if (/^\d/.test(trimmed)) return <span className="text-blue-300">{value}</span>;
  return <span className="text-gray-300">{value}</span>;
}

function JsLine({ line }: { line: string }) {
  const trimmed = line.trim();
  if (trimmed.startsWith("//")) return <span className="text-emerald-600 italic">{line}</span>;
  if (trimmed.startsWith("/*") || trimmed.startsWith("*")) return <span className="text-emerald-700 italic">{line}</span>;
  return (
    <span>
      {line.split(/\b(const|let|var|function|return|if|else|for|of|in|async|await|new|class|import|from|export|default|true|false|null|undefined|this|=>)\b/g).map((part, i) => {
        if (/^(const|let|var|function|return|if|else|for|of|in|async|await|new|class|import|from|export|default)$/.test(part)) return <span key={i} className="text-purple-400">{part}</span>;
        if (/^(true|false|null|undefined)$/.test(part)) return <span key={i} className="text-emerald-400">{part}</span>;
        return <span key={i} className="text-gray-200">{part}</span>;
      })}
    </span>
  );
}

function BashLine({ line }: { line: string }) {
  if (line.startsWith("#")) return <span className="text-emerald-600 italic">{line}</span>;
  if (line.startsWith("bench ")) return (
    <span>
      <span className="text-cyan-400">bench</span>
      <span className="text-gray-200">{line.slice(5)}</span>
    </span>
  );
  return <span className="text-gray-200">{line}</span>;
}

function CodeBlock({ code, lang }: { code: string; lang: string }) {
  const [copied, setCopied] = useState(false);
  const colors = langColors[lang] || langColors.python;
  const lines = code.split("\n");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`rounded-xl overflow-hidden border border-gray-800 ${colors.bg}`}>
      {/* Code header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-gray-900/80 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className={`px-2 py-0.5 text-xs font-semibold rounded border ${colors.badge}`}>
            {colors.label}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-lg text-gray-400 hover:text-white text-xs transition-all"
        >
          {copied ? "✓ Copied!" : "Copy"}
        </button>
      </div>

      {/* Code content */}
      <div className="overflow-x-auto">
        <div className="flex min-w-0">
          {/* Line numbers */}
          <div className="flex flex-col items-end pr-4 pl-3 py-4 select-none border-r border-gray-800/60 min-w-10 bg-gray-950/40">
            {lines.map((_, i) => (
              <div key={i} className="text-gray-700 text-xs font-mono leading-6">{i + 1}</div>
            ))}
          </div>
          {/* Code */}
          <pre className="flex-1 px-4 py-4 text-xs font-mono leading-6 overflow-x-auto">
            {lines.map((line, i) => (
              <div key={i} className="min-h-6 hover:bg-white/2 -mx-2 px-2 rounded">
                {tokenizeLine(line, lang)}
              </div>
            ))}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default function SourceCodeSection() {
  const [activeSnippet, setActiveSnippet] = useState("hooks");
  const current = codeSnippets[activeSnippet];

  return (
    <section className="py-24 bg-gray-950">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-purple-400 text-sm font-semibold uppercase tracking-widest">Source Code</span>
          <h2 className="text-4xl font-black text-white mt-2 mb-4">Complete Source Code Reference</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Production-ready code following Frappe v15 standards. Every file is fully implemented
            with proper error handling, validation, and ERPNext integration.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
          {/* Snippet Menu */}
          <div className="xl:col-span-1">
            <div className="bg-gray-900/60 border border-gray-800 rounded-xl overflow-hidden sticky top-24">
              <div className="px-4 py-3 border-b border-gray-800 bg-gray-800/40">
                <span className="text-gray-400 text-xs uppercase tracking-widest font-semibold">Source Files</span>
              </div>
              <div className="divide-y divide-gray-800/60">
                {snippetMenu.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSnippet(item.id)}
                    className={`w-full text-left px-4 py-3 transition-all hover:bg-gray-800/60 ${
                      activeSnippet === item.id ? "bg-purple-950/40 border-l-2 border-purple-600" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-0.5">
                      <span>{item.icon}</span>
                      <span className={`text-xs font-mono font-semibold ${activeSnippet === item.id ? "text-purple-300" : "text-gray-300"}`}>
                        {item.label}
                      </span>
                    </div>
                    <div className="text-gray-600 text-xs pl-6">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Code Display */}
          <div className="xl:col-span-4">
            {current && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{snippetMenu.find(s => s.id === activeSnippet)?.icon}</span>
                  <div>
                    <h3 className="text-white font-bold">{snippetMenu.find(s => s.id === activeSnippet)?.label}</h3>
                    <p className="text-gray-500 text-sm">{snippetMenu.find(s => s.id === activeSnippet)?.desc}</p>
                  </div>
                </div>
                <CodeBlock code={current.code} lang={current.lang} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
