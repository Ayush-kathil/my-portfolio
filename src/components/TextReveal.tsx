"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface TextRevealProps {
  children: ReactNode;
  delay?: number;
}

export default function TextReveal({ children, delay = 0 }: TextRevealProps) {
  // If children is a string, we split it into words for a premium staggered reveal
  if (typeof children === "string") {
    const words = children.split(" ");
    
    return (
      <span className="flex flex-wrap items-center">
        {words.map((word, i) => (
          <span key={i} className="overflow-hidden inline-block mr-[0.25em]">
            <motion.span
              className="inline-block"
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ 
                duration: 0.6, 
                ease: [0.22, 1, 0.36, 1], 
                delay: delay + (i * 0.04) 
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </span>
    );
  }

  // Fallback for non-string, single block reveal
  return (
    <div className="overflow-hidden inline-block align-bottom w-full">
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}
