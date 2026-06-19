/* global React, framerMotion */
const { motion, useScroll, useTransform, AnimatePresence, useInView } = window.framerMotion || window.Motion || {};

// Fallback for framer-motion global
const FM = window.framerMotion || window.Motion || window.FramerMotion || {};
const M = FM.motion || {};
const useScrollFM = FM.useScroll || (() => ({ scrollYProgress: { get: () => 0, on: () => () => {} } }));
const useTransformFM = FM.useTransform || ((v, a, b) => v);
const useInViewFM = FM.useInView || (() => true);

// ============================================================
// Reveal helper — fade + slide on scroll into view
// ============================================================
const Reveal = ({ children, y = 40, delay = 0, duration = 0.9, as: As = 'div', ...rest }) => {
  const ref = React.useRef(null);
  const inView = useInViewFM(ref, { once: true, margin: '-80px' });
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
  );
};

// ============================================================
// 1. OPENING INVITATION
// ============================================================
const SceneOpening = ({ data, onOpen }) => {
  const groomInitial = (data.groomName || 'A').charAt(0).toUpperCase();
  const brideInitial = (data.brideName || 'M').charAt(0).toUpperCase();
  return (
    <section className="scene grain" id="scene-1" data-screen-label="01 Opening">
      <div className="bg-radial" />
      <Particles count={40} />
      {/* Mandala backdrop */}
      <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', color:'var(--gold)', zIndex:0, pointerEvents:'none' }}>
        <SpinningMandala size={Math.min(900, window.innerWidth * 1.1)} opacity={0.18} duration={120} />
      </div>

      <div className="scene-inner" style={{ textAlign:'center' }}>
        <Reveal y={20} delay={0.3} duration={1.4}>
          <div className="kicker">— Together with their families —</div>
        </Reveal>

        {/* Monogram */}
        <Reveal y={30} delay={0.6} duration={1.2}>
          <div style={{ position:'relative', margin: '36px auto 24px', width: 220, height: 220, color:'var(--gold)' }}>
            <div style={{ position:'absolute', inset:0, animation:'spin 60s linear infinite' }}>
              <Mandala size={220} opacity={0.55} />
            </div>
            <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
              <div className="f-script gold-grad" style={{ fontSize: 96, lineHeight: 1, letterSpacing: '-0.04em',
                   filter: 'drop-shadow(0 4px 20px color-mix(in oklab, var(--gold) 60%, transparent))' }}>
                {groomInitial}<span style={{ fontSize: 56, opacity: 0.9, margin: '0 4px' }}>&amp;</span>{brideInitial}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal y={30} delay={0.9} duration={1.2}>
          <div className="f-display" style={{ color:'var(--ink-soft)', letterSpacing:'0.5em', fontSize: 13, marginTop: 4 }}>
            YOU ARE CORDIALLY INVITED
          </div>
        </Reveal>

        <Reveal y={40} delay={1.1} duration={1.4}>
          <h1 className="hero-name gold-grad" style={{ marginTop: 18,
              filter: 'drop-shadow(0 6px 30px color-mix(in oklab, var(--gold) 30%, transparent))' }}>
            {data.groomName} <span className="f-display" style={{ fontSize: '0.32em', verticalAlign:'middle', opacity:0.85, letterSpacing:'0.4em', margin:'0 0.4em' }}>WEDS</span> {data.brideName}
          </h1>
        </Reveal>

        <Reveal delay={1.4} duration={1.2}>
          <Divider width={Math.min(380, window.innerWidth - 80)} />
        </Reveal>
        

        <Reveal y={20} delay={1.55} duration={1}>
          <p className="f-serif" style={{ fontSize: 22, fontStyle:'italic', color:'var(--ink-soft)', margin:'18px 0 8px' }}>
            {data.weddingDateDisplay}
          </p>
          <p className="f-display" style={{ fontSize: 12, letterSpacing:'0.4em', color:'var(--ink-soft)' }}>
            {data.venueCity}
          </p>
        </Reveal>

        <Reveal y={20} delay={1.85} duration={1}>
          <div style={{ marginTop: 44 }}>
            <button className="btn-gold" onClick={onOpen}>
              ✦ &nbsp; Open the Invitation &nbsp; ✦
            </button>
          </div>
          <div style={{ marginTop: 22, fontSize: 12, letterSpacing:'0.3em', textTransform:'uppercase', color:'var(--gold)', opacity: 0.6 }}>
            Scroll to begin ↓
          </div>
        </Reveal>
      </div>
    </section>
  );
};

