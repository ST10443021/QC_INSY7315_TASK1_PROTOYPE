import { useState } from "react";
import { SWLLogo, StageBadge } from "../shared/SWLLogo";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, Legend,
} from "recharts";

type Page =
  | "login" | "dashboard" | "jobList" | "jobDetails" | "preSignOff"
  | "qcChecklist" | "customers" | "signedDocs" | "workerActivity"
  | "photoGallery" | "reports" | "notifications" | "inventory";

interface Props { onExit: () => void }

const JOBS = [
  { id: "JOB-2024-0847", reg: "ABC 123", client: "James Whitfield", service: "Full Detail + Ceramic Coating", stage: "Service in Progress", assigned: "M. Santos", created: "14 Nov", value: "R 8,450", flag: true },
  { id: "JOB-2024-0848", reg: "DEF 456", client: "Sarah Mitchell", service: "Full Vehicle PPF", stage: "Quality Control", assigned: "J. Nguyen", created: "13 Nov", value: "R 12,800", flag: true },
  { id: "JOB-2024-0849", reg: "GHI 789", client: "Marcus Johnson", service: "Paint Correction", stage: "Vehicle Arrived", assigned: "—", created: "14 Nov", value: "R 2,800", flag: false },
  { id: "JOB-2024-0850", reg: "JKL 321", client: "Priya Sharma", service: "Ceramic Coating", stage: "Service in Progress", assigned: "A. Patel", created: "12 Nov", value: "R 4,200", flag: true },
  { id: "JOB-2024-0851", reg: "MNO 654", client: "David Osei", service: "Engine Bay Detail", stage: "Intake Complete", assigned: "—", created: "14 Nov", value: "R 800", flag: false },
  { id: "JOB-2024-0852", reg: "PQR 987", client: "Thabo Dlamini", service: "Full Vehicle PPF", stage: "Booked", assigned: "—", created: "20 Nov", value: "R 12,800", flag: true },
  { id: "JOB-2024-0840", reg: "STU 258", client: "J. van der Berg", service: "Frontal PPF", stage: "Ready for Collection", assigned: "L. Chen", created: "08 Nov", value: "R 3,500", flag: false },
  { id: "JOB-2024-0835", reg: "VWX 741", client: "Connor Albertyn", service: "Paint Correction", stage: "Collected", assigned: "A. Patel", created: "04 Nov", value: "R 2,800", flag: false },
];

const CUSTOMERS = [
  { initials: "CA", color: "#8B5CF6", name: "Connor Albertyn", sub: "Centurion · C008", email: "connor.a@icloud.com", phone: "+27 83 788 9900", vehicle: "2021 Ford Ranger Raptor — VWX 741", jobs: 5, last: "04 Nov 2026", spend: "R 8,750", status: "Active" },
  { initials: "DO", color: "#10B981", name: "David Osei", sub: "Tshwane · C005", email: "david.osei@work.co.za", phone: "+27 79 111 2233", vehicle: "2019 Toyota HiLux — MNO 654", jobs: 1, last: "14 Nov 2026", spend: "R 800", status: "Active" },
  { initials: "JW", color: "#3B82F6", name: "James Whitfield", sub: "Pretoria · C001", email: "j.whitfield@gmail.com", phone: "+27 82 456 7890", vehicle: "2022 Mercedes-Benz C-Class — ABC 123", jobs: 3, last: "14 Nov 2026", spend: "R 21,400", status: "VIP" },
  { initials: "JV", color: "#F59E0B", name: "Jessica van der Berg", sub: "Sandton · C007", email: "jvdberg@gmail.com", phone: "+27 60 444 5566", vehicle: "2022 Lamborghini Urus — MNO 111", jobs: 1, last: "08 Nov 2026", spend: "R 24,800", status: "VIP" },
  { initials: "MJ", color: "#EF4444", name: "Marcus Johnson", sub: "Midrand · C003", email: "marcusj@outlook.com", phone: "+27 83 567 8901", vehicle: "2020 Audi RS3 — GHI 789", jobs: 2, last: "14 Nov 2026", spend: "R 5,600", status: "Active" },
  { initials: "NP", color: "#EC4899", name: "Nina Petrov", sub: "Pretoria · C009", email: "nina.petrov@email.com", phone: "+27 71 665 4433", vehicle: "2020 BMW X5 M — RST 001", jobs: 6, last: "28 Oct 2026", spend: "R 33,200", status: "VIP" },
  { initials: "PS", color: "#14B8A6", name: "Priya Sharma", sub: "Pretoria · C004", email: "priya.sharma@email.co.za", phone: "+27 64 321 9876", vehicle: "2021 Volkswagen Golf R — JKL 321", jobs: 4, last: "12 Nov 2026", spend: "R 14,800", status: "VIP" },
  { initials: "SM", color: "#6366F1", name: "Sarah Mitchell", sub: "Centurion · C002", email: "sarah.m@gmail.com", phone: "+27 71 234 5678", vehicle: "2023 BMW M4 Competition — DEF 456", jobs: 1, last: "13 Nov 2026", spend: "R 18,750", status: "Active" },
  { initials: "SK", color: "#84CC16", name: "Sipho Khumalo", sub: "Midrand · C010", email: "sipho.k@gmail.com", phone: "+27 64 223 4455", vehicle: "2018 Ford Mustang GT — UVW 123", jobs: 0, last: "—", spend: "R 0", status: "Inactive" },
  { initials: "TD", color: "#F97316", name: "Thabo Dlamini", sub: "Johannesburg · C006", email: "thabo.d@gmail.com", phone: "+27 82 999 0011", vehicle: "2021 Porsche 911 Carrera S — PQR 987", jobs: 2, last: "08 Nov 2026", spend: "R 27,600", status: "VIP" },
];

