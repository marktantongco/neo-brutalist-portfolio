"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Text } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

// ═══════════════════════════════════════════════════════════════════════════
// 3D PROJECT CARD
// ═══════════════════════════════════════════════════════════════════════════

interface Project3DCardProps {
  title: string;
  subtitle: string;
  position: [number, number, number];
  rotation: [number, number, number];
  isCenter: boolean;
  onClick: () => void;
}

function Project3DCard({ title, subtitle, position, rotation, isCenter, onClick }: Project3DCardProps) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.1;
    }
  });
  
  return (
    <group
      ref={meshRef}
      position={position}
      rotation={rotation}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Card background */}
      <mesh>
        <boxGeometry args={[3, 2, 0.1]} />
        <meshBasicMaterial
          color={isCenter || hovered ? "#FFEA00" : "#1a1a1a"}
        />
      </mesh>
      
      {/* Border */}
      <mesh position={[0, 0, 0.06]}>
        <boxGeometry args={[3.1, 2.1, 0.02]} />
        <meshBasicMaterial color="#FFEA00" />
      </mesh>
      
      {/* Title */}
      <Text
        position={[0, 0.3, 0.15]}
        fontSize={0.25}
        color={isCenter || hovered ? "#000000" : "#FFEA00"}
        anchorX="center"
        anchorY="middle"
        font="/fonts/geist-sans.woff"
      >
        {title}
      </Text>
      
      {/* Subtitle */}
      <Text
        position={[0, -0.2, 0.15]}
        fontSize={0.1}
        color={isCenter || hovered ? "#000000" : "#FFFFFF"}
        anchorX="center"
        anchorY="middle"
        font="/fonts/geist-sans.woff"
      >
        {subtitle}
      </Text>
    </group>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 3D CAROUSEL SCENE
// ═══════════════════════════════════════════════════════════════════════════

interface Project3D {
  id: string;
  title: string;
  subtitle: string;
}

interface CarouselSceneProps {
  projects: Project3D[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

function CarouselScene({ projects, activeIndex, onSelect }: CarouselSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (groupRef.current) {
      const targetRotation = -activeIndex * (Math.PI * 2 / projects.length);
      groupRef.current.rotation.y += (targetRotation - groupRef.current.rotation.y) * 0.05;
    }
  });
  
  return (
    <>
      <color attach="background" args={["#000000"]} />
      <ambientLight intensity={1} />
      
      <group ref={groupRef}>
        {projects.map((project, i) => {
          const angle = (i / projects.length) * Math.PI * 2;
          const radius = 5;
          const x = Math.sin(angle) * radius;
          const z = Math.cos(angle) * radius;
          const isActive = i === activeIndex;
          
          return (
            <Project3DCard
              key={project.id}
              title={project.title}
              subtitle={project.subtitle}
              position={[x, 0, z]}
              rotation={[0, angle + Math.PI, 0]}
              isCenter={isActive}
              onClick={() => onSelect(i)}
            />
          );
        })}
      </group>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 3D PROJECT CAROUSEL
// ═══════════════════════════════════════════════════════════════════════════

interface ProjectCarouselProps {
  projects: Project3D[];
}

export function ProjectCarousel3D({ projects }: ProjectCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const handlePrev = () => {
    setActiveIndex(prev => (prev - 1 + projects.length) % projects.length);
  };
  
  const handleNext = () => {
    setActiveIndex(prev => (prev + 1) % projects.length);
  };
  
  const activeProject = projects[activeIndex];
  
  return (
    <div className="w-full">
      {/* 3D Canvas */}
      <div ref={containerRef} className="w-full h-[400px] relative">
        <Canvas camera={{ position: [0, 2, 8], fov: 50 }}>
          <CarouselScene
            projects={projects}
            activeIndex={activeIndex}
            onSelect={setActiveIndex}
          />
        </Canvas>
        
        {/* Navigation arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black border-4 border-[#FFEA00] flex items-center justify-center hover:bg-[#FFEA00] hover:text-black transition-colors group"
        >
          <ChevronLeft className="w-6 h-6 text-[#FFEA00] group-hover:text-black" />
        </button>
        
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black border-4 border-[#FFEA00] flex items-center justify-center hover:bg-[#FFEA00] hover:text-black transition-colors group"
        >
          <ChevronRight className="w-6 h-6 text-[#FFEA00] group-hover:text-black" />
        </button>
      </div>
      
      {/* Active project info */}
      <div className="mt-8 text-center">
        <h3 className="text-huge text-[#FFEA00]">{activeProject.title}</h3>
        <p className="text-white/70 mt-2">{activeProject.subtitle}</p>
        
        {/* Project indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`
                w-3 h-3 border-2 transition-all
                ${i === activeIndex 
                  ? "bg-[#FFEA00] border-[#FFEA00]" 
                  : "bg-transparent border-[#FFEA00]/50 hover:border-[#FFEA00]"
                }
              `}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// PAGE TRANSITION WRAPPER
// ═══════════════════════════════════════════════════════════════════════════

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        y: "-100%",
        duration: 0.8,
        ease: "power4.inOut",
        delay: 0.2,
      });
    }
  }, []);
  
  return (
    <div className="relative">
      {/* Transition overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[9999] bg-[#FFEA00] origin-top"
        style={{ transform: "translateY(0)" }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-black text-6xl font-black animate-pulse">MT</span>
        </div>
      </div>
      
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// ANIMATED SECTION DIVIDER
// ═══════════════════════════════════════════════════════════════════════════

export function SectionDivider({ text }: { text: string }) {
  const dividerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (dividerRef.current) {
      gsap.fromTo(dividerRef.current.querySelectorAll(".divider-char"),
        { opacity: 0, y: 30, rotationX: -90 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.6,
          stagger: 0.05,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: dividerRef.current,
            start: "top 80%",
          },
        }
      );
    }
  }, [text]);
  
  return (
    <div ref={dividerRef} className="py-12 flex items-center justify-center gap-4">
      <div className="flex-1 h-1 bg-[#FFEA00]" />
      <div className="flex">
        {text.split("").map((char, i) => (
          <span
            key={i}
            className="divider-char text-[#FFEA00] text-xl font-bold uppercase tracking-widest"
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>
      <div className="flex-1 h-1 bg-[#FFEA00]" />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SCROLL SNAP CONTAINER
// ═══════════════════════════════════════════════════════════════════════════

interface ScrollSnapContainerProps {
  children: React.ReactNode;
}

export function ScrollSnapContainer({ children }: ScrollSnapContainerProps) {
  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
      {children}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SCROLL SNAP SECTION
// ═══════════════════════════════════════════════════════════════════════════

interface ScrollSnapSectionProps {
  children: React.ReactNode;
  id?: string;
}

export function ScrollSnapSection({ children, id }: ScrollSnapSectionProps) {
  return (
    <section id={id} className="min-h-screen snap-start snap-always">
      {children}
    </section>
  );
}