// ============================================================
// 2. BLESSINGS
// ============================================================
const SceneBlessings = ({ data }) => (
  <section className="scene grain" id="scene-2" data-screen-label="02 Blessings">
    <div className="bg-radial" />
    {/* Floating diyas */}
    <div style={{ position:'absolute', top: '20%', left: '8%', opacity: 0.85 }}>
      <Diya size={70} />
    </div>
    <div style={{ position:'absolute', top: '25%', right: '10%', opacity: 0.85 }}>
      <Diya size={70} />
    </div>
    <div style={{ position:'absolute', bottom: '15%', left: '12%', opacity: 0.7 }}>
      <Diya size={56} />
    </div>
    <div style={{ position:'absolute', bottom: '18%', right: '14%', opacity: 0.7 }}>
      <Diya size={56} />
    </div>

    <div className="scene-inner" style={{ textAlign:'center' }}>
      <Reveal>
        <div style={{ color: 'var(--gold)', display:'flex', justifyContent:'center', marginBottom: 8 }}>
          <Lotus size={64} />
        </div>
      </Reveal>
      <Reveal delay={0.15}>
        <div className="kicker">Blessings</div>
      </Reveal>
      <Reveal delay={0.3} y={30}>
        <div className="f-script gold-grad" style={{ fontSize: 'clamp(48px, 7vw, 84px)', lineHeight: 1.1, margin:'24px 0 8px' }}>
          ॐ Shubh Vivah
        </div>
      </Reveal>
      <Reveal delay={0.45}>
        <Divider width={300} />
      </Reveal>
      <Reveal delay={0.6} y={20}>
        <p className="f-serif" style={{
          fontStyle:'italic', fontSize: 'clamp(20px, 2.4vw, 30px)',
          maxWidth: 720, margin: '24px auto', lineHeight: 1.7, color:'var(--ink)',
        }}>
          “वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ<br />
          निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा॥”
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
);

// ============================================================
// 3. GROOM
// ============================================================
const SceneGroom = ({ data }) => (
  <section className="scene grain" id="scene-3" data-screen-label="03 Groom">
    <div className="bg-warm" />
    <div style={{ position:'absolute', top: -40, right: -40, color:'var(--gold)', opacity: 0.18 }}>
      <SpinningMandala size={420} opacity={0.4} duration={140} />
    </div>

    <div className="scene-inner">
      <div className="two-col">
        <Reveal y={50}>
          <div style={{ position:'relative' }}>
            <div className="portrait" style={{ maxWidth: 380, margin: '0 auto' }}>
              {/* Stylized typographic portrait */}
              <div style={{
                position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center',
                color:'var(--gold)', flexDirection:'column', gap: 12,
              }}>
                <div className="f-script gold-grad" style={{ fontSize: 180, lineHeight:0.9 }}>
                  {(data.groomName || 'A').charAt(0)}
                </div>
                <div className="f-display" style={{ fontSize: 11, letterSpacing:'0.4em', color:'var(--ink-soft)' }}>
                  THE GROOM
                </div>
              </div>
              <FourCorners size={70} inset={-2} />
            </div>
          </div>
        </Reveal>

        <Reveal y={40} delay={0.2}>
          <div>
            <div className="kicker">The Groom</div>
            <h2 className="f-script gold-grad" style={{
              fontSize: 'clamp(60px, 8vw, 110px)', margin:'12px 0 0', lineHeight:1, letterSpacing:'-0.02em',
            }}>
              {data.groomName}
            </h2>
            <div className="f-display" style={{ marginTop: 12, fontSize: 13, letterSpacing:'0.35em', color:'var(--gold)' }}>
              ✦  ✦  ✦
            </div>
            <Divider width={220} />
            <p className="f-serif" style={{ fontSize: 19, color:'var(--ink-soft)', fontStyle:'italic' }}>
              {data.groomParents}
            </p>
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
);

