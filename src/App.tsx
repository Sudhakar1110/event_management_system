import { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ArchitectureSection from "./components/ArchitectureSection";
import ModulesSection from "./components/ModulesSection";
import WorkflowSection from "./components/WorkflowSection";
import ReportsSection from "./components/ReportsSection";
import DemoDataSection from "./components/DemoDataSection";
import SourceCodeSection from "./components/SourceCodeSection";
import InstallationSection from "./components/InstallationSection";
import WorkspacePreview from "./components/WorkspacePreview";
import FrappeComponentsSection from "./components/FrappeComponentsSection";

const sections = [
  { id: "overview" },
  { id: "architecture" },
  { id: "modules" },
  { id: "workflows" },
  { id: "reports" },
  { id: "demodata" },
  { id: "sourcecode" },
  { id: "installation" },
];

export default function App() {
  const [activeSection, setActiveSection] = useState("overview");
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const navigateTo = (sectionId: string) => {
    setActiveSection(sectionId);
    const el = sectionRefs.current[sectionId];
    if (el) {
      const offset = 64; // navbar height
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 100;
      for (const { id } of sections) {
        const el = sectionRefs.current[id];
        if (el) {
          const { top, bottom } = el.getBoundingClientRect();
          const absTop = top + window.scrollY;
          const absBottom = bottom + window.scrollY;
          if (scrollY >= absTop && scrollY < absBottom) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      <Navbar activeSection={activeSection} onNavigate={navigateTo} />

      <main>
        {/* Hero */}
        <div ref={el => { sectionRefs.current["overview"] = el; }} id="overview">
          <HeroSection onNavigate={navigateTo} />
        </div>

        {/* Architecture */}
        <div ref={el => { sectionRefs.current["architecture"] = el; }} id="architecture">
          <ArchitectureSection />
          <WorkspacePreview />
        </div>

        {/* Modules */}
        <div ref={el => { sectionRefs.current["modules"] = el; }} id="modules">
          <ModulesSection />
        </div>

        {/* Workflows */}
        <div ref={el => { sectionRefs.current["workflows"] = el; }} id="workflows">
          <WorkflowSection />
        </div>

        {/* Reports */}
        <div ref={el => { sectionRefs.current["reports"] = el; }} id="reports">
          <ReportsSection />
        </div>

        {/* Frappe Components */}
        <div ref={el => { sectionRefs.current["demodata"] = el; }} id="demodata">
          <DemoDataSection />
          <FrappeComponentsSection />
        </div>

        {/* Source Code */}
        <div ref={el => { sectionRefs.current["sourcecode"] = el; }} id="sourcecode">
          <SourceCodeSection />
        </div>

        {/* Installation */}
        <div ref={el => { sectionRefs.current["installation"] = el; }} id="installation">
          <InstallationSection />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-950 border-t border-gray-900 py-16">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center shadow-lg">
                  <span className="text-xl">💍</span>
                </div>
                <div>
                  <div className="text-white font-bold text-lg">EventSphere</div>
                  <div className="text-purple-400 text-xs">v1.0.0</div>
                </div>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                Complete Event Booking Platform for Frappe/ERPNext v15+.
                Inspired by WeddingWire India.
              </p>
            </div>

            {/* Modules */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-4">Modules</h4>
              <ul className="space-y-2 text-gray-500 text-sm">
                {["Vendor Management", "Customer Management", "Event Management",
                  "Booking Management", "Payment Management", "Marketplace", "Configuration"].map(m => (
                  <li key={m}>{m}</li>
                ))}
              </ul>
            </div>

            {/* DocTypes */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-4">Key DocTypes</h4>
              <ul className="space-y-2 text-gray-500 text-sm font-mono text-xs">
                {["Vendor Profile", "Vendor Booking", "Event Request", "Booking Payment",
                  "Vendor Review", "Event Plan", "Refund Request", "Vendor Wishlist"].map(d => (
                  <li key={d}>{d}</li>
                ))}
              </ul>
            </div>

            {/* Tech */}
            <div>
              <h4 className="text-white font-semibold text-sm mb-4">Tech Stack</h4>
              <ul className="space-y-2 text-gray-500 text-sm">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full" />Frappe Framework v15+
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />ERPNext v15+
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full" />Python 3.10+
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />MariaDB + Redis
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />Jinja2 Templates
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full" />REST API
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-gray-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-gray-600 text-sm">
              © 2026 EventSphere · Event Booking Platform for Frappe/ERPNext v15+ · MIT License
            </div>
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 bg-purple-950/60 border border-purple-900/50 rounded-full text-purple-400 text-xs">
                Frappe v15+
              </span>
              <span className="px-2.5 py-1 bg-emerald-950/60 border border-emerald-900/50 rounded-full text-emerald-400 text-xs">
                ERPNext v15+
              </span>
              <span className="px-2.5 py-1 bg-blue-950/60 border border-blue-900/50 rounded-full text-blue-400 text-xs">
                Production Ready
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
