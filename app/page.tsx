'use client';

import React, { useState } from 'react';
import BottomNav, { TabId } from '@/components/BottomNav';
import HomeTab from '@/components/tabs/HomeTab';
import OriginTab from '@/components/tabs/OriginTab';
import ProtocolTab from '@/components/tabs/ProtocolTab';
import OracleTab from '@/components/tabs/OracleTab';

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>('home');

  const renderTab = () => {
    switch (activeTab) {
      case 'home':
        return <HomeTab />;
      case 'origin':
        return <OriginTab />;
      case 'protocol':
        return <ProtocolTab />;
      case 'oracle':
        return <OracleTab />;
      default:
        return <HomeTab />;
    }
  };

  return (
    <main
      className="relative min-h-screen"
      style={{
        background: 'var(--obsidian)',
        maxWidth: '480px',
        margin: '0 auto',
      }}
    >
      {/* Subtle side borders for desktop viewing */}
      <div
        className="hidden sm:block fixed top-0 bottom-0 left-[calc(50%-240px)] w-px"
        style={{ background: 'rgba(201,169,110,0.04)' }}
      />
      <div
        className="hidden sm:block fixed top-0 bottom-0 right-[calc(50%-240px)] w-px"
        style={{ background: 'rgba(201,169,110,0.04)' }}
      />

      {/* Page content */}
      <div className="pb-20">
        {renderTab()}
      </div>

      {/* Bottom Navigation */}
      <div style={{ maxWidth: '480px', margin: '0 auto' }}>
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </main>
  );
}
