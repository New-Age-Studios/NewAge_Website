"use client";

import { useEffect, useRef } from "react";
import { CheckCircle, Download, ShoppingCart } from "lucide-react";
import { FaDiscord } from "react-icons/fa";
import Link from "next/link";

function Confetti() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = [];
    const colors = ["#ff5100", "#ff8c42", "#ffffff", "#ffd700", "#ff3c3c", "#42b3ff"];

    for (let i = 0; i < 180; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        w: Math.random() * 10 + 5,
        h: Math.random() * 5 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: Math.random() * 3 + 2,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.2,
        drift: (Math.random() - 0.5) * 1.5,
        opacity: 1,
      });
    }

    let animId;
    let frame = 0;

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      if (frame >= 180) {
        // Animation done — clear completely and stop
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }

      const fadeStart = 120;
      pieces.forEach((p) => {
        p.y += p.speed;
        p.x += p.drift;
        p.angle += p.spin;
        if (frame > fadeStart) p.opacity = Math.max(0, 1 - (frame - fadeStart) / 60);
        if (p.y > canvas.height) {
          p.y = -10;
          p.x = Math.random() * canvas.width;
        }

        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x + p.w / 2, p.y + p.h / 2);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });

      animId = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[60]"
    />
  );
}

export default function SuccessClient({ lang, t, transactionId }) {
  return (
    <>
      <Confetti />


      <style>{`
        @keyframes pipinhoPop {
          from { transform: translateY(100%); }
          to   { transform: translateY(0); }
        }
        @keyframes checkPop {
          0%   { transform: scale(0) rotate(-20deg); opacity: 0; }
          60%  { transform: scale(1.15) rotate(4deg); opacity: 1; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes cardGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(255,81,0,0.15); }
          50%       { box-shadow: 0 0 40px rgba(255,81,0,0.35); }
        }
      `}</style>

      <div
        className="relative overflow-hidden"
        style={{
          fontFamily: "'Inter', sans-serif",
          minHeight: "100vh",
          paddingTop: 100,
          paddingBottom: 80,
          backgroundImage: "url('/nadigital.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/80 z-0 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-[600px] bg-gradient-to-b from-orange-500/20 to-transparent pointer-events-none z-0" />
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-orange-500/20 blur-[120px] rounded-full pointer-events-none z-0" />
        <div
          className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="container mx-auto max-w-[640px] px-6 relative z-10">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-10">
            <div
              className="w-24 h-24 rounded-full bg-green-500/10 border-2 border-green-500/40 flex items-center justify-center mb-6"
              style={{ animation: "checkPop 0.6s cubic-bezier(0.34,1.56,0.64,1) 0.1s both" }}
            >
              <CheckCircle className="text-green-500 w-14 h-14" strokeWidth={1.5} />
            </div>
            <h1
              className="text-4xl md:text-5xl font-bold text-white mb-3"
              style={{ fontFamily: "'Barlow', sans-serif", animation: "fadeSlideUp 0.5s ease 0.25s both" }}
            >
              {t.title}
            </h1>
            <p className="text-[#a1a1aa] text-base max-w-md" style={{ animation: "fadeSlideUp 0.5s ease 0.4s both" }}>
              {t.subtitle}
            </p>
          </div>

          {/* Card */}
          <div
            className="bg-[#18181b] border border-[#27272a] rounded-2xl overflow-hidden mb-5"
            style={{ animation: "fadeSlideUp 0.5s ease 0.55s both, cardGlow 3s ease 1s infinite" }}
          >
            {transactionId && (
              <div className="px-6 py-4 border-b border-[#27272a]">
                <p className="text-[#a1a1aa] text-xs font-semibold tracking-wider uppercase mb-2">{t.transactionId}</p>
                <div className="flex items-center gap-2 bg-[#27272a] rounded-xl px-4 py-2.5">
                  <span className="text-white font-mono text-xs flex-1 break-all">{transactionId}</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(transactionId);
                      const btn = document.getElementById("copy-btn");
                      if (btn) { btn.textContent = "✓"; setTimeout(() => { btn.textContent = "⎘"; }, 2000); }
                    }}
                    id="copy-btn"
                    title={t.copy || "Copy"}
                    className="shrink-0 w-7 h-7 flex items-center justify-center rounded-lg bg-white/10 hover:bg-[#ff5100] text-white text-sm transition-all duration-200 font-bold"
                  >
                    ⎘
                  </button>
                </div>
              </div>
            )}

            {/* Congratulations section */}
            <div className="flex items-end gap-4 px-4 pt-6 pb-0 overflow-hidden">
              {/* Pipinho on the left */}
              <div
                className="shrink-0"
                style={{ animation: "pipinhoPop 0.7s cubic-bezier(0.34,1.56,0.64,1) 0.5s both" }}
              >
                <img
                  src="/pipinhob.png"
                  alt="Pipinho"
                  className="h-36 md:h-44 object-contain drop-shadow-2xl"
                />
              </div>

              {/* Text on the right */}
              <div className="flex flex-col items-start text-left gap-2 pb-6">
                <p className="text-white font-bold text-base md:text-lg">
                  <span className="mr-1.5">🧡</span>{t.congratsTitle}
                </p>
                <p className="text-[#a1a1aa] text-xs md:text-sm leading-relaxed">
                  {t.congratsDescription}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3" style={{ animation: "fadeSlideUp 0.5s ease 0.7s both" }}>
            <a
              href="https://portal.cfx.re/assets/granted-assets?search=newage"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#ff5100] hover:bg-[#e64a00] active:scale-[0.98] text-white py-4 px-4 rounded-xl flex items-center justify-center gap-2 font-bold transition-all text-base"
            >
              <Download size={20} />
              {t.downloadAssets}
            </a>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={`/${lang}/products`}
                className="flex-1 bg-[#27272a] hover:bg-[#3f3f46] text-white py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 font-medium transition-colors text-sm"
              >
                <ShoppingCart size={16} />
                {t.continueShopping}
              </Link>

              <a
                href="https://discord.gg/tyKTs4QyYA"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-[#27272a] hover:bg-[#3f3f46] text-white py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 font-medium transition-colors text-sm"
              >
                <FaDiscord size={18} />
                {t.discord}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
