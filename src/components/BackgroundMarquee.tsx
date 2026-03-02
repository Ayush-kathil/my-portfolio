"use client";

import { motion } from "framer-motion";

interface BackgroundMarqueeProps {
  text: string;
  speed?: number;
}

export default function BackgroundMarquee({ text, speed = 20 }: BackgroundMarqueeProps) {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden flex flex-col justify-center pointer-events-none select-none opacity-[0.03]">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: [0, -2000] }}
        transition={{ repeat: Infinity, ease: "linear", duration: speed }}
      >
        <span className="text-[30vw] font-bold uppercase tracking-tighter leading-none mr-16">
          {text} - {text} - {text} - {text} - 
        </span>
      </motion.div>
    </div>
  );
}
