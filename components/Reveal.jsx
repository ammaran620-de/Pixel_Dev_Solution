"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE, DUR } from "@/lib/motion";

export default function Reveal({ children, className = "", delay = 0, variant = "slide", once = true }) {
  const shouldReduceMotion = useReducedMotion();

  const variants = {
    slide: {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 }
    },
    scale: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 }
    }
  };

  const selectedVariant = variants[variant] || variants.slide;

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once, margin: "-40px" }}
      variants={selectedVariant}
      transition={{ 
        duration: DUR.base, 
        ease: EASE.out,
        delay
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
