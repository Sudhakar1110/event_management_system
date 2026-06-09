import { useState } from "react";
import { modules, doctypeDetails } from "../data/appStructure";

const iconMap: Record<string, string> = {
  Store: "🏪",
  Users: "👥",
  Calendar: "📅",
  BookOpen: "📖",
  CreditCard: "💳",
  ShoppingBag: "🛍️",
  Settings: "⚙️",
};

interface FieldDef {
  fieldname: string;
  label?: string;
  fieldtype: string;
  reqd?: number;
  options?: string;
  in_list_view?: number;
  in_standard_filter?: number;
  read_only?: number;
  bold?: number;
  depends_on?: string;
  default?: string;
}

interface DoctypeDetail {
  module: string;
  autoname?: string;
  naming_series?: string;
  is_submittable?: number;
  is_tree?: boolean;
  track_changes?: number;
  title_field?: string;
  image_field?: string;
  fields: FieldDef[];
  permissions?: Array<{ role: string; read?: number; write?: number; create?: number; delete?: number; submit?: number; cancel?: number; amend?: number }>;
}

function FieldTypeTag({ type }: { type: string }) {
  const colors: Record<string, string> = {
    Data: "bg-blue-900/50 text-blue-300 border-blue-800/50",
    Text: "bg-teal-900/50 text-teal-300 border-teal-800/50",
    "Text Editor": "bg-teal-900/50 text-teal-300 border-teal-800/50",
    Link: "bg-purple-900/50 text-purple-300 border-purple-800/50",
    Select: "bg-amber-900/50 text-amber-300 border-amber-800/50",
    Currency: "bg-emerald-900/50 text-emerald-300 border-emerald-800/50",
    Date: "bg-cyan-900/50 text-cyan-300 border-cyan-800/50",
    Int: "bg-orange-900/50 text-orange-300 border-orange-800/50",
    Float: "bg-orange-900/50 text-orange-300 border-orange-800/50",
    Check: "bg-lime-900/50 text-lime-300 border-lime-800/50",
    Table: "bg-pink-900/50 text-pink-300 border-pink-800/50",
    Attach: "bg-gray-700/50 text-gray-300 border-gray-600/50",
    "Attach Image": "bg-gray-700/50 text-gray-300 border-gray-600/50",
    Percent: "bg-violet-900/50 text-violet-300 border-violet-800/50",
    Time: "bg-cyan-900/50 text-cyan-300 border-cyan-800/50",
    Geolocation: "bg-red-900/50 text-red-300 border-red-800/50",
  };
  const layoutTypes = ["Section Break", "Column Break", "Tab Break"];
  if (layoutTypes.includes(type)) return null;
  return (
    <span className={`px-1.5 py-0.5 text-xs font-mono rounded border ${colors[type] || "bg-gray-800/50 text-gray-400 border-gray-700/50"}`}>
      {type}
    </span>
  );
}

