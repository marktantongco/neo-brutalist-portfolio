"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ═══════════════════════════════════════════════════════════════════════════
// SCROLL PROGRESS — BRUTALIST METER
// ═══════════════════════════════════════════════════════════════════════════

export function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    if (!progressRef.current) return;
    
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      
      if (progressRef.current) {
        progressRef.current.style.width = `${progress}%`;
      }
      if (textRef.current) {
        textRef.current.textContent = `${Math.floor(progress)}%`;
      }
    };
    
    window.addEventListener("scroll", updateProgress);
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);
  
  return (
    <div className="fixed top-16 left-0 right-0 z-40 h-1 bg-[#111] border-b-2 border-[#FFEA00]/30">
      <div
        ref={progressRef}
        className="h-full bg-[#FFEA00] transition-all duration-75"
        style={{ width: "0%", boxShadow: "0 0 20px rgba(255, 234, 0, 0.5)" }}
      />
      <span
        ref={textRef}
        className="absolute right-4 -top-6 text-xs font-mono text-[#FFEA00]"
      >
        0%
      </span>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// VHS NOISE OVERLAY — RETR CORRUPTION
// ═══════════════════════════════════════════════════════════════════════════

export function VHSOverlay() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[9998] overflow-hidden">
      {/* Scan lines */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 0, 0, 0.3) 2px,
            rgba(0, 0, 0, 0.3) 4px
          )`,
        }}
      />
      
      {/* Moving scan line */}
      <div
        className="absolute left-0 right-0 h-[2px] bg-[#FFEA00]/10 animate-scan"
        style={{
          animation: "scan 8s linear infinite",
        }}
      />
      
      {/* Static noise */}
      <div
        className="absolute inset-0 opacity-[0.02] animate-noise"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Corner glitch frames */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-[#FFEA00]/20 animate-pulse" />
      <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-[#FFEA00]/20 animate-pulse" style={{ animationDelay: "0.5s" }} />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-[#FFEA00]/20 animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-[#FFEA00]/20 animate-pulse" style={{ animationDelay: "1.5s" }} />
      
      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(-100vh); }
          100% { transform: translateY(100vh); }
        }
        @keyframes noise {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-1%, -1%); }
          20% { transform: translate(1%, 1%); }
          30% { transform: translate(-1%, 1%); }
          40% { transform: translate(1%, -1%); }
          50% { transform: translate(-1%, 0); }
          60% { transform: translate(1%, 0); }
          70% { transform: translate(0, 1%); }
          80% { transform: translate(0, -1%); }
          90% { transform: translate(1%, 1%); }
        }
      `}</style>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// INFINITE MARQUEE — BRUTALIST TICKER
// ═══════════════════════════════════════════════════════════════════════════

interface MarqueeProps {
  items: string[];
  speed?: number;
  direction?: "left" | "right";
  className?: string;
}

export function InfiniteMarquee({ items, speed = 30, direction = "left", className = "" }: MarqueeProps) {
  const marqueeRef = useRef<HTMLDivElement>(null);
  
  // Duplicate items for seamless loop
  const duplicatedItems = [...items, ...items, ...items];
  
  useEffect(() => {
    if (!marqueeRef.current) return;
    
    const marquee = marqueeRef.current;
    const content = marquee.firstElementChild as HTMLElement;
    
    if (!content) return;
    
    const contentWidth = content.offsetWidth;
    const duration = contentWidth / speed;
    
    gsap.to(content, {
      x: direction === "left" ? -contentWidth / 3 : contentWidth / 3,
      duration,
      ease: "none",
      repeat: -1,
    });
  }, [speed, direction]);
  
  return (
    <div ref={marqueeRef} className={`overflow-hidden ${className}`}>
      <div className="flex gap-8 whitespace-nowrap">
        {duplicatedItems.map((item, i) => (
          <span
            key={i}
            className="text-[#FFEA00] font-bold uppercase tracking-widest text-sm md:text-base px-4 py-2 border-2 border-[#FFEA00]/30 hover:border-[#FFEA00] hover:bg-[#FFEA00] hover:text-black transition-colors cursor-default"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// FLOATING ACTION BUTTONS — MAGNETIC CONTROLS
// ═══════════════════════════════════════════════════════════════════════════

interface FloatingActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  href?: string;
}

export function FloatingActionButton({ icon, label, onClick, href }: FloatingActionButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(button, {
        x: x * 0.4,
        y: y * 0.4,
        duration: 0.2,
        ease: "power2.out",
      });
    };
    
    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.3)",
      });
    };
    
    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);
  
  const content = (
    <div
      ref={buttonRef}
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Label tooltip */}
      <div
        className={`
          absolute right-full mr-3 top-1/2 -translate-y-1/2
          px-3 py-1 bg-black border-2 border-[#FFEA00] text-[#FFEA00]
          text-xs font-bold uppercase tracking-wider whitespace-nowrap
          transition-all duration-200
          ${isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"}
        `}
      >
        {label}
      </div>
      
      {/* Button */}
      <div className="w-12 h-12 bg-black border-4 border-[#FFEA00] flex items-center justify-center shadow-[4px_4px_0_#FFEA00] group-hover:shadow-[6px_6px_0_#FFEA00] group-hover:translate-x-[-2px] group-hover:translate-y-[-2px] transition-all duration-150">
        <div className="text-[#FFEA00] group-hover:scale-110 transition-transform">
          {icon}
        </div>
      </div>
    </div>
  );
  
  if (href) {
    return <a href={href} target="_blank" rel="noopener noreferrer">{content}</a>;
  }
  
  return content;
}

