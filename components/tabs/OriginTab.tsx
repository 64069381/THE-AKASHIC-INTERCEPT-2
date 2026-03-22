'use client';

import React, { useState } from 'react';
import { HexagramSigil, BackgroundWatermark } from '../svg/SacredGeometry';
import supabase from '@/lib/supabase';

export default function OriginTab() {
  const [formData, setFormData] = useState({
    birthDate: '',
    birthTime: '',
    birthPlace: '',
    latitude: '',
    longitude: '',
  });
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [matchedLocation, setMatchedLocation] = useState('');

  const handleGeocode = async () => {
    const place = formData.birthPlace.trim();
    if (!place) {
      setMatchedLocation('');
      return;
    }
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(place)}&limit=1`
      );
      const results = await res.json();
      if (results && results.length > 0) {
        setFormData((prev) => ({
          ...prev,
          latitude: parseFloat(results[0].lat).toFixed(4),
          longitude: parseFloat(results[0].lon).toFixed(4),
        }));
        setMatchedLocation(results[0].display_name || '');
      } else {
        setFormData((prev) => ({ ...prev, latitude: '', longitude: '' }));
        setMatchedLocation('LOCATION NOT FOUND');
      }
    } catch {
      setFormData((prev) => ({ ...prev, latitude: '', longitude: '' }));
      setMatchedLocation('LOCATION NOT FOUND');
    }
  };

  const handleSave = async () => {
    console.log("[DEBUG] Button clicked, starting save logic...");
    if (saving) {
      console.warn("[DEBUG] Save blocked: already saving", { saving });
      return;
    }
    setSaving(true);
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError) {
        console.warn("[DEBUG] Auth error, attempting anonymous sign-in...", authError);
        const { error: signInError } = await supabase.auth.signInAnonymously();
        if (signInError) {
          console.error("[DEBUG] Anonymous sign-in failed:", signInError);
          return;
        }
        const { data: { user: retryUser }, error: retryError } = await supabase.auth.getUser();
        if (!retryUser || retryError) {
          console.error("[DEBUG] Still no user after sign-in:", { retryUser, retryError });
          return;
        }
        console.log("[DEBUG] Recovered user after sign-in:", retryUser.id);
        await performUpsert(retryUser.id);
        return;
      }
      if (!user) {
        console.warn("[DEBUG] No user found, attempting anonymous sign-in...");
        const { error: signInError } = await supabase.auth.signInAnonymously();
        if (signInError) {
          console.error("[DEBUG] Anonymous sign-in failed:", signInError);
          return;
        }
        const { data: { user: newUser } } = await supabase.auth.getUser();
        if (!newUser) {
          console.error("[DEBUG] Still no user after sign-in");
          return;
        }
        console.log("[DEBUG] Recovered user after sign-in:", newUser.id);
        await performUpsert(newUser.id);
        return;
      }
      console.log("[DEBUG] User found:", user.id);
      await performUpsert(user.id);
    } catch (error) {
      console.error("[DEBUG] Supabase save failed:", error);
    } finally {
      setSaving(false);
    }
  };

  const performUpsert = async (userId: string) => {
    const payload = {
      id: userId,
      birth_date: formData.birthDate || null,
      birth_time: formData.birthTime || null,
      city: formData.birthPlace || null,
      country: null as string | null,
      latitude: formData.latitude ? parseFloat(formData.latitude) : null,
      longitude: formData.longitude ? parseFloat(formData.longitude) : null,
      updated_at: new Date().toISOString(),
    };
    console.log("[DEBUG] Upserting payload:", payload);
    try {
      const { error } = await supabase.from('users_origin').upsert(payload);
      if (error) {
        console.error("[DEBUG] Supabase upsert error:", error);
        return;
      }
      console.log("[DEBUG] Upsert successful!");
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    } catch (error) {
      console.error("[DEBUG] Supabase write failed:", error);
    }
  };

  return (
    <div className="tab-content relative min-h-[calc(100vh-80px)] px-6 pt-10 pb-24 overflow-hidden">
      {/* Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-50">
        <BackgroundWatermark />
      </div>

      {/* Header */}
      <div className="relative z-10 mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-px bg-[rgba(201,169,110,0.3)]" />
          <span 
            className="text-[10px] tracking-[0.4em] uppercase"
            style={{ color: 'var(--text-muted)', fontFamily: "'Space Mono', monospace" }}
          >
            MODULE.02
          </span>
        </div>
        <h2 
          className="text-[24px] tracking-[0.15em] uppercase gold-gradient-text"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          ORIGIN
        </h2>
        <p 
          className="text-[11px] tracking-[0.2em] uppercase mt-1"
          style={{ color: 'var(--text-secondary)' }}
        >
          Celestial Birth Coordinates
        </p>
      </div>

      {/* Sigil */}
      <div className="flex justify-center mb-10">
        <div className="animate-rotate-slow" style={{ animationDuration: '45s' }}>
          <HexagramSigil size={120} />
        </div>
      </div>

      {/* Form */}
      <div className="relative z-10 space-y-8 max-w-sm mx-auto">
        {/* Birth Date */}
        <div className="space-y-1">
          <label 
            className="text-[10px] tracking-[0.3em] uppercase block"
            style={{ color: 'var(--text-muted)', fontFamily: "'Space Mono', monospace" }}
          >
            Date of Emergence
          </label>
          <input
            type="date"
            value={formData.birthDate}
            onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
            className="primordial-input"
            style={{ colorScheme: 'dark' }}
          />
        </div>

        {/* Birth Time */}
        <div className="space-y-1">
          <label 
            className="text-[10px] tracking-[0.3em] uppercase block"
            style={{ color: 'var(--text-muted)', fontFamily: "'Space Mono', monospace" }}
          >
            Temporal Marker
          </label>
          <input
            type="time"
            value={formData.birthTime}
            onChange={(e) => setFormData({ ...formData, birthTime: e.target.value })}
            className="primordial-input"
            style={{ colorScheme: 'dark' }}
          />
        </div>

        {/* Birth Place */}
        <div className="space-y-1">
          <label 
            className="text-[10px] tracking-[0.3em] uppercase block"
            style={{ color: 'var(--text-muted)', fontFamily: "'Space Mono', monospace" }}
          >
            Spatial Origin
          </label>
          <input
            type="text"
            value={formData.birthPlace}
            onChange={(e) => setFormData({ ...formData, birthPlace: e.target.value })}
            onBlur={handleGeocode}
            placeholder="City, State/Province, Country"
            className="primordial-input"
          />
          <p className="text-[9px] mt-1 opacity-40" style={{ color: 'var(--text-muted)' }}>
            e.g., Chengdu, Sichuan, China OR Seattle, WA, USA
          </p>
          {matchedLocation && (
            <p
              className="text-[9px] mt-1.5 tracking-[0.1em] uppercase"
              style={{ color: matchedLocation === 'LOCATION NOT FOUND' ? 'rgba(220,80,80,0.7)' : 'var(--gold)' }}
            >
              {matchedLocation === 'LOCATION NOT FOUND' ? matchedLocation : `MATCHED: ${matchedLocation}`}
            </p>
          )}
        </div>

        {/* Coordinates */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-1">
            <label 
              className="text-[10px] tracking-[0.3em] uppercase block"
              style={{ color: 'var(--text-muted)', fontFamily: "'Space Mono', monospace" }}
            >
              Latitude
            </label>
            <input
              type="text"
              value={formData.latitude}
              onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
              placeholder="00.0000°"
              className="primordial-input"
            />
          </div>
          <div className="space-y-1">
            <label 
              className="text-[10px] tracking-[0.3em] uppercase block"
              style={{ color: 'var(--text-muted)', fontFamily: "'Space Mono', monospace" }}
            >
              Longitude
            </label>
            <input
              type="text"
              value={formData.longitude}
              onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
              placeholder="00.0000°"
              className="primordial-input"
            />
          </div>
        </div>

        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-3 py-2">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-[rgba(201,169,110,0.15)]" />
          <div className="w-1 h-1 rotate-45 border border-[rgba(201,169,110,0.2)]" />
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-[rgba(201,169,110,0.15)]" />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="group relative w-full py-3.5 transition-all duration-500 hover:scale-[1.01] active:scale-[0.99]"
          style={{
            border: '1px solid rgba(201,169,110,0.35)',
            background: saved ? 'rgba(201,169,110,0.08)' : 'transparent',
          }}
        >
          <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-[rgba(201,169,110,0.5)]" />
          <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-[rgba(201,169,110,0.5)]" />
          <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-[rgba(201,169,110,0.5)]" />
          <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-[rgba(201,169,110,0.5)]" />
          
          <span 
            className="text-[12px] tracking-[0.3em] uppercase"
            style={{ 
              color: saved ? 'var(--gold)' : 'var(--gold-light)',
              fontFamily: "'Cinzel', serif"
            }}
          >
            {saved ? '✦ COORDINATES LOCKED ✦' : 'Save Coordinates'}
          </span>

          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer" />
        </button>
      </div>
    </div>
  );
}
