"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

// ═══════════════════════════════════════════════════════════════════════════
// BRUTALIST CONTACT FORM
// ═══════════════════════════════════════════════════════════════════════════

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "NAME REQUIRED";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "EMAIL REQUIRED";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "INVALID EMAIL FORMAT";
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = "SUBJECT REQUIRED";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "MESSAGE REQUIRED";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "MESSAGE TOO SHORT (MIN 10 CHARS)";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Shake animation on error
      if (formRef.current) {
        gsap.to(formRef.current, {
          x: [-10, 10, -10, 10, 0],
          duration: 0.4,
          ease: "power2.out",
        });
      }
      return;
    }
    
    setStatus("loading");
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Random success/error for demo
    const isSuccess = Math.random() > 0.2;
    
    if (isSuccess) {
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } else {
      setStatus("error");
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error on change
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };
  
  // Animate on mount
  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(formRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" }
      );
    }
  }, []);
  
  return (
    <div className="w-full max-w-2xl mx-auto">
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div className="relative">
          <label className="block text-sm font-bold uppercase tracking-wider text-[#FFEA00] mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onFocus={() => setFocusedField("name")}
            onBlur={() => setFocusedField(null)}
            className={`
              w-full px-4 py-3 bg-black text-white
              border-4 transition-all duration-200
              focus:outline-none
              ${errors.name 
                ? "border-[#FF0033]" 
                : focusedField === "name" 
                  ? "border-[#FFEA00] shadow-[4px_4px_0_#FFEA00]" 
                  : "border-[#FFEA00]/50"
              }
            `}
            placeholder="YOUR NAME"
          />
          {errors.name && (
            <p className="mt-2 text-sm text-[#FF0033] font-bold uppercase animate-pulse">
              {errors.name}
            </p>
          )}
        </div>
        
        {/* Email Field */}
        <div className="relative">
          <label className="block text-sm font-bold uppercase tracking-wider text-[#FFEA00] mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onFocus={() => setFocusedField("email")}
            onBlur={() => setFocusedField(null)}
            className={`
              w-full px-4 py-3 bg-black text-white
              border-4 transition-all duration-200
              focus:outline-none
              ${errors.email 
                ? "border-[#FF0033]" 
                : focusedField === "email" 
                  ? "border-[#FFEA00] shadow-[4px_4px_0_#FFEA00]" 
                  : "border-[#FFEA00]/50"
              }
            `}
            placeholder="YOUR@EMAIL.COM"
          />
          {errors.email && (
            <p className="mt-2 text-sm text-[#FF0033] font-bold uppercase animate-pulse">
              {errors.email}
            </p>
          )}
        </div>
        
        {/* Subject Field */}
        <div className="relative">
          <label className="block text-sm font-bold uppercase tracking-wider text-[#FFEA00] mb-2">
            Subject
          </label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            onFocus={() => setFocusedField("subject")}
            onBlur={() => setFocusedField(null)}
            className={`
              w-full px-4 py-3 bg-black text-white
              border-4 transition-all duration-200
              focus:outline-none
              ${errors.subject 
                ? "border-[#FF0033]" 
                : focusedField === "subject" 
                  ? "border-[#FFEA00] shadow-[4px_4px_0_#FFEA00]" 
                  : "border-[#FFEA00]/50"
              }
            `}
            placeholder="PROJECT INQUIRY"
          />
          {errors.subject && (
            <p className="mt-2 text-sm text-[#FF0033] font-bold uppercase animate-pulse">
              {errors.subject}
            </p>
          )}
        </div>
        
        {/* Message Field */}
        <div className="relative">
          <label className="block text-sm font-bold uppercase tracking-wider text-[#FFEA00] mb-2">
            Message
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            onFocus={() => setFocusedField("message")}
            onBlur={() => setFocusedField(null)}
            rows={6}
            className={`
              w-full px-4 py-3 bg-black text-white
              border-4 transition-all duration-200
              focus:outline-none resize-none
              ${errors.message 
                ? "border-[#FF0033]" 
                : focusedField === "message" 
                  ? "border-[#FFEA00] shadow-[4px_4px_0_#FFEA00]" 
                  : "border-[#FFEA00]/50"
              }
            `}
            placeholder="DESCRIBE YOUR PROJECT..."
          />
          {errors.message && (
            <p className="mt-2 text-sm text-[#FF0033] font-bold uppercase animate-pulse">
              {errors.message}
            </p>
          )}
          <div className="mt-2 text-right text-xs text-white/40 font-mono">
            {formData.message.length} characters
          </div>
        </div>
        
        {/* Submit Button */}
        <button
          type="submit"
          disabled={status === "loading"}
          className={`
            w-full py-4 font-bold text-lg uppercase tracking-wider
            transition-all duration-150 flex items-center justify-center gap-3
            ${status === "loading" 
              ? "bg-[#333] text-white/50 border-4 border-[#333] cursor-not-allowed" 
              : "bg-[#FFEA00] text-black border-4 border-black shadow-[6px_6px_0_#000000] hover:shadow-[8px_8px_0_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px]"
            }
          `}
        >
          {status === "loading" ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              TRANSMITTING...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              SEND MESSAGE
            </>
          )}
        </button>
      </form>
      
      {/* Status Messages */}
      {status === "success" && (
        <div className="mt-6 p-4 bg-[#00FF66]/10 border-4 border-[#00FF66] flex items-center gap-3 animate-fadeIn">
          <CheckCircle className="w-6 h-6 text-[#00FF66]" />
          <div>
            <p className="font-bold text-[#00FF66] uppercase">MESSAGE TRANSMITTED</p>
            <p className="text-white/70 text-sm">Expect a response within 24 hours.</p>
          </div>
        </div>
      )}
      
      {status === "error" && (
        <div className="mt-6 p-4 bg-[#FF0033]/10 border-4 border-[#FF0033] flex items-center gap-3 animate-fadeIn">
          <AlertCircle className="w-6 h-6 text-[#FF0033]" />
          <div>
            <p className="font-bold text-[#FF0033] uppercase">TRANSMISSION FAILED</p>
            <p className="text-white/70 text-sm">Please try again or contact directly.</p>
          </div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// CONTACT SECTION WRAPPER
// ═══════════════════════════════════════════════════════════════════════════

export function ContactSection() {
  return (
    <section className="py-24 px-4 bg-[#0a0a0a] border-y-4 border-[#FFEA00]">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left - Info */}
          <div>
            <span className="brutal-tag mb-4">GET IN TOUCH</span>
            <h2 className="text-mega text-[#FFEA00] mt-4 mb-6">LET'S TALK</h2>
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              Ready to forge something dangerous? Drop a message and let's 
              build sentient digital organisms together.
            </p>
            
            {/* Contact Info Cards */}
            <div className="space-y-4">
              <div className="border-4 border-[#FFEA00]/30 p-4 bg-black hover:border-[#FFEA00] transition-colors">
                <div className="text-[#FFEA00] text-sm font-bold uppercase tracking-wider mb-1">Email</div>
                <a href="mailto:hello@markanthony.dev" className="text-white hover:text-[#FFEA00] transition-colors">
                  hello@markanthony.dev
                </a>
              </div>
              
              <div className="border-4 border-[#FFEA00]/30 p-4 bg-black hover:border-[#FFEA00] transition-colors">
                <div className="text-[#FFEA00] text-sm font-bold uppercase tracking-wider mb-1">Location</div>
                <p className="text-white">San Francisco, CA</p>
              </div>
              
              <div className="border-4 border-[#FFEA00]/30 p-4 bg-black hover:border-[#FFEA00] transition-colors">
                <div className="text-[#FFEA00] text-sm font-bold uppercase tracking-wider mb-1">Availability</div>
                <p className="text-white">Open to freelance & full-time</p>
              </div>
            </div>
          </div>
          
          {/* Right - Form */}
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// PARTICLE TEXT — TEXT MADE OF PARTICLES
// ═══════════════════════════════════════════════════════════════════════════

interface ParticleTextProps {
  text: string;
  className?: string;
}

export function ParticleText({ text, className = "" }: ParticleTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const letters = containerRef.current.querySelectorAll(".particle-letter");
    
    gsap.fromTo(letters,
      { opacity: 0, y: 50, rotateX: -90 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: "back.out(1.7)",
      }
    );
  }, [text]);
  
  return (
    <div ref={containerRef} className={`flex flex-wrap justify-center gap-1 ${className}`}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="particle-letter inline-block text-[#FFEA00]"
          style={{
            textShadow: "0 0 20px rgba(255, 234, 0, 0.5), 0 0 40px rgba(255, 234, 0, 0.3)",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
}
