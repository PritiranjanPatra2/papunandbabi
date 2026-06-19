import React from 'react'
import { useInView } from 'framer-motion'
import {
  SpinningMandala, Mandala, FourCorners, CornerOrnament, Divider,
  Diya, Lotus, Particles, Petals,
  IconHaldi, IconMehendi, IconSangeet, IconWedding, IconReception, IconMap,
} from './Ornaments'

const Reveal = ({ children, y = 40, delay = 0, duration = 0.9, as: As = 'div', ...rest }) => {
  const ref = React.useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <As ref={ref} {...rest}
      style={{
        ...(rest.style || {}),
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : `translateY(${y}px)`,
        transition: `opacity ${duration}s cubic-bezier(.2,.8,.2,1) ${delay}s, transform ${duration}s cubic-bezier(.2,.8,.2,1) ${delay}s`,
        willChange: 'opacity, transform',
      }}>
      {children}
    </As>
  )
}

export const SceneOpening = ({ data, onOpen }) => {
  const groomInitial = (data.groomName || 'A').charAt(0).toUpperCase()
  const brideInitial = (data.brideName || 'B').charAt(0).toUpperCase()
  return (
    <section className="scene grain" id="scene-1" data-screen-label="01 Opening">
      <div className="bg-radial" />
      <Particles count={40} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)', zIndex: 0, pointerEvents: 'none' }}>
        <SpinningMandala size={Math.min(900, window.innerWidth * 1.1)} opacity={0.18} duration={120} />
      </div>

      <div className="scene-inner" style={{ textAlign: 'center' }}>
        <Reveal y={20} delay={0.3} duration={1.4}>
          <div className="kicker">— Together with their families —</div>
        </Reveal>

        <Reveal y={30} delay={0.6} duration={1.2}>
          <div style={{ position: 'relative', margin: '36px auto 24px', width: 220, height: 220, color: 'var(--gold)' }}>
            <div style={{ position: 'absolute', inset: 0, animation: 'spin 60s linear infinite' }}>
              <Mandala size={220} opacity={0.55} />
            </div>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div className="f-script gold-grad" style={{ fontSize: 76, lineHeight: 1.3, letterSpacing: '0.02em', filter: 'drop-shadow(0 4px 20px color-mix(in oklab, var(--gold) 60%, transparent))', whiteSpace: 'nowrap' }}>
                {groomInitial}<span style={{ fontSize: 42, opacity: 0.9, margin: '0 6px' }}>&amp;</span>{brideInitial}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal y={30} delay={0.9} duration={1.2}>
          <div className="f-display" style={{ color: 'var(--ink-soft)', letterSpacing: '0.5em', fontSize: 13, marginTop: 4 }}>
            YOU ARE CORDIALLY INVITED
          </div>
        </Reveal>

        <Reveal y={40} delay={1.1} duration={1.4}>
          <h1 className="hero-name gold-grad" style={{ marginTop: 18, filter: 'drop-shadow(0 6px 30px color-mix(in oklab, var(--gold) 30%, transparent))' }}>
            {data.groomName} <span className="f-display" style={{ fontSize: '0.32em', verticalAlign: 'middle', opacity: 0.85, letterSpacing: '0.4em', margin: '0 0.4em' }}>WEDS</span> {data.brideName}
          </h1>
        </Reveal>

        <Reveal delay={1.4} duration={1.2}>
          <Divider width={Math.min(380, window.innerWidth - 80)} />
        </Reveal>

        <Reveal y={20} delay={1.55} duration={1}>
          <p className="f-serif" style={{ fontSize: 22, fontStyle: 'italic', color: 'var(--ink-soft)', margin: '18px 0 8px' }}>
            {data.weddingDateDisplay}
          </p>
          <p className="f-display" style={{ fontSize: 12, letterSpacing: '0.4em', color: 'var(--ink-soft)' }}>
            {data.venueCity}
          </p>
        </Reveal>

        <Reveal y={20} delay={1.85} duration={1}>
          <div style={{ marginTop: 44 }}>
            <button className="btn-gold" onClick={onOpen}>
              ✦ &nbsp; Open the Invitation &nbsp; ✦
            </button>
          </div>
          <div style={{ marginTop: 22, fontSize: 12, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', opacity: 0.6 }}>
            Scroll to begin ↓
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export const SceneBlessings = ({ data }) => (
  <section className="scene grain" id="scene-2" data-screen-label="02 Blessings">
    <div className="bg-radial" />
    <div style={{ position: 'absolute', top: '20%', left: '8%', opacity: 0.85 }}><Diya size={70} /></div>
    <div style={{ position: 'absolute', top: '25%', right: '10%', opacity: 0.85 }}><Diya size={70} /></div>
    <div style={{ position: 'absolute', bottom: '15%', left: '12%', opacity: 0.7 }}><Diya size={56} /></div>
    <div style={{ position: 'absolute', bottom: '18%', right: '14%', opacity: 0.7 }}><Diya size={56} /></div>

    <div className="scene-inner" style={{ textAlign: 'center' }}>
      <Reveal>
        <div style={{ color: 'var(--gold)', display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
          <Lotus size={64} />
        </div>
      </Reveal>
      <Reveal delay={0.15}>
        <div className="kicker">Blessings</div>
      </Reveal>
      <Reveal delay={0.3} y={30}>
        <div className="f-script gold-grad" style={{ fontSize: 'clamp(48px, 7vw, 84px)', lineHeight: 1.3, margin: '24px 0 8px' }}>
          ॐ Shubh Vivah
        </div>
      </Reveal>
      <Reveal delay={0.45}>
        <Divider width={300} />
      </Reveal>
      <Reveal delay={0.6} y={20}>
        <p className="f-serif" style={{ fontStyle: 'italic', fontSize: 'clamp(20px, 2.4vw, 30px)', maxWidth: 720, margin: '24px auto', lineHeight: 1.7, color: 'var(--ink)' }}>
          "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ<br />
          निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥"
        </p>
      </Reveal>
      <Reveal delay={0.75}>
        <p className="lead" style={{ marginTop: 24 }}>
          With the blessings of the Almighty and the love of our families,
          we joyfully invite you to share in the celebration as two souls
          unite in the sacred bond of marriage.
        </p>
      </Reveal>
    </div>
  </section>
)

export const SceneGroom = ({ data }) => (
  <section className="scene grain" id="scene-3" data-screen-label="03 Groom">
    <div className="bg-warm" />
    <div style={{ position: 'absolute', top: -40, right: -40, color: 'var(--gold)', opacity: 0.18 }}>
      <SpinningMandala size={420} opacity={0.4} duration={140} />
    </div>

    <div className="scene-inner">
      <div className="two-col">
        <Reveal y={50}>
          <div style={{ position: 'relative' }}>
            <div className="portrait" style={{ maxWidth: 380, margin: '0 auto', overflow: 'hidden' }}>
              <img src="/groom.jpg" alt={data.groomName}
                   style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
              <CornerOrnament pos="tl" size={64} />
              <CornerOrnament pos="tr" size={64} />
              <CornerOrnament pos="bl" size={64} />
              <CornerOrnament pos="br" size={64} />
            </div>
          </div>
        </Reveal>

        <Reveal y={40} delay={0.2}>
          <div>
            <div className="kicker">The Groom</div>
            <h2 className="f-script gold-grad" style={{ fontSize: 'clamp(60px, 8vw, 110px)', margin: '12px 0 0', lineHeight: 1.3, padding: '0.05em 0', letterSpacing: '-0.02em' }}>
              {data.groomName}
            </h2>
            <div className="f-display" style={{ marginTop: 12, fontSize: 13, letterSpacing: '0.35em', color: 'var(--gold)' }}>✦  ✦  ✦</div>
            <Divider width={220} />
            <p className="f-serif" style={{ fontSize: 19, color: 'var(--ink-soft)', fontStyle: 'italic' }}>{data.groomParents}</p>
            <p className="f-serif" style={{ fontSize: 18, marginTop: 18, lineHeight: 1.7 }}>
              A heart full of warmth, a spirit full of laughter — he steps into
              this new chapter carrying the love of his family and the dreams
              they have nurtured for him since childhood.
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
)

export const SceneBride = ({ data }) => (
  <section className="scene grain" id="scene-4" data-screen-label="04 Bride">
    <div className="bg-warm" />
    <Petals count={20} />
    <div style={{ position: 'absolute', top: -40, left: -40, color: 'var(--gold)' }}>
      <SpinningMandala size={420} opacity={0.18} duration={160} reverse />
    </div>

    <div className="scene-inner">
      <div className="two-col">
        <Reveal y={40}>
          <div style={{ order: 1 }}>
            <div className="kicker">The Bride</div>
            <h2 className="f-script gold-grad" style={{ fontSize: 'clamp(60px, 8vw, 110px)', margin: '12px 0 0', lineHeight: 1.3, padding: '0.05em 0', letterSpacing: '-0.02em' }}>
              {data.brideName}
            </h2>
            <div className="f-display" style={{ marginTop: 12, fontSize: 13, letterSpacing: '0.35em', color: 'var(--gold)' }}>✦  ✦  ✦</div>
            <Divider width={220} />
            <p className="f-serif" style={{ fontSize: 19, color: 'var(--ink-soft)', fontStyle: 'italic' }}>{data.brideParents}</p>
            <p className="f-serif" style={{ fontSize: 18, marginTop: 18, lineHeight: 1.7 }}>
              Graceful as the morning light, bright as the festival lamps —
              she carries with her the love of her parents and the quiet
              strength of every woman in her family who came before.
            </p>
          </div>
        </Reveal>

        <Reveal y={50} delay={0.2}>
          <div style={{ position: 'relative', order: 2 }}>
            <div className="portrait" style={{ maxWidth: 380, margin: '0 auto', overflow: 'hidden' }}>
              <img src="/bride.jpg" alt={data.brideName}
                   style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
              <CornerOrnament pos="tl" size={64} />
              <CornerOrnament pos="tr" size={64} />
              <CornerOrnament pos="bl" size={64} />
              <CornerOrnament pos="br" size={64} />
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
)



const trackMouse = (e) => {
  const rect = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width) * 100}%`)
  e.currentTarget.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height) * 100}%`)
}

export const SceneEvents = ({ data }) => {
  const events = [
    { Icon: IconWedding,   name: 'Wedding',   date: '1st July', time: '6:00 PM' },
    { Icon: IconReception, name: 'Reception', date: '5th July', time: '7:30 PM',  venue: 'Our Residence, Bhairpur, Balakati, Khordha' },
  ]
  return (
    <section className="scene grain" id="scene-6" data-screen-label="06 Events">
      <div className="bg-warm" />
      <div className="scene-inner">
        <Reveal>
          <div style={{ textAlign: 'center' }}>
            <div className="kicker">Wedding Festivities</div>
            <h2 className="section-title gold-grad" style={{ marginTop: 12 }}>Celebrate With Us</h2>
            <p className="lead" style={{ marginTop: 8 }}>
              Two beautiful celebrations. One unforgettable union of love, family, and tradition.
            </p>
            <Divider width={280} />
          </div>
        </Reveal>
 
         <div className="events-grid" style={{ marginTop: 32 }}>
           {events.map((e, i) => (
             <Reveal key={e.name} delay={i * 0.08} y={30}>
               <div className="event-card" onMouseMove={trackMouse}>
                 <e.Icon className="icon" />
                 <h3>{e.name}</h3>
                 <div className="date">{e.date}, 2026</div>
                 <div className="time">{e.time}</div>
                 {e.venue && <div className="venue">{e.venue}</div>}
               </div>
             </Reveal>
           ))}
         </div>
       </div>
     </section>
  )
}

export const SceneVenue = ({ data }) => (
  <section className="scene grain" id="scene-7" data-screen-label="07 Venue">
    <div className="bg-radial" />
    <div className="scene-inner">
      <Reveal>
        <div style={{ textAlign: 'center' }}>
          <div className="kicker">The Venue</div>
          <h2 className="section-title gold-grad" style={{ marginTop: 12 }}>{data.venue}</h2>
          <p className="f-serif" style={{ fontStyle: 'italic', color: 'var(--ink-soft)', fontSize: 19 }}>{data.venueCity}</p>
          <Divider width={280} />
        </div>
      </Reveal>

      <div className="two-col" style={{ marginTop: 24 }}>
        <Reveal y={40}>
          <div style={{
            position: 'relative', aspectRatio: '4/3', width: '100%',
            border: '1px solid color-mix(in oklab, var(--gold) 50%, transparent)',
            background: `
              radial-gradient(circle at 60% 40%, color-mix(in oklab, var(--gold) 18%, transparent), transparent 50%),
              repeating-linear-gradient(45deg, color-mix(in oklab, var(--gold) 5%, transparent) 0 1px, transparent 1px 14px),
              repeating-linear-gradient(-45deg, color-mix(in oklab, var(--gold) 5%, transparent) 0 1px, transparent 1px 14px),
              var(--bg-warm)`,
            overflow: 'hidden',
          }}>
            <img src="/residence.png" alt="Venue Residence"
                 style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
            <CornerOrnament pos="tl" size={48} />
              <CornerOrnament pos="tr" size={48} />
              <CornerOrnament pos="bl" size={48} />
              <CornerOrnament pos="br" size={48} />
          </div>
        </Reveal>

        <Reveal y={40} delay={0.15}>
          <div className="glass-card" style={{ position: 'relative' }}>
            <div className="gold-corners" />
            <div className="kicker">Address</div>
            <p className="f-serif" style={{ fontSize: 19, marginTop: 14, lineHeight: 1.6 }}>
              {data.venue}<br />
              {data.venueCity}
            </p>
            <div style={{ height: 1, background: 'color-mix(in oklab, var(--gold) 30%, transparent)', margin: '20px 0' }} />
            <div className="kicker">Venue Type</div>
            <p style={{ marginTop: 8, fontStyle: 'italic', color: 'var(--ink-soft)' }}>
              Our Residence
            </p>
            <div className="kicker">RSVP Contact</div>
            <p style={{ marginTop: 8, fontStyle: 'italic', color: 'var(--ink-soft)', lineHeight: 1.6 }}>
              Dibyaranjan (Groom): +91 70080 90860<br />
              Manorama (Sister): +91 99380 19020
            </p>
            <div style={{ marginTop: 22, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a className="btn-gold" href="https://maps.app.goo.gl/YDY57EhiXvNLiYVU8" target="_blank" rel="noreferrer">
                <IconMap style={{ width: 16, height: 16 }} /> Get Directions
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
)

export const SceneFamily = ({ data }) => {
  return (
    <section className="scene grain" id="scene-8" data-screen-label="08 Family">
      <div className="bg-warm" />
      <Petals count={12} />
      <div className="scene-inner">
        <Reveal>
          <div style={{ textAlign: 'center' }}>
            <div className="kicker">Our Families</div>
            <h2 className="section-title gold-grad" style={{ marginTop: 12 }}>Two Families, One Celebration</h2>
            <p className="lead">
              With hearts full of joy and homes filled with celebration, our families
              warmly welcome you to be part of this auspicious occasion.
            </p>
            <Divider width={280} />
          </div>
        </Reveal>

        <div className="two-col" style={{ marginTop: 48, gap: 32 }}>
          <Reveal y={30}>
            <div className="glass-card" style={{ textAlign: 'center', padding: '48px 24px', position: 'relative' }}>
              <div className="gold-corners" />
              <div className="f-script gold-grad" style={{ fontSize: 48, marginBottom: 12 }}>
                {data.groomName}'s
              </div>
              <Divider width={120} />
              <p className="f-serif" style={{ fontSize: 22, color: 'var(--ink-soft)', fontStyle: 'italic', marginTop: 18 }}>
                Family, Friends & Relatives
              </p>
            </div>
          </Reveal>

          <Reveal y={30} delay={0.15}>
            <div className="glass-card" style={{ textAlign: 'center', padding: '48px 24px', position: 'relative' }}>
              <div className="gold-corners" />
              <div className="f-script gold-grad" style={{ fontSize: 48, marginBottom: 12 }}>
                {data.brideName}'s
              </div>
              <Divider width={120} />
              <p className="f-serif" style={{ fontSize: 22, color: 'var(--ink-soft)', fontStyle: 'italic', marginTop: 18 }}>
                Family, Friends & Relatives
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}



const useCountdown = (target) => {
  const [now, setNow] = React.useState(() => new Date())
  React.useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])
  const diff = Math.max(0, new Date(target).getTime() - now.getTime())
  const days  = Math.floor(diff / 86400000)
  const hours = Math.floor((diff % 86400000) / 3600000)
  const mins  = Math.floor((diff % 3600000) / 60000)
  const secs  = Math.floor((diff % 60000) / 1000)
  return { days, hours, mins, secs }
}

export const SceneFinale = ({ data }) => {
  const cd = useCountdown(data.weddingDate)
  return (
    <section className="scene grain" id="scene-10" data-screen-label="10 Finale">
      <div className="bg-radial" />
      <Particles count={50} />

      <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice"
           style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}>
        {[
          { cx: 180, cy: 160, color: 'var(--gold-bright)', delay: '0s' },
          { cx: 620, cy: 220, color: 'var(--accent)',      delay: '1.2s' },
          { cx: 400, cy: 120, color: 'var(--gold)',        delay: '2.4s' },
          { cx: 700, cy: 480, color: 'var(--gold-bright)', delay: '3.6s' },
          { cx: 120, cy: 460, color: 'var(--accent)',      delay: '4.8s' },
        ].map((fw, i) => (
          <g key={i} transform={`translate(${fw.cx} ${fw.cy})`}>
            {Array.from({ length: 14 }).map((_, j) => {
              const a = (j * Math.PI * 2) / 14
              return (
                <line key={j} x1="0" y1="0"
                      x2={Math.cos(a) * 60} y2={Math.sin(a) * 60}
                      stroke={fw.color} strokeWidth="1.4" strokeLinecap="round" opacity="0">
                  <animate attributeName="opacity" values="0;1;0" dur="2s" begin={fw.delay} repeatCount="indefinite" />
                  <animate attributeName="x2" from={Math.cos(a) * 4} to={Math.cos(a) * 80} dur="2s" begin={fw.delay} repeatCount="indefinite" />
                  <animate attributeName="y2" from={Math.sin(a) * 4} to={Math.sin(a) * 80} dur="2s" begin={fw.delay} repeatCount="indefinite" />
                </line>
              )
            })}
          </g>
        ))}
      </svg>

      <div className="scene-inner" style={{ textAlign: 'center', position: 'relative', zIndex: 3 }}>
        <Reveal><div className="kicker">Save The Date</div></Reveal>
        <Reveal delay={0.15}>
          <h2 className="f-script gold-grad" style={{ fontSize: 'clamp(60px, 9vw, 120px)', lineHeight: 1.3, padding: '0.05em 0', margin: '18px 0 0' }}>
            See You at the Wedding
          </h2>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="f-serif" style={{ fontStyle: 'italic', fontSize: 22, color: 'var(--ink-soft)', margin: '12px 0' }}>
            {data.weddingDateDisplay} &nbsp;•&nbsp; {data.venue}, {data.venueCity}
          </p>
        </Reveal>
        <Reveal delay={0.4}><Divider width={280} /></Reveal>

        <Reveal delay={0.5} y={20}>
          <div className="countdown" style={{ marginTop: 24 }}>
            {[{ n: cd.days, l: 'Days' }, { n: cd.hours, l: 'Hours' }, { n: cd.mins, l: 'Minutes' }, { n: cd.secs, l: 'Seconds' }].map(c => (
              <div key={c.l} className="cd-cell">
                <div className="num">{String(c.n).padStart(2, '0')}</div>
                <div className="lbl">{c.l}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.7}>
          <p className="lead" style={{ marginTop: 36, fontSize: 22 }}>
            Until then, our hearts dance with anticipation — and our families
            await your warm presence to bless this new beginning.
          </p>
        </Reveal>

        <Reveal delay={0.85}>
          <div className="f-script gold-grad" style={{ fontSize: 'clamp(48px, 7vw, 84px)', marginTop: 32, lineHeight: 1.3 }}>
            With Love,<br />
            <span style={{ fontSize: '0.7em' }}>{data.groomName} &amp; {data.brideName}</span>
          </div>
        </Reveal>

        <Reveal delay={1.0}>
          <div style={{ marginTop: 36, color: 'var(--gold)', display: 'flex', justifyContent: 'center' }}>
            <Lotus size={56} />
          </div>
          <div className="f-display" style={{ fontSize: 11, letterSpacing: '0.4em', color: 'var(--ink-soft)', marginTop: 10 }}>
            ✦ THANK YOU ✦
          </div>
        </Reveal>
      </div>
    </section>
  )
}
