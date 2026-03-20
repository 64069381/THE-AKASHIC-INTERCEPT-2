'use client';

import React from 'react';

export type TabId = 'home' | 'origin' | 'protocol' | 'oracle';

interface BottomNavProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const tabs: { id: TabId; label: string; sublabel: string }[] = [

  { id: 'home', label: 'HOME', sublabel: 'I' },
  { id: 'origin', label: 'ORIGIN', sublabel: 'II' },
  { id: 'protocol', label: 'PROTOCOL', sublabel: 'III' },
  { id: 'oracle', label: 'ORACLE', sublabel: 'IV' },
];

function TabIcon({ id, active }: { id: TabId; active: boolean }) {
  const color = active ? 'rgba(201,169,110,0.9)' : 'rgba(201,169,110,0.25)';
  const size = 20;

  switch (id) {
    case 'home':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="0.8" />
          <circle cx="12" cy="12" r="4" stroke={color} strokeWidth="0.8" />
          <circle cx="12" cy="12" r="1.5" fill={active ? 'rgba(201,169,110,0.6)' : 'none'} stroke={color} strokeWidth="0.5" />
          <line x1="12" y1="3" x2="12" y2="7" stroke={color} strokeWidth="0.5" />
          <line x1="12" y1="17" x2="12" y2="21" stroke={color} strokeWidth="0.5" />
          <line x1="3" y1="12" x2="7" y2="12" stroke={color} strokeWidth="0.5" />
          <line x1="17" y1="12" x2="21" y2="12" stroke={color} strokeWidth="0.5" />
        </svg>
      );
    case 'origin':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="0.8" />
          <polygon points="12,4 19,18 5,18" stroke={color} strokeWidth="0.7" fill="none" />
          <circle cx="12" cy="13" r="2.5" stroke={color} strokeWidth="0.7" fill={active ? 'rgba(201,169,110,0.15)' : 'none'} />
        </svg>
      );
    case 'protocol':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <polygon points="12,2 22,8 22,16 12,22 2,16 2,8" stroke={color} strokeWidth="0.8" fill="none" />
          <polygon points="12,6 18,10 18,16 12,20 6,16 6,10" stroke={color} strokeWidth="0.5" fill={active ? 'rgba(201,169,110,0.08)' : 'none'} />
          <circle cx="12" cy="12" r="2" fill={active ? 'rgba(201,169,110,0.5)' : 'none'} stroke={color} strokeWidth="0.5" />
        </svg>
      );
    case 'oracle':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <ellipse cx="12" cy="12" rx="9" ry="6" stroke={color} strokeWidth="0.8" fill="none" />
          <circle cx="12" cy="12" r="3" stroke={color} strokeWidth="0.8" fill="none" />
          <circle cx="12" cy="12" r="1.2" fill={active ? 'rgba(201,169,110,0.6)' : color} />
          <line x1="3" y1="4" x2="8" y2="8" stroke={color} strokeWidth="0.4" />
          <line x1="21" y1="4" x2="16" y2="8" stroke={color} strokeWidth="0.4" />
          <line x1="3" y1="20" x2="8" y2="16" stroke={color} strokeWidth="0.4" />
          <line x1="21" y1="20" x2="16" y2="16" stroke={color} strokeWidth="0.4" />
        </svg>
      );
  }
}

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{
        background: 'linear-gradient(to top, rgba(10,10,10,0.98) 0%, rgba(10,10,10,0.95) 100%)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      {/* Top border line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[rgba(201,169,110,0.12)] to-transparent" />

      <div className="flex items-center justify-around px-2 py-1 pb-[max(8px,env(safe-area-inset-bottom))]">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center justify-center py-2 px-3 min-w-[64px] transition-all duration-300 relative"
              style={{ background: 'transparent', border: 'none' }}
            >
              {/* Active indicator dot */}
              {isActive && (
                <div
                  className="absolute -top-1 left-1/2 -translate-x-1/2 w-4 h-px"
                  style={{ background: 'rgba(201,169,110,0.5)' }}
                />
              )}

              <TabIcon id={tab.id} active={isActive} />

              <span
                className="mt-1.5 text-[8px] tracking-[0.25em] uppercase"
                style={{
                  color: isActive ? 'var(--gold)' : 'var(--text-muted)',
                  fontFamily: "'Space Mono', monospace",
                  transition: 'color 0.3s ease',
                }}
              >
                {tab.label}
              </span>

              {/* Glow effect for active tab */}
              {isActive && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse at center bottom, rgba(201,169,110,0.04) 0%, transparent 70%)',
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
