import React from 'react'

export const Mandala = ({ size = 240, opacity = 0.5, ...rest }) => (
  <svg viewBox="0 0 200 200" width={size} height={size} fill="none" stroke="currentColor"
       strokeWidth="0.7" style={{ opacity }} {...rest}>
    <g>
      <circle cx="100" cy="100" r="20" />
      <circle cx="100" cy="100" r="35" />
      <circle cx="100" cy="100" r="55" strokeDasharray="2 3" />
      <circle cx="100" cy="100" r="75" />
      <circle cx="100" cy="100" r="92" strokeDasharray="1 2" />
      {Array.from({ length: 16 }).map((_, i) => {
        const a = (i * Math.PI * 2) / 16;
        const x1 = 100 + Math.cos(a) * 35;
        const y1 = 100 + Math.sin(a) * 35;
        const x2 = 100 + Math.cos(a) * 75;
        const y2 = 100 + Math.sin(a) * 75;
        return <line key={`l${i}`} x1={x1} y1={y1} x2={x2} y2={y2} />;
      })}
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i * Math.PI * 2) / 8;
        const cx = 100 + Math.cos(a) * 55;
        const cy = 100 + Math.sin(a) * 55;
        return (
          <g key={`p${i}`} transform={`translate(${cx} ${cy}) rotate(${(a * 180) / Math.PI})`}>
            <ellipse cx="0" cy="0" rx="10" ry="4" />
            <circle cx="0" cy="0" r="2" fill="currentColor" />
          </g>
        );
      })}
      {Array.from({ length: 24 }).map((_, i) => {
        const a = (i * Math.PI * 2) / 24;
        const x = 100 + Math.cos(a) * 92;
        const y = 100 + Math.sin(a) * 92;
        return <circle key={`d${i}`} cx={x} cy={y} r="1.5" fill="currentColor" />;
      })}
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i * Math.PI * 2) / 12;
        const cx = 100 + Math.cos(a) * 75;
        const cy = 100 + Math.sin(a) * 75;
        return (
          <g key={`f${i}`} transform={`translate(${cx} ${cy}) rotate(${(a * 180) / Math.PI + 90})`}>
            <path d="M 0 -8 Q 4 -4 0 0 Q -4 -4 0 -8 Z" fill="currentColor" fillOpacity="0.3" />
          </g>
        );
      })}
    </g>
  </svg>
)

export const SpinningMandala = ({ size, opacity, duration = 80, reverse = false, style, ...rest }) => (
  <div style={{
    animation: `${reverse ? 'spinR' : 'spin'} ${duration}s linear infinite`,
    display: 'inline-block',
    lineHeight: 0,
    ...style,
  }} {...rest}>
    <Mandala size={size} opacity={opacity} />
  </div>
)

if (typeof document !== 'undefined' && !document.getElementById('orn-kf')) {
  const s = document.createElement('style')
  s.id = 'orn-kf'
  s.textContent = `
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes spinR { to { transform: rotate(-360deg); } }
    @keyframes glow { 0%,100% { filter: drop-shadow(0 0 8px var(--gold)); } 50% { filter: drop-shadow(0 0 18px var(--gold-bright)); } }
    @keyframes flicker {
      0%, 100% { transform: scaleY(1) scaleX(1); opacity: 1; }
      25%      { transform: scaleY(1.06) scaleX(0.96); opacity: 0.95; }
      50%      { transform: scaleY(0.98) scaleX(1.02); opacity: 1; }
      75%      { transform: scaleY(1.04) scaleX(0.98); opacity: 0.97; }
    }
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    @keyframes pulseGlow {
      0%, 100% { box-shadow: 0 0 0 0 color-mix(in oklab, var(--gold) 40%, transparent); }
      50%      { box-shadow: 0 0 0 12px color-mix(in oklab, var(--gold) 0%, transparent); }
    }
  `
  document.head.appendChild(s)
}

