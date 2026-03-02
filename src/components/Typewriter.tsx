"use client";

import { motion, Variants } from "framer-motion";

interface TypewriterProps {
  text: string;
  delay?: number;
  className?: string;
}

export default function Typewriter({ text, delay = 0, className = "" }: TypewriterProps) {
  const words = text.split(" ");
  let globalIndex = 0;

  const child: Variants = {
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        delay: delay + custom * 0.03, // Custom delay based on letter index
      },
    }),
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      className={`flex flex-wrap gap-x-2 md:gap-x-3 gap-y-1 ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-flex whitespace-nowrap">
          {Array.from(word).map((letter, letterIndex) => {
            const currentIndex = globalIndex++;
            return (
              <motion.span
                variants={child}
                custom={currentIndex}
                key={letterIndex}
                className="inline-block"
              >
                {letter}
              </motion.span>
            );
          })}
        </span>
      ))}
    </motion.div>
  );
}