function DoctypeModal({ name, detail, onClose }: { name: string; detail: DoctypeDetail; onClose: () => void }) {
  const visibleFields = detail.fields?.filter(f => !["Section Break", "Column Break", "Tab Break"].includes(f.fieldtype));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 bg-gray-950/60">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">📋</span>
              <div>
                <h3 className="text-xl font-bold text-white">{name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-500 font-mono">Module: {detail.module}</span>
                  {detail.is_submittable ? (
                    <span className="px-2 py-0.5 bg-blue-900/50 border border-blue-800/50 rounded text-blue-300 text-xs">Submittable</span>
                  ) : null}
                  {detail.track_changes ? (
                    <span className="px-2 py-0.5 bg-purple-900/50 border border-purple-800/50 rounded text-purple-300 text-xs">Track Changes</span>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-white p-2 rounded-lg hover:bg-gray-800 transition-colors">
            <span className="text-xl">✕</span>
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-6">
          {/* Autoname */}
          {(detail.autoname || detail.naming_series) && (
            <div className="mb-6 p-4 bg-gray-800/40 border border-gray-700/50 rounded-xl">
              <div className="text-gray-400 text-xs uppercase tracking-widest mb-2">Naming</div>
              <div className="flex gap-4 flex-wrap">
                {detail.autoname && (
                  <div>
                    <span className="text-gray-500 text-xs">autoname: </span>
                    <span className="text-yellow-300 font-mono text-sm">{detail.autoname}</span>
                  </div>
                )}
                {detail.naming_series && (
                  <div>
                    <span className="text-gray-500 text-xs">series: </span>
                    <span className="text-yellow-300 font-mono text-sm">{detail.naming_series}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Fields Table */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-3">
              Fields ({visibleFields?.length || 0})
            </h4>
            <div className="overflow-x-auto rounded-xl border border-gray-800">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-800/60 border-b border-gray-700">
                    <th className="text-left px-3 py-2 text-gray-400 font-semibold text-xs uppercase">fieldname</th>
                    <th className="text-left px-3 py-2 text-gray-400 font-semibold text-xs uppercase">Label</th>
                    <th className="text-left px-3 py-2 text-gray-400 font-semibold text-xs uppercase">Type</th>
                    <th className="text-left px-3 py-2 text-gray-400 font-semibold text-xs uppercase">Options</th>
                    <th className="text-left px-3 py-2 text-gray-400 font-semibold text-xs uppercase">Flags</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleFields?.map((field, i) => (
                    <tr key={i} className={`border-b border-gray-800/60 hover:bg-gray-800/30 transition-colors ${field.bold ? "bg-purple-950/20" : ""}`}>
                      <td className="px-3 py-2 font-mono text-xs text-cyan-300">{field.fieldname}</td>
                      <td className="px-3 py-2 text-gray-200 text-xs">{field.label}</td>
                      <td className="px-3 py-2">
                        <FieldTypeTag type={field.fieldtype} />
                      </td>
                      <td className="px-3 py-2 text-gray-400 text-xs font-mono max-w-28 truncate" title={field.options}>{field.options}</td>
                      <td className="px-3 py-2">
                        <div className="flex gap-1 flex-wrap">
                          {field.reqd ? <span className="text-red-400 text-xs">required</span> : null}
                          {field.read_only ? <span className="text-yellow-400 text-xs">read_only</span> : null}
                          {field.in_list_view ? <span className="text-blue-400 text-xs">list</span> : null}
                          {field.bold ? <span className="text-purple-400 text-xs">bold</span> : null}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Permissions */}
          {detail.permissions && detail.permissions.length > 0 && (
            <div>
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-3">Permissions</h4>
              <div className="overflow-x-auto rounded-xl border border-gray-800">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-gray-800/60 border-b border-gray-700">
                      <th className="text-left px-3 py-2 text-gray-400 font-semibold uppercase">Role</th>
                      {["read","write","create","delete","submit","cancel","amend"].map(p => (
                        <th key={p} className="text-center px-2 py-2 text-gray-400 font-semibold uppercase">{p}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {detail.permissions.map((perm, i) => (
                      <tr key={i} className="border-b border-gray-800/60">
                        <td className="px-3 py-2 text-purple-300 font-mono">{perm.role}</td>
                        {["read","write","create","delete","submit","cancel","amend"].map(p => (
                          <td key={p} className="text-center px-2 py-2">
                            {(perm as unknown as Record<string, number>)[p] ?
                              <span className="text-emerald-400">✓</span> :
                              <span className="text-gray-700">—</span>
                            }
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ModulesSection() {
  const [selectedModule, setSelectedModule] = useState(modules[0].id);
  const [selectedDoctype, setSelectedDoctype] = useState<string | null>(null);

  const currentModule = modules.find(m => m.id === selectedModule)!;

  return (
    <section className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-purple-400 text-sm font-semibold uppercase tracking-widest">Modules & DocTypes</span>
          <h2 className="text-4xl font-black text-white mt-2 mb-4">7 Core Modules · 40+ DocTypes</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Every module follows Frappe's standard folder structure with DocType JSON, Python controllers,
            and JavaScript client scripts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Module Sidebar */}
          <div className="lg:col-span-1">
            <div className="space-y-2 sticky top-24">
              {modules.map((mod) => (
                <button
                  key={mod.id}
                  onClick={() => setSelectedModule(mod.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                    selectedModule === mod.id
                      ? "bg-gray-800 border border-gray-700 shadow-lg"
                      : "hover:bg-gray-800/60 border border-transparent"
                  }`}
                >
                  <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${mod.color} flex items-center justify-center text-lg shadow-md flex-shrink-0`}>
                    {iconMap[mod.icon]}
                  </div>
                  <span className={`text-sm font-medium ${selectedModule === mod.id ? "text-white" : "text-gray-400"}`}>
                    {mod.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Module Detail */}
          <div className="lg:col-span-3">
            <div className={`bg-gradient-to-br ${currentModule.color} p-px rounded-2xl shadow-xl`}>
              <div className="bg-gray-900 rounded-2xl p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${currentModule.color} flex items-center justify-center text-3xl shadow-lg`}>
                    {iconMap[currentModule.icon]}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{currentModule.label}</h3>
                    <p className="text-gray-400 text-sm mt-1">{currentModule.description}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-gray-400 text-sm uppercase tracking-widest font-semibold">
                      DocTypes ({currentModule.doctypes.length})
                    </span>
                    <div className="flex-1 h-px bg-gray-800" />
                    <span className="text-gray-600 text-xs">Click to view schema</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                    {currentModule.doctypes.map((dt) => {
                      const hasDetail = !!doctypeDetails[dt];
                      return (
                        <div
                          key={dt}
                          onClick={() => hasDetail ? setSelectedDoctype(dt) : null}
                          className={`flex items-center justify-between px-4 py-3 bg-gray-800/60 border rounded-xl transition-all duration-200 group ${
                            hasDetail
                              ? "border-gray-700 hover:border-purple-700/50 hover:bg-gray-800 cursor-pointer"
                              : "border-gray-800/50 cursor-default"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-purple-400 text-xs">📋</span>
                            <span className="text-gray-200 text-sm font-medium">{dt}</span>
                          </div>
                          {hasDetail && (
                            <span className="text-purple-500 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                              View →
                            </span>
                          )}
                          {!hasDetail && (
                            <span className="text-gray-600 text-xs">defined</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Module Meta Info */}
                <div className="mt-6 p-4 bg-gray-800/40 border border-gray-700/50 rounded-xl">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-white font-bold text-xl">{currentModule.doctypes.length}</div>
                      <div className="text-gray-500 text-xs">DocTypes</div>
                    </div>
                    <div>
                      <div className="text-white font-bold text-xl">✓</div>
                      <div className="text-gray-500 text-xs">Workspace Link</div>
                    </div>
                    <div>
                      <div className="text-white font-bold text-xl">✓</div>
                      <div className="text-gray-500 text-xs">Role Permissions</div>
                    </div>
                    <div>
                      <div className="text-white font-bold text-xl">✓</div>
                      <div className="text-gray-500 text-xs">Fixtures</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* All DocType count */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Vendor Mgmt DocTypes", count: modules[0].doctypes.length, color: "violet" },
                { label: "Event Mgmt DocTypes", count: modules[2].doctypes.length, color: "amber" },
                { label: "Booking DocTypes", count: modules[3].doctypes.length, color: "cyan" },
                { label: "Payment DocTypes", count: modules[4].doctypes.length, color: "emerald" },
              ].map((item) => (
                <div key={item.label} className={`p-4 rounded-xl border text-center ${
                  item.color === "violet" ? "bg-violet-950/30 border-violet-900/50" :
                  item.color === "amber" ? "bg-amber-950/30 border-amber-900/50" :
                  item.color === "cyan" ? "bg-cyan-950/30 border-cyan-900/50" :
                  "bg-emerald-950/30 border-emerald-900/50"
                }`}>
                  <div className="text-2xl font-black text-white">{item.count}</div>
                  <div className="text-gray-500 text-xs mt-1">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* DocType Detail Modal */}
      {selectedDoctype && doctypeDetails[selectedDoctype] && (
        <DoctypeModal
          name={selectedDoctype}
          detail={doctypeDetails[selectedDoctype]}
          onClose={() => setSelectedDoctype(null)}
        />
      )}
    </section>
  );
}