/* ─── Sidebar ──────────────────────────────────────────────────────────── */
const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" },
  { id: "jobList", label: "Job List", icon: "M4 6h16M4 10h16M4 14h16M4 18h16" },
  { id: "jobDetails", label: "Job Details", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
  { id: "preSignOff", label: "Pre-Sign-Off", icon: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" },
  { id: "qcChecklist", label: "QC Checklist", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" },
  { id: "customers", label: "Customers", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" },
  { id: "signedDocs", label: "Signed Docs", icon: "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" },
  { id: "workerActivity", label: "Worker Activity", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
  { id: "photoGallery", label: "Photo Gallery", icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" },
  { id: "reports", label: "Reports", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
  { id: "inventory", label: "Inventory", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" },
  { id: "notifications", label: "Notifications", icon: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" },
];

function Sidebar({ page, setPage, onExit }: { page: Page; setPage: (p: Page) => void; onExit: () => void }) {
  return (
    <aside className="w-48 bg-[#111827] text-white flex flex-col shrink-0">
      <div className="px-4 py-4 border-b border-white/10">
        <div className="flex items-center gap-2 mb-0.5">
          <SWLLogo size="sm" />
          <div>
            <div className="text-xs font-black tracking-widest">SWL DETAILED</div>
            <div className="text-xs text-gray-500">VWOMS V1.0</div>
          </div>
        </div>
      </div>
      <nav className="flex-1 py-3 overflow-y-auto scroll-hidden">
        {NAV_ITEMS.map(item => (
          <button
            key={item.id}
            onClick={() => setPage(item.id as Page)}
            className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-xs transition-all ${
              page === item.id
                ? "bg-white/10 text-white border-l-2 border-[#CC1F1F]"
                : "text-gray-400 hover:bg-white/5 hover:text-gray-200 border-l-2 border-transparent"
            }`}
          >
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
            </svg>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="px-4 py-3 border-t border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#CC1F1F] flex items-center justify-center text-xs font-bold">M</div>
          <div>
            <div className="text-xs font-semibold">Manager</div>
            <div className="text-xs text-gray-500">Full Admin Access</div>
          </div>
        </div>
        <button onClick={onExit} className="text-gray-600 hover:text-gray-300 text-xs transition-colors" title="Exit">✕</button>
      </div>
    </aside>
  );
}

/* ─── Pages ────────────────────────────────────────────────────────────── */

function Dashboard({ setPage }: { setPage: (p: Page) => void }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [stageFilter, setStageFilter] = useState<string | null>(null);

  const filtered = JOBS.filter(j => {
    const matchStage = stageFilter ? j.stage === stageFilter : true;
    const matchSearch = searchTerm
      ? [j.id, j.reg, j.client, j.service].some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
      : true;
    return matchStage && matchSearch;
  });

  const pipeline = [
    { label: "Booked", count: 3, cls: "pipeline-booked" },
    { label: "Vehicle Arrived", count: 2, cls: "pipeline-arrived" },
    { label: "Intake Complete", count: 4, cls: "pipeline-intake" },
    { label: "Service in Progress", count: 8, cls: "pipeline-inprogress" },
    { label: "Quality Control", count: 3, cls: "pipeline-qc" },
    { label: "Ready for Collection", count: 2, cls: "pipeline-ready" },
    { label: "Collected", count: 105, cls: "pipeline-collected" },
  ];

  return (
    <div className="flex-1 overflow-y-auto scroll-hidden bg-gray-50">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <div>
          <div className="text-xs text-gray-400 font-semibold">14 NOVEMBER 2026</div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-sm text-gray-400">Welcome back, Manager. Here&apos;s today&apos;s workshop overview.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-[#CC1F1F] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#b01a1a] transition-colors">+ New Job</button>
          <button className="border border-gray-200 text-gray-600 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors">Export Today</button>
        </div>
      </div>

      <div className="px-8 py-6 space-y-5">
        {/* Live Alerts */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
          <div className="flex items-center gap-2 mb-3">
            <h3 className="font-bold text-sm text-gray-700">LIVE ALERTS</h3>
            <span className="w-5 h-5 bg-[#CC1F1F] text-white rounded-full text-xs flex items-center justify-center font-bold">4</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              { dot: "#CC1F1F", text: "JOB-2024-0848 awaiting Pre-Sign-Off review before service begins", action: "Review Now →", onAction: () => setPage("preSignOff") },
              { dot: "#F59E0B", text: "3 vehicles in Quality Control pending checklist completion", action: "View QC →", onAction: () => setPage("qcChecklist") },
              { dot: "#F97316", text: "Battery reminder: ABC 123 on-site 2+ days — charge status unconfirmed", action: "Confirm →", onAction: () => {} },
              { dot: "#16A34A", text: "JOB-2024-0840 (STU 258) ready for collection — client not yet notified", action: "Notify →", onAction: () => setPage("notifications") },
            ].map((alert, i) => (
              <div key={i} className="flex items-start justify-between gap-3 py-2 border-b border-gray-100 last:border-0">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: alert.dot }} />
                  <span className="text-xs text-gray-600">{alert.text}</span>
                </div>
                <button onClick={alert.onAction} className="text-xs font-semibold text-[#CC1F1F] whitespace-nowrap hover:underline">{alert.action}</button>
              </div>
            ))}
          </div>
        </div>

        {/* KPI + Pipeline */}
        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-1 grid grid-cols-2 gap-3">
            {[
              { icon: "⚙️", count: 6, label: "Active Jobs", sub: "In workshop now" },
              { icon: "📋", count: 2, label: "Today's Intakes", sub: "New arrivals" },
              { icon: "🔍", count: 3, label: "Awaiting QC", sub: "Checklist pending" },
              { icon: "✅", count: 2, label: "Ready to Collect", sub: "Notify clients" },
            ].map(kpi => (
              <div key={kpi.label} className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
                <div className="text-2xl mb-1">{kpi.icon}</div>
                <div className="text-3xl font-bold text-gray-900">{kpi.count}</div>
                <div className="text-sm font-semibold text-gray-700">{kpi.label}</div>
                <div className="text-xs text-gray-400">{kpi.sub}</div>
              </div>
            ))}
          </div>
          <div className="col-span-2 bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <div className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-4">Job Lifecycle Pipeline</div>
            <div className="flex items-center gap-0">
              {pipeline.map((p, i) => (
                <div key={p.label} className="flex items-center flex-1">
                  <button
                    onClick={() => setStageFilter(stageFilter === p.label ? null : p.label)}
                    className={`flex flex-col items-center group flex-1 ${stageFilter === p.label ? "opacity-100" : "opacity-80 hover:opacity-100"}`}
                  >
                    <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-bold transition-all ${p.cls} ${stageFilter === p.label ? "bg-opacity-20" : ""}`}>
                      {p.count}
                    </div>
                    <div className={`text-xs mt-1 text-center leading-tight ${p.cls} font-medium`} style={{ fontSize: "9px" }}>
                      {p.label.replace("Service in Progress", "In Progress").replace("Ready for Collection", "Collection")}
                    </div>
                  </button>
                  {i < pipeline.length - 1 && <div className="w-full h-px bg-gray-200 shrink-0" style={{ maxWidth: "16px" }} />}
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-4">Click a stage to filter the jobs table below</p>
          </div>
        </div>

        {/* Jobs Table */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-800">All Jobs <span className="text-gray-400 font-normal">({filtered.length} jobs)</span></h3>
            <input
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-1.5 text-xs w-44 focus:outline-none focus:border-[#CC1F1F]"
            />
          </div>
          <table className="w-full text-xs">
            <thead><tr className="border-b border-gray-100 bg-gray-50">
              {["JOB ID", "REG", "CLIENT", "SERVICE", "STAGE", "ASSIGNED TO", "CREATED", "VALUE", "ACTIONS"].map(h => (
                <th key={h} className="px-4 py-2.5 text-left font-bold text-gray-400 tracking-widest uppercase">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {filtered.map(job => (
                <tr key={job.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-mono font-semibold text-gray-700">
                    {job.id} {job.flag && <span className="text-[#CC1F1F]">■</span>}
                  </td>
                  <td className="px-4 py-3 font-mono font-bold text-gray-800">{job.reg}</td>
                  <td className="px-4 py-3 font-semibold text-gray-800">{job.client}</td>
                  <td className="px-4 py-3 text-gray-600">{job.service}</td>
                  <td className="px-4 py-3"><StageBadge stage={job.stage} /></td>
                  <td className="px-4 py-3 text-gray-600">{job.assigned}</td>
                  <td className="px-4 py-3 text-gray-400">{job.created}</td>
                  <td className="px-4 py-3 font-semibold text-gray-800">{job.value}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => setPage("jobDetails")} className="text-[#CC1F1F] font-semibold hover:underline">View →</button>
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

function JobList({ setPage }: { setPage: (p: Page) => void }) {
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState("All");
  const stages = ["All", "Booked", "Vehicle Arrived", "Intake Complete", "Service in Progress", "Quality Control", "Ready for Collection", "Collected"];
  const filtered = JOBS.filter(j => {
    const s = stageFilter === "All" || j.stage === stageFilter;
    const m = !search || [j.id, j.reg, j.client].some(x => x.toLowerCase().includes(search.toLowerCase()));
    return s && m;
  });
  return (
    <div className="flex-1 overflow-y-auto scroll-hidden bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Vehicle / Job List</h1>
          <p className="text-sm text-gray-400">All vehicles and jobs in the system</p>
        </div>
        <button className="bg-[#CC1F1F] text-white px-5 py-2.5 rounded-xl text-sm font-bold">+ New Job</button>
      </div>
      <div className="px-8 py-5">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 flex-wrap">
            <input placeholder="Search by job ID, registration, or client..." value={search} onChange={e => setSearch(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm flex-1 min-w-48 focus:outline-none focus:border-[#CC1F1F]" />
            <select value={stageFilter} onChange={e => setStageFilter(e.target.value)} className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none">
              {stages.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <table className="w-full text-xs">
            <thead><tr className="border-b border-gray-100 bg-gray-50">
              {["JOB ID", "REG", "CLIENT", "SERVICE", "STAGE", "ASSIGNED TO", "CREATED", "VALUE", ""].map(h => (
                <th key={h} className="px-4 py-2.5 text-left font-bold text-gray-400 tracking-widest uppercase">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {filtered.map(job => (
                <tr key={job.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-mono font-semibold text-gray-700">{job.id}</td>
                  <td className="px-4 py-3 font-mono font-bold">{job.reg}</td>
                  <td className="px-4 py-3 font-semibold">{job.client}</td>
                  <td className="px-4 py-3 text-gray-600">{job.service}</td>
                  <td className="px-4 py-3"><StageBadge stage={job.stage} /></td>
                  <td className="px-4 py-3 text-gray-600">{job.assigned}</td>
                  <td className="px-4 py-3 text-gray-400">{job.created}</td>
                  <td className="px-4 py-3 font-semibold">{job.value}</td>
                  <td className="px-4 py-3"><button onClick={() => setPage("jobDetails")} className="text-[#CC1F1F] font-semibold hover:underline">View →</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function JobDetails({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div className="flex-1 overflow-y-auto scroll-hidden bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
            <button onClick={() => setPage("jobList")} className="hover:text-[#CC1F1F]">Jobs</button>
            <span>/</span>
            <span>JOB-2024-0847</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Job Details</h1>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setPage("preSignOff")} className="border border-[#CC1F1F] text-[#CC1F1F] px-4 py-2 rounded-xl text-sm font-semibold">Pre-Sign-Off</button>
          <button onClick={() => setPage("qcChecklist")} className="bg-[#CC1F1F] text-white px-4 py-2 rounded-xl text-sm font-bold">QC Checklist</button>
        </div>
      </div>
      <div className="px-8 py-6 grid grid-cols-3 gap-5">
        <div className="col-span-2 flex flex-col gap-5">
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold font-mono">JOB-2024-0847</h2>
                <div className="flex items-center gap-2 mt-1">
                  <StageBadge stage="Service in Progress" />
                  <span className="text-xs text-gray-400">Created 14 Nov 2026</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-400">JOB VALUE</div>
                <div className="text-2xl font-bold text-gray-900">R 8,450</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Client Details</h3>
                {[["Name", "James Whitfield"], ["Phone", "+27 82 456 7890"], ["Email", "j.whitfield@gmail.com"], ["Suburb", "Pretoria"]].map(([k, v]) => (
                  <div key={k} className="flex justify-between py-1.5 border-b border-gray-200 last:border-0">
                    <span className="text-xs text-gray-400">{k}</span>
                    <span className="text-xs font-semibold text-gray-800">{v}</span>
                  </div>
                ))}
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Vehicle</h3>
                {[["Registration", "ABC 123"], ["Make/Model", "2022 Mercedes-Benz C-Class"], ["Colour", "Obsidian Black"], ["Year", "2022"]].map(([k, v]) => (
                  <div key={k} className="flex justify-between py-1.5 border-b border-gray-200 last:border-0">
                    <span className="text-xs text-gray-400">{k}</span>
                    <span className="text-xs font-semibold text-gray-800">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <h3 className="font-bold mb-3">Services Requested</h3>
            <div className="grid grid-cols-2 gap-3">
              {[["Full Detail Package", "R 149"], ["Ceramic Coating", "R 1,299"]].map(([s, p]) => (
                <div key={s} className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#CC1F1F]" />
                    <span className="text-sm font-semibold">{s}</span>
                  </div>
                  <span className="text-sm font-bold">{p}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <h3 className="font-bold mb-3">Procedure Progress</h3>
            <div className="space-y-2">
              {[
                { name: "Exterior Wash & Decontamination", status: "Completed", time: "0h 48m" },
                { name: "Paint Correction", status: "Completed", time: "04h 25m" },
                { name: "Panel Wipe & IPA", status: "Completed", time: "0h 35m" },
                { name: "Ceramic Coating Application", status: "In Progress", time: "0h 42m" },
                { name: "Final QC Inspection", status: "Pending", time: "—" },
              ].map(p => (
                <div key={p.name} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${p.status === "Completed" ? "bg-green-500" : p.status === "In Progress" ? "bg-amber-500" : "bg-gray-300"}`} />
                    <span className="text-sm text-gray-700">{p.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-semibold ${p.status === "Completed" ? "text-green-600" : p.status === "In Progress" ? "text-amber-600" : "text-gray-400"}`}>{p.status}</span>
                    <span className="text-xs font-mono text-gray-400 w-12 text-right">{p.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <h3 className="font-bold mb-3">Assignment</h3>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">MS</div>
              <div>
                <div className="font-semibold text-sm">M. Santos</div>
                <div className="text-xs text-gray-400">SWL-DTL-002</div>
              </div>
            </div>
            <button className="w-full text-xs font-semibold text-gray-500 border border-gray-200 py-2 rounded-lg hover:bg-gray-50">Reassign Worker</button>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <h3 className="font-bold mb-3">Timeline</h3>
            {[["Booked", "31 Oct"], ["Check-In", "14 Nov 09:15"], ["Intake", "14 Nov 09:45"], ["Service Started", "14 Nov 10:30"]].map(([e, d]) => (
              <div key={e} className="flex items-start gap-3 pb-3 last:pb-0">
                <div className="w-2 h-2 rounded-full bg-[#CC1F1F] mt-1.5 shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-gray-700">{e}</div>
                  <div className="text-xs text-gray-400">{d}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <h3 className="font-bold mb-3">Documents</h3>
            {[["Signed Indemnity", "Signed 14 Nov"], ["Intake Form", "Complete"]].map(([d, s]) => (
              <div key={d} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <span className="text-xs text-gray-700">{d}</span>
                <span className="text-xs text-green-600 font-semibold">✓ {s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PreSignOff() {
  const [approved, setApproved] = useState(false);
  return (
    <div className="flex-1 overflow-y-auto scroll-hidden bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pre-Sign-Off Review</h1>
          <p className="text-sm text-gray-400">High-value job flagged for manager review before service begins</p>
        </div>
        <div className="flex gap-3">
          <button className="border border-gray-300 text-gray-600 px-4 py-2 rounded-xl text-sm font-semibold">Request Changes</button>
          <button onClick={() => setApproved(true)} className={`${approved ? "bg-green-600" : "bg-[#CC1F1F]"} text-white px-5 py-2 rounded-xl text-sm font-bold`}>
            {approved ? "✓ Approved" : "Approve & Sign Off"}
          </button>
        </div>
      </div>
      <div className="px-8 py-6 grid grid-cols-2 gap-5">
        <div className="flex flex-col gap-5">
          <div className={`rounded-2xl border p-5 shadow-sm ${approved ? "bg-green-50 border-green-200" : "bg-amber-50 border-amber-200"}`}>
            <div className="flex items-center gap-2 mb-2">
              <svg className={`w-5 h-5 ${approved ? "text-green-600" : "text-amber-600"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={approved ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" : "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"} /></svg>
              <span className={`text-sm font-bold ${approved ? "text-green-700" : "text-amber-700"}`}>{approved ? "Sign-Off Approved" : "Manager Review Required"}</span>
            </div>
            <p className={`text-xs ${approved ? "text-green-600" : "text-amber-600"}`}>
              {approved ? "This job has been approved. The detailer can proceed." : "This job exceeds the R 15,000 threshold and requires manager sign-off before work can begin."}
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <h3 className="font-bold mb-3">Job Summary</h3>
            {[["Job ID", "JOB-2024-0848"], ["Client", "Sarah Mitchell"], ["Vehicle", "2023 BMW M4 Competition"], ["Registration", "DEF 456"], ["Estimated Value", "R 18,750"], ["Services", "Full Vehicle PPF"]].map(([k, v]) => (
              <div key={k} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                <span className="text-xs text-gray-400">{k}</span>
                <span className={`text-xs font-semibold ${k === "Estimated Value" ? "text-[#CC1F1F] font-bold" : "text-gray-800"}`}>{v}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <h3 className="font-bold mb-3">Service Scope</h3>
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-3">
              <div className="text-sm font-bold text-gray-800">Full Vehicle PPF</div>
              <div className="text-xs text-gray-500 mt-1">Premium STEK DYNOshield — full body coverage, 10-year warranty</div>
              <div className="text-lg font-bold text-[#CC1F1F] mt-2">R 18,750</div>
            </div>
            <div className="text-xs text-gray-500">Assigned to: J. Nguyen · Estimated 2–3 days · Bay 6</div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <h3 className="font-bold mb-3">Manager Notes</h3>
            <textarea className="w-full border border-gray-200 rounded-xl p-3 text-sm text-gray-600 h-28 resize-none focus:outline-none focus:border-[#CC1F1F]" placeholder="Add notes for the detailer or record observations before sign-off..." />
          </div>
        </div>
      </div>
    </div>
  );
}

const QC_SECTIONS = [
  {
    name: "Paint Correction Verification",
    items: [
      { text: "Swirl marks removed — Stage 1 Compound", desc: "Inspect under LED light for residual haze or swirling.", result: "Pass" },
      { text: "Swirl marks removed — Stage 2 Polish", desc: "Verify 95%+ clarity improvement with paint depth gauge.", result: "Pass" },
      { text: "Panel surface IPA-wiped before coating", desc: "All panels must be decontaminated before ceramic application.", result: "Pass" },
      { text: "No buffer trails or holograms", desc: "Check all angles under natural and workshop lighting.", result: null },
    ]
  },
  {
    name: "PPF Installation Quality",
    items: [
      { text: "No bubbles under film (5+ mm)", desc: "Small micro-bubbles are acceptable and will dissipate within 30 days.", result: "Pass" },
      { text: "Edge adhesion — all panel edges sealed", desc: "Lift each edge with fingernail. No lifting permitted.", result: "Fail" },
      { text: "Film tension consistent — no lifting corners", desc: "Check A-pillars, hood edges, and mirror bases.", result: null },
      { text: "No contamination under film", desc: "Inspect for dust, fibres, or debris beneath PPF.", result: null },
    ]
  },
];

function QCChecklist() {
  const [results, setResults] = useState<Record<string, "Pass" | "Fail" | "N/A" | null>>({
    "Swirl marks removed — Stage 1 Compound": "Pass",
    "Swirl marks removed — Stage 2 Polish": "Pass",
    "Panel surface IPA-wiped before coating": "Pass",
    "No bubbles under film (5+ mm)": "Pass",
    "Edge adhesion — all panel edges sealed": "Fail",
  });

  const setResult = (item: string, val: "Pass" | "Fail" | "N/A") => {
    setResults(prev => ({ ...prev, [item]: val }));
  };

  const passes = Object.values(results).filter(r => r === "Pass").length;
  const fails = Object.values(results).filter(r => r === "Fail").length;
  const nas = Object.values(results).filter(r => r === "N/A").length;
  const pending = QC_SECTIONS.flatMap(s => s.items).length - passes - fails - nas;

  return (
    <div className="flex-1 overflow-y-auto scroll-hidden bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">Quality Control Checklist</h1>
            {fails > 0 && <span className="bg-red-100 text-[#CC1F1F] text-xs font-bold px-2.5 py-1 rounded-full">{fails} Fail</span>}
          </div>
          <p className="text-sm text-gray-400">Job: JOB-2024-0848 · 2023 BMW M4 Competition, DEF 456 · Assigned to: J. Nguyen</p>
        </div>
        <button className="bg-[#CC1F1F] text-white px-5 py-2.5 rounded-xl text-sm font-bold">Save QC Results</button>
      </div>
      <div className="px-8 py-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700">Checklist Progress</span>
            <div className="flex items-center gap-4 text-xs">
              <span className="font-bold text-green-600">{passes} <span className="font-normal text-gray-400">PASS</span></span>
              <span className="font-bold text-[#CC1F1F]">{fails} <span className="font-normal text-gray-400">FAIL</span></span>
              <span className="font-bold text-gray-400">{nas} <span className="font-normal text-gray-400">N/A</span></span>
              <span className="font-bold text-gray-400">{pending} <span className="font-normal text-gray-400">PENDING</span></span>
            </div>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-[#CC1F1F] rounded-full transition-all" style={{ width: `${((passes + fails + nas) / QC_SECTIONS.flatMap(s => s.items).length) * 100}%` }} />
          </div>
          <div className="text-xs text-gray-400 mt-1">{passes + fails + nas} / {QC_SECTIONS.flatMap(s => s.items).length} completed</div>
        </div>

        {QC_SECTIONS.map(section => {
          const sectionFails = section.items.filter(i => results[i.text] === "Fail").length;
          return (
            <div key={section.name} className="bg-white rounded-2xl border border-gray-200 mb-4 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className={`w-1 h-5 rounded ${sectionFails > 0 ? "bg-[#CC1F1F]" : "bg-green-500"}`} />
                  <h3 className="font-bold">{section.name}</h3>
                  {sectionFails > 0 && <span className="text-xs bg-red-100 text-[#CC1F1F] px-2 py-0.5 rounded-full font-semibold">{sectionFails} fail</span>}
                </div>
                <span className="text-xs text-gray-400">{section.items.filter(i => results[i.text] !== null).length}/{section.items.length}</span>
              </div>
              {section.items.map(item => {
                const r = results[item.text];
                const isPassed = r === "Pass";
                const isFailed = r === "Fail";
                return (
                  <div key={item.text} className={`flex items-start justify-between px-5 py-4 border-b border-gray-100 last:border-0 ${isFailed ? "bg-red-50" : isPassed ? "bg-green-50" : ""}`}>
                    <div className="flex-1 mr-4">
                      <div className={`text-sm font-semibold ${isFailed ? "text-gray-800" : isPassed ? "text-green-700" : "text-gray-800"}`}>{item.text}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{item.desc}</div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {(["Pass", "Fail", "N/A"] as const).map(val => (
                        <button
                          key={val}
                          onClick={() => setResult(item.text, val)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold border-2 transition-all ${
                            r === val
                              ? val === "Pass" ? "bg-green-600 border-green-600 text-white"
                                : val === "Fail" ? "bg-[#CC1F1F] border-[#CC1F1F] text-white"
                                : "bg-gray-500 border-gray-500 text-white"
                              : "border-gray-200 text-gray-400 hover:border-gray-300"
                          }`}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Customers() {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? CUSTOMERS : CUSTOMERS.filter(c => c.status === filter);
  return (
    <div className="flex-1 overflow-y-auto scroll-hidden bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customer List</h1>
          <p className="text-sm text-gray-400">{CUSTOMERS.length} registered customers · {CUSTOMERS.filter(c=>c.status==="VIP").length} VIP · {CUSTOMERS.filter(c=>c.status==="Active").length} Active</p>
        </div>
        <button className="bg-[#CC1F1F] text-white px-5 py-2.5 rounded-xl text-sm font-bold">+ Add Customer</button>
      </div>
      <div className="px-8 py-5">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="flex items-center gap-4 px-5 py-4 border-b border-gray-100">
            <input placeholder="Search name, email, vehicle, reg..." className="border border-gray-200 rounded-lg px-3 py-2 text-sm flex-1 focus:outline-none focus:border-[#CC1F1F]" />
            <div className="flex gap-2">
              {["All", "VIP", "Active", "Inactive"].map(f => (
                <button key={f} onClick={() => setFilter(f)} className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors ${filter === f ? "bg-[#CC1F1F] text-white" : "border border-gray-200 text-gray-500 hover:bg-gray-50"}`}>{f}</button>
              ))}
            </div>
          </div>
          <table className="w-full text-xs">
            <thead><tr className="border-b border-gray-100 bg-gray-50">
              {["CUSTOMER", "CONTACT", "VEHICLES", "JOBS", "LAST SERVICE", "TOTAL SPEND", "STATUS", ""].map(h => (
                <th key={h} className="px-4 py-2.5 text-left font-bold text-gray-400 tracking-widest uppercase">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.name} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: c.color }}>{c.initials}</div>
                      <div>
                        <div className="font-semibold text-gray-800">{c.name}</div>
                        <div className="text-gray-400">{c.sub}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3"><div className="text-blue-600">{c.email}</div><div className="text-gray-400">{c.phone}</div></td>
                  <td className="px-4 py-3 text-gray-600">{c.vehicle}</td>
                  <td className="px-4 py-3 font-semibold">{c.jobs}</td>
                  <td className="px-4 py-3 text-blue-500">{c.last}</td>
                  <td className="px-4 py-3 font-semibold">{c.spend}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${c.status === "VIP" ? "bg-red-100 text-[#CC1F1F]" : c.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-400"}`}>
                      {c.status === "VIP" ? "● VIP" : c.status === "Active" ? "● Active" : "● Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3"><button className="text-[#CC1F1F] font-semibold hover:underline">View →</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function SignedDocs() {
  return (
    <div className="flex-1 overflow-y-auto scroll-hidden bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-8 py-4">
        <h1 className="text-2xl font-bold text-gray-900">Signed Documents</h1>
        <p className="text-sm text-gray-400">Searchable repository of all signed intake forms and indemnities</p>
      </div>
      <div className="px-8 py-5">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
            <input placeholder="Search by client, vehicle registration, or job ID..." className="border border-gray-200 rounded-lg px-3 py-2 text-sm flex-1 focus:outline-none focus:border-[#CC1F1F]" />
            <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none"><option>All Document Types</option><option>Indemnity Forms</option><option>Intake Forms</option><option>Collection Sign-Off</option></select>
          </div>
          <table className="w-full text-xs">
            <thead><tr className="border-b border-gray-100 bg-gray-50">
              {["JOB ID", "CLIENT", "REG", "DOCUMENT TYPE", "SIGNED BY", "DATE", ""].map(h => (
                <th key={h} className="px-4 py-2.5 text-left font-bold text-gray-400 tracking-widest uppercase">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {[
                { job: "SWL-DMO905", client: "James Harrington", reg: "SWLVNOM", doc: "Indemnity Form", signed: "James Harrington", date: "31 Jul 2026 13:18" },
                { job: "JOB-2024-0848", client: "Sarah Mitchell", reg: "DEF 456", doc: "Intake Form", signed: "Sarah Mitchell", date: "13 Nov 2026 09:22" },
                { job: "SWL-KRT847", client: "J. van der Berg", reg: "123ABC", doc: "Collection Sign-Off", signed: "J. van der Berg", date: "31 Jul 2026 19:52" },
                { job: "JOB-2024-0835", client: "Connor Albertyn", reg: "VWX 741", doc: "Indemnity Form", signed: "Connor Albertyn", date: "04 Nov 2026 10:05" },
              ].map(d => (
                <tr key={d.job} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono font-semibold text-gray-700">{d.job}</td>
                  <td className="px-4 py-3 font-semibold">{d.client}</td>
                  <td className="px-4 py-3 font-mono">{d.reg}</td>
                  <td className="px-4 py-3"><span className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full font-semibold">{d.doc}</span></td>
                  <td className="px-4 py-3 text-gray-600">{d.signed}</td>
                  <td className="px-4 py-3 text-gray-400">{d.date}</td>
                  <td className="px-4 py-3"><button className="text-[#CC1F1F] font-semibold hover:underline">View PDF →</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function WorkerActivity() {
  const workerData = [
    { name: "M. Santos", id: "DTL-002", jobs: 3, active: true, time: "18h 42m", paint: 12, ceramic: 4, ppf: 2 },
    { name: "J. Nguyen", id: "DTL-003", jobs: 2, active: true, time: "14h 20m", paint: 6, ceramic: 3, ppf: 5 },
    { name: "A. Patel", id: "DTL-001", jobs: 2, active: false, time: "09h 55m", paint: 8, ceramic: 2, ppf: 0 },
    { name: "L. Chen", id: "DTL-005", jobs: 1, active: false, time: "06h 30m", paint: 4, ceramic: 1, ppf: 1 },
  ];
  return (
    <div className="flex-1 overflow-y-auto scroll-hidden bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-8 py-4">
        <h1 className="text-2xl font-bold text-gray-900">Worker Activity & Productivity</h1>
        <p className="text-sm text-gray-400">Today&apos;s detailer performance overview</p>
      </div>
      <div className="px-8 py-5 space-y-5">
        <div className="grid grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <h3 className="font-bold mb-4 text-sm">Service Breakdown — This Month</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={[
                { name: "Paint Correction", jobs: 30, color: "#CC1F1F" },
                { name: "Ceramic Coating", jobs: 18, color: "#9333EA" },
                { name: "Full PPF", jobs: 15, color: "#3B82F6" },
                { name: "Interior Detail", jobs: 24, color: "#F59E0B" },
                { name: "Engine Bay", jobs: 8, color: "#10B981" },
              ]}>
                <XAxis dataKey="name" tick={{ fontSize: 9 }} />
                <YAxis tick={{ fontSize: 9 }} />
                <Tooltip />
                <Bar dataKey="jobs" fill="#CC1F1F" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <h3 className="font-bold mb-3 text-sm">On-Shift Summary</h3>
            {[{ label: "Active Detailers", val: "2 / 4" }, { label: "Jobs in Progress", val: "5" }, { label: "Total Hours Logged Today", val: "49h 27m" }, { label: "Average Job Completion", val: "94.2%" }].map(s => (
              <div key={s.label} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <span className="text-sm text-gray-600">{s.label}</span>
                <span className="text-sm font-bold text-gray-900">{s.val}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h3 className="font-bold">Detailer Performance</h3>
          </div>
          <table className="w-full text-xs">
            <thead><tr className="border-b border-gray-100 bg-gray-50">
              {["DETAILER", "STATUS", "ACTIVE JOBS", "TIME LOGGED", "PAINT", "CERAMIC", "PPF", "EFFICIENCY"].map(h => (
                <th key={h} className="px-4 py-2.5 text-left font-bold text-gray-400 tracking-widest uppercase">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {workerData.map(w => (
                <tr key={w.name} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">{w.name.split(" ").map(n=>n[0]).join("")}</div>
                      <div><div className="font-semibold">{w.name}</div><div className="text-gray-400">{w.id}</div></div>
                    </div>
                  </td>
                  <td className="px-4 py-3"><span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${w.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-400"}`}>{w.active ? "● On-Shift" : "● Off-Shift"}</span></td>
                  <td className="px-4 py-3 font-semibold">{w.jobs}</td>
                  <td className="px-4 py-3 font-mono text-green-600">{w.time}</td>
                  <td className="px-4 py-3">{w.paint}</td>
                  <td className="px-4 py-3">{w.ceramic}</td>
                  <td className="px-4 py-3">{w.ppf}</td>
                  <td className="px-4 py-3"><span className="text-green-600 font-bold">↑ Improving</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function PhotoGallery() {
  const cats = ["All", "Intake Photos", "During Installation", "Completion / QC", "Damage Documentation"];
  const [active, setActive] = useState("All");
  const photos = [
    { cat: "Intake Photos", label: "Front Bumper — ABC 123", job: "JOB-2024-0847" },
    { cat: "During Installation", label: "PPF Application — DEF 456", job: "JOB-2024-0848" },
    { cat: "Completion / QC", label: "Ceramic Coat — ABC 123", job: "JOB-2024-0847" },
    { cat: "Damage Documentation", label: "Key Scratch — Rear Door", job: "JOB-2024-0848" },
    { cat: "Intake Photos", label: "Left Side — GHI 789", job: "JOB-2024-0849" },
    { cat: "During Installation", label: "Panel Wipe — JKL 321", job: "JOB-2024-0850" },
    { cat: "Completion / QC", label: "Final Inspection — DEF 456", job: "JOB-2024-0848" },
    { cat: "Intake Photos", label: "Engine Bay — MNO 654", job: "JOB-2024-0851" },
    { cat: "Damage Documentation", label: "Paint Chip — Boot", job: "JOB-2024-0849" },
    { cat: "During Installation", label: "PPF Hood — DEF 456", job: "JOB-2024-0848" },
    { cat: "Completion / QC", label: "Shine Test — JKL 321", job: "JOB-2024-0850" },
    { cat: "Intake Photos", label: "Right Rear — PQR 987", job: "JOB-2024-0852" },
  ];
  const shown = active === "All" ? photos : photos.filter(p => p.cat === active);
  const colors = ["#1e293b", "#2d3748", "#374151", "#1f2937", "#111827", "#0f172a"];
  return (
    <div className="flex-1 overflow-y-auto scroll-hidden bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-8 py-4">
        <h1 className="text-2xl font-bold text-gray-900">Photo Gallery</h1>
        <p className="text-sm text-gray-400">Intake, progress, and completion photos by vehicle</p>
      </div>
      <div className="px-8 py-5">
        <div className="flex gap-2 mb-5 flex-wrap">
          {cats.map(c => (
            <button key={c} onClick={() => setActive(c)} className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${active === c ? "bg-[#CC1F1F] text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"}`}>{c}</button>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-4">
          {shown.map((p, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <div className="h-36 flex items-center justify-center" style={{ background: colors[i % colors.length] }}>
                <svg className="w-8 h-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <div className="p-3">
                <div className="text-xs font-semibold text-gray-800">{p.label}</div>
                <div className="text-xs text-gray-400 mt-0.5">{p.job}</div>
                <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full mt-1 inline-block">{p.cat}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const revenueData = [
  { month: "Jan", revenue: 42000, jobs: 85 }, { month: "Feb", revenue: 55000, jobs: 95 },
  { month: "Mar", revenue: 48000, jobs: 88 }, { month: "Apr", revenue: 61000, jobs: 105 },
  { month: "May", revenue: 58000, jobs: 100 }, { month: "Jun", revenue: 67000, jobs: 112 },
  { month: "Jul", revenue: 78000, jobs: 138 },
];
const qcData = [
  { month: "Apr", pass: 35, fail: 3 }, { month: "May", pass: 42, fail: 2 },
  { month: "Jun", pass: 48, fail: 1 }, { month: "Jul", pass: 58, fail: 2 },
];
const serviceDistrib = [
  { name: "Paint Correction", value: 40, color: "#CC1F1F" },
  { name: "Ceramic Coating", value: 25, color: "#111827" },
  { name: "Full Vehicle PPF", value: 20, color: "#6B7280" },
  { name: "Frontal PPF", value: 15, color: "#D1D5DB" },
];

function Reports() {
  return (
    <div className="flex-1 overflow-y-auto scroll-hidden bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-8 py-4">
        <h1 className="text-2xl font-bold text-gray-900">System Operations & Analytics Reporting</h1>
        <p className="text-sm text-gray-400">Export comprehensive business intelligence reports and audit summaries.</p>
      </div>
      <div className="px-8 py-5 space-y-5">
        <div className="bg-white rounded-2xl border border-gray-200 p-4 flex items-center gap-4 shadow-sm">
          <div className="flex items-center gap-2">
            <label className="text-xs text-gray-400">FROM</label>
            <input type="date" defaultValue="2026-11-01" className="border border-gray-200 rounded-lg px-2 py-1.5 text-sm" />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs text-gray-400">TO</label>
            <input type="date" defaultValue="2026-11-30" className="border border-gray-200 rounded-lg px-2 py-1.5 text-sm" />
          </div>
          <select className="border border-gray-200 rounded-lg px-2 py-1.5 text-sm"><option>All Services</option><option>Paint Correction</option><option>Ceramic Coating</option><option>Full Vehicle PPF</option></select>
          <select className="border border-gray-200 rounded-lg px-2 py-1.5 text-sm"><option>All Workers</option><option>M. Santos</option><option>J. Nguyen</option></select>
          <button className="bg-[#CC1F1F] text-white px-5 py-2 rounded-xl text-sm font-bold">Generate Report</button>
          <button className="border border-gray-200 text-gray-600 px-4 py-2 rounded-xl text-sm font-semibold">Export CSV</button>
          <button className="border border-gray-200 text-gray-600 px-4 py-2 rounded-xl text-sm font-semibold">Export PDF</button>
        </div>

        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-2 bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <div className="text-xs text-gray-400 uppercase tracking-widest mb-1">Revenue & Job Volume</div>
            <h3 className="font-bold mb-4">Jan – Jul 2026</h3>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={revenueData}>
                <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                <YAxis yAxisId="left" tick={{ fontSize: 10 }} tickFormatter={v => `R${v/1000}k`} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10 }} />
                <Tooltip formatter={(v, n) => n === "revenue" ? `R ${Number(v).toLocaleString()}` : v} />
                <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#CC1F1F" strokeWidth={2} dot={{ r: 4 }} name="revenue" />
                <Line yAxisId="right" type="monotone" dataKey="jobs" stroke="#6B7280" strokeWidth={1.5} strokeDasharray="5 5" dot={{ r: 3 }} name="jobs" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <div className="text-xs text-gray-400 uppercase tracking-widest mb-1">Jobs by Service Category</div>
            <h3 className="font-bold mb-4">Nov 2026 Distribution</h3>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={serviceDistrib} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" paddingAngle={2}>
                  {serviceDistrib.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            {serviceDistrib.map(s => (
              <div key={s.name} className="flex items-center justify-between text-xs py-0.5">
                <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-sm" style={{ background: s.color }} /><span>{s.name}</span></div>
                <span className="font-bold">{s.value}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-2 bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <div className="text-xs text-gray-400 uppercase tracking-widest mb-1">Quality Control Rate</div>
            <h3 className="font-bold mb-4">First-Pass vs Return Rate (last 4 months)</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={qcData} barSize={24}>
                <XAxis dataKey="month" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="pass" name="First-Pass" fill="#16A34A" radius={[4,4,0,0]} />
                <Bar dataKey="fail" name="QC Return" fill="#CC1F1F" radius={[4,4,0,0]} />
                <Legend wrapperStyle={{ fontSize: 10 }} />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex gap-8 mt-2">
              <div><div className="text-lg font-bold text-green-600">94.2%</div><div className="text-xs text-gray-400">Avg Pass Rate</div></div>
              <div><div className="text-lg font-bold text-gray-800">3 jobs</div><div className="text-xs text-gray-400">Returns (Nov)</div></div>
              <div><div className="text-lg font-bold text-green-600">↑ Improving</div><div className="text-xs text-gray-400">Trend</div></div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <h3 className="font-bold mb-4">Downloadable Reports</h3>
            {[
              ["Monthly Product Wastage Report", "November 2026 · 1.2 MB"],
              ["Worker Labor Hours Summary", "October 2026 · 856 KB"],
              ["PPF Warranty Audit Log", "Q3 2026 · 2.4 MB"],
              ["Customer Satisfaction Summary", "Q3 2026 · 944 KB"],
              ["Job Revenue Breakdown", "November 2026 · 1.8 MB"],
            ].map(([name, sub]) => (
              <div key={name} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <div>
                  <div className="text-sm font-semibold text-gray-800">{name}</div>
                  <div className="text-xs text-gray-400">{sub}</div>
                </div>
                <button className="bg-[#CC1F1F] text-white text-xs font-bold px-3 py-1.5 rounded-lg">↓ PDF</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Notifications() {
  const [emailOn, setEmailOn] = useState(true);
  const [smsOn, setSmsOn] = useState(true);
  const [whatsappOn, setWhatsappOn] = useState(false);
  return (
    <div className="flex-1 overflow-y-auto scroll-hidden bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-8 py-4">
        <h1 className="text-2xl font-bold text-gray-900">Notification Template Settings</h1>
        <p className="text-sm text-gray-400">Configure automated client notification templates</p>
      </div>
      <div className="px-8 py-6 grid grid-cols-2 gap-5">
        <div>
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm mb-4">
            <h3 className="font-bold mb-4">Delivery Channels</h3>
            {[["Email", emailOn, setEmailOn], ["SMS", smsOn, setSmsOn], ["WhatsApp", whatsappOn, setWhatsappOn]].map(([label, val, setter]) => (
              <div key={label as string} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                <span className="text-sm font-semibold text-gray-700">{label as string}</span>
                <button
                  onClick={() => (setter as (v: boolean) => void)(!(val as boolean))}
                  className={`w-12 h-6 rounded-full transition-colors relative ${val ? "bg-[#CC1F1F]" : "bg-gray-200"}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${val ? "left-6" : "left-0.5"}`} />
                </button>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <h3 className="font-bold mb-4">Active Templates</h3>
            {[
              { name: "Ready for Collection Alert", trigger: "Job status → Ready for Collection", active: true },
              { name: "Intake Confirmation", trigger: "Intake form submitted", active: true },
              { name: "7-Day PPF Check-Up Reminder", trigger: "7 days after PPF job completion", active: true },
              { name: "Battery Check Required", trigger: "Vehicle on-site 2+ days", active: false },
              { name: "Booking Confirmation", trigger: "New booking created", active: true },
            ].map(t => (
              <div key={t.name} className="flex items-start justify-between py-3 border-b border-gray-100 last:border-0">
                <div>
                  <div className="text-sm font-semibold text-gray-800">{t.name}</div>
                  <div className="text-xs text-gray-400">{t.trigger}</div>
                </div>
                <span className={`text-xs font-semibold ${t.active ? "text-green-600" : "text-gray-400"}`}>{t.active ? "● Active" : "○ Inactive"}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <h3 className="font-bold mb-2">Template Editor</h3>
          <p className="text-xs text-gray-400 mb-4">Editing: Ready for Collection Alert</p>
          <div className="mb-4">
            <label className="text-xs text-gray-400 font-semibold uppercase tracking-widest block mb-1.5">Subject Line</label>
            <input defaultValue="Your vehicle is ready for collection — SWL Detailed" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#CC1F1F]" />
          </div>
          <div className="mb-4">
            <label className="text-xs text-gray-400 font-semibold uppercase tracking-widest block mb-1.5">Message Body</label>
            <textarea defaultValue={`Hi {{client_name}},\n\nGreat news! Your {{vehicle_make}} {{vehicle_model}} ({{registration}}) has been completed and is ready for collection.\n\nJob ID: {{job_id}}\nServices completed: {{services}}\nTotal amount: {{job_value}}\n\nPlease collect your vehicle at your earliest convenience. Our team is available Monday–Saturday, 07:30–17:30.\n\nThank you for choosing SWL Detailed.\n\nKind regards,\nThe SWL Detailed Team`} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm h-52 resize-none focus:outline-none focus:border-[#CC1F1F] font-mono" />
          </div>
          <div className="flex gap-3">
            <button className="flex-1 bg-[#CC1F1F] text-white py-2.5 rounded-xl text-sm font-bold hover:bg-[#b01a1a]">Save Template</button>
            <button className="border border-gray-200 text-gray-600 px-4 py-2.5 rounded-xl text-sm font-semibold">Send Test</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Inventory() {
  return (
    <div className="flex-1 overflow-y-auto scroll-hidden bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-8 py-4">
        <h1 className="text-2xl font-bold text-gray-900">Product Inventory</h1>
        <p className="text-sm text-gray-400">Stock levels and product usage tracking</p>
      </div>
      <div className="px-8 py-5">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-xs">
            <thead><tr className="border-b border-gray-100 bg-gray-50">
              {["PRODUCT", "CATEGORY", "IN STOCK", "UNIT", "LOW STOCK THRESHOLD", "STATUS"].map(h => (
                <th key={h} className="px-4 py-2.5 text-left font-bold text-gray-400 tracking-widest uppercase">{h}</th>
              ))}
            </tr></thead>
            <tbody>
              {[
                { name: "INNOVACAR Prewash Concentrate", cat: "Chemicals", stock: 12, unit: "500ml", low: 5, ok: true },
                { name: "INNOVACAR Foam Shampoo", cat: "Chemicals", stock: 3, unit: "500ml", low: 5, ok: false },
                { name: "INNOVACAR Iron Remover", cat: "Chemicals", stock: 8, unit: "500ml", low: 4, ok: true },
                { name: "STEK DYNOshield PPF", cat: "PPF Film", stock: 45, unit: "metres", low: 20, ok: true },
                { name: "IGL Kenzo Ceramic Coating", cat: "Ceramic", stock: 2, unit: "30ml", low: 4, ok: false },
                { name: "Meguiar's M205 Ultra Finishing", cat: "Polish", stock: 6, unit: "1L", low: 3, ok: true },
              ].map(p => (
                <tr key={p.name} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 font-semibold text-gray-800">{p.name}</td>
                  <td className="px-4 py-3"><span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-semibold">{p.cat}</span></td>
                  <td className="px-4 py-3 font-mono font-bold">{p.stock}</td>
                  <td className="px-4 py-3 text-gray-500">{p.unit}</td>
                  <td className="px-4 py-3 text-gray-400">{p.low}</td>
                  <td className="px-4 py-3"><span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${p.ok ? "bg-green-100 text-green-700" : "bg-red-100 text-[#CC1F1F]"}`}>{p.ok ? "● In Stock" : "⚠ Low Stock"}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ─── Login ────────────────────────────────────────────────────────────── */
function Login({ onLogin }: { onLogin: () => void }) {
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);
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
        <p className="text-gray-400 text-sm mt-1">Sign in to access the management dashboard.</p>
      </div>
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl">
        <div className="mb-5">
          <label className="text-xs font-bold tracking-widest text-gray-400 uppercase block mb-1.5">Email Address</label>
          <input placeholder="manager@swldetailed.co.za" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#CC1F1F] transition-colors" />
        </div>
        <div className="mb-5">
          <label className="text-xs font-bold tracking-widest text-gray-400 uppercase block mb-1.5">Password</label>
          <div className="relative">
            <input type={showPw ? "text" : "password"} value={pw} onChange={e => setPw(e.target.value)} placeholder="••••••••" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#CC1F1F] pr-10 transition-colors" />
            <button onClick={() => setShowPw(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between mb-6">
          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
            <input type="checkbox" className="rounded" /> Remember me
          </label>
          <button className="text-sm text-[#CC1F1F] font-semibold hover:underline">Forgot password?</button>
        </div>
        <button onClick={onLogin} className="w-full bg-[#CC1F1F] text-white py-3.5 rounded-xl font-bold hover:bg-[#b01a1a] transition-colors mb-6">
          Sign In to Manager Portal
        </button>
        <div className="border-t border-gray-100 pt-4">
          <div className="text-xs text-gray-400 text-center mb-3 uppercase tracking-widest">Role Access</div>
          <div className="flex gap-3">
            <button onClick={onLogin} className="flex-1 flex items-center justify-center gap-2 border border-gray-200 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-50">
              <div className="w-2 h-2 rounded-full bg-green-500" />Manager / Admin
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 border border-gray-200 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-50">
              <div className="w-2 h-2 rounded-full bg-green-500" />Reception / Admin
            </button>
          </div>
        </div>
      </div>
      <p className="text-xs text-gray-600 mt-6">VWOMS v1.0 · SWL Detailed (Pty) Ltd · Unit 26, Scientia Technopark, Pretoria</p>
    </div>
  );
}

/* ─── Main ManagerPortal ────────────────────────────────────────────────── */
export default function ManagerPortal({ onExit }: Props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [page, setPage] = useState<Page>("dashboard");

  if (!loggedIn) return <Login onLogin={() => setLoggedIn(true)} />;

  const renderPage = () => {
    switch (page) {
      case "dashboard": return <Dashboard setPage={setPage} />;
      case "jobList": return <JobList setPage={setPage} />;
      case "jobDetails": return <JobDetails setPage={setPage} />;
      case "preSignOff": return <PreSignOff />;
      case "qcChecklist": return <QCChecklist />;
      case "customers": return <Customers />;
      case "signedDocs": return <SignedDocs />;
      case "workerActivity": return <WorkerActivity />;
      case "photoGallery": return <PhotoGallery />;
      case "reports": return <Reports />;
      case "notifications": return <Notifications />;
      case "inventory": return <Inventory />;
      default: return <Dashboard setPage={setPage} />;
    }
  };

  return (
    <div className="flex h-full">
      <Sidebar page={page} setPage={setPage} onExit={onExit} />
      {renderPage()}
    </div>
  );
}
