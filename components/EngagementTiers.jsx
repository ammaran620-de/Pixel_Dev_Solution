import { site } from "@/content/site";

export default function EngagementTiers() {
  const tiers = [
    { id: "pilot", ...site.engagement.pilot },
    { id: "build", ...site.engagement.build, featured: true },
    { id: "support", ...site.engagement.support }
  ];

  return (
    <section className="py-24 bg-paper">
      <div className="max-w-layout">
        <h2 className="mb-12">Engagement and pricing</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-b border-line-strong">
          {tiers.map((tier, idx) => (
            <div 
              key={tier.id}
              className={`group relative p-8 flex flex-col min-h-[320px] transition-colors duration-200 border-b md:border-b-0 border-line-strong ${idx !== 2 ? 'md:border-r' : ''} ${tier.featured ? 'bg-paper-sunk' : 'bg-paper hover:bg-paper-sunk'}`}
            >
              {/* Simulated drawn top border on hover */}
              <div className="absolute top-0 left-0 h-[2px] bg-signal w-0 group-hover:w-full transition-all duration-300"></div>
              
              <div className="mb-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="h3 text-ink">{tier.label}</h3>
                  {tier.featured && (
                    <span className="mono-tag text-signal bg-signal/10 px-2 py-0.5 rounded">MOST PROJECTS</span>
                  )}
                </div>
                <div className="mono-tag text-muted block mb-1">DURATION: {tier.duration}</div>
                <div className="text-2xl font-bricolage font-bold text-ink">{tier.price}</div>
              </div>
              
              <div className="mt-auto">
                <div className="text-sm font-semibold text-ink/90 mb-2">You receive:</div>
                <p className="body text-ink/80 text-sm">
                  {tier.scope}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8">
          <p className="body text-muted text-sm">Fixed scope, fixed price. We quote after the scoping week, not before.</p>
        </div>
      </div>
    </section>
  );
}
