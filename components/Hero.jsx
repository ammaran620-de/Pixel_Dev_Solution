import { site } from "@/content/site";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="max-w-layout pt-24 pb-16 min-h-[84vh] flex flex-col justify-center">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        {/* Text Column (7 cols) */}
        <div className="md:col-span-7 flex flex-col items-start order-2 md:order-1">
          <h1 className="mb-6 h1">
            We build vision systems that make the call on the line.
          </h1>
          <p className="body text-ink/80 mb-8 max-w-content">
            Defect detection, counting, verification, and OCR for manufacturing and logistics. Deployed on edge hardware, running at line speed.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              href="/contact"
              className="bg-amber text-white px-6 py-3 rounded hover:bg-amber/90 transition-colors font-semibold"
            >
              Book a scoping call
            </Link>
            <Link 
              href="/work"
              className="border border-line-strong text-ink px-6 py-3 rounded hover:bg-paper-sunk transition-colors font-semibold"
            >
              See the work
            </Link>
          </div>
        </div>
        
        {/* Visual Column (5 cols) - Placeholder for SVG in Phase 4 */}
        <div className="md:col-span-5 w-full order-1 md:order-2">
          <div className="aspect-[4/3] bg-slate rounded-sm flex items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/40"></div>
            <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/40"></div>
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/40"></div>
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/40"></div>
            
            <span className="mono-tag text-signal-lit">detecting solder bridges</span>
          </div>
        </div>
      </div>
    </div>
  );
}