// ═══════════════════════════════════════════════════════════════════════════
// FLOATING ACTIONS PANEL
// ═══════════════════════════════════════════════════════════════════════════

export function FloatingActions() {
  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4">
      <FloatingActionButton
        icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>}
        label="Back to Top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      />
      <FloatingActionButton
        icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>}
        label="Contact"
        href="#contact"
      />
      <FloatingActionButton
        icon={<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>}
        label="GitHub"
        href="https://github.com"
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// CODE SNIPPET — BRUTALIST SYNTAX
// ═══════════════════════════════════════════════════════════════════════════

interface CodeSnippetProps {
  code: string;
  language?: string;
  title?: string;
}

export function CodeSnippet({ code, language = "typescript", title }: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  // Simple syntax highlighting
  const highlightCode = (code: string) => {
    return code
      .replace(/(\/\/.*)/g, '<span class="text-[#666]">$1</span>')
      .replace(/\b(const|let|var|function|return|if|else|for|while|import|export|from|default|class|extends|new|this)\b/g, '<span class="text-[#FFEA00] font-bold">$1</span>')
      .replace(/\b(true|false|null|undefined)\b/g, '<span class="text-[#FF0033]">$1</span>')
      .replace(/(["'`].*?["'`])/g, '<span class="text-[#00FF66]">$1</span>')
      .replace(/\b(\d+)\b/g, '<span class="text-[#FFEA00]/70">$1</span>');
  };
  
  return (
    <div className="bg-[#0a0a0a] border-4 border-[#FFEA00] shadow-[8px_8px_0_#FFEA00]">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-2 bg-[#FFEA00] border-b-4 border-black">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-black rounded-full" />
          <div className="w-3 h-3 bg-black rounded-full" />
          <div className="w-3 h-3 bg-black rounded-full" />
        </div>
        {title && <span className="text-black font-bold text-sm uppercase tracking-wider">{title}</span>}
        <button
          onClick={handleCopy}
          className="px-3 py-1 bg-black text-[#FFEA00] text-xs font-bold uppercase hover:bg-[#FFEA00] hover:text-black transition-colors"
        >
          {copied ? "COPIED!" : "COPY"}
        </button>
      </div>
      
      {/* Code */}
      <pre className="p-4 overflow-x-auto text-sm font-mono text-white/90 leading-relaxed">
        <code dangerouslySetInnerHTML={{ __html: highlightCode(code) }} />
      </pre>
      
      {/* Language tag */}
      <div className="px-4 py-1 bg-black border-t-2 border-[#FFEA00]/30">
        <span className="text-[#FFEA00]/50 text-xs font-mono uppercase">{language}</span>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// KEYBOARD SHORTCUT HINT
// ═══════════════════════════════════════════════════════════════════════════

export function KeyboardHint() {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "?" || (e.shiftKey && e.key === "/")) {
        setVisible(prev => !prev);
      }
      if (e.key === "Escape") {
        setVisible(false);
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  
  if (!visible) return null;
  
  const shortcuts = [
    { key: "?", action: "Toggle shortcuts" },
    { key: "↑", action: "Scroll up" },
    { key: "↓", action: "Scroll down" },
    { key: "Home", action: "Back to top" },
    { key: "End", action: "Go to bottom" },
    { key: "P", action: "Projects section" },
    { key: "S", action: "Skills section" },
    { key: "C", action: "Contact section" },
  ];
  
  return (
    <div className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4" onClick={() => setVisible(false)}>
      <div className="bg-[#0a0a0a] border-4 border-[#FFEA00] shadow-[12px_12px_0_#FFEA00] p-8 max-w-md" onClick={e => e.stopPropagation()}>
        <h3 className="text-huge text-[#FFEA00] mb-6">SHORTCUTS</h3>
        <div className="space-y-3">
          {shortcuts.map(({ key, action }) => (
            <div key={key} className="flex justify-between items-center gap-4">
              <span className="text-white/70">{action}</span>
              <kbd className="px-3 py-1 bg-[#FFEA00] text-black font-bold text-sm border-2 border-black">
                {key}
              </kbd>
            </div>
          ))}
        </div>
        <p className="text-[#FFEA00]/50 text-sm mt-6 text-center">Press ESC or click anywhere to close</p>
      </div>
    </div>
  );
}
