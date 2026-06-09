import { reports, dashboardCharts, numberCards } from "../data/appStructure";

const chartTypeIcons: Record<string, string> = {
  Bar: "📊", Donut: "🍩", Pie: "🥧", Line: "📈"
};

const mockBarData = [65, 89, 72, 95, 110, 88, 125, 142, 98, 115, 103, 130];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const mockDonutData = [
  { label: "Venues", pct: 32, color: "#7c3aed" },
  { label: "Photography", pct: 24, color: "#0ea5e9" },
  { label: "Catering", pct: 18, color: "#10b981" },
  { label: "Decor", pct: 14, color: "#f59e0b" },
  { label: "Others", pct: 12, color: "#ec4899" },
];

const mockLineData = [12, 18, 14, 22, 30, 28, 35, 42, 38, 45, 52, 60];

function MiniBarChart() {
  const max = Math.max(...mockBarData);
  return (
    <div className="flex items-end gap-1 h-20 px-2">
      {mockBarData.map((val, i) => (
        <div key={i} className="flex flex-col items-center gap-1 flex-1">
          <div
            className="w-full bg-gradient-to-t from-violet-700 to-purple-500 rounded-sm opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
            style={{ height: `${(val / max) * 72}px` }}
            title={`${months[i]}: ${val}`}
          />
          <span className="text-gray-600 text-[8px] hidden sm:block">{months[i].slice(0, 1)}</span>
        </div>
      ))}
    </div>
  );
}