export const Filigree = ({ size = 120, ...rest }) => (
  <svg viewBox="0 0 120 120" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="0.8" {...rest}>
    <path d="M5 5 L40 5" />
    <path d="M5 5 L5 40" />
    <path d="M5 5 Q 22 22, 38 8 Q 50 0, 56 14" />
    <path d="M5 5 Q 22 22, 8 38 Q 0 50, 14 56" />
    <circle cx="38" cy="8" r="2" fill="currentColor" />
    <circle cx="8" cy="38" r="2" fill="currentColor" />
    <path d="M22 22 q 6 -10 18 -2" />
    <path d="M22 22 q -10 6 -2 18" />
    <path d="M30 18 q 8 4 12 12" />
    <circle cx="22" cy="22" r="3" fill="none" />
    <circle cx="22" cy="22" r="1.2" fill="currentColor" />
  </svg>
)

export const FourCorners = ({ size = 100, color = 'var(--gold)', inset = 0 }) => (
  <>
    <div style={{ position: 'absolute', top: inset, left: inset, color, pointerEvents: 'none' }}>
      <Filigree size={size} />
    </div>
    <div style={{ position: 'absolute', top: inset, right: inset, color, transform: 'scaleX(-1)', pointerEvents: 'none' }}>
      <Filigree size={size} />
    </div>
    <div style={{ position: 'absolute', bottom: inset, left: inset, color, transform: 'scaleY(-1)', pointerEvents: 'none' }}>
      <Filigree size={size} />
    </div>
    <div style={{ position: 'absolute', bottom: inset, right: inset, color, transform: 'scale(-1,-1)', pointerEvents: 'none' }}>
      <Filigree size={size} />
    </div>
  </>
)

export const Divider = ({ width = 320 }) => (
  <svg viewBox="0 0 320 40" width={width} height="40" fill="none" stroke="currentColor" strokeWidth="0.8"
       style={{ display: 'block', margin: '0 auto', color: 'var(--gold)' }}>
    <line x1="0" y1="20" x2="120" y2="20" />
    <line x1="200" y1="20" x2="320" y2="20" />
    <g transform="translate(160 20)">
      <path d="M-20 0 Q -14 -10, -4 -8 Q 4 -6, 0 0 Q -4 6, -14 4 Q -22 2, -20 0 Z" fill="currentColor" fillOpacity="0.12" />
      <path d="M20 0 Q 14 10, 4 8 Q -4 6, 0 0 Q 4 -6, 14 -4 Q 22 -2, 20 0 Z" fill="currentColor" fillOpacity="0.12" />
      <circle cx="0" cy="0" r="3" fill="currentColor" />
      <circle cx="0" cy="0" r="6" />
    </g>
    <circle cx="120" cy="20" r="2" fill="currentColor" />
    <circle cx="200" cy="20" r="2" fill="currentColor" />
  </svg>
)

export const Diya = ({ size = 80 }) => (
  <svg viewBox="0 0 80 100" width={size} height={size * 100 / 80} fill="none">
    <g style={{ transformOrigin: '40px 30px', animation: 'flicker 1.6s ease-in-out infinite' }}>
      <ellipse cx="40" cy="22" rx="6" ry="14" fill="url(#flameG)" />
      <ellipse cx="40" cy="24" rx="3" ry="9" fill="#fff8e0" opacity="0.9" />
      <ellipse cx="40" cy="28" rx="1.5" ry="4" fill="#ffeec0" />
    </g>
    <line x1="40" y1="40" x2="40" y2="46" stroke="#3a1a0a" strokeWidth="2" />
    <path d="M10 60 Q 10 70, 18 76 L 62 76 Q 70 70, 70 60 Q 70 50, 60 48 L 20 48 Q 10 50, 10 60 Z"
          fill="url(#diyaG)" stroke="var(--gold)" strokeWidth="1" />
    <ellipse cx="40" cy="48" rx="22" ry="3" fill="#1a0606" />
    <ellipse cx="40" cy="80" rx="36" ry="3" fill="var(--gold)" opacity="0.3" />
    <defs>
      <radialGradient id="flameG" cx="50%" cy="60%">
        <stop offset="0%" stopColor="#fffae0" />
        <stop offset="40%" stopColor="#ffd66e" />
        <stop offset="100%" stopColor="#ff7a1a" stopOpacity="0.7" />
      </radialGradient>
      <linearGradient id="diyaG" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#8a3520" />
        <stop offset="100%" stopColor="#4a1a08" />
      </linearGradient>
    </defs>
  </svg>
)