// ============================================================
// 4. BRIDE
// ============================================================
const SceneBride = ({ data }) => (
  <section className="scene grain" id="scene-4" data-screen-label="04 Bride">
    <div className="bg-warm" />
    <Petals count={20} />
    <div style={{ position:'absolute', top: -40, left: -40, color:'var(--gold)' }}>
      <SpinningMandala size={420} opacity={0.18} duration={160} reverse />
    </div>

    <div className="scene-inner">
      <div className="two-col">
        <Reveal y={40}>
          <div style={{ order: 1 }}>
            <div className="kicker">The Bride</div>
            <h2 className="f-script gold-grad" style={{
              fontSize: 'clamp(60px, 8vw, 110px)', margin:'12px 0 0', lineHeight:1, letterSpacing:'-0.02em',
            }}>
              {data.brideName}
            </h2>
            <div className="f-display" style={{ marginTop: 12, fontSize: 13, letterSpacing:'0.35em', color:'var(--gold)' }}>
              ✦  ✦  ✦
            </div>
            <Divider width={220} />
            <p className="f-serif" style={{ fontSize: 19, color:'var(--ink-soft)', fontStyle:'italic' }}>
              {data.brideParents}
            </p>
            <p className="f-serif" style={{ fontSize: 18, marginTop: 18, lineHeight: 1.7 }}>
              Graceful as the morning light, bright as the festival lamps —
              she carries with her the love of her parents and the quiet
              strength of every woman in her family who came before.
            </p>
          </div>
        </Reveal>

        <Reveal y={50} delay={0.2}>
          <div style={{ position:'relative', order: 2 }}>
            <div className="portrait" style={{ maxWidth: 380, margin: '0 auto' }}>
              <div style={{
                position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center',
                color:'var(--gold)', flexDirection:'column', gap: 12,
              }}>
                <div className="f-script gold-grad" style={{ fontSize: 180, lineHeight:0.9 }}>
                  {(data.brideName || 'M').charAt(0)}
                </div>
                <div className="f-display" style={{ fontSize: 11, letterSpacing:'0.4em', color:'var(--ink-soft)' }}>
                  THE BRIDE
                </div>
              </div>
              <FourCorners size={70} inset={-2} />
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

// ============================================================
// 5. LOVE STORY TIMELINE
// ============================================================
const STORY = [
  { year: '2021', title: 'A Chance Meeting', body: 'A monsoon evening, a shared umbrella, a conversation that lasted till dawn. Some stories begin without warning.' },
  { year: '2022', title: 'Friendship Blossomed', body: 'Long calls, longer letters, and a thousand shared songs. A friendship that quietly turned into something more.' },
  { year: '2023', title: 'The Proposal', body: 'Beneath a sky full of fireflies and Diwali sparklers — a question asked, a yes whispered through happy tears.' },
  { year: '2024', title: 'The Engagement', body: 'Two families, one celebration. Rings exchanged, blessings showered, futures intertwined.' },
  { year: '2026', title: 'Forever Begins', body: 'Seven steps, seven vows, one lifetime. The journey continues, hand in hand.' },
];

const SceneStory = () => (
  <section className="scene grain" id="scene-5" data-screen-label="05 Love Story">
    <div className="bg-radial" />
    <div className="scene-inner">
      <Reveal>
        <div style={{ textAlign:'center' }}>
          <div className="kicker">Our Story</div>
          <h2 className="section-title gold-grad" style={{ marginTop: 12 }}>The Journey of Two Hearts</h2>
          <Divider width={280} />
        </div>
      </Reveal>

      <div className="timeline" style={{ marginTop: 40 }}>
        {STORY.map((s, i) => {
          const left = i % 2 === 0;
          return (
            <Reveal key={s.year} delay={i * 0.06} y={30}>
              <div className="tl-row">
                {left ? (
                  <>
                    <div className="tl-card left">
                      <div className="f-display gold" style={{ fontSize: 13, letterSpacing:'0.3em' }}>{s.year}</div>
                      <h3 className="f-script gold-grad" style={{ fontSize: 38, margin:'4px 0 8px', lineHeight: 1 }}>{s.title}</h3>
                      <p style={{ color: 'var(--ink-soft)', fontStyle:'italic', margin: 0 }}>{s.body}</p>
                    </div>
                    <div className="tl-dot" />
                    <div className="tl-spacer" />
                  </>
                ) : (
                  <>
                    <div className="tl-spacer" />
                    <div className="tl-dot" />
                    <div className="tl-card">
                      <div className="f-display gold" style={{ fontSize: 13, letterSpacing:'0.3em' }}>{s.year}</div>
                      <h3 className="f-script gold-grad" style={{ fontSize: 38, margin:'4px 0 8px', lineHeight: 1 }}>{s.title}</h3>
                      <p style={{ color: 'var(--ink-soft)', fontStyle:'italic', margin: 0 }}>{s.body}</p>
                    </div>
                  </>
                )}
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

// ============================================================
// 6. EVENTS
// ============================================================
const SceneEvents = ({ data }) => {
  const events = [
    { Icon: IconHaldi,    name: 'Haldi',    date: '11th Dec',  time: '10:00 AM', venue: 'Family Residence' },
    { Icon: IconMehendi,  name: 'Mehendi',  date: '12th Dec',  time: '4:00 PM',  venue: 'Garden Lawn' },
    { Icon: IconSangeet,  name: 'Sangeet',  date: '13th Dec',  time: '7:00 PM',  venue: 'Crystal Ballroom' },
    { Icon: IconWedding,  name: 'Wedding',  date: '14th Dec',  time: '6:00 PM',  venue: data.venue || 'The Leela Palace' },
    { Icon: IconReception,name: 'Reception',date: '15th Dec',  time: '7:30 PM',  venue: 'Royal Durbar Hall' },
  ];
  return (
    <section className="scene grain" id="scene-6" data-screen-label="06 Events">
      <div className="bg-warm" />
      <div className="scene-inner">
        <Reveal>
          <div style={{ textAlign:'center' }}>
            <div className="kicker">Wedding Festivities</div>
            <h2 className="section-title gold-grad" style={{ marginTop: 12 }}>Celebrate With Us</h2>
            <p className="lead" style={{ marginTop: 8 }}>
              Five days. Five rituals. One unforgettable celebration of love, family, and tradition.
            </p>
            <Divider width={280} />
          </div>
        </Reveal>

        <div className="events-grid" style={{ marginTop: 32 }}>
          {events.map((e, i) => (
            <Reveal key={e.name} delay={i * 0.08} y={30}>
              <div className="event-card">
                <e.Icon className="icon" />
                <h3>{e.name}</h3>
                <div className="date">{e.date}, 2026</div>
                <div className="time">{e.time}</div>
                <div className="venue">{e.venue}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================================
// 7. VENUE
// ============================================================
const SceneVenue = ({ data }) => (
  <section className="scene grain" id="scene-7" data-screen-label="07 Venue">
    <div className="bg-radial" />
    <div className="scene-inner">
      <Reveal>
        <div style={{ textAlign:'center' }}>
          <div className="kicker">The Venue</div>
          <h2 className="section-title gold-grad" style={{ marginTop: 12 }}>{data.venue}</h2>
          <p className="f-serif" style={{ fontStyle:'italic', color: 'var(--ink-soft)', fontSize: 19 }}>{data.venueCity}</p>
          <Divider width={280} />
        </div>
      </Reveal>

      <div className="two-col" style={{ marginTop: 24 }}>
        <Reveal y={40}>
          {/* Stylized map illustration */}
          <div style={{
            position:'relative', aspectRatio:'4/3', width:'100%',
            border:'1px solid color-mix(in oklab, var(--gold) 50%, transparent)',
            background:`
              radial-gradient(circle at 60% 40%, color-mix(in oklab, var(--gold) 18%, transparent), transparent 50%),
              repeating-linear-gradient(45deg, color-mix(in oklab, var(--gold) 5%, transparent) 0 1px, transparent 1px 14px),
              repeating-linear-gradient(-45deg, color-mix(in oklab, var(--gold) 5%, transparent) 0 1px, transparent 1px 14px),
              var(--bg-warm)`,
            overflow:'hidden',
          }}>
            {/* Roads */}
            <svg viewBox="0 0 400 300" style={{ position:'absolute', inset:0, width:'100%', height:'100%' }}
                 fill="none" stroke="var(--gold)" strokeOpacity="0.4">
              <path d="M 0 80 Q 120 100, 200 140 T 400 200" strokeWidth="2" strokeDasharray="6 4">
                <animate attributeName="stroke-dashoffset" from="0" to="-100" dur="6s" repeatCount="indefinite" />
              </path>
              <path d="M 60 0 Q 100 100, 240 130 Q 320 160, 400 100" strokeWidth="1.2" />
              <path d="M 0 220 Q 200 240, 400 220" strokeWidth="1.2" />
              <path d="M 240 0 L 240 130" strokeWidth="1" strokeDasharray="4 4" />
              {/* Pin */}
              <g transform="translate(240 130)">
                <circle r="20" fill="var(--gold)" fillOpacity="0.15">
                  <animate attributeName="r" from="14" to="28" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="fill-opacity" from="0.4" to="0" dur="2s" repeatCount="indefinite" />
                </circle>
                <path d="M 0 -16 a 8 8 0 1 1 0.001 0 z" fill="var(--accent)" stroke="var(--gold)" strokeWidth="1.5" />
                <path d="M 0 -8 L 0 6 M -4 -2 L 4 -2" stroke="var(--gold-bright)" />
              </g>
            </svg>
            <FourCorners size={48} inset={4} />
          </div>
        </Reveal>

        <Reveal y={40} delay={0.15}>
          <div className="glass-card" style={{ position: 'relative' }}>
            <div className="gold-corners" />
            <div className="kicker">Address</div>
            <p className="f-serif" style={{ fontSize: 19, marginTop: 14, lineHeight: 1.6 }}>
              {data.venue}<br />
              Lake Pichola Road<br />
              {data.venueCity}<br />
              India — 313001
            </p>
            <div style={{ height: 1, background: 'color-mix(in oklab, var(--gold) 30%, transparent)', margin: '20px 0' }} />
            <div className="kicker">Nearest Landmark</div>
            <p style={{ marginTop: 8, fontStyle:'italic', color:'var(--ink-soft)' }}>
              5 minutes from Maharana Pratap Airport • Beside Lake Pichola
            </p>
            <div className="kicker" style={{ marginTop: 18 }}>RSVP Contact</div>
            <p style={{ marginTop: 8, fontStyle:'italic', color:'var(--ink-soft)' }}>
              +91 98XXX XXXXX &nbsp;•&nbsp; +91 99XXX XXXXX
            </p>
            <div style={{ marginTop: 22, display:'flex', gap: 12, flexWrap:'wrap' }}>
              <a className="btn-gold" href="https://maps.google.com" target="_blank" rel="noreferrer">
                <IconMap style={{ width: 16, height: 16 }} /> Get Directions
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

// ============================================================
// 8. FAMILY
// ============================================================
const SceneFamily = ({ data }) => {
  const groomFam = [
    { name: 'Mr. Vikram Sharma', role: 'Father of the Groom' },
    { name: 'Mrs. Sunita Sharma', role: 'Mother of the Groom' },
    { name: 'Aanya Sharma', role: 'Sister' },
    { name: 'Mr. & Mrs. Deshmukh', role: 'Grandparents' },
  ];
  const brideFam = [
    { name: 'Mr. Rajeev Verma', role: 'Father of the Bride' },
    { name: 'Mrs. Anjali Verma', role: 'Mother of the Bride' },
    { name: 'Karan Verma', role: 'Brother' },
    { name: 'Mr. & Mrs. Kapoor', role: 'Grandparents' },
  ];
  return (
    <section className="scene grain" id="scene-8" data-screen-label="08 Family">
      <div className="bg-warm" />
      <Petals count={12} />
      <div className="scene-inner">
        <Reveal>
          <div style={{ textAlign:'center' }}>
            <div className="kicker">Our Families</div>
            <h2 className="section-title gold-grad" style={{ marginTop: 12 }}>Two Families, One Celebration</h2>
            <p className="lead">
              With hearts full of joy and homes filled with celebration, our families
              warmly welcome you to be part of this auspicious occasion.
            </p>
            <Divider width={280} />
          </div>
        </Reveal>

        <div style={{ display:'grid', gridTemplateColumns:'1fr', gap: 48, marginTop: 32 }}>
          <Reveal y={30}>
            <div style={{ textAlign:'center' }}>
              <div className="f-script gold-grad" style={{ fontSize: 52, marginBottom: 16 }}>The {data.groomName}'s Family</div>
              <div className="family-row">
                {groomFam.map((p, i) => (
                  <Reveal key={p.name} delay={i * 0.05}>
                    <div className="family-card">
                      <div className="family-circle" />
                      <div className="name">{p.name}</div>
                      <div className="role">{p.role}</div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal y={30}>
            <div style={{ textAlign:'center' }}>
              <div className="f-script gold-grad" style={{ fontSize: 52, marginBottom: 16 }}>The {data.brideName}'s Family</div>
              <div className="family-row">
                {brideFam.map((p, i) => (
                  <Reveal key={p.name} delay={i * 0.05}>
                    <div className="family-card">
                      <div className="family-circle" />
                      <div className="name">{p.name}</div>
                      <div className="role">{p.role}</div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

// ============================================================
// 9. RSVP & WISHES
// ============================================================
const SceneRSVP = () => {
  const [submitted, setSubmitted] = React.useState(false);
  const [wishes, setWishes] = React.useState([
    { name: 'Riya Kapoor',     msg: 'Wishing you a lifetime of love, laughter, and endless adventures together. Cannot wait to celebrate!' },
    { name: 'Arnav & Family',  msg: 'May your union be blessed with all that is beautiful. Congratulations to both families!' },
    { name: 'Neha Bhatia',     msg: 'So happy for you both! See you at the wedding — bring your dancing shoes 💃' },
  ]);
  const [form, setForm] = React.useState({ name:'', guests:'1', attending:'yes', message:'' });

  const submit = (e) => {
    e.preventDefault();
    if (!form.name) return;
    setWishes(w => [{ name: form.name, msg: form.message || `${form.attending === 'yes' ? 'Will be there!' : 'Sending love from afar.'} ✨` }, ...w]);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name:'', guests:'1', attending:'yes', message:'' });
  };

  return (
    <section className="scene grain" id="scene-9" data-screen-label="09 RSVP">
      <div className="bg-radial" />
      <div className="scene-inner">
        <Reveal>
          <div style={{ textAlign:'center' }}>
            <div className="kicker">RSVP & Wishes</div>
            <h2 className="section-title gold-grad" style={{ marginTop: 12 }}>Bless Us With Your Presence</h2>
            <Divider width={280} />
          </div>
        </Reveal>

        <div className="two-col" style={{ marginTop: 24, alignItems:'flex-start' }}>
          <Reveal y={30}>
            <form className="glass-card" onSubmit={submit} style={{ position:'relative' }}>
              <div className="gold-corners" />
              <div className="f-script gold-grad" style={{ fontSize: 44, lineHeight: 1, marginBottom: 16 }}>
                Confirm Your Presence
              </div>

              <div className="field">
                <label>Your Name</label>
                <input value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                       placeholder="Full name" required />
              </div>

              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 16 }}>
                <div className="field">
                  <label>Guests</label>
                  <input type="number" min="1" max="10" value={form.guests}
                         onChange={e => setForm({...form, guests: e.target.value})} />
                </div>
                <div className="field">
                  <label>Attending?</label>
                  <select value={form.attending} onChange={e => setForm({...form, attending: e.target.value})}>
                    <option value="yes">Joyfully Accept</option>
                    <option value="maybe">Tentative</option>
                    <option value="no">Regretfully Decline</option>
                  </select>
                </div>
              </div>

              <div className="field">
                <label>Your Wishes</label>
                <textarea value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                          placeholder="Share a blessing for the couple…" />
              </div>

              <button type="submit" className="btn-gold" style={{ width:'100%', justifyContent:'center' }}>
                {submitted ? '✦ Thank You! ✦' : 'Send Blessings'}
              </button>
              {submitted && (
                <div style={{ textAlign:'center', marginTop: 14, color:'var(--gold-bright)', fontStyle:'italic' }}>
                  Your blessing has been received with love 🌸
                </div>
              )}
            </form>
          </Reveal>

          <Reveal y={30} delay={0.15}>
            <div>
              <div className="f-script gold-grad" style={{ fontSize: 44, lineHeight: 1, marginBottom: 16, textAlign:'center' }}>
                Wishes from Loved Ones
              </div>
              <div style={{ display:'grid', gap: 14, maxHeight: 480, overflowY:'auto', paddingRight: 8 }}>
                {wishes.map((w, i) => (
                  <div key={i} style={{
                    padding: '16px 18px',
                    border: '1px solid color-mix(in oklab, var(--gold) 30%, transparent)',
                    background: 'color-mix(in oklab, var(--bg-warm) 70%, transparent)',
                    position: 'relative',
                  }}>
                    <div className="f-display gold" style={{ fontSize: 12, letterSpacing:'0.25em' }}>
                      {w.name}
                    </div>
                    <p style={{ margin:'6px 0 0', fontStyle:'italic', color:'var(--ink)', fontSize: 16 }}>
                      “{w.msg}”
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

// ============================================================
// 10. FINALE — Countdown
// ============================================================
const useCountdown = (target) => {
  const [now, setNow] = React.useState(() => new Date());
  React.useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, new Date(target).getTime() - now.getTime());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);
  return { days, hours, mins, secs };
};

const SceneFinale = ({ data }) => {
  const cd = useCountdown(data.weddingDate);
  return (
    <section className="scene grain" id="scene-10" data-screen-label="10 Finale">
      <div className="bg-radial" />
      <Particles count={50} />

      {/* Fireworks */}
      <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice"
           style={{ position:'absolute', inset:0, width:'100%', height:'100%', zIndex:1, pointerEvents:'none' }}>
        {[
          { cx: 180, cy: 160, color:'var(--gold-bright)', delay:'0s' },
          { cx: 620, cy: 220, color:'var(--accent)',      delay:'1.2s' },
          { cx: 400, cy: 120, color:'var(--gold)',        delay:'2.4s' },
          { cx: 700, cy: 480, color:'var(--gold-bright)', delay:'3.6s' },
          { cx: 120, cy: 460, color:'var(--accent)',      delay:'4.8s' },
        ].map((fw, i) => (
          <g key={i} transform={`translate(${fw.cx} ${fw.cy})`}>
            {Array.from({ length: 14 }).map((_, j) => {
              const a = (j * Math.PI * 2) / 14;
              return (
                <line key={j} x1="0" y1="0"
                      x2={Math.cos(a) * 60} y2={Math.sin(a) * 60}
                      stroke={fw.color} strokeWidth="1.4" strokeLinecap="round" opacity="0">
                  <animate attributeName="opacity"
                           values="0;1;0" dur="2s" begin={fw.delay} repeatCount="indefinite" />
                  <animate attributeName="x2" from={Math.cos(a) * 4} to={Math.cos(a) * 80}
                           dur="2s" begin={fw.delay} repeatCount="indefinite" />
                  <animate attributeName="y2" from={Math.sin(a) * 4} to={Math.sin(a) * 80}
                           dur="2s" begin={fw.delay} repeatCount="indefinite" />
                </line>
              );
            })}
          </g>
        ))}
      </svg>

      <div className="scene-inner" style={{ textAlign:'center', position:'relative', zIndex: 3 }}>
        <Reveal>
          <div className="kicker">Save The Date</div>
        </Reveal>
        <Reveal delay={0.15}>
          <h2 className="f-script gold-grad" style={{ fontSize: 'clamp(60px, 9vw, 120px)', lineHeight: 1, margin:'18px 0 0' }}>
            See You at the Wedding
          </h2>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="f-serif" style={{ fontStyle:'italic', fontSize: 22, color:'var(--ink-soft)', margin:'12px 0' }}>
            {data.weddingDateDisplay} &nbsp;•&nbsp; {data.venue}, {data.venueCity}
          </p>
        </Reveal>
        <Reveal delay={0.4}>
          <Divider width={280} />
        </Reveal>

        <Reveal delay={0.5} y={20}>
          <div className="countdown" style={{ marginTop: 24 }}>
            {[{n:cd.days,l:'Days'},{n:cd.hours,l:'Hours'},{n:cd.mins,l:'Minutes'},{n:cd.secs,l:'Seconds'}].map(c => (
              <div key={c.l} className="cd-cell">
                <div className="num">{String(c.n).padStart(2,'0')}</div>
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
          <div className="f-script gold-grad" style={{ fontSize: 'clamp(48px, 7vw, 84px)', marginTop: 32, lineHeight: 1 }}>
            With Love,<br />
            <span style={{ fontSize: '0.7em' }}>{data.groomName} &amp; {data.brideName}</span>
          </div>
        </Reveal>

        <Reveal delay={1.0}>
          <div style={{ marginTop: 36, color:'var(--gold)', display:'flex', justifyContent:'center' }}>
            <Lotus size={56} />
          </div>
          <div className="f-display" style={{ fontSize: 11, letterSpacing:'0.4em', color:'var(--ink-soft)', marginTop: 10 }}>
            ✦ THANK YOU ✦
          </div>
        </Reveal>
      </div>
    </section>
  );
};

Object.assign(window, {
  Reveal,
  SceneOpening, SceneBlessings, SceneGroom, SceneBride, SceneStory,
  SceneEvents, SceneVenue, SceneFamily, SceneRSVP, SceneFinale,
});
