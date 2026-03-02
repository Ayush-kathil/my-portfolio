"use client";

import { useState, useRef, useEffect } from "react";
import { Mail, Phone } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Slide-and-Fade Classical Transition for Text
      if (leftColRef.current) {
        gsap.fromTo(leftColRef.current.children, 
          { x: -50, opacity: 0 },
          { x: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out", scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          }}
        );
      }
      
      // Slide-and-Fade Classical Transition for Form Fields
      if (formRef.current) {
        gsap.fromTo(formRef.current.children, 
          { x: 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out", scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          }}
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.message) newErrors.message = "Message is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setStatus("submitting");
    // Simulate API call
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    }, 1500);
  };

  return (
    <section ref={sectionRef} id="contact" className="w-full bg-[var(--bg-primary)] text-[var(--text-primary)] px-6 md:px-12 py-32 overflow-hidden relative z-20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 justify-between">
        
        <div ref={leftColRef} className="lg:w-1/2">
          <h2 className="text-[50px] md:text-[72px] font-medium tracking-[-2px] md:tracking-[-4.32px] leading-none uppercase mb-8">
            Get In Touch
          </h2>
          <p className="text-xl md:text-2xl font-light text-[var(--text-secondary)] mb-12">
            Looking for a summer internship or open to exciting collaboration opportunities.
          </p>
          
          <div className="space-y-6">
            <a href="mailto:kathilshiva@gmail.com" className="flex items-center gap-6 text-xl md:text-3xl font-mono uppercase hover:text-[var(--text-secondary)] transition-colors group">
              <Mail className="w-8 h-8 group-hover:scale-110 transition-transform" /> kathilshiva@gmail.com
            </a>
            <a href="tel:7007226872" className="flex items-center gap-6 text-xl md:text-3xl font-mono uppercase hover:text-[var(--text-secondary)] transition-colors group">
              <Phone className="w-8 h-8 group-hover:scale-110 transition-transform" /> 7007226872
            </a>
          </div>
        </div>

        <div className="lg:w-1/2 mt-12 lg:mt-0">
          <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-8 w-full max-w-2xl" suppressHydrationWarning>
            <div className="flex flex-col border-b-2 border-[var(--text-primary)] relative opacity-50 focus-within:opacity-100 transition-opacity" suppressHydrationWarning>
              <input 
                type="text" 
                placeholder="YOUR NAME" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-transparent text-xl md:text-2xl py-4 flex-1 outline-none text-[var(--text-primary)] placeholder-[var(--text-primary)]"
                suppressHydrationWarning
              />
              {errors.name && <span className="text-red-500 font-mono text-xs uppercase absolute bottom-0 right-0">{errors.name}</span>}
            </div>

            <div className="flex flex-col border-b-2 border-[var(--text-primary)] relative opacity-50 focus-within:opacity-100 transition-opacity" suppressHydrationWarning>
              <input 
                type="email" 
                placeholder="YOUR EMAIL" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-transparent text-xl md:text-2xl py-4 flex-1 outline-none text-[var(--text-primary)] placeholder-[var(--text-primary)]"
                suppressHydrationWarning
              />
              {errors.email && <span className="text-red-500 font-mono text-xs uppercase absolute bottom-0 right-0">{errors.email}</span>}
            </div>

            <div className="flex flex-col border-b-2 border-[var(--text-primary)] relative opacity-50 focus-within:opacity-100 transition-opacity" suppressHydrationWarning>
              <textarea 
                placeholder="YOUR MESSAGE" 
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-transparent text-xl md:text-2xl py-4 flex-1 outline-none text-[var(--text-primary)] placeholder-[var(--text-primary)] resize-none"
                suppressHydrationWarning
              />
              {errors.message && <span className="text-red-500 font-mono text-xs uppercase absolute bottom-4 right-0">{errors.message}</span>}
            </div>

            <button 
              type="submit" 
              disabled={status === "submitting" || status === "success"}
              className="mt-8 border-2 border-[var(--text-primary)] bg-transparent text-[var(--text-primary)] font-bold uppercase tracking-widest text-lg w-full py-6 hover:bg-[var(--text-primary)] hover:text-[var(--bg-secondary)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              suppressHydrationWarning
            >
              {status === "submitting" ? "SENDING..." : status === "success" ? "TRANSMITTED!" : "SEND MESSAGE"}
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
