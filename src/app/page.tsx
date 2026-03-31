"use client";

import { useRef, useMemo, useEffect, useState, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial, Float } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronDown, Zap, Code, Database, Globe, Layers, Terminal, Cpu, Shield, Rocket, Github, Linkedin, Mail, ExternalLink } from "lucide-react";

// Import brutal components
import { ElectricCursor, GlitchText, Typewriter, LoadingScreen } from "@/components/brutal/cursor";
import { ScrollReveal, Counter, StaggerGrid } from "@/components/brutal/scroll";
import { ProjectModal, ProjectCard, type Project } from "@/components/brutal/project-modal";
import { TestimonialsSection, TimelineSection, PerformanceDashboard } from "@/components/brutal/sections";
import { ScrollProgress, VHSOverlay, InfiniteMarquee, FloatingActions, KeyboardHint } from "@/components/brutal/effects";
import { IdentitySection, ProcessSection, TrustSection, SideDotNavigation } from "@/components/brutal/identity";
import { ContactSection } from "@/components/brutal/contact";
import { CodeShowcase } from "@/components/brutal/showcase";
import { CommandPalette, Confetti, SkipLink, NewsletterSignup, StatsVisualization, useReducedMotion } from "@/components/brutal/advanced";
import { SectionDivider } from "@/components/brutal/carousel";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ═══════════════════════════════════════════════════════════════════════════
// PROJECTS DATA
// ═══════════════════════════════════════════════════════════════════════════