export const Lotus = ({ size = 60, opacity = 0.8 }) => (
  <svg viewBox="0 0 80 80" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="0.8" style={{ opacity }}>
    <g transform="translate(40 40)">
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <g key={deg} transform={`rotate(${deg})`}>
          <path d="M 0 0 Q -8 -16, 0 -32 Q 8 -16, 0 0" fill="currentColor" fillOpacity="0.2" />
        </g>
      ))}
      {[30, 90, 150, 210, 270, 330].map((deg) => (
        <g key={deg} transform={`rotate(${deg})`}>
          <path d="M 0 0 Q -6 -12, 0 -24 Q 6 -12, 0 0" fill="currentColor" fillOpacity="0.4" />
        </g>
      ))}
      <circle r="4" fill="currentColor" />
    </g>
  </svg>
)

export const Peacock = ({ size = 80, opacity = 0.7 }) => (
  <svg viewBox="0 0 60 120" width={size} height={size * 2} fill="none" style={{ opacity }}>
    <line x1="30" y1="120" x2="30" y2="40" stroke="var(--gold)" strokeWidth="0.8" />
    <ellipse cx="30" cy="32" rx="18" ry="28" fill="url(#pf1)" stroke="var(--gold)" strokeWidth="0.6" />
    <ellipse cx="30" cy="32" rx="11" ry="18" fill="url(#pf2)" />
    <ellipse cx="30" cy="32" rx="6" ry="10" fill="url(#pf3)" />
    <circle cx="30" cy="32" r="3" fill="var(--accent-deep)" />
    <defs>
      <radialGradient id="pf1"><stop offset="0%" stopColor="var(--gold-bright)" stopOpacity="0.6"/><stop offset="100%" stopColor="var(--accent-deep)" stopOpacity="0.4"/></radialGradient>
      <radialGradient id="pf2"><stop offset="0%" stopColor="var(--gold)" /><stop offset="100%" stopColor="var(--accent)" stopOpacity="0.6"/></radialGradient>
      <radialGradient id="pf3"><stop offset="0%" stopColor="var(--gold-bright)" /><stop offset="100%" stopColor="var(--accent-deep)"/></radialGradient>
    </defs>
  </svg>
)

export const IconHaldi = (props) => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.2" {...props}>
    <path d="M16 40 Q 32 30, 48 40 L 48 50 Q 32 56, 16 50 Z" fill="currentColor" fillOpacity="0.18"/>
    <ellipse cx="32" cy="40" rx="16" ry="3" />
    <path d="M22 40 Q 22 26, 32 22 Q 42 26, 42 40" />
    <circle cx="32" cy="18" r="3" fill="currentColor" fillOpacity="0.5"/>
    <path d="M28 22 Q 32 16, 36 22" />
  </svg>
)

export const IconMehendi = (props) => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" {...props}>
    <path d="M32 50 Q 24 40, 24 30 Q 24 22, 32 18 Q 40 22, 40 30 Q 40 40, 32 50 Z" />
    <path d="M32 22 Q 30 30, 32 40" />
    <circle cx="28" cy="28" r="1.5" fill="currentColor"/>
    <circle cx="36" cy="28" r="1.5" fill="currentColor"/>
    <path d="M26 36 Q 32 38, 38 36" />
    <path d="M22 30 q -4 -2 -6 0" />
    <path d="M42 30 q 4 -2 6 0" />
  </svg>
)

export const IconSangeet = (props) => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.2" {...props}>
    <ellipse cx="22" cy="40" rx="8" ry="6" />
    <ellipse cx="42" cy="36" rx="8" ry="6" />
    <line x1="30" y1="38" x2="50" y2="32" />
    <path d="M30 38 L 30 18 Q 40 18, 50 16 L 50 32" />
    <circle cx="22" cy="40" r="2" fill="currentColor"/>
    <circle cx="42" cy="36" r="2" fill="currentColor"/>
  </svg>
)

export const IconWedding = (props) => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.2" {...props}>
    <circle cx="24" cy="36" r="10" />
    <circle cx="40" cy="36" r="10" />
    <path d="M24 26 L 24 18" /><path d="M40 26 L 40 18" />
    <circle cx="24" cy="16" r="2" fill="currentColor"/>
    <circle cx="40" cy="16" r="2" fill="currentColor"/>
  </svg>
)

