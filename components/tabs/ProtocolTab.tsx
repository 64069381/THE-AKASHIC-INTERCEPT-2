'use client';

import React, { useState } from 'react';
import { AllSeeingEye, BackgroundWatermark } from '../svg/SacredGeometry';

interface Coin {
  id: number;
  result: 'yang' | 'yin' | null;
  flipping: boolean;
}

interface LineState {
  id: number;
  coins: Coin[];
  confirmed: boolean;
}

export default function ProtocolTab() {
  const [question, setQuestion] = useState('');
  const [lines, setLines] = useState<LineState[]>(
    Array.from({ length: 6 }, (_, i) => ({
      id: i,
      coins: Array.from({ length: 3 }, (_, j) => ({ id: j, result: null, flipping: false })),
      confirmed: false,
    }))
  );
  const [activeLineIndex, setActiveLineIndex] = useState(0);
  const [decoded, setDecoded] = useState(false);
  const [decodedText] = useState(
    'The pattern reveals a moment of transition. What appears as stillness is the gathering of force before movement. Trust the architecture of the unseen.'
  );

  const allConfirmed = lines.every((line) => line.confirmed);

  const handleCoinFlip = (lineIndex: number, coinIndex: number) => {
    if (lineIndex !== activeLineIndex || lines[lineIndex].confirmed) return;

    const newLines = [...lines];
    newLines[lineIndex].coins[coinIndex].flipping = true;
    setLines(newLines);

    setTimeout(() => {
      const result = Math.random() > 0.5 ? 'yang' : 'yin';
      const updatedLines = [...lines];
      updatedLines[lineIndex].coins[coinIndex].result = result;
      updatedLines[lineIndex].coins[coinIndex].flipping = false;
      setLines(updatedLines);
    }, 600);
  };

  const handleConfirmLine = (lineIndex: number) => {
    const line = lines[lineIndex];
    const allFlipped = line.coins.every((coin) => coin.result !== null);
    if (!allFlipped || line.confirmed) return;

    const newLines = [...lines];
    newLines[lineIndex].confirmed = true;
    setLines(newLines);

    if (lineIndex < 5) {
      setActiveLineIndex(lineIndex + 1);
    }
  };

  const handleDecode = () => {
    if (!allConfirmed) return;
    setDecoded(true);
  };

  const handleReset = () => {
    setLines(
      Array.from({ length: 6 }, (_, i) => ({
        id: i,
        coins: Array.from({ length: 3 }, (_, j) => ({ id: j, result: null, flipping: false })),
        confirmed: false,
      }))
    );
    setActiveLineIndex(0);
    setDecoded(false);
    setQuestion('');
  };

  return (
    <div className="tab-content relative min-h-[calc(100vh-80px)] px-6 pt-10 pb-24 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-40">
        <BackgroundWatermark />
      </div>

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

      <div className="flex justify-center mb-6">
        <AllSeeingEye size={50} className="animate-pulse-gold" />
      </div>

      <div className="relative z-10 max-w-sm mx-auto">
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

          {lines.map((line, lineIndex) => {
            const isActive = lineIndex === activeLineIndex && !line.confirmed;
            const allFlipped = line.coins.every((coin) => coin.result !== null);

            return (
              <div
                key={line.id}
                className="transition-all duration-500 origin-top"
                style={{
                  transform: line.confirmed ? 'scale(0.85)' : isActive ? 'scale(1)' : 'scale(0.92)',
                  opacity: line.confirmed ? 0.5 : isActive ? 1 : 0.6,
                  marginBottom: line.confirmed ? '8px' : '12px',
                }}
              >
                <div
                  className="relative py-4 px-4 transition-all duration-300"
                  style={{
                    border: `1px solid ${isActive ? 'rgba(201,169,110,0.35)' : 'rgba(201,169,110,0.12)'}`,
                    background: isActive ? 'rgba(201,169,110,0.05)' : 'rgba(201,169,110,0.02)',
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="text-[10px] tracking-[0.2em]"
                      style={{ color: 'var(--text-muted)', fontFamily: "'Space Mono', monospace" }}
                    >
                      LINE.{String(lineIndex + 1).padStart(2, '0')}
                    </span>
                    {line.confirmed && (
                      <span
                        className="text-[9px] tracking-[0.2em] uppercase"
                        style={{ color: 'var(--gold-dark)', fontFamily: "'Space Mono', monospace" }}
                      >
                        ✓ SEALED
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-center gap-4 mb-4">
                    {line.coins.map((coin, coinIndex) => (
                      <button
                        key={coin.id}
                        onClick={() => handleCoinFlip(lineIndex, coinIndex)}
                        disabled={!isActive || coin.result !== null || coin.flipping}
                        className="relative"
                        style={{
                          perspective: '1000px',
                          width: '52px',
                          height: '52px',
                        }}
                      >
                        <div
                          className="relative w-full h-full transition-transform duration-600"
                          style={{
                            transformStyle: 'preserve-3d',
                            transform: coin.flipping ? 'rotateY(720deg)' : coin.result ? 'rotateY(180deg)' : 'rotateY(0deg)',
                          }}
                        >
                          <div
                            className="absolute inset-0 rounded-full flex items-center justify-center"
                            style={{
                              backfaceVisibility: 'hidden',
                              border: '1px solid rgba(201,169,110,0.3)',
                              background: 'rgba(201,169,110,0.08)',
                            }}
                          >
                            <span className="text-[9px] text-[rgba(201,169,110,0.4)]">?</span>
                          </div>

                          <div
                            className="absolute inset-0 rounded-full flex items-center justify-center"
                            style={{
                              backfaceVisibility: 'hidden',
                              transform: 'rotateY(180deg)',
                              border: '1px solid rgba(201,169,110,0.5)',
                              background: coin.result === 'yang' ? 'rgba(201,169,110,0.2)' : 'rgba(10,10,10,0.6)',
                            }}
                          >
                            <span
                              className="text-[10px] font-bold tracking-wider"
                              style={{
                                color: coin.result === 'yang' ? 'var(--gold)' : 'var(--gold-dark)',
                                fontFamily: "'Space Mono', monospace"
                              }}
                            >
                              {coin.result === 'yang' ? 'YANG' : 'YIN'}
                            </span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>

                  {isActive && (
                    <button
                      onClick={() => handleConfirmLine(lineIndex)}
                      disabled={!allFlipped}
                      className="w-full py-2 transition-all duration-300"
                      style={{
                        border: `1px solid ${allFlipped ? 'rgba(201,169,110,0.4)' : 'rgba(201,169,110,0.1)'}`,
                        background: 'transparent',
                        opacity: allFlipped ? 1 : 0.3,
                      }}
                    >
                      <span
                        className="text-[10px] tracking-[0.3em] uppercase"
                        style={{ color: 'var(--gold-light)', fontFamily: "'Cinzel', serif" }}
                      >
                        Confirm
                      </span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {!decoded ? (
          allConfirmed && (
            <button
              onClick={handleDecode}
              className="group relative w-full py-3.5 transition-all duration-500 hover:scale-[1.01] active:scale-[0.99] animate-fade-in-up"
              style={{
                border: '1px solid rgba(201,169,110,0.4)',
                background: 'transparent',
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
          )
        ) : (
          <div className="animate-fade-in-up">
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
