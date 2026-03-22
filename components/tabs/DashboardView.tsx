'use client';

import React from 'react';

const mockSoulData = {
  avatar: { title: 'THE WINTER FLAME', subtitle: '熔炉之火' },
  elements: { metal: 20, wood: 60, water: 10, fire: 90, earth: 30 },
  coreDrive: 'PIONEER (开拓者)',
  interface: 'STANDALONE (独立节点)',
  resonance: { sync: 'Neon Cyan', collision: 'Earth Tones' },
};

const AXES = ['fire', 'earth', 'metal', 'water', 'wood'] as const;
const AXIS_LABELS = { fire: '火', earth: '土', metal: '金', water: '水', wood: '木' };

function polarToXY(cx: number, cy: number, r: number, angleIndex: number) {
  const angle = (Math.PI * 2 * angleIndex) / 5 - Math.PI / 2;
  return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
}

function pentagonPoints(cx: number, cy: number, r: number) {
  return Array.from({ length: 5 }, (_, i) => {
    const p = polarToXY(cx, cy, r, i);
    return `${p.x},${p.y}`;
  }).join(' ');
}

function FireIcon({ x, y }: { x: number; y: number }) {
  const s = 7;
  const pts = `${x},${y - s} ${x + s * 0.866},${y + s * 0.5} ${x - s * 0.866},${y + s * 0.5}`;
  return <polygon points={pts} fill="none" stroke="rgba(201,169,110,0.6)" strokeWidth="1" />;
}

function EarthIcon({ x, y }: { x: number; y: number }) {
  const s = 6;
  return (
    <rect
      x={x - s}
      y={y - s}
      width={s * 2}
      height={s * 2}
      fill="none"
      stroke="rgba(201,169,110,0.6)"
      strokeWidth="1"
    />
  );
}

function MetalIcon({ x, y }: { x: number; y: number }) {
  return (
    <>
      <circle cx={x} cy={y} r={7} fill="none" stroke="rgba(201,169,110,0.6)" strokeWidth="1" />
      <circle cx={x} cy={y} r={3} fill="rgba(201,169,110,0.5)" />
    </>
  );
}

function WaterIcon({ x, y }: { x: number; y: number }) {
  const w = 8;
  return (
    <>
      {[-3, 0, 3].map((dy) => (
        <path
          key={dy}
          d={`M${x - w},${y + dy} Q${x - w / 2},${y + dy - 2.5} ${x},${y + dy} Q${x + w / 2},${y + dy + 2.5} ${x + w},${y + dy}`}
          fill="none"
          stroke="rgba(201,169,110,0.6)"
          strokeWidth="1"
        />
      ))}
    </>
  );
}

function WoodIcon({ x, y }: { x: number; y: number }) {
  const h = 7;
  return (
    <>
      {[-3, 0, 3].map((dx) => (
        <line
          key={dx}
          x1={x + dx}
          y1={y - h}
          x2={x + dx}
          y2={y + h}
          stroke="rgba(201,169,110,0.6)"
          strokeWidth="1"
        />
      ))}
    </>
  );
}

const ELEMENT_ICONS = [FireIcon, EarthIcon, MetalIcon, WaterIcon, WoodIcon];

function SoulSigil() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" style={{ overflow: 'visible' }}>
      <polygon
        points="24,4 44,24 24,44 4,24"
        fill="none"
        stroke="rgba(201,169,110,0.35)"
        strokeWidth="0.75"
      />
      <polygon
        points="24,10 38,24 24,38 10,24"
        fill="none"
        stroke="rgba(201,169,110,0.2)"
        strokeWidth="0.5"
      />
      <line x1="24" y1="0" x2="24" y2="48" stroke="rgba(201,169,110,0.12)" strokeWidth="0.5" />
      <line x1="0" y1="24" x2="48" y2="24" stroke="rgba(201,169,110,0.12)" strokeWidth="0.5" />
      <circle cx="24" cy="24" r="2" fill="rgba(201,169,110,0.5)" />
      <circle cx="24" cy="24" r="6" fill="none" stroke="rgba(201,169,110,0.18)" strokeWidth="0.5" />
    </svg>
  );
}

function RadarChart() {
  const size = 200;
  const cx = size / 2;
  const cy = size / 2;
  const maxR = 52;
  const iconR = maxR + 22;

  const dataPoints = AXES.map((axis, i) => {
    const val = mockSoulData.elements[axis] / 100;
    return polarToXY(cx, cy, maxR * val, i);
  });
  const dataPolygon = dataPoints.map((p) => `${p.x},${p.y}`).join(' ');

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="block"
      style={{ overflow: 'visible' }}
    >
      {[0.25, 0.5, 0.75, 1].map((scale) => (
        <polygon
          key={scale}
          points={pentagonPoints(cx, cy, maxR * scale)}
          fill="none"
          stroke="rgba(201,169,110,0.08)"
          strokeWidth="0.5"
        />
      ))}

      {AXES.map((_, i) => {
        const p = polarToXY(cx, cy, maxR, i);
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={p.x}
            y2={p.y}
            stroke="rgba(201,169,110,0.08)"
            strokeWidth="0.5"
          />
        );
      })}

      <polygon
        points={dataPolygon}
        fill="rgba(201,169,110,0.12)"
        stroke="rgba(201,169,110,0.7)"
        strokeWidth="1"
        strokeLinejoin="miter"
      />

      {dataPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={2} fill="rgba(201,169,110,0.8)" />
      ))}

      {AXES.map((axis, i) => {
        const iconPos = polarToXY(cx, cy, iconR, i);
        const Icon = ELEMENT_ICONS[i];
        return <Icon key={axis} x={iconPos.x} y={iconPos.y} />;
      })}

      {AXES.map((axis, i) => {
        const labelPos = polarToXY(cx, cy, iconR + 14, i);
        return (
          <text
            key={`label-${axis}`}
            x={labelPos.x}
            y={labelPos.y}
            textAnchor="middle"
            dominantBaseline="central"
            fill="rgba(201,169,110,0.45)"
            fontSize="8"
            fontFamily="'Space Mono', monospace"
          >
            {AXIS_LABELS[axis]}
          </text>
        );
      })}
    </svg>
  );
}

