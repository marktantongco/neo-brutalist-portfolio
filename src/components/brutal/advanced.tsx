"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { Search, FileCode, User, Mail, Briefcase, Code, Home, Settings, Command } from "lucide-react";

// ═══════════════════════════════════════════════════════════════════════════
// COMMAND PALETTE — BRUTALIST SEARCH
// ═══════════════════════════════════════════════════════════════════════════

interface CommandItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  shortcut?: string;
  action: () => void;
  category: string;
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    const timeoutId = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timeoutId);
  }, []);
  
  const commands: CommandItem[] = [
    { id: "home", title: "Go to Home", icon: <Home className="w-5 h-5" />, action: () => scrollToSection("hero"), category: "Navigation" },
    { id: "projects", title: "View Projects", icon: <Briefcase className="w-5 h-5" />, shortcut: "P", action: () => scrollToSection("projects"), category: "Navigation" },
    { id: "skills", title: "View Skills", icon: <Code className="w-5 h-5" />, shortcut: "S", action: () => scrollToSection("skills"), category: "Navigation" },
    { id: "contact", title: "Contact Form", icon: <Mail className="w-5 h-5" />, shortcut: "C", action: () => scrollToSection("contact-section"), category: "Navigation" },
    { id: "about", title: "About Me", icon: <User className="w-5 h-5" />, action: () => scrollToSection("performance"), category: "Navigation" },
    { id: "code", title: "Code Showcase", icon: <FileCode className="w-5 h-5" />, action: () => scrollToSection("code-showcase"), category: "Content" },
  ];
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
    setSearch("");
  };
  
  const filteredCommands = commands.filter(cmd => 
    cmd.title.toLowerCase().includes(search.toLowerCase()) ||
    cmd.category.toLowerCase().includes(search.toLowerCase())
  );
  
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Open palette
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      setIsOpen(prev => !prev);
      setSearch("");
      setSelectedIndex(0);
    }
    
    // Close on escape
    if (e.key === "Escape") {
      setIsOpen(false);
    }
    
    // Navigation within palette
    if (isOpen) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, filteredCommands.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
      }
      if (e.key === "Enter" && filteredCommands[selectedIndex]) {
        e.preventDefault();
        filteredCommands[selectedIndex].action();
      }
    }
  }, [isOpen, filteredCommands, selectedIndex]);
  
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
  
  // Focus input on open
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);
  
  // Animate panel
  useEffect(() => {
    if (panelRef.current) {
      if (isOpen) {
        gsap.fromTo(panelRef.current,
          { opacity: 0, scale: 0.95, y: -20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.2, ease: "power3.out" }
        );
      }
    }
  }, [isOpen]);
  
  if (!mounted || !isOpen) return null;
  
  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-start justify-center pt-[20vh] p-4 bg-black/80 backdrop-blur-sm"
      onClick={() => setIsOpen(false)}
    >
      <div
        ref={panelRef}
        className="w-full max-w-2xl bg-[#0a0a0a] border-4 border-[#FFEA00] shadow-[12px_12px_0_#FFEA00] overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center gap-4 p-4 border-b-4 border-[#FFEA00]">
          <Search className="w-6 h-6 text-[#FFEA00]" />
          <input
            ref={inputRef}
            type="text"
            value={search}
            onChange={e => {
              setSearch(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command or search..."
            className="flex-1 bg-transparent text-white text-lg outline-none placeholder:text-white/30"
          />
          <div className="flex items-center gap-1">
            <kbd className="px-2 py-1 bg-[#FFEA00] text-black text-xs font-bold border-2 border-black">ESC</kbd>
          </div>
        </div>
        
        {/* Results */}
        <div className="max-h-80 overflow-y-auto">
          {filteredCommands.length === 0 ? (
            <div className="p-8 text-center text-white/50">
              No commands found
            </div>
          ) : (
            <div className="py-2">
              {Object.entries(
                filteredCommands.reduce((acc, cmd) => {
                  if (!acc[cmd.category]) acc[cmd.category] = [];
                  acc[cmd.category].push(cmd);
                  return acc;
                }, {} as Record<string, CommandItem[]>)
              ).map(([category, items]) => (
                <div key={category}>
                  <div className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#FFEA00]/50">
                    {category}
                  </div>
                  {items.map((cmd, i) => {
                    const globalIndex = filteredCommands.indexOf(cmd);
                    return (
                      <button
                        key={cmd.id}
                        onClick={cmd.action}
                        onMouseEnter={() => setSelectedIndex(globalIndex)}
                        className={`
                          w-full flex items-center gap-4 px-4 py-3 text-left
                          transition-colors duration-100
                          ${globalIndex === selectedIndex 
                            ? "bg-[#FFEA00] text-black" 
                            : "text-white hover:bg-[#FFEA00]/10"
                          }
                        `}
                      >
                        <span className={globalIndex === selectedIndex ? "text-black" : "text-[#FFEA00]"}>
                          {cmd.icon}
                        </span>
                        <span className="flex-1 font-bold">{cmd.title}</span>
                        {cmd.shortcut && (
                          <kbd className={`px-2 py-1 text-xs font-bold border-2 ${
                            globalIndex === selectedIndex 
                              ? "bg-black text-[#FFEA00] border-black" 
                              : "bg-black/50 text-[#FFEA00] border-[#FFEA00]/30"
                          }`}>
                            {cmd.shortcut}
                          </kbd>
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-2 bg-black border-t-2 border-[#FFEA00]/30">
          <div className="flex items-center gap-4 text-xs text-white/50">
            <span className="flex items-center gap-1">
              <kbd className="px-1 bg-[#FFEA00]/20 text-[#FFEA00]">↑↓</kbd> Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1 bg-[#FFEA00]/20 text-[#FFEA00]">↵</kbd> Select
            </span>
          </div>
          <div className="text-xs text-[#FFEA00]/50 font-mono">
            <Command className="w-3 h-3 inline mr-1" />+K to toggle
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// CONFETTI CELEBRATION
// ═══════════════════════════════════════════════════════════════════════════

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  size: number;
  velocityX: number;
  velocityY: number;
  rotationSpeed: number;
}

export function Confetti({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const piecesRef = useRef<ConfettiPiece[]>([]);
  const animationRef = useRef<number>();
  
  useEffect(() => {
    if (!active || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Create confetti pieces
    const colors = ["#FFEA00", "#00FF66", "#FF0033", "#FFFFFF", "#FFEA00"];
    piecesRef.current = Array.from({ length: 150 }, (_, i) => ({
      id: i,
      x: Math.random() * canvas.width,
      y: -20,
      rotation: Math.random() * 360,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 10 + 5,
      velocityX: (Math.random() - 0.5) * 10,
      velocityY: Math.random() * 5 + 5,
      rotationSpeed: (Math.random() - 0.5) * 10,
    }));
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      piecesRef.current.forEach(piece => {
        ctx.save();
        ctx.translate(piece.x, piece.y);
        ctx.rotate((piece.rotation * Math.PI) / 180);
        ctx.fillStyle = piece.color;
        ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size * 0.6);
        ctx.restore();
        
        piece.x += piece.velocityX;
        piece.y += piece.velocityY;
        piece.rotation += piece.rotationSpeed;
        piece.velocityY += 0.2; // gravity
      });
      
      // Remove pieces that are off screen
      piecesRef.current = piecesRef.current.filter(p => p.y < canvas.height + 50);
      
      if (piecesRef.current.length > 0) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    
    animate();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [active]);
  
  if (!active) return null;
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
    />
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SKIP LINK — ACCESSIBILITY
// ═══════════════════════════════════════════════════════════════════════════

export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-6 focus:py-3 focus:bg-[#FFEA00] focus:text-black focus:font-bold focus:border-4 focus:border-black focus:shadow-[4px_4px_0_#000000] focus:outline-none"
    >
      Skip to main content
    </a>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// REDUCED MOTION — ACCESSIBILITY
// ═══════════════════════════════════════════════════════════════════════════

export function useReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    
    // Defer state update to avoid synchronous setState in effect
    const timeoutId = setTimeout(() => setReducedMotion(mediaQuery.matches), 0);
    
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    
    return () => {
      clearTimeout(timeoutId);
      mediaQuery.removeEventListener("change", handler);
    };
  }, []);
  
  return reducedMotion;
}

// ═══════════════════════════════════════════════════════════════════════════
// THEME COLOR PICKER
// ═══════════════════════════════════════════════════════════════════════════

const themeColors = [
  { name: "Electric Yellow", color: "#FFEA00" },
  { name: "Toxic Green", color: "#00FF66" },
  { name: "Blood Red", color: "#FF0033" },
  { name: "Cyan Blast", color: "#00FFFF" },
  { name: "Magenta Pulse", color: "#FF00FF" },
  { name: "Pure White", color: "#FFFFFF" },
];

export function ThemeColorPicker({ onChange }: { onChange: (color: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeColor, setActiveColor] = useState("#FFEA00");
  
  const handleColorChange = (color: string) => {
    setActiveColor(color);
    onChange(color);
    setIsOpen(false);
    
    // Update CSS custom properties
    document.documentElement.style.setProperty("--accent-color", color);
  };
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-8 h-8 border-4 border-current bg-black flex items-center justify-center transition-all hover:scale-110"
        style={{ borderColor: activeColor }}
      >
        <div
          className="w-4 h-4 rounded-full"
          style={{ backgroundColor: activeColor }}
        />
      </button>
      
      {isOpen && (
        <div className="absolute bottom-full mb-2 right-0 bg-black border-4 border-[#FFEA00] p-4 shadow-[6px_6px_0_#FFEA00]">
          <div className="text-xs font-bold uppercase tracking-wider text-[#FFEA00] mb-2">
            Theme Color
          </div>
          <div className="grid grid-cols-3 gap-2">
            {themeColors.map(theme => (
              <button
                key={theme.color}
                onClick={() => handleColorChange(theme.color)}
                className={`
                  w-8 h-8 border-4 transition-all
                  ${activeColor === theme.color ? "border-white scale-110" : "border-transparent hover:scale-110"}
                `}
                style={{ backgroundColor: theme.color }}
                title={theme.name}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// NEWSLETTER SIGNUP
// ═══════════════════════════════════════════════════════════════════════════

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      setStatus("error");
      return;
    }
    
    setStatus("loading");
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setStatus("success");
    setEmail("");
  };
  
  return (
    <div className="bg-[#0a0a0a] border-4 border-[#FFEA00] p-8 shadow-[8px_8px_0_#FFEA00]">
      <h3 className="text-huge text-[#FFEA00] mb-2">JOIN THE VOID</h3>
      <p className="text-white/60 mb-6">Get brutalist updates delivered to your inbox.</p>
      
      <form onSubmit={handleSubmit} className="flex gap-4">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="YOUR@EMAIL.COM"
          className="flex-1 px-4 py-3 bg-black text-white border-4 border-[#FFEA00] focus:outline-none focus:shadow-[4px_4px_0_#FFEA00] transition-shadow"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-6 py-3 bg-[#FFEA00] text-black font-bold border-4 border-black shadow-[4px_4px_0_#000000] hover:shadow-[6px_6px_0_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all disabled:opacity-50"
        >
          {status === "loading" ? "..." : "SUBSCRIBE"}
        </button>
      </form>
      
      {status === "success" && (
        <p className="mt-4 text-[#00FF66] font-bold">Welcome to the void.</p>
      )}
      {status === "error" && (
        <p className="mt-4 text-[#FF0033] font-bold">Invalid email. Try again.</p>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// STATS VISUALIZATION
// ═══════════════════════════════════════════════════════════════════════════

export function StatsVisualization() {
  const stats = [
    { label: "Projects", value: 47, max: 100, color: "#FFEA00" },
    { label: "Clients", value: 89, max: 100, color: "#00FF66" },
    { label: "Coffee", value: 999, max: 1000, color: "#FF0033" },
    { label: "Commits", value: 2847, max: 5000, color: "#FFEA00" },
  ];
  
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <div key={i} className="bg-black border-4 border-[#FFEA00] p-4">
          <div className="text-sm font-bold uppercase tracking-wider text-[#FFEA00] mb-2">
            {stat.label}
          </div>
          <div className="text-3xl font-black text-white mb-2">
            {stat.value.toLocaleString()}
          </div>
          <div className="h-2 bg-[#111] border border-[#FFEA00]/30">
            <div
              className="h-full transition-all duration-1000"
              style={{
                width: `${(stat.value / stat.max) * 100}%`,
                backgroundColor: stat.color,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// CURSOR TRAIL
// ═══════════════════════════════════════════════════════════════════════════

export function CursorTrail() {
  const trailsRef = useRef<{ x: number; y: number; age: number }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      trailsRef.current.push({ x: e.clientX, y: e.clientY, age: 0 });
      
      // Keep only last 20 trails
      if (trailsRef.current.length > 20) {
        trailsRef.current.shift();
      }
      
      // Update DOM
      if (containerRef.current) {
        const children = containerRef.current.children;
        trailsRef.current.forEach((trail, i) => {
          if (children[i]) {
            (children[i] as HTMLElement).style.left = `${trail.x}px`;
            (children[i] as HTMLElement).style.top = `${trail.y}px`;
            (children[i] as HTMLElement).style.opacity = `${1 - trail.age * 0.05}`;
            (children[i] as HTMLElement).style.transform = `scale(${1 - trail.age * 0.03})`;
          }
          trail.age++;
        });
      }
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  
  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[9997]">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-[#FFEA00] rounded-full"
          style={{
            left: 0,
            top: 0,
            opacity: 0,
            transform: "scale(0)",
            boxShadow: "0 0 10px #FFEA00",
          }}
        />
      ))}
    </div>
  );
}
