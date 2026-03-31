"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Sparkles, 
  Palette, 
  Search, 
  Globe, 
  Compass, 
  Rocket, 
  Zap,
  Clock,
  Briefcase,
  Heart,
  Headphones
} from "lucide-react";
import { ScrollReveal } from "./scroll";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ═══════════════════════════════════════════════════════════════════════════
// IDENTITY/SERVICES SECTION
// ═══════════════════════════════════════════════════════════════════════════

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}

function ServiceCard({ icon, title, description, delay = 0 }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, [delay]);
  
  return (
    <div 
      ref={cardRef}
      className="service-card relative bg-[#0a0a0a] border-4 border-[#FFEA00] p-6 
                 shadow-[8px_8px_0_#FFEA00] hover:shadow-[12px_12px_0_#00FFFF] 
                 hover:border-[#00FFFF] transition-all duration-300 cursor-pointer group
                 overflow-hidden"
    >
      {/* Animated border effect */}
      <div className="absolute inset-0 border-4 border-transparent group-hover:border-[#00FFFF] 
                      transition-all duration-300 pointer-events-none" />
      
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#FFEA00] 
                      group-hover:border-[#00FFFF] transition-colors duration-300" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#FFEA00] 
                      group-hover:border-[#00FFFF] transition-colors duration-300" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#FFEA00] 
                      group-hover:border-[#00FFFF] transition-colors duration-300" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#FFEA00] 
                      group-hover:border-[#00FFFF] transition-colors duration-300" />
      
      <div className="relative z-10">
        <div className="w-14 h-14 bg-[#FFEA00] border-2 border-black flex items-center justify-center mb-4
                        group-hover:bg-[#00FFFF] transition-colors duration-300">
          {icon}
        </div>
        
        <h3 className="text-xl font-black text-[#FFEA00] uppercase tracking-tight mb-3
                       group-hover:text-[#00FFFF] transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-white/70 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

const services = [
  {
    icon: <Sparkles className="w-7 h-7 text-black" />,
    title: "AI Image Enhancement",
    description: "Midjourney/Flux expert crafting cinematic visual storytelling. Transform concepts into stunning visual narratives with AI-powered precision."
  },
  {
    icon: <Palette className="w-7 h-7 text-black" />,
    title: "Brand Systems",
    description: "React/Vite/Next.js architecture for compelling brand narratives. Build digital experiences that resonate and convert."
  },
  {
    icon: <Search className="w-7 h-7 text-black" />,
    title: "SEO/GEO Optimization",
    description: "Maximize search visibility across traditional and AI-powered search. Dominate both Google rankings and emerging GEO landscapes."
  },
  {
    icon: <Globe className="w-7 h-7 text-black" />,
    title: "Web Development",
    description: "Modern web apps with bleeding-edge tech. WebGPU, Three.js, and real-time systems that push boundaries."
  }
];

export function IdentitySection() {
  return (
    <section id="services" className="py-24 px-4 bg-black border-y-4 border-[#FFEA00]">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal animation="brutal">
          <div className="text-center mb-16">
            <span className="brutal-tag mb-4">WHAT I DO</span>
            <h2 className="text-mega text-[#FFEA00] mt-4">IDENTITY</h2>
            <p className="text-white/60 mt-4 max-w-xl mx-auto">
              Bridging creativity and technology to build digital experiences that matter.
            </p>
          </div>
        </ScrollReveal>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              icon={service.icon}
              title={service.title}
              description={service.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// PROCESS/METHODOLOGY SECTION
// ═══════════════════════════════════════════════════════════════════════════

interface ProcessStepProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  step: number;
  isLast?: boolean;
}

function ProcessStep({ icon, title, description, step, isLast }: ProcessStepProps) {
  const stepRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (stepRef.current) {
      gsap.fromTo(stepRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: stepRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);
  
  return (
    <div ref={stepRef} className="flex items-start gap-4 relative">
      {/* Connector line */}
      {!isLast && (
        <div className="absolute left-6 top-16 w-1 h-24 bg-gradient-to-b from-[#FFEA00] to-[#00FFFF] opacity-50" />
      )}
      
      {/* Step number and icon */}
      <div className="relative flex-shrink-0">
        <div className="w-12 h-12 bg-[#FFEA00] border-4 border-black flex items-center justify-center
                        shadow-[4px_4px_0_#00FFFF]">
          {icon}
        </div>
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#00FFFF] border-2 border-black flex items-center justify-center
                        text-xs font-black text-black">
          {step}
        </div>
      </div>
      
      {/* Content */}
      <div className="pt-1">
        <h3 className="text-xl font-black text-[#FFEA00] uppercase tracking-tight mb-2">
          {title}
        </h3>
        <p className="text-white/60 text-sm leading-relaxed max-w-xs">
          {description}
        </p>
      </div>
    </div>
  );
}

const processSteps = [
  {
    icon: <Compass className="w-5 h-5 text-black" />,
    title: "Discovery",
    description: "Deep dive into your vision, goals, and brand essence. Understanding the why before the how."
  },
  {
    icon: <Search className="w-5 h-5 text-black" />,
    title: "Strategy",
    description: "Architect solutions with precision. Map the journey from concept to execution."
  },
  {
    icon: <Rocket className="w-5 h-5 text-black" />,
    title: "Create",
    description: "Build with raw, honest energy. Iterate fast, refine relentlessly, ship with confidence."
  },
  {
    icon: <Zap className="w-5 h-5 text-black" />,
    title: "Launch",
    description: "Deploy to the world. Monitor, optimize, and evolve based on real-world feedback."
  }
];

export function ProcessSection() {
  return (
    <section id="process" className="py-24 px-4 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal animation="brutal">
          <div className="text-center mb-16">
            <span className="brutal-tag mb-4">HOW I WORK</span>
            <h2 className="text-mega text-[#FFEA00] mt-4">PROCESS</h2>
            <p className="text-white/60 mt-4 max-w-xl mx-auto">
              A battle-tested methodology for turning ideas into reality.
            </p>
          </div>
        </ScrollReveal>
        
        {/* Desktop: Horizontal */}
        <div className="hidden lg:flex justify-between items-start gap-8">
          {processSteps.map((step, index) => (
            <div key={step.title} className="flex-1 relative">
              <ProcessStep
                icon={step.icon}
                title={step.title}
                description={step.description}
                step={index + 1}
                isLast={index === processSteps.length - 1}
              />
              {/* Arrow connector */}
              {index < processSteps.length - 1 && (
                <div className="absolute -right-4 top-6 text-[#FFEA00] opacity-50">
                  <svg width="32" height="16" viewBox="0 0 32 16" fill="none">
                    <path d="M0 8H24M24 8L18 2M24 8L18 14" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Mobile: Vertical */}
        <div className="lg:hidden space-y-8">
          {processSteps.map((step, index) => (
            <ProcessStep
              key={step.title}
              icon={step.icon}
              title={step.title}
              description={step.description}
              step={index + 1}
              isLast={index === processSteps.length - 1}
            />
          ))}
        </div>
        
        {/* Process visualization */}
        <div className="mt-16 border-4 border-[#FFEA00] bg-black p-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#FFEA00] via-[#00FFFF] to-[#CCFF00]" 
                 style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }} />
          </div>
          
          <div className="relative z-10 flex flex-wrap justify-center items-center gap-4">
            <span className="text-[#FFEA00] font-black text-2xl uppercase tracking-wider">Discovery</span>
            <span className="text-[#00FFFF] font-mono">→</span>
            <span className="text-[#FFEA00] font-black text-2xl uppercase tracking-wider">Strategy</span>
            <span className="text-[#00FFFF] font-mono">→</span>
            <span className="text-[#FFEA00] font-black text-2xl uppercase tracking-wider">Create</span>
            <span className="text-[#00FFFF] font-mono">→</span>
            <span className="text-[#FFEA00] font-black text-2xl uppercase tracking-wider">Launch</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// TRUST/CREDENTIALS SECTION
// ═══════════════════════════════════════════════════════════════════════════

interface TrustBadgeProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  delay?: number;
}

function TrustBadge({ icon, value, label, delay = 0 }: TrustBadgeProps) {
  const badgeRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (badgeRef.current) {
      gsap.fromTo(badgeRef.current,
        { opacity: 0, scale: 0.8, rotation: -5 },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.6,
          delay,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: badgeRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, [delay]);
  
  return (
    <div 
      ref={badgeRef}
      className="trust-badge bg-[#0a0a0a] border-4 border-[#FFEA00] p-6 
                 shadow-[6px_6px_0_#FFEA00] hover:shadow-[10px_10px_0_#00FFFF]
                 hover:border-[#00FFFF] transition-all duration-300 text-center group"
    >
      <div className="w-12 h-12 mx-auto mb-4 bg-[#FFEA00] border-2 border-black flex items-center justify-center
                      group-hover:bg-[#00FFFF] transition-colors duration-300">
        {icon}
      </div>
      
      <div className="text-3xl font-black text-[#FFEA00] mb-1 group-hover:text-[#00FFFF] transition-colors duration-300
                      brutal-glow">
        {value}
      </div>
      
      <div className="text-sm font-bold text-white/70 uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}

const trustBadges = [
  {
    icon: <Clock className="w-6 h-6 text-black" />,
    value: "5+",
    label: "Years Experience"
  },
  {
    icon: <Briefcase className="w-6 h-6 text-black" />,
    value: "50+",
    label: "Projects Delivered"
  },
  {
    icon: <Heart className="w-6 h-6 text-black" />,
    value: "100%",
    label: "Client Satisfaction"
  },
  {
    icon: <Headphones className="w-6 h-6 text-black" />,
    value: "24/7",
    label: "Support"
  }
];

export function TrustSection() {
  return (
    <section id="trust" className="py-24 px-4 bg-black border-y-4 border-[#FFEA00]">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal animation="brutal">
          <div className="text-center mb-16">
            <span className="brutal-tag mb-4">CREDENTIALS</span>
            <h2 className="text-mega text-[#FFEA00] mt-4">TRUST</h2>
            <p className="text-white/60 mt-4 max-w-xl mx-auto">
              Numbers that speak. Results that matter.
            </p>
          </div>
        </ScrollReveal>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {trustBadges.map((badge, index) => (
            <TrustBadge
              key={badge.label}
              icon={badge.icon}
              value={badge.value}
              label={badge.label}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SIDE DOT NAVIGATION
// ═══════════════════════════════════════════════════════════════════════════

interface NavDot {
  id: string;
  label: string;
}

const navDots: NavDot[] = [
  { id: "hero", label: "Hero" },
  { id: "services", label: "Identity" },
  { id: "process", label: "Process" },
  { id: "trust", label: "Trust" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "contact-section", label: "Contact" }
];

export function SideDotNavigation() {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [hoveredDot, setHoveredDot] = useState<string | null>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      for (const dot of navDots) {
        const element = document.getElementById(dot.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(dot.id);
            break;
          }
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  return (
    <nav className="fixed right-4 lg:right-8 top-1/2 transform -translate-y-1/2 z-50 hidden md:flex flex-col gap-4">
      {navDots.map((dot) => (
        <div key={dot.id} className="relative flex items-center justify-end">
          {/* Label - appears on hover */}
          <span 
            className={`absolute right-8 px-3 py-1 bg-[#FFEA00] text-black font-bold text-xs uppercase 
                        whitespace-nowrap border-2 border-black shadow-[3px_3px_0_#00FFFF]
                        transition-all duration-300 pointer-events-none
                        ${hoveredDot === dot.id ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'}`}
          >
            {dot.label}
          </span>
          
          {/* Dot */}
          <button
            onClick={() => scrollToSection(dot.id)}
            onMouseEnter={() => setHoveredDot(dot.id)}
            onMouseLeave={() => setHoveredDot(null)}
            className={`w-4 h-4 rounded-full border-2 transition-all duration-300 cursor-pointer
                       ${activeSection === dot.id 
                         ? 'bg-[#FFEA00] border-[#FFEA00] scale-125 shadow-[0_0_10px_#FFEA00]' 
                         : 'bg-transparent border-[#FFEA00]/50 hover:border-[#00FFFF] hover:bg-[#00FFFF]/30'
                       }`}
            aria-label={`Navigate to ${dot.label} section`}
          />
        </div>
      ))}
    </nav>
  );
}
