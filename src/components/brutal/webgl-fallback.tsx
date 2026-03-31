"use client";

import { useState, useCallback, Component, type ReactNode } from "react";

// ═══════════════════════════════════════════════════════════════════════════
// WEBGL DETECTION UTILITY
// ═══════════════════════════════════════════════════════════════════════════

export function isWebGLAvailable(): boolean {
  if (typeof window === "undefined") return false;
  
  try {
    const canvas = document.createElement("canvas");
    
    // Try WebGL2 first
    let gl = canvas.getContext("webgl2") || canvas.getContext("experimental-webgl2");
    
    // Fall back to WebGL1
    if (!gl) {
      gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    }
    
    return !!gl;
  } catch (e) {
    return false;
  }
}

export function getWebGLErrorMessage(): string | null {
  if (typeof window === "undefined") return null;
  
  try {
    const canvas = document.createElement("canvas");
    
    // Try WebGL2 first
    let gl = canvas.getContext("webgl2") || canvas.getContext("experimental-webgl2");
    
    // Fall back to WebGL1
    if (!gl) {
      gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    }
    
    if (!gl) {
      return "WebGL is not supported by your browser. Please try a modern browser like Chrome, Firefox, or Edge.";
    }
    
    return null;
  } catch (e) {
    return "WebGL initialization failed. Your browser may have WebGL disabled.";
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// WEBGL STATUS HOOK
// ═══════════════════════════════════════════════════════════════════════════

export function useWebGL() {
  // Use lazy initialization to avoid the setState in effect issue
  const [isAvailable, setIsAvailable] = useState<boolean | null>(() => {
    // Only run on client
    if (typeof window === "undefined") return null;
    return isWebGLAvailable();
  });
  
  const [errorMessage, setErrorMessage] = useState<string | null>(() => {
    // Only run on client
    if (typeof window === "undefined") return null;
    return isWebGLAvailable() ? null : getWebGLErrorMessage();
  });
  
  return { isAvailable, errorMessage };
}

// ═══════════════════════════════════════════════════════════════════════════
// ERROR BOUNDARY FOR 3D SCENE
// ═══════════════════════════════════════════════════════════════════════════

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class WebGL3DErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }
  
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("3D Scene Error:", error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    
    return this.props.children;
  }
}

// ═══════════════════════════════════════════════════════════════════════════
// CSS-BASED FALLBACK BACKGROUND
// ═══════════════════════════════════════════════════════════════════════════

export function CSSFallbackBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0a0a] to-black" />
      
      {/* Animated particles using CSS */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-float"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              backgroundColor: i % 3 === 0 ? "#FFEA00" : i % 3 === 1 ? "#00FFFF" : "#CCFF00",
              opacity: Math.random() * 0.6 + 0.2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 5}s`,
            }}
          />
        ))}
      </div>
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255, 234, 0, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 234, 0, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />
      
      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
      
      {/* Floating geometric shapes using CSS */}
      <div className="absolute top-1/4 left-1/4 w-20 h-20 border-2 border-[#FFEA00]/30 rotate-45 animate-pulse" />
      <div className="absolute top-1/3 right-1/4 w-16 h-16 border-2 border-[#00FFFF]/30 rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-1/3 left-1/3 w-12 h-12 border-2 border-[#CCFF00]/30 animate-pulse" style={{ animationDelay: "2s" }} />
      <div className="absolute bottom-1/4 right-1/3 w-24 h-24 border-2 border-[#FFEA00]/20 rotate-12 animate-pulse" style={{ animationDelay: "0.5s" }} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// WEBGL NOTICE COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function WebGLNotice() {
  return (
    <div className="fixed bottom-4 left-4 z-50 bg-black border-2 border-[#FFEA00] p-3 max-w-xs">
      <div className="flex items-start gap-2">
        <div className="w-2 h-2 bg-[#FFEA00] rounded-full mt-1.5 animate-pulse" />
        <div>
          <p className="text-[#FFEA00] font-bold text-xs uppercase tracking-wider">
            Visual Fallback Active
          </p>
          <p className="text-white/60 text-xs mt-1">
            WebGL unavailable. Showing CSS animations instead.
          </p>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// SAFE 3D SCENE WRAPPER
// ═══════════════════════════════════════════════════════════════════════════

interface Safe3DSceneProps {
  children: ReactNode;
  mouse?: React.RefObject<{ x: number; y: number }>;
}

export function Safe3DScene({ children }: Safe3DSceneProps) {
  const { isAvailable } = useWebGL();
  const [renderError, setRenderError] = useState(false);
  
  // Reset error state on retry
  const handleRetry = useCallback(() => {
    setRenderError(false);
  }, []);
  
  // If WebGL is not available, show CSS fallback
  if (isAvailable === false || renderError) {
    return (
      <>
        <CSSFallbackBackground />
        <WebGLNotice />
      </>
    );
  }
  
  // While checking WebGL availability, show loading
  if (isAvailable === null) {
    return (
      <div className="absolute inset-0 bg-black">
        <div className="flex items-center justify-center h-full">
          <div className="text-[#FFEA00] font-mono text-sm animate-pulse">
            Initializing visual engine...
          </div>
        </div>
      </div>
    );
  }
  
  // Wrap 3D scene in error boundary
  return (
    <WebGL3DErrorBoundary
      fallback={
        <>
          <CSSFallbackBackground />
          <WebGLNotice />
        </>
      }
    >
      {children}
    </WebGL3DErrorBoundary>
  );
}
