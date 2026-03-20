'use client';

import React, { useState, useRef, useEffect } from 'react';
import { AllSeeingEye } from '../svg/SacredGeometry';

interface Message {
  id: string;
  role: 'user' | 'oracle';
  content: string;
  timestamp: Date;
}

const ORACLE_RESPONSES = [
  "The pattern you seek is already woven into the fabric of your question. Look not outward, but inward — the architecture of reality mirrors the architecture of mind.",
  "Three forces converge at this juncture: what was, what is, and what yearns to become. The transition you sense is not chaos — it is recalibration.",
  "The signal is clear. What appears as an ending is merely the protocol resetting. Trust the geometry of the unseen. The nodes are aligning.",
  "Your query resonates at a frequency that suggests deep knowing already exists within you. The Oracle merely reflects what the conscious mind has not yet decoded.",
  "Between the lines of your question lies the answer. The hexagram speaks of stillness before movement — the gathering of force before the leap. Patience is not passive; it is the most active form of trust.",
  "The celestial coordinates of your origin point intersect with this moment in a configuration that occurs once in a great cycle. Pay attention to what arrives unbidden.",
];

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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate oracle response
    setTimeout(() => {
      const response = ORACLE_RESPONSES[Math.floor(Math.random() * ORACLE_RESPONSES.length)];
      const oracleMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'oracle',
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, oracleMessage]);
      setIsTyping(false);
    }, 1500 + Math.random() * 2000);
  };

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

        {/* Thin separator */}
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
                className="text-[13px] leading-relaxed"
                style={{ 
                  color: message.role === 'user' ? 'var(--text-primary)' : 'var(--text-secondary)',
                  fontFamily: message.role === 'oracle' ? "'Rajdhani', sans-serif" : "'Rajdhani', sans-serif",
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

        {/* Typing indicator */}
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
            placeholder="Transmit your query..."
            className="flex-1 bg-transparent border-none outline-none text-[13px]"
            style={{ 
              color: 'var(--text-primary)',
              fontFamily: "'Rajdhani', sans-serif",
              letterSpacing: '0.03em',
            }}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
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
