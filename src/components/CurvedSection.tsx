"use client";

import { ReactNode } from "react";

interface CurvedSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export default function CurvedSection({ children, className = "", id }: CurvedSectionProps) {
  return (
    <div 
      id={id}
      className={`relative w-full z-20 border-t border-[var(--border-color)] rounded-t-[2.5rem] -mt-10 overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
}
