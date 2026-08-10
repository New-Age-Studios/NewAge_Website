"use client";

import { useState, useEffect } from "react";
import { Heart, X, Coffee, DollarSign, Check } from "lucide-react";

export default function KofiDonateButton({ dict = {}, lang = "en" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState(5);
  const [customAmount, setCustomAmount] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("onetime"); // "onetime" | "monthly"

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

  const finalAmount = customAmount ? parseFloat(customAmount) || amount : amount;

  const handleDonateSubmit = (e) => {
    e.preventDefault();
    // Build Ko-fi URL
    const baseUrl = "https://ko-fi.com/newagestudios";
    window.open(baseUrl, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  const presets = [1, 3, 5, 10, 25];

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
        <Heart size={18} fill="currentColor" className="text-white animate-pulse" />
        <span>{buttonText}</span>
        <img src="/ko-fi.svg" alt="Ko-fi" className="h-8 w-auto object-contain ml-1.5 drop-shadow-md" style={{ height: 32 }} />
      </button>

      {/* Ko-fi Donation Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 animate-backdrop-fade">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Container (Native Dark Theme) */}
          <div
            className="relative w-full max-w-[440px] bg-[#191919] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-modal-pop border border-white/10"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#161616]">
              <div className="flex items-center gap-3">
                <img
                  src="/na-studios.svg"
                  alt="New Age Studios"
                  className="w-9 h-9 object-contain shrink-0"
                />
                <div>
                  <h3 className="text-base font-bold text-white leading-tight">
                    {lang === "pt-br" ? "Apoiar a New Age Studios" : "Support New Age Studios"}
                  </h3>
                  <p className="text-xs text-white/40">
                    {lang === "pt-br" ? "Sua contribuição ajuda nosso projeto" : "Your donation empowers our creation"}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form Body */}
            <form onSubmit={handleDonateSubmit} className="p-6 flex flex-col gap-5 bg-[#191919]">
              {/* Type Switcher (One-time vs Monthly) */}
              <div className="grid grid-cols-2 p-1 rounded-2xl bg-[#121212] border border-white/5">
                <button
                  type="button"
                  onClick={() => setType("onetime")}
                  className={`py-2.5 text-xs font-bold rounded-xl transition-all ${
                    type === "onetime"
                      ? "bg-[#f97316] text-white shadow-md"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  {lang === "pt-br" ? "Única Vez" : "One Time"}
                </button>
                <button
                  type="button"
                  onClick={() => setType("monthly")}
                  className={`py-2.5 text-xs font-bold rounded-xl transition-all ${
                    type === "monthly"
                      ? "bg-[#f97316] text-white shadow-md"
                      : "text-white/50 hover:text-white"
                  }`}
                >
                  {lang === "pt-br" ? "Mensal" : "Monthly"}
                </button>
              </div>

              {/* Amount Selection Presets */}
              <div>
                <label className="block text-xs font-semibold text-white/60 mb-2.5">
                  {lang === "pt-br" ? "Escolha o Valor (USD)" : "Select Amount (USD)"}
                </label>
                <div className="grid grid-cols-5 gap-2 mb-3">
                  {presets.map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => {
                        setAmount(val);
                        setCustomAmount("");
                      }}
                      className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${
                        amount === val && !customAmount
                          ? "bg-orange-500/20 border-[#f97316] text-[#f97316]"
                          : "bg-[#141414] border-white/5 text-white/70 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      ${val}
                    </button>
                  ))}
                </div>

                {/* Custom Amount Input */}
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40 text-sm font-bold">$</span>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    placeholder={lang === "pt-br" ? "Outro valor..." : "Custom amount..."}
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full bg-[#141414] border border-white/10 rounded-xl pl-8 pr-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#f97316] transition-colors"
                  />
                </div>
              </div>

              {/* Supporter Name Input */}
              <div>
                <label className="block text-xs font-semibold text-white/60 mb-1.5">
                  {lang === "pt-br" ? "Seu Nome (opcional)" : "Display Name (optional)"}
                </label>
                <input
                  type="text"
                  placeholder={lang === "pt-br" ? "Ex: Gabriel ou Anônimo" : "Ex: John Doe"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#141414] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#f97316] transition-colors"
                />
              </div>

              {/* Message Input */}
              <div>
                <label className="block text-xs font-semibold text-white/60 mb-1.5">
                  {lang === "pt-br" ? "Sua Mensagem (opcional)" : "Your Message (optional)"}
                </label>
                <textarea
                  rows={2}
                  placeholder={lang === "pt-br" ? "Deixe um recado para a equipe..." : "Leave a message of encouragement..."}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-[#141414] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#f97316] transition-colors resize-none"
                />
              </div>

              {/* Donate Action Button */}
              <button
                type="submit"
                className="w-full py-4 rounded-xl font-bold text-white transition-all hover:brightness-110 active:scale-95 flex items-center justify-center gap-2 text-base shadow-xl"
                style={{
                  background: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
                  boxShadow: "0 4px 20px rgba(249, 115, 22, 0.3)"
                }}
              >
                <Heart size={18} fill="currentColor" />
                {lang === "pt-br" ? `Doar $${finalAmount || 5}` : `Donate $${finalAmount || 5}`}
              </button>

              <p className="text-[11px] text-center text-white/30">
                {lang === "pt-br" ? "Processado com segurança via Ko-fi" : "Securely processed via Ko-fi"}
              </p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
