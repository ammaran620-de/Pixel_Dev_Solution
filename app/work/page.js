"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { projects } from "@/content/projects";
import ClipPlayer from "@/components/ClipPlayer";
import Bracket from "@/components/Bracket";
import Reveal from "@/components/Reveal";

// Derive unique industries
const industries = ["All", ...new Set(projects.map(p => p.industry))];

function WorkGallery() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const filterParam = searchParams.get("filter") || "All";
  
  const [activeFilter, setActiveFilter] = useState(filterParam);

  useEffect(() => {
    if (filterParam !== activeFilter) {
      setActiveFilter(filterParam);
    }
  }, [filterParam]);

  const setFilter = (industry) => {
    setActiveFilter(industry);
    if (industry === "All") {
      router.push("/work");
    } else {
      router.push(`/work?filter=${encodeURIComponent(industry)}`);
    }
  };

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(p => p.industry === activeFilter);

  const displayProjects = filteredProjects.length > 0 ? filteredProjects : projects;

  return (
    <>
      {/* Filter Pills */}
      <Reveal delay={0.1}>
        <div className="flex flex-wrap gap-2 mb-12">
          {industries.map(ind => {
            const isActive = activeFilter === ind;
            return (
              <button
                key={ind}
                onClick={() => setFilter(ind)}
                className={`relative px-4 py-2 rounded-sm text-sm font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-2 ${
                  isActive ? "text-white" : "text-ink hover:bg-paper-sunk"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="filterPill"
                    className="absolute inset-0 bg-signal rounded-sm"
                    initial={false}
                    transition={{ type: "spring", stiffness: 400, damping: 28 }}
                  />
                )}
                <span className="relative z-10">{ind}</span>
              </button>
            );
          })}
        </div>
      </Reveal>

      {/* Empty State warning */}
      {filteredProjects.length === 0 && (
        <Reveal>
          <div className="bg-alert/10 text-alert p-4 rounded border border-alert/20 mb-8">
            <p>No projects in this category yet. Here is everything instead. <button onClick={() => setFilter("All")} className="underline font-semibold ml-2">Reset filter</button></p>
          </div>
        </Reveal>
      )}

      {/* Grid 3/2/1 */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {displayProjects.map((project) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={project.slug}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

function ProjectCard({ project }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link 
      href={`/work/${project.slug}`}
      className="block group h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-4 rounded"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      <Bracket active={isHovered} className="h-full flex flex-col bg-white border border-line rounded overflow-hidden">
        <div className="aspect-video relative bg-ink shrink-0">
          <ClipPlayer clipId={project.slug} />
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bricolage text-lg leading-tight group-hover:text-signal transition-colors">{project.name}</h3>
            <span className="mono-tag text-muted bg-paper px-2 py-0.5 rounded">{project.year}</span>
          </div>
          <div className="text-sm text-ink/70 mb-4">{project.industry}</div>
          <div className="mt-auto pt-4 border-t border-line/50 font-medium text-signal">
            {project.metric}
          </div>
        </div>
      </Bracket>
    </Link>
  );
}

export default function WorkPage() {
  return (
    <div className="max-w-layout pt-24 pb-24">
      <Reveal>
        <h1 className="mb-4">Selected Work</h1>
        <p className="text-lg text-ink/80 max-w-content mb-12">
          Systems deployed in real factory conditions.
        </p>
      </Reveal>
      
      <Suspense fallback={<div>Loading portfolio...</div>}>
        <WorkGallery />
      </Suspense>
    </div>
  );
}
