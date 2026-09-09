import { useState } from "react";
import { SWLLogo, StageBadge } from "../shared/SWLLogo";

interface Props { onExit: () => void }

type Page =
  | "login" | "dashboard" | "booking" | "checkIn" | "jobAssignment"
  | "batteryReminder" | "invoice" | "collection" | "ppfCheckup";

const REC_NAV = [
  { id: "dashboard", label: "Dashboard", icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" },
  { id: "booking", label: "Booking", icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
  { id: "checkIn", label: "Check-In", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" },
  { id: "jobAssignment", label: "Job Assignment", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
  { id: "batteryReminder", label: "Battery Reminder", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
  { id: "invoice", label: "Invoice", icon: "M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" },
  { id: "collection", label: "Collection", icon: "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" },
  { id: "ppfCheckup", label: "PPF Check-Up", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
];

const ALL_JOBS = [
  { id: "JOB-2024-0847", reg: "ABC 123", client: "James Whitfield", service: "Full Detail + Ceramic Coating", stage: "Service in Progress", worker: "M. Santos", value: "R 8,450" },
  { id: "JOB-2024-0848", reg: "DEF 456", client: "Sarah Mitchell", service: "Full Vehicle PPF", stage: "Quality Control", worker: "J. Nguyen", value: "R 12,000" },
  { id: "JOB-2024-0849", reg: "GHI 789", client: "Marcus Johnson", service: "Paint Correction", stage: "Vehicle Arrived", worker: "—", value: "R 2,800" },
  { id: "JOB-2024-0850", reg: "JKL 321", client: "Priya Sharma", service: "Ceramic Coating", stage: "Service in Progress", worker: "A. Patel", value: "R 4,200" },
  { id: "JOB-2024-0851", reg: "MNO 654", client: "David Doel", service: "Engine Bay Detail", stage: "Intake Complete", worker: "—", value: "R 800" },
  { id: "JOB-2024-0852", reg: "PQR 987", client: "Thabo Dlamini", service: "Full Vehicle PPF", stage: "Booked", worker: "—", value: "R 15,200" },
  { id: "JOB-2024-0853", reg: "STU 258", client: "J. van der Berg", service: "Frontal PPF", stage: "Ready for Collection", worker: "L. Chen", value: "R 5,500" },
];

/* ─── Reception Sidebar ─────────────────────────────────────────────────── */
function RecSidebar({ page, setPage, onExit }: { page: Page; setPage: (p: Page) => void; onExit: () => void }) {
  return (
    <aside className="w-48 bg-[#111827] text-white flex flex-col shrink-0">
      <div className="px-4 py-4 border-b border-white/10">
        <div className="flex items-center gap-2">
          <SWLLogo size="sm" />
          <div>
            <div className="text-xs font-black tracking-widest">SWL DETAILED</div>
            <div className="text-xs text-gray-500">OPERATIONS MGMT</div>
          </div>
        </div>
      </div>
      <nav className="flex-1 py-3 overflow-y-auto scroll-hidden">
        {REC_NAV.map(item => (
          <button
            key={item.id}
            onClick={() => setPage(item.id as Page)}
            className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-xs transition-all ${
              page === item.id
                ? "bg-white/10 text-white border-l-2 border-[#CC1F1F]"
                : "text-gray-400 hover:bg-white/5 hover:text-gray-200 border-l-2 border-transparent"
            }`}
          >
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d={item.icon} /></svg>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="px-4 py-3 border-t border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold">RA</div>
          <div>
            <div className="text-xs font-semibold">Rachel A.</div>
            <div className="text-xs text-gray-500">Reception</div>
          </div>
        </div>
        <button onClick={onExit} className="text-gray-600 hover:text-gray-300 text-xs" title="Exit">✕</button>
      </div>
    </aside>
  );
}

/* ─── Reception Dashboard ────────────────────────────────────────────────── */
function RecDashboard({ setPage }: { setPage: (p: Page) => void }) {
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState<string | null>(null);
  const filtered = ALL_JOBS.filter(j => {
    const ms = stageFilter ? j.stage === stageFilter : true;
    const mm = !search || [j.id, j.reg, j.client].some(s => s.toLowerCase().includes(search.toLowerCase()));
    return ms && mm;
  });
  const pipeline = [
    { label: "Booked", count: 3 }, { label: "Arrived", count: 2 }, { label: "Intake", count: 1 },
    { label: "In Progress", count: 4 }, { label: "QC", count: 2 }, { label: "Collection", count: 2 }, { label: "Collected", count: 108 },
  ];
  const stageMap: Record<string, string> = {
    "Booked": "Booked", "Arrived": "Vehicle Arrived", "Intake": "Intake Complete",
    "In Progress": "Service in Progress", "QC": "Quality Control", "Collection": "Ready for Collection", "Collected": "Collected"
  };
  const stageColors = ["text-purple-600 border-purple-600", "text-amber-600 border-amber-600", "text-teal-600 border-teal-600", "text-orange-600 border-orange-600", "text-purple-700 border-purple-700", "text-green-600 border-green-600", "text-gray-500 border-gray-500"];
  return (
    <div className="flex-1 overflow-y-auto scroll-hidden bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <div>
          <div className="text-xs text-gray-400 font-semibold">03 AUGUST 2026 · Front Desk</div>
          <h1 className="text-2xl font-bold text-gray-900">Reception Dashboard</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <button className="border border-gray-200 p-2 rounded-xl text-gray-500 hover:bg-gray-50">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            </button>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#CC1F1F] text-white text-xs rounded-full flex items-center justify-center font-bold">3</span>
          </div>
          <button onClick={() => setPage("booking")} className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors">+ New Job</button>
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">RC</div>
        </div>
      </div>

      <div className="px-8 py-6 space-y-5">
        {/* Alerts */}
        <div className="space-y-1">
          {[
            { dot: "#F59E0B", text: "JOB-0849 — GHI 789 on-site 3+ days. Battery check required.", action: () => setPage("batteryReminder") },
            { dot: "#6366F1", text: "JOB-0848 — Quality Control pending sign-off. Client not yet notified.", action: () => {} },
            { dot: "#CC1F1F", text: "2 new intake submissions awaiting Detailer assignment.", action: () => setPage("jobAssignment") },
          ].map((a, i) => (
            <div key={i} className="flex items-center gap-2 text-sm cursor-pointer hover:opacity-80" onClick={a.action}>
              <div className="w-3 h-3 rounded-full shrink-0" style={{ background: a.dot }} />
              <span style={{ color: a.dot }} className="font-semibold">{a.text}</span>
            </div>
          ))}
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "ACTIVE JOBS", count: 8, sub: "On-site today", color: "text-orange-600", icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
            { label: "TODAY'S INTAKES", count: 2, sub: "Completed this morning", color: "text-green-600", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
            { label: "AWAITING QC", count: 2, sub: "Pending sign-off", color: "text-purple-600", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" },
            { label: "READY TO COLLECT", count: 2, sub: "Client not yet notified", color: "text-green-600", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
          ].map(kpi => (
            <div key={kpi.label} className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs font-bold tracking-widest uppercase ${kpi.color}`}>{kpi.label}</span>
                <svg className={`w-4 h-4 ${kpi.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={kpi.icon} /></svg>
              </div>
              <div className="text-3xl font-bold text-gray-900">{kpi.count}</div>
              <div className="text-xs text-gray-400">{kpi.sub}</div>
            </div>
          ))}
        </div>

        {/* Pipeline */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold tracking-widest text-gray-400 uppercase">Job Lifecycle Pipeline</h3>
            <span className="text-xs text-gray-400">Tap a stage to filter</span>
          </div>
          <div className="grid grid-cols-7 gap-2">
            {pipeline.map((p, i) => (
              <button key={p.label} onClick={() => setStageFilter(stageFilter === stageMap[p.label] ? null : stageMap[p.label])} className={`flex flex-col items-center py-3 rounded-xl border-2 transition-all ${stageFilter === stageMap[p.label] ? "border-current" : "border-transparent hover:bg-gray-50"}`}>
                <div className={`text-xl font-bold ${stageColors[i].split(" ")[0]}`}>{p.count}</div>
                <div className={`text-xs font-medium mt-0.5 ${stageColors[i].split(" ")[0]}`}>{p.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Jobs table */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h3 className="font-bold">All Jobs <span className="text-gray-400 font-normal">({filtered.length} jobs)</span></h3>
            <div className="flex items-center gap-3">
              <input placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-1.5 text-xs w-40 focus:outline-none focus:border-[#CC1F1F]" />
              <button className="text-gray-400 border border-gray-200 p-1.5 rounded-lg">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
              </button>
            </div>
          </div>
          <table className="w-full text-xs">
            <thead><tr className="border-b border-gray-100 bg-gray-50">
              {["JOB ID", "REG", "CLIENT", "SERVICE", "STAGE", "WORKER", "VALUE", ""].map(h => (
                <th key={h} className="px-4 py-2.5 text-left font-bold text-gray-400 tracking-widest uppercase">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {filtered.map(job => (
                <tr key={job.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => setPage("invoice")}>
                  <td className="px-4 py-3 font-mono font-semibold text-gray-700">{job.id}</td>
                  <td className="px-4 py-3 font-mono font-bold">{job.reg}</td>
                  <td className="px-4 py-3 font-semibold">{job.client}</td>
                  <td className="px-4 py-3 text-gray-600">{job.service}</td>
                  <td className="px-4 py-3"><StageBadge stage={job.stage} /></td>
                  <td className="px-4 py-3 text-gray-600">{job.worker}</td>
                  <td className="px-4 py-3 font-semibold">{job.value}</td>
                  <td className="px-4 py-3">
                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ─── Booking Screen ────────────────────────────────────────────────────── */
function BookingScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex-1 overflow-y-auto scroll-hidden bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
            <button onClick={onBack} className="hover:text-[#CC1F1F]">Dashboard</button>
            <span>/</span><span>New Booking</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Create Booking</h1>
        </div>
        <div className="flex gap-3">
          <button onClick={onBack} className="border border-gray-200 text-gray-600 px-4 py-2 rounded-xl text-sm font-semibold">Cancel</button>
          <button className="bg-blue-600 text-white px-5 py-2 rounded-xl text-sm font-bold">Save Booking</button>
        </div>
      </div>
      <div className="px-8 py-6 grid grid-cols-2 gap-5">
        <div className="flex flex-col gap-5">
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <h3 className="font-bold mb-4">Client Details</h3>
            {[["Client Name", "James Harrington"], ["Contact Number", "066 674 3415"], ["Email Address", "james@harrington.co.za"]].map(([k, v]) => (
              <div key={k} className="mb-4">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1.5">{k}</label>
                <input defaultValue={v} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500" />
              </div>
            ))}
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <h3 className="font-bold mb-4">Vehicle Details</h3>
            {[["Registration", "SWLVNOM"], ["Make / Model", "BMW M4"], ["Colour", "Guard Red"], ["Year", "2022"]].map(([k, v]) => (
              <div key={k} className="mb-4">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1.5">{k}</label>
                <input defaultValue={v} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500" />
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <h3 className="font-bold mb-4">Booking Details</h3>
            <div className="mb-4">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1.5">Date</label>
              <input type="date" defaultValue="2026-07-31" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div className="mb-4">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1.5">Time</label>
              <input type="time" defaultValue="09:00" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div className="mb-4">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1.5">Booking Reference</label>
              <input defaultValue="SWLVNOM" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-mono focus:outline-none focus:border-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <h3 className="font-bold mb-4">Services</h3>
            {[["Full Vehicle PPF", "R 3,500", true], ["Interior Detail", "R 199", true], ["Paint Correction", "R 699", false], ["Ceramic Coating", "R 1,299", false]].map(([s, p, checked]) => (
              <div key={s as string} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded flex items-center justify-center ${checked ? "bg-blue-600" : "border-2 border-gray-300"}`}>
                    {checked && <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                  </div>
                  <span className="text-sm">{s as string}</span>
                </div>
                <span className="text-sm font-semibold text-gray-600">{p as string}</span>
              </div>
            ))}
            <div className="flex justify-between pt-3 font-bold">
              <span>Estimated Total</span>
              <span className="text-blue-600">R 18,750</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Check-In Screen ────────────────────────────────────────────────────── */
function CheckInScreen({ onConfirm, onBack }: { onConfirm: () => void; onBack: () => void }) {
  const [selectedBooking, setSelectedBooking] = useState(0);
  const [selectedWorker, setSelectedWorker] = useState("M. Santos");
  const [checks, setChecks] = useState({ ext: false, int: false, keys: false, id: false });
  const bookings = [
    { ref: "BKG-0091", name: "Kabelo Ndlovu", reg: "GP 458-921", service: "Full Vehicle PPF + Ceramic Coating", time: "03 Aug 2026 · 09:00", status: "Confirmed" },
    { ref: "BKG-0092", name: "Nomsa Khumalo", reg: "WC 223-114", service: "Paint Correction", time: "03 Aug 2026 · 10:30", status: "Confirmed" },
    { ref: "BKG-0093", name: "Ruan Botha", reg: "EC 541-802", service: "Interior Detail + Engine Bay", time: "03 Aug 2026 · 11:00", status: "Walk-In" },
  ];
  const workers = ["M. Santos", "J. Nguyen", "A. Patel", "L. Chen", "K. Ndlovu"];
  const checkLabels = { ext: "Exterior damage noted & photographed", int: "Interior noted", keys: "Vehicle keys received", id: "Client ID verified" };

  return (
    <div className="flex-1 overflow-y-auto scroll-hidden bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
            <button onClick={onBack} className="hover:text-[#CC1F1F]">Dashboard</button>
            <span>/</span><span>Check-In</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Vehicle Check-In</h1>
          <p className="text-xs text-gray-400">Reception · 03 Aug 2026</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-green-600 border border-green-200 bg-green-50 px-3 py-1.5 rounded-full">● Reception Active</span>
          <button className="text-gray-400">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
          </button>
        </div>
      </div>
      <div className="flex gap-0 flex-1" style={{ height: "calc(100% - 80px)" }}>
        {/* Left panel - bookings list */}
        <div className="w-80 border-r border-gray-200 bg-white p-4 overflow-y-auto scroll-hidden shrink-0">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Today's Bookings</h3>
          <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2 mb-3">
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input className="bg-transparent text-sm text-gray-600 flex-1 focus:outline-none" placeholder="Search by name or reg..." />
          </div>
          <div className="space-y-3">
            {bookings.map((b, i) => (
              <button key={b.ref} onClick={() => setSelectedBooking(i)} className={`w-full text-left p-3 rounded-2xl border-2 transition-all ${selectedBooking === i ? "border-[#CC1F1F] bg-red-50" : "border-gray-100 hover:border-gray-200"}`}>
                <div className="flex items-start justify-between mb-1">
                  <span className="text-xs text-gray-400">{b.ref}</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${b.status === "Confirmed" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>{b.status}</span>
                </div>
                <div className="font-bold text-gray-900 text-sm">{b.name}</div>
                <div className="text-xs font-mono text-gray-500 mt-0.5 inline-block bg-gray-100 px-2 py-0.5 rounded">{b.reg}</div>
                <div className="text-xs text-gray-400 mt-1">{b.service}</div>
                <div className="text-xs text-gray-400">{b.time}</div>
              </button>
            ))}
            <button className="w-full border-2 border-dashed border-gray-200 text-gray-400 py-3 rounded-2xl text-sm font-semibold hover:border-gray-300 transition-colors">
              + Add Walk-In
            </button>
          </div>
        </div>

        {/* Right panel - check-in form */}
        <div className="flex-1 overflow-y-auto scroll-hidden p-6 space-y-4">
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="text-xs text-gray-400 uppercase tracking-widest">BOOKING</div>
                <h2 className="text-xl font-bold">{bookings[selectedBooking].name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-mono text-sm font-semibold bg-gray-100 px-2 py-0.5 rounded">{bookings[selectedBooking].reg}</span>
                  <span className="text-sm text-gray-400">{bookings[selectedBooking].ref}</span>
                </div>
                <div className="text-sm text-gray-500 mt-1">{bookings[selectedBooking].service}</div>
                <div className="text-xs text-gray-400">{bookings[selectedBooking].time}</div>
              </div>
              <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-green-100 text-green-700">Confirmed</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Assign Detailer</h3>
            <div className="flex gap-2 flex-wrap">
              {workers.map(w => (
                <button key={w} onClick={() => setSelectedWorker(w)} className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${selectedWorker === w ? "bg-[#CC1F1F] text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}>{w}</button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Reception Notes (Optional)</h3>
            <textarea className="w-full border border-gray-200 rounded-xl p-3 text-sm text-gray-400 h-20 resize-none focus:outline-none focus:border-blue-500" placeholder="E.g. customer mentioned a scratch on the rear bumper..." />
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Quick Condition Check</h3>
            {Object.entries(checkLabels).map(([key, label]) => (
              <button key={key} onClick={() => setChecks(p => ({ ...p, [key]: !p[key as keyof typeof p] }))} className="w-full flex items-center gap-3 py-2.5 border-b border-gray-100 last:border-0 text-left">
                <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${checks[key as keyof typeof checks] ? "bg-blue-600 border-blue-600" : "border-gray-300"}`}>
                  {checks[key as keyof typeof checks] && <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                </div>
                <span className="text-sm text-gray-700">{label}</span>
              </button>
            ))}
          </div>

          <button onClick={onConfirm} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-base hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            Confirm Check-In & Create Job
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Job Assignment ─────────────────────────────────────────────────────── */
function JobAssignmentScreen({ onBack }: { onBack: () => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <div className="flex-1 overflow-y-auto scroll-hidden bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
          <button onClick={onBack} className="hover:text-[#CC1F1F]">Bookings</button>
          <span>/</span><span>James Harrington — SWLVNOM</span>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Job Assignment</h1>
          <button className="bg-[#CC1F1F] text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            Convert to Job & Check In
          </button>
        </div>
      </div>
      <div className="px-8 py-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm mb-5">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-lg font-bold font-mono">BKG-2026-0847</span>
            <span className="badge-booked text-xs font-semibold px-2.5 py-1 rounded-full">● Booked</span>
          </div>
          <p className="text-sm text-gray-500 mb-1">James Harrington — 2022 BMW M4 (SWLVNOM) · Full Vehicle PPF + Interior Detail</p>
          <p className="text-xs text-gray-400">Booked: 31 July 2026 · R 18,750 estimated</p>
        </div>
        <div className="grid grid-cols-2 gap-5 mb-5">
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Client Details</h3>
            {[["Name", "James Harrington"], ["Phone", "066 674 3415"], ["Email", "james@harrington.co.za"], ["Preferred", "SMS"]].map(([k, v]) => (
              <div key={k} className="flex justify-between py-2 border-b border-gray-100 last:border-0 text-sm">
                <span className="text-gray-400">{k}</span><span className="font-semibold text-right">{v}</span>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Vehicle</h3>
            {[["Registration", "SWLVNOM"], ["Make/Model", "2022 BMW M4"], ["Colour", "Guard Red"], ["Year", "2022"]].map(([k, v]) => (
              <div key={k} className="flex justify-between py-2 border-b border-gray-100 last:border-0 text-sm">
                <span className="text-gray-400">{k}</span><span className="font-semibold font-mono">{v}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Vehicle Check-In</h3>
          <div className="grid grid-cols-3 gap-4 mb-4">
            {[["Bay Assigned", "Bay 4"], ["Mileage In", "48,320 km"], ["Fuel Level", "¾ Full"]].map(([k, v]) => (
              <div key={k}>
                <label className="text-xs text-gray-400 block mb-1.5">{k}</label>
                <input defaultValue={v} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#CC1F1F]" />
              </div>
            ))}
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-3 flex items-center gap-2">
            <svg className="w-4 h-4 text-green-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <p className="text-xs text-green-700">Vehicle confirmed on site. Client intake form will be sent to tablet kiosk.</p>
          </div>
        </div>

        <div className="mt-5 bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Assign Detailer</h3>
          <div className="grid grid-cols-3 gap-3">
            {["M. Santos", "J. Nguyen", "A. Patel", "L. Chen", "K. Ndlovu"].map(w => (
              <button key={w} onClick={() => setSelected(w)} className={`p-3 rounded-xl border-2 text-sm font-semibold transition-all ${selected === w ? "border-[#CC1F1F] bg-red-50 text-[#CC1F1F]" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}>{w}</button>
            ))}
          </div>
          {selected && <p className="text-xs text-green-600 mt-3">✓ JOB-SWL-DMO905 will be assigned to {selected}</p>}
        </div>
      </div>
    </div>
  );
}

/* ─── Battery Reminder ────────────────────────────────────────────────────── */
function BatteryReminderScreen({ onBack }: { onBack: () => void }) {
  const [confirmed, setConfirmed] = useState<Record<string, boolean>>({});
  const vehicles = [
    { job: "JOB-1042", reg: "CA 123-456", vehicle: "BMW M4 Competition", days: 3, status: "Urgent — battery check required", urgent: true },
    { job: "JOB-0849", reg: "GHI 789", vehicle: "Audi RS3", days: 2, status: "Check recommended", urgent: false },
  ];
  return (
    <div className="flex-1 overflow-y-auto scroll-hidden bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-8 py-4">
        <h1 className="text-2xl font-bold text-gray-900">Battery Reminder Panel</h1>
        <p className="text-sm text-gray-400">Vehicles on-site for 2+ days requiring battery status confirmation</p>
      </div>
      <div className="px-8 py-6">
        <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-5">
          <svg className="w-5 h-5 text-amber-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          <p className="text-sm text-amber-700"><strong>Battery check required</strong> — Vehicles left on-site for extended periods may experience natural battery discharge. Please confirm battery status for the following vehicles.</p>
        </div>
        <div className="space-y-4">
          {vehicles.map(v => (
            <div key={v.job} className={`bg-white rounded-2xl border-2 p-5 shadow-sm ${v.urgent ? "border-[#CC1F1F]" : "border-amber-200"}`}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-lg font-mono">{v.reg}</span>
                    {v.urgent && <span className="text-xs bg-red-100 text-[#CC1F1F] px-2.5 py-0.5 rounded-full font-bold">URGENT</span>}
                  </div>
                  <div className="text-gray-600">{v.vehicle}</div>
                  <div className="text-xs text-gray-400 mt-1">{v.job} · On-site: {v.days} days</div>
                  <div className={`text-sm font-semibold mt-2 ${v.urgent ? "text-[#CC1F1F]" : "text-amber-600"}`}>Status: {v.status}</div>
                </div>
                <div className="flex flex-col gap-2">
                  <button onClick={() => setConfirmed(p => ({ ...p, [v.job]: true }))} className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${confirmed[v.job] ? "bg-green-600 text-white" : "bg-[#CC1F1F] text-white hover:bg-[#b01a1a]"}`}>
                    {confirmed[v.job] ? "✓ Confirmed" : "Confirm Battery OK"}
                  </button>
                  <button className="border border-gray-200 px-4 py-2 rounded-xl text-sm font-semibold text-gray-600">Log Jump Start</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button onClick={onBack} className="mt-5 border border-gray-200 text-gray-600 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50">← Back to Dashboard</button>
      </div>
    </div>
  );
}

/* ─── Invoice ────────────────────────────────────────────────────────────── */
function InvoiceScreen({ onPaid, onBack }: { onPaid: () => void; onBack: () => void }) {
  const [paid, setPaid] = useState(false);
  return (
    <div className="flex-1 overflow-y-auto scroll-hidden bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
            <button onClick={onBack} className="hover:text-[#CC1F1F]">Dashboard</button>
            <span>/</span><span>Invoice</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Invoice — JOB-SWL-DMO905</h1>
        </div>
        <div className="flex gap-3">
          <button className="border border-gray-200 text-gray-600 px-4 py-2 rounded-xl text-sm font-semibold">Download PDF</button>
          {!paid && <button onClick={() => { setPaid(true); setTimeout(onPaid, 1000); }} className="bg-[#CC1F1F] text-white px-5 py-2 rounded-xl text-sm font-bold">Record Payment</button>}
          {paid && <span className="bg-green-600 text-white px-5 py-2 rounded-xl text-sm font-bold">✓ Payment Recorded</span>}
        </div>
      </div>
      <div className="px-8 py-6 grid grid-cols-3 gap-5">
        <div className="col-span-2 flex flex-col gap-5">
          <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-2 mb-2"><SWLLogo size="sm" /><div className="font-black text-lg">SWL DETAILED</div></div>
                <div className="text-xs text-gray-400">Unit 26, Scientia Technopark, 2 Meiring Naude Road, Pretoria 0181</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold font-mono">INVOICE</div>
                <div className="text-sm text-gray-400 mt-1">INV-2026-0847</div>
                <div className="text-sm text-gray-400">31 July 2026</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
              <div>
                <div className="text-xs text-gray-400 uppercase tracking-widest mb-1">Bill To</div>
                <div className="font-bold">James Harrington</div>
                <div className="text-gray-500">james@harrington.co.za</div>
                <div className="text-gray-500">066 674 3415</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-400 uppercase tracking-widest mb-1">Vehicle</div>
                <div className="font-bold">SWLVNOM</div>
                <div className="text-gray-500">2022 BMW M4</div>
                <div className="text-gray-500">Guard Red</div>
              </div>
            </div>
            <table className="w-full mb-4 text-sm">
              <thead><tr className="border-b-2 border-gray-200">
                <th className="text-left pb-2 text-gray-400 font-semibold">Service</th>
                <th className="text-right pb-2 text-gray-400 font-semibold">Unit Price</th>
                <th className="text-right pb-2 text-gray-400 font-semibold">Total</th>
              </tr></thead>
              <tbody>
                {[["Full Vehicle PPF (STEK DYNOshield)", "R 3,500"], ["Interior Detail", "R 199"]].map(([s, p]) => (
                  <tr key={s} className="border-b border-gray-100">
                    <td className="py-3">{s}</td>
                    <td className="py-3 text-right font-mono">{p}</td>
                    <td className="py-3 text-right font-mono font-semibold">{p}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end">
              <div className="w-48">
                <div className="flex justify-between py-1.5 text-sm"><span className="text-gray-400">Subtotal</span><span>R 3,699</span></div>
                <div className="flex justify-between py-1.5 text-sm"><span className="text-gray-400">VAT (15%)</span><span>R 554.85</span></div>
                <div className="flex justify-between py-2 border-t-2 border-gray-900 font-bold text-lg"><span>Total</span><span>R 4,253.85</span></div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className={`rounded-2xl border p-4 ${paid ? "bg-green-50 border-green-200" : "bg-white border-gray-200"} shadow-sm`}>
            <h3 className="font-bold mb-3">Payment Status</h3>
            <div className={`text-center py-4 ${paid ? "text-green-600" : "text-amber-600"}`}>
              <div className="text-3xl mb-1">{paid ? "✓" : "⏳"}</div>
              <div className="font-bold">{paid ? "Paid" : "Awaiting Payment"}</div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
            <h3 className="font-bold mb-3">Payment Method</h3>
            <div className="space-y-2">
              {["Card (Tap to Pay)", "Cash", "EFT / Bank Transfer"].map((m, i) => (
                <label key={m} className="flex items-center gap-2 cursor-pointer py-1">
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${i === 0 ? "border-[#CC1F1F]" : "border-gray-300"}`}>
                    {i === 0 && <div className="w-2 h-2 rounded-full bg-[#CC1F1F]" />}
                  </div>
                  <span className="text-sm">{m}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
            <h3 className="font-bold mb-2 text-sm">Job Summary</h3>
            <div className="text-xs space-y-1 text-gray-600">
              <div>JOB-SWL-DMO905</div>
              <div>James Harrington</div>
              <div className="font-mono">SWLVNOM — 2022 BMW M4</div>
              <div className="mt-2 font-bold text-gray-900">Total: R 3,699</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Collection Confirmation ─────────────────────────────────────────────── */
function CollectionConfirmationScreen({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  return (
    <div className="flex-1 overflow-y-auto scroll-hidden bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-gray-900">Collection Confirmation</h1>
        <p className="text-sm text-gray-400">Confirm vehicle collection and finalise job</p></div>
        <div className="flex gap-3">
          <button onClick={onBack} className="border border-gray-200 text-gray-600 px-4 py-2 rounded-xl text-sm font-semibold">Back</button>
          <button onClick={onNext} className="bg-green-600 text-white px-5 py-2 rounded-xl text-sm font-bold">Confirm Collection</button>
        </div>
      </div>
      <div className="px-8 py-6 max-w-2xl">
        <div className="bg-green-50 border border-green-200 rounded-2xl p-5 mb-5">
          <div className="flex items-center gap-2 mb-1">
            <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span className="font-bold text-green-800">Ready for Collection</span>
          </div>
          <p className="text-sm text-green-700">JOB-SWL-DMO905 has passed Quality Control. Invoice has been paid. Client has been notified.</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm mb-5">
          <h3 className="font-bold mb-3">Job Summary</h3>
          {[["Job ID", "JOB-SWL-DMO905"], ["Client", "James Harrington"], ["Vehicle", "SWLVNOM — 2022 BMW M4"], ["Services", "Full Vehicle PPF + Interior Detail"], ["Amount Paid", "R 3,699 — Card"], ["Completed By", "M. Santos"]].map(([k, v]) => (
            <div key={k} className="flex justify-between py-2.5 border-b border-gray-100 last:border-0 text-sm">
              <span className="text-gray-400">{k}</span><span className="font-semibold">{v}</span>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <h3 className="font-bold mb-3">Handover Checklist</h3>
          {["Vehicle keys returned to client", "PPF care guide provided", "Invoice copy provided", "Vehicle walked around with client"].map(item => (
            <div key={item} className="flex items-center gap-2 py-2 border-b border-gray-100 last:border-0">
              <div className="w-4 h-4 rounded bg-green-500 flex items-center justify-center">
                <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              </div>
              <span className="text-sm text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── PPF Check-Up ────────────────────────────────────────────────────────── */
function PPFCheckUpScreen({ onBack }: { onBack: () => void }) {
  const [saved, setSaved] = useState(false);
  return (
    <div className="flex-1 overflow-y-auto scroll-hidden bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-gray-900">PPF Check-Up Scheduling</h1>
        <p className="text-sm text-gray-400">Schedule the 7-day post-installation inspection</p></div>
        <button onClick={() => setSaved(true)} className={`${saved ? "bg-green-600" : "bg-[#CC1F1F]"} text-white px-5 py-2.5 rounded-xl text-sm font-bold`}>
          {saved ? "✓ Check-Up Scheduled" : "Schedule Check-Up"}
        </button>
      </div>
      <div className="px-8 py-6 max-w-2xl">
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm mb-5">
          <h3 className="font-bold mb-3">PPF Job Details</h3>
          {[["Job ID", "JOB-SWL-DMO905"], ["Client", "James Harrington"], ["Vehicle", "SWLVNOM — 2022 BMW M4 Guard Red"], ["Film Type", "STEK DYNOshield — Full Vehicle"], ["Installation Date", "31 July 2026"]].map(([k, v]) => (
            <div key={k} className="flex justify-between py-2.5 border-b border-gray-100 last:border-0 text-sm">
              <span className="text-gray-400">{k}</span><span className="font-semibold">{v}</span>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm mb-5">
          <h3 className="font-bold mb-3">Schedule Check-Up</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1.5">Check-Up Date</label>
              <input type="date" defaultValue="2026-08-07" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#CC1F1F]" />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1.5">Time</label>
              <input type="time" defaultValue="10:00" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#CC1F1F]" />
            </div>
          </div>
          <div className="mt-3 bg-blue-50 border border-blue-200 rounded-xl p-3 flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <p className="text-xs text-blue-600">
              PPF installed 31 July 2026. Recommended check-up: <strong>07 August 2026 at 10:00 AM</strong>
              {saved && " — Scheduled ✓"}
            </p>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <h3 className="font-bold mb-3">Notification Settings</h3>
          <p className="text-xs text-gray-400 mb-3">Client will be notified via their preferred contact method (SMS).</p>
          <div className="bg-gray-50 rounded-xl p-3 text-xs font-mono text-gray-600">
            &ldquo;Hi James, your BMW M4 (SWLVNOM) PPF check-up is scheduled for 07 Aug 2026 at 10:00 AM. Please bring your vehicle to SWL Detailed. See you then! — SWL Detailed&rdquo;
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Login ─────────────────────────────────────────────────────────────── */
function RecLogin({ onLogin }: { onLogin: () => void }) {
  return (
    <div className="min-h-full flex flex-col items-center justify-center bg-[#0e1520] px-4 py-12">
      <div className="flex flex-col items-center mb-8">
        <div className="flex items-center gap-3 mb-4">
          <SWLLogo size="lg" />
          <div className="text-white">
            <div className="text-xl font-black tracking-widest">SWL DETAILED</div>
            <div className="text-xs text-gray-400 tracking-widest">VWOMS MANAGER PORTAL</div>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
        <p className="text-gray-400 text-sm mt-1">Sign in to access the reception dashboard.</p>
      </div>
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
        <div className="mb-5">
          <label className="text-xs font-bold tracking-widest text-gray-400 uppercase block mb-1.5">Email Address</label>
          <input placeholder="reception@swldetailed.co.za" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500" />
        </div>
        <div className="mb-6">
          <label className="text-xs font-bold tracking-widest text-gray-400 uppercase block mb-1.5">Password</label>
          <input type="password" placeholder="••••••••" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500" />
        </div>
        <div className="flex items-center justify-between mb-6">
          <label className="flex items-center gap-2 text-sm text-gray-600"><input type="checkbox" className="rounded" /> Remember me</label>
          <button className="text-sm text-[#CC1F1F] font-semibold">Forgot password?</button>
        </div>
        <button onClick={onLogin} className="w-full bg-[#CC1F1F] text-white py-3.5 rounded-xl font-bold hover:bg-[#b01a1a] transition-colors mb-6">Sign In to Manager Portal</button>
        <div className="border-t border-gray-100 pt-4">
          <div className="text-xs text-gray-400 text-center mb-3 uppercase tracking-widest">Role Access</div>
          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 border border-gray-200 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-50"><div className="w-2 h-2 rounded-full bg-green-500" />Manager / Admin</button>
            <button onClick={onLogin} className="flex-1 flex items-center justify-center gap-2 border border-gray-200 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-50"><div className="w-2 h-2 rounded-full bg-green-500" />Reception / Admin</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main ReceptionPortal ─────────────────────────────────────────────── */
export default function ReceptionPortal({ onExit }: Props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [page, setPage] = useState<Page>("dashboard");

  if (!loggedIn) return <RecLogin onLogin={() => setLoggedIn(true)} />;

  const renderPage = () => {
    switch (page) {
      case "dashboard": return <RecDashboard setPage={setPage} />;
      case "booking": return <BookingScreen onBack={() => setPage("dashboard")} />;
      case "checkIn": return <CheckInScreen onConfirm={() => setPage("jobAssignment")} onBack={() => setPage("dashboard")} />;
      case "jobAssignment": return <JobAssignmentScreen onBack={() => setPage("dashboard")} />;
      case "batteryReminder": return <BatteryReminderScreen onBack={() => setPage("dashboard")} />;
      case "invoice": return <InvoiceScreen onPaid={() => setPage("collection")} onBack={() => setPage("dashboard")} />;
      case "collection": return <CollectionConfirmationScreen onNext={() => setPage("ppfCheckup")} onBack={() => setPage("dashboard")} />;
      case "ppfCheckup": return <PPFCheckUpScreen onBack={() => setPage("dashboard")} />;
      default: return <RecDashboard setPage={setPage} />;
    }
  };

  return (
    <div className="flex h-full">
      <RecSidebar page={page} setPage={setPage} onExit={onExit} />
      {renderPage()}
    </div>
  );
}
