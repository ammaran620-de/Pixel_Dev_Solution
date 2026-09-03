import { site } from "@/content/site";
import Link from "next/link";

export default function ClosingCTA() {
  return (
    <section className="bg-ink py-[180px] text-center px-4 relative overflow-hidden">
      {/* Target reticle brackets simulated with basic borders (Phase 1) */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-signal/30"></div>
      <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-signal/30"></div>
      <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-signal/30"></div>
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-signal/30"></div>
      
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        <h2 className="text-white mb-6">Tell us what's coming off your line wrong.</h2>
        <p className="text-paper/80 text-lg mb-10 leading-relaxed">
          20-minute scoping call. Bring a video clip or a few photos of the defect if you have them — we'll tell you on the call whether it's solvable and roughly what it costs.
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <Link 
            href={site.calLink}
            target="_blank"
            className="bg-amber text-white px-8 py-3.5 rounded hover:bg-amber/90 transition-colors font-semibold"
          >
            Book a scoping call
          </Link>
          <Link 
            href={site.whatsapp}
            target="_blank"
            className="border border-line-strong/30 text-paper px-8 py-3.5 rounded hover:bg-white/10 transition-colors font-semibold"
          >
            WhatsApp us
          </Link>
        </div>
        
        <div className="mono-tag text-muted">
          LOC: {site.location} // {site.hours}
        </div>
      </div>
    </section>
  );
}
