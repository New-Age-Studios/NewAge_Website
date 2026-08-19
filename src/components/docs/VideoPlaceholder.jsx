"use client";

import { Play, Clock } from "lucide-react";
import { useParams } from 'next/navigation';

export function VideoPlaceholder({ imageSrc = "/pipinhod.png" }) {
  const params = useParams();
  const lang = params?.lang || 'en';
  const isPt = lang === 'pt-br';
  return (
    <div className="relative w-full aspect-video max-h-[450px] rounded-xl overflow-hidden group mb-8 border border-[#3c3127] bg-[#0a0a0a]">
      
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
      <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-white/30" />
      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/30" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-white/30" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-white/30" />

      {/* REC Indicator */}
      <div className="absolute top-7 left-8 flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-600 animate-pulse shadow-[0_0_8px_rgba(220,38,38,0.8)]" />
        <span className="text-red-500 font-mono text-[13px] font-bold tracking-widest">REC</span>
      </div>

      {/* Timecode */}
      <div className="absolute top-6 right-8">
        <span className="text-white/80 font-mono text-[13px] font-bold tracking-wider">
          00:00:00:00
        </span>
      </div>

      {/* Center Crosshair slightly visible */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <div className="w-12 h-[1px] bg-white absolute" />
        <div className="h-12 w-[1px] bg-white absolute" />
      </div>

      {/* Animated content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
        {/* Pulsing ring around icon */}
        <div className="relative flex items-center justify-center mb-4">
          <div className="absolute inset-0 bg-[#ff5100]/30 rounded-full animate-ping" />
          <div className="relative bg-[#1b1816] border border-[#ff5100]/50 text-[#ff5100] p-4 rounded-full backdrop-blur-md shadow-[0_0_20px_rgba(255,81,0,0.3)]">
            <Clock size={32} className="animate-pulse" />
          </div>
        </div>
        
        {/* Text content */}
        <h3 className="text-white text-xl md:text-2xl font-bold mb-2 tracking-tight drop-shadow-lg">
          {isPt ? 'Vídeo em Breve' : 'Video Coming Soon'}
        </h3>
        <p className="text-white/80 text-[13px] md:text-sm max-w-sm text-center px-4 leading-relaxed font-medium drop-shadow-md">
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
