'use client';

import React, { useState, useEffect } from 'react';
import BottomNav, { TabId } from '@/components/BottomNav';
import HomeTab from '@/components/tabs/HomeTab';
import OriginTab from '@/components/tabs/OriginTab';
import ProtocolTab from '@/components/tabs/ProtocolTab';
import OracleTab from '@/components/tabs/OracleTab';
import supabase from '@/lib/supabase';

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        await supabase.auth.signInAnonymously();
      }
    })();
  }, []);

  if (!isMounted) {
    return (
      <main
        className="relative min-h-screen"
        style={{
          background: 'var(--obsidian)',
          maxWidth: '480px',
          margin: '0 auto',
        }}
      />
    );
  }

  return (
    <main
      className="relative min-h-screen"
      style={{
        background: 'var(--obsidian)',
        maxWidth: '480px',
        margin: '0 auto',
      }}
    >
      <div
        className="hidden sm:block fixed top-0 bottom-0 left-[calc(50%-240px)] w-px"
        style={{ background: 'rgba(201,169,110,0.04)' }}
      />
      <div
        className="hidden sm:block fixed top-0 bottom-0 right-[calc(50%-240px)] w-px"
        style={{ background: 'rgba(201,169,110,0.04)' }}
      />

      <div className="pb-20">
        <div style={{ display: activeTab === 'home' ? 'block' : 'none' }}>
          <HomeTab />
        </div>
        <div style={{ display: activeTab === 'origin' ? 'block' : 'none' }}>
          <OriginTab />
        </div>
        <div style={{ display: activeTab === 'protocol' ? 'block' : 'none' }}>
          <ProtocolTab />
        </div>
        <div style={{ display: activeTab === 'oracle' ? 'block' : 'none' }}>
          <OracleTab />
        </div>
      </div>

      <div style={{ maxWidth: '480px', margin: '0 auto' }}>
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </main>
  );
}
