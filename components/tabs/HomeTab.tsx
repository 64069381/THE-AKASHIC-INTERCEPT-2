'use client';

import React, { useState } from 'react';
import { MetatronsCube, MoonPhases, BackgroundWatermark } from '../svg/SacredGeometry';

export default function HomeTab() {
  const [initiated, setInitiated] = useState(false);
  const [animating, setAnimating] = useState(false);

  const handleInitiate = () => {
    setAnimating(true);
    setTimeout(() => {
      setInitiated(true);
      setAnimating(false);
    }, 2000);
  };

  return (
    <div className="tab-content relative flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6 overflow-hidden">
      {/* Background watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <BackgroundWatermark />
      </div>

      {/* Scan line effect */}
      <div 
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ opacity: 0.03 }}
      >
        <div 
          className="w-full h-px bg-gradient-to-r from-transparent via-[#C9A96E] to-transparent"
          style={{ animation: 'scan-line 8s linear infinite' }}
        />
      </div>

      {/* Top decorative line */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-3">
        <div className="w-12 h-px bg-gradient-to-r from-transparent to-[rgba(201,169,110,0.3)]" />
        <div className="w-1.5 h-1.5 rotate-45 border border-[rgba(201,169,110,0.3)]" />
        <div className="w-12 h-px bg-gradient-to-l from-transparent to-[rgba(201,169,110,0.3)]" />
      </div>

      {/* Protocol designation */}
      <div className="mb-2 flex items-center gap-2" style={{ animationDelay: '0.1s' }}>
        <div className="w-8 h-px bg-[rgba(201,169,110,0.2)]" />
        <span 
          className="text-[10px] tracking-[0.4em] uppercase"
          style={{ color: 'var(--text-muted)', fontFamily: "'Space Mono', monospace" }}
        >
          SYS.PROTOCOL.V1
        </span>
        <div className="w-8 h-px bg-[rgba(201,169,110,0.2)]" />
      </div>

      {/* Title */}
      <h1 
        className="text-center mb-1"
        style={{ fontFamily: "'Cinzel', serif" }}
      >
        <span className="block text-[11px] tracking-[0.5em] uppercase mb-3" style={{ color: 'var(--text-secondary)' }}>
          — THE —
        </span>
        <span className="block text-[28px] font-semibold tracking-[0.15em] gold-gradient-text leading-tight">
          PRIMORDIAL
        </span>
        <span className="block text-[28px] font-semibold tracking-[0.15em] gold-gradient-text leading-tight">
          PROTOCOL
        </span>
      </h1>

      {/* Moon phases */}
      <div className="my-4">
        <MoonPhases size={220} />
      </div>

      {/* Sacred geometry centerpiece */}
      <div className="relative my-4">
        <div className={`${animating ? 'animate-rotate-slow' : ''}`}>
          <MetatronsCube 
            size={initiated ? 200 : 220} 
            className={`transition-all duration-1000 ${initiated ? 'opacity-100' : 'opacity-70'}`} 
          />
        </div>
        
        {/* Rotating outer ring */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-rotate-slow" style={{ animationDuration: '60s' }}>
            <svg width="260" height="260" viewBox="0 0 260 260" fill="none">
              <circle cx="130" cy="130" r="125" stroke="rgba(201,169,110,0.06)" strokeWidth="0.5" strokeDasharray="3 8" />
            </svg>
          </div>
        </div>

        {/* Pulsing center glow */}
        {initiated && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div 
              className="w-4 h-4 rounded-full animate-pulse-gold"
              style={{ 
                background: 'radial-gradient(circle, rgba(201,169,110,0.6) 0%, transparent 70%)',
                boxShadow: '0 0 30px rgba(201,169,110,0.3)'
              }}
            />
          </div>
        )}
      </div>

      {/* Status text */}
      <div className="text-center mb-8">
        <h2 
          className="text-[22px] tracking-[0.2em] uppercase mb-2"
          style={{ 
            fontFamily: "'Cinzel', serif",
            color: initiated ? 'var(--gold)' : 'var(--text-secondary)'
          }}
        >
          {initiated ? 'CALIBRATED' : 'UNINITIALIZED'}
        </h2>
        <p 
          className="text-[11px] tracking-[0.3em] uppercase"
          style={{ color: 'var(--text-muted)', fontFamily: "'Space Mono', monospace" }}
        >
          {initiated ? 'SIGNAL LOCKED • AWAITING QUERY' : 'QUANTUM STATE: DORMANT'}
        </p>
      </div>

      {/* CTA Button */}
      {!initiated && (
        <button
          onClick={handleInitiate}
          disabled={animating}
          className="group relative px-10 py-3.5 transition-all duration-500 hover:scale-[1.02] active:scale-[0.98]"
          style={{
            border: '1px solid rgba(201,169,110,0.35)',
            background: 'transparent',
          }}
        >
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[rgba(201,169,110,0.5)]" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[rgba(201,169,110,0.5)]" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[rgba(201,169,110,0.5)]" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[rgba(201,169,110,0.5)]" />
          
          <span 
            className="text-[12px] tracking-[0.3em] uppercase"
            style={{ 
              color: animating ? 'var(--gold)' : 'var(--gold-light)',
              fontFamily: "'Cinzel', serif"
            }}
          >
            {animating ? 'CALIBRATING...' : 'Initiate Calibration'}
          </span>

          {/* Hover shimmer */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer" />
        </button>
      )}

      {initiated && (
        <div className="flex items-center gap-2 animate-fade-in-up">
          <div className="w-1.5 h-1.5 rounded-full bg-[rgba(201,169,110,0.6)] animate-pulse-gold" />
          <span 
            className="text-[10px] tracking-[0.3em] uppercase"
            style={{ color: 'var(--gold-dark)', fontFamily: "'Space Mono', monospace" }}
          >
            PROTOCOL ACTIVE
          </span>
        </div>
      )}

      {/* Bottom decorative element*/}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className="w-px h-8 bg-gradient-to-b from-[rgba(201,169,110,0.15)] to-transparent" />
        <div className="w-1 h-1 rotate-45 bg-[rgba(201,169,110,0.2)]" />
      </div>
    </div>
  );
}
