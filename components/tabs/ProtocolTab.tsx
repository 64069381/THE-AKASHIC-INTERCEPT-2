'use client';

import React, { useState } from 'react';
import { AllSeeingEye, BackgroundWatermark } from '../svg/SacredGeometry';

type CoinResult = 'heads' | 'tails' | null;

interface CoinToss {
  id: number;
  result: CoinResult;
  value: number | null;
}

const HEXAGRAM_LINES = ['⚊', '⚋'];

export default function ProtocolTab() {
  const [question, setQuestion] = useState('');
  const [tosses, setTosses] = useState<CoinToss[]>(
    Array.from({ length: 6 }, (_, i) => ({ id: i, result: null, value: null }))
  );
  const [decoded, setDecoded] = useState(false);
  const [decodedText, setDecodedText] = useState('');

  const handleToss = (index: number) => {
    const result: CoinResult = Math.random() > 0.5 ? 'heads' : 'tails';
    const value = result === 'heads' ? 3 : 2;
    const newTosses = [...tosses];
    newTosses[index] = { ...newTosses[index], result, value };
    setTosses(newTosses);
  };

  const allTossed = tosses.every((t) => t.result !== null);

  const handleDecode = () => {
    if (!allTossed) return;
    setDecoded(true);
    setDecodedText(
      'The pattern reveals a moment of transition. What appears as stillness is the gathering of force before movement. Trust the architecture of the unseen.'
    );
  };

  const handleReset = () => {
    setTosses(Array.from({ length: 6 }, (_, i) => ({ id: i, result: null, value: null })));
    setDecoded(false);
    setDecodedText('');
    setQuestion('');
  };

  return (
    <div className="tab-content relative min-h-[calc(100vh-80px)] px-6 pt-10 pb-24 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-40">
        <BackgroundWatermark />
      </div>

      {/* Header */}
      <div className="relative z-10 mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-px bg-[rgba(201,169,110,0.3)]" />
          <span 
            className="text-[10px] tracking-[0.4em] uppercase"
            style={{ color: 'var(--text-muted)', fontFamily: "'Space Mono', monospace" }}
          >
            MODULE.03
          </span>
        </div>
        <h2 
          className="text-[24px] tracking-[0.15em] uppercase gold-gradient-text"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          PROTOCOL
        </h2>
        <p 
          className="text-[11px] tracking-[0.2em] uppercase mt-1"
          style={{ color: 'var(--text-secondary)' }}
        >
          Hexagram Divination Engine
        </p>
      </div>

      {/* Eye icon */}
      <div className="flex justify-center mb-6">
        <AllSeeingEye size={50} className="animate-pulse-gold" />
      </div>

      <div className="relative z-10 max-w-sm mx-auto">
        {/* Question Input */}
        <div className="mb-8">
          <label 
            className="text-[10px] tracking-[0.3em] uppercase block mb-1"
            style={{ color: 'var(--text-muted)', fontFamily: "'Space Mono', monospace" }}
          >
            Inscribe Your Query
          </label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="What does the pattern reveal..."
            className="primordial-input resize-none"
            rows={2}
            style={{
              borderBottom: '1px solid rgba(201,169,110,0.15)',
              lineHeight: '1.6',
            }}
          />
        </div>

        {/* Coin Tosses */}
        <div className="space-y-3 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span 
              className="text-[10px] tracking-[0.3em] uppercase"
              style={{ color: 'var(--text-muted)', fontFamily: "'Space Mono', monospace" }}
            >
              Cast the Lines
            </span>
            <div className="flex-1 h-px bg-[rgba(201,169,110,0.08)]" />
          </div>

          {tosses.map((toss, index) => (
            <button
              key={toss.id}
              onClick={() => !toss.result && handleToss(index)}
              disabled={!!toss.result}
              className="group w-full flex items-center justify-between py-3 px-4 transition-all duration-300"
              style={{
                border: `1px solid ${toss.result ? 'rgba(201,169,110,0.2)' : 'rgba(201,169,110,0.08)'}`,
                background: toss.result ? 'rgba(201,169,110,0.03)' : 'transparent',
              }}
            >
              <div className="flex items-center gap-3">
                <span 
                  className="text-[10px] tracking-[0.2em]"
                  style={{ color: 'var(--text-muted)', fontFamily: "'Space Mono', monospace" }}
                >
                  LINE.{String(index + 1).padStart(2, '0')}
                </span>
                {toss.result && (
                  <span className="text-[18px]" style={{ color: 'var(--gold)' }}>
                    {toss.value === 3 ? '⚊' : '⚋'}
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                {toss.result ? (
                  <span 
                    className="text-[10px] tracking-[0.2em] uppercase"
                    style={{ color: 'var(--gold-dark)', fontFamily: "'Space Mono', monospace" }}
                  >
                    {toss.result === 'heads' ? 'YANG ☰' : 'YIN ☷'}
                  </span>
                ) : (
                  <span 
                    className="text-[10px] tracking-[0.2em] uppercase group-hover:text-[var(--gold-light)] transition-colors"
                    style={{ color: 'var(--text-muted)', fontFamily: "'Space Mono', monospace" }}
                  >
                    TAP TO CAST
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Decode / Reset Buttons */}
        {!decoded ? (
          <button
            onClick={handleDecode}
            disabled={!allTossed}
            className="group relative w-full py-3.5 transition-all duration-500 hover:scale-[1.01] active:scale-[0.99]"
            style={{
              border: `1px solid ${allTossed ? 'rgba(201,169,110,0.4)' : 'rgba(201,169,110,0.1)'}`,
              background: 'transparent',
              opacity: allTossed ? 1 : 0.4,
            }}
          >
            <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-[rgba(201,169,110,0.5)]" />
            <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-[rgba(201,169,110,0.5)]" />
            <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-[rgba(201,169,110,0.5)]" />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-[rgba(201,169,110,0.5)]" />
            
            <span 
              className="text-[12px] tracking-[0.3em] uppercase"
              style={{ color: 'var(--gold-light)', fontFamily: "'Cinzel', serif" }}
            >
              Decode
            </span>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer" />
          </button>
        ) : (
          <div className="animate-fade-in-up">
            {/* Result */}
            <div 
              className="p-5 mb-6"
              style={{ 
                border: '1px solid rgba(201,169,110,0.15)',
                background: 'rgba(201,169,110,0.02)',
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1.5 h-1.5 rotate-45 bg-[rgba(201,169,110,0.4)]" />
                <span 
                  className="text-[10px] tracking-[0.3em] uppercase"
                  style={{ color: 'var(--gold-dark)', fontFamily: "'Space Mono', monospace" }}
                >
                  TRANSMISSION DECODED
                </span>
              </div>
              <p 
                className="text-[14px] leading-relaxed"
                style={{ color: 'var(--text-primary)', fontFamily: "'Rajdhani', sans-serif", fontWeight: 300 }}
              >
                {decodedText}
              </p>
            </div>

            <button
              onClick={handleReset}
              className="w-full py-3 transition-all duration-300"
              style={{
                border: '1px solid rgba(201,169,110,0.15)',
                background: 'transparent',
              }}
            >
              <span 
                className="text-[11px] tracking-[0.3em] uppercase"
                style={{ color: 'var(--text-secondary)', fontFamily: "'Cinzel', serif" }}
              >
                Reset Protocol
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
