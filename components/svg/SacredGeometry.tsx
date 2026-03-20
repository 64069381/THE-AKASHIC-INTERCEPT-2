'use client';

import React from 'react';

export function MetatronsCube({ className = '', size = 240 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer circle */}
      <circle cx="200" cy="200" r="180" stroke="rgba(201,169,110,0.15)" strokeWidth="0.5" />
      <circle cx="200" cy="200" r="160" stroke="rgba(201,169,110,0.1)" strokeWidth="0.5" />
      
      {/* Hexagonal structure */}
      <polygon
        points="200,40 338,110 338,290 200,360 62,290 62,110"
        stroke="rgba(201,169,110,0.2)"
        strokeWidth="0.5"
        fill="none"
      />
      <polygon
        points="200,80 310,130 310,270 200,320 90,270 90,130"
        stroke="rgba(201,169,110,0.15)"
        strokeWidth="0.5"
        fill="none"
      />
      
      {/* Inner triangles */}
      <polygon
        points="200,40 338,290 62,290"
        stroke="rgba(201,169,110,0.12)"
        strokeWidth="0.5"
        fill="none"
      />
      <polygon
        points="200,360 338,110 62,110"
        stroke="rgba(201,169,110,0.12)"
        strokeWidth="0.5"
        fill="none"
      />
      
      {/* Cross lines */}
      <line x1="200" y1="40" x2="200" y2="360" stroke="rgba(201,169,110,0.08)" strokeWidth="0.5" />
      <line x1="62" y1="110" x2="338" y2="290" stroke="rgba(201,169,110,0.08)" strokeWidth="0.5" />
      <line x1="338" y1="110" x2="62" y2="290" stroke="rgba(201,169,110,0.08)" strokeWidth="0.5" />
      
      {/* Center circles - Flower of Life pattern */}
      <circle cx="200" cy="200" r="90" stroke="rgba(201,169,110,0.18)" strokeWidth="0.5" fill="none" />
      <circle cx="200" cy="110" r="90" stroke="rgba(201,169,110,0.08)" strokeWidth="0.5" fill="none" />
      <circle cx="200" cy="290" r="90" stroke="rgba(201,169,110,0.08)" strokeWidth="0.5" fill="none" />
      <circle cx="278" cy="155" r="90" stroke="rgba(201,169,110,0.08)" strokeWidth="0.5" fill="none" />
      <circle cx="278" cy="245" r="90" stroke="rgba(201,169,110,0.08)" strokeWidth="0.5" fill="none" />
      <circle cx="122" cy="155" r="90" stroke="rgba(201,169,110,0.08)" strokeWidth="0.5" fill="none" />
      <circle cx="122" cy="245" r="90" stroke="rgba(201,169,110,0.08)" strokeWidth="0.5" fill="none" />
      
      {/* Node points */}
      {[
        [200, 40], [338, 110], [338, 290], [200, 360], [62, 290], [62, 110],
        [200, 200], [200, 110], [200, 290],
        [278, 155], [278, 245], [122, 155], [122, 245]
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="2.5" fill="rgba(201,169,110,0.4)" />
      ))}
      
      {/* Center eye */}
      <circle cx="200" cy="200" r="12" stroke="rgba(201,169,110,0.4)" strokeWidth="0.8" fill="none" />
      <circle cx="200" cy="200" r="4" fill="rgba(201,169,110,0.6)" />
    </svg>
  );
}

export function AllSeeingEye({ className = '', size = 60 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Triangle */}
      <polygon
        points="50,10 90,80 10,80"
        stroke="rgba(201,169,110,0.3)"
        strokeWidth="0.8"
        fill="none"
      />
      {/* Eye shape */}
      <ellipse cx="50" cy="52" rx="22" ry="14" stroke="rgba(201,169,110,0.4)" strokeWidth="0.8" fill="none" />
      {/* Iris */}
      <circle cx="50" cy="52" r="7" stroke="rgba(201,169,110,0.5)" strokeWidth="0.8" fill="none" />
      {/* Pupil */}
      <circle cx="50" cy="52" r="3" fill="rgba(201,169,110,0.6)" />
      {/* Rays */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 50 + Math.cos(rad) * 30;
        const y1 = 52 + Math.sin(rad) * 20;
        const x2 = 50 + Math.cos(rad) * 36;
        const y2 = 52 + Math.sin(rad) * 24;
        return (
          <line
            key={i}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="rgba(201,169,110,0.15)"
            strokeWidth="0.5"
          />
        );
      })}
    </svg>
  );
}

