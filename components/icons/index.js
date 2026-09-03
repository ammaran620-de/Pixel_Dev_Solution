"use client";

import { useEffect, useRef, useState } from "react";
import { animate, stagger } from "animejs";

// HOC to handle drawSVG animation on scroll
function AnimatedSvgWrapper({ children, className, size, strokeWidth, ...props }) {
  const svgRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // Check reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    if (!svgRef.current) return;
    
    // Initially set all paths to hidden manually
    const paths = Array.from(svgRef.current.querySelectorAll("path, circle, rect"));
    paths.forEach(p => {
      const length = p.getTotalLength ? p.getTotalLength() : 100; // Fallback for simple elements
      p.style.strokeDasharray = length;
      p.style.strokeDashoffset = length;
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            
            animate(paths, {
              strokeDashoffset: 0,
              ease: "outCubic",
              duration: 1.2,
              delay: stagger(0.15, { start: 0.2 })
            });
            
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(svgRef.current);

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <svg 
      ref={svgRef}
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth={strokeWidth} 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className} 
      {...props}
    >
      {children}
    </svg>
  );
}

export function DefectIcon({ className = "", size = 24, strokeWidth = 1.5, ...props }) {
  return (
    <AnimatedSvgWrapper size={size} strokeWidth={strokeWidth} className={className} {...props}>
      <path d="M4 4h16v16H4z" />
      <path d="M8 8l2 2" />
      <path d="M14 12l2 -2" />
      <path d="M10 16l4 -2" />
      {/* Scanner reticle corners */}
      <path d="M2 6V2h4" />
      <path d="M22 6V2h-4" />
      <path d="M2 18v4h4" />
      <path d="M22 18v4h-4" />
    </AnimatedSvgWrapper>
  );
}

export function VerifyIcon({ className = "", size = 24, strokeWidth = 1.5, ...props }) {
  return (
    <AnimatedSvgWrapper size={size} strokeWidth={strokeWidth} className={className} {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M8 12l3 3l5 -5" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
    </AnimatedSvgWrapper>
  );
}

export function ReadIcon({ className = "", size = 24, strokeWidth = 1.5, ...props }) {
  return (
    <AnimatedSvgWrapper size={size} strokeWidth={strokeWidth} className={className} {...props}>
      <path d="M4 7V4h16v3" />
      <path d="M4 17v3h16v-3" />
      <path d="M9 10l3 -2l3 2" />
      <path d="M12 8v8" />
      <path d="M9 16h6" />
    </AnimatedSvgWrapper>
  );
}

export function DimensionIcon({ className = "", size = 24, strokeWidth = 1.5, ...props }) {
  return (
    <AnimatedSvgWrapper size={size} strokeWidth={strokeWidth} className={className} {...props}>
      <path d="M12 3l8 4.5v9L12 21l-8 -4.5v-9L12 3z" />
      <path d="M12 21v-9" />
      <path d="M4 7.5l8 4.5l8 -4.5" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="M12 2v2" />
    </AnimatedSvgWrapper>
  );
}

export function ZoneIcon({ className = "", size = 24, strokeWidth = 1.5, ...props }) {
  return (
    <AnimatedSvgWrapper size={size} strokeWidth={strokeWidth} className={className} {...props}>
      <path d="M3 21h18L12 3L3 21z" />
      <path d="M12 10v4" />
      <circle cx="12" cy="18" r="0.5" />
      <path d="M4 12l16 0" strokeDasharray="2 2" />
    </AnimatedSvgWrapper>
  );
}

export function SpeedIcon({ className = "", size = 24, strokeWidth = 1.5, ...props }) {
  return (
    <AnimatedSvgWrapper size={size} strokeWidth={strokeWidth} className={className} {...props}>
      <path d="M4 12l8 -8v16z" />
      <path d="M12 12l8 -8v16z" />
      <path d="M22 12h-2" />
      <path d="M2 12h2" />
    </AnimatedSvgWrapper>
  );
}
