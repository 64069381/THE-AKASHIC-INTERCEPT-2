'use client';

import React from 'react';

const mockSoulData = {
  avatar: { title: 'THE WINTER FLAME', subtitle: 'FURNACE FIRE' },
  elements: { metal: 20, wood: 60, water: 10, fire: 90, earth: 30 },
  permission: {
    name: 'PIONEER',
    desc: 'High-level authorization for system destruction and reconstruction. Optimized for establishing new order in chaos. Not recommended for highly repetitive cyclical tasks.',
  },
  interface: {
    name: 'STANDALONE',
    desc: 'Energy exhibits high-intensity internal circulation. Emotional ports are heavily encrypted against external signal hijacking. Displays absolute rationality in close relations.',
  },
  resonance: {
    sync: ['Neon Cyan', 'Obsidian Black', 'Titanium', 'Aetheric Pulse', 'Chaos Logic', 'Cold Fire'],
    collision: ['Earth Tones', 'Dull Yellow', 'Stagnant Water', 'Rigid Order', 'Decay', 'Grounding'],
  },
};

const AXES = ['fire', 'earth', 'metal', 'water', 'wood'] as const;
const AXIS_LABELS = { fire: 'FIRE', earth: 'EARTH', metal: 'METAL', water: 'WATER', wood: 'WOOD' };

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
    <svg width="64" height="64" viewBox="0 0 48 48" style={{ overflow: 'visible' }}>
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
  const size = 180;
  const cx = size / 2;
  const cy = size / 2;
  const maxR = 48;
  const iconR = maxR + 20;

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
            fontSize="7"
            fontFamily="'Space Mono', monospace"
          >
            {AXIS_LABELS[axis]}
          </text>
        );
      })}
    </svg>
  );
}

const bentoCardClass = 'relative p-5 rounded-sm';
const bentoBorder = '0.5px solid rgba(201,169,110,0.2)';
const monoFont = "'Space Mono', monospace";
const serifFont = "'Cinzel', serif";
const sansFont = "'Rajdhani', sans-serif";

function BentoCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`${bentoCardClass} ${className}`}
      style={{ border: bentoBorder, background: 'rgba(255,255,255,0.02)' }}
    >
      {children}
    </div>
  );
}

function SectionLabel({ text }: { text: string }) {
  return (
    <span
      className="block text-[9px] tracking-[0.3em] uppercase mb-4"
      style={{ color: 'rgba(201,169,110,0.5)', fontFamily: monoFont }}
    >
      {text}
    </span>
  );
}

export default function DashboardView() {
  return (
    <div className="tab-content flex flex-col gap-4 w-full px-4 pt-6 pb-20 overflow-y-auto bg-black">
      <div className="flex items-center justify-center gap-2 mb-2">
        <span
          className="text-[11px] tracking-[0.25em] uppercase"
          style={{ color: 'rgba(201,169,110,0.5)', fontFamily: monoFont }}
        >
          SOUL ARCHIVE — ACTIVE
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <BentoCard className="flex flex-col items-center justify-center text-center min-h-[280px]">
          <SectionLabel text="Core Identity" />
          <div className="mb-4">
            <SoulSigil />
          </div>
          <h2
            className="text-[20px] font-semibold tracking-[0.08em] leading-tight gold-gradient-text"
            style={{ fontFamily: serifFont }}
          >
            {mockSoulData.avatar.title.split(' ').map((word, i) => (
              <span key={i} className="block">{word}</span>
            ))}
          </h2>
          <span
            className="block text-[8px] mt-3 tracking-[0.3em] uppercase"
            style={{ color: 'rgba(201,169,110,0.4)', fontFamily: monoFont }}
          >
            PRIMARY ARCHETYPE ACCESSED
          </span>
        </BentoCard>

        <BentoCard className="flex flex-col items-center justify-center min-h-[280px]">
          <SectionLabel text="Elemental Matrix" />
          <RadarChart />
        </BentoCard>
      </div>

      <BentoCard>
        <h3
          className="text-[15px] tracking-[0.08em] uppercase mb-4"
          style={{ color: 'rgba(201,169,110,0.7)', fontFamily: sansFont, fontWeight: 600 }}
        >
          SYS. PERMISSION // INTERFACE
        </h3>
        <div className="rounded-sm p-4" style={{ background: 'rgba(255,255,255,0.03)' }}>
          <p
            className="text-[11px] leading-relaxed tracking-wide mb-4"
            style={{ color: 'rgba(255,255,255,0.5)', fontFamily: monoFont }}
          >
            {mockSoulData.permission.desc}
          </p>
          <div className="w-full h-px mb-4" style={{ background: 'rgba(201,169,110,0.08)' }} />
          <p
            className="text-[11px] leading-relaxed tracking-wide"
            style={{ color: 'rgba(255,255,255,0.5)', fontFamily: monoFont }}
          >
            {mockSoulData.interface.desc}
          </p>
        </div>
      </BentoCard>

      <BentoCard>
        <h3
          className="text-[15px] tracking-[0.08em] uppercase mb-5"
          style={{ color: 'rgba(201,169,110,0.7)', fontFamily: sansFont, fontWeight: 600 }}
        >
          RESONANCE
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span
              className="block text-[10px] tracking-[0.2em] uppercase mb-3"
              style={{ color: 'rgba(6,182,212,0.8)', fontFamily: monoFont }}
            >
              [+] SYNC
            </span>
            <div className="flex flex-wrap gap-2">
              {mockSoulData.resonance.sync.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-sm border border-cyan-500/30 text-cyan-400 bg-cyan-500/10"
                  style={{ fontFamily: sansFont, fontWeight: 500 }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div>
            <span
              className="block text-[10px] tracking-[0.2em] uppercase mb-3"
              style={{ color: 'rgba(180,100,80,0.8)', fontFamily: monoFont }}
            >
              [-] COLLISION
            </span>
            <div className="flex flex-wrap gap-2">
              {mockSoulData.resonance.collision.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-sm border border-red-900/50 text-red-500 bg-red-900/10"
                  style={{ fontFamily: sansFont, fontWeight: 500 }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </BentoCard>
    </div>
  );
}
