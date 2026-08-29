import React, { useState, useEffect, useRef } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────
type Screen =
  | 'welcome'
  | 'choose-who'
  | 'create-profile'
  | 'dashboard'
  | 'memory-prompt'
  | 'audio-recording'
  | 'memory-saved'
  | 'timeline'
  | 'life-book'
  | 'profile'

// ─── Design tokens ────────────────────────────────────────────────────────────
const C = {
  ivory: '#F8F4EC',
  cream: '#FFFDF8',
  sage: '#55664D',
  sageMid: '#7D8B73',
  sagePale: '#C8D3C2',
  brown: '#9B7653',
  brownLight: '#C4A882',
  charcoal: '#292724',
  muted: '#6B6460',
  border: '#E2DAD0',
  cardBg: '#FFFDF8',
}

// ─── Shared primitives ────────────────────────────────────────────────────────

const serif = { fontFamily: "'Playfair Display', Georgia, serif" } as const
const sans = { fontFamily: "'DM Sans', system-ui, sans-serif" } as const

function LeafSvg({ size = 24, color = C.sageMid, opacity = 0.7, flip = false }: { size?: number; color?: string; opacity?: number; flip?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ opacity, transform: flip ? 'scaleX(-1)' : undefined }}>
      <path
        d="M12 2C12 2 4 7 4 14C4 18.4 7.6 22 12 22C16.4 22 20 18.4 20 14C20 7 12 2 12 2Z"
        fill={color}
      />
      <path d="M12 2L12 22" stroke={C.cream} strokeWidth="0.8" strokeLinecap="round" />
      <path d="M12 8L8 12" stroke={C.cream} strokeWidth="0.6" strokeLinecap="round" />
      <path d="M12 8L16 12" stroke={C.cream} strokeWidth="0.6" strokeLinecap="round" />
      <path d="M12 13L9 16" stroke={C.cream} strokeWidth="0.6" strokeLinecap="round" />
      <path d="M12 13L15 16" stroke={C.cream} strokeWidth="0.6" strokeLinecap="round" />
    </svg>
  )
}

function SmallLeaf({ flip = false }: { flip?: boolean }) {
  return (
    <svg width="18" height="22" viewBox="0 0 18 22" fill="none" style={{ transform: flip ? 'scaleX(-1)' : undefined }}>
      <path d="M9 1C9 1 1 6 1 13C1 17.4 4.6 21 9 21C13.4 21 17 17.4 17 13C17 6 9 1 9 1Z" fill={C.sageMid} opacity="0.5" />
    </svg>
  )
}

function HeartIcon({ size = 16, color = C.brown }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  )
}

function MicIcon({ size = 20, color = 'white' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2H3v2a9 9 0 0 0 8 8.94V23h2v-2.06A9 9 0 0 0 21 12v-2h-2z" />
    </svg>
  )
}

function PenIcon({ size = 18, color = C.sage }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
      <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  )
}

function PlayIcon({ size = 16, color = C.sage }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <polygon points="5,3 19,12 5,21" />
    </svg>
  )
}

function PauseIcon({ size = 22, color = 'white' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <rect x="6" y="4" width="4" height="16" />
      <rect x="14" y="4" width="4" height="16" />
    </svg>
  )
}

function StopIcon({ size = 22, color = 'white' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
    </svg>
  )
}

function CheckIcon({ size = 32, color = 'white' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20,6 9,17 4,12" />
    </svg>
  )
}

function BookIcon({ size = 22, color = C.muted }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round">
      <path d="M4 4h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H4z" /><path d="M20 4h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  )
}

function ClockIcon({ size = 22, color = C.muted }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12,6 12,12 16,14" />
    </svg>
  )
}

function HomeIcon({ size = 22, color = C.muted }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9,22 9,12 15,12 15,22" />
    </svg>
  )
}

function UserIcon({ size = 22, color = C.muted }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.6" strokeLinecap="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
    </svg>
  )
}

function PlusCircleIcon({ size = 22, color = 'white' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="10" fill={C.sage} /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" />
    </svg>
  )
}

function ChevronRight({ size = 16, color = C.muted }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round">
      <polyline points="9,18 15,12 9,6" />
    </svg>
  )
}

function BackArrow({ onPress }: { onPress: () => void }) {
  return (
    <button onClick={onPress} style={{ background: 'none', border: 'none', padding: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={C.charcoal} strokeWidth="1.8" strokeLinecap="round">
        <polyline points="15,18 9,12 15,6" />
      </svg>
    </button>
  )
}

function LockIcon({ size = 16, color = C.muted }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

// ─── Status bar ───────────────────────────────────────────────────────────────
function StatusBar({ dark = false }: { dark?: boolean }) {
  const c = dark ? C.cream : C.charcoal
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px 4px', fontSize: 12, fontWeight: 600, color: c, ...sans }}>
      <span>9:41</span>
      <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
        <svg width="16" height="12" viewBox="0 0 16 12" fill={c} opacity="0.8">
          <rect x="0" y="6" width="3" height="6" rx="0.5" />
          <rect x="4" y="4" width="3" height="8" rx="0.5" />
          <rect x="8" y="2" width="3" height="10" rx="0.5" />
          <rect x="12" y="0" width="3" height="12" rx="0.5" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 20 14" fill={c} opacity="0.8">
          <path d="M10 3C13.5 3 16.7 4.5 18.9 7L20 5.8C17.5 3.2 13.9 1.5 10 1.5C6.1 1.5 2.5 3.2 0 5.8L1.1 7C3.3 4.5 6.5 3 10 3Z" />
          <path d="M10 6C12.5 6 14.8 7 16.4 8.7L17.5 7.5C15.6 5.5 13 4.4 10 4.4C7 4.4 4.4 5.5 2.5 7.5L3.6 8.7C5.2 7 7.5 6 10 6Z" />
          <circle cx="10" cy="12" r="2" />
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x="0" y="1" width="22" height="10" rx="2" stroke={c} strokeWidth="1" opacity="0.8" />
          <rect x="1.5" y="2.5" width="17" height="7" rx="1" fill={c} opacity="0.8" />
          <path d="M23 4v4a2 2 0 0 0 0-4z" fill={c} opacity="0.5" />
        </svg>
      </div>
    </div>
  )
}

// ─── Bottom navigation ────────────────────────────────────────────────────────
function BottomNav({ current, nav }: { current: Screen; nav: (s: Screen) => void }) {
  const tabs: { id: Screen; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Home', icon: <HomeIcon color={current === 'dashboard' ? C.sage : C.muted} /> },
    { id: 'timeline', label: 'Timeline', icon: <ClockIcon color={current === 'timeline' ? C.sage : C.muted} /> },
  ]
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      background: C.cream,
      borderTop: `1px solid ${C.border}`,
      display: 'flex', alignItems: 'center', justifyContent: 'space-around',
      padding: '8px 8px 20px',
      zIndex: 10,
    }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => nav(t.id)} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
          flex: 1,
        }}>
          {t.icon}
          <span style={{ fontSize: 10, color: current === t.id ? C.sage : C.muted, fontWeight: current === t.id ? 600 : 400, ...sans }}>{t.label}</span>
        </button>
      ))}
      <button onClick={() => nav('memory-prompt')} style={{
        background: 'none', border: 'none', cursor: 'pointer',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
        flex: 1, position: 'relative', top: -10,
      }}>
        <div style={{
          width: 52, height: 52, borderRadius: 26,
          background: C.sage,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 4px 16px ${C.sage}66`,
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </div>
        <span style={{ fontSize: 10, color: C.muted, ...sans }}>Add</span>
      </button>
      <button onClick={() => nav('life-book')} style={{
        background: 'none', border: 'none', cursor: 'pointer',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
        flex: 1,
      }}>
        <BookIcon color={current === 'life-book' ? C.sage : C.muted} />
        <span style={{ fontSize: 10, color: current === 'life-book' ? C.sage : C.muted, fontWeight: current === 'life-book' ? 600 : 400, ...sans }}>Life Book</span>
      </button>
      <button onClick={() => nav('profile')} style={{
        background: 'none', border: 'none', cursor: 'pointer',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
        flex: 1,
      }}>
        <UserIcon color={current === 'profile' ? C.sage : C.muted} />
        <span style={{ fontSize: 10, color: current === 'profile' ? C.sage : C.muted, fontWeight: current === 'profile' ? 600 : 400, ...sans }}>Profile</span>
      </button>
    </div>
  )
}

// ─── Photo avatar ─────────────────────────────────────────────────────────────
function Avatar({ size = 72 }: { size?: number }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: size / 2,
      background: `linear-gradient(135deg, ${C.sagePale} 0%, ${C.brownLight} 100%)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      border: `3px solid ${C.cream}`,
      boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
      overflow: 'hidden',
    }}>
      <img
        src={`https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=${size * 2}&h=${size * 2}&fit=crop&auto=format`}
        alt="Margaret Sharma"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
      />
    </div>
  )
}