export const IconReception = (props) => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.2" {...props}>
    <path d="M22 32 L 22 46 Q 22 50, 26 50 L 38 50 Q 42 50, 42 46 L 42 32" />
    <path d="M18 32 L 46 32 Q 46 26, 32 26 Q 18 26, 18 32 Z" fill="currentColor" fillOpacity="0.15" />
    <path d="M28 26 L 28 18 L 36 18 L 36 26" />
    <circle cx="32" cy="14" r="2" fill="currentColor"/>
    <path d="M22 50 L 22 54" /><path d="M42 50 L 42 54" />
  </svg>
)

export const IconMap = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path d="M12 22 C 7 16, 4 12, 4 9 a 8 8 0 0 1 16 0 c 0 3 -3 7 -8 13 Z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
)

export const IconMusicOn = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" {...props}>
    <path d="M9 18 V 6 l 10 -2 v 12" />
    <circle cx="7" cy="18" r="2.5" /><circle cx="17" cy="16" r="2.5" />
  </svg>
)

export const IconMusicOff = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" {...props}>
    <path d="M9 18 V 6 l 10 -2 v 12" />
    <circle cx="7" cy="18" r="2.5" /><circle cx="17" cy="16" r="2.5" />
    <line x1="3" y1="3" x2="21" y2="21" stroke="var(--accent)" strokeWidth="2"/>
  </svg>
)

export const CornerOrnament = ({ pos = 'tl', size = 80 }) => {
  const t = pos.includes('t')
  const l = pos.includes('l')
  return (
    <svg width={size} height={size} viewBox="0 0 80 80"
         style={{
           position: 'absolute',
           [t ? 'top' : 'bottom']: 12,
           [l ? 'left' : 'right']: 12,
           transform: `scaleX(${l ? 1 : -1}) scaleY(${t ? 1 : -1})`,
           opacity: 0.75,
           pointerEvents: 'none',
         }}>
      <g fill="none" stroke="var(--gold)" strokeWidth=".7">
        <path d="M2 2 L2 40 M2 2 L40 2" />
        <path d="M2 14 Q14 14 14 2" />
        <circle cx="14" cy="14" r="1.5" fill="var(--gold)" />
        <path d="M2 26 Q26 26 26 2 M8 8 Q20 8 20 20" opacity=".6" />
        <circle cx="2" cy="2" r="2.5" />
      </g>
    </svg>
  )
}

export const GoldDivider = ({ label }) => (
  <div className="ornament-divider" style={{ margin: '24px 0' }}>
    <span style={{ fontSize: 18, color: 'var(--gold)' }}>❖</span>
    {label && (
      <span className="f-display" style={{ fontSize: 11, letterSpacing: '.4em', color: 'var(--gold-deep)' }}>
        {label}
      </span>
    )}
    <span style={{ fontSize: 18, color: 'var(--gold)' }}>❖</span>
  </div>
)

export const Particles = ({ count = 30 }) => {
  const particles = React.useMemo(() => Array.from({ length: count }).map((_, i) => ({
    left: Math.random() * 100,
    delay: Math.random() * 12,
    duration: 8 + Math.random() * 12,
    size: 2 + Math.random() * 4,
  })), [count])
  return (
    <div className="particles">
      {particles.map((p, i) => (
        <div key={i} className="particle"
             style={{
               left: `${p.left}%`,
               animationDelay: `${p.delay}s`,
               animationDuration: `${p.duration}s`,
               width: `${p.size}px`,
               height: `${p.size}px`,
             }} />
      ))}
    </div>
  )
}

export const Petals = ({ count = 14 }) => {
  const petals = React.useMemo(() => Array.from({ length: count }).map((_, i) => ({
    left: Math.random() * 100,
    delay: Math.random() * 18,
    duration: 14 + Math.random() * 10,
    rot: Math.random() * 360,
    scale: 0.6 + Math.random() * 0.8,
  })), [count])
  return (
    <div className="petals">
      {petals.map((p, i) => (
        <div key={i} className="petal"
             style={{
               left: `${p.left}%`,
               animationDelay: `${p.delay}s`,
               animationDuration: `${p.duration}s`,
               transform: `rotate(${p.rot}deg) scale(${p.scale})`,
             }} />
      ))}
    </div>
  )
}