const projects: Project[] = [
  {
    id: "aetherdash",
    title: "AETHERDASH",
    subtitle: "Real-time Analytics Platform",
    description: "A living dashboard that breathes with WebGPU-accelerated data visualization. Subgroup voting determines which metrics spike.",
    longDescription: "AetherDash is a revolutionary real-time analytics platform that leverages WebGPU compute shaders to render millions of data points at 60fps. The particle system implements subgroup operations where particles vote on visual prominence, elected leaders control hierarchical data flows, and ShuffleXor creates organic data visualization patterns that respond to user interaction.",
    tags: ["WebGPU", "React", "D3.js", "Compute Shaders", "TypeScript", "R3F"],
    icon: "zap",
    variant: "yellow",
    stats: [
      { label: "Data Points", value: "10M+" },
      { label: "Frame Rate", value: "60fps" },
      { label: "Latency", value: "<5ms" },
      { label: "GPU Util", value: "95%" },
    ],
    features: [
      "WebGPU compute shaders with subgroup operations",
      "Real-time particle-based data visualization",
      "Elect/Broadcast/ShuffleXor for organic data flow",
      "Adaptive particle count for mobile/desktop",
      "64-thread workgroup tiling for optimal performance",
    ],
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    id: "voidmart",
    title: "VOIDMART",
    subtitle: "E-commerce Platform",
    description: "A dark marketplace where particles guide user attention. Atomic counters track inventory with barrier ordering.",
    longDescription: "VoidMart is a next-generation e-commerce platform that uses particle systems to guide user attention. The inventory system uses atomic counters for real-time stock updates across thousands of concurrent users, with barrier ordering ensuring transaction integrity. The particle attention system implements elected leaders that broadcast hot deals to nearby particles.",
    tags: ["Next.js", "Prisma", "Stripe", "WebGL", "PostgreSQL", "Redis"],
    icon: "database",
    variant: "outline",
    stats: [
      { label: "Products", value: "50K+" },
      { label: "Users", value: "100K+" },
      { label: "Transactions", value: "1M+" },
      { label: "Uptime", value: "99.9%" },
    ],
    features: [
      "Particle-guided attention system with elected leaders",
      "Atomic counters for real-time inventory",
      "Barrier ordering for transaction integrity",
      "WebGL-accelerated product previews",
      "Real-time fraud detection with GPU compute",
    ],
    github: "https://github.com",
    live: "https://example.com",
  },
  {
    id: "meshnet",
    title: "MESHNET",
    subtitle: "Decentralized Networking",
    description: "Decentralized mesh networking with gossip protocol simulation.",
    longDescription: "MeshNet implements a decentralized P2P networking layer with gossip protocol simulation. Each node in the mesh participates in subgroup voting for consensus, elected leaders coordinate data propagation, and ShuffleXor ensures unbiased peer selection for routing.",
    tags: ["WebRTC", "P2P", "Gossip Protocol", "TypeScript"],
    icon: "globe",
    variant: "yellow",
    stats: [
      { label: "Nodes", value: "10K+" },
      { label: "Latency", value: "50ms" },
      { label: "Throughput", value: "1Gbps" },
      { label: "Redundancy", value: "3x" },
    ],
    features: [
      "Gossip protocol with subgroup consensus",
      "Elected leader coordination",
      "ShuffleXor peer selection",
      "WebRTC P2P connections",
      "Automatic mesh healing",
    ],
    github: "https://github.com",
  },
  {
    id: "stackflow",
    title: "STACKFLOW",
    subtitle: "Visual Debugger",
    description: "Visual stack debugger with real-time memory inspection.",
    longDescription: "StackFlow is a visual debugging tool that renders call stacks as 3D particle flows. Memory addresses are visualized as particles that form clusters, with subgroup operations highlighting memory leaks and elected leaders pointing to potential issues.",
    tags: ["Debugger", "Memory", "Visualization", "R3F"],
    icon: "layers",
    variant: "outline",
    stats: [
      { label: "Languages", value: "10+" },
      { label: "Breakpoints", value: "∞" },
      { label: "Memory Views", value: "4" },
      { label: "Trace Depth", value: "1000" },
    ],
    features: [
      "3D call stack visualization",
      "Real-time memory inspection",
      "Particle-based heap analysis",
      "Subgroup leak detection",
      "Leader-based issue highlighting",
    ],
    github: "https://github.com",
  },
  {
    id: "coresync",
    title: "CORESYNC",
    subtitle: "Multi-core Visualizer",
    description: "Multi-core synchronization visualizer with race detection.",
    longDescription: "CoreSync visualizes multi-threaded execution in real-time. Each core is represented as a particle stream, with barrier operations shown as synchronization points. Race conditions are detected through subgroup ballot operations that identify conflicting memory accesses.",
    tags: ["Multi-threading", "Visualization", "Race Detection", "Compute"],
    icon: "cpu",
    variant: "yellow",
    stats: [
      { label: "Cores", value: "64" },
      { label: "Threads", value: "1024" },
      { label: "Detection", value: "99.9%" },
      { label: "Overhead", value: "<1%" },
    ],
    features: [
      "Real-time core visualization",
      "Barrier synchronization display",
      "Subgroup race detection",
      "Atomic operation tracking",
      "Memory ordering visualization",
    ],
    github: "https://github.com",
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// PARTICLE SWARM — SENTIENT COMPUTE ORGANISM
// ═══════════════════════════════════════════════════════════════════════════

function ParticleSwarm({ count = 5000, mouse }: { count?: number; mouse: React.RefObject<{ x: number; y: number }> }) {
  const pointsRef = useRef<THREE.Points>(null);
  const { viewport } = useThree();
  
  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    
    const workgroupSize = 64;
    
    for (let i = 0; i < count; i++) {
      const workgroupIndex = Math.floor(i / workgroupSize);
      
      const clusterX = (workgroupIndex % 8 - 4) * 2;
      const clusterY = (Math.floor(workgroupIndex / 8) - 4) * 2;
      
      pos[i * 3] = clusterX + (Math.random() - 0.5) * 3;
      pos[i * 3 + 1] = clusterY + (Math.random() - 0.5) * 3;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 2;
      
      vel[i * 3] = (Math.random() - 0.5) * 0.02;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }
    
    return [pos, vel];
  }, [count]);
  
  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.elapsedTime;
    const mouseVal = mouse.current;
    
    const mouseX = (mouseVal.x / window.innerWidth) * 2 - 1;
    const mouseY = -(mouseVal.y / window.innerHeight) * 2 + 1;
    
    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      
      const workgroupIndex = Math.floor(i / 64);
      const leaderIndex = workgroupIndex * 64;
      
      const shuffleOffset = ((i * 7) % 64) / 64 - 0.5;
      
      const dx = mouseX * viewport.width * 0.5 - positions[idx];
      const dy = mouseY * viewport.height * 0.5 - positions[idx + 1];
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      const intensity = Math.max(0.1, 1 - dist / 5);
      
      const noiseX = Math.sin(time * 0.5 + positions[idx] * 0.5) * 0.01;
      const noiseY = Math.cos(time * 0.3 + positions[idx + 1] * 0.5) * 0.01;
      
      positions[idx] += velocities[idx] + dx * 0.001 * intensity + noiseX;
      positions[idx + 1] += velocities[idx + 1] + dy * 0.001 * intensity + noiseY;
      positions[idx + 2] += Math.sin(time + shuffleOffset * Math.PI) * 0.005;
      
      if (positions[idx] > viewport.width * 0.6) positions[idx] = -viewport.width * 0.6;
      if (positions[idx] < -viewport.width * 0.6) positions[idx] = viewport.width * 0.6;
      if (positions[idx + 1] > viewport.height * 0.6) positions[idx + 1] = -viewport.height * 0.6;
      if (positions[idx + 1] < -viewport.height * 0.6) positions[idx + 1] = viewport.height * 0.6;
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });
  
  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#FFEA00"
        size={0.02}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// GRID LINES
