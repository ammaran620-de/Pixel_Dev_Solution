"use client";

import { useEffect, useRef, useState } from "react";
import { animate } from "animejs";

export default function MetricCounter({ 
  value, 
  decimals = 0, 
  duration = 1.5, 
  suffix = "", 
  className = "" 
}) {
  const nodeRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    // Check reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    if (prefersReducedMotion) {
      if (nodeRef.current) {
        nodeRef.current.innerHTML = value.toFixed(decimals);
      }
      return;
    }

    if (!nodeRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            
            const targetObj = { val: 0 };
            
            animate(targetObj, {
              val: value,
              round: decimals === 0 ? 1 : 10 ** decimals,
              duration: duration,
              ease: 'outExpo',
              update: function() {
                if (nodeRef.current) {
                  // For decimals, anime sets val to the closest step, but we need to format it properly
                  const formatted = Number(targetObj.val).toFixed(decimals);
                  nodeRef.current.innerHTML = formatted;
                }
              }
            });
            
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(nodeRef.current);

    return () => observer.disconnect();
  }, [value, decimals, duration, hasAnimated]);

  return (
    <span className={`inline-flex items-baseline ${className}`}>
      <span ref={nodeRef}>{Number(value).toFixed(decimals)}</span>
      {suffix && <span className={suffix === '%' || suffix === '°' ? '' : 'ml-1'}>{suffix}</span>}
    </span>
  );
}
