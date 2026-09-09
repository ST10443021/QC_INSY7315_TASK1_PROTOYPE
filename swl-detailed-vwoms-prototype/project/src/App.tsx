import { useState } from "react";
import ClientKiosk from "./client/ClientKiosk";
import ManagerPortal from "./manager/ManagerPortal";
import DetailerApp from "./detailer/DetailerApp";
import ReceptionPortal from "./reception/ReceptionPortal";
import { SWLLogo } from "./shared/SWLLogo";

type Role = "client" | "manager" | "detailer" | "reception" | null;

const ROLES = [
  {
    id: "client",
    title: "Client Kiosk",
    subtitle: "Tablet / iPad",
    description: "Vehicle intake wizard, service selection, digital sign-off, and collection confirmation.",
    icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z",
    device: "Tablet",
    bg: "from-slate-900 to-slate-800",
    accent: "#CC1F1F",
    screens: 10,
  },
  {
    id: "manager",
    title: "Manager Portal",
    subtitle: "Desktop",
    description: "Full dashboard, job lifecycle management, QC checklists, reports, and notification templates.",
    icon: "M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2",
    device: "Desktop",
    bg: "from-gray-900 to-gray-800",
    accent: "#6366F1",
    screens: 13,
  },
  {
    id: "detailer",
    title: "Detailer App",
    subtitle: "Mobile",
    description: "PIN login, job list, procedure checklist, live timers, product tracking, and photos.",
    icon: "M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z",
    device: "Mobile",
    bg: "from-zinc-900 to-zinc-800",
    accent: "#22C55E",
    screens: 11,
  },
  {
    id: "reception",
    title: "Reception Portal",
    subtitle: "Desktop",
    description: "Bookings, vehicle check-in, job assignment, invoicing, battery reminders, and PPF scheduling.",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
    device: "Desktop",
    bg: "from-blue-950 to-blue-900",
    accent: "#3B82F6",
    screens: 9,
  },
];

export default function App() {
  const [activeRole, setActiveRole] = useState<Role>(null);

  if (activeRole === "client") return <ClientKiosk onExit={() => setActiveRole(null)} />;
  if (activeRole === "manager") return <ManagerPortal onExit={() => setActiveRole(null)} />;
  if (activeRole === "detailer") return <DetailerApp onExit={() => setActiveRole(null)} />;
  if (activeRole === "reception") return <ReceptionPortal onExit={() => setActiveRole(null)} />;

  return (
    <div className="min-h-screen bg-[#0a0d14] flex flex-col">
      <header className="px-8 py-6 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-3">
          <SWLLogo size="md" />
          <div>
            <div className="text-white font-black tracking-widest text-sm">SWL DETAILED</div>
            <div className="text-gray-500 text-xs tracking-widest">VWOMS — VEHICLE WORKFLOW &amp; OPERATIONS MGMT</div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span>System Operational</span>
          <span className="ml-3 text-gray-600">v1.0.0 · INSY7315 Task 1</span>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-3">Select Your Role</h1>
          <p className="text-gray-400 text-lg max-w-xl">
            Choose the portal that matches your role in the SWL Detailed operations workflow.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-5 max-w-3xl w-full">
          {ROLES.map(role => (
            <button
              key={role.id}
              onClick={() => setActiveRole(role.id as Role)}
              className="group text-left relative overflow-hidden rounded-3xl border border-white/10 hover:border-white/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
            >
              <div className={`bg-gradient-to-br ${role.bg} p-7 h-full`}>
                <div className="flex items-start justify-between mb-5">
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center" style={{ background: role.accent + "22" }}>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: role.accent }} strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={role.icon} />
                    </svg>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400 border border-white/10 px-2.5 py-1 rounded-full">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    {role.device}
                  </div>
                </div>
                <div className="mb-1">
                  <h2 className="text-white font-bold text-xl leading-tight">{role.title}</h2>
                  <p className="text-gray-500 text-xs font-semibold uppercase tracking-widest">{role.subtitle}</p>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mt-2 mb-5">{role.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{role.screens} screens</span>
                  <div className="flex items-center gap-1.5 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: role.accent }}>
                    Enter Portal
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-10 text-center text-xs text-gray-600">
          <p>Quantum Coders · University of Pretoria · INSY7315 Task 1 Prototype</p>
        </div>
      </main>
    </div>
  );
}
