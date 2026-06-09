import { useState } from "react";

const vendorCategories = [
  { name: "Wedding Hall", icon: "🏛️", count: 234, avgPrice: "₹1,50,000", topCity: "Mumbai" },
  { name: "Photographer", icon: "📸", count: 892, avgPrice: "₹35,000", topCity: "Delhi" },
  { name: "Videographer", icon: "🎬", count: 456, avgPrice: "₹45,000", topCity: "Bangalore" },
  { name: "Caterer", icon: "🍽️", count: 1203, avgPrice: "₹800/plate", topCity: "Hyderabad" },
  { name: "Decorator", icon: "🌸", count: 678, avgPrice: "₹80,000", topCity: "Chennai" },
  { name: "Makeup Artist", icon: "💄", count: 345, avgPrice: "₹15,000", topCity: "Mumbai" },
  { name: "Event Planner", icon: "📋", count: 167, avgPrice: "₹2,00,000", topCity: "Delhi" },
  { name: "DJ Provider", icon: "🎵", count: 445, avgPrice: "₹20,000", topCity: "Pune" },
  { name: "Transportation", icon: "🚗", count: 223, avgPrice: "₹12,000", topCity: "Bangalore" },
  { name: "Flower Decorator", icon: "🌺", count: 334, avgPrice: "₹30,000", topCity: "Jaipur" },
  { name: "Banquet Hall", icon: "🏢", count: 189, avgPrice: "₹2,50,000", topCity: "Mumbai" },
  { name: "Mehendi Artist", icon: "🎨", count: 567, avgPrice: "₹8,000", topCity: "Rajkot" },
];

const sampleVendors = [
  {
    name: "VND-2024-0001",
    vendor_name: "The Grand Mahal",
    category: "Wedding Hall",
    city: "Mumbai",
    rating: 4.8,
    reviews: 156,
    min_price: "₹3,50,000",
    status: "Active",
    verified: true,
  },
  {
    name: "VND-2024-0002",
    vendor_name: "Lens & Light Photography",
    category: "Photographer",
    city: "Delhi",
    rating: 4.9,
    reviews: 234,
    min_price: "₹45,000",
    status: "Active",
    verified: true,
  },
  {
    name: "VND-2024-0003",
    vendor_name: "Royal Caterers",
    category: "Caterer",
    city: "Bangalore",
    rating: 4.6,
    reviews: 89,
    min_price: "₹600/plate",
    status: "Active",
    verified: true,
  },
  {
    name: "VND-2024-0004",
    vendor_name: "Bloom & Blossom Decor",
    category: "Decorator",
    city: "Jaipur",
    rating: 4.7,
    reviews: 112,
    min_price: "₹75,000",
    status: "Active",
    verified: false,
  },
  {
    name: "VND-2024-0005",
    vendor_name: "Glam Studio",
    category: "Makeup Artist",
    city: "Mumbai",
    rating: 4.5,
    reviews: 67,
    min_price: "₹12,000",
    status: "Active",
    verified: true,
  },
  {
    name: "VND-2024-0006",
    vendor_name: "Perfect Weddings Co.",
    category: "Event Planner",
    city: "Hyderabad",
    rating: 4.9,
    reviews: 45,
    min_price: "₹1,50,000",
    status: "Active",
    verified: true,
  },
];

const sampleBookings = [
  {
    name: "BKG-2024-01-0001",
    booking_title: "Sharma Wedding at The Grand Mahal",
    customer: "Priya Sharma",
    vendor: "The Grand Mahal",
    event_date: "2024-02-14",
    event_type: "Wedding",
    total_amount: "₹4,20,000",
    paid_amount: "₹1,26,000",
    booking_status: "Confirmed",
    payment_status: "Partially Paid",
  },
  {
    name: "BKG-2024-01-0002",
    booking_title: "Kapoor Reception Photography",
    customer: "Rohan Kapoor",
    vendor: "Lens & Light Photography",
    event_date: "2024-02-20",
    event_type: "Reception",
    total_amount: "₹53,100",
    paid_amount: "₹53,100",
    booking_status: "Completed",
    payment_status: "Fully Paid",
  },
  {
    name: "BKG-2024-01-0003",
    booking_title: "Gupta Engagement Decoration",
    customer: "Anjali Gupta",
    vendor: "Bloom & Blossom Decor",
    event_date: "2024-03-05",
    event_type: "Engagement",
    total_amount: "₹88,500",
    paid_amount: "₹0",
    booking_status: "Requested",
    payment_status: "Unpaid",
  },
  {
    name: "BKG-2024-01-0004",
    booking_title: "Mehta Corporate Event Catering",
    customer: "Vikram Mehta",
    vendor: "Royal Caterers",
    event_date: "2024-02-28",
    event_type: "Corporate Event",
    total_amount: "₹2,36,000",
    paid_amount: "₹2,36,000",
    booking_status: "Completed",
    payment_status: "Fully Paid",
  },
];

