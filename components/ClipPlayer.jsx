"use client";

import { useEffect, useRef, useState } from "react";
import { videoController } from "./VideoController";
import { clipRegistry } from "@/lib/clipRegistry";

export default function ClipPlayer({ 
  clipId, 
  captionOverride, 
  className = "",
  aspect = "16/9",
  priority = false 
}) {
  const videoRef = useRef(null);
  const [canAutoplay, setCanAutoplay] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const clipData = clipRegistry[clipId] || null;
  const caption = captionOverride || clipData?.alt || "";

  useEffect(() => {
    // Check if autoplay is allowed
    const isMobile = window.innerWidth < 640;
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    const isSaveData = connection?.saveData;
    const isSlow = connection?.effectiveType === "2g" || connection?.effectiveType === "slow-2g";

    if (isMobile || isSaveData || isSlow) {
      setCanAutoplay(false);
    }
  }, []);

  useEffect(() => {
    if (!clipData || !canAutoplay || !videoRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            videoController?.requestPlay(videoRef.current);
            setIsPlaying(true);
          } else {
            videoController?.unregister(videoRef.current);
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(videoRef.current);

    return () => {
      observer.disconnect();
      if (videoRef.current) {
        videoController?.unregister(videoRef.current);
      }
    };
  }, [clipData, canAutoplay]);

  const handleTapPlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  if (!clipData) {
    return (
      <div className={`w-full h-full bg-slate flex items-center justify-center rounded-sm ${className}`}>
        <span className="mono-tag text-muted">No media</span>
      </div>
    );
  }

  return (
    <div className={`relative group overflow-hidden rounded-sm ${className}`} style={{ aspectRatio: aspect.replace('/', ' / ') }}>
      {/* If clip cannot autoplay, fallback to poster */}
      {!canAutoplay && !isPlaying && (
        <img
          src={clipData.poster}
          alt={caption}
          className="w-full h-full object-cover"
          sizes="100vw"
        />
      )}
      
      {/* Video Element */}
      <video
        ref={videoRef}
        src={clipData.src}
        poster={clipData.poster}
        preload={priority ? "auto" : "none"}
        muted
        loop
        playsInline
        className={`w-full h-full object-cover ${(!canAutoplay && !isPlaying) ? 'hidden' : 'block'}`}
        onClick={!canAutoplay ? handleTapPlay : undefined}
      />
      
      {/* Play button overlay for reduced-motion / save-data */}
      {!canAutoplay && !isPlaying && (
        <button
          onClick={handleTapPlay}
          className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors z-20"
          aria-label="Play video"
        >
          <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center backdrop-blur-sm bg-black/10">
            <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent ml-1" />
          </div>
        </button>
      )}

      {/* Caption Scrim */}
      {caption && (
        <div className="absolute inset-x-0 bottom-0 p-4 pt-12 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <div className="mono-tag text-white/90 text-xs">
            {caption}
          </div>
        </div>
      )}
    </div>
  );
}