// ═══════════════════════════════════════════════════════════════════════════

function BrutalGrid() {
  const gridRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.02;
    }
  });
  
  const lines = useMemo(() => {
    const gridLines = [];
    const size = 20;
    const divisions = 20;
    const step = size / divisions;
    
    for (let i = -size / 2; i <= size / 2; i += step) {
      gridLines.push(
        <line key={`h-${i}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([-size / 2, i, -2, size / 2, i, -2])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#FFEA00" opacity={0.1} transparent />
        </line>
      );
      gridLines.push(
        <line key={`v-${i}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([i, -size / 2, -2, i, size / 2, -2])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#FFEA00" opacity={0.1} transparent />
        </line>
      );
    }
    return gridLines;
  }, []);
  
  return <group ref={gridRef}>{lines}</group>;
}

// ═══════════════════════════════════════════════════════════════════════════
// FLOATING GEOMETRIC SHAPES
// ═══════════════════════════════════════════════════════════════════════════

function FloatingShapes() {
  return (
    <group>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[-4, 2, -1]}>
          <boxGeometry args={[0.8, 0.8, 0.8]} />
          <meshBasicMaterial color="#FFEA00" wireframe />
        </mesh>
      </Float>
      
      <Float speed={2} rotationIntensity={0.7} floatIntensity={1.5}>
        <mesh position={[4, -2, -0.5]}>
          <octahedronGeometry args={[0.6]} />
          <meshBasicMaterial color="#FFEA00" wireframe />
        </mesh>
      </Float>
      
      <Float speed={1} rotationIntensity={0.3} floatIntensity={0.8}>
        <mesh position={[3, 3, -1.5]}>
          <torusGeometry args={[0.5, 0.15, 8, 16]} />
          <meshBasicMaterial color="#FFEA00" wireframe />
        </mesh>
      </Float>
      
      <Float speed={1.8} rotationIntensity={0.6} floatIntensity={1.2}>
        <mesh position={[-3, -3, -0.8]}>
          <icosahedronGeometry args={[0.5]} />
          <meshBasicMaterial color="#FFEA00" wireframe />
        </mesh>
      </Float>
    </group>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 3D SCENE COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

function Scene({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) {
  return (
    <>
      <color attach="background" args={["#000000"]} />
      <ParticleSwarm count={3000} mouse={mouse} />
      <BrutalGrid />
      <FloatingShapes />
      <EffectComposer>
        <Bloom
          intensity={1.5}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
      </EffectComposer>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SKILL BAR COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

interface SkillBarProps {
  name: string;
  level: number;
  delay?: number;
}

function SkillBar({ name, level, delay = 0 }: SkillBarProps) {
  const barRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (barRef.current) {
      gsap.fromTo(barRef.current,
        { width: 0 },
        { width: `${level}%`, duration: 1.5, delay, ease: "power3.out" }
      );
    }
  }, [delay, level]);
  
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-bold uppercase tracking-wider text-[#FFEA00]">{name}</span>
        <span className="text-sm font-mono text-[#FFEA00]/70">{level}%</span>
      </div>
      <div className="h-4 bg-[#111] border-2 border-[#FFEA00]">
        <div
          ref={barRef}
          className="h-full bg-[#FFEA00]"
          style={{ width: 0 }}
        />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// CRYPTO VAULT VOLATILITY TRACKER
// ═══════════════════════════════════════════════════════════════════════════

function CryptoVault() {
  const [volatility, setVolatility] = useState([
    { symbol: "BTC", price: 67842.50, change: 2.4, volatility: 67 },
    { symbol: "ETH", price: 3456.78, change: -1.2, volatility: 54 },
    { symbol: "SOL", price: 178.90, change: 5.6, volatility: 82 },
    { symbol: "AVAX", price: 42.15, change: 3.1, volatility: 71 },
  ]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setVolatility(prev => prev.map(crypto => ({
        ...crypto,
        price: crypto.price * (1 + (Math.random() - 0.5) * 0.02),
        change: crypto.change + (Math.random() - 0.5) * 0.5,
        volatility: Math.min(100, Math.max(0, crypto.volatility + (Math.random() - 0.5) * 10)),
      })));
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="brutal-card bg-[#0a0a0a] border-4 border-[#FFEA00] shadow-[8px_8px_0_#FFEA00] p-6">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="w-8 h-8 text-[#FFEA00]" />
        <h3 className="text-huge text-[#FFEA00]">CRYPTOVAULT</h3>
      </div>
      <p className="text-white/70 mb-6">Real-time volatility tracking with subgroup intelligence</p>
      
      <div className="space-y-4">
        {volatility.map((crypto) => (
          <div key={crypto.symbol} className="border-2 border-[#FFEA00]/30 p-4 bg-black/50">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-[#FFEA00] text-lg">{crypto.symbol}</span>
              <span className={`font-mono ${crypto.change >= 0 ? "text-[#00FF66]" : "text-[#FF0033]"}`}>
                {crypto.change >= 0 ? "+" : ""}{crypto.change.toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-white font-mono">${crypto.price.toFixed(2)}</span>
              <span className="text-xs text-[#FFEA00]/50">VOL: {crypto.volatility.toFixed(0)}%</span>
            </div>
            <div className="h-2 bg-[#111] border border-[#FFEA00]/30">
              <div
                className="h-full transition-all duration-500"
                style={{
                  width: `${crypto.volatility}%`,
                  backgroundColor: crypto.volatility > 70 ? "#FF0033" : crypto.volatility > 40 ? "#FFEA00" : "#00FF66",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MAGNETIC BUTTON
// ═══════════════════════════════════════════════════════════════════════════

function MagneticButton({ children, className = "", onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      gsap.to(button, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: "power2.out",
      });
    };
    
    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)",
      });
    };
    
    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);
  
  return (
    <button ref={buttonRef} className={className} onClick={onClick}>
      {children}
    </button>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN PAGE COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export default function Portfolio() {
  const mouseRef = useRef({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const reducedMotion = useReducedMotion();
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    
    const timeoutId = setTimeout(() => setIsLoaded(true), 0);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, []);
  
  useEffect(() => {
    if (isLoaded && heroRef.current) {
      const tl = gsap.timeline();
      
      tl.fromTo(".hero-title", 
        { opacity: 0, y: 100, skewY: 5 },
        { opacity: 1, y: 0, skewY: 0, duration: 1.2, ease: "power4.out" }
      )
      .fromTo(".hero-subtitle",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo(".hero-cta",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
        "-=0.2"
      )
      .fromTo(".nav-item",
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power3.out" },
        "-=0.3"
      );
    }
  }, [isLoaded]);
  
  return (
    <main className="min-h-screen bg-black text-white noise-overlay" id="main-content">
      {/* Skip Link for Accessibility */}
      <SkipLink />
      
      {/* Loading Screen */}
      {isLoading && !reducedMotion && <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />}
      
      {/* VHS Overlay */}
      {!reducedMotion && <VHSOverlay />}
      
      {/* Scroll Progress */}
      <ScrollProgress />
      
      {/* Electric Cursor */}
      {!reducedMotion && <ElectricCursor />}
      
      {/* Project Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      
      {/* Command Palette */}
      <CommandPalette />
      
      {/* Keyboard Shortcuts */}
      <KeyboardHint />
      
      {/* Floating Actions */}
      <FloatingActions />
      
      {/* Confetti */}
      <Confetti active={showConfetti} />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b-4 border-[#FFEA00]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="nav-item flex items-center gap-2">
              <div className="w-8 h-8 bg-[#FFEA00] border-2 border-black flex items-center justify-center">
                <span className="font-black text-black text-xs">MT</span>
              </div>
              <span className="font-bold text-[#FFEA00] uppercase tracking-wider hidden sm:block">
                Mark Anthony Tantongco
              </span>
            </div>
            
            <div className="flex items-center gap-4 sm:gap-6">
              <a href="#projects" className="nav-item text-xs sm:text-sm font-bold uppercase tracking-wider text-white hover:text-[#FFEA00] transition-colors">
                Projects
              </a>
              <a href="#skills" className="nav-item text-xs sm:text-sm font-bold uppercase tracking-wider text-white hover:text-[#FFEA00] transition-colors">
                Skills
              </a>
              <a href="#contact" className="nav-item text-xs sm:text-sm font-bold uppercase tracking-wider text-white hover:text-[#FFEA00] transition-colors">
                Contact
              </a>
              <MagneticButton className="nav-item brutal-btn px-3 sm:px-4 py-2 text-xs sm:text-sm">
                HIRE ME
              </MagneticButton>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Side Dot Navigation */}
      <SideDotNavigation />
      
      {/* Hero Section */}
      <section ref={heroRef} id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Suspense fallback={<div className="w-full h-full bg-black" />}>
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
              <Scene mouse={mouseRef} />
            </Canvas>
          </Suspense>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <div className="mb-6 hero-title">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 bg-[#0a0a0a] border-2 border-[#00FFFF] px-4 py-2 mb-4">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FFFF] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00FFFF]"></span>
              </span>
              <span className="text-[#00FFFF] font-bold text-sm uppercase tracking-wider">DEUS ACTIVE</span>
            </div>
          </div>
          
          <h1 className="hero-title text-mega text-[#FFEA00] brutal-glow mb-4">
            <GlitchText text="AI Creative" />
            <br />
            <span className="text-white"><GlitchText text="Strategist" /></span>
          </h1>
          
          <p className="hero-title text-xl sm:text-2xl text-[#CCFF00] font-bold uppercase tracking-wider mb-6">
            | Prompt Architect |
          </p>
          
          <p className="hero-subtitle text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-4 leading-relaxed">
            I blend technical precision with creative courage to build at the intersection of AI, visual design, and digital branding.
          </p>
          
          <p className="hero-subtitle text-lg text-[#00FFFF] font-bold italic mb-8">
            "I create cinematic visions."
          </p>
          
          <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center items-center">
            <MagneticButton className="brutal-btn px-8 py-4 text-lg flex items-center gap-2">
              <Rocket className="w-5 h-5" />
              VIEW PROJECTS
            </MagneticButton>
            <MagneticButton className="brutal-btn-outline px-8 py-4 text-lg flex items-center gap-2">
              <Terminal className="w-5 h-5" />
              VIEW SOURCE
            </MagneticButton>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <ChevronDown className="w-8 h-8 text-[#FFEA00] animate-bounce" />
        </div>
        
        <div className="absolute top-20 left-4 w-16 h-16 border-l-4 border-t-4 border-[#FFEA00]" />
        <div className="absolute top-20 right-4 w-16 h-16 border-r-4 border-t-4 border-[#FFEA00]" />
        <div className="absolute bottom-4 left-4 w-16 h-16 border-l-4 border-b-4 border-[#FFEA00]" />
        <div className="absolute bottom-4 right-4 w-16 h-16 border-r-4 border-b-4 border-[#FFEA00]" />
      </section>
      
      {/* Identity/Services Section */}
      <IdentitySection />
      
      {/* Process Section */}
      <ProcessSection />
      
      {/* Trust Section */}
      <TrustSection />
      
      {/* Performance Dashboard */}
      <section id="performance" className="py-24 px-4 bg-[#0a0a0a] border-y-4 border-[#FFEA00]">
        <PerformanceDashboard />
      </section>
      
      {/* Projects Section */}
      <section id="projects" className="py-24 px-4 bg-[#0a0a0a] border-y-4 border-[#FFEA00]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal animation="brutal">
            <div className="text-center mb-16">
              <span className="brutal-tag mb-4">SELECTED WORKS</span>
              <h2 className="text-mega text-[#FFEA00] mt-4">PROJECTS</h2>
              <p className="text-white/60 mt-4 max-w-xl mx-auto">
                Raw, honest, dangerous. Each project is a living organism built with bleeding-edge compute.
              </p>
            </div>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-2 gap-8">
            {projects.slice(0, 2).map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
          
          <StaggerGrid className="grid md:grid-cols-3 gap-6 mt-8" staggerDelay={0.1}>
            {projects.slice(2).map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="brutal-card bg-[#111] border-4 border-[#FFEA00]/50 p-6 cursor-pointer hover:border-[#FFEA00] transition-colors"
              >
                {project.icon === "globe" && <Globe className="w-10 h-10 text-[#FFEA00] mb-4" />}
                {project.icon === "layers" && <Layers className="w-10 h-10 text-[#FFEA00] mb-4" />}
                {project.icon === "cpu" && <Cpu className="w-10 h-10 text-[#FFEA00] mb-4" />}
                <h4 className="text-xl font-bold text-[#FFEA00] mb-2">{project.title}</h4>
                <p className="text-white/60 text-sm">{project.description}</p>
              </div>
            ))}
          </StaggerGrid>
        </div>
      </section>
      
      {/* Crypto Vault */}
      <section className="py-24 px-4 bg-black">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal animation="fadeUp">
            <div className="text-center mb-12">
              <span className="brutal-tag mb-4">LIVE DATA</span>
              <h2 className="text-mega text-[#FFEA00] mt-4">CRYPTO VAULT</h2>
              <p className="text-white/60 mt-4">
                Real-time volatility tracking powered by subgroup intelligence
              </p>
            </div>
          </ScrollReveal>
          
          <CryptoVault />
        </div>
      </section>
      
      {/* Timeline */}
      <TimelineSection />
      
      {/* Skills Section */}
      <section id="skills" className="py-24 px-4 bg-[#0a0a0a] border-y-4 border-[#FFEA00]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal animation="brutal">
            <div className="text-center mb-16">
              <span className="brutal-tag mb-4">CAPABILITIES</span>
              <h2 className="text-mega text-[#FFEA00] mt-4">SKILLS</h2>
              <p className="text-white/60 mt-4">
                Forged in the fires of production. Battle-tested. Uncompromising.
              </p>
            </div>
          </ScrollReveal>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-huge text-white mb-6">TECHNICAL</h3>
              <SkillBar name="TypeScript / JavaScript" level={95} delay={0} />
              <SkillBar name="React / Next.js" level={92} delay={0.1} />
              <SkillBar name="WebGPU / WebGL" level={88} delay={0.2} />
              <SkillBar name="Node.js / Bun" level={90} delay={0.3} />
              <SkillBar name="Three.js / R3F" level={85} delay={0.4} />
              <SkillBar name="Prisma / PostgreSQL" level={87} delay={0.5} />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="brutal-card bg-[#FFEA00] p-4 text-center">
                <Code className="w-8 h-8 mx-auto mb-2 text-black" />
                <span className="font-bold text-black text-sm">Frontend</span>
              </div>
              <div className="brutal-card bg-[#FFEA00] p-4 text-center">
                <Database className="w-8 h-8 mx-auto mb-2 text-black" />
                <span className="font-bold text-black text-sm">Backend</span>
              </div>
              <div className="brutal-card bg-[#FFEA00] p-4 text-center">
                <Cpu className="w-8 h-8 mx-auto mb-2 text-black" />
                <span className="font-bold text-black text-sm">Compute</span>
              </div>
              <div className="brutal-card bg-[#FFEA00] p-4 text-center">
                <Shield className="w-8 h-8 mx-auto mb-2 text-black" />
                <span className="font-bold text-black text-sm">Security</span>
              </div>
            </div>
          </div>
          
          <div className="mt-16 overflow-hidden border-4 border-[#FFEA00] bg-black p-4">
            <div className="flex gap-8 items-center justify-center flex-wrap">
              {["TypeScript", "React", "Next.js", "Three.js", "WebGPU", "Prisma", "PostgreSQL", "Docker", "AWS", "GSAP", "Tailwind", "Node.js"].map((tool) => (
                <span key={tool} className="text-[#FFEA00] font-mono text-sm uppercase tracking-wider">
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <TestimonialsSection />
      
      {/* Code Showcase */}
      <section id="code-showcase">
        <CodeShowcase />
      </section>
      
      {/* Contact Form */}
      <section id="contact-section">
        <ContactSection />
      </section>
      
      {/* Marquee Strip */}
      <div className="bg-[#FFEA00] py-4 border-y-4 border-black">
        <InfiniteMarquee
          items={[
            "WEBGPU COMPUTE",
            "SUBGROUP OPERATIONS",
            "PARTICLE SYSTEMS",
            "NEO-BRUTALISM",
            "REACT THREE FIBER",
            "GSAP ANIMATIONS",
            "TYPESCRIPT",
            "NEXT.JS",
            "REAL-TIME DATA",
            "GPU SHADERS",
          ]}
          speed={50}
        />
      </div>
      
      {/* CTA Section */}
      <section className="py-24 px-4 bg-black relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <ScrollReveal animation="brutal">
            <h2 className="text-mega text-white mb-6">
              LET'S BUILD<br />
              <span className="text-[#FFEA00] brutal-glow">SOMETHING</span><br />
              DANGEROUS
            </h2>
          </ScrollReveal>
          
          <ScrollReveal animation="fadeUp" delay={0.2}>
            <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">
              Ready to forge sentient digital organisms? Let's create something raw, honest, and uncompromising.
            </p>
          </ScrollReveal>
          
          <div className="flex justify-center gap-6">
            <a href="https://twitter.com/markytanky" target="_blank" rel="noopener noreferrer" className="w-14 h-14 border-4 border-[#FFEA00] bg-black flex items-center justify-center hover:bg-[#FFEA00] hover:text-black transition-colors group magnetic">
              <svg className="w-6 h-6 text-[#FFEA00] group-hover:text-black" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="https://linkedin.com/in/marktantongco" target="_blank" rel="noopener noreferrer" className="w-14 h-14 border-4 border-[#FFEA00] bg-black flex items-center justify-center hover:bg-[#FFEA00] hover:text-black transition-colors group magnetic">
              <Linkedin className="w-6 h-6 text-[#FFEA00] group-hover:text-black" />
            </a>
            <a href="https://github.com/marktantongco" target="_blank" rel="noopener noreferrer" className="w-14 h-14 border-4 border-[#FFEA00] bg-black flex items-center justify-center hover:bg-[#FFEA00] hover:text-black transition-colors group magnetic">
              <Github className="w-6 h-6 text-[#FFEA00] group-hover:text-black" />
            </a>
            <a href="mailto:hello@markanthony.dev" className="w-14 h-14 border-4 border-[#FFEA00] bg-black flex items-center justify-center hover:bg-[#FFEA00] hover:text-black transition-colors group magnetic">
              <Mail className="w-6 h-6 text-[#FFEA00] group-hover:text-black" />
            </a>
          </div>
        </div>
      </section>
      
      {/* Section Divider */}
      <SectionDivider text="JOIN THE VOID" />
      
      {/* Newsletter Section */}
      <section className="py-24 px-4 bg-[#0a0a0a]">
        <div className="max-w-xl mx-auto">
          <NewsletterSignup />
        </div>
      </section>
      
      {/* Stats Visualization */}
      <section className="py-16 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <StatsVisualization />
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-[#FFEA00] border-t-4 border-black py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-black flex items-center justify-center">
                <span className="font-black text-[#FFEA00] text-xs">MT</span>
              </div>
              <span className="font-bold text-black uppercase tracking-wider">
                Mark Anthony Tantongco
              </span>
            </div>
            
            <p className="text-black/70 text-sm font-mono">
              © {new Date().getFullYear()} — FORGED WITH RAW POWER
            </p>
            
            <div className="flex items-center gap-2">
              <span className="text-black font-bold text-sm uppercase">Built with</span>
              <span className="text-black font-mono">Next.js + Three.js + GSAP</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
