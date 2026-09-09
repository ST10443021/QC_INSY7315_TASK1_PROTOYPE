interface SWLLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function SWLLogo({ size = "md", className = "" }: SWLLogoProps) {
  const sizes = { sm: "w-7 h-7 text-xs", md: "w-9 h-9 text-sm", lg: "w-14 h-14 text-lg" };
  return (
    <div className={`${sizes[size]} rounded-xl bg-[#CC1F1F] flex items-center justify-center font-black text-white tracking-tight shrink-0 ${className}`}>
      SWL
    </div>
  );
}

export function StageBadge({ stage }: { stage: string }) {
  const map: Record<string, string> = {
    "Booked": "badge-booked",
    "Vehicle Arrived": "badge-arrived",
    "Intake Complete": "badge-intake",
    "Service in Progress": "badge-inprogress",
    "Quality Control": "badge-qc",
    "Ready for Collection": "badge-ready",
    "Collected": "badge-collected",
  };
  const cls = map[stage] || "badge-collected";
  return (
    <span className={`${cls} text-xs font-semibold px-2.5 py-1 rounded-full`}>{stage}</span>
  );
}
