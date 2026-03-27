"use client";

import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { X, ExternalLink, Github, Zap, Database, Globe, Layers, Cpu } from "lucide-react";

// ═══════════════════════════════════════════════════════════════════════════
// PROJECT DATA
// ═══════════════════════════════════════════════════════════════════════════

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  tags: string[];
  icon: "zap" | "database" | "globe" | "layers" | "cpu";
  variant: "yellow" | "outline";
  stats: {
    label: string;
    value: string;
  }[];
  features: string[];
  github?: string;
  live?: string;
}

const iconMap = {
  zap: Zap,
  database: Database,
  globe: Globe,
  layers: Layers,
  cpu: Cpu,
};

// ═══════════════════════════════════════════════════════════════════════════
// PROJECT MODAL — DETAILED VIEW
// ═══════════════════════════════════════════════════════════════════════════

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    // Defer to avoid synchronous setState
    const timeoutId = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timeoutId);
  }, []);
  
  useEffect(() => {
    if (!project) return;
    
    // Animate in
    gsap.fromTo(overlayRef.current, 
      { opacity: 0 },
      { opacity: 1, duration: 0.3 }
    );
    gsap.fromTo(modalRef.current,
      { opacity: 0, scale: 0.9, y: 50 },
      { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "power3.out" }
    );
    
    // Lock body scroll
    document.body.style.overflow = "hidden";
    
    return () => {
      document.body.style.overflow = "";
    };
  }, [project]);
  
  const handleClose = () => {
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.2 });
    gsap.to(modalRef.current, {
      opacity: 0,
      scale: 0.9,
      y: 50,
      duration: 0.3,
      onComplete: onClose,
    });
  };
  
  if (!mounted || !project) return null;
  
  const Icon = iconMap[project.icon];
  const isYellow = project.variant === "yellow";
  
  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9998] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        ref={modalRef}
        className={`
          relative w-full max-w-4xl max-h-[90vh] overflow-y-auto
          ${isYellow 
            ? "bg-[#FFEA00] border-4 border-black shadow-[12px_12px_0_#000000]" 
            : "bg-[#0a0a0a] border-4 border-[#FFEA00] shadow-[12px_12px_0_#FFEA00]"
          }
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className={`
            absolute top-4 right-4 w-12 h-12 border-4 border-current
            flex items-center justify-center
            transition-all duration-150 hover:scale-110
            ${isYellow ? "bg-black text-[#FFEA00]" : "bg-[#FFEA00] text-black"}
          `}
        >
          <X className="w-6 h-6" />
        </button>
        
        {/* Header */}
        <div className="p-8 pb-0">
          <div className={`mb-4 ${isYellow ? "text-black" : "text-[#FFEA00]"}`}>
            <Icon className="w-16 h-16" />
          </div>
          
          <h2 className={`text-mega ${isYellow ? "text-black" : "text-[#FFEA00]"}`}>
            {project.title}
          </h2>
          
          <p className={`text-brutal-code mt-2 ${isYellow ? "text-black/70" : "text-[#FFEA00]/70"}`}>
            {project.subtitle}
          </p>
        </div>
        
        {/* Content */}
        <div className="p-8">
          {/* Description */}
          <div className="mb-8">
            <h3 className={`text-huge mb-4 ${isYellow ? "text-black" : "text-white"}`}>
              Overview
            </h3>
            <p className={`text-lg leading-relaxed ${isYellow ? "text-black/80" : "text-white/80"}`}>
              {project.longDescription}
            </p>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {project.stats.map((stat, i) => (
              <div
                key={i}
                className={`
                  p-4 border-4 border-current text-center
                  ${isYellow ? "bg-black text-[#FFEA00]" : "bg-[#FFEA00] text-black"}
                `}
              >
                <div className="text-2xl font-black">{stat.value}</div>
                <div className="text-xs uppercase tracking-wider mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
          
          {/* Features */}
          <div className="mb-8">
            <h3 className={`text-huge mb-4 ${isYellow ? "text-black" : "text-white"}`}>
              Key Features
            </h3>
            <ul className="space-y-2">
              {project.features.map((feature, i) => (
                <li key={i} className={`flex items-start gap-3 ${isYellow ? "text-black/80" : "text-white/80"}`}>
                  <span className={`mt-1 w-2 h-2 border-2 border-current ${isYellow ? "bg-black" : "bg-[#FFEA00]"}`} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className={`
                  px-4 py-2 text-sm font-bold uppercase tracking-wider
                  ${isYellow 
                    ? "bg-black text-[#FFEA00] border-2 border-black" 
                    : "bg-[#FFEA00] text-black border-2 border-[#FFEA00]"
                  }
                `}
              >
                {tag}
              </span>
            ))}
          </div>
          
          {/* Actions */}
          <div className="flex gap-4">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  flex items-center gap-2 px-6 py-3 font-bold uppercase
                  transition-all duration-150 hover:translate-x-[-2px] hover:translate-y-[-2px]
                  ${isYellow 
                    ? "bg-black text-[#FFEA00] border-4 border-black shadow-[4px_4px_0_#000000] hover:shadow-[6px_6px_0_#000000]" 
                    : "bg-[#FFEA00] text-black border-4 border-[#FFEA00] shadow-[4px_4px_0_#FFEA00] hover:shadow-[6px_6px_0_#FFEA00]"
                  }
                `}
              >
                <Github className="w-5 h-5" />
                View Source
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  flex items-center gap-2 px-6 py-3 font-bold uppercase
                  transition-all duration-150 hover:translate-x-[-2px] hover:translate-y-[-2px]
                  ${isYellow 
                    ? "bg-transparent text-black border-4 border-black shadow-[4px_4px_0_#000000] hover:shadow-[6px_6px_0_#000000]" 
                    : "bg-transparent text-[#FFEA00] border-4 border-[#FFEA00] shadow-[4px_4px_0_#FFEA00] hover:shadow-[6px_6px_0_#FFEA00]"
                  }
                `}
              >
                <ExternalLink className="w-5 h-5" />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// PROJECT CARD — BRUTALIST PREVIEW
// ═══════════════════════════════════════════════════════════════════════════

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
    }
  }, []);
  
  const Icon = iconMap[project.icon];
  const isYellow = project.variant === "yellow";
  
  return (
    <div
      ref={cardRef}
      onClick={onClick}
      className={`
        relative p-6 cursor-pointer transition-all duration-150
        ${isYellow 
          ? "bg-[#FFEA00] border-4 border-black shadow-[8px_8px_0_#000000]" 
          : "bg-[#0a0a0a] border-4 border-[#FFEA00] shadow-[8px_8px_0_#FFEA00]"
        }
        hover:translate-x-[-4px] hover:translate-y-[-4px]
        ${isYellow 
          ? "hover:shadow-[12px_12px_0_#000000]" 
          : "hover:shadow-[12px_12px_0_#FFEA00]"
        }
      `}
    >
      {/* Icon */}
      <div className={`mb-4 ${isYellow ? "text-black" : "text-[#FFEA00]"}`}>
        <Icon className="w-12 h-12" />
      </div>
      
      {/* Title */}
      <h3 className={`text-huge mb-1 ${isYellow ? "text-black" : "text-[#FFEA00]"}`}>
        {project.title}
      </h3>
      
      {/* Subtitle */}
      <p className={`text-brutal-code mb-4 ${isYellow ? "text-black/70" : "text-[#FFEA00]/70"}`}>
        {project.subtitle}
      </p>
      
      {/* Description */}
      <p className={`text-base mb-4 leading-relaxed ${isYellow ? "text-black/80" : "text-white"}`}>
        {project.description}
      </p>
      
      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {project.tags.slice(0, 3).map((tag, i) => (
          <span
            key={i}
            className={`
              px-3 py-1 text-xs font-bold uppercase tracking-wider
              ${isYellow 
                ? "bg-black text-[#FFEA00] border-2 border-black" 
                : "bg-[#FFEA00] text-black border-2 border-[#FFEA00]"
              }
            `}
          >
            {tag}
          </span>
        ))}
        {project.tags.length > 3 && (
          <span className={`px-3 py-1 text-xs font-bold ${isYellow ? "text-black" : "text-[#FFEA00]"}`}>
            +{project.tags.length - 3}
          </span>
        )}
      </div>
      
      {/* View More Indicator */}
      <div className={`mt-6 text-sm font-bold uppercase tracking-wider ${isYellow ? "text-black" : "text-[#FFEA00]"}`}>
        Click to explore →
      </div>
    </div>
  );
}
