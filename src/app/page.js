"use client";

import Link from "next/link";
import { Zap, RefreshCw, Shield, Settings } from "lucide-react";

const features = [
  {
    icon: <Zap size={22} />,
    title: "Instant Delivery",
    desc: "Get access to your scripts immediately after purchase via our automated delivery system.",
  },
  {
    icon: <RefreshCw size={22} />,
    title: "Free Updates Forever",
    desc: "All scripts include lifetime free updates. We continuously improve and add new features.",
  },
  {
    icon: <Shield size={22} />,
    title: "Secure & Performant",
    desc: "Optimized for low resource usage and built with security in mind, tested on high population servers.",
  },
  {
    icon: <Settings size={22} />,
    title: "Easy Setup",
    desc: "Detailed documentation and support available 24/7. Most scripts work right out of the box.",
  },
];

export default function Home() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#0a0a0a", minHeight: "100vh" }}>
      {/* Hero */}
      <section
        className="relative flex items-center min-h-[90vh] overflow-hidden pt-16"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 60% 40%, #b84400 0%, #7c2d00 30%, #1a0a00 60%, #0a0a0a 100%)",
        }}
      >
        {/* Subtle noise overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")", opacity: 0.4 }}
        />

        <div className="relative z-10 container mx-auto max-w-[1200px] px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-center py-20">
          {/* Left text */}
          <div>
            <div
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs mb-6"
              style={{ background: "rgba(249,115,22,0.15)", border: "1px solid rgba(249,115,22,0.3)", color: "#fb923c" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
              Tebex Top Creator
            </div>

            <h1
              className="text-white mb-6 leading-none"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)", fontWeight: 900, fontFamily: "'Barlow', sans-serif", lineHeight: 1.05 }}
            >
              The most popular
              <br />vehicle scripts for
              <br />your FiveM server.
            </h1>

            <p className="mb-8 max-w-md" style={{ color: "rgba(255,255,255,0.55)", fontSize: 15, lineHeight: 1.7 }}>
              Get full access to the entire collection of scripts for a low monthly fee.
              Tested and optimized for high population FiveM servers.
            </p>

            <div className="flex items-center gap-4 flex-wrap">
              <Link
                href="/scripts"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm text-white transition-all hover:brightness-110 active:scale-95"
                style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", fontWeight: 600 }}
              >
                Browse Scripts
              </Link>
              <Link
                href="#features"
                className="text-sm transition-colors"
                style={{ color: "rgba(255,255,255,0.45)", textDecoration: "underline", textUnderlineOffset: 4 }}
              >
                Learn more ↓
              </Link>
            </div>
          </div>

          {/* Right — car image + UI overlay */}
          <div className="relative flex items-center justify-center">
            {/* Car image */}
            <div className="relative w-full max-w-lg">
              <img
                src="/hero-car.png"
                alt="Orange sports car"
                className="w-full rounded-xl object-cover"
                style={{ filter: "drop-shadow(0 40px 80px rgba(249,115,22,0.35))" }}
              />

              {/* Floating color picker card */}
              <div
                className="absolute top-4 left-0 rounded-xl p-3 text-xs"
                style={{ background: "rgba(15,15,15,0.92)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.1)", color: "#f2f2f2", minWidth: 140 }}
              >
                <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: 6 }}>Vehicle Colour</p>
                <div className="grid gap-1" style={{ gridTemplateColumns: "repeat(7, 1fr)" }}>
                  {["#f97316","#ef4444","#eab308","#22c55e","#3b82f6","#a855f7","#ec4899","#ffffff","#d4d4d4","#737373","#404040","#171717","#0ea5e9","#14b8a6"].map((c) => (
                    <div
                      key={c}
                      style={{ width: 14, height: 14, borderRadius: 3, background: c, border: c === "#f97316" ? "2px solid white" : "none" }}
                    />
                  ))}
                </div>
              </div>

              {/* Floating speed card */}
              <div
                className="absolute bottom-4 right-0 rounded-xl p-3 text-xs"
                style={{ background: "rgba(15,15,15,0.92)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.1)", color: "#f2f2f2", minWidth: 130 }}
              >
                <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: 6 }}>Glamour</p>
                <div className="flex items-center justify-between mb-2">
                  <span style={{ color: "rgba(255,255,255,0.5)" }}>Acceleration</span>
                  <span style={{ color: "#f97316" }}>●</span>
                </div>
                <div className="w-full rounded-full h-1.5" style={{ background: "rgba(255,255,255,0.1)" }}>
                  <div className="h-full rounded-full" style={{ width: "72%", background: "linear-gradient(90deg,#f97316,#fb923c)" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20" style={{ background: "#0a0a0a" }}>
        <div className="container max-w-[1200px] mx-auto px-6 lg:px-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-xl p-6 flex flex-col gap-3 transition-colors"
                style={{ background: "#141414", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(249,115,22,0.12)", color: "#f97316" }}
                >
                  {f.icon}
                </div>
                <p className="text-sm" style={{ color: "#f2f2f2", fontWeight: 600 }}>{f.title}</p>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