function PhotoPlaceholder({ w, h, seed, alt }: { w: number; h: number; seed: string; alt: string }) {
  const ids: Record<string, string> = {
    childhood: '1516627145497-ae6968895b74',
    house: '1568605114967-8130f3a36994',
    family: '1511895426340-a0b6e9d17dc0',
    travel: '1529156069898-49953e39b3ac',
    recipe: '1495521821757-a1efb6729352',
    garden: '1416879595882-3373a0480b5b',
    wedding: '1519741347686-c1e0aadf4611',
    music: '1493225457124-a3eb161ffa5f',
  }
  const id = ids[seed] || '1516627145497-ae6968895b74'
  return (
    <div style={{ width: w, height: h, borderRadius: 12, overflow: 'hidden', background: C.sagePale, flexShrink: 0 }}>
      <img
        src={`https://images.unsplash.com/photo-${id}?w=${w * 2}&h=${h * 2}&fit=crop&auto=format`}
        alt={alt}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        onError={(e) => {
          const el = e.currentTarget.parentElement!
          el.style.display = 'flex'
          el.style.alignItems = 'center'
          el.style.justifyContent = 'center';
          (e.target as HTMLImageElement).style.display = 'none'
        }}
      />
    </div>
  )
}

// ─── Waveform component ───────────────────────────────────────────────────────
function Waveform({ active = true }: { active?: boolean }) {
  const bars = [6, 14, 22, 18, 28, 12, 32, 20, 10, 26, 16, 30, 8, 24, 18, 12, 28, 20, 6, 24, 16, 30, 10, 22]
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 3, height: 48, justifyContent: 'center' }}>
      {bars.map((h, i) => (
        <div
          key={i}
          className={active ? 'wave-bar' : ''}
          style={{
            width: 3,
            height: active ? h : h * 0.4,
            borderRadius: 2,
            background: 'rgba(255,253,248,0.7)',
            animationDelay: `${i * 0.06}s`,
            animationDuration: `${0.7 + (i % 4) * 0.15}s`,
            transition: 'height 0.3s',
          }}
        />
      ))}
    </div>
  )
}

// ─── Memory category card ─────────────────────────────────────────────────────
const categories = [
  { id: 'childhood', emoji: '🏡', label: 'Childhood', count: 4 },
  { id: 'family', emoji: '👨‍👩‍👧', label: 'Family', count: 3 },
  { id: 'places', emoji: '📍', label: 'Places', count: 2 },
  { id: 'music', emoji: '🎵', label: 'Music', count: 1 },
  { id: 'recipes', emoji: '🫕', label: 'Recipes', count: 2 },
  { id: 'life-lessons', emoji: '✨', label: 'Life Lessons', count: 1 },
]

