"use client";

import { useState, useEffect } from "react";
import { Heart, X, Coffee, DollarSign, Check } from "lucide-react";

export default function KofiDonateButton({ dict = {}, lang = "en" }) {
  const [isOpen, setIsOpen] = useState(false);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const buttonText = dict.donate || (lang === "pt-br" ? "Fazer uma Doação" : "Support with a Donation");

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="mt-3.5 flex items-center justify-center gap-2.5 w-full py-3.5 px-4 rounded-xl text-sm font-bold transition-all hover:brightness-110 active:scale-95 shadow-lg cursor-pointer"
        style={{
          background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
          color: "#ffffff",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 4px 20px rgba(249, 115, 22, 0.25)"
        }}
      >
        <Heart size={16} fill="currentColor" className="text-white animate-pulse shrink-0" />
        <span className="whitespace-nowrap text-xs sm:text-sm">{buttonText}</span>
        <img src="/ko-fi.svg" alt="Ko-fi" className="h-5 w-auto object-contain ml-0.5 drop-shadow-md shrink-0" style={{ height: 20 }} />
      </button>

      {/* Ko-fi Donation Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 animate-backdrop-fade">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-[400px] animate-modal-pop flex flex-col items-center">
            <div className="relative w-full bg-[#f9f9f9] rounded-2xl overflow-hidden shadow-2xl">
              {/* Floating Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-2 right-2 z-10 w-9 h-9 rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X size={22} strokeWidth={2.5} />
              </button>
              
              <iframe 
                id="kofiframe" 
                src="https://ko-fi.com/newagestudios/?hidefeed=true&widget=true&embed=true&preview=true" 
                style={{ border: "none", width: "100%", background: "transparent" }} 
                height="680" 
                title="newagestudios"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
