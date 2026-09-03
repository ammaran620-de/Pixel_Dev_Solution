"use client";

import { useEffect, useState } from "react";

// Pre-generated stream of mock data logs
const STREAM_DATA = [
  "[SYS] OK :: 0x4A89",
  "[VIS] Frame 4082 processed (12ms)",
  "[TRK] ID_9492 Conf: 99.8%",
  "[IO] Trigger received",
  "[NET] Sync 24ms",
  "[SYS] Temp 42C",
  "[VIS] Target acquired (x:142, y:88)",
  "[TRK] Velocity 1.2m/s",
  "[SYS] OK :: 0x4A8A",
  "[IO] Output signal HIGH",
  "[VIS] Region matched (IoU 0.94)",
  "[NET] Uplink active"
];

export default function DataTicker() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full h-8 bg-paper/90 backdrop-blur border-t border-line z-50 overflow-hidden flex items-center pointer-events-none">
      {/* Edge Masks */}
      <div className="absolute inset-0 pointer-events-none z-10" style={{
        maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)"
      }}>
        <div className="flex whitespace-nowrap animate-ticker opacity-40">
          {/* We render the stream twice to create a seamless loop */}
          <div className="flex gap-12 pr-12 min-w-full items-center">
            {STREAM_DATA.map((log, i) => (
              <span key={`a-${i}`} className="mono-tag text-[10px] text-muted">
                {log}
              </span>
            ))}
          </div>
          <div className="flex gap-12 pr-12 min-w-full items-center" aria-hidden="true">
            {STREAM_DATA.map((log, i) => (
              <span key={`b-${i}`} className="mono-tag text-[10px] text-muted">
                {log}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
