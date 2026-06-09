interface HeroSectionProps {
  onNavigate: (section: string) => void;
}

const stats = [
  { value: "7", label: "Core Modules" },
  { value: "40+", label: "DocTypes" },
  { value: "7", label: "Script Reports" },
  { value: "8", label: "Dashboard Charts" },
  { value: "6", label: "Roles" },
  { value: "2", label: "Workflows" },
];

const vendorTypes = [
  "💍 Wedding Halls", "📸 Photographers", "🎬 Videographers", "🌸 Decorators",
  "🍽️ Caterers", "💄 Makeup Artists", "📋 Event Planners", "🎵 DJs",
  "🚗 Transportation", "🌺 Flower Decorators", "🏛️ Banquet Halls", "🎤 Entertainers"
];

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gray-950">
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-purple-900/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-violet-900/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-pink-900/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9IjAuMDMiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-60" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-950/80 border border-purple-700/50 rounded-full text-purple-300 text-sm font-medium mb-8 shadow-lg">
          <span className="w-2 h-2 bg-purple-400 rounded-full animate-ping" />
          Production-Ready Frappe Custom App · v1.0.0
        </div>

        {/* Main Title */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-none tracking-tight">
          <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            EventSphere
          </span>
          <br />
          <span className="text-3xl sm:text-4xl lg:text-5xl text-gray-200 font-bold">
            Event Booking Platform
          </span>
        </h1>

        <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-4 leading-relaxed">
          A complete <strong className="text-white">WeddingWire-inspired</strong> event booking marketplace built natively
          for <strong className="text-purple-300">Frappe Framework v15+</strong> and <strong className="text-emerald-300">ERPNext v15+</strong>.
        </p>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-12">
          Vendor management · Booking lifecycle · Payment tracking · Portal pages ·
          Reports · Dashboards · Workflows · Email notifications
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 justify-center mb-16">
          <button
            onClick={() => onNavigate("architecture")}
            className="px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-700 text-white font-semibold rounded-xl hover:from-violet-500 hover:to-purple-600 transition-all duration-300 shadow-lg shadow-purple-900/50 hover:shadow-purple-700/50 hover:-translate-y-0.5"
          >
            Explore Architecture →
          </button>
          <button
            onClick={() => onNavigate("sourcecode")}
            className="px-8 py-4 bg-gray-800 border border-gray-700 text-white font-semibold rounded-xl hover:bg-gray-700 hover:border-gray-600 transition-all duration-300 hover:-translate-y-0.5"
          >
            View Source Code
          </button>
          <button
            onClick={() => onNavigate("installation")}
            className="px-8 py-4 bg-emerald-900/40 border border-emerald-700/50 text-emerald-300 font-semibold rounded-xl hover:bg-emerald-900/60 transition-all duration-300 hover:-translate-y-0.5"
          >
            Installation Guide
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 mb-16 max-w-4xl mx-auto">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-gray-900/60 border border-gray-800/60 rounded-xl p-4 text-center backdrop-blur-sm">
              <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
              <div className="text-gray-500 text-xs leading-tight">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Vendor Types Marquee */}
        <div className="mb-8">
          <p className="text-gray-600 text-sm mb-4 uppercase tracking-widest">Supported Vendor Types</p>
          <div className="flex flex-wrap gap-2 justify-center max-w-4xl mx-auto">
            {vendorTypes.map((vendor) => (
              <span
                key={vendor}
                className="px-4 py-2 bg-gray-900/60 border border-gray-800 rounded-full text-gray-300 text-sm font-medium hover:border-purple-700/50 hover:text-purple-300 transition-all cursor-default"
              >
                {vendor}
              </span>
            ))}
          </div>
        </div>

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap gap-3 justify-center">
          {[
            { label: "Python 3.10+", color: "blue" },
            { label: "Frappe v15", color: "purple" },
            { label: "ERPNext v15", color: "green" },
            { label: "MariaDB", color: "orange" },
            { label: "Redis", color: "red" },
            { label: "Jinja2", color: "yellow" },
            { label: "JavaScript", color: "yellow" },
            { label: "REST API", color: "cyan" },
          ].map((tech) => (
            <span
              key={tech.label}
              className={`px-3 py-1 text-xs font-mono font-semibold rounded border ${
                tech.color === "blue" ? "border-blue-800/50 bg-blue-950/40 text-blue-400" :
                tech.color === "purple" ? "border-purple-800/50 bg-purple-950/40 text-purple-400" :
                tech.color === "green" ? "border-emerald-800/50 bg-emerald-950/40 text-emerald-400" :
                tech.color === "orange" ? "border-orange-800/50 bg-orange-950/40 text-orange-400" :
                tech.color === "red" ? "border-red-800/50 bg-red-950/40 text-red-400" :
                tech.color === "yellow" ? "border-yellow-800/50 bg-yellow-950/40 text-yellow-400" :
                "border-cyan-800/50 bg-cyan-950/40 text-cyan-400"
              }`}
            >
              {tech.label}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600">
        <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
        <div className="w-5 h-8 border-2 border-gray-700 rounded-full flex items-start justify-center p-1">
          <div className="w-1.5 h-2.5 bg-gray-600 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
