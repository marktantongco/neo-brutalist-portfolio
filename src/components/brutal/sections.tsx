"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { Quote, Star } from "lucide-react";

// ═══════════════════════════════════════════════════════════════════════════
// TESTIMONIAL DATA
// ═══════════════════════════════════════════════════════════════════════════

const testimonials = [
  {
    id: 1,
    quote: "Mark Anthony doesn't just build software—he forges living digital organisms. His WebGPU implementations are nothing short of revolutionary.",
    author: "Sarah Chen",
    role: "CTO, TechVentures",
    rating: 5,
  },
  {
    id: 2,
    quote: "The raw brutalist energy in his work is matched only by the sophisticated engineering underneath. A rare combination of art and science.",
    author: "Marcus Webb",
    role: "Lead Architect, CloudScale",
    rating: 5,
  },
  {
    id: 3,
    quote: "Working with Mark Anthony transformed our entire approach to frontend architecture. His particle systems brought our dashboards to life.",
    author: "Elena Vasquez",
    role: "Product Director, DataFlow",
    rating: 5,
  },
  {
    id: 4,
    quote: "Uncompromising quality, zero corporate polish, and full freak mode energy. Exactly what our project needed.",
    author: "James Morrison",
    role: "Founder, NeonLabs",
    rating: 5,
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// TESTIMONIALS SECTION
// ═══════════════════════════════════════════════════════════════════════════

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!sectionRef.current) return;
    
    const cards = sectionRef.current.querySelectorAll(".testimonial-card");
    
    gsap.set(cards, { opacity: 0, y: 60, rotateX: 10 });
    
    gsap.to(cards, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
      },
    });
  }, []);
  
  return (
    <section className="py-24 px-4 bg-[#0a0a0a] border-y-4 border-[#FFEA00]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="brutal-tag mb-4">SOCIAL PROOF</span>
          <h2 className="text-mega text-[#FFEA00] mt-4">TESTIMONIALS</h2>
          <p className="text-white/60 mt-4 max-w-xl mx-auto">
            Battle-tested by industry leaders. Raw feedback from real humans.
          </p>
        </div>
        
        <div ref={sectionRef} className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="testimonial-card bg-black border-4 border-[#FFEA00] p-6 shadow-[8px_8px_0_#FFEA00] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0_#FFEA00] transition-all duration-150"
            >
              {/* Quote Icon */}
              <Quote className="w-10 h-10 text-[#FFEA00] mb-4 opacity-50" />
              
              {/* Quote */}
              <p className="text-white text-lg leading-relaxed mb-6">
                "{testimonial.quote}"
              </p>
              
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-[#FFEA00] fill-[#FFEA00]" />
                ))}
              </div>
              
              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#FFEA00] border-2 border-black flex items-center justify-center">
                  <span className="font-black text-black text-lg">
                    {testimonial.author.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                <div>
                  <div className="font-bold text-[#FFEA00]">{testimonial.author}</div>
                  <div className="text-sm text-white/60">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// TIMELINE DATA
// ═══════════════════════════════════════════════════════════════════════════

const timelineEvents = [
  {
    year: "2019",
    title: "THE AWAKENING",
    description: "Discovered the raw power of TypeScript and React. Built first production systems.",
    icon: "🚀",
  },
  {
    year: "2020",
    title: "DEEP DIVE",
    description: "Mastered WebGL and Three.js. Started experimenting with GPU compute shaders.",
    icon: "⚡",
  },
  {
    year: "2021",
    title: "ARCHITECT EVOLUTION",
    description: "Led frontend architecture for enterprise systems. Adopted Neo-Brutalist design philosophy.",
    icon: "🏗️",
  },
  {
    year: "2022",
    title: "SUBGROUP MASTERY",
    description: "Deep dive into WebGPU compute. Implemented subgroup operations for real-time physics.",
    icon: "🧠",
  },
  {
    year: "2023",
    title: "SENTIENT SYSTEMS",
    description: "Built particle systems that vote, elect leaders, and exhibit emergent behavior.",
    icon: "🌐",
  },
  {
    year: "2024",
    title: "THE FUTURE",
    description: "Continuing to forge living digital organisms with bleeding-edge compute.",
    icon: "🔥",
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// TIMELINE SECTION
// ═══════════════════════════════════════════════════════════════════════════

export function TimelineSection() {
  const lineRef = useRef<HTMLDivElement>(null);
  
  return (
    <section className="py-24 px-4 bg-black">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="brutal-tag mb-4">EVOLUTION</span>
          <h2 className="text-mega text-[#FFEA00] mt-4">TIMELINE</h2>
          <p className="text-white/60 mt-4">
            The journey from code monkey to digital architect
          </p>
        </div>
        
        <div className="relative">
          {/* Vertical Line */}
          <div 
            ref={lineRef}
            className="absolute left-1/2 top-0 bottom-0 w-1 bg-[#FFEA00] transform -translate-x-1/2 hidden md:block"
          />
          
          {/* Events */}
          <div className="space-y-12">
            {timelineEvents.map((event, index) => (
              <div
                key={event.year}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                  <div className="bg-[#0a0a0a] border-4 border-[#FFEA00] p-6 shadow-[6px_6px_0_#FFEA00] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[8px_8px_0_#FFEA00] transition-all duration-150">
                    <span className="text-4xl mb-2 block">{event.icon}</span>
                    <div className="text-brutal-code text-[#FFEA00] mb-1">{event.year}</div>
                    <h3 className="text-huge text-white mb-2">{event.title}</h3>
                    <p className="text-white/70">{event.description}</p>
                  </div>
                </div>
                
                {/* Center Point */}
                <div className="w-8 h-8 bg-[#FFEA00] border-4 border-black z-10 flex items-center justify-center shadow-[4px_4px_0_#000000]">
                  <div className="w-3 h-3 bg-black" />
                </div>
                
                {/* Spacer */}
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// PERFORMANCE DASHBOARD
// ═══════════════════════════════════════════════════════════════════════════

export function PerformanceDashboard() {
  const metrics = [
    { label: "Projects Delivered", value: 47, suffix: "+", prefix: "" },
    { label: "Lines of Code", value: 250, suffix: "K+", prefix: "" },
    { label: "GPU Shaders Written", value: 120, suffix: "+", prefix: "" },
    { label: "Cups of Coffee", value: 9999, suffix: "+", prefix: "" },
  ];
  
  const techStack = [
    { name: "TypeScript", level: 95, color: "#FFEA00" },
    { name: "React/Next.js", level: 92, color: "#FFEA00" },
    { name: "WebGPU/WebGL", level: 88, color: "#FFEA00" },
    { name: "Three.js/R3F", level: 85, color: "#FFEA00" },
    { name: "Node.js/Bun", level: 90, color: "#FFEA00" },
    { name: "GSAP/Framer", level: 87, color: "#FFEA00" },
  ];
  
  return (
    <section className="py-24 px-4 bg-[#0a0a0a] border-y-4 border-[#FFEA00]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="brutal-tag mb-4">METRICS</span>
          <h2 className="text-mega text-[#FFEA00] mt-4">PERFORMANCE</h2>
          <p className="text-white/60 mt-4">
            Raw numbers. No fluff. Battle-tested stats.
          </p>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {metrics.map((metric, i) => (
            <div
              key={i}
              className="bg-black border-4 border-[#FFEA00] p-6 text-center shadow-[8px_8px_0_#FFEA00] hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0_#FFEA00] transition-all duration-150"
            >
              <div className="text-4xl md:text-5xl font-black text-[#FFEA00] mb-2">
                {metric.prefix}{metric.value.toLocaleString()}{metric.suffix}
              </div>
              <div className="text-sm text-white/60 uppercase tracking-wider">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
        
        {/* Tech Radar */}
        <div className="bg-black border-4 border-[#FFEA00] p-8 shadow-[8px_8px_0_#FFEA00]">
          <h3 className="text-huge text-[#FFEA00] mb-8 text-center">TECH RADAR</h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            {techStack.map((tech, i) => (
              <div key={i}>
                <div className="flex justify-between mb-2">
                  <span className="font-bold text-white uppercase tracking-wider">{tech.name}</span>
                  <span className="font-mono text-[#FFEA00]">{tech.level}%</span>
                </div>
                <div className="h-4 bg-[#111] border-2 border-[#FFEA00]/30 relative overflow-hidden">
                  <div
                    className="h-full bg-[#FFEA00] transition-all duration-1000 ease-out"
                    style={{ 
                      width: `${tech.level}%`,
                      boxShadow: `0 0 20px ${tech.color}`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