const sampleEventTypes = [
  "Wedding", "Reception", "Engagement", "Mehendi Ceremony", "Haldi Ceremony",
  "Sangeet Night", "Birthday Party", "Corporate Event", "Baby Shower",
  "Anniversary", "Graduation Party", "Product Launch", "Conference",
  "Festival Celebration", "Cultural Event"
];

type TabType = "vendors" | "bookings" | "categories" | "events";

export default function DemoDataSection() {
  const [activeTab, setActiveTab] = useState<TabType>("vendors");

  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: "categories", label: "Vendor Categories", icon: "🏪" },
    { id: "vendors", label: "Sample Vendors", icon: "👤" },
    { id: "bookings", label: "Sample Bookings", icon: "📖" },
    { id: "events", label: "Event Types", icon: "🎉" },
  ];

  const statusColor: Record<string, string> = {
    "Confirmed": "bg-blue-900/50 text-blue-300 border-blue-800/50",
    "Completed": "bg-emerald-900/50 text-emerald-300 border-emerald-800/50",
    "Requested": "bg-amber-900/50 text-amber-300 border-amber-800/50",
    "Cancelled": "bg-red-900/50 text-red-300 border-red-800/50",
    "Draft": "bg-gray-800/50 text-gray-300 border-gray-700/50",
    "Active": "bg-emerald-900/50 text-emerald-300 border-emerald-800/50",
    "Fully Paid": "bg-green-900/50 text-green-300 border-green-800/50",
    "Partially Paid": "bg-orange-900/50 text-orange-300 border-orange-800/50",
    "Unpaid": "bg-red-900/50 text-red-300 border-red-800/50",
  };

  return (
    <section className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-purple-400 text-sm font-semibold uppercase tracking-widest">Sample Data</span>
          <h2 className="text-4xl font-black text-white mt-2 mb-4">Demo Data & Fixtures</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Ships with realistic demo data — 12 vendor categories, 15 event types,
            and sample records for testing all workflows.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-800 pb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-purple-700 text-white shadow-lg shadow-purple-900/40"
                  : "bg-gray-800/60 text-gray-400 hover:text-white hover:bg-gray-800 border border-gray-700/50"
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Categories Tab */}
        {activeTab === "categories" && (
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {vendorCategories.map((cat) => (
                <div
                  key={cat.name}
                  className="bg-gray-900/80 border border-gray-800 rounded-xl p-5 hover:border-purple-700/40 transition-all duration-200 hover:-translate-y-0.5"
                >
                  <div className="text-3xl mb-3">{cat.icon}</div>
                  <h3 className="text-white font-semibold text-sm mb-2">{cat.name}</h3>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Vendors:</span>
                      <span className="text-gray-300 font-mono">{cat.count.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Avg Price:</span>
                      <span className="text-emerald-400 font-mono">{cat.avgPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Top City:</span>
                      <span className="text-blue-300">{cat.topCity}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-gray-800/40 border border-gray-700/50 rounded-xl text-center">
              <span className="text-gray-500 text-sm">
                💡 These categories are auto-loaded from <code className="text-purple-300 font-mono text-xs">fixtures/vendor_category.json</code> during migration
              </span>
            </div>
          </div>
        )}

        {/* Vendors Tab */}
        {activeTab === "vendors" && (
          <div className="overflow-x-auto rounded-xl border border-gray-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-800/60 border-b border-gray-700">
                  <th className="text-left px-4 py-3 text-gray-400 font-semibold text-xs uppercase">Name</th>
                  <th className="text-left px-4 py-3 text-gray-400 font-semibold text-xs uppercase">Vendor</th>
                  <th className="text-left px-4 py-3 text-gray-400 font-semibold text-xs uppercase">Category</th>
                  <th className="text-left px-4 py-3 text-gray-400 font-semibold text-xs uppercase">City</th>
                  <th className="text-left px-4 py-3 text-gray-400 font-semibold text-xs uppercase">Rating</th>
                  <th className="text-left px-4 py-3 text-gray-400 font-semibold text-xs uppercase">Min Price</th>
                  <th className="text-left px-4 py-3 text-gray-400 font-semibold text-xs uppercase">Status</th>
                  <th className="text-left px-4 py-3 text-gray-400 font-semibold text-xs uppercase">Verified</th>
                </tr>
              </thead>
              <tbody>
                {sampleVendors.map((v) => (
                  <tr key={v.name} className="border-b border-gray-800/60 hover:bg-gray-800/30 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-purple-300">{v.name}</td>
                    <td className="px-4 py-3 text-white font-medium">{v.vendor_name}</td>
                    <td className="px-4 py-3 text-gray-300">{v.category}</td>
                    <td className="px-4 py-3 text-gray-400">{v.city}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400">★</span>
                        <span className="text-white">{v.rating}</span>
                        <span className="text-gray-600 text-xs">({v.reviews})</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-emerald-400 font-mono text-xs">{v.min_price}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded border text-xs ${statusColor[v.status] || ""}`}>
                        {v.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {v.verified
                        ? <span className="text-emerald-400 text-sm">✓ Verified</span>
                        : <span className="text-gray-600 text-sm">—</span>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-4 py-3 bg-gray-800/20 border-t border-gray-800 text-center">
              <span className="text-gray-500 text-xs">Sample data · Full dataset includes 20+ vendors across all categories</span>
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === "bookings" && (
          <div className="overflow-x-auto rounded-xl border border-gray-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-800/60 border-b border-gray-700">
                  <th className="text-left px-4 py-3 text-gray-400 font-semibold text-xs uppercase">Booking ID</th>
                  <th className="text-left px-4 py-3 text-gray-400 font-semibold text-xs uppercase">Title</th>
                  <th className="text-left px-4 py-3 text-gray-400 font-semibold text-xs uppercase">Customer</th>
                  <th className="text-left px-4 py-3 text-gray-400 font-semibold text-xs uppercase">Vendor</th>
                  <th className="text-left px-4 py-3 text-gray-400 font-semibold text-xs uppercase">Event Date</th>
                  <th className="text-left px-4 py-3 text-gray-400 font-semibold text-xs uppercase">Total</th>
                  <th className="text-left px-4 py-3 text-gray-400 font-semibold text-xs uppercase">Booking Status</th>
                  <th className="text-left px-4 py-3 text-gray-400 font-semibold text-xs uppercase">Payment</th>
                </tr>
              </thead>
              <tbody>
                {sampleBookings.map((b) => (
                  <tr key={b.name} className="border-b border-gray-800/60 hover:bg-gray-800/30 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-purple-300">{b.name}</td>
                    <td className="px-4 py-3 text-white max-w-36 truncate" title={b.booking_title}>{b.booking_title}</td>
                    <td className="px-4 py-3 text-gray-300">{b.customer}</td>
                    <td className="px-4 py-3 text-gray-300 max-w-24 truncate" title={b.vendor}>{b.vendor}</td>
                    <td className="px-4 py-3 text-cyan-400 font-mono text-xs">{b.event_date}</td>
                    <td className="px-4 py-3 text-white font-semibold">{b.total_amount}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded border text-xs ${statusColor[b.booking_status] || ""}`}>
                        {b.booking_status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded border text-xs ${statusColor[b.payment_status] || ""}`}>
                        {b.payment_status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-4 py-3 bg-gray-800/20 border-t border-gray-800 text-center">
              <span className="text-gray-500 text-xs">Sample bookings · Full demo includes 50+ bookings with payment history</span>
            </div>
          </div>
        )}

        {/* Event Types Tab */}
        {activeTab === "events" && (
          <div>
            <div className="flex flex-wrap gap-3">
              {sampleEventTypes.map((et, i) => {
                const icons = ["💍", "🥂", "💎", "🌺", "🌻", "🎵", "🎂", "💼", "👶", "❤️", "🎓", "🚀", "🎤", "🎊", "🎭"];
                return (
                  <div
                    key={et}
                    className="flex items-center gap-2 px-4 py-2.5 bg-gray-900/80 border border-gray-800 rounded-xl hover:border-purple-700/40 transition-all hover:-translate-y-0.5 cursor-default"
                  >
                    <span className="text-xl">{icons[i % icons.length]}</span>
                    <span className="text-gray-200 text-sm font-medium">{et}</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 p-4 bg-gray-800/40 border border-gray-700/50 rounded-xl text-center">
              <span className="text-gray-500 text-sm">
                💡 Event Types are seeded from <code className="text-purple-300 font-mono text-xs">fixtures/event_type.json</code> — easily extensible
              </span>
            </div>

            {/* Naming Series */}
            <div className="mt-8">
              <h4 className="text-white font-bold mb-4">📌 Naming Series</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { doctype: "Vendor Profile", series: "VND-.YYYY.-.####" },
                  { doctype: "Vendor Booking", series: "BKG-.YYYY.MM.-.####" },
                  { doctype: "Event Request", series: "EVT-.YYYY.MM.-.####" },
                  { doctype: "Booking Payment", series: "PAY-.YYYY.MM.-.####" },
                  { doctype: "Hall Booking", series: "HBK-.YYYY.MM.-.####" },
                  { doctype: "Refund Request", series: "REF-.YYYY.-.####" },
                  { doctype: "Vendor Review", series: "REV-.YYYY.-.####" },
                  { doctype: "Event Customer", series: "CUST-.YYYY.-.####" },
                  { doctype: "Event Plan", series: "EPLAN-.YYYY.-.####" },
                ].map((ns) => (
                  <div key={ns.doctype} className="flex items-center gap-3 p-3 bg-gray-800/40 border border-gray-700/50 rounded-lg">
                    <span className="text-sm">📋</span>
                    <div>
                      <div className="text-gray-200 text-xs font-medium">{ns.doctype}</div>
                      <div className="text-purple-400 font-mono text-xs">{ns.series}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
