import { projects } from "@/content/projects";
import { notFound } from "next/navigation";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import ClipPlayer from "@/components/ClipPlayer";
import ClosingCTA from "@/components/ClosingCTA";
import MetricCounter from "@/components/MetricCounter";

export function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);
  if (!project) return {};

  return {
    title: `${project.name} Case Study`,
    description: project.line,
    openGraph: {
      images: [project.poster],
    }
  };
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const currentIndex = projects.findIndex(p => p.slug === slug);
  if (currentIndex === -1) notFound();

  const project = projects[currentIndex];
  const nextProject = projects[(currentIndex + 1) % projects.length];
  
  // Fallback outcomes for older case studies that haven't been updated
  const outcomes = project.outcomes || [
    { value: "0", label: "No data available" }
  ];

  return (
    <article className="pt-24 pb-0">
      <div className="max-w-layout mb-12">
        <Reveal>
          <Link href="/work" className="inline-flex items-center text-sm font-semibold text-ink/70 hover:text-signal transition-colors mb-12 group">
            <span className="mr-2 transition-transform group-hover:-translate-x-1">←</span> Back to work
          </Link>
          <h1 className="mb-4">{project.name}</h1>
          <p className="text-xl text-ink/80 max-w-content mb-8">{project.line}</p>
          
          <div className="flex flex-wrap gap-x-8 gap-y-4 py-6 border-y border-line">
            <div>
              <span className="mono-tag text-muted block mb-1">CLIENT</span>
              <span className="font-semibold">{project.clientType || project.industry}</span>
            </div>
            <div>
              <span className="mono-tag text-muted block mb-1">YEAR</span>
              <span className="font-semibold">{project.year}</span>
            </div>
            <div>
              <span className="mono-tag text-muted block mb-1">THROUGHPUT</span>
              <span className="font-semibold">{project.throughput || project.duration}</span>
            </div>
            {project.deployed && (
              <div>
                <span className="mono-tag text-muted block mb-1">STATUS</span>
                <span className="font-semibold text-signal flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-signal"></div>
                  In Production
                </span>
              </div>
            )}
          </div>
        </Reveal>
      </div>

      {/* Hero Media (ClipPlayer) */}
      <Reveal delay={0.1}>
        <div className="w-full max-w-[1400px] mx-auto px-6 mb-24">
          <div className="aspect-video w-full bg-ink rounded-sm overflow-hidden border border-line">
            <ClipPlayer clipId={project.slug} priority={true} />
          </div>
        </div>
      </Reveal>

      {/* H3: Measured Results */}
      <Reveal>
        <section className="bg-paper-sunk py-16 border-y border-line-strong mb-24">
          <div className="max-w-layout grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
            {outcomes.map((outcome, idx) => {
              // Extremely simple heuristic to parse out numbers and strings for the counter
              // e.g. "99.8%" -> value=99.8, suffix="%"
              const match = outcome.value.match(/([\d.]+)(.*)/);
              let val = parseFloat(outcome.value);
              let suffix = outcome.value;
              let isNumber = false;
              let decimals = 0;
              
              if (match && !isNaN(parseFloat(match[1]))) {
                val = parseFloat(match[1]);
                suffix = match[2];
                isNumber = true;
                if (match[1].includes('.')) {
                  decimals = match[1].split('.')[1].length;
                }
              }

              return (
                <div key={idx} className="flex flex-col md:border-r border-line-strong pr-4 last:border-0">
                  <div className="metric">
                    {isNumber ? (
                      <MetricCounter value={val} decimals={decimals} suffix={suffix} duration={1500} />
                    ) : (
                      outcome.value
                    )}
                  </div>
                  <div className="body text-sm text-muted mt-2 max-w-[140px] uppercase">{outcome.label}</div>
                </div>
              );
            })}
          </div>
        </section>
      </Reveal>

      <div className="max-w-layout space-y-24 mb-24">
        {/* H5: Sequence for Methodology */}
        <section className="space-y-12 max-w-3xl">
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-[100px_1fr] gap-4 items-baseline">
              <div className="mono-tag text-muted">STEP_01</div>
              <div>
                <h2 className="text-xl font-bricolage mb-4">The Problem</h2>
                <div className="text-lg whitespace-pre-wrap text-ink/90">
                  {project.problem}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-[100px_1fr] gap-4 items-baseline">
              <div className="mono-tag text-muted">STEP_02</div>
              <div>
                <h2 className="text-xl font-bricolage mb-4">The Constraint</h2>
                <div className="text-lg whitespace-pre-wrap text-ink/90">
                  {project.constraint}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-[100px_1fr] gap-4 items-baseline">
              <div className="mono-tag text-muted">STEP_03</div>
              <div>
                <h2 className="text-xl font-bricolage mb-4">What We Built</h2>
                <div className="text-lg whitespace-pre-wrap text-ink/90">
                  {project.built}
                </div>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Screenshots */}
        {project.screenshots && project.screenshots.length > 0 && (
          <Reveal>
            <section className="space-y-12">
              {project.screenshots.map((shot, i) => (
                <div key={i} className="flex flex-col">
                  {/* Strict hard edges and 1px borders, no drop shadows */}
                  <img src={shot.src} alt={shot.caption} className="w-full border border-line bg-white mb-4 rounded-sm" />
                  <span className="mono-tag text-muted text-center uppercase">{shot.caption}</span>
                </div>
              ))}
            </section>
          </Reveal>
        )}

        {/* Client Quote */}
        {project.quote && (
          <Reveal>
            <blockquote className="border-l-[1.5px] border-signal pl-6 max-w-content text-xl italic text-ink/90">
              "{project.quote.text}"
              <footer className="mt-4 text-sm font-semibold not-italic text-muted uppercase tracking-wide">
                — {project.quote.author}
              </footer>
            </blockquote>
          </Reveal>
        )}

        {/* Stack Tags */}
        <Reveal>
          <div className="flex flex-wrap gap-2 pt-12 border-t border-line">
            <span className="mono-tag text-muted mr-4 flex items-center">TECH_STACK</span>
            {project.stack.map(tech => (
              <span key={tech} className="bg-paper border border-line px-3 py-1 text-xs font-semibold rounded-sm">
                {tech}
              </span>
            ))}
          </div>
        </Reveal>
      </div>

      <div className="max-w-layout mb-24">
        <Reveal>
          <Link href={`/work/${nextProject.slug}`} className="group block bg-white border border-line p-8 rounded-sm hover:border-signal/50 transition-colors">
            <span className="mono-tag text-muted mb-2 block uppercase">Next Case Study</span>
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bricolage group-hover:text-signal transition-colors">{nextProject.name}</h3>
            </div>
          </Link>
        </Reveal>
      </div>

      <ClosingCTA />
    </article>
  );
}