export function MoonPhases({ className = '', size = 200 }: { className?: string; size?: number }) {
  const phases = [
    { cx: 20, type: 'new' },
    { cx: 50, type: 'waxing-crescent' },
    { cx: 80, type: 'first-quarter' },
    { cx: 110, type: 'waxing-gibbous' },
    { cx: 140, type: 'full' },
    { cx: 170, type: 'waning-gibbous' },
    { cx: 200, type: 'last-quarter' },
    { cx: 230, type: 'waning-crescent' },
  ];

  return (
    <svg
      width={size}
      height={size * 0.16}
      viewBox="0 0 250 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Connecting line */}
      <line x1="20" y1="20" x2="230" y2="20" stroke="rgba(201,169,110,0.1)" strokeWidth="0.5" />
      
      {phases.map((phase, i) => (
        <g key={i}>
          <circle cx={phase.cx} cy="20" r="8" stroke="rgba(201,169,110,0.3)" strokeWidth="0.5" fill="none" />
          {phase.type === 'full' && (
            <circle cx={phase.cx} cy="20" r="7" fill="rgba(201,169,110,0.15)" />
          )}
          {phase.type === 'new' && (
            <circle cx={phase.cx} cy="20" r="7" fill="rgba(10,10,10,0.8)" />
          )}
          {phase.type === 'first-quarter' && (
            <path d={`M ${phase.cx} 12 A 8 8 0 0 1 ${phase.cx} 28`} fill="rgba(201,169,110,0.12)" />
          )}
          {phase.type === 'last-quarter' && (
            <path d={`M ${phase.cx} 12 A 8 8 0 0 0 ${phase.cx} 28`} fill="rgba(201,169,110,0.12)" />
          )}
          {phase.type === 'waxing-crescent' && (
            <path d={`M ${phase.cx} 12 A 8 8 0 0 1 ${phase.cx} 28 A 4 8 0 0 0 ${phase.cx} 12`} fill="rgba(201,169,110,0.08)" />
          )}
          {phase.type === 'waning-crescent' && (
            <path d={`M ${phase.cx} 12 A 8 8 0 0 0 ${phase.cx} 28 A 4 8 0 0 1 ${phase.cx} 12`} fill="rgba(201,169,110,0.08)" />
          )}
          {phase.type === 'waxing-gibbous' && (
            <path d={`M ${phase.cx} 12 A 8 8 0 0 1 ${phase.cx} 28 A 4 8 0 0 1 ${phase.cx} 12`} fill="rgba(201,169,110,0.12)" />
          )}
          {phase.type === 'waning-gibbous' && (
            <path d={`M ${phase.cx} 12 A 8 8 0 0 0 ${phase.cx} 28 A 4 8 0 0 0 ${phase.cx} 12`} fill="rgba(201,169,110,0.12)" />
          )}
        </g>
      ))}
    </svg>
  );
}

export function HexagramSigil({ className = '', size = 180 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer ring */}
      <circle cx="100" cy="100" r="95" stroke="rgba(201,169,110,0.12)" strokeWidth="0.5" />
      <circle cx="100" cy="100" r="88" stroke="rgba(201,169,110,0.08)" strokeWidth="0.5" strokeDasharray="2 4" />
      
      {/* Star of David / Hexagram */}
      <polygon
        points="100,15 170,145 30,145"
        stroke="rgba(201,169,110,0.25)"
        strokeWidth="0.7"
        fill="none"
      />
      <polygon
        points="100,185 170,55 30,55"
        stroke="rgba(201,169,110,0.25)"
        strokeWidth="0.7"
        fill="none"
      />
      
      {/* Inner hexagon */}
      <polygon
        points="100,42 148,72 148,128 100,158 52,128 52,72"
        stroke="rgba(201,169,110,0.15)"
        strokeWidth="0.5"
        fill="none"
      />
      
      {/* Center circle */}
      <circle cx="100" cy="100" r="25" stroke="rgba(201,169,110,0.2)" strokeWidth="0.5" fill="none" />
      <circle cx="100" cy="100" r="8" stroke="rgba(201,169,110,0.35)" strokeWidth="0.8" fill="none" />
      <circle cx="100" cy="100" r="3" fill="rgba(201,169,110,0.5)" />
    </svg>
  );
}

export function BackgroundWatermark({ className = '' }: { className?: string }) {
  return (
    <svg
      width="600"
      height="600"
      viewBox="0 0 600 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity: 0.02 }}
    >
      <circle cx="300" cy="300" r="280" stroke="#C9A96E" strokeWidth="1" />
      <circle cx="300" cy="300" r="240" stroke="#C9A96E" strokeWidth="0.5" />
      <circle cx="300" cy="300" r="200" stroke="#C9A96E" strokeWidth="0.5" />
      <polygon points="300,20 560,300 300,580 40,300" stroke="#C9A96E" strokeWidth="0.5" fill="none" />
      <polygon points="300,60 520,300 300,540 80,300" stroke="#C9A96E" strokeWidth="0.5" fill="none" transform="rotate(45 300 300)" />
      <circle cx="300" cy="300" r="120" stroke="#C9A96E" strokeWidth="0.5" />
      <circle cx="300" cy="300" r="60" stroke="#C9A96E" strokeWidth="0.5" />
      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <line
            key={i}
            x1={300 + Math.cos(rad) * 60}
            y1={300 + Math.sin(rad) * 60}
            x2={300 + Math.cos(rad) * 280}
            y2={300 + Math.sin(rad) * 280}
            stroke="#C9A96E"
            strokeWidth="0.3"
          />
        );
      })}
    </svg>
  );
}
