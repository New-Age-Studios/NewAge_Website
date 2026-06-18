"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function CookieConsent() {
  const [show, setShow] = useState(false);
  const [closing, setClosing] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hoverState, setHoverState] = useState("none"); // "none", "accept", "refuse"

  useEffect(() => {
    // Check if user already accepted
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      // Delay slightly for effect so it pops up after loading
      const timer = setTimeout(() => {
        setMounted(true);
        // Small delay to trigger transition
        requestAnimationFrame(() => {
          setShow(true);
        });
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    setClosing(true);
    setTimeout(() => {
      localStorage.setItem("cookieConsent", "true");
      setMounted(false);
    }, 400); // Wait for exit animation
  };

  if (!mounted) return null;

  return (
    <div
      className={`fixed bottom-6 left-6 right-6 md:left-auto md:right-8 md:bottom-8 md:w-[420px] z-[100] transition-all duration-500 transform ${
        show && !closing ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
      style={{
        background: "rgba(20, 20, 20, 0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "20px",
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
        padding: "24px"
      }}
    >
      <div className="flex gap-4">
        <div className="shrink-0 w-16 h-16 flex items-center justify-center relative select-none">
          {/* Animated Emoji Character */}
          <div className="text-4xl absolute transition-all duration-300 transform" 
            style={{ 
              transform: hoverState === "accept" ? "scale(1.1) rotate(-10deg) translateX(-5px)" : 
                         hoverState === "refuse" ? "scale(0.9) translateY(5px)" : "scale(1)",
              opacity: hoverState === "refuse" ? 0.7 : 1 
            }}>
            {hoverState === "accept" ? "😋" : hoverState === "refuse" ? "🥺" : "👀"}
          </div>
          {/* Cookie */}
          <div className="text-2xl absolute transition-all duration-300 transform"
            style={{ 
              transform: hoverState === "accept" ? "translate(15px, 5px) scale(0.8) rotate(20deg)" : 
                         hoverState === "refuse" ? "translate(20px, 15px) scale(0.6) opacity-50" : "translate(15px, 10px)",
              filter: hoverState === "accept" ? "brightness(1.2)" : "grayscale(0%)"
            }}>
            🍪
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-white font-bold text-lg mb-1">Valorizamos sua privacidade</h3>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.55)" }}>
            Utilizamos cookies para personalizar conteúdos e melhorar a sua experiência. Ao continuar navegando, você concorda com nosso uso.
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={handleAccept}
              onMouseEnter={() => setHoverState("accept")}
              onMouseLeave={() => setHoverState("none")}
              className="flex-1 font-bold py-2.5 rounded-xl text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: "#f97316", color: "#fff" }}
            >
              Aceitar Todos
            </button>
            <button
              onClick={handleAccept}
              onMouseEnter={() => setHoverState("refuse")}
              onMouseLeave={() => setHoverState("none")}
              className="px-4 py-2.5 rounded-xl text-sm font-bold transition-all hover:bg-white/10 active:scale-[0.98]"
              style={{ color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              Recusar
            </button>
          </div>
        </div>
        <button 
          onClick={handleAccept} 
          className="absolute top-4 right-4 transition-colors hover:bg-white/10 rounded-full p-1"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
