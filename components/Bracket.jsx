"use client";

import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";

export default function Bracket({ active = false, children, className = "" }) {
  const cornerOffset = 12;

  const variants = {
    tl: {
      inactive: { opacity: 0, x: -cornerOffset, y: -cornerOffset },
      active: { opacity: 1, x: 0, y: 0 }
    },
    tr: {
      inactive: { opacity: 0, x: cornerOffset, y: -cornerOffset },
      active: { opacity: 1, x: 0, y: 0 }
    },
    bl: {
      inactive: { opacity: 0, x: -cornerOffset, y: cornerOffset },
      active: { opacity: 1, x: 0, y: 0 }
    },
    br: {
      inactive: { opacity: 0, x: cornerOffset, y: cornerOffset },
      active: { opacity: 1, x: 0, y: 0 }
    }
  };

  const springTransition = { 
    type: "spring", 
    stiffness: 400, 
    damping: 24, 
    mass: 0.8 
  };

  return (
    <div className={`relative group ${className}`}>
      {/* Top Left */}
      <motion.div
        initial="inactive"
        animate={active ? "active" : "inactive"}
        variants={variants.tl}
        transition={springTransition}
        className="absolute -top-2 -left-2 w-4 h-4 border-t-[1.5px] border-l-[1.5px] border-signal pointer-events-none z-10"
      />
      {/* Top Right */}
      <motion.div
        initial="inactive"
        animate={active ? "active" : "inactive"}
        variants={variants.tr}
        transition={springTransition}
        className="absolute -top-2 -right-2 w-4 h-4 border-t-[1.5px] border-r-[1.5px] border-signal pointer-events-none z-10"
      />
      {/* Bottom Left */}
      <motion.div
        initial="inactive"
        animate={active ? "active" : "inactive"}
        variants={variants.bl}
        transition={springTransition}
        className="absolute -bottom-2 -left-2 w-4 h-4 border-b-[1.5px] border-l-[1.5px] border-signal pointer-events-none z-10"
      />
      {/* Bottom Right */}
      <motion.div
        initial="inactive"
        animate={active ? "active" : "inactive"}
        variants={variants.br}
        transition={springTransition}
        className="absolute -bottom-2 -right-2 w-4 h-4 border-b-[1.5px] border-r-[1.5px] border-signal pointer-events-none z-10"
      />
      
      {children}
    </div>
  );
}
