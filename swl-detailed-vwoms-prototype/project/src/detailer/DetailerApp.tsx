import { useState, useRef, useEffect } from "react";
import { SWLLogo, StageBadge } from "../shared/SWLLogo";

interface Props { onExit: () => void }

type Screen =
  | "login" | "jobs" | "jobDetail" | "procedures" | "timer"
  | "products" | "photos" | "procComplete" | "allDone"
  | "notifications" | "profile";

type BottomTab = "jobs" | "procedures" | "timer" | "products" | "photos";

const JOBS_DATA = [
  {
    id: "JOB-1042", reg: "CA 123-456", client: "Thabo Dlamini", vehicle: "BMW M4 Competition",
    stage: "Quality Control", time: "18h 42m", days: 3, priority: "Urgent", flag: "qc-return",
    services: ["Full Vehicle PPF", "Ceramic Coating"],
  },
  {
    id: "JOB-1045", reg: "ND 742-118", client: "Michael Adams", vehicle: "Audi RS3",
    stage: "Service in Progress", time: "6h 15m", days: 2, priority: "Normal", flag: "",
    services: ["Paint Correction", "Ceramic Coating"],
  },
  {
    id: "JOB-1038", reg: "GP 458-921", client: "Unknown", vehicle: "Mercedes-Benz GLC",
    stage: "Intake Complete", time: "—", days: 3, priority: "Normal", flag: "",
    services: ["Interior Detail"],
  },
];

const PROCEDURES = [
  { id: 1, name: "Wash & Pre-Rinse", status: "Completed", time: "0h 48m" },
  { id: 2, name: "Decontamination", status: "Completed", time: "0h 12m" },
  { id: 3, name: "Paint Correction", status: "Completed", time: "04h 25m" },
  { id: 4, name: "Panel Wipe & IPA", status: "Completed", time: "0h 35m" },
  { id: 5, name: "PPF Installation", status: "Completed", time: "09h 13m" },
  { id: 6, name: "Ceramic Coating", status: "Completed", time: "0h 15m" },
  { id: 7, name: "Final Inspection & QC", status: "In Progress", time: "0h 17m" },
];

/* ─── Mobile Frame ─────────────────────────────────────────────────────── */
function MobileFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-full bg-white overflow-hidden" style={{ maxWidth: "390px", margin: "0 auto" }}>
      {children}
    </div>
  );
}

function TopBar({ title, sub, onBack, notifCount = 3 }: { title: string; sub?: string; onBack?: () => void; notifCount?: number }) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white shrink-0">
      <div className="flex items-center gap-2.5">
        {onBack ? (
          <button onClick={onBack} className="text-gray-600 hover:text-gray-900">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </button>
        ) : (
          <SWLLogo size="sm" />
        )}
        <div>
          <div className="text-base font-bold text-gray-900">{title}</div>
          {sub && <div className="text-xs text-gray-400">{sub}</div>}
        </div>
      </div>
      <div className="relative">
        <button className="text-gray-500">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
        </button>
        {notifCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#CC1F1F] text-white text-xs rounded-full flex items-center justify-center font-bold">{notifCount}</span>
        )}
      </div>
    </div>
  );
}

function BottomNav({ active, setActive, onNavAction }: { active: BottomTab; setActive: (t: BottomTab) => void; onNavAction: (t: BottomTab) => void }) {
  const tabs: { id: BottomTab; label: string; icon: string }[] = [
    { id: "jobs", label: "My Jobs", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
    { id: "procedures", label: "Procedures", icon: "M4 6h16M4 10h16M4 14h16M4 18h16" },
    { id: "timer", label: "Start Timer", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
    { id: "products", label: "Products", icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" },
    { id: "photos", label: "Photos", icon: "M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" },
  ];
  return (
    <div className="flex items-center justify-around px-2 py-2 border-t border-gray-100 bg-white shrink-0">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => { setActive(tab.id); onNavAction(tab.id); }}
          className={`flex flex-col items-center gap-0.5 flex-1 ${active === tab.id ? "text-[#CC1F1F]" : "text-gray-400"}`}
        >
          {tab.id === "timer" ? (
            <div className={`w-12 h-12 rounded-full flex items-center justify-center -mt-6 shadow-lg ${active === "timer" ? "bg-[#CC1F1F]" : "bg-[#1a1a1a]"}`}>
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d={tab.icon} /></svg>
            </div>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={active === tab.id ? 2.5 : 1.5}><path strokeLinecap="round" strokeLinejoin="round" d={tab.icon} /></svg>
          )}
          <span className="text-xs font-medium leading-none">{tab.label}</span>
        </button>
      ))}
    </div>
  );
}

