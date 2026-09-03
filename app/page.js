import Hero from "@/components/Hero";
import ProblemGrid from "@/components/ProblemGrid";
import EngagementTiers from "@/components/EngagementTiers";
import ClosingCTA from "@/components/ClosingCTA";
import ProcessSection from "@/components/ProcessSection";
import ClipPlayer from "@/components/ClipPlayer";
import MetricCounter from "@/components/MetricCounter";
import Link from "next/link";
import { projects } from "@/content/projects";

const featuredDeployed = projects.find(p => p.featured && p.deployed) || projects[0];

export default function Home() {
  return (
    <>
      <Hero />
      
      <ProblemGrid />

      {/* H3: Measured Results (Phase 1 simplified version) */}
      <section className="bg-paper-sunk py-16 border-y border-line-strong">
        <div className="max-w-layout grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
          <div className="flex flex-col md:border-r border-line-strong pr-4">
            <div className="metric">
              <MetricCounter value={99.8} decimals={1} suffix="%" duration={2000} />
            </div>
            <div className="body text-sm text-muted mt-2 max-w-[140px]">recall on target defect classes</div>
          </div>
          <div className="flex flex-col md:border-r border-line-strong pr-4">
            <div className="metric">
              <MetricCounter value={0.4} decimals={1} suffix="%" duration={2000} />
            </div>
            <div className="body text-sm text-muted mt-2 max-w-[140px]">false positive rate, same deployment</div>
          </div>
          <div className="flex flex-col md:border-r border-line-strong pr-4">
            <div className="metric">
              <MetricCounter value={11} decimals={0} suffix={<span className="text-xl">ms</span>} duration={2000} />
            </div>
            <div className="body text-sm text-muted mt-2 max-w-[140px]">inference latency, Jetson Orin</div>
          </div>
          <div className="flex flex-col">
            <div className="metric">
              <MetricCounter value={8} decimals={0} suffix={<span className="text-xl">weeks</span>} duration={2000} />
            </div>
            <div className="body text-sm text-muted mt-2 max-w-[140px]">average scope to deployed system</div>
          </div>
        </div>
        <div className="max-w-layout mt-12">
          <p className="mono-tag text-muted">Figures from deployed systems. Per-project numbers are on each case study.</p>
        </div>
      </section>

      {/* H4: Featured Case Study */}
      <section className="bg-slate text-paper py-24">
        <div className="max-w-layout">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 aspect-video bg-ink rounded relative overflow-hidden order-1">
              <ClipPlayer clipId={featuredDeployed.slug} />
            </div>
            
            <div className="lg:col-span-5 lg:col-start-8 order-2">
              <h2 className="mb-2 text-white">{featuredDeployed.name}</h2>
              <div className="flex flex-wrap items-center gap-3 mono-tag text-muted mb-6">
                <span>{featuredDeployed.clientType}</span>
                <span className="w-px h-3 bg-white/20 block"></span>
                <span>{featuredDeployed.region}</span>
                <span className="w-px h-3 bg-white/20 block"></span>
                <span>{featuredDeployed.year}</span>
              </div>
              
              <p className="body text-lg text-paper/90 mb-10">
                {featuredDeployed.line}
              </p>
              
              {/* Outcomes row */}
              <div className="flex flex-wrap gap-8 mb-10 border-b border-white/10 pb-8">
                {featuredDeployed.outcomes?.map((outcome, idx) => (
                  <div key={idx}>
                    <div className="text-3xl font-bricolage font-bold text-signal-lit mb-1">{outcome.value}</div>
                    <div className="text-xs text-paper/60 font-semibold uppercase">{outcome.label}</div>
                  </div>
                ))}
              </div>
              
              <Link href={`/work/${featuredDeployed.slug}`} className="text-signal-lit hover:text-white font-semibold block transition-colors mb-12">
                Read the full case study
              </Link>
              
              <div className="flex flex-wrap gap-2">
                {featuredDeployed.stack.map(tech => (
                  <span key={tech} className="mono-tag bg-ink text-paper/70 px-2 py-1 rounded">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* H5: How an engagement runs */}
      <section className="py-24 bg-paper border-b border-line">
        <div className="max-w-layout">
          <h2 className="mb-16">How we build</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 relative">
            {/* Desktop continuous line */}
            <div className="hidden md:block absolute top-[11px] left-0 right-0 h-[1px] bg-line-strong z-0"></div>
            
            {[
              { num: "01", title: "Scope", duration: "1 week", receive: "Written spec with a measurable accuracy target" },
              { num: "02", title: "Pilot", duration: "2 weeks", receive: "Trained model on your footage + accuracy report" },
              { num: "03", title: "Build", duration: "4–8 weeks", receive: "Deployed system on your hardware, integrated to PLC/MES" },
              { num: "04", title: "Hand over", duration: "1 week", receive: "Documentation, retraining pipeline, 30-day support" }
            ].map((step, idx) => (
              <div key={idx} className="relative z-10 pr-8 pb-12 md:pb-0">
                <div className="w-[24px] h-[24px] bg-paper flex items-center justify-center mb-6">
                  <div className="w-2 h-2 bg-signal rounded-full"></div>
                </div>
                
                <div className="mono-tag text-signal mb-4">STEP_{step.num}</div>
                <h3 className="mb-2">{step.title}</h3>
                <div className="mono-tag text-muted mb-4 block">DURATION: {step.duration}</div>
                
                <div className="text-sm font-semibold text-ink/90 mb-1">You receive:</div>
                <p className="body text-sm text-ink/80">{step.receive}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-16 pt-8 border-t border-line-strong font-medium text-ink/90">
            If the pilot doesn't hit the agreed accuracy target, you don't continue to build.
          </div>
        </div>
      </section>

      <EngagementTiers />

      {/* H7: Credibility (Simplified) */}
      <section className="py-24 bg-paper">
        <div className="max-w-layout grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h3 className="mb-8">Engineering Artefacts</h3>
            <p className="body text-ink/80 mb-6 max-w-content">
              Buyers of technical work trust process artefacts more than praise. Download our standard scoping and acceptance documents.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 border border-line bg-white hover:bg-paper-sunk transition-colors cursor-pointer">
                <span className="mono-tag bg-paper px-2 py-1">PDF</span>
                <span className="font-medium flex-grow">Redacted Scoping Document</span>
                <span className="mono-tag text-muted">2.4MB</span>
              </div>
              <div className="flex items-center gap-4 p-4 border border-line bg-white hover:bg-paper-sunk transition-colors cursor-pointer">
                <span className="mono-tag bg-paper px-2 py-1">PDF</span>
                <span className="font-medium flex-grow">Acceptance Criteria Checklist</span>
                <span className="mono-tag text-muted">1.1MB</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="mb-8">Outcome examples</h3>
            <div className="space-y-4 mb-12">
              <div className="border-l-2 border-line-strong pl-4">
                <div className="font-medium">Tier-2 automotive supplier, Punjab</div>
                <div className="text-sm text-ink/70">8 weeks — 99.8% recall</div>
              </div>
              <div className="border-l-2 border-line-strong pl-4">
                <div className="font-medium">Global apparel distributor, Vietnam</div>
                <div className="text-sm text-ink/70">5 weeks — 99.9% count accuracy</div>
              </div>
              <div className="border-l-2 border-line-strong pl-4">
                <div className="font-medium">3PL Warehouse Provider, Texas</div>
                <div className="text-sm text-ink/70">10 weeks — 98.5% tracking accuracy</div>
              </div>
            </div>
            
            <div className="p-6 bg-paper-sunk border border-line-strong">
              <p className="body text-ink/90 italic font-medium">
                We're a small studio. You'll work directly with the engineers who build your system — the same two people, start to finish.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ClosingCTA />
    </>
  );
}
