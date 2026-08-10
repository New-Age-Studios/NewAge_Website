"use client";

import { useState, useEffect } from "react";

export default function ProductGallery({ product }) {
  // Safer YouTube regex that matches watch?v=, youtu.be, and embed exactly
  const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/i;
  const youtubeMatch = product.description?.match(youtubeRegex);
  const youtubeId = youtubeMatch ? youtubeMatch[1] : null;

  const rawImages = [
    { url: product.image, type: "image" },
    ...(product.media?.filter((m) => m.type === "image") || [])
  ];

  // Remove duplicates by URL just in case the main image is also in the media array
  const uniqueImages = Array.from(new Map(rawImages.map(img => [img.url, img])).values());

  const mediaItems = [];
  if (youtubeId) {
    mediaItems.push({
      url: youtubeId,
      type: "youtube",
      thumb: `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg` // Guaranteed to exist for all videos
    });
  }
  mediaItems.push(...uniqueImages);

  const [activeImage, setActiveImage] = useState(mediaItems[0]?.url || product.image);

  useEffect(() => {
    if (mediaItems.length <= 1) return;

    // Stop autoplay if the user is currently looking at the YouTube video
    const currentItem = mediaItems.find(m => m.url === activeImage);
    if (currentItem?.type === "youtube") return;

    const timer = setInterval(() => {
      setActiveImage((current) => {
        const currentIndex = mediaItems.findIndex(item => item.url === current);
        const nextIndex = (currentIndex + 1) % mediaItems.length;
        return mediaItems[nextIndex].url;
      });
    }, 4000);

    return () => clearInterval(timer);
  }, [mediaItems, activeImage]);

  return (
    <div>
      {/* Main view */}
      <div
        className="relative rounded-2xl overflow-hidden mb-6 bg-[#141414]"
        style={{ aspectRatio: "16/9" }}
      >
        {mediaItems.map((item) => {
          if (item.type === "youtube") {
            return (
              <div
                key={item.url}
                className="absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out"
                style={{ 
                  opacity: activeImage === item.url ? 1 : 0,
                  zIndex: activeImage === item.url ? 10 : 0,
                  pointerEvents: activeImage === item.url ? "auto" : "none"
                }}
              >
                {activeImage === item.url && (
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src={`https://www.youtube.com/embed/${item.url}`} 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  />
                )}
              </div>
            );
          }
          return (
            <img
              key={item.url}
              src={item.url}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
              style={{ 
                opacity: activeImage === item.url ? 0.75 : 0,
                zIndex: activeImage === item.url ? 10 : 0
              }}
            />
          );
        })}
        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)", zIndex: 20 }}
        />
      </div>

      {/* Thumbnail strip */}
      {mediaItems.length > 1 && (
        <div className="flex gap-3 mb-8 overflow-x-auto pb-1">
          {mediaItems.slice(0, 5).map((item, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(item.url)}
              className="rounded-xl overflow-hidden shrink-0 relative transition-all group"
              style={{ 
                width: 120, 
                height: 80, 
                border: activeImage === item.url ? "2px solid #f97316" : "2px solid rgba(255,255,255,0.1)",
                opacity: activeImage === item.url ? 1 : 0.6
              }}
            >
              <img src={item.type === "youtube" ? item.thumb : item.url} alt="" className="absolute inset-0 w-full h-full object-cover" />
              {item.type === "youtube" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-colors">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center pl-1">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