// ════════════════════════════════════════════════════════════════════════════════
// SCREEN 1 — Welcome
// ════════════════════════════════════════════════════════════════════════════════
function WelcomeScreen({ nav }: { nav: (s: Screen) => void }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: C.ivory, position: 'relative', overflow: 'hidden' }}>
      <StatusBar />

      {/* Botanical illustration area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 32px', gap: 0 }}>

        {/* Decorative leaves cluster */}
        <div style={{ position: 'relative', marginBottom: 16 }}>
          <div style={{ position: 'absolute', left: -28, top: 8 }}><SmallLeaf /></div>
          <div style={{ position: 'absolute', right: -28, top: 8 }}><SmallLeaf flip /></div>
          <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end' }}>
            <LeafSvg size={20} opacity={0.5} />
            <LeafSvg size={28} opacity={0.8} />
            <LeafSvg size={20} opacity={0.5} />
          </div>
        </div>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 6 }}>
          <div style={{ ...serif, fontSize: 30, fontWeight: 700, color: C.charcoal, letterSpacing: '0.08em', lineHeight: 1.1 }}>
            MEMORY
          </div>
          <div style={{ ...serif, fontSize: 30, fontWeight: 700, color: C.charcoal, letterSpacing: '0.08em', lineHeight: 1.1 }}>
            VAULT
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 6 }}>
            <HeartIcon size={14} color={C.brown} />
          </div>
        </div>

        {/* Divider */}
        <div style={{ width: 48, height: 1, background: C.border, margin: '16px 0' }} />

        {/* Tagline */}
        <div style={{ textAlign: 'center', marginBottom: 10 }}>
          <p style={{ ...serif, fontSize: 22, fontWeight: 500, color: C.charcoal, margin: 0, lineHeight: 1.4, fontStyle: 'italic' }}>
            Every life has a story.
          </p>
          <p style={{ ...serif, fontSize: 22, fontWeight: 500, color: C.charcoal, margin: 0, lineHeight: 1.4, fontStyle: 'italic' }}>
            Let's preserve yours.
          </p>
        </div>

        <p style={{ ...sans, fontSize: 14, color: C.muted, textAlign: 'center', lineHeight: 1.6, margin: '0 0 36px', maxWidth: 260 }}>
          A private place to record, protect and cherish the stories, voices and memories that make you, you.
        </p>

        {/* CTA button */}
        <button
          onClick={() => nav('choose-who')}
          style={{
            width: '100%', padding: '16px 0',
            background: C.sage,
            border: 'none', borderRadius: 12,
            ...sans, fontSize: 16, fontWeight: 600, color: C.cream,
            cursor: 'pointer',
            letterSpacing: '0.01em',
            boxShadow: `0 4px 20px ${C.sage}44`,
          }}
        >
          Begin your story
        </button>

        <p style={{ ...sans, fontSize: 12, color: C.muted, marginTop: 16, textAlign: 'center' }}>
          Your memories belong to you.
        </p>
      </div>

      {/* Bottom decorative strip */}
      <div style={{
        height: 80,
        background: `linear-gradient(to top, ${C.sagePale}33, transparent)`,
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 12,
        gap: 12,
      }}>
        {[0, 1, 2, 3, 4].map(i => (
          <LeafSvg key={i} size={16 + i * 2} opacity={0.2 + i * 0.06} color={C.sage} />
        ))}
      </div>
    </div>
  )
}

// ════════════════════════════════════════════════════════════════════════════════
// SCREEN 2 — Choose who
// ════════════════════════════════════════════════════════════════════════════════
function ChooseWhoScreen({ nav }: { nav: (s: Screen) => void }) {
  const [selected, setSelected] = useState<string | null>(null)
  const options = [
    { id: 'myself', icon: '🙋', title: 'Myself', desc: 'Preserve your own life story' },
    { id: 'someone', icon: '❤️', title: 'Someone I love', desc: 'Help preserve their memories' },
    { id: 'family', icon: '👨‍👩‍👧‍👦', title: 'Our family', desc: 'Build our family archive' },
  ]
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: C.ivory }}>
      <StatusBar />
      <div style={{ padding: '24px 24px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <BackArrow onPress={() => nav('welcome')} />
        <div style={{ display: 'flex', gap: 6 }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ width: i === 1 ? 20 : 6, height: 6, borderRadius: 3, background: i === 1 ? C.sage : C.border }} />
          ))}
        </div>
        <div style={{ width: 24 }} />
      </div>

      <div style={{ flex: 1, padding: '28px 24px 32px', display: 'flex', flexDirection: 'column' }}>
        {/* Leaf decoration */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
          <LeafSvg size={16} opacity={0.4} /><LeafSvg size={22} opacity={0.6} /><LeafSvg size={16} opacity={0.4} />
        </div>

        <h1 style={{ ...serif, fontSize: 26, fontWeight: 600, color: C.charcoal, margin: '0 0 8px', lineHeight: 1.3 }}>
          Whose story are<br />we preserving?
        </h1>
        <p style={{ ...sans, fontSize: 14, color: C.muted, margin: '0 0 32px', lineHeight: 1.6 }}>
          You can always add more people later.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
          {options.map(opt => (
            <button
              key={opt.id}
              onClick={() => { setSelected(opt.id); setTimeout(() => nav('create-profile'), 200) }}
              style={{
                display: 'flex', alignItems: 'center', gap: 16,
                padding: '18px 20px',
                background: selected === opt.id ? `${C.sage}12` : C.cream,
                border: `1.5px solid ${selected === opt.id ? C.sage : C.border}`,
                borderRadius: 16,
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s',
              }}
            >
              <span style={{ fontSize: 28 }}>{opt.icon}</span>
              <div>
                <div style={{ ...sans, fontSize: 16, fontWeight: 600, color: C.charcoal, marginBottom: 2 }}>{opt.title}</div>
                <div style={{ ...sans, fontSize: 13, color: C.muted }}>{opt.desc}</div>
              </div>
              <div style={{ marginLeft: 'auto' }}>
                <ChevronRight color={selected === opt.id ? C.sage : C.border} />
              </div>
            </button>
          ))}
        </div>

        <p style={{ ...sans, fontSize: 12, color: C.muted, textAlign: 'center', marginTop: 20 }}>
          🔒 Private by default. Share only what you choose.
        </p>
      </div>
    </div>
  )
}

