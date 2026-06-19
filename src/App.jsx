import React from 'react'
import { SpinningMandala, IconMusicOn, IconMusicOff } from './Ornaments'
import {
  SceneOpening, SceneBlessings, SceneGroom, SceneBride,
  SceneEvents, SceneVenue, SceneFamily, SceneFinale,
} from './Sections'
import {
  useTweaks, TweaksPanel, TweakSection, TweakSelect, TweakText,
} from './TweaksPanel'

const DEFAULTS = {
  groomName: 'Dibyaranjan',
  brideName: 'Babita',
  weddingDate: '2026-07-01T18:00:00',
  weddingDateDisplay: '1st July 2026',
  venue: 'Bhairpur , Balakati',
  venueCity: 'Khordha',
  groomParents: 'Son of Late Surendra Nayak & Mrs. Labanga Nayak',
  brideParents: 'Daughter of Sh. Ramachandra Swain & Smt. Sanjukta Swain',
  palette: 'maroon',
  musicOn: false,
}

const SECTIONS = [
  { id: 'scene-1',  label: 'Welcome'   },
  { id: 'scene-2',  label: 'Blessings' },
  { id: 'scene-3',  label: 'Groom'     },
  { id: 'scene-4',  label: 'Bride'     },
  { id: 'scene-6',  label: 'Events'    },
  { id: 'scene-7',  label: 'Venue'     },
  { id: 'scene-8',  label: 'Family'    },
  { id: 'scene-10', label: 'Finale'    },
]

const Loader = ({ done }) => (
  <div className={'loader ' + (done ? 'hidden' : '')}>
    <div style={{ color: 'var(--gold)' }}>
      <SpinningMandala size={140} opacity={0.8} duration={6} />
    </div>
    <div className="f-script gold-grad" style={{ fontSize: 56, lineHeight: 1.4 }}>Welcome</div>
    <div className="f-display" style={{ fontSize: 11, letterSpacing: '0.5em', color: 'var(--ink-soft)' }}>
      ✦ PREPARING YOUR INVITATION ✦
    </div>
  </div>
)

const ProgressBar = () => {
  const [p, setP] = React.useState(0)
  React.useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      setP(max > 0 ? h.scrollTop / max : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return <div className="progress-bar" style={{ transform: `scaleX(${p})` }} />
}

const NavDots = () => {
  const [active, setActive] = React.useState(0)
  React.useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const idx = SECTIONS.findIndex(s => s.id === e.target.id)
          if (idx >= 0) setActive(idx)
        }
      })
    }, { threshold: 0.4 })
    SECTIONS.forEach(s => {
      const el = document.getElementById(s.id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])
  return (
    <nav className="nav-dots" aria-label="Section navigation">
      {SECTIONS.map((s, i) => (
        <button key={s.id} className={'nav-dot' + (i === active ? ' active' : '')}
                data-label={s.label}
                onClick={() => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                aria-label={s.label} />
      ))}
    </nav>
  )
}

const MusicToggle = ({ on, onToggle }) => {
  const audioRef = React.useRef(null)

  React.useEffect(() => {
    if (!audioRef.current) return
    if (on) {
      audioRef.current.play().catch(() => {})
    } else {
      audioRef.current.pause()
    }
  }, [on])

  return (
    <>
      <audio ref={audioRef} src="/kudmayi.mp3" loop preload="none" />
      <button className={'music-toggle' + (on ? ' on' : '')} onClick={onToggle}
              aria-label={on ? 'Pause music' : 'Play music'} title={on ? 'Pause music' : 'Play music'}>
        {on ? <IconMusicOn style={{ width: 20, height: 20 }} /> : <IconMusicOff style={{ width: 20, height: 20 }} />}
      </button>
    </>
  )
}

const IconExpand = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" width={18} height={18}>
    <path d="M3 8 L3 3 L8 3" /><path d="M12 3 L17 3 L17 8" />
    <path d="M3 12 L3 17 L8 17" /><path d="M12 17 L17 17 L17 12" />
  </svg>
)

const IconCompress = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" width={18} height={18}>
    <path d="M8 3 L8 8 L3 8" /><path d="M17 8 L12 8 L12 3" />
    <path d="M8 17 L8 12 L3 12" /><path d="M12 17 L12 12 L17 12" />
  </svg>
)

const FullscreenToggle = () => {
  const [isFs, setIsFs] = React.useState(false)

  React.useEffect(() => {
    const onChange = () => setIsFs(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [])

  const toggle = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {})
    } else {
      document.exitFullscreen().catch(() => {})
    }
  }

  return (
    <button className="music-toggle" onClick={toggle} style={{ top: 20, left: 20, right: 'auto' }}
            aria-label={isFs ? 'Exit fullscreen' : 'Enter fullscreen'}
            title={isFs ? 'Exit fullscreen' : 'Enter fullscreen'}>
      {isFs ? <IconCompress /> : <IconExpand />}
    </button>
  )
}