function ProtocolCard({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="p-3 relative"
      style={{ border: '1px solid rgba(201,169,110,0.12)' }}
    >
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[rgba(201,169,110,0.3)]" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[rgba(201,169,110,0.3)]" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[rgba(201,169,110,0.3)]" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[rgba(201,169,110,0.3)]" />

      <span
        className="block text-[8px] tracking-[0.3em] uppercase mb-1.5"
        style={{ color: 'var(--text-muted)', fontFamily: "'Space Mono', monospace" }}
      >
        {label}
      </span>
      {children}
    </div>
  );
}

export default function DashboardView() {
  return (
    <div
      className="tab-content flex flex-col h-[calc(100vh-80px)] px-4 pt-6 pb-2 overflow-hidden"
      style={{ background: 'var(--obsidian)' }}
    >
      <div className="flex items-center gap-2 mb-1">
        <div className="w-1.5 h-1.5 rounded-full bg-[rgba(201,169,110,0.6)] animate-pulse-gold" />
        <span
          className="text-[8px] tracking-[0.4em] uppercase"
          style={{ color: 'var(--text-muted)', fontFamily: "'Space Mono', monospace" }}
        >
          SOUL.ARCHIVE — ACTIVE
        </span>
      </div>

      <div className="w-full h-px mb-4" style={{ background: 'rgba(201,169,110,0.1)' }} />

      <div className="grid grid-cols-2 gap-4 flex-1 min-h-0">
        <div className="flex flex-col items-center justify-center text-center">
          <SoulSigil />

          <span
            className="text-[8px] tracking-[0.4em] uppercase mt-4 mb-3"
            style={{ color: 'var(--text-muted)', fontFamily: "'Space Mono', monospace" }}
          >
            DESIGNATION
          </span>
          <h2
            className="text-[18px] font-semibold tracking-[0.12em] leading-tight gold-gradient-text"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            {mockSoulData.avatar.title.split(' ').map((word, i) => (
              <span key={i} className="block">{word}</span>
            ))}
          </h2>
          <span
            className="block text-[12px] mt-2 tracking-[0.2em]"
            style={{ color: 'var(--text-secondary)', fontFamily: "'Rajdhani', sans-serif" }}
          >
            {mockSoulData.avatar.subtitle}
          </span>

          <div className="flex items-center gap-2 mt-4">
            <div className="w-6 h-px" style={{ background: 'rgba(201,169,110,0.15)' }} />
            <div className="w-1 h-1 rotate-45 border border-[rgba(201,169,110,0.25)]" />
            <div className="w-6 h-px" style={{ background: 'rgba(201,169,110,0.15)' }} />
          </div>
        </div>

        <div className="flex items-center justify-center">
          <RadarChart />
        </div>
      </div>

      <div className="w-full h-px my-3" style={{ background: 'rgba(201,169,110,0.08)' }} />

      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-px" style={{ background: 'rgba(201,169,110,0.15)' }} />
        <span
          className="text-[8px] tracking-[0.4em] uppercase"
          style={{ color: 'var(--text-muted)', fontFamily: "'Space Mono', monospace" }}
        >
          THE PROTOCOLS
        </span>
        <div className="flex-1 h-px" style={{ background: 'rgba(201,169,110,0.08)' }} />
      </div>

      <div className="flex flex-col gap-2">
        <ProtocolCard label="SYS.PERMISSION">
          <span
            className="text-[11px] tracking-[0.08em] leading-snug"
            style={{ color: 'var(--gold)', fontFamily: "'Rajdhani', sans-serif", fontWeight: 500 }}
          >
            {mockSoulData.coreDrive}
          </span>
        </ProtocolCard>

        <ProtocolCard label="INTERFACE">
          <span
            className="text-[11px] tracking-[0.08em] leading-snug"
            style={{ color: 'var(--gold)', fontFamily: "'Rajdhani', sans-serif", fontWeight: 500 }}
          >
            {mockSoulData.interface}
          </span>
        </ProtocolCard>

        <ProtocolCard label="RESONANCE">
          <span
            className="block text-[10px] tracking-[0.05em] leading-relaxed"
            style={{ color: 'var(--gold)', fontFamily: "'Rajdhani', sans-serif", fontWeight: 500 }}
          >
            + {mockSoulData.resonance.sync}
          </span>
          <span
            className="block text-[10px] tracking-[0.05em] leading-relaxed"
            style={{ color: 'var(--text-secondary)', fontFamily: "'Rajdhani', sans-serif", fontWeight: 500 }}
          >
            - {mockSoulData.resonance.collision}
          </span>
        </ProtocolCard>
      </div>

      <div className="flex justify-center mt-3">
        <div className="w-px h-4 bg-gradient-to-b from-[rgba(201,169,110,0.12)] to-transparent" />
      </div>
    </div>
  );
}
