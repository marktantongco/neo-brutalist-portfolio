"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ═══════════════════════════════════════════════════════════════════════════
// SCROLL REVEAL — BRUTALIST ENTRANCE
// ═══════════════════════════════════════════════════════════════════════════

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  animation?: "fadeUp" | "fadeLeft" | "fadeRight" | "scale" | "brutal";
  delay?: number;
}

export function ScrollReveal({ 
  children, 
  className = "", 
  animation = "fadeUp",
  delay = 0 
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!ref.current) return;
    
    const animations: Record<string, gsap.TweenVars> = {
      fadeUp: { opacity: 0, y: 80 },
      fadeLeft: { opacity: 0, x: -80 },
      fadeRight: { opacity: 0, x: 80 },
      scale: { opacity: 0, scale: 0.8 },
      brutal: { opacity: 0, y: 100, skewY: 3 },
    };
    
    gsap.set(ref.current, animations[animation]);
    
    gsap.to(ref.current, {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      skewY: 0,
      duration: 1,
      delay,
      ease: "power4.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 85%",
        end: "bottom 15%",
        toggleActions: "play none none reverse",
      },
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [animation, delay]);
  
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// PARALLAX SECTION — DEPTH PERCEPTION
// ═══════════════════════════════════════════════════════════════════════════

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}

export function ParallaxSection({ children, className = "", speed = 0.5 }: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!ref.current) return;
    
    gsap.to(ref.current, {
      y: () => window.innerHeight * speed * 0.3,
      ease: "none",
      scrollTrigger: {
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [speed]);
  
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// COUNTER — ANIMATED NUMBERS
// ═══════════════════════════════════════════════════════════════════════════

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export function Counter({ end, duration = 2, suffix = "", prefix = "", className = "" }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  
  useEffect(() => {
    if (!ref.current || hasAnimated) return;
    
    ScrollTrigger.create({
      trigger: ref.current,
      start: "top 80%",
      onEnter: () => {
        if (!hasAnimated) {
          gsap.to({ val: 0 }, {
            val: end,
            duration,
            ease: "power2.out",
            onUpdate: function() {
              if (ref.current) {
                ref.current.textContent = prefix + Math.floor(this.targets()[0].val).toLocaleString() + suffix;
              }
            },
          });
          setHasAnimated(true);
        }
      },
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [end, duration, suffix, prefix, hasAnimated]);
  
  return <span ref={ref} className={className}>{prefix}0{suffix}</span>;
}

// ═══════════════════════════════════════════════════════════════════════════
// STAGGER GRID — SEQUENTIAL REVEAL
// ═══════════════════════════════════════════════════════════════════════════

interface StaggerGridProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerGrid({ children, className = "", staggerDelay = 0.1 }: StaggerGridProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!ref.current) return;
    
    const items = ref.current.children;
    
    gsap.set(items, { opacity: 0, y: 50, scale: 0.95 });
    
    ScrollTrigger.create({
      trigger: ref.current,
      start: "top 80%",
      onEnter: () => {
        gsap.to(items, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: staggerDelay,
          ease: "power3.out",
        });
      },
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [staggerDelay]);
  
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// HORIZONTAL SCROLL — BRUTALIST GALLERY
// ═══════════════════════════════════════════════════════════════════════════

interface HorizontalScrollProps {
  children: React.ReactNode;
  className?: string;
}

export function HorizontalScroll({ children, className = "" }: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current || !scrollerRef.current) return;
    
    const scroller = scrollerRef.current;
    const scrollWidth = scroller.scrollWidth - window.innerWidth;
    
    gsap.to(scroller, {
      x: -scrollWidth,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${scrollWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div ref={scrollerRef} className="flex gap-8 h-screen items-center px-8">
        {children}
      </div>
    </div>
  );
}