function MiniDonutChart() {
  const size = 80;
  const cx = size / 2;
  const cy = size / 2;
  const r = 28;
  const innerR = 16;

  let cumulative = 0;
  const segments = mockDonutData.map(item => {
    const startAngle = (cumulative / 100) * 360;
    cumulative += item.pct;
    const endAngle = (cumulative / 100) * 360;
    return { ...item, startAngle, endAngle };
  });

  function polarToCartesian(angle: number, radius: number) {
    const rad = ((angle - 90) * Math.PI) / 180;
    return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
  }

  function arc(start: number, end: number, outerR: number, innerRadius: number) {
    if (end - start >= 360) end = 359.99;
    const s1 = polarToCartesian(start, outerR);
    const e1 = polarToCartesian(end, outerR);
    const s2 = polarToCartesian(end, innerRadius);
    const e2 = polarToCartesian(start, innerRadius);
    const lg = end - start > 180 ? 1 : 0;
    return `M ${s1.x} ${s1.y} A ${outerR} ${outerR} 0 ${lg} 1 ${e1.x} ${e1.y} L ${s2.x} ${s2.y} A ${innerRadius} ${innerRadius} 0 ${lg} 0 ${e2.x} ${e2.y} Z`;
  }

  return (
    <div className="flex items-center gap-3">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {segments.map((seg, i) => (
          <path key={i} d={arc(seg.startAngle, seg.endAngle, r, innerR)} fill={seg.color} opacity={0.85} />
        ))}
      </svg>
      <div className="space-y-1">
        {mockDonutData.map(item => (
          <div key={item.label} className="flex items-center gap-1.5 text-xs">
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: item.color }} />
            <span className="text-gray-400">{item.label}</span>
            <span className="text-white ml-auto font-mono">{item.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MiniLineChart() {
  const max = Math.max(...mockLineData);
  const points = mockLineData.map((v, i) => {
    const x = (i / (mockLineData.length - 1)) * 180 + 10;
    const y = 60 - (v / max) * 50;
    return `${x},${y}`;
  }).join(" ");

  return (
    <svg width="200" height="70" viewBox="0 0 200 70" className="overflow-visible">
      <defs>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline
        points={points}
        fill="none"
        stroke="#7c3aed"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {mockLineData.map((v, i) => {
        const x = (i / (mockLineData.length - 1)) * 180 + 10;
        const y = 60 - (v / max) * 50;
        return <circle key={i} cx={x} cy={y} r="2.5" fill="#7c3aed" opacity="0.8" />;
      })}
    </svg>
  );
}

export default function ReportsSection() {
  return (
    <section className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-purple-400 text-sm font-semibold uppercase tracking-widest">Analytics & Insights</span>
          <h2 className="text-4xl font-black text-white mt-2 mb-4">Reports, Dashboards & Number Cards</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            7 Script Reports, 8 Dashboard Charts, and 6 Number Cards with live data from Frappe's analytics engine.
          </p>
        </div>

        {/* Number Cards */}
        <div className="mb-16">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="w-8 h-8 bg-blue-900/60 rounded-lg flex items-center justify-center">🔢</span>
            Number Cards
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {numberCards.map((card) => (
              <div
                key={card.name}
                className="bg-gray-900/80 border border-gray-800 rounded-xl p-4 text-center hover:border-purple-800/50 transition-colors group"
                style={{ borderTopColor: card.color, borderTopWidth: "3px" }}
              >
                <div className="text-2xl font-black text-white mb-1 group-hover:scale-110 transition-transform">
                  {card.name.includes("Revenue") ? "₹2.4L" :
                   card.name.includes("Vendors") ? "48" :
                   card.name.includes("Bookings") && card.name.includes("Pending") ? "12" :
                   card.name.includes("Bookings") ? "284" :
                   card.name.includes("Customers") ? "127" : "93"}
                </div>
                <div className="text-gray-400 text-xs leading-tight">{card.name}</div>
                <div className="text-gray-600 text-xs mt-1 font-mono">{card.doctype}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Dashboard Charts Preview */}
        <div className="mb-16">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="w-8 h-8 bg-cyan-900/60 rounded-lg flex items-center justify-center">📈</span>
            Dashboard Charts (8 Charts)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Monthly Bookings - Bar */}
            <div className="bg-gray-900/80 border border-gray-800 rounded-xl p-4 col-span-1 sm:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-white font-semibold text-sm">Monthly Bookings</h4>
                  <p className="text-gray-500 text-xs">Vendor Booking · Count</p>
                </div>
                <span className="text-2xl">📊</span>
              </div>
              <MiniBarChart />
            </div>

            {/* Revenue by Category - Donut */}
            <div className="bg-gray-900/80 border border-gray-800 rounded-xl p-4 col-span-1 sm:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-white font-semibold text-sm">Revenue by Category</h4>
                  <p className="text-gray-500 text-xs">Vendor Booking · Sum(amount)</p>
                </div>
                <span className="text-2xl">🍩</span>
              </div>
              <MiniDonutChart />
            </div>

            {/* Customer Growth - Line */}
            <div className="bg-gray-900/80 border border-gray-800 rounded-xl p-4 col-span-1 sm:col-span-2">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h4 className="text-white font-semibold text-sm">Customer Growth</h4>
                  <p className="text-gray-500 text-xs">Event Customer · Count</p>
                </div>
                <span className="text-2xl">📈</span>
              </div>
              <MiniLineChart />
            </div>

            {/* Other charts list */}
            <div className="bg-gray-900/80 border border-gray-800 rounded-xl p-4 col-span-1 sm:col-span-2">
              <h4 className="text-white font-semibold text-sm mb-4">More Charts</h4>
              <div className="space-y-3">
                {dashboardCharts.slice(2).map((chart) => (
                  <div key={chart.name} className="flex items-center gap-3 p-2 bg-gray-800/40 rounded-lg">
                    <span className="text-xl">{chartTypeIcons[chart.type]}</span>
                    <div>
                      <div className="text-gray-200 text-xs font-medium">{chart.name}</div>
                      <div className="text-gray-600 text-xs">{chart.type} · {chart.based_on}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Script Reports */}
        <div>
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="w-8 h-8 bg-emerald-900/60 rounded-lg flex items-center justify-center">📊</span>
            Script Reports (7 Reports)
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {reports.map((report) => (
              <div key={report.name} className="bg-gray-900/60 border border-gray-800 rounded-xl overflow-hidden hover:border-purple-800/40 transition-colors">
                <div className="px-5 py-4 border-b border-gray-800 bg-gray-800/30 flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-semibold">{report.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-0.5 bg-purple-900/50 border border-purple-800/50 rounded text-purple-300 text-xs">{report.type}</span>
                      <span className="text-gray-500 text-xs">{report.module}</span>
                    </div>
                  </div>
                  <span className="text-2xl">📋</span>
                </div>
                <div className="p-5">
                  <p className="text-gray-400 text-sm mb-4">{report.description}</p>
                  <div className="mb-3">
                    <span className="text-gray-600 text-xs uppercase tracking-widest">Filters</span>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {report.filters.map((f) => (
                        <span key={f} className="px-2 py-0.5 bg-gray-800 border border-gray-700 rounded text-gray-400 text-xs font-mono">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600 text-xs uppercase tracking-widest">Columns</span>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {report.columns.map((c) => (
                        <span key={c} className="px-2 py-0.5 bg-blue-950/40 border border-blue-900/50 rounded text-blue-300 text-xs">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