// ════════════════════════════════════════════════════════════════════════════════
// SCREEN 3 — Create profile
// ════════════════════════════════════════════════════════════════════════════════
function CreateProfileScreen({ nav }: { nav: (s: Screen) => void }) {
  const [name, setName] = useState('Margaret Sharma')
  const [dob, setDob] = useState('14 March 1948')
  const [relation, setRelation] = useState('Mother')

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: C.ivory }}>
      <StatusBar />
      <div style={{ padding: '24px 24px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <BackArrow onPress={() => nav('choose-who')} />
        <div style={{ display: 'flex', gap: 6 }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ width: i === 2 ? 20 : 6, height: 6, borderRadius: 3, background: i <= 2 ? C.sage : C.border }} />
          ))}
        </div>
        <div style={{ width: 24 }} />
      </div>

      <div style={{ flex: 1, padding: '24px 24px 32px', display: 'flex', flexDirection: 'column', overflowY: 'auto' }} className="hide-scroll">
        <h1 style={{ ...serif, fontSize: 26, fontWeight: 600, color: C.charcoal, margin: '0 0 6px', lineHeight: 1.3 }}>
          Tell us about them
        </h1>
        <p style={{ ...sans, fontSize: 14, color: C.muted, margin: '0 0 28px' }}>
          This is the start of their vault.
        </p>

        {/* Photo upload */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
          <div style={{ position: 'relative' }}>
            <div style={{
              width: 96, height: 96, borderRadius: 48,
              background: `linear-gradient(135deg, ${C.sagePale}, ${C.brownLight}55)`,
              border: `2px dashed ${C.sageMid}`,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', gap: 4,
            }}>
              <span style={{ fontSize: 28 }}>📷</span>
              <span style={{ ...sans, fontSize: 10, color: C.sageMid, fontWeight: 500 }}>Add photo</span>
            </div>
          </div>
        </div>

        {/* Fields */}
        {[
          { label: 'Full name', value: name, setter: setName, placeholder: 'e.g. Margaret Sharma' },
          { label: 'Date of birth', value: dob, setter: setDob, placeholder: 'e.g. 14 March 1948' },
          { label: 'Your relationship', value: relation, setter: setRelation, placeholder: 'e.g. Mother, Grandfather…' },
        ].map(field => (
          <div key={field.label} style={{ marginBottom: 18 }}>
            <label style={{ ...sans, fontSize: 12, fontWeight: 600, color: C.muted, letterSpacing: '0.06em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
              {field.label}
            </label>
            <input
              value={field.value}
              onChange={e => field.setter(e.target.value)}
              placeholder={field.placeholder}
              style={{
                width: '100%', padding: '14px 16px',
                background: C.cream,
                border: `1.5px solid ${C.border}`,
                borderRadius: 12,
                ...sans, fontSize: 15, color: C.charcoal,
                outline: 'none',
              }}
            />
          </div>
        ))}

        <div style={{ marginBottom: 18 }}>
          <label style={{ ...sans, fontSize: 12, fontWeight: 600, color: C.muted, letterSpacing: '0.06em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
            Their hometown
          </label>
          <input
            defaultValue="Jaipur, Rajasthan, India"
            style={{
              width: '100%', padding: '14px 16px',
              background: C.cream, border: `1.5px solid ${C.border}`, borderRadius: 12,
              ...sans, fontSize: 15, color: C.charcoal, outline: 'none',
            }}
          />
        </div>

        <button
          onClick={() => nav('dashboard')}
          style={{
            width: '100%', padding: '16px',
            background: C.sage, border: 'none', borderRadius: 12,
            ...sans, fontSize: 16, fontWeight: 600, color: C.cream,
            cursor: 'pointer', marginTop: 8,
            boxShadow: `0 4px 20px ${C.sage}44`,
          }}
        >
          Create her vault
        </button>
      </div>
    </div>
  )
}

// ════════════════════════════════════════════════════════════════════════════════
// SCREEN 4 — Dashboard
// ════════════════════════════════════════════════════════════════════════════════
function DashboardScreen({ nav }: { nav: (s: Screen) => void }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: C.ivory, paddingBottom: 72 }}>
      <div style={{ background: C.sage, paddingBottom: 20 }}>
        <StatusBar dark />
        <div style={{ padding: '8px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <p style={{ ...sans, fontSize: 12, color: `${C.cream}bb`, margin: '0 0 2px', letterSpacing: '0.04em' }}>Preserving the story of</p>
            <h1 style={{ ...serif, fontSize: 24, fontWeight: 600, color: C.cream, margin: 0 }}>Margaret Sharma</h1>
            <p style={{ ...sans, fontSize: 12, color: `${C.cream}99`, margin: '2px 0 0' }}>Born 14 March 1948</p>
          </div>
          <Avatar size={56} />
        </div>

        {/* Memory badge */}
        <div style={{ margin: '16px 20px 0' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: `${C.cream}22`, borderRadius: 20,
            padding: '6px 14px',
          }}>
            <span style={{ fontSize: 14 }}>🌿</span>
            <span style={{ ...sans, fontSize: 13, color: C.cream, fontWeight: 500 }}>13 Memories Preserved</span>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 20px 0' }} className="hide-scroll">
        {/* Continue her story card */}
        <div style={{
          background: C.cream, borderRadius: 16, padding: '18px',
          boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
          border: `1px solid ${C.border}`,
          marginBottom: 20,
        }}>
          <p style={{ ...sans, fontSize: 11, color: C.sageMid, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 8px' }}>
            Continue her story
          </p>
          <h3 style={{ ...serif, fontSize: 18, fontWeight: 600, color: C.charcoal, margin: '0 0 6px', lineHeight: 1.3 }}>
            Tell us about your childhood
          </h3>
          <p style={{ ...sans, fontSize: 13, color: C.muted, margin: '0 0 14px', fontStyle: 'italic' }}>
            "Where did you grow up?"
          </p>
          <button
            onClick={() => nav('memory-prompt')}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: C.sage, border: 'none', borderRadius: 10,
              padding: '10px 18px', cursor: 'pointer',
            }}
          >
            <MicIcon size={16} />
            <span style={{ ...sans, fontSize: 14, fontWeight: 600, color: C.cream }}>Record</span>
          </button>
        </div>

        {/* Categories */}
        <p style={{ ...sans, fontSize: 12, color: C.muted, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 12px' }}>
          Explore her memories
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 20 }}>
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => nav('life-book')}
              style={{
                background: C.cream, border: `1px solid ${C.border}`,
                borderRadius: 14, padding: '14px 8px',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                cursor: 'pointer',
                boxShadow: '0 1px 6px rgba(0,0,0,0.04)',
              }}
            >
              <span style={{ fontSize: 22 }}>{cat.emoji}</span>
              <span style={{ ...sans, fontSize: 11, color: C.charcoal, fontWeight: 500, textAlign: 'center', lineHeight: 1.2 }}>{cat.label}</span>
              <span style={{ ...sans, fontSize: 10, color: C.sageMid }}>{cat.count}</span>
            </button>
          ))}
        </div>

        {/* Recent memories */}
        <p style={{ ...sans, fontSize: 12, color: C.muted, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 12px' }}>
          Recently added
        </p>
        {[
          { label: '🎙 Audio', title: 'The house on Bani Park Road', time: '0:45', date: 'Aug 12' },
          { label: '✍️ Written', title: "Mama's dal makhani recipe", date: 'Aug 9' },
        ].map((m, i) => (
          <div key={i} style={{
            background: C.cream, border: `1px solid ${C.border}`,
            borderRadius: 14, padding: '14px 16px',
            marginBottom: 10, display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{
              width: 42, height: 42, borderRadius: 10,
              background: `${C.sagePale}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
            }}>
              {m.label.split(' ')[0]}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ ...sans, fontSize: 14, fontWeight: 500, color: C.charcoal, margin: '0 0 2px' }}>{m.title}</p>
              <p style={{ ...sans, fontSize: 12, color: C.muted, margin: 0 }}>{m.date}{m.time ? ` · ${m.time}` : ''}</p>
            </div>
            <PlayIcon />
          </div>
        ))}
      </div>

      <BottomNav current="dashboard" nav={nav} />
    </div>
  )
}

// ════════════════════════════════════════════════════════════════════════════════
// SCREEN 5 — Memory prompt
// ════════════════════════════════════════════════════════════════════════════════
function MemoryPromptScreen({ nav }: { nav: (s: Screen) => void }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: C.ivory }}>
      <StatusBar />
      <div style={{ padding: '8px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <BackArrow onPress={() => nav('dashboard')} />
        <span style={{ ...sans, fontSize: 13, color: C.muted, fontWeight: 500 }}>Childhood</span>
        <span style={{ ...sans, fontSize: 12, color: C.muted }}>1 of 8</span>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px 32px', display: 'flex', flexDirection: 'column' }} className="hide-scroll">
        {/* Photo */}
        <PhotoPlaceholder w={327} h={200} seed="house" alt="A cozy childhood home" />

        <div style={{ marginTop: 24 }}>
          <div style={{ display: 'flex', gap: 4, marginBottom: 12 }}>
            <LeafSvg size={14} opacity={0.5} /><LeafSvg size={14} opacity={0.3} flip />
          </div>
          <h2 style={{ ...serif, fontSize: 26, fontWeight: 600, color: C.charcoal, margin: '0 0 10px', lineHeight: 1.35 }}>
            What was your childhood home like?
          </h2>
          <p style={{ ...sans, fontSize: 14, color: C.muted, margin: '0 0 28px', lineHeight: 1.6 }}>
            You can speak, write, or come back later.
          </p>

          {/* Primary action */}
          <button
            onClick={() => nav('audio-recording')}
            style={{
              width: '100%', padding: '16px',
              background: C.sage, border: 'none', borderRadius: 14,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              cursor: 'pointer', marginBottom: 12,
              boxShadow: `0 4px 18px ${C.sage}44`,
            }}
          >
            <MicIcon size={18} />
            <span style={{ ...sans, fontSize: 16, fontWeight: 600, color: C.cream }}>Tell the story</span>
          </button>

          {/* Secondary action */}
          <button
            onClick={() => nav('memory-saved')}
            style={{
              width: '100%', padding: '15px',
              background: 'transparent', border: `1.5px solid ${C.border}`,
              borderRadius: 14,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              cursor: 'pointer', marginBottom: 20,
            }}
          >
            <PenIcon />
            <span style={{ ...sans, fontSize: 15, fontWeight: 500, color: C.charcoal }}>Write instead</span>
          </button>

          {/* Skip */}
          <button
            onClick={() => nav('memory-prompt')}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              ...sans, fontSize: 14, color: C.sageMid,
              display: 'flex', alignItems: 'center', gap: 4,
            }}
          >
            Try another question <ChevronRight size={14} color={C.sageMid} />
          </button>
        </div>
      </div>
    </div>
  )
}

// ════════════════════════════════════════════════════════════════════════════════
// SCREEN 6 — Audio recording
// ════════════════════════════════════════════════════════════════════════════════
function AudioRecordingScreen({ nav }: { nav: (s: Screen) => void }) {
  const [seconds, setSeconds] = useState(37)
  const [paused, setPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (!paused) {
      timerRef.current = setInterval(() => setSeconds(s => s + 1), 1000)
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [paused])

  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: C.sage }}>
      <StatusBar dark />

      {/* Header */}
      <div style={{ padding: '8px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <BackArrow onPress={() => nav('memory-prompt')} />
        <span style={{ ...sans, fontSize: 13, color: `${C.cream}cc`, fontWeight: 500 }}>Childhood</span>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', ...sans, fontSize: 13, color: `${C.cream}99` }}>
          ···
        </button>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        {/* Question */}
        <p style={{ ...sans, fontSize: 12, color: `${C.cream}88`, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 12px', textAlign: 'center' }}>
          Recording memory
        </p>
        <h2 style={{ ...serif, fontSize: 22, fontWeight: 600, color: C.cream, textAlign: 'center', lineHeight: 1.4, margin: '0 0 32px' }}>
          What was your childhood home like?
        </h2>

        {/* Timer */}
        <div style={{ marginBottom: 8 }}>
          <span style={{ ...serif, fontSize: 56, fontWeight: 400, color: C.cream, letterSpacing: '0.04em', fontVariantNumeric: 'tabular-nums' }}>
            {fmt(seconds)}
          </span>
        </div>
        <p style={{ ...sans, fontSize: 13, color: `${C.cream}99`, margin: '0 0 28px' }}>
          {paused ? 'Paused' : 'Recording...'}
        </p>

        {/* Waveform */}
        <div style={{ width: '100%', marginBottom: 40 }}>
          <Waveform active={!paused} />
        </div>

        {/* Controls */}
        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          <button
            onClick={() => setPaused(p => !p)}
            style={{
              width: 64, height: 64, borderRadius: 32,
              background: `${C.cream}22`, border: `2px solid ${C.cream}44`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            {paused ? <PlayIcon size={22} color={C.cream} /> : <PauseIcon />}
          </button>
          <button
            onClick={() => nav('memory-saved')}
            style={{
              width: 72, height: 72, borderRadius: 36,
              background: C.brown,
              border: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: `0 4px 20px ${C.brown}66`,
            }}
          >
            <StopIcon />
          </button>
        </div>

        <div style={{ display: 'flex', gap: 16, marginTop: 24 }}>
          <span style={{ ...sans, fontSize: 12, color: `${C.cream}66` }}>Pause</span>
          <span style={{ ...sans, fontSize: 12, color: `${C.cream}66`, marginLeft: 40 }}>Finish</span>
        </div>
      </div>

      {/* Floating leaves */}
      <div style={{ position: 'absolute', bottom: 30, right: 20, opacity: 0.15, pointerEvents: 'none' }}>
        <LeafSvg size={48} color={C.cream} />
      </div>
    </div>
  )
}

// ════════════════════════════════════════════════════════════════════════════════
// SCREEN 7 — Memory saved
// ════════════════════════════════════════════════════════════════════════════════
function MemorySavedScreen({ nav }: { nav: (s: Screen) => void }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: C.ivory }}>
      <StatusBar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>

        {/* Success ring */}
        <div style={{ position: 'relative', marginBottom: 24 }}>
          <div style={{
            width: 80, height: 80, borderRadius: 40,
            background: C.sage,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            animation: 'checkPop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) both',
            boxShadow: `0 0 0 12px ${C.sage}22`,
          }}>
            <CheckIcon size={36} />
          </div>
        </div>

        <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
          <LeafSvg size={16} opacity={0.5} /><LeafSvg size={16} opacity={0.3} flip />
        </div>

        <h2 style={{ ...serif, fontSize: 28, fontWeight: 600, color: C.charcoal, textAlign: 'center', margin: '0 0 10px', lineHeight: 1.3 }}>
          Memory saved.
        </h2>
        <p style={{ ...sans, fontSize: 15, color: C.muted, textAlign: 'center', lineHeight: 1.6, margin: '0 0 32px' }}>
          This piece of Margaret's story<br />is now safely preserved.
        </p>

        {/* Preview card */}
        <div style={{
          width: '100%', background: C.cream,
          border: `1px solid ${C.border}`, borderRadius: 16,
          padding: '16px', marginBottom: 32,
          boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
        }}>
          <p style={{ ...sans, fontSize: 11, color: C.sageMid, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', margin: '0 0 6px' }}>
            🏡 Childhood · Audio
          </p>
          <p style={{ ...serif, fontSize: 16, color: C.charcoal, margin: '0 0 10px' }}>
            What was your childhood home like?
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: C.ivory, borderRadius: 10, padding: '10px 14px' }}>
            <button style={{ background: C.sage, border: 'none', borderRadius: 20, width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <PlayIcon size={13} color={C.cream} />
            </button>
            <div style={{ flex: 1, height: 3, background: C.border, borderRadius: 2 }}>
              <div style={{ width: '0%', height: '100%', background: C.sage, borderRadius: 2 }} />
            </div>
            <span style={{ ...sans, fontSize: 12, color: C.muted }}>0:42</span>
          </div>
        </div>

        {/* Actions */}
        <button
          onClick={() => nav('memory-prompt')}
          style={{
            width: '100%', padding: '15px',
            background: C.sage, border: 'none', borderRadius: 12,
            ...sans, fontSize: 15, fontWeight: 600, color: C.cream,
            cursor: 'pointer', marginBottom: 12,
            boxShadow: `0 4px 18px ${C.sage}44`,
          }}
        >
          Add another memory
        </button>
        <button
          onClick={() => nav('dashboard')}
          style={{
            width: '100%', padding: '14px',
            background: 'transparent', border: `1.5px solid ${C.border}`, borderRadius: 12,
            ...sans, fontSize: 15, fontWeight: 500, color: C.charcoal,
            cursor: 'pointer',
          }}
        >
          Back to vault
        </button>
      </div>
    </div>
  )
}

// ════════════════════════════════════════════════════════════════════════════════
// SCREEN 8 — Life Timeline
// ════════════════════════════════════════════════════════════════════════════════
const timelineEvents = [
  { year: '1948', title: 'Born in Jaipur', desc: 'Margaret Ruth Sharma is born to Priya and Rajan Sharma.', emoji: '🌸', type: 'milestone' },
  { year: '1955', title: 'The house on Bani Park Road', desc: 'Family moves to a home with a jasmine-covered veranda.', emoji: '🏡', type: 'audio', dur: '0:45' },
  { year: '1963', title: 'Won the regional singing prize', desc: '"I practised every morning before school."', emoji: '🎵', type: 'written' },
  { year: '1969', title: 'Wedding day', desc: 'Married Deepak Sharma on a monsoon afternoon in July.', emoji: '💍', type: 'photo' },
  { year: '1971', title: 'Arjun is born', desc: 'Our first child — he had his grandfather\'s eyes.', emoji: '👶', type: 'photo' },
  { year: '1984', title: 'The great Shimla trip', desc: 'All six cousins on a train, sharing a thermos of chai.', emoji: '🚂', type: 'audio', dur: '1:12' },
  { year: '2001', title: 'Dal makhani recipe recorded', desc: 'The recipe passed down from her mother, finally written.', emoji: '🍲', type: 'recipe' },
  { year: '2018', title: 'Great-grandmother', desc: 'Held baby Priya for the first time — "full circle."', emoji: '🌺', type: 'photo' },
]

function TimelineScreen({ nav }: { nav: (s: Screen) => void }) {
  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: C.ivory, paddingBottom: 72 }}>
      <StatusBar />
      <div style={{ padding: '8px 20px 16px', borderBottom: `1px solid ${C.border}` }}>
        <h1 style={{ ...serif, fontSize: 24, fontWeight: 600, color: C.charcoal, margin: '4px 0 2px' }}>Life Timeline</h1>
        <p style={{ ...sans, fontSize: 13, color: C.muted, margin: 0 }}>Margaret Sharma · 1948 – present</p>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 20px 0 20px' }} className="hide-scroll">
        <div style={{ position: 'relative', paddingLeft: 36 }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute', left: 12, top: 8, bottom: 0,
            width: 1.5, background: `linear-gradient(to bottom, ${C.sage}, ${C.sagePale}66)`,
          }} />

          {timelineEvents.map((ev, i) => (
            <div key={i} style={{ position: 'relative', marginBottom: 24 }}>
              {/* Dot */}
              <div style={{
                position: 'absolute', left: -28, top: 14,
                width: 16, height: 16, borderRadius: 8,
                background: ev.type === 'milestone' ? C.sage : C.cream,
                border: `2px solid ${C.sage}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 7,
              }}>
                {ev.type === 'milestone' && <span style={{ color: C.cream, fontSize: 8 }}>★</span>}
              </div>

              {/* Year */}
              <span style={{ ...sans, fontSize: 11, fontWeight: 600, color: C.sageMid, letterSpacing: '0.04em' }}>{ev.year}</span>

              <div style={{
                background: C.cream, border: `1px solid ${C.border}`,
                borderRadius: 14, padding: '14px 16px',
                marginTop: 6,
                boxShadow: '0 1px 8px rgba(0,0,0,0.04)',
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <span style={{ fontSize: 22, flexShrink: 0, marginTop: 1 }}>{ev.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ ...serif, fontSize: 16, fontWeight: 600, color: C.charcoal, margin: '0 0 4px' }}>{ev.title}</h3>
                    <p style={{ ...sans, fontSize: 13, color: C.muted, margin: 0, lineHeight: 1.5, fontStyle: ev.type === 'written' ? 'italic' : 'normal' }}>{ev.desc}</p>
                    {ev.dur && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 8 }}>
                        <button style={{ background: C.sage, border: 'none', borderRadius: 14, width: 26, height: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                          <PlayIcon size={10} color={C.cream} />
                        </button>
                        <span style={{ ...sans, fontSize: 11, color: C.sageMid }}>{ev.dur}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav current="timeline" nav={nav} />
    </div>
  )
}

// ════════════════════════════════════════════════════════════════════════════════
// SCREEN 9 — Life Book
// ════════════════════════════════════════════════════════════════════════════════
const lifeBookEntries = [
  {
    type: 'story', category: 'Childhood', title: 'The house on Bani Park Road',
    preview: 'The jasmine climbed all the way up to the first floor by the time I was ten. Mama used to say it was the house that breathed…',
    dur: '0:45', seed: 'house',
  },
  {
    type: 'recipe', category: 'Recipes', title: "Dal Makhani — Mama's way",
    preview: "Soak the lentils the night before. Never skip the overnight soak. This is the only rule Mama was strict about…",
    seed: 'recipe',
  },
  {
    type: 'photo', category: 'Family', title: 'Wedding, July 1969',
    preview: 'It rained on our wedding day. Deepak said it was a blessing. I said it was just the monsoon being dramatic.',
    seed: 'wedding',
  },
  {
    type: 'lesson', category: 'Life Lessons', title: 'What patience really means',
    preview: '"Patience is not waiting. Patience is keeping your heart open while you wait." — Margaret, Aug 2023',
    seed: 'garden',
  },
  {
    type: 'story', category: 'Places', title: 'The Shimla trip, 1984',
    preview: 'We were six cousins in one compartment with a thermos of chai and one deck of cards. We played until Shimla appeared in the window.',
    dur: '1:12', seed: 'travel',
  },
]

function LifeBookScreen({ nav }: { nav: (s: Screen) => void }) {
  const [activeTab, setActiveTab] = useState('All')
  const tabs = ['All', 'Stories', 'Photos', 'Recipes', 'Lessons']

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: C.ivory, paddingBottom: 72 }}>
      {/* Header */}
      <div style={{ background: C.sage, paddingBottom: 16 }}>
        <StatusBar dark />
        <div style={{ padding: '4px 20px 0' }}>
          <h1 style={{ ...serif, fontSize: 26, fontWeight: 600, color: C.cream, margin: '0 0 2px' }}>Life Book</h1>
          <p style={{ ...sans, fontSize: 13, color: `${C.cream}aa`, margin: 0 }}>Margaret's complete story</p>
        </div>
      </div>

      {/* Tab bar */}
      <div style={{ background: C.cream, borderBottom: `1px solid ${C.border}`, overflowX: 'auto', display: 'flex', padding: '0 16px' }} className="hide-scroll">
        {tabs.map(t => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            style={{
              background: 'none', border: 'none',
              padding: '12px 14px',
              ...sans, fontSize: 13, fontWeight: activeTab === t ? 600 : 400,
              color: activeTab === t ? C.sage : C.muted,
              cursor: 'pointer', whiteSpace: 'nowrap',
              borderBottom: activeTab === t ? `2px solid ${C.sage}` : '2px solid transparent',
            }}
          >
            {t}
          </button>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 0' }} className="hide-scroll">
        {lifeBookEntries.map((entry, i) => (
          <div key={i} style={{
            background: C.cream, border: `1px solid ${C.border}`,
            borderRadius: 16, marginBottom: 14,
            overflow: 'hidden',
            boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
          }}>
            {entry.type === 'photo' || entry.type === 'story' || entry.type === 'recipe' ? (
              <PhotoPlaceholder w={343} h={140} seed={entry.seed} alt={entry.title} />
            ) : null}
            <div style={{ padding: '14px 16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{
                  ...sans, fontSize: 10, fontWeight: 600, color: C.sageMid,
                  letterSpacing: '0.07em', textTransform: 'uppercase',
                }}>
                  {entry.type === 'recipe' ? '🫕' : entry.type === 'lesson' ? '✨' : entry.type === 'photo' ? '📷' : '🎙'} {entry.category}
                </span>
                {entry.dur && (
                  <span style={{ ...sans, fontSize: 11, color: C.muted }}>{entry.dur}</span>
                )}
              </div>
              <h3 style={{ ...serif, fontSize: 17, fontWeight: 600, color: C.charcoal, margin: '0 0 6px', lineHeight: 1.3 }}>
                {entry.title}
              </h3>
              <p style={{ ...sans, fontSize: 13, color: C.muted, margin: 0, lineHeight: 1.6, fontStyle: entry.type === 'lesson' ? 'italic' : 'normal' }}>
                {entry.preview}
              </p>
              {entry.dur && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10 }}>
                  <button style={{ background: C.sage, border: 'none', borderRadius: 16, width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <PlayIcon size={11} color={C.cream} />
                  </button>
                  <div style={{ flex: 1, height: 3, background: C.border, borderRadius: 2 }} />
                  <span style={{ ...sans, fontSize: 11, color: C.muted }}>{entry.dur}</span>
                </div>
              )}
            </div>
          </div>
        ))}
        <div style={{ height: 12 }} />
      </div>

      <BottomNav current="life-book" nav={nav} />
    </div>
  )
}

// ════════════════════════════════════════════════════════════════════════════════
// SCREEN 10 — Profile / Settings
// ════════════════════════════════════════════════════════════════════════════════
function ProfileScreen({ nav }: { nav: (s: Screen) => void }) {
  const [shareFamily, setShareFamily] = useState(true)
  const [notifications, setNotifications] = useState(true)
  const [autoBackup, setAutoBackup] = useState(false)

  const Toggle = ({ on, onToggle }: { on: boolean; onToggle: () => void }) => (
    <button
      onClick={onToggle}
      style={{
        width: 44, height: 24, borderRadius: 12, border: 'none', cursor: 'pointer',
        background: on ? C.sage : C.border,
        position: 'relative', transition: 'background 0.2s',
      }}
    >
      <div style={{
        position: 'absolute', top: 2, left: on ? 22 : 2,
        width: 20, height: 20, borderRadius: 10,
        background: 'white',
        transition: 'left 0.2s',
        boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
      }} />
    </button>
  )

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div style={{ marginBottom: 24 }}>
      <p style={{ ...sans, fontSize: 11, fontWeight: 600, color: C.muted, letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 8px 4px' }}>
        {title}
      </p>
      <div style={{ background: C.cream, border: `1px solid ${C.border}`, borderRadius: 16, overflow: 'hidden' }}>
        {children}
      </div>
    </div>
  )

  const Row = ({ label, value, icon, last = false, onPress }: { label: string; value?: string; icon?: string; last?: boolean; onPress?: () => void }) => (
    <button onClick={onPress} style={{
      display: 'flex', alignItems: 'center', padding: '14px 16px',
      borderBottom: last ? 'none' : `1px solid ${C.border}`,
      background: 'none', border: 'none', borderBottomWidth: last ? 0 : 1,
      borderBottomColor: C.border, borderBottomStyle: 'solid',
      width: '100%', cursor: 'pointer', gap: 12,
    }}>
      {icon && <span style={{ fontSize: 18 }}>{icon}</span>}
      <span style={{ ...sans, fontSize: 14, color: C.charcoal, flex: 1, textAlign: 'left' }}>{label}</span>
      {value && <span style={{ ...sans, fontSize: 13, color: C.muted }}>{value}</span>}
      <ChevronRight />
    </button>
  )

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: C.ivory, paddingBottom: 72 }}>
      <StatusBar />

      {/* Profile header */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '12px 20px 24px', borderBottom: `1px solid ${C.border}` }}>
        <Avatar size={80} />
        <h2 style={{ ...serif, fontSize: 22, fontWeight: 600, color: C.charcoal, margin: '14px 0 2px' }}>Margaret Sharma</h2>
        <p style={{ ...sans, fontSize: 13, color: C.muted, margin: '0 0 10px' }}>Born 14 March 1948 · Jaipur, India</p>
        <div style={{ display: 'flex', gap: 16 }}>
          {[{ n: '13', l: 'Memories' }, { n: '3', l: 'Categories' }, { n: '2', l: 'Family' }].map(s => (
            <div key={s.l} style={{ textAlign: 'center' }}>
              <div style={{ ...serif, fontSize: 18, fontWeight: 600, color: C.sage }}>{s.n}</div>
              <div style={{ ...sans, fontSize: 11, color: C.muted }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 20px 0' }} className="hide-scroll">

        <Section title="Privacy & Ownership">
          <div style={{ display: 'flex', alignItems: 'center', padding: '14px 16px', borderBottom: `1px solid ${C.border}` }}>
            <span style={{ fontSize: 18, marginRight: 12 }}>👨‍👩‍👧</span>
            <span style={{ ...sans, fontSize: 14, color: C.charcoal, flex: 1 }}>Share with family</span>
            <Toggle on={shareFamily} onToggle={() => setShareFamily(p => !p)} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', padding: '14px 16px', borderBottom: `1px solid ${C.border}` }}>
            <span style={{ fontSize: 18, marginRight: 12 }}>🔔</span>
            <span style={{ ...sans, fontSize: 14, color: C.charcoal, flex: 1 }}>Memory prompts</span>
            <Toggle on={notifications} onToggle={() => setNotifications(p => !p)} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', padding: '14px 16px' }}>
            <span style={{ fontSize: 18, marginRight: 12 }}>☁️</span>
            <span style={{ ...sans, fontSize: 14, color: C.charcoal, flex: 1 }}>Auto backup</span>
            <Toggle on={autoBackup} onToggle={() => setAutoBackup(p => !p)} />
          </div>
        </Section>

        <Section title="Vault">
          <Row label="Download Life Book" icon="📕" value="PDF" />
          <Row label="Export all memories" icon="📦" value="ZIP" />
          <Row label="Invite family member" icon="➕" last />
        </Section>

        <Section title="Account">
          <Row label="Subscription" icon="🌿" value="Family plan" />
          <Row label="Help & support" icon="💬" />
          <Row label="About Memory Vault" icon="ℹ️" last />
        </Section>

        <div style={{ padding: '8px 0 24px', textAlign: 'center' }}>
          <p style={{ ...sans, fontSize: 12, color: C.muted, margin: 0 }}>
            🔒 Your memories are end-to-end encrypted and belong to your family.
          </p>
          <p style={{ ...sans, fontSize: 11, color: C.border, margin: '6px 0 0' }}>Memory Vault · v2.1.0</p>
        </div>
      </div>

      <BottomNav current="profile" nav={nav} />
    </div>
  )
}

// ════════════════════════════════════════════════════════════════════════════════
// SCREEN NAV LABELS — clickable prototype switcher
// ════════════════════════════════════════════════════════════════════════════════
const screenLabels: { id: Screen; label: string }[] = [
  { id: 'welcome', label: '1 Welcome' },
  { id: 'choose-who', label: '2 Choose' },
  { id: 'create-profile', label: '3 Profile' },
  { id: 'dashboard', label: '4 Dashboard' },
  { id: 'memory-prompt', label: '5 Prompt' },
  { id: 'audio-recording', label: '6 Recording' },
  { id: 'memory-saved', label: '7 Saved' },
  { id: 'timeline', label: '8 Timeline' },
  { id: 'life-book', label: '9 Life Book' },
  { id: 'profile', label: '10 Settings' },
]

// ════════════════════════════════════════════════════════════════════════════════
// ROOT APP
// ════════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome')

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome': return <WelcomeScreen nav={setCurrentScreen} />
      case 'choose-who': return <ChooseWhoScreen nav={setCurrentScreen} />
      case 'create-profile': return <CreateProfileScreen nav={setCurrentScreen} />
      case 'dashboard': return <DashboardScreen nav={setCurrentScreen} />
      case 'memory-prompt': return <MemoryPromptScreen nav={setCurrentScreen} />
      case 'audio-recording': return <AudioRecordingScreen nav={setCurrentScreen} />
      case 'memory-saved': return <MemorySavedScreen nav={setCurrentScreen} />
      case 'timeline': return <TimelineScreen nav={setCurrentScreen} />
      case 'life-book': return <LifeBookScreen nav={setCurrentScreen} />
      case 'profile': return <ProfileScreen nav={setCurrentScreen} />
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#D8D2C8',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: '24px 0 40px',
      gap: 16,
    }}>
      {/* Screen switcher */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center',
        maxWidth: 440, padding: '0 12px',
      }}>
        {screenLabels.map(s => (
          <button
            key={s.id}
            onClick={() => setCurrentScreen(s.id)}
            style={{
              padding: '5px 10px',
              background: currentScreen === s.id ? C.sage : C.cream,
              color: currentScreen === s.id ? C.cream : C.muted,
              border: `1px solid ${currentScreen === s.id ? C.sage : C.border}`,
              borderRadius: 8,
              ...sans, fontSize: 11, fontWeight: currentScreen === s.id ? 600 : 400,
              cursor: 'pointer', whiteSpace: 'nowrap',
            }}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Phone frame */}
      <div style={{
        width: 390,
        height: 844,
        borderRadius: 44,
        overflow: 'hidden',
        boxShadow: '0 32px 80px rgba(0,0,0,0.28), 0 0 0 8px #1a1a1a, 0 0 0 10px #333',
        background: C.ivory,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        flexShrink: 0,
      }}>
        {/* Notch */}
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: 120, height: 28, background: '#1a1a1a',
          borderRadius: '0 0 18px 18px', zIndex: 100,
        }} />

        {renderScreen()}
      </div>
    </div>
  )
}