/* ─── Login (PIN) ────────────────────────────────────────────────────────── */
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [pin, setPin] = useState("");
  const addDigit = (d: string) => { if (pin.length < 4) setPin(p => p + d); };
  const del = () => setPin(p => p.slice(0, -1));

  useEffect(() => {
    if (pin.length === 4) { setTimeout(() => onLogin(), 300); }
  }, [pin, onLogin]);

  return (
    <div className="flex flex-col items-center justify-between h-full bg-[#1a1a1a] px-6 py-10">
      <div className="flex items-center gap-3 mt-6">
        <SWLLogo size="md" />
        <div className="text-white">
          <div className="font-black tracking-widest text-sm">SWL DETAILED</div>
          <div className="text-xs text-gray-500">WORKER APP</div>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center mb-3">
          <div className="w-14 h-14 rounded-full bg-[#CC1F1F] flex items-center justify-center text-white text-xl font-bold">KN</div>
        </div>
        <div className="text-white font-bold text-lg">Kabelo Ndlovu</div>
        <div className="text-gray-400 text-sm">SWL-DTL-004</div>

        <div className="flex gap-4 mt-8 mb-2">
          {[0,1,2,3].map(i => (
            <div key={i} className={`w-4 h-4 rounded-full border-2 transition-all ${i < pin.length ? "bg-[#CC1F1F] border-[#CC1F1F]" : "border-gray-600"}`} />
          ))}
        </div>
        <div className="text-gray-500 text-xs mb-8">Enter your 4-digit PIN</div>

        <div className="grid grid-cols-3 gap-4">
          {["1","2","3","4","5","6","7","8","9","","0","⌫"].map((d, i) => (
            <button
              key={i}
              onClick={() => d === "⌫" ? del() : d !== "" ? addDigit(d) : null}
              className={`w-16 h-16 rounded-2xl text-xl font-semibold transition-all flex items-center justify-center ${d === "" ? "invisible" : "bg-gray-800 text-white hover:bg-gray-700 active:scale-95"}`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      <div className="text-gray-600 text-xs">Not you? <button className="text-[#CC1F1F]">Switch profile</button></div>
    </div>
  );
}

/* ─── Assigned Jobs List ──────────────────────────────────────────────── */
function JobsScreen({ onSelectJob }: { onSelectJob: () => void }) {
  return (
    <div className="flex flex-col h-full">
      <TopBar title="My Assigned Jobs" sub="View and manage jobs assigned to you." />
      <div className="flex-1 overflow-y-auto scroll-hidden">
        {/* KPI row */}
        <div className="grid grid-cols-2 gap-3 p-4">
          {[
            { icon: "📋", count: 4, label: "Assigned Jobs", sub: "Total jobs assigned", color: "text-blue-600" },
            { icon: "▶", count: 2, label: "In Progress", sub: "Currently working", color: "text-green-600" },
            { icon: "⏸", count: 1, label: "On Hold", sub: "Paused jobs", color: "text-amber-600" },
            { icon: "✓", count: 1, label: "Completed Today", sub: "Great work!", color: "text-purple-600" },
          ].map(k => (
            <div key={k.label} className="bg-white border border-gray-100 rounded-2xl p-3 shadow-sm">
              <div className={`text-lg ${k.color}`}>{k.icon}</div>
              <div className="text-2xl font-bold text-gray-900">{k.count}</div>
              <div className="text-sm font-semibold text-gray-700">{k.label}</div>
              <div className="text-xs text-gray-400">{k.sub}</div>
            </div>
          ))}
        </div>

        {/* Search + Filter */}
        <div className="px-4 pb-3">
          <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-3 py-2.5 mb-3">
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <input className="bg-transparent text-sm text-gray-600 flex-1 focus:outline-none" placeholder="Search by job ref, registration or customer" />
          </div>
          <div className="flex gap-2 text-xs">
            <select className="border border-gray-200 rounded-lg px-2 py-1.5 text-gray-600 flex-1"><option>All Statuses</option></select>
            <select className="border border-gray-200 rounded-lg px-2 py-1.5 text-gray-600 flex-1"><option>All Stages</option></select>
            <button className="border border-gray-200 rounded-lg px-3 py-1.5 text-gray-600 flex items-center gap-1">≡ Sort</button>
          </div>
        </div>

        {/* Job cards */}
        <div className="px-4 space-y-3 pb-4">
          {JOBS_DATA.map((job, idx) => (
            <button key={job.id} onClick={onSelectJob} className={`w-full text-left bg-white rounded-2xl border-2 overflow-hidden shadow-sm hover:shadow-md transition-all ${job.flag === "qc-return" ? "border-[#CC1F1F]" : "border-gray-100"}`}>
              <div className="flex items-start gap-0">
                <div className="w-24 h-24 bg-gray-200 flex items-center justify-center text-xs text-gray-400 shrink-0 overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs font-medium">{job.vehicle.split(" ").slice(-1)[0]}</div>
                </div>
                <div className="flex-1 p-3">
                  <div className="flex items-start justify-between mb-1">
                    <span className="text-xs font-bold text-[#CC1F1F]">{job.id}</span>
                    <StageBadge stage={job.stage} />
                  </div>
                  <div className="font-bold text-gray-900 text-sm">{job.vehicle}</div>
                  <div className="text-xs text-gray-500 font-mono mb-1">{job.reg}</div>
                  <div className="flex items-center gap-1 text-xs text-gray-400 mb-1">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    {job.client}
                  </div>
                  {job.services.map(s => <div key={s} className="text-xs text-gray-400">• {s}</div>)}
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="text-xs text-gray-400">⏱ {job.time} logged</span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-gray-400">📅 On-site: {job.days} days</span>
                      {job.priority === "Urgent" && <span className="bg-[#CC1F1F] text-white text-xs px-2 py-0.5 rounded-full font-bold">Urgent</span>}
                    </div>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Job Detail ──────────────────────────────────────────────────────── */
function JobDetailScreen({ onViewProcedures, onBack }: { onViewProcedures: () => void; onBack: () => void }) {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100 shrink-0">
        <button onClick={onBack} className="text-gray-600"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg></button>
        <span className="font-bold">Job Details</span>
        <div className="relative"><button className="text-gray-500"><svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg></button><span className="absolute -top-1 -right-1 w-4 h-4 bg-[#CC1F1F] text-white text-xs rounded-full flex items-center justify-center font-bold">3</span></div>
      </div>
      <div className="flex-1 overflow-y-auto scroll-hidden">
        <div className="h-40 bg-gray-300 relative flex items-center justify-center">
          <div className="text-gray-500 text-sm">Vehicle Photo</div>
        </div>
        <div className="px-4 py-4">
          <div className="flex items-start justify-between mb-1">
            <span className="text-sm font-bold text-[#CC1F1F]">JOB-1045</span>
            <StageBadge stage="Service in Progress" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Audi RS3</h2>
          <span className="inline-block bg-gray-100 text-gray-600 text-xs font-mono px-3 py-1 rounded-full mt-1">ND 742-118</span>
          <div className="mt-4 space-y-2">
            {[["Customer", "Michael Adams"], ["On-Site", "3 days"], ["Arrival", "28 Jul 2026"], ["Est. Completion", "31 Jul 2026"]].map(([k, v]) => (
              <div key={k} className="flex items-center justify-between py-1.5 border-b border-gray-100 last:border-0">
                <span className="text-sm text-gray-400">{k}</span>
                <span className="text-sm font-semibold text-gray-800">{v}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 bg-white rounded-2xl border border-gray-100 p-4">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Services Requested</div>
            {["Paint Correction", "Ceramic Coating"].map(s => (
              <div key={s} className="flex items-center gap-2 py-1"><div className="w-2 h-2 rounded-full bg-[#CC1F1F]" /><span className="text-sm font-semibold text-[#CC1F1F]">{s}</span></div>
            ))}
          </div>
          <div className="mt-4 bg-white rounded-2xl border border-gray-100 p-4">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Job Progress</div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
              <div className="h-full bg-[#CC1F1F] rounded-full" style={{ width: "85.7%" }} />
            </div>
            <div className="text-xs text-gray-400">6 procedures completed · 1 in progress <span className="font-bold text-gray-600">6/7</span></div>
          </div>
        </div>
      </div>
      <div className="px-4 py-4 bg-white border-t border-gray-100 shrink-0">
        <button onClick={onViewProcedures} className="w-full bg-[#CC1F1F] text-white py-4 rounded-2xl font-bold text-base hover:bg-[#b01a1a] transition-colors">
          View Procedures →
        </button>
      </div>
    </div>
  );
}

/* ─── Procedures ──────────────────────────────────────────────────────── */
function ProceduresScreen({ onTimerNav, onBack }: { onTimerNav: () => void; onBack: () => void }) {
  const [checkItems, setCheckItems] = useState({ a: true, b: true, c: true, d: false });
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <TopBar title="Procedures" sub="Track your procedure progress." onBack={onBack} />
      <div className="flex-1 overflow-y-auto scroll-hidden px-4 py-4 space-y-4">
        {/* Active job summary */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center text-xs text-gray-500">GLC</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs font-bold text-[#CC1F1F]">JOB-1038</span>
                <StageBadge stage="Intake Complete" />
              </div>
              <div className="font-bold text-gray-900 text-sm">Mercedes-Benz GLC</div>
              <div className="text-xs font-mono text-gray-400">GP 458-921</div>
            </div>
            <button onClick={onBack} className="text-xs text-[#CC1F1F] border border-[#CC1F1F] px-3 py-1.5 rounded-lg font-semibold">View Job Details</button>
          </div>
          <div className="text-xs text-gray-400 mb-1">On-Site: 3 days</div>
          <div className="grid grid-cols-4 gap-2 mt-3">
            {[["18h 42m", "Total Logged Time", "of estimated 20h 00m", "text-[#CC1F1F]"], ["6 / 7", "Procedures Completed", "All procedures complete", "text-green-600"], ["9", "Products Logged", "View in Products", "text-blue-500"], ["14", "Photos Taken", "View in Photos", "text-purple-500"]].map(([v, l, s, c]) => (
              <div key={l} className="text-center">
                <div className={`text-sm font-bold ${c}`}>{v}</div>
                <div className="text-xs text-gray-600 font-medium leading-tight">{l}</div>
                <div className="text-xs text-gray-400">{s}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4">
          <h3 className="font-bold mb-3">Job Progress</h3>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 relative shrink-0">
              <svg viewBox="0 0 36 36" className="w-16 h-16 -rotate-90">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f3f4f6" strokeWidth="4" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#CC1F1F" strokeWidth="4" strokeDasharray="86, 100" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-sm font-bold text-gray-900">86%</div>
                <div className="text-xs text-gray-400 leading-tight text-center">Procedures</div>
              </div>
            </div>
            <div className="flex-1 space-y-2">
              {[{ label: "Completed", count: 6, color: "#CC1F1F" }, { label: "In Progress", count: 1, color: "#F59E0B" }, { label: "Not Started", count: 0, color: "#E5E7EB" }].map(s => (
                <div key={s.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{ background: s.color }} /><span className="text-sm text-gray-600">{s.label}</span></div>
                  <span className="text-sm font-bold text-gray-800">{s.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Current procedure */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-bold">Current Procedure</h3>
            <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-semibold">In Progress</span>
          </div>
          <div className="text-base font-bold text-gray-900 mb-2">Final Inspection & QC</div>
          <div className="grid grid-cols-3 gap-2 text-xs mb-3">
            <div><div className="text-gray-400">Elapsed Time</div><div className="font-mono font-bold text-[#CC1F1F]">01h 17m</div></div>
            <div><div className="text-gray-400">Started</div><div className="font-semibold">31 Jul 2026<br />10:00 AM</div></div>
            <div><div className="text-gray-400">Started By</div><div className="font-semibold">Kabelo Ndlovu</div></div>
          </div>
          <button onClick={onTimerNav} className="w-full border border-[#CC1F1F] text-[#CC1F1F] py-2.5 rounded-xl text-sm font-bold">View Procedure Details</button>
        </div>

        {/* Checklist */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4">
          <h3 className="font-bold mb-3">Procedure Checklist</h3>
          {[
            { key: "a", text: "Panel alignment checked" },
            { key: "b", text: "Edges sealed correctly" },
            { key: "c", text: "Surface finish inspected" },
            { key: "d", text: "Customer briefing completed" },
          ].map(item => (
            <button key={item.key} onClick={() => setCheckItems(p => ({ ...p, [item.key]: !p[item.key as keyof typeof p] }))} className="w-full flex items-center gap-3 py-2.5 border-b border-gray-100 last:border-0">
              <div className={`w-5 h-5 rounded flex items-center justify-center ${checkItems[item.key as keyof typeof checkItems] ? "bg-green-500" : "border-2 border-gray-300"}`}>
                {checkItems[item.key as keyof typeof checkItems] && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
              </div>
              <span className={`text-sm ${checkItems[item.key as keyof typeof checkItems] ? "text-green-700 line-through" : "text-gray-700"}`}>{item.text}</span>
            </button>
          ))}
        </div>

        {/* Full procedure list */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold">Procedure Checklist</h3>
            <button className="text-xs text-[#CC1F1F] font-semibold">Collapse All</button>
          </div>
          <div className="text-xs text-gray-400 mb-2 grid grid-cols-3">
            <span>#</span><span>Procedure</span><div className="grid grid-cols-2"><span>Status</span><span>Elapsed</span></div>
          </div>
          {PROCEDURES.map(p => (
            <div key={p.id} className={`flex items-center py-2 border-b border-gray-100 last:border-0 text-sm ${p.status === "In Progress" ? "text-[#CC1F1F]" : ""}`}>
              <span className="w-6 text-gray-400">{p.id}</span>
              <span className="flex-1 font-medium">{p.name}</span>
              <span className={`w-24 text-xs font-semibold ${p.status === "Completed" ? "text-green-600 bg-green-50 px-2 py-0.5 rounded-full" : "text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full"}`}>{p.status}</span>
              <span className="w-14 text-right font-mono text-xs text-gray-500">{p.time}</span>
            </div>
          ))}
          <div className="grid grid-cols-2 gap-3 mt-3">
            <button className="border border-gray-200 py-2.5 rounded-xl text-sm font-semibold text-gray-600">Add Note</button>
            <button className="border border-gray-200 py-2.5 rounded-xl text-sm font-semibold text-gray-600">Report Issue</button>
            <button className="border border-gray-200 py-2.5 rounded-xl text-sm font-semibold text-gray-600">View Job Photos</button>
            <button className="border border-gray-200 py-2.5 rounded-xl text-sm font-semibold text-gray-600">Log Product Usage</button>
          </div>
          <div className="mt-3 flex items-start gap-2 bg-blue-50 rounded-xl p-3">
            <svg className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <p className="text-xs text-blue-600">Tip: Make sure all procedures are started and stopped accurately to ensure correct time tracking.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Timer ────────────────────────────────────────────────────────────── */
function TimerScreen({ onProcComplete }: { onProcComplete: () => void }) {
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(interval);
  }, [running]);

  const fmt = (s: number) => {
    const h = Math.floor(s / 3600).toString().padStart(2, "0");
    const m = Math.floor((s % 3600) / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${h}:${m}:${sec}`;
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <TopBar title="Timers" sub="Track your work time across procedures and jobs." />
      <div className="flex-1 overflow-y-auto scroll-hidden px-4 py-4 space-y-4">
        {/* Active timer */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Active Timer</div>
          <div className="text-xs font-bold text-[#CC1F1F] mb-0.5">JOB-1042 · PPF Installation</div>
          <div className="font-mono text-4xl font-bold text-gray-900 text-center py-4">{fmt(seconds + 5820)}</div>
          <button
            onClick={() => { setRunning(r => !r); }}
            className={`w-full py-4 rounded-2xl font-bold text-base mb-2 transition-all ${running ? "bg-gray-200 text-gray-700" : "bg-[#CC1F1F] text-white hover:bg-[#b01a1a]"}`}
          >
            {running ? "⏸ Stop Timer" : "▶ Start Timer"}
          </button>
          <button onClick={onProcComplete} className="w-full border border-gray-200 py-3 rounded-2xl text-sm font-semibold text-gray-600">
            ✓ Mark Procedure Complete
          </button>
        </div>

        {/* Recent timers */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold">Recent Timers</h3>
            <button className="text-xs text-[#CC1F1F] font-semibold">View All History</button>
          </div>
          <div className="text-xs text-gray-400 mb-1 grid grid-cols-3"><span>Job Ref</span><span>Procedure</span><span className="text-right">Duration</span></div>
          {[
            ["JOB-1042", "PPF Installation", "0h 40m"],
            ["JOB-1045", "Paint Correction", "02h 30m"],
            ["JOB-1038", "Interior Detail", "02h 00m"],
            ["JOB-1032", "Exterior Wash & Detail", "02h 15m"],
            ["JOB-1042", "Ceramic Coating", "01h 45m"],
          ].map(([ref, proc, dur]) => (
            <div key={ref + proc} className="flex items-center py-2 border-b border-gray-100 last:border-0 text-xs">
              <span className="flex-1 text-[#CC1F1F] font-semibold">{ref}</span>
              <span className="flex-1 text-gray-600">{proc}</span>
              <span className="text-green-600 font-mono font-bold">{dur}</span>
            </div>
          ))}
        </div>

        {/* Time summary */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4">
          <h3 className="font-bold mb-3">Time Summary</h3>
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 relative shrink-0">
              <svg viewBox="0 0 36 36" className="w-20 h-20 -rotate-90">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831" fill="none" stroke="#f3f4f6" strokeWidth="3" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831" fill="none" stroke="#CC1F1F" strokeWidth="3" strokeDasharray="60, 100" />
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831" fill="none" stroke="#3B82F6" strokeWidth="3" strokeDasharray="25, 100" strokeDashoffset="-60" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-sm font-bold">5h 42m</div>
                <div className="text-xs text-gray-400">Today</div>
              </div>
            </div>
            <div className="flex-1 space-y-2 text-sm">
              <div className="flex items-center justify-between"><div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#CC1F1F]" /><span>JOB-1042</span></div><span className="font-bold">3h 22m</span></div>
              <div className="flex items-center justify-between"><div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-[#3B82F6]" /><span>JOB-1045</span></div><span className="font-bold">2h 20m</span></div>
              <div className="flex items-center justify-between"><div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-gray-300" /><span>Other Jobs</span></div><span className="font-bold">0h 00m</span></div>
              <div className="text-xs text-gray-400">Total Logged Time Today</div>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-white rounded-2xl border border-gray-100 p-4">
          <h3 className="font-bold mb-3">Timer Tips</h3>
          {[
            { dot: "#16A34A", t: "Start the timer", s: "Begin timing when you start a procedure." },
            { dot: "#CC1F1F", t: "Stop the timer", s: "Stop timing as soon as the procedure is complete." },
            { dot: "#CC1F1F", t: "Be accurate", s: "Accurate timing helps improve workflow and planning." },
            { dot: "#3B82F6", t: "Review your time", s: "Check your time logs regularly to track progress." },
          ].map(tip => (
            <div key={tip.t} className="flex items-start gap-3 py-2 border-b border-gray-100 last:border-0">
              <div className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0" style={{ background: tip.dot }} />
              <div>
                <div className="text-sm font-semibold">{tip.t}</div>
                <div className="text-xs text-gray-400">{tip.s}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Products ────────────────────────────────────────────────────────── */
function ProductsScreen() {
  const [items, setItems] = useState([
    { name: "INNOVACAR Prewash Concentrate", qty: 250, unit: "ml" },
    { name: "INNOVACAR Foam Shampoo", qty: 300, unit: "ml" },
    { name: "INNOVACAR Iron Remover", qty: 200, unit: "ml" },
  ]);
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <TopBar title="Product Usage" sub="Log products used on current job." />
      <div className="flex-1 overflow-y-auto scroll-hidden px-4 py-4 space-y-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-4">
          <div className="text-xs font-bold text-[#CC1F1F] mb-1">JOB-1042 · PPF Installation</div>
          <div className="text-base font-bold text-gray-900">Products Used This Session</div>
        </div>
        {items.map((item, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center justify-between">
            <div>
              <div className="font-semibold text-sm text-gray-800">{item.name}</div>
              <div className="text-xs text-gray-400 mt-0.5">Quantity logged</div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setItems(prev => prev.map((p, pi) => pi === i ? {...p, qty: Math.max(0, p.qty - 50)} : p))} className="w-8 h-8 rounded-lg bg-gray-100 text-gray-600 font-bold flex items-center justify-center">−</button>
              <span className="font-mono font-bold text-gray-900 w-16 text-center">{item.qty} {item.unit}</span>
              <button onClick={() => setItems(prev => prev.map((p, pi) => pi === i ? {...p, qty: p.qty + 50} : p))} className="w-8 h-8 rounded-lg bg-gray-100 text-gray-600 font-bold flex items-center justify-center">+</button>
            </div>
          </div>
        ))}
        <button className="w-full border-2 border-dashed border-gray-300 text-gray-400 py-4 rounded-2xl text-sm font-semibold hover:border-[#CC1F1F] hover:text-[#CC1F1F] transition-colors">
          + Add Product
        </button>
        <button className="w-full bg-[#CC1F1F] text-white py-4 rounded-2xl font-bold text-base">Save Product Log</button>
      </div>
    </div>
  );
}

/* ─── Photos ──────────────────────────────────────────────────────────── */
function PhotosScreen() {
  const cats = ["Intake", "During Installation", "Completion", "Damage"];
  const [active, setActive] = useState("During Installation");
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <TopBar title="Photo Capture" sub="Capture and upload job photos." />
      <div className="flex-1 overflow-y-auto scroll-hidden px-4 py-4 space-y-4">
        <div className="flex gap-2 overflow-x-auto">
          {cats.map(c => (
            <button key={c} onClick={() => setActive(c)} className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${active === c ? "bg-[#CC1F1F] text-white" : "bg-white border border-gray-200 text-gray-500"}`}>{c}</button>
          ))}
        </div>
        <button className="w-full bg-[#CC1F1F] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          Take Photo
        </button>
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-square bg-gray-200 rounded-xl flex items-center justify-center text-gray-400">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Procedure Complete ──────────────────────────────────────────────── */
function ProcCompleteScreen({ onBack, onAllDone }: { onBack: () => void; onAllDone: () => void }) {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="flex items-center px-4 py-3 bg-white border-b border-gray-100 shrink-0">
        <button onClick={onBack} className="text-gray-600 mr-3"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg></button>
        <span className="font-bold">Procedure Completed</span>
      </div>
      <div className="flex-1 overflow-y-auto scroll-hidden px-4 py-8 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center mb-5">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Procedure Completed!</h2>
        <p className="text-gray-500 text-center text-sm mb-8">Paint Correction – Stage 1 (Decontamination)<br />has been marked as done.</p>
        <div className="w-full space-y-3">
          <div className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-3">
            <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <div>
              <div className="text-xs text-gray-400">Time Recorded</div>
              <div className="font-mono font-bold text-lg">01:45:32</div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-4">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
              <span className="font-semibold">Products Logged</span>
            </div>
            <div className="flex justify-between text-sm"><span className="text-gray-600">Iron X</span><span className="font-semibold">150 ml</span></div>
            <div className="flex justify-between text-sm mt-1"><span className="text-gray-600">CarPro Reset</span><span className="font-semibold">100 ml</span></div>
          </div>
        </div>
        <div className="w-full space-y-3 mt-6">
          <button onClick={onBack} className="w-full bg-[#CC1F1F] text-white py-4 rounded-2xl font-bold">Back to Procedure List</button>
          <button onClick={onAllDone} className="w-full border-2 border-[#CC1F1F] text-[#CC1F1F] py-4 rounded-2xl font-bold flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            View Job Details
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── All Done ──────────────────────────────────────────────────────────── */
function AllDoneScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="flex items-center px-4 py-3 bg-white border-b border-gray-100 shrink-0">
        <button onClick={onBack} className="text-gray-600 mr-3"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg></button>
        <span className="font-bold">All Procedures Done</span>
      </div>
      <div className="flex-1 overflow-y-auto scroll-hidden px-4 py-8 flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-5">
          <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">All Procedures Complete!</h2>
        <p className="text-gray-500 text-center text-sm mb-6">
          All 7 procedures for JOB-1038 have been marked as done.<br />
          This job is now moving to Quality Control.
        </p>
        <div className="w-full bg-[#1a5c30] text-white rounded-2xl p-4 mb-6">
          <div className="text-xs text-green-200 mb-1">Job Status Updated</div>
          <div className="font-bold">Service in Progress → Quality Control</div>
          <div className="text-sm text-green-200 mt-1">The manager has been notified to begin QC inspection.</div>
        </div>
        <div className="w-full bg-white rounded-2xl border border-gray-100 p-4 mb-6">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Summary</div>
          {[["Job ID", "JOB-1038"], ["Vehicle", "Mercedes-Benz GLC"], ["Registration", "GP 458-921"], ["Total Time", "18h 42m"], ["Procedures", "7 / 7 completed"]].map(([k, v]) => (
            <div key={k} className="flex justify-between py-1.5 border-b border-gray-100 last:border-0 text-sm">
              <span className="text-gray-400">{k}</span>
              <span className="font-semibold">{v}</span>
            </div>
          ))}
        </div>
        <div className="w-full space-y-3">
          <button onClick={onBack} className="w-full bg-[#CC1F1F] text-white py-4 rounded-2xl font-bold">Go to Job Details</button>
          <button onClick={onBack} className="w-full border border-gray-200 text-gray-600 py-4 rounded-2xl font-semibold">Back to My Jobs</button>
        </div>
      </div>
    </div>
  );
}

/* ─── Notifications ─────────────────────────────────────────────────────── */
function NotificationsScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <TopBar title="Notifications" sub="Your recent alerts and messages." onBack={onBack} />
      <div className="flex-1 overflow-y-auto scroll-hidden px-4 py-4 space-y-3">
        {[
          { time: "Just now", title: "QC Return — JOB-1042", body: "Manager returned Job JOB-1042 to you. Check QC notes in Job Details.", type: "urgent" },
          { time: "2 hrs ago", title: "New Job Assigned", body: "JOB-1038 (Mercedes-Benz GLC, GP 458-921) has been assigned to you.", type: "info" },
          { time: "Yesterday", title: "Job Complete — JOB-1035", body: "Job JOB-1035 has been marked as collected by the client.", type: "success" },
          { time: "2 days ago", title: "Battery Reminder", body: "BMW M4 Competition (CA 123-456) has been on-site for 2+ days. Battery check required.", type: "warning" },
        ].map((n, i) => (
          <div key={i} className={`bg-white rounded-2xl border p-4 ${n.type === "urgent" ? "border-[#CC1F1F]" : n.type === "warning" ? "border-amber-200" : "border-gray-100"}`}>
            <div className="flex items-start justify-between mb-1">
              <span className="text-sm font-bold text-gray-900">{n.title}</span>
              <span className="text-xs text-gray-400">{n.time}</span>
            </div>
            <p className="text-xs text-gray-500">{n.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Profile ─────────────────────────────────────────────────────────── */
function ProfileScreen({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-100 shrink-0">
        <div className="flex items-center gap-2"><SWLLogo size="sm" /><div><div className="font-bold text-sm">My Profile</div><div className="text-xs text-gray-400">View and manage your profile and work information.</div></div></div>
        <div className="flex items-center gap-2">
          <div className="relative"><button className="text-gray-400"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg></button><span className="absolute -top-1 -right-1 w-3 h-3 bg-[#CC1F1F] rounded-full text-white text-xs flex items-center justify-center">3</span></div>
          <div className="w-8 h-8 rounded-full bg-[#1a1a1a] flex items-center justify-center text-white text-xs font-bold">KN</div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto scroll-hidden px-4 py-4 space-y-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold">Profile Information</h3>
            <button className="text-xs text-gray-500 border border-gray-200 px-3 py-1.5 rounded-lg flex items-center gap-1">✏ Edit Profile</button>
          </div>
          <div className="flex items-start gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-[#1a1a1a] flex items-center justify-center text-white text-xl font-bold relative">
              KN
              <div className="absolute bottom-0 right-0 w-5 h-5 bg-[#CC1F1F] rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /></svg>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-2 gap-2">
              {[["Full Name", "Kabelo Ndlovu"], ["Employee ID", "SWL-DTL-004"], ["Phone", "+27 71 123 4567"], ["Email", "kabelo.ndlovu@swldetailed.co.za"], ["Role", "Detailer / Technician"], ["Date Joined", "15 March 2026"]].map(([k, v]) => (
                <div key={k}>
                  <div className="text-xs text-gray-400">{k}</div>
                  <div className="text-xs font-semibold border border-gray-200 rounded px-2 py-1 mt-0.5">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-4">
          <h3 className="font-bold mb-3">Time Summary (This Week)</h3>
          <div className="flex items-center gap-2 bg-red-50 rounded-xl p-3 mb-3">
            <svg className="w-6 h-6 text-[#CC1F1F]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <div><div className="text-xs text-gray-500">Total Time Logged</div><div className="text-2xl font-bold">23h 18m</div></div>
          </div>
          {[["Procedures Time", "21h 05m"], ["Break Time", "1h 25m"], ["Overtime", "50m"]].map(([k, v]) => (
            <div key={k} className="flex justify-between py-2 border-b border-gray-100 last:border-0 text-sm">
              <span className="text-gray-500">{k}</span><span className="font-bold">{v}</span>
            </div>
          ))}
          <button className="text-[#CC1F1F] text-xs font-semibold mt-2 flex items-center gap-1">View Full Timesheet →</button>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-4">
          <h3 className="font-bold mb-3">Performance Overview (This Month)</h3>
          {[["Job Completed", "18", "text-green-600"], ["Average Job Rating", "4.8 / 5", "text-amber-500"], ["On-Time Completions", "94%", "text-green-600"], ["Quality Score", "96%", "text-green-600"]].map(([k, v, c]) => (
            <div key={k} className="flex justify-between py-2 border-b border-gray-100 last:border-0 text-sm">
              <span className="text-gray-500">{k}</span><span className={`font-bold ${c}`}>{v}</span>
            </div>
          ))}
        </div>

        <button onClick={onBack} className="w-full border border-gray-200 text-gray-500 py-3 rounded-2xl text-sm font-semibold">← Back to Jobs</button>
      </div>
    </div>
  );
}

/* ─── Main DetailerApp ─────────────────────────────────────────────────── */
export default function DetailerApp({ onExit }: Props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [screen, setScreen] = useState<Screen>("jobs");
  const [activeTab, setActiveTab] = useState<BottomTab>("jobs");

  const handleNavAction = (tab: BottomTab) => {
    const screenMap: Record<BottomTab, Screen> = {
      jobs: "jobs", procedures: "procedures", timer: "timer", products: "products", photos: "photos"
    };
    setScreen(screenMap[tab]);
  };

  if (!loggedIn) {
    return (
      <div className="flex flex-col h-full bg-gray-100">
        <div className="flex justify-end p-2">
          <button onClick={onExit} className="text-xs text-gray-400 hover:text-gray-600">[Exit Demo]</button>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-sm h-full" style={{ maxHeight: "844px" }}>
            <MobileFrame>
              <LoginScreen onLogin={() => setLoggedIn(true)} />
            </MobileFrame>
          </div>
        </div>
      </div>
    );
  }

  const renderScreen = () => {
    switch (screen) {
      case "jobs": return <JobsScreen onSelectJob={() => setScreen("jobDetail")} />;
      case "jobDetail": return <JobDetailScreen onViewProcedures={() => { setScreen("procedures"); setActiveTab("procedures"); }} onBack={() => setScreen("jobs")} />;
      case "procedures": return <ProceduresScreen onTimerNav={() => { setScreen("timer"); setActiveTab("timer"); }} onBack={() => setScreen("jobs")} />;
      case "timer": return <TimerScreen onProcComplete={() => setScreen("procComplete")} />;
      case "products": return <ProductsScreen />;
      case "photos": return <PhotosScreen />;
      case "procComplete": return <ProcCompleteScreen onBack={() => { setScreen("procedures"); setActiveTab("procedures"); }} onAllDone={() => setScreen("allDone")} />;
      case "allDone": return <AllDoneScreen onBack={() => { setScreen("jobs"); setActiveTab("jobs"); }} />;
      case "notifications": return <NotificationsScreen onBack={() => { setScreen("jobs"); setActiveTab("jobs"); }} />;
      case "profile": return <ProfileScreen onBack={() => { setScreen("jobs"); setActiveTab("jobs"); }} />;
      default: return <JobsScreen onSelectJob={() => setScreen("jobDetail")} />;
    }
  };

  const showBottomNav = !["procComplete", "allDone", "notifications", "profile", "jobDetail"].includes(screen);

  return (
    <div className="flex flex-col h-full bg-gray-100">
      <div className="flex justify-between px-3 py-1.5 shrink-0">
        <button onClick={onExit} className="text-xs text-gray-400 hover:text-gray-600">[Exit Demo]</button>
        <div className="flex gap-2">
          <button onClick={() => setScreen("notifications")} className="text-xs text-gray-400 hover:text-gray-600">Notifications</button>
          <button onClick={() => setScreen("profile")} className="text-xs text-gray-400 hover:text-gray-600">Profile</button>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center overflow-hidden py-1">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200" style={{ width: "390px", height: "calc(100% - 8px)", maxHeight: "844px" }}>
          <MobileFrame>
            <div className="flex-1 overflow-hidden flex flex-col">
              {renderScreen()}
            </div>
            {showBottomNav && (
              <BottomNav active={activeTab} setActive={setActiveTab} onNavAction={handleNavAction} />
            )}
          </MobileFrame>
        </div>
      </div>
    </div>
  );
}
