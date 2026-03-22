'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { AllSeeingEye } from '../svg/SacredGeometry';
import supabase from '@/lib/supabase';

interface Message {
  id: string;
  role: 'user' | 'oracle';
  content: string;
  timestamp: Date;
}

interface OriginData {
  city: string | null;
  country: string | null;
  bazi_year: string | null;
  bazi_month: string | null;
  bazi_day: string | null;
  bazi_hour: string | null;
}

export default function OracleTab() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'oracle',
      content: 'The channel is open. Speak your inquiry, and the pattern shall be revealed.',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [originData, setOriginData] = useState<OriginData | null>(null);
  const [originLoaded, setOriginLoaded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    (async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) {
          setOriginLoaded(true);
          return;
        }

        const { data } = await supabase
          .from('users_origin')
          .select('city, country, bazi_year, bazi_month, bazi_day, bazi_hour')
          .eq('id', session.user.id)
          .maybeSingle();

        if (data) {
          setOriginData(data);
        }
      } catch (err) {
        console.warn('[OracleTab] Failed to load origin data:', err);
      } finally {
        setOriginLoaded(true);
      }
    })();
  }, []);

  const handleSend = useCallback(async () => {
    if (!input.trim() || isTyping) return;

    const userQuery = input.trim();
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: userQuery,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const baziData = {
        yearPillar: originData?.bazi_year || undefined,
        monthPillar: originData?.bazi_month || undefined,
        dayPillar: originData?.bazi_day || undefined,
        hourPillar: originData?.bazi_hour || undefined,
      };

      const location = [originData?.city, originData?.country]
        .filter(Boolean)
        .join(', ');

      const res = await fetch('/api/oracle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ baziData, location, userQuery }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || '神谕通道异常');
      }

      const oracleMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'oracle',
        content: data.result,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, oracleMessage]);
    } catch (err) {
      const errorText = err instanceof Error ? err.message : '未知错误';
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'oracle',
        content: `⚠ ${errorText}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  }, [input, isTyping, originData]);

  const handleNewThread = () => {
    setMessages([
      {
        id: Date.now().toString(),
        role: 'oracle',
        content: 'A new thread begins. The slate is cleared, but the pattern remembers. What do you seek?',
        timestamp: new Date(),
      },
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="tab-content flex flex-col h-[calc(100vh-80px)] overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 px-6 pt-6 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-6 h-px bg-[rgba(201,169,110,0.3)]" />
              <span
                className="text-[10px] tracking-[0.4em] uppercase"
                style={{ color: 'var(--text-muted)', fontFamily: "'Space Mono', monospace" }}
              >
                MODULE.04
              </span>
            </div>
            <h2
              className="text-[20px] tracking-[0.15em] uppercase gold-gradient-text"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              ORACLE
            </h2>
          </div>

          <button
            onClick={handleNewThread}
            className="flex items-center gap-2 px-4 py-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              border: '1px solid rgba(201,169,110,0.2)',
              background: 'transparent',
            }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <line x1="6" y1="1" x2="6" y2="11" stroke="rgba(201,169,110,0.5)" strokeWidth="0.8" />
              <line x1="1" y1="6" x2="11" y2="6" stroke="rgba(201,169,110,0.5)" strokeWidth="0.8" />
            </svg>
            <span
              className="text-[10px] tracking-[0.2em] uppercase"
              style={{ color: 'var(--gold-dark)', fontFamily: "'Space Mono', monospace" }}
            >
              New Thread
            </span>
          </button>
        </div>

        <div className="mt-4 h-px bg-gradient-to-r from-transparent via-[rgba(201,169,110,0.1)] to-transparent" />
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
          >
            <div
              className={`max-w-[85%] ${
                message.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-oracle'
              } px-4 py-3`}
            >
              {message.role === 'oracle' && (
                <div className="flex items-center gap-2 mb-2">
                  <AllSeeingEye size={16} />
                  <span
                    className="text-[9px] tracking-[0.3em] uppercase"
                    style={{ color: 'var(--gold-dark)', fontFamily: "'Space Mono', monospace" }}
                  >
                    ORACLE
                  </span>
                </div>
              )}
              <p
                className="text-[13px] leading-relaxed whitespace-pre-wrap"
                style={{
                  color: message.role === 'user' ? 'var(--text-primary)' : 'var(--text-secondary)',
                  fontFamily: "'Rajdhani', sans-serif",
                  fontWeight: message.role === 'oracle' ? 300 : 400,
                }}
              >
                {message.content}
              </p>
              <span
                className="block text-right mt-2 text-[9px] tracking-[0.1em]"
                style={{ color: 'var(--text-muted)', fontFamily: "'Space Mono', monospace" }}
              >
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start animate-fade-in-up">
            <div className="chat-bubble-oracle px-4 py-3">
              <div className="flex items-center gap-2">
                <AllSeeingEye size={16} className="animate-pulse-gold" />
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-[rgba(201,169,110,0.4)] animate-pulse" style={{ animationDelay: '0ms' }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-[rgba(201,169,110,0.4)] animate-pulse" style={{ animationDelay: '200ms' }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-[rgba(201,169,110,0.4)] animate-pulse" style={{ animationDelay: '400ms' }} />
                </div>
                <span
                  className="text-[9px] tracking-[0.2em] uppercase"
                  style={{ color: 'var(--text-muted)', fontFamily: "'Space Mono', monospace" }}
                >
                  DECODING
                </span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="flex-shrink-0 px-6 pb-4 pt-2">
        <div className="h-px bg-gradient-to-r from-transparent via-[rgba(201,169,110,0.1)] to-transparent mb-4" />
        <div
          className="flex items-center gap-3"
          style={{
            border: '1px solid rgba(201,169,110,0.15)',
            padding: '4px 4px 4px 16px',
          }}
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={originLoaded ? 'Transmit your query...' : 'Loading origin data...'}
            disabled={!originLoaded}
            className="flex-1 bg-transparent border-none outline-none text-[13px]"
            style={{
              color: 'var(--text-primary)',
              fontFamily: "'Rajdhani', sans-serif",
              letterSpacing: '0.03em',
            }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping || !originLoaded}
            className="flex items-center justify-center w-10 h-10 transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
              background: input.trim() ? 'rgba(201,169,110,0.12)' : 'transparent',
              border: `1px solid ${input.trim() ? 'rgba(201,169,110,0.3)' : 'rgba(201,169,110,0.08)'}`,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M2 8L14 8M14 8L9 3M14 8L9 13"
                stroke={input.trim() ? 'rgba(201,169,110,0.8)' : 'rgba(201,169,110,0.2)'}
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
