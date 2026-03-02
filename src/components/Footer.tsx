import Magnetic from "@/components/Magnetic";

export default function Footer() {
  return (
    <footer className="w-full bg-[var(--bg-primary)] text-[var(--text-primary)] px-6 md:px-12 py-12 flex flex-col items-center justify-center border-t border-[var(--border-color)] pb-24 relative z-10">
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-[50px] md:text-[72px] font-medium tracking-[-2px] md:tracking-[-4.32px] leading-none uppercase mb-2">Ayush Gupta</h2>
            <p className="text-[var(--text-secondary)] font-mono">Creative Developer & AI Student</p>
          </div>
          
          <div className="flex gap-8 text-[var(--text-secondary)] font-mono uppercase tracking-widest text-sm">
            <Magnetic><a href="https://www.linkedin.com/in/ayushkathil" target="_blank" rel="noreferrer" className="block hover:text-[var(--text-primary)] transition-colors">LinkedIn</a></Magnetic>
            <Magnetic><a href="https://github.com/Ayush-kathil" target="_blank" rel="noreferrer" className="block hover:text-[var(--text-primary)] transition-colors">GitHub</a></Magnetic>
          </div>
        </div>
        
        <div className="w-full max-w-7xl mx-auto mt-16 text-center text-[var(--text-secondary)] font-mono text-xs uppercase tracking-widest pb-8">
          &copy; {new Date().getFullYear()} Ayush Gupta. All rights reserved.
        </div>
      </footer>
  );
}
