"use client";

import { motion } from "framer-motion";

export default function WavyBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-[0.05]">
      <motion.svg
        className="absolute w-[200vw] h-full"
        viewBox="0 0 1000 1000"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        animate={{ x: [0, "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
      >
        <path
          d="M0,500 C150,400 350,600 500,500 C650,400 850,600 1000,500 L1000,1000 L0,1000 Z"
          fill="none"
          stroke="var(--text-primary)"
          strokeWidth="2"
        />
        <path
          d="M0,600 C150,500 350,700 500,600 C650,500 850,700 1000,600 L1000,1000 L0,1000 Z"
          fill="none"
          stroke="var(--text-primary)"
          strokeWidth="1"
        />
        <path
          d="M0,400 C150,300 350,500 500,400 C650,300 850,500 1000,400 L1000,1000 L0,1000 Z"
          fill="none"
          stroke="var(--text-primary)"
          strokeWidth="0.5"
        />
      </motion.svg>
    </div>
  );
}
