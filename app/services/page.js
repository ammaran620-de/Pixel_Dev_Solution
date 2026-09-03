import { projects } from "@/content/projects";
import Link from "next/link";
import ClipPlayer from "@/components/ClipPlayer";
import ClosingCTA from "@/components/ClosingCTA";

function ServiceProjectCard({ project }) {
  return (
    <Link href={`/work/${project.slug}`} className="block group focus:outline-none focus-visible:ring-2 focus-visible:ring-signal rounded border border-line-strong bg-white">
      <div className="bg-white overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg">
        <div className="aspect-[4/3] relative bg-ink shrink-0 overflow-hidden">
          <div className="w-full h-full transform group-hover:scale-105 transition-transform duration-700">
            <ClipPlayer clipId={project.slug} />
          </div>
        </div>
        <div className="p-4 border-t border-line bg-paper">
          <h4 className="font-bricolage text-base leading-tight group-hover:text-signal transition-colors">{project.name}</h4>
          <span className="mono-tag text-muted mt-1 block">{project.industry}</span>
        </div>
      </div>
    </Link>
  );
}

export const metadata = {
  title: "Services",
  description: "Computer vision and web platforms for manufacturers.",
};

export default function ServicesPage() {
  const visionProjects = projects.filter(p => p.industry !== "Logistics" && p.industry !== "Retail security").slice(0, 3);
  const platformProjects = projects.filter(p => p.industry === "Logistics" || p.industry === "Retail security" || p.industry === "Transport").slice(0, 3);
  
  return (
    <div className="pt-24 bg-paper">
      <div className="max-w-layout mb-24 relative">
        <h1 className="mb-6 h1">We build vision models that solve factory problems.</h1>
        <p className="body text-xl text-ink/80 max-w-content">
          Software that sees like you do, deployed on the edge.
        </p>
      </div>

      <section className="border-t border-line py-24 bg-paper relative">
        <div className="max-w-layout relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="mono-tag text-signal bg-signal/10 px-2 py-1 rounded border border-signal/20">CORE_SERVICE</span>
                <h2 className="h2">Computer Vision</h2>
              </div>
              
              <div className="space-y-6 body text-lg text-ink/90 max-w-content mb-12">
                <p>
                  We train models to detect defects on fast-moving assembly lines, count items accurately, and measure dimensions without physical contact.
                </p>
                <p>
                  This isn't about lab accuracy; it's about factory reliability. We optimize our models using TensorRT to run smoothly on edge devices like the Jetson Orin directly on your floor, integrating with your existing PLCs and cameras.
                </p>
              </div>
              
              <div className="mb-12 p-6 bg-paper-sunk rounded border border-line shadow-inner">
                <h4 className="mono-tag text-muted mb-4 block">THE STACK</h4>
                <div className="flex flex-wrap gap-2">
                  {["PyTorch", "TensorRT", "YOLO", "OpenCV", "CUDA", "Python"].map(t => (
                    <span key={t} className="bg-paper border border-line-strong px-3 py-1.5 text-sm font-medium hover:bg-white transition-colors">{t}</span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="lg:border-l lg:border-line lg:pl-16">
              <h4 className="mono-tag text-muted mb-6 block">EXAMPLE CV PROJECTS</h4>
              <div className="space-y-6">
                {visionProjects.map(p => <ServiceProjectCard key={p.slug} project={p} />)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service 2: Web Platforms (Demoted to subsection) */}
      <section className="border-t border-line-strong py-24 bg-paper-sunk relative">
        <div className="max-w-layout relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="mono-tag text-muted bg-line px-2 py-1 rounded border border-line-strong">SUB_SERVICE</span>
                <h3 className="h3">Web Platforms</h3>
              </div>
              <p className="font-medium mb-6 text-ink">Dashboards that make sense of the data.</p>
              <div className="space-y-6 body text-ink/80 max-w-content mb-12">
                <p>
                  A vision model is useless if the operators can't see what it's doing. We build secure, real-time web applications to monitor your factory floor.
                </p>
                <p>
                  We aggregate data across multiple edge nodes, stream video feeds via WebSockets, and trigger automated alerts when metrics fall outside of control limits. Everything is accessible from a secure browser window.
                </p>
              </div>
            </div>
            
            <div className="lg:border-l lg:border-line lg:pl-16">
              <h4 className="mono-tag text-muted mb-6 block">EXAMPLE PLATFORM PROJECTS</h4>
              <div className="space-y-6">
                {platformProjects.map(p => <ServiceProjectCard key={p.slug} project={p} />)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ClosingCTA />
    </div>
  );
}
