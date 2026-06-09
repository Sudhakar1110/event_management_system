import { useState } from "react";

interface NavbarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const navItems = [
  { id: "overview", label: "Overview" },
  { id: "architecture", label: "Architecture" },
  { id: "modules", label: "Modules" },
  { id: "workflows", label: "Workflows" },
  { id: "reports", label: "Reports" },
  { id: "demodata", label: "Demo Data" },
  { id: "sourcecode", label: "Source Code" },
  { id: "installation", label: "Install" },
];

export default function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/95 backdrop-blur-md border-b border-purple-900/40 shadow-xl">
      <div className="max-w-screen-2xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate("overview")}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center shadow-lg shadow-purple-900/50">
              <span className="text-white text-lg">💍</span>
            </div>
            <div>
              <div className="text-white font-bold text-lg leading-none">EventSphere</div>
              <div className="text-purple-400 text-xs leading-none">Frappe/ERPNext v15+</div>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeSection === item.id
                    ? "bg-purple-700 text-white shadow-lg shadow-purple-900/40"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Badges */}
          <div className="hidden lg:flex items-center gap-2">
            <span className="px-2.5 py-1 bg-purple-900/60 border border-purple-700/50 rounded-full text-purple-300 text-xs font-medium">
              Frappe v15+
            </span>
            <span className="px-2.5 py-1 bg-emerald-900/60 border border-emerald-700/50 rounded-full text-emerald-300 text-xs font-medium">
              ERPNext v15+
            </span>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-gray-400 hover:text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <div className="w-6 h-0.5 bg-current mb-1.5 transition-all" style={{ transform: mobileOpen ? "rotate(45deg) translateY(8px)" : "" }} />
            <div className="w-6 h-0.5 bg-current mb-1.5 transition-all" style={{ opacity: mobileOpen ? 0 : 1 }} />
            <div className="w-6 h-0.5 bg-current transition-all" style={{ transform: mobileOpen ? "rotate(-45deg) translateY(-8px)" : "" }} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-gray-950 border-t border-gray-800 px-4 py-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { onNavigate(item.id); setMobileOpen(false); }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                activeSection === item.id
                  ? "bg-purple-700 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
