"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

// ═══════════════════════════════════════════════════════════════════════════
// ELECTRIC CURSOR — PREDATOR GAZE
// Custom cursor with magnetic attraction and electric trail
// ═══════════════════════════════════════════════════════════════════════════

export function ElectricCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  
  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorDot) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Dot follows instantly
      gsap.set(cursorDot, {
        x: mouseX,
        y: mouseY,
      });
    };
    
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    
    // Magnetic hover detection
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("button, a, .magnetic")) {
        setIsHovering(true);
      }
    };
    
    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("button, a, .magnetic")) {
        setIsHovering(false);
      }
    };
    
    // Animate cursor ring with lag
    const animateCursor = () => {
      const dx = mouseX - cursorX;
      const dy = mouseY - cursorY;
      
      cursorX += dx * 0.15;
      cursorY += dy * 0.15;
      
      gsap.set(cursor, {
        x: cursorX,
        y: cursorY,
      });
      
      requestAnimationFrame(animateCursor);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);
    animateCursor();
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);
  
  return (
    <>
      {/* Main cursor ring */}
      <div
        ref={cursorRef}
        className={`
          fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2
          hidden md:block transition-transform duration-100
          ${isClicking ? "scale-75" : "scale-100"}
        `}
      >
        <div
          className={`
            w-10 h-10 border-2 border-[#FFEA00] rounded-full
            transition-all duration-150
            ${isHovering ? "w-16 h-16 bg-[#FFEA00]/10 border-[#FFEA00]" : ""}
          `}
          style={{
            boxShadow: `0 0 20px rgba(255, 234, 0, 0.5), 0 0 40px rgba(255, 234, 0, 0.2)`,
          }}
        />
      </div>
      
      {/* Cursor dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block"
      >
        <div
          className={`
            w-2 h-2 bg-[#FFEA00] rounded-full
            transition-all duration-75
            ${isHovering ? "w-3 h-3" : ""}
          `}
          style={{
            boxShadow: `0 0 10px #FFEA00, 0 0 20px rgba(255, 234, 0, 0.5)`,
          }}
        />
      </div>
      
      {/* Hide default cursor */}
      <style jsx global>{`
        @media (min-width: 768px) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// GLITCH TEXT — CORRUPTED DATA
// Text that glitches on hover with cyberpunk distortion
// ═══════════════════════════════════════════════════════════════════════════

interface GlitchTextProps {
  text: string;
  className?: string;
}

export function GlitchText({ text, className = "" }: GlitchTextProps) {
  const textRef = useRef<HTMLSpanElement>(null);
  
  const handleMouseEnter = () => {
    if (!textRef.current) return;
    
    // Glitch effect
    const glitch = () => {
      const chars = "!@#$%^&*()_+-=[]{}|;':\",./<>?\\`~0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const originalText = text;
      let iterations = 0;
      
      const interval = setInterval(() => {
        if (textRef.current) {
          textRef.current.textContent = originalText
            .split("")
            .map((char, index) => {
              if (index < iterations) return originalText[index];
              if (char === " ") return " ";
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("");
        }
        
        iterations += 0.5;
        
        if (iterations >= originalText.length) {
          clearInterval(interval);
          if (textRef.current) {
            textRef.current.textContent = originalText;
          }
        }
      }, 30);
    };
    
    glitch();
  };
  
  return (
    <span
      ref={textRef}
      className={`glitch-text hover:text-[#FFEA00] transition-colors ${className}`}
      onMouseEnter={handleMouseEnter}
      data-text={text}
    >
      {text}
    </span>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// TYPEWRITER — MECHANICAL KEYBOARD
// Character-by-character typing animation
// ═══════════════════════════════════════════════════════════════════════════

interface TypewriterProps {
  texts: string[];
  className?: string;
  speed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
}

export function Typewriter({ 
  texts, 
  className = "", 
  speed = 50, 
  deleteSpeed = 30,
  pauseDuration = 2000 
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    const currentText = texts[currentIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? deleteSpeed : speed);
    
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentIndex, texts, speed, deleteSpeed, pauseDuration]);
  
  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse text-[#FFEA00]">_</span>
    </span>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// LOADING SCREEN — BRUTALIST BOOT SEQUENCE
// ═══════════════════════════════════════════════════════════════════════════

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState("INITIALIZING SUBGROUPS...");
  
  useEffect(() => {
    const statuses = [
      "INITIALIZING SUBGROUPS...",
      "LOADING PARTICLE SWARM...",
      "ELECTING WORKGROUP LEADERS...",
      "BROADCASTING COMMANDS...",
      "CALIBRATING PREDATOR GAZE...",
      "FORGING CONCRETE INTERFACE...",
      "SENTIENT ORGANISM READY.",
    ];
    
    let progress = 0;
    const interval = setInterval(() => {
      progress += 2;
      
      if (progressRef.current) {
        progressRef.current.style.width = `${progress}%`;
      }
      
      const statusIndex = Math.floor((progress / 100) * (statuses.length - 1));
      setStatus(statuses[Math.min(statusIndex, statuses.length - 1)]);
      
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          if (containerRef.current) {
            gsap.to(containerRef.current, {
              opacity: 0,
              duration: 0.5,
              onComplete: onLoadingComplete,
            });
          }
        }, 300);
      }
    }, 30);
    
    return () => clearInterval(interval);
  }, [onLoadingComplete]);
  
  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center"
    >
      {/* Logo */}
      <div className="mb-8">
        <div className="w-24 h-24 border-4 border-[#FFEA00] bg-black flex items-center justify-center animate-brutal-pulse">
          <span className="text-4xl font-black text-[#FFEA00]">MT</span>
        </div>
      </div>
      
      {/* Status text */}
      <p className="font-mono text-[#FFEA00] text-sm mb-4 tracking-wider">
        {status}
      </p>
      
      {/* Progress bar */}
      <div className="w-64 h-2 border-2 border-[#FFEA00] bg-black">
        <div
          ref={progressRef}
          className="h-full bg-[#FFEA00] transition-all duration-75"
          style={{ width: "0%" }}
        />
      </div>
      
      {/* Corner decorations */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-4 border-t-4 border-[#FFEA00]" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-4 border-t-4 border-[#FFEA00]" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-4 border-b-4 border-[#FFEA00]" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-4 border-b-4 border-[#FFEA00]" />
    </div>
  );
}
