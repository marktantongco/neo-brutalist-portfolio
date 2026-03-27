"use client";

import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ═══════════════════════════════════════════════════════════════════════════
// PARTICLE CONNECTIONS — WEBGPU NETWORK VISUALIZATION
// Particles connect when within threshold distance
// ═══════════════════════════════════════════════════════════════════════════

function ParticleConnections({ count = 150, mouse }: { count?: number; mouse: React.RefObject<{ x: number; y: number }> }) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const velocitiesRef = useRef<Float32Array | null>(null);
  const { viewport } = useThree();
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * viewport.width;
      pos[i * 3 + 1] = (Math.random() - 0.5) * viewport.height;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 2;
      
      vel[i * 3] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.005;
    }
    
    velocitiesRef.current = vel;
    
    return pos;
  }, [count, viewport]);
  
  useFrame((state) => {
    if (!pointsRef.current || !linesRef.current || !velocitiesRef.current) return;
    
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const velocities = velocitiesRef.current;
    const time = state.clock.elapsedTime;
    const mouseVal = mouse.current;
    
    const mouseX = (mouseVal.x / window.innerWidth) * 2 - 1;
    const mouseY = -(mouseVal.y / window.innerHeight) * 2 + 1;
    
    // Update particle positions
    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      
      // Mouse attraction
      const dx = mouseX * viewport.width * 0.5 - positions[idx];
      const dy = mouseY * viewport.height * 0.5 - positions[idx + 1];
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      const intensity = Math.max(0.05, 1 - dist / 5);
      
      positions[idx] += velocities[idx] + dx * 0.0005 * intensity;
      positions[idx + 1] += velocities[idx + 1] + dy * 0.0005 * intensity;
      positions[idx + 2] += Math.sin(time + i * 0.1) * 0.002;
      
      // Boundary bounce
      if (Math.abs(positions[idx]) > viewport.width * 0.5) velocities[idx] *= -1;
      if (Math.abs(positions[idx + 1]) > viewport.height * 0.5) velocities[idx + 1] *= -1;
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Update line connections
    const connectionThreshold = 1.5;
    const linePositions: number[] = [];
    const lineColors: number[] = [];
    
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const idx1 = i * 3;
        const idx2 = j * 3;
        
        const dx = positions[idx1] - positions[idx2];
        const dy = positions[idx1 + 1] - positions[idx2 + 1];
        const dz = positions[idx1 + 2] - positions[idx2 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        
        if (dist < connectionThreshold) {
          linePositions.push(
            positions[idx1], positions[idx1 + 1], positions[idx1 + 2],
            positions[idx2], positions[idx2 + 1], positions[idx2 + 2]
          );
          
          const alpha = 1 - dist / connectionThreshold;
          lineColors.push(1, 0.92, 0, alpha, 0.92, 0, alpha);
        }
      }
    }
    
    const lineGeometry = linesRef.current.geometry;
    lineGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(linePositions, 3)
    );
    lineGeometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(lineColors, 4)
    );
  });
  
  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color="#FFEA00"
          transparent
          opacity={0.8}
          sizeAttenuation
        />
      </points>
      
      <lineSegments ref={linesRef}>
        <bufferGeometry />
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.3}
        />
      </lineSegments>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// CONNECTIONS SCENE
// ═══════════════════════════════════════════════════════════════════════════

function ConnectionsScene({ mouse }: { mouse: React.RefObject<{ x: number; y: number }> }) {
  return (
    <>
      <color attach="background" args={["#000000"]} />
      <ParticleConnections count={100} mouse={mouse} />
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// CONNECTIONS CANVAS WRAPPER
// ═══════════════════════════════════════════════════════════════════════════

interface ConnectionsCanvasProps {
  mouse: React.RefObject<{ x: number; y: number }>;
  className?: string;
}

export function ConnectionsCanvas({ mouse, className = "" }: ConnectionsCanvasProps) {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ConnectionsScene mouse={mouse} />
      </Canvas>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// CODE SHOWCASE SECTION
// ═══════════════════════════════════════════════════════════════════════════

const codeExamples = [
  {
    title: "SUBGROUP VOTING",
    language: "wgsl",
    code: `// Subgroup voting for particle behavior
fn subgroup_vote(active: bool) -> bool {
  // Elect leader based on lowest ID
  let leader_id = subgroupBallot(active);
  let is_leader = subgroupElect(active);
  
  // Broadcast decision to all threads
  if (is_leader) {
    broadcast_command(ATTRACT_MOUSE);
  }
  
  return subgroupAll(active);
}`,
  },
  {
    title: "PARTICLE PHYSICS",
    language: "wgsl",
    code: `// Workgroup tiling for particle physics
@compute @workgroup_size(64)
fn simulate_particles(
  @builtin(global_invocation_id) gid: vec3<u32>
) {
  let idx = gid.x;
  
  // Shared memory for workgroup
  var<workgroup> shared_pos: array<vec4<f32>, 64>;
  
  // Load particle data
  shared_pos[local_idx] = particles[idx];
  workgroupBarrier();
  
  // Compute forces within workgroup
  let force = compute_local_forces(shared_pos);
  
  // Apply with barrier ordering
  particles[idx].velocity += force * dt;
}`,
  },
  {
    title: "ATOMIC COUNTERS",
    language: "typescript",
    code: `// Atomic counter for inventory tracking
const inventoryCounter = new AtomicU32(wgpu, 1000);

async function purchase(itemId: string) {
  // Atomic decrement with barrier
  const previous = await inventoryCounter.dec();
  
  if (previous > 0) {
    // Critical section - only one thread
    await processOrder(itemId);
    return { success: true, stock: previous - 1 };
  }
  
  return { success: false, reason: 'OUT_OF_STOCK' };
}`,
  },
];

export function CodeShowcase() {
  return (
    <section className="py-24 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="brutal-tag mb-4">COMPUTE SHADERS</span>
          <h2 className="text-mega text-[#FFEA00] mt-4">CODE SHOWCASE</h2>
          <p className="text-white/60 mt-4">
            Real WebGPU subgroup operations powering the particle systems
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {codeExamples.map((example, i) => (
            <div key={i} className="transform hover:scale-[1.02] transition-transform">
              <pre className="bg-[#0a0a0a] border-4 border-[#FFEA00] p-4 text-xs font-mono text-white/80 overflow-x-auto h-64 shadow-[6px_6px_0_#FFEA00]">
                <div className="text-[#FFEA00] text-sm font-bold uppercase tracking-wider mb-2 pb-2 border-b border-[#FFEA00]/30">
                  {example.title}
                </div>
                <code>{example.code}</code>
              </pre>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
