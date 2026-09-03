import { site } from "@/content/site";
import { DefectIcon, VerifyIcon, ReadIcon, DimensionIcon, ZoneIcon, SpeedIcon } from "./icons";
import Reveal from "./Reveal";

const iconMap = {
  defect: DefectIcon,
  verify: VerifyIcon,
  read: ReadIcon,
  dimension: DimensionIcon,
  zone: ZoneIcon,
  speed: SpeedIcon,
};

export default function ProblemGrid() {
  return (
    <section className="py-24 bg-paper">
      <div className="max-w-layout">
        <h2 className="mb-12">Problems we solve</h2>
        
        {/* Table-like grid: paper on paper, separated by line dividers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-line">
          {site.problemTypes.map((problem, idx) => {
            const Icon = iconMap[problem.icon] || Scan;
            
            return (
              <div 
                key={idx} 
                className="group relative p-8 border-b border-r border-line bg-paper hover:bg-paper-sunk transition-colors duration-200 flex flex-col min-h-[280px]"
              >
                {/* Simulated Bracket ticks on hover (Phase 1 version: simple CSS) */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-transparent group-hover:border-signal transition-colors duration-200"></div>
                <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-transparent group-hover:border-signal transition-colors duration-200"></div>
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-transparent group-hover:border-signal transition-colors duration-200"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-transparent group-hover:border-signal transition-colors duration-200"></div>

                <Icon 
                  size={24} 
                  strokeWidth={1.5} 
                  className="text-ink group-hover:text-signal transition-colors duration-200 mb-6"
                />
                
                <h3 className="mb-2 text-ink h3">{problem.title}</h3>
                <p className="body text-ink/80 mb-8 flex-grow">{problem.description}</p>
                
                <div className="mt-auto pt-4 border-t border-line/40">
                  <span className="mono-tag text-muted">{problem.constraint}</span>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="mt-8 text-center text-ink/80">
          Not on this list? The problems we take are the ones with a measurable pass/fail. <button className="text-signal hover:underline font-medium">Ask the assistant</button>
        </div>
      </div>
    </section>
  );
}
