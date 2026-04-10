"use client";

import { ReactNode, useRef } from "react";

interface CardSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export default function CardSection({ children, className = "", id }: CardSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={containerRef}
      id={id}
      className={`relative w-full z-20 border-t border-[var(--border-color)] rounded-t-[2.5rem] -mt-10 overflow-hidden shadow-2xl ${className}`}
    >
      {children}
    </div>
  );
}
