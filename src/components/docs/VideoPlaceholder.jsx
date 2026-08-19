"use client";

import { Play, Clock } from "lucide-react";
import { useParams } from 'next/navigation';

export function VideoPlaceholder({ imageSrc = "/pipinhod.png" }) {
  const params = useParams();
  const lang = params?.lang || 'en';
  const isPt = lang === 'pt-br';
  return (
    <div className="relative w-full aspect-[4/3] sm:aspect-video min-h-[260px] max-h-[450px] rounded-xl overflow-hidden group mb-8 border border-[#3c3127] bg-[#0a0a0a]">
      
      {/* Blurred Background for empty spaces */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 blur-xl"
        style={{ backgroundImage: `url('${imageSrc}')` }}
      />
      
      {/* Main Image - Contain so it doesn't crop */}
      <div 
        className="absolute inset-0 bg-contain bg-center bg-no-repeat transition-transform duration-1000 group-hover:scale-105"
        style={{ backgroundImage: `url('${imageSrc}')` }}
      />
      <div className="absolute inset-0 bg-black/50" />

      {/* Camera Viewfinder UI */}
      {/* Viewfinder Corners */}
      <div className="hidden sm:block absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-white/30" />
      <div className="hidden sm:block absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/30" />
      <div className="hidden sm:block absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-white/30" />
      <div className="hidden sm:block absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-white/30" />

      {/* Top Bar (REC and Timecode) */}
      <div className="absolute top-4 left-4 right-4 sm:top-6 sm:left-8 sm:right-8 flex justify-between items-center">
        {/* REC Indicator */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-600 animate-pulse shadow-[0_0_8px_rgba(220,38,38,0.8)]" />
          <span className="text-red-500 font-mono text-[10px] sm:text-[13px] font-bold tracking-widest leading-none mt-px">REC</span>
        </div>

        {/* Timecode */}
        <div className="flex items-center">
          <span className="text-white/80 font-mono text-[10px] sm:text-[13px] font-bold tracking-wider leading-none mt-px">
            00:00:00:00
          </span>
        </div>
      </div>

      {/* Center Crosshair slightly visible */}
      <div className="hidden sm:flex absolute inset-0 items-center justify-center pointer-events-none opacity-20">
        <div className="w-12 h-[1px] bg-white absolute" />
        <div className="h-12 w-[1px] bg-white absolute" />
      </div>

      {/* Animated content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
        {/* Pulsing ring around icon */}
        <div className="relative flex items-center justify-center mb-3 sm:mb-4 mt-2 sm:mt-0">
          <div className="absolute inset-0 bg-[#ff5100]/30 rounded-full animate-ping" />
          <div className="relative bg-[#1b1816] border border-[#ff5100]/50 text-[#ff5100] p-3 sm:p-4 rounded-full backdrop-blur-md shadow-[0_0_20px_rgba(255,81,0,0.3)]">
            <Clock className="w-6 h-6 sm:w-8 sm:h-8 animate-pulse" />
          </div>
        </div>
        
        {/* Text content */}
        <h3 className="text-white text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2 tracking-tight drop-shadow-lg text-center">
          {isPt ? 'Vídeo em Breve' : 'Video Coming Soon'}
        </h3>
        <p className="text-white/80 text-[11px] sm:text-[13px] md:text-sm max-w-sm text-center leading-relaxed font-medium drop-shadow-md">
          {isPt ? 'Estamos gravando uma apresentação detalhada deste sistema. Fique ligado!' : 'We are recording a detailed showcase of this system. Stay tuned!'}
        </p>
      </div>
      
      {/* CRT Scanline overlay with upward animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scanline {
          0% { background-position: 0 0; }
          100% { background-position: 0 -100px; }
        }
        .animate-scanline {
          animation: scanline 4s linear infinite;
        }
      `}} />
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:100%_4px] animate-scanline" />
      
      {/* Glitch/Noise overlay (simulated with CSS) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
    </div>
  );
}
