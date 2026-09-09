import { useState, useRef, useEffect } from "react";
import { SWLLogo } from "../shared/SWLLogo";

type Screen =
  | "welcome"
  | "customer"
  | "vehicle"
  | "condition"
  | "services"
  | "terms"
  | "signature"
  | "confirmation"
  | "collection"
  | "collected";

interface ClientKioskProps {
  onExit: () => void;
}

const STEPS = ["Customer", "Vehicle", "Condition", "Services", "Agreement", "Signature"];

function KioskHeader({ step, total }: { step?: number; total?: number }) {
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100">
      <div className="flex items-center gap-2">
        <SWLLogo size="sm" />
        <span className="font-semibold text-gray-800 text-sm">SWL Detailed</span>
      </div>
      {step !== undefined && (
        <span className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
          Step {step} of {total}
        </span>
      )}
      <div className="flex items-center gap-1.5">
        <div className="w-2 h-2 rounded-full bg-green-400" />
        <span className="text-xs text-gray-500">Kiosk Active</span>
      </div>
    </header>
  );
}

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-0 py-6">
      {STEPS.map((label, i) => {
        const num = i + 1;
        const done = num < current;
        const active = num === current;
        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
                  done
                    ? "bg-[#CC1F1F] border-[#CC1F1F] text-white"
                    : active
                    ? "bg-[#CC1F1F] border-[#CC1F1F] text-white"
                    : "bg-white border-gray-300 text-gray-400"
                }`}
              >
                {done ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  num
                )}
              </div>
              <span className={`text-xs font-medium ${active ? "text-[#CC1F1F]" : "text-gray-400"}`}>{label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`w-16 h-0.5 mb-4 ${done ? "bg-[#CC1F1F]" : "bg-gray-200"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function NavButtons({
  onBack,
  onNext,
  nextLabel = "Save & Continue",
  nextEnabled = true,
  nextRed = false,
}: {
  onBack: () => void;
  onNext: () => void;
  nextLabel?: string;
  nextEnabled?: boolean;
  nextRed?: boolean;
}) {
  return (
    <div className="flex items-center justify-between px-8 py-5 bg-white border-t border-gray-100 mt-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 px-6 py-3 border border-gray-300 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        Back
      </button>
      <button
        onClick={onNext}
        disabled={!nextEnabled}
        className={`flex items-center gap-1.5 px-8 py-3 rounded-xl text-sm font-semibold transition-all ${
          nextEnabled
            ? nextRed
              ? "bg-[#CC1F1F] text-white hover:bg-[#b01a1a]"
              : "bg-[#CC1F1F] text-white hover:bg-[#b01a1a]"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        }`}
      >
        {nextLabel}
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      </button>
    </div>
  );
}

/* ─── P-01: Welcome ─────────────────────────────────────────────────── */
function WelcomeScreen({ onStart, onCollect, onExit }: { onStart: () => void; onCollect: () => void; onExit: () => void }) {
  return (
    <div className="flex flex-col h-full bg-[#1a1a1a] text-white relative overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-10 py-5 z-10">
        <div className="flex items-center gap-3">
          <SWLLogo size="sm" />
          <div>
            <div className="text-xs font-bold tracking-widest text-gray-400 uppercase">SWL Detailed</div>
            <div className="text-xs tracking-widest text-gray-500 uppercase">Vehicle Detailing</div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Kiosk Active
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1 items-center px-10 gap-16">
        <div className="flex-1 max-w-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-[#CC1F1F]" />
            <span className="text-xs font-bold tracking-widest text-[#CC1F1F] uppercase">Premium Vehicle Care</span>
          </div>
          <h1 className="font-['Playfair_Display'] text-6xl font-bold leading-tight mb-3">
            Welcome to<br />
            <span className="text-[#CC1F1F]">SWL Detailed.</span>
          </h1>
          <p className="text-gray-400 text-lg mb-10 leading-relaxed">
            Please tap below to begin your digital vehicle intake.<br />This will only take a few minutes.
          </p>
          <div className="flex gap-4 mb-6">
            <button
              onClick={onStart}
              className="flex items-center gap-3 bg-[#CC1F1F] text-white px-8 py-4 rounded-2xl text-base font-bold hover:bg-[#b01a1a] transition-all shadow-lg shadow-red-900/30"
            >
              Begin Intake
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </button>
            <button
              onClick={onCollect}
              className="flex items-center gap-3 border border-gray-600 text-gray-300 px-8 py-4 rounded-2xl text-base font-semibold hover:border-gray-400 hover:text-white transition-all"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
              Collecting Your Vehicle
            </button>
          </div>
          <p className="text-xs text-gray-600">If you need assistance, please speak with reception.</p>
        </div>

        {/* Car illustration area */}
        <div className="flex-1 flex flex-col items-center justify-center relative">
          {/* Simplified car SVG */}
          <svg viewBox="0 0 420 200" className="w-full max-w-md opacity-30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="60" y="90" width="300" height="70" rx="8" fill="#334155"/>
            <path d="M110 90 L160 45 L280 45 L330 90" fill="#334155" stroke="#475569" strokeWidth="1"/>
            <circle cx="130" cy="168" r="22" fill="#1e293b" stroke="#475569" strokeWidth="3"/>
            <circle cx="130" cy="168" r="10" fill="#334155"/>
            <circle cx="300" cy="168" r="22" fill="#1e293b" stroke="#475569" strokeWidth="3"/>
            <circle cx="300" cy="168" r="10" fill="#334155"/>
            <rect x="60" y="155" width="300" height="8" rx="2" fill="#1e293b"/>
            <rect x="165" y="52" width="100" height="35" rx="3" fill="#1e2d40" opacity="0.8"/>
            <rect x="62" y="110" width="30" height="20" rx="2" fill="#f97316" opacity="0.7"/>
            <rect x="328" y="110" width="30" height="20" rx="2" fill="#f97316" opacity="0.7"/>
          </svg>
          <div className="flex gap-2 mt-4">
            {["Paint Correction", "Ceramic Coating", "PPF", "Detailing"].map(t => (
              <span key={t} className="text-xs text-gray-500 border border-gray-700 px-3 py-1 rounded-full">{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="flex items-center justify-between px-10 py-3 border-t border-gray-800 text-xs text-gray-600">
        <span>Reception Kiosk — Version 2.4</span>
        <span>© 2026 SWL Detailed Pty Ltd</span>
      </footer>
      <div className="bg-gray-900 text-center py-1.5 text-xs font-semibold tracking-widest text-gray-500 uppercase">
        SWL Detailed — Reception Kiosk
      </div>

      {/* Exit button */}
      <button onClick={onExit} className="absolute top-4 right-32 text-xs text-gray-700 hover:text-gray-500 transition-colors">
        [Exit Demo]
      </button>
    </div>
  );
}

/* ─── P-02: Customer Details ─────────────────────────────────────────── */
function CustomerDetailsForm({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [contact, setContact] = useState<"SMS" | "Phone">("SMS");
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <KioskHeader step={1} total={6} />
      <div className="flex-1 overflow-y-auto scroll-hidden px-8 pb-4">
        <StepIndicator current={1} />
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Customer Details</h2>
        <p className="text-gray-500 text-sm mb-6">Please enter your contact information below.</p>
        <div className="bg-white rounded-2xl border border-gray-200 p-7 shadow-sm">
          <div className="grid grid-cols-2 gap-5 mb-5">
            <div>
              <label className="text-xs font-bold tracking-widest text-gray-400 uppercase block mb-1.5">First Name</label>
              <input defaultValue="James" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-[#CC1F1F] transition-colors" />
            </div>
            <div>
              <label className="text-xs font-bold tracking-widest text-gray-400 uppercase block mb-1.5">Last Name</label>
              <input defaultValue="Harrington" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:border-[#CC1F1F] transition-colors" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5 mb-5">
            <div>
              <label className="text-xs font-bold tracking-widest text-gray-400 uppercase block mb-1.5">Email Address</label>
              <input placeholder="james@example.com" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-400 focus:outline-none focus:border-[#CC1F1F] transition-colors" />
            </div>
            <div>
              <label className="text-xs font-bold tracking-widest text-gray-400 uppercase block mb-1.5">Mobile Number</label>
              <input defaultValue="066 674 3415" className="w-full border border-[#CC1F1F] rounded-xl px-4 py-3 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-[#CC1F1F] transition-colors" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-bold tracking-widest text-gray-400 uppercase block mb-1.5">Suburb</label>
              <input placeholder="e.g. Centurion" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-400 focus:outline-none focus:border-[#CC1F1F] transition-colors" />
            </div>
            <div>
              <label className="text-xs font-bold tracking-widest text-gray-400 uppercase block mb-1.5">Preferred Contact Method</label>
              <div className="flex gap-3">
                {(["SMS", "Phone"] as const).map(m => (
                  <button
                    key={m}
                    onClick={() => setContact(m)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl border-2 text-sm font-semibold transition-all flex-1 ${
                      contact === m ? "border-[#CC1F1F] bg-red-50 text-[#CC1F1F]" : "border-gray-200 text-gray-500"
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${contact === m ? "border-[#CC1F1F]" : "border-gray-300"}`}>
                      {contact === m && <div className="w-2 h-2 rounded-full bg-[#CC1F1F]" />}
                    </div>
                    {m === "SMS" ? "SMS" : "Phone Call"}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <NavButtons onBack={onBack} onNext={onNext} nextLabel="Save & Continue" />
    </div>
  );
}

/* ─── P-03: Vehicle Details ──────────────────────────────────────────── */
function VehicleDetailsForm({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <KioskHeader step={2} total={6} />
      <div className="flex-1 overflow-y-auto scroll-hidden px-8 pb-4">
        <StepIndicator current={2} />
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Vehicle Details</h2>
        <p className="text-gray-500 text-sm mb-6">Enter your vehicle&apos;s registration and details.</p>
        <div className="bg-white rounded-2xl border border-gray-200 p-7 shadow-sm">
          <div className="mb-5">
            <label className="text-xs font-bold tracking-widest text-gray-400 uppercase block mb-1.5">Registration Number</label>
            <input
              placeholder="E.G. 123ABC"
              className="w-full border-2 border-[#CC1F1F] rounded-xl px-5 py-4 text-2xl font-mono font-bold tracking-widest text-gray-400 focus:outline-none uppercase"
              style={{ letterSpacing: "0.15em" }}
            />
            <p className="text-xs text-gray-400 mt-1.5">Enter the vehicle registration exactly as shown on the plates.</p>
          </div>
          <div className="grid grid-cols-2 gap-5 mb-5">
            <div>
              <label className="text-xs font-bold tracking-widest text-gray-400 uppercase block mb-1.5">Make</label>
              <input placeholder="e.g. Porsche" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-400 focus:outline-none focus:border-[#CC1F1F] transition-colors" />
            </div>
            <div>
              <label className="text-xs font-bold tracking-widest text-gray-400 uppercase block mb-1.5">Model</label>
              <input placeholder="e.g. 911 Carrera" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-400 focus:outline-none focus:border-[#CC1F1F] transition-colors" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-bold tracking-widest text-gray-400 uppercase block mb-1.5">Year</label>
              <input placeholder="e.g. 2023" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-400 focus:outline-none focus:border-[#CC1F1F] transition-colors" />
            </div>
            <div>
              <label className="text-xs font-bold tracking-widest text-gray-400 uppercase block mb-1.5">Colour</label>
              <input placeholder="e.g. Guards Red" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-400 focus:outline-none focus:border-[#CC1F1F] transition-colors" />
            </div>
          </div>
        </div>
      </div>
      <NavButtons onBack={onBack} onNext={onNext} nextLabel="Next: Condition Review" />
    </div>
  );
}

/* ─── P-04: Vehicle Condition ─────────────────────────────────────────── */
const DAMAGE_ITEMS = [
  { location: "Front Bumper", severity: "MINOR", type: "Surface Scuff" },
  { location: "Rear Right Door", severity: "MODERATE", type: "Key Scratch" },
  { location: "Right Front Rim", severity: "MINOR", type: "Curb Rash" },
  { location: "Boot Lid", severity: "MINOR", type: "Paint Chip" },
];

function VehicleConditionScreen({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <KioskHeader step={3} total={6} />
      <div className="flex-1 overflow-y-auto scroll-hidden px-8 pb-4">
        <StepIndicator current={3} />
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Vehicle Condition Review</h2>
        <p className="text-gray-500 text-sm mb-6">Please review the pre-existing damage recorded by reception and add any additional notes.</p>
        <div className="grid grid-cols-2 gap-5">
          <div className="flex flex-col gap-5">
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-5 rounded bg-[#CC1F1F]" />
                <h3 className="font-bold text-gray-800">Vehicle on File</h3>
              </div>
              {[["REGISTRATION", "SWLVNOM"], ["MAKE", "BMW"], ["MODEL", "M4"], ["YEAR", "2025"], ["COLOUR", "Guard Red"], ["INTAKE STATUS", null]].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-0">
                  <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">{k}</span>
                  {k === "INTAKE STATUS" ? (
                    <span className="text-xs font-semibold px-2.5 py-1 bg-amber-50 text-amber-600 rounded-full">● In Progress</span>
                  ) : (
                    <span className="text-sm font-semibold text-gray-800 font-mono">{v}</span>
                  )}
                </div>
              ))}
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1 h-5 rounded bg-[#CC1F1F]" />
                <h3 className="font-bold text-gray-800">Your Additional Notes</h3>
              </div>
              <p className="text-xs text-gray-400 mb-3">Optional — note any concerns, damage, or special instructions.</p>
              <textarea className="w-full border border-gray-200 rounded-xl p-3 text-sm text-gray-600 h-24 resize-none focus:outline-none focus:border-[#CC1F1F] transition-colors" placeholder="Add notes here..." />
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-1 h-5 rounded bg-[#CC1F1F]" />
                <h3 className="font-bold text-gray-800">Existing Damage & Intake Photos</h3>
              </div>
              <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">4 items</span>
            </div>
            <p className="text-xs text-gray-400 mb-4">Photographs taken by reception at vehicle arrival. These are for record-keeping only.</p>
            <div className="grid grid-cols-2 gap-3">
              {DAMAGE_ITEMS.map((item) => (
                <div key={item.location} className={`rounded-xl border overflow-hidden ${item.severity === "MODERATE" ? "border-amber-200 bg-amber-50" : "border-gray-200 bg-gray-50"}`}>
                  <div className="h-20 flex items-center justify-center relative">
                    <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    <span className={`absolute top-1.5 right-1.5 text-xs font-bold px-2 py-0.5 rounded ${item.severity === "MODERATE" ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}`}>
                      {item.severity}
                    </span>
                    <span className="absolute bottom-1.5 text-xs text-gray-400 font-medium">{item.location}</span>
                  </div>
                  <div className="px-3 py-2">
                    <div className="text-xs font-semibold text-gray-700">{item.location}</div>
                    <div className="text-xs text-gray-400">{item.type}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl p-3">
              <svg className="w-4 h-4 text-[#CC1F1F] mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              <p className="text-xs text-[#CC1F1F]">Damage documented above was present prior to service. SWL Detailed accepts no liability for pre-existing conditions.</p>
            </div>
          </div>
        </div>
      </div>
      <NavButtons onBack={onBack} onNext={onNext} nextLabel="Next: Service Selection" nextRed />
    </div>
  );
}

/* ─── P-05: Service Selection ─────────────────────────────────────────── */
const SERVICES = [
  { id: "ext", name: "Exterior Wash & Detail", desc: "Full hand wash, clay bar, tyre dressing & interior vacuum", price: "R 149", duration: "2 hrs" },
  { id: "int", name: "Interior Detail", desc: "Deep steam clean, leather conditioning, all interior surfaces", price: "R 199", duration: "3 hrs" },
  { id: "paint", name: "Paint Correction", desc: "Multi-stage machine polish — eliminates swirls, scratches & oxidation", price: "R 699", duration: "8 hrs" },
  { id: "ceramic", name: "Ceramic Coating", desc: "9H ceramic protection with 3-year manufacturer warranty", price: "R 1,299", duration: "1 full day" },
  { id: "ppf", name: "Full Vehicle PPF", desc: "Premium paint protection film — full body, 10-year warranty", price: "R 3,500", duration: "2–3 days" },
  { id: "engine", name: "Engine Bay Detail", desc: "Degreased, professionally cleaned & presentation-ready", price: "R 99", duration: "1 hr" },
];

const PRICES: Record<string, number> = { ext: 149, int: 199, paint: 699, ceramic: 1299, ppf: 3500, engine: 99 };

function ServiceSelectionScreen({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const [selected, setSelected] = useState<Set<string>>(new Set(["int", "ppf"]));

  const toggle = (id: string) => {
    setSelected(prev => {
      const s = new Set(prev);
      s.has(id) ? s.delete(id) : s.add(id);
      return s;
    });
  };

  const total = [...selected].reduce((sum, id) => sum + (PRICES[id] || 0), 0);

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <KioskHeader step={4} total={6} />
      <div className="flex-1 overflow-y-auto scroll-hidden px-8 pb-4">
        <StepIndicator current={4} />
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Select Services</h2>
        <p className="text-gray-500 text-sm mb-6">Choose one or more services for your vehicle. Tap a card to select it.</p>
        <div className="grid grid-cols-3 gap-4 mb-4">
          {SERVICES.map(s => {
            const active = selected.has(s.id);
            return (
              <button
                key={s.id}
                onClick={() => toggle(s.id)}
                className={`text-left p-5 rounded-2xl border-2 transition-all shadow-sm hover:shadow-md ${active ? "border-[#CC1F1F] bg-white" : "border-gray-200 bg-white"}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className={`font-bold text-sm ${active ? "text-[#CC1F1F]" : "text-gray-800"}`}>{s.name}</h4>
                  {active && (
                    <div className="w-5 h-5 bg-[#CC1F1F] rounded-full flex items-center justify-center shrink-0">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-400 mb-4 leading-relaxed">{s.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-800">{s.price}</span>
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {s.duration}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
        {selected.size > 0 ? (
          <div className="bg-gray-900 text-white rounded-2xl p-5 flex items-center justify-between">
            <div>
              <span className="font-semibold">{selected.size} service{selected.size > 1 ? "s" : ""} selected</span>
              <div className="flex gap-2 mt-1.5">
                {[...selected].map(id => (
                  <span key={id} className="text-xs bg-white/20 px-2 py-0.5 rounded-full">{SERVICES.find(s => s.id === id)?.name}</span>
                ))}
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-400 uppercase tracking-widest">Estimated Total</div>
              <div className="text-2xl font-bold text-white">R {total.toLocaleString()}</div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-100 rounded-2xl p-4 text-sm text-gray-400">
            No services selected yet. Tap a package above to get started.
          </div>
        )}
      </div>
      <NavButtons onBack={onBack} onNext={onNext} nextLabel="Next: Indemnity Agreement" nextEnabled={selected.size > 0} />
    </div>
  );
}

/* ─── P-06: Terms & Liability ─────────────────────────────────────────── */
const TERMS_TEXT = `TERMS & LIABILITY WAIVER — SWL DETAILED PTY LTD ABN 47 123 456 789 | Last updated: January 2025

1. ACKNOWLEDGEMENT OF RISK By signing this document, the client ("you") acknowledge that vehicle detailing, paint correction, ceramic coating, and paint protection film (PPF) installation involve inherent risks including, but not limited to, damage arising from pre-existing defects, aged or thin paint, prior poor-quality repairs, or undisclosed modifications to the vehicle's painted finish. SWL Detailed Pty Ltd ("we", "us", "the Company") will exercise all reasonable professional care during service delivery.

2. PRE-EXISTING CONDITIONS SWL Detailed will conduct a thorough condition assessment prior to commencing any work. Pre-existing damage, defects, and areas of concern are documented in this job file, supported by intake photographs. By proceeding, you confirm that the condition notes and intake photos accurately represent your vehicle's state upon drop-off. Any damage not noted during intake and discovered after service commencement will be deemed pre-existing unless demonstrably caused by our actions.

3. LIMITATION OF LIABILITY SWL Detailed Pty Ltd, its directors, employees, contractors and agents shall not be held liable for damage to vehicle paint, trim, glass, rubber seals, electronic components, or mechanical systems arising from: (a) pre-existing conditions not disclosed or not visible at intake; (b) factory defects or structural weaknesses in the vehicle's finish; (c) vehicles with prior paint correction or non-genuine paint repairs; or (d) deterioration resulting from normal use or environmental exposure after collection.

4. PAINT PROTECTION FILM (PPF) By consenting to PPF installation, you acknowledge that: (a) PPF installation requires careful surface preparation including clay bar decontamination, IPA wipe-down, and in some cases light polishing; (b) in rare cases, PPF installation or removal may expose or worsen pre-existing paint defects; (c) the 10-year manufacturer warranty on STEK DYNOshield film is subject to proper maintenance as outlined in the care guide provided at collection.

5. BATTERY & ELECTRICAL RESPONSIBILITY Vehicles left on-site for extended periods may experience natural battery discharge. SWL Detailed will perform a battery status check on all vehicles on-site for more than 48 hours and will notify you before taking any corrective action. We accept no liability for battery failure arising from natural standing discharge rate.

6. PAYMENT TERMS Full payment is due upon collection of the vehicle. Where a deposit has been paid, the deposit is non-refundable in the event of cancellation with less than 24 hours' notice. Estimates provided at booking are indicative only and may vary based on vehicle condition discovered during service.

7. COLLECTION & STORAGE Vehicles not collected within 3 business days of notification of completion will incur a storage fee of R 150 per day. SWL Detailed will not be liable for damage caused by extended on-site storage beyond the customer's control.

8. PHOTOGRAPHY CONSENT You consent to SWL Detailed photographing your vehicle throughout the service process for quality documentation, job records, and with your express consent, marketing purposes. You may opt out of marketing use by notifying reception at intake.

9. BATTERY DISCLAIMER By leaving your vehicle on our premises, you acknowledge the risk of natural standing discharge rate.

10. GOVERNING LAW This agreement is governed by the laws of South Africa. Any disputes arising from or in connection with this agreement shall be subject to the exclusive jurisdiction of the courts of South Africa.

11. SEVERABILITY If any provision of this agreement is found to be unenforceable, the remaining provisions shall continue in full force and effect.

12. ENTIRE AGREEMENT This document, together with the job intake record, constitutes the entire agreement between you and SWL Detailed Pty Ltd in relation to the services described. It supersedes all prior verbal or written representations.

By signing below, you confirm that you have read, understood, and agree to these terms and conditions in their entirety, and that you are authorised to make decisions regarding the vehicle described in this intake form.`;

function TermsScreen({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 20) setScrolled(true);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <KioskHeader step={5} total={6} />
      <div className="flex-1 overflow-y-auto scroll-hidden px-8 pb-4">
        <StepIndicator current={5} />
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Terms & Liability Waiver</h2>
        <p className="text-gray-500 text-sm mb-6">Please read the agreement carefully before proceeding to sign.</p>
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mb-4">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <span className="text-sm font-semibold text-gray-700">SWL Detailed — Client Agreement</span>
            <span className="text-xs bg-gray-100 text-gray-500 px-2.5 py-1 rounded">January 2026</span>
          </div>
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="h-64 overflow-y-auto scroll-hidden px-6 py-4"
          >
            <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-line">{TERMS_TEXT}</p>
          </div>
        </div>
        {scrolled && (
          <button
            onClick={() => setAgreed(a => !a)}
            className={`w-full flex items-center gap-3 p-4 rounded-2xl border-2 transition-all ${agreed ? "border-[#CC1F1F] bg-red-50" : "border-gray-200"}`}
          >
            <div className={`w-5 h-5 rounded flex items-center justify-center shrink-0 ${agreed ? "bg-[#CC1F1F]" : "border-2 border-gray-300"}`}>
              {agreed && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-gray-800">I have read and agree to the Terms & Liability Waiver Agreement</p>
              <p className="text-xs text-gray-400">By checking this box you confirm you have read and understood all terms above.</p>
            </div>
          </button>
        )}
        {!scrolled && (
          <div className="text-center text-sm text-gray-400 py-4">↓ Scroll to the bottom of the agreement to continue</div>
        )}
      </div>
      <NavButtons onBack={onBack} onNext={onNext} nextLabel="Proceed to Sign" nextEnabled={agreed} />
    </div>
  );
}

/* ─── P-07: Digital Signature ─────────────────────────────────────────── */
function SignatureScreen({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [hasSig, setHasSig] = useState(false);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    setDrawing(true);
    setHasSig(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = "#1a1a1a";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!drawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDraw = () => setDrawing(false);

  const clearSig = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSig(false);
  };

  const timeStr = time.toLocaleTimeString("en-ZA", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const dateStr = "Friday 31 July 2026";

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <KioskHeader step={6} total={6} />
      <div className="flex-1 overflow-y-auto scroll-hidden px-8 pb-4">
        <StepIndicator current={6} />
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Digital Signature</h2>
        <p className="text-gray-500 text-sm mb-6">Sign below using your finger or stylus to complete your intake.</p>
        <div className="grid grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-700">Client Signature</h3>
              {hasSig && <span className="flex items-center gap-1 text-xs font-semibold text-green-600"><div className="w-2 h-2 rounded-full bg-green-500" />Signature captured</span>}
            </div>
            <canvas
              ref={canvasRef}
              width={400}
              height={200}
              className="w-full border border-gray-100 rounded-xl bg-white signature-canvas"
              style={{ height: "200px" }}
              onMouseDown={startDraw}
              onMouseMove={draw}
              onMouseUp={stopDraw}
              onMouseLeave={stopDraw}
              onTouchStart={startDraw}
              onTouchMove={draw}
              onTouchEnd={stopDraw}
            />
            <div className="flex items-center justify-between mt-4">
              <button onClick={clearSig} className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 border border-gray-200 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                Clear Signature
              </button>
              <span className="text-xs text-gray-400">TIMESTAMP <span className="font-mono font-semibold text-gray-600">{timeStr}</span></span>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-5 rounded bg-[#CC1F1F]" />
                <h3 className="font-semibold text-gray-700">Signee Details</h3>
              </div>
              {[["FULL NAME", "James Harrington"], ["VEHICLE", "SWLVNOM — BMW M4"], ["DATE", dateStr]].map(([k, v]) => (
                <div key={k} className="mb-3">
                  <div className="text-xs text-gray-400 tracking-widest uppercase">{k}</div>
                  <div className="text-sm font-semibold text-gray-800">{v}</div>
                </div>
              ))}
            </div>
            <div className="bg-gray-900 text-white rounded-2xl p-5 text-center">
              <div className="text-xs text-gray-400 tracking-widest uppercase mb-2">Live Timestamp</div>
              <div className="font-mono text-3xl font-bold">{timeStr}</div>
              <div className="text-xs text-gray-400 mt-1">{dateStr}</div>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
              <p className="text-xs text-[#CC1F1F]">By confirming your signature, you agree to all terms and conditions of the SWL Detailed liability waiver.</p>
            </div>
          </div>
        </div>
      </div>
      <NavButtons onBack={onBack} onNext={onNext} nextLabel="Confirm & Submit Intake" nextEnabled={hasSig} />
    </div>
  );
}

/* ─── P-08: Intake Confirmation ──────────────────────────────────────── */
function IntakeConfirmation({ onHome }: { onHome: () => void }) {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <KioskHeader />
      <div className="flex-1 overflow-y-auto scroll-hidden px-8 pb-8">
        <div className="flex flex-col items-center pt-10 pb-6">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mb-5">
            <svg className="w-8 h-8 text-[#CC1F1F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          </div>
          <h2 className="font-['Playfair_Display'] text-4xl font-bold text-gray-900 mb-2">Intake Submitted Successfully!</h2>
          <p className="text-gray-500 text-center">Thank you! Your vehicle job file has been created. A receptionist will assist you shortly.</p>
        </div>

        <div className="bg-gray-900 text-white rounded-2xl p-6 mb-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-xs text-gray-400 tracking-widest uppercase">Job Reference</div>
              <div className="text-2xl font-bold font-mono mt-1">SWL-DMO905</div>
            </div>
            <span className="text-xs bg-amber-500/20 text-amber-400 px-3 py-1.5 rounded-full font-semibold">● Pending Assignment</span>
          </div>
          <div className="border-t border-gray-700 pt-4 grid grid-cols-2 gap-4">
            {[["CLIENT NAME", "James Harrington"], ["VEHICLE REGISTRATION", "SWLVNOM"], ["VEHICLE", "2022 BMW M4"], ["SUBMITTED AT", "31 July 2026 at 01:10 pm"]].map(([k, v]) => (
              <div key={k}>
                <div className="text-xs text-gray-400 tracking-widest uppercase">{k}</div>
                <div className="text-sm font-semibold mt-0.5 font-mono">{v}</div>
              </div>
            ))}
            <div className="col-span-2 border-t border-gray-700 pt-3">
              <div className="text-xs text-gray-400 tracking-widest uppercase mb-2">Booked Services</div>
              <div className="flex gap-2">
                <span className="text-xs border border-[#CC1F1F] text-[#CC1F1F] px-3 py-1 rounded-full">Full Vehicle PPF</span>
                <span className="text-xs border border-[#CC1F1F] text-[#CC1F1F] px-3 py-1 rounded-full">Interior Detail</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">What happens next?</h3>
          {[
            "A receptionist will review your intake and assign your vehicle to a detailer.",
            "You will receive a confirmation via your nominated contact method.",
            "Please keep your Job ID handy — you will need it when collecting your vehicle.",
          ].map((text, i) => (
            <div key={i} className="flex items-start gap-3 mb-3 last:mb-0">
              <div className="w-6 h-6 rounded-full bg-[#CC1F1F] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i + 1}</div>
              <p className="text-sm text-gray-600">{text}</p>
            </div>
          ))}
        </div>

        <button onClick={onHome} className="w-full flex items-center justify-center gap-2 bg-[#CC1F1F] text-white py-4 rounded-2xl font-bold text-base hover:bg-[#b01a1a] transition-colors">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
          Return to Home
        </button>
      </div>
      <div className="bg-gray-900 text-center py-1.5 text-xs font-semibold tracking-widest text-gray-500 uppercase">
        SWL Detailed — Reception Kiosk
      </div>
    </div>
  );
}

/* ─── P-09a: Collection Sign-Off ─────────────────────────────────────── */
function CollectionSignOff({ onNext, onHome }: { onNext: () => void; onHome: () => void }) {
  const [rating, setRating] = useState(0);
  const [ratings, setRatings] = useState<Record<string, number>>({ "Service Quality": 0, Communication: 0, "Value for Money": 0, "Vehicle Cleanliness": 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);
  const [hasSig, setHasSig] = useState(false);

  const startDraw = (e: React.MouseEvent) => {
    setDrawing(true); setHasSig(true);
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath(); ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.strokeStyle = "#1a1a1a"; ctx.lineWidth = 2; ctx.lineCap = "round";
  };
  const drawLine = (e: React.MouseEvent) => {
    if (!drawing) return;
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext("2d"); if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top); ctx.stroke();
  };

  const Star = ({ n, val, onSet }: { n: number; val: number; onSet: (v: number) => void }) => (
    <button onClick={() => onSet(n)} className="text-2xl transition-colors">
      {n <= val ? "★" : "☆"}
    </button>
  );

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100">
        <div className="flex items-center gap-2"><SWLLogo size="sm" /><span className="font-semibold text-gray-800 text-sm">SWL Detailed</span></div>
        <span className="text-xs font-semibold tracking-widest bg-green-100 text-green-700 px-3 py-1.5 rounded-full uppercase">P-09 — Collection Sign-Off</span>
        <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-green-400" /><span className="text-xs text-gray-500">Kiosk Active</span></div>
      </header>

      <div className="flex-1 overflow-y-auto scroll-hidden px-8 py-6">
        <div className="bg-[#1a5c30] text-white rounded-2xl p-5 flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
            </div>
            <div>
              <div className="font-bold">Your Vehicle is Ready for Collection</div>
              <div className="text-xs text-green-200">Job SWL-KRT847 — 2022 Porsche 911 Carrera S (123ABC) — Completed by Marcus Webb at 07:04 pm</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-green-200">SERVICES TOTAL</div>
            <div className="text-2xl font-bold">R 1,998</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-4"><div className="w-1 h-5 rounded bg-[#CC1F1F]" /><h3 className="font-bold">Job Summary</h3></div>
              {[["JOB ID", "SWL-KRT847"], ["REGISTRATION", "123ABC"], ["VEHICLE", "2022 Porsche 911 Carrera S"], ["COLOUR", "Agate Grey Metallic"], ["DETAILER", "Marcus Webb"]].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <span className="text-xs text-gray-400 uppercase tracking-widest">{k}</span>
                  <span className="text-sm font-semibold text-gray-800 font-mono">{v}</span>
                </div>
              ))}
              <div className="pt-2">
                <div className="text-xs text-gray-400 uppercase tracking-widest mb-2">Services Completed</div>
                <div className="flex gap-2">
                  <span className="text-xs border border-gray-300 text-gray-600 px-2 py-0.5 rounded-full">Paint Correction</span>
                  <span className="text-xs border border-gray-300 text-gray-600 px-2 py-0.5 rounded-full">Ceramic Coating</span>
                </div>
              </div>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
              <div className="flex items-start gap-2">
                <svg className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                <div>
                  <div className="text-sm font-semibold text-amber-800">Please Inspect Your Vehicle</div>
                  <p className="text-xs text-amber-600 mt-0.5">Before signing, please walk around your vehicle and confirm you are satisfied with the work completed. Once signed, this confirms collection and acceptance of the finished service.</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-3"><div className="w-1 h-5 rounded bg-[#CC1F1F]" /><h3 className="font-semibold">Rate Each Area <span className="text-gray-400 font-normal text-xs">(optional)</span></h3></div>
              {Object.entries(ratings).map(([k, v]) => (
                <div key={k} className="flex items-center justify-between py-2">
                  <span className="text-sm text-gray-600">{k}</span>
                  <div className="flex gap-0.5 text-[#CC1F1F]">
                    {[1,2,3,4,5].map(n => <Star key={n} n={n} val={v} onSet={r => setRatings(prev => ({...prev, [k]: r}))} />)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-3"><div className="w-1 h-5 rounded bg-[#CC1F1F]" /><h3 className="font-semibold">Overall Satisfaction <span className="text-[#CC1F1F] text-xs">*Required</span></h3></div>
              <div className="flex gap-2 text-3xl text-[#CC1F1F] justify-center py-2">
                {[1,2,3,4,5].map(n => (
                  <button key={n} onClick={() => setRating(n)} className="transition-transform hover:scale-110">{n <= rating ? "★" : "☆"}</button>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-3"><div className="w-1 h-5 rounded bg-[#CC1F1F]" /><h3 className="font-semibold">Written Feedback <span className="text-gray-400 font-normal text-xs">(optional)</span></h3></div>
              <textarea className="w-full border border-gray-200 rounded-xl p-3 text-sm text-gray-400 h-24 resize-none focus:outline-none focus:border-[#CC1F1F]" placeholder="Tell us about your experience — we value every piece of feedback..." />
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
              <div className="flex items-center gap-2 mb-3"><div className="w-1 h-5 rounded bg-[#CC1F1F]" /><h3 className="font-semibold">Collection Signature <span className="text-[#CC1F1F] text-xs">*Required</span></h3></div>
              <canvas
                ref={canvasRef}
                width={350}
                height={120}
                className="w-full border border-gray-200 rounded-xl signature-canvas bg-gray-50"
                onMouseDown={startDraw}
                onMouseMove={drawLine}
                onMouseUp={() => setDrawing(false)}
                onMouseLeave={() => setDrawing(false)}
              />
              {!hasSig && <p className="text-xs text-gray-400 text-center mt-1">Sign to confirm collection</p>}
              <div className="flex items-center justify-between mt-3">
                <button onClick={() => { canvasRef.current?.getContext("2d")?.clearRect(0, 0, 350, 120); setHasSig(false); }} className="text-xs border border-gray-200 px-3 py-1.5 rounded-lg text-gray-500 flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  Clear
                </button>
                <span className="text-xs text-gray-400">31 July 2026 · 07:52 pm</span>
              </div>
              <button onClick={onNext} disabled={!hasSig || rating === 0} className={`w-full mt-4 py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${hasSig && rating > 0 ? "bg-[#1a5c30] text-white hover:bg-[#154a26]" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                Confirm Collection & Sign Off
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-900 text-center py-1.5 text-xs font-semibold tracking-widest text-gray-500 uppercase">
        SWL Detailed — Reception Kiosk
      </div>
    </div>
  );
}

/* ─── P-09b: Collection Confirmed ────────────────────────────────────── */
function CollectionConfirmed({ onHome }: { onHome: () => void }) {
  return (
    <div className="flex flex-col h-full bg-gray-50">
      <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100">
        <div className="flex items-center gap-2"><SWLLogo size="sm" /><span className="font-semibold text-gray-800 text-sm">SWL Detailed</span></div>
        <span className="text-xs font-semibold tracking-widest text-gray-400 uppercase">Collection Complete</span>
        <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-green-400" /><span className="text-xs text-gray-500">Kiosk Active</span></div>
      </header>
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-12">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
          <div className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
          </div>
        </div>
        <h2 className="font-['Playfair_Display'] text-4xl font-bold text-gray-900 mb-2">Collection Confirmed!</h2>
        <p className="text-gray-400 text-center mb-8">Thank you for choosing SWL Detailed. We hope to see you again soon.<br />Enjoy your vehicle!</p>
        <div className="bg-white rounded-2xl border border-gray-200 p-6 w-full max-w-md mb-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">Collection Record</span>
            <span className="text-xs font-semibold bg-green-100 text-green-700 px-3 py-1 rounded-full">Collected</span>
          </div>
          {[["JOB ID", "SWL-KRT847"], ["VEHICLE", "123ABC — 2022 Porsche 911 Carrera S"], ["COLLECTED AT", "31 July 2026 at 07:52 pm"]].map(([k, v]) => (
            <div key={k} className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-0">
              <span className="text-xs text-gray-400 uppercase tracking-widest">{k}</span>
              <span className="text-sm font-semibold text-gray-800 font-mono">{v}</span>
            </div>
          ))}
          <div className="flex items-center justify-between py-2">
            <span className="text-xs text-gray-400 uppercase tracking-widest">SATISFACTION</span>
            <span className="text-[#CC1F1F] text-lg">★★★★★</span>
          </div>
        </div>
        <button onClick={onHome} className="flex items-center gap-2 bg-[#CC1F1F] text-white px-10 py-4 rounded-2xl font-bold text-base hover:bg-[#b01a1a] transition-colors w-full max-w-md justify-center">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
          Return to Home
        </button>
      </div>
      <div className="bg-gray-900 text-center py-1.5 text-xs font-semibold tracking-widest text-gray-500 uppercase">
        SWL Detailed — Reception Kiosk
      </div>
    </div>
  );
}

/* ─── Main ClientKiosk wrapper ───────────────────────────────────────── */
export default function ClientKiosk({ onExit }: ClientKioskProps) {
  const [screen, setScreen] = useState<Screen>("welcome");

  const go = (s: Screen) => setScreen(s);

  if (screen === "welcome") return <WelcomeScreen onStart={() => go("customer")} onCollect={() => go("collection")} onExit={onExit} />;
  if (screen === "customer") return <CustomerDetailsForm onNext={() => go("vehicle")} onBack={() => go("welcome")} />;
  if (screen === "vehicle") return <VehicleDetailsForm onNext={() => go("condition")} onBack={() => go("customer")} />;
  if (screen === "condition") return <VehicleConditionScreen onNext={() => go("services")} onBack={() => go("vehicle")} />;
  if (screen === "services") return <ServiceSelectionScreen onNext={() => go("terms")} onBack={() => go("condition")} />;
  if (screen === "terms") return <TermsScreen onNext={() => go("signature")} onBack={() => go("services")} />;
  if (screen === "signature") return <SignatureScreen onNext={() => go("confirmation")} onBack={() => go("terms")} />;
  if (screen === "confirmation") return <IntakeConfirmation onHome={() => go("welcome")} />;
  if (screen === "collection") return <CollectionSignOff onNext={() => go("collected")} onHome={() => go("welcome")} />;
  if (screen === "collected") return <CollectionConfirmed onHome={() => go("welcome")} />;
  return null;
}