const Cursor = () => {
  const dotRef = React.useRef(null)
  const ringRef = React.useRef(null)
  React.useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    let dx = 0, dy = 0, rx = 0, ry = 0
    const onMove = (e) => { dx = e.clientX; dy = e.clientY }
    window.addEventListener('mousemove', onMove)
    let raf
    const tick = () => {
      rx += (dx - rx) * 0.18
      ry += (dy - ry) * 0.18
      if (dotRef.current) dotRef.current.style.transform = `translate(${dx}px, ${dy}px) translate(-50%,-50%)`
      if (ringRef.current) ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => { window.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf) }
  }, [])
  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}

export default function App() {
  const [tweaks, setTweak] = useTweaks(DEFAULTS)
  const [loaded, setLoaded] = React.useState(false)
  const [musicOn, setMusicOn] = React.useState(false)

  React.useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 1400)
    return () => clearTimeout(t)
  }, [])

  React.useEffect(() => {
    document.documentElement.setAttribute('data-palette', tweaks.palette || 'maroon')
  }, [tweaks.palette])

  const data = React.useMemo(() => {
    let display = tweaks.weddingDateDisplay
    try {
      const d = new Date(tweaks.weddingDate)
      if (!isNaN(d.getTime())) {
        const fmt = d.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })
        if (!display || display === DEFAULTS.weddingDateDisplay) display = fmt
      }
    } catch {}
    return { ...tweaks, weddingDateDisplay: display }
  }, [tweaks])

  const openInvitation = () => {
    document.getElementById('scene-2')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <Loader done={loaded} />
      <ProgressBar />
      <NavDots />
      <FullscreenToggle />
      <MusicToggle on={musicOn} onToggle={() => setMusicOn(v => !v)} />
      <Cursor />

      <SceneOpening   data={data} onOpen={openInvitation} />
      <SceneBlessings data={data} />
      <SceneGroom     data={data} />
      <SceneBride     data={data} />
      <SceneEvents    data={data} />
      <SceneVenue     data={data} />
      <SceneFamily    data={data} />
      <SceneFinale    data={data} />

      <footer style={{
        textAlign: 'center', padding: '40px 24px',
        borderTop: '1px solid color-mix(in oklab, var(--gold) 20%, transparent)',
        background: 'var(--bg-deep)', color: 'var(--ink-soft)', fontSize: 13, letterSpacing: '0.2em',
      }}>
        <div className="f-display" style={{ color: 'var(--gold)', letterSpacing: '0.4em' }}>
          ✦ {data.groomName.toUpperCase()} &nbsp; &amp; &nbsp; {data.brideName.toUpperCase()} ✦
        </div>
        <div style={{ marginTop: 10, fontStyle: 'italic' }}>{data.weddingDateDisplay}</div>
      </footer>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Color Theme">
          <TweakSelect label="Palette" value={tweaks.palette}
                       onChange={v => setTweak('palette', v)}
                       options={[
                         { value: 'maroon',  label: 'Royal Maroon' },
                         { value: 'emerald', label: 'Deep Emerald' },
                         { value: 'navy',    label: 'Midnight Navy' },
                         { value: 'blush',   label: 'Blush & Rose Gold' },
                         { value: 'ivory',   label: 'Ivory & Saffron' },
                       ]} />
        </TweakSection>

        <TweakSection label="Couple">
          <TweakText label="Groom's name" value={tweaks.groomName} onChange={v => setTweak('groomName', v)} />
          <TweakText label="Bride's name"  value={tweaks.brideName}  onChange={v => setTweak('brideName', v)} />
        </TweakSection>

        <TweakSection label="Date & Venue">
          <TweakText label="Display date"  value={tweaks.weddingDateDisplay} onChange={v => setTweak('weddingDateDisplay', v)} />
          <TweakText label="Countdown ISO" value={tweaks.weddingDate}        onChange={v => setTweak('weddingDate', v)} />
          <TweakText label="Venue"         value={tweaks.venue}              onChange={v => setTweak('venue', v)} />
          <TweakText label="City"          value={tweaks.venueCity}          onChange={v => setTweak('venueCity', v)} />
        </TweakSection>

        <TweakSection label="Family">
          <TweakText label="Groom's parents" value={tweaks.groomParents} onChange={v => setTweak('groomParents', v)} />
          <TweakText label="Bride's parents" value={tweaks.brideParents} onChange={v => setTweak('brideParents', v)} />
        </TweakSection>
      </TweaksPanel>
    </>
  )
}
