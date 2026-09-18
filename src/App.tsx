import { useState, useEffect, type CSSProperties, type FormEvent } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Compass, ExternalLink, Menu, Plus, Sparkles, X } from 'lucide-react';
import { BETA_URL, INVITE_REQUEST_URL, games, normalizePath, type Game } from './content';

type ArtProps = { name: string; alt: string; className?: string; eager?: boolean; sizes?: string };
function Art({ name, alt, className = '', eager = false, sizes = '(max-width: 700px) 100vw, 50vw' }: ArtProps) {
  return <img className={className} src={`/assets/${name}-1280.webp`} srcSet={`/assets/${name}-640.webp 640w, /assets/${name}-1280.webp 1280w, /assets/${name}-1920.webp 1920w`} sizes={sizes} alt={alt} loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : 'auto'} decoding="async" />;
}

function Header({ path }: { path: string }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);
  return <header className="site-header">
    <a className="brand" href="/" aria-label="Glitzy Game Studios home"><img src="/assets/studio-logo-640.webp" alt="Glitzy Game Studios" width="244" height="76" /></a>
    <nav className="desktop-nav" aria-label="Main navigation">
      <a className={path.startsWith('/games') ? 'active' : ''} href="/games/">Our games</a>
      <a className={path === '/studio/' ? 'active' : ''} href="/studio/">The studio</a>
      <a className={path.startsWith('/beta') ? 'active' : ''} href="/beta/echoes-of-history/">Beta access <span className="nav-dot" /></a>
    </nav>
    <a className="button header-cta" href={BETA_URL}>Play Echoes <ArrowUpRight size={16} /></a>
    <button className="menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    {open && <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile navigation"><a href="/games/">Our games <ArrowUpRight /></a><a href="/studio/">The studio <ArrowUpRight /></a><a href="/beta/echoes-of-history/">Beta access <ArrowUpRight /></a><a href={BETA_URL}>Play Echoes <ExternalLink /></a></nav>}
  </header>;
}

function Footer() {
  return <footer className="site-footer wrap">
    <div className="footer-top"><div><a className="footer-brand" href="/">GLITZY<span> GAME STUDIOS</span><span className="brand-spark">✳</span></a><p>A little strange. A world of possibilities.</p></div><a className="back-top" href="#top">Back to top <ArrowUpRight size={16} /></a></div>
    <div className="footer-bottom"><p>© {new Date().getFullYear()} Glitzy Game Studios</p><nav aria-label="Footer navigation"><a href="/games/">Our games</a><a href="/studio/">The studio</a><a href="/privacy/">Privacy</a><a href="/beta/echoes-of-history/">Beta access</a></nav><span className="color-bars"><i /><i /><i /></span></div>
  </footer>;
}

function Eyebrow({ children, number }: { children: React.ReactNode; number?: string }) {
  return <div className="eyebrow">{number && <span className="section-number">{number}</span>}<span>{children}</span></div>;
}

function GameCard({ game, index }: { game: Game; index: number }) {
  return <a className="game-card" href={`/games/${game.slug}/`} style={{ '--game-accent': game.accent } as CSSProperties}>
    <div className="card-art"><Art name={game.image} alt={game.alt} sizes="(max-width: 650px) 100vw, (max-width: 1000px) 50vw, 33vw" /><span className="card-index">0{index + 1}</span>{game.beta && <span className="badge card-badge"><span className="live-dot" /> Playable beta</span>}<span className="card-open"><ArrowUpRight size={22} /></span></div>
    <div className="card-info"><p className="card-genre">{game.genre}</p><h3>{game.title}</h3><p className="card-description">{game.short}</p><span className="card-link">Discover the game <ArrowRight size={15} /></span></div>
  </a>;
}

function Collection({ full = false }: { full?: boolean }) {
  const [filter, setFilter] = useState('All games');
  const visible = games.filter(g => filter === 'All games' || g.category === filter);
  return <section id="collection" className={`collection wrap ${full ? 'collection-page' : ''}`}>
    {!full && <div className="section-heading"><div><Eyebrow number="01">The collection</Eyebrow><h2>Different worlds.<br className="mobile-break" /> Same curious spirit.</h2></div><p>Pick a world. Follow your curiosity.<br />See where it takes you.</p></div>}
    <div className="collection-toolbar"><div className="filters" role="group" aria-label="Filter games">{['All games', 'Stories & worlds', 'Arcade & action'].map(f => <button key={f} aria-pressed={filter === f} className={filter === f ? 'selected' : ''} onClick={() => setFilter(f)}>{f}{f === 'All games' && <span>06</span>}</button>)}</div><span className="result-count" aria-live="polite">{visible.length} worlds to discover</span></div>
    <div className="game-grid">{visible.map(game => <GameCard key={game.slug} game={game} index={games.indexOf(game)} />)}</div>
    {!full && <div className="collection-bottom"><span>Made to be explored. Built to be different.</span><a className="text-link" href="/games/">Explore the full collection <ArrowUpRight size={17} /></a></div>}
  </section>;
}

function BetaFeature() {
  return <section className="beta-feature wrap" aria-labelledby="beta-title"><div className="beta-art"><Art name="echoes" alt={games[0].alt} /><span className="image-note">Echoes of History · Concept art</span></div><div className="beta-copy"><Eyebrow number="02">Step inside the beta</Eyebrow><span className="badge"><span className="live-dot" /> Now in beta</span><h2 id="beta-title">History is<br />no longer <em>silent.</em></h2><p>Enter the Archive. Meet the extraordinary people of the past. Discover what happens when history can answer back.</p><div className="button-row"><a className="button button-gold" href={BETA_URL}>Play Echoes of History <ArrowUpRight size={18} /></a><a className="text-link" href="/beta/echoes-of-history/">How to join <ArrowRight size={16} /></a></div><p className="microcopy">Play in your browser · Invite required for new accounts</p></div></section>;
}

function StudioFeature() {
  return <section className="studio-feature wrap"><div className="studio-feature-copy"><Eyebrow number="03">Behind the worlds</Eyebrow><h2>Big imagination.<br /><em>Glitzy</em> by nature.</h2><p>Living Ink. Talking history. A broom with a grudge. Our games go their own way—and that’s exactly how we like it.</p><a className="text-link" href="/studio/">Get to know the studio <ArrowUpRight size={18} /></a></div><div className="studio-feature-art"><Art name="studio-workshop" alt="An illustrated creative workshop surrounded by the studio’s game worlds." /><span className="image-note">A glimpse of our imagination · Studio artwork</span></div></section>;
}

function Home() {
  return <>
    <section className="home-hero"><Art className="hero-art" name="studio-worlds" alt="Six imagined worlds orbit the glowing Glitzy Game Studios disco-ball emblem." eager sizes="(max-width: 650px) 1100px, 100vw" /><div className="hero-shade" /><div className="hero-content wrap"><div className="hero-topline"><span className="tiny-star">✳</span> ORIGINAL GAMES. UNEXPECTED WORLDS.</div><h1>Find your<br />next <em>world.</em></h1><p>From history that answers back to housework that fights back. There’s a little extraordinary in every world we make.</p><div className="button-row"><a className="button button-light" href="#collection">Explore our games <ArrowDown size={18} /></a><a className="hero-beta-link" href={BETA_URL}><span className="live-dot" /> Play the Echoes beta <ArrowUpRight size={17} /></a></div></div><div className="hero-bottom wrap"><span><i /> SIX WORLDS. ONE STUDIO.</span><a href="#collection">A little curiosity goes a long way <ArrowDown size={15} /></a></div></section>
    <div className="world-strip" aria-hidden="true"><span>STORIES WORTH STEPPING INTO</span><Sparkles /><span>CHAOS WORTH COMING BACK FOR</span><Sparkles /><span>WORLDS WITH A MIND OF THEIR OWN</span><Sparkles /></div>
    <Collection /><BetaFeature /><StudioFeature />
  </>;
}

function GamesPage() {
  return <><section className="page-intro wrap"><Eyebrow>The Glitzy collection / 06 worlds</Eyebrow><h1>Follow your<br /><em>curiosity.</em></h1><p>From a realm written in living Ink to a lawn that won’t go down without a fight. Find the world that speaks to you.</p></section><Collection full /><BetaFeature /></>;
}

function GamePage({ game }: { game: Game }) {
  const others = games.filter(g => g.slug !== game.slug).slice(0, 3);
  return <div style={{ '--game-accent': game.accent } as CSSProperties}>
    <section className="game-hero"><Art name={game.image} alt={game.alt} className="game-hero-art" eager sizes="100vw" /><div className="game-hero-shade" /><div className="wrap game-hero-content"><a className="breadcrumb" href="/games/"><ArrowLeft size={15} /> All games</a><div className="game-hero-bottom"><p className="eyebrow">{game.genre}{game.beta && <span className="badge"><span className="live-dot" /> Playable beta</span>}</p><h1>{game.title}</h1><p className="game-tagline">{game.tagline}</p>{game.beta ? <div className="button-row"><a className="button button-gold" href={BETA_URL}>Enter the Archive <ArrowUpRight size={18} /></a><a className="text-link" href="/beta/echoes-of-history/">About the beta <ArrowRight size={16} /></a></div> : <a className="text-link" href="#about-game">Explore this world <ArrowDown size={17} /></a>}</div></div><span className="game-art-label">Promotional / concept artwork</span></section>
    <section className="game-story wrap" id="about-game"><aside><Eyebrow>Inside the world</Eyebrow><h2>{game.tagline}</h2><dl><dt>Game</dt><dd>{game.title}</dd><dt>Experience</dt><dd>{game.genre}</dd><dt>From</dt><dd>Glitzy Game Studios</dd></dl>{!game.beta && <p className="availability-note">Explore the project here. Release and play details will be shared when available.</p>}</aside><div className="story-prose">{game.paragraphs.map((p, i) => <p className={i === 0 ? 'story-lead' : ''} key={i}>{p}</p>)}<p className="story-closing">{game.closing}</p></div></section>
    <figure className="world-figure wrap"><Art name={game.secondaryImage} alt={game.secondaryAlt} sizes="(max-width: 700px) 100vw, 90vw" /><figcaption><span>{game.title}</span><span>Selected project artwork · Visuals may evolve</span></figcaption></figure>
    {game.beta && <section className="game-beta-cta wrap"><span className="tiny-star">✳</span><h2>The Guide is waiting.</h2><p>Your next conversation is on the other side.</p><a className="button button-gold" href={BETA_URL}>Play the beta <ArrowUpRight size={18} /></a><a className="text-link" href="/beta/echoes-of-history/">New here? Read the beta guide <ArrowRight size={16} /></a></section>}
    <section className="related wrap"><div className="section-heading"><div><Eyebrow>Keep exploring</Eyebrow><h2>Another world awaits.</h2></div><a href="/games/" className="text-link">All games <ArrowUpRight size={18} /></a></div><div className="game-grid">{others.map(g => <GameCard game={g} key={g.slug} index={games.indexOf(g)} />)}</div></section>
  </div>;
}

type InviteStatus = '' | 'sent' | 'already_used' | 'rejected';

function InviteRequestForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState<InviteStatus>('');
  const ready = name.trim().length > 0 && email.includes('@');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!ready || loading) return;
    setError('');
    setLoading(true);
    try {
      const res = await fetch(INVITE_REQUEST_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim().toLowerCase(), reason: reason.trim() }),
      });
      const json = await res.json();
      if (!json.success) { setError(json.error ?? 'Something went wrong. Please try again.'); return; }
      setStatus((json.message as InviteStatus) || 'sent');
    } catch {
      setError('Could not reach the Archive. Please try again in a moment.');
    } finally {
      setLoading(false);
    }
  };

  if (status) {
    const message = status === 'already_used'
      ? 'An invite code was already sent to this email and has been used. If you already have an account, try signing in from the Echoes app instead.'
      : status === 'rejected'
      ? 'This request was not approved. If you think this is a mistake, please reach out.'
      : 'Your invite code has been sent! Check your email — it should arrive within a few minutes.';
    return <div className="invite-form-result"><span className="tiny-star">✳</span><p>{message}</p></div>;
  }

  return <form className="invite-form" onSubmit={handleSubmit}>
    <div className="field-row">
      <div className="field-group"><label htmlFor="invite-name">Name</label><input id="invite-name" type="text" placeholder="Your name…" value={name} maxLength={50} onChange={e => setName(e.target.value)} required /></div>
      <div className="field-group"><label htmlFor="invite-email">Email</label><input id="invite-email" type="email" placeholder="Your email address…" value={email} onChange={e => setEmail(e.target.value)} required /></div>
    </div>
    <div className="field-group"><label htmlFor="invite-reason">Why do you want to join? <span className="field-optional">— optional</span></label><textarea id="invite-reason" placeholder="Tell us a little about yourself…" value={reason} maxLength={500} rows={3} onChange={e => setReason(e.target.value)} /></div>
    {error && <p className="form-error">{error}</p>}
    <button className="button button-gold" type="submit" disabled={!ready || loading}>{loading ? 'Sending…' : '✦ Request Access'}</button>
  </form>;
}

function InviteRequestSection() {
  return <section id="request-invite" className="invite-request wrap"><div className="section-heading"><div><Eyebrow>Need access?</Eyebrow><h2>Request an<br />invite code.</h2></div><p>Tell us a little about yourself. We’ll email you an invite code right away.</p></div><div className="invite-form-card"><InviteRequestForm /></div></section>;
}

function BetaPage() {
  return <><section className="beta-page-hero"><Art className="beta-page-art" name="echoes-archive" alt={games[0].secondaryAlt} eager sizes="100vw" /><div className="beta-page-shade" /><div className="wrap beta-page-content"><span className="badge"><span className="live-dot" /> Echoes of History / Beta</span><h1>The Archive<br />is <em>waiting.</em></h1><p>Enter the Archive, speak with history, and see what echoes back. Your journey starts in the Echoes web app.</p><a className="button button-gold" href={BETA_URL}>Open Echoes of History <ArrowUpRight size={18} /></a><span className="microcopy">Browser-based · Existing players can sign in</span></div></section>
    <section className="beta-guide wrap"><div className="section-heading"><div><Eyebrow>Before you step inside</Eyebrow><h2>A small guide to getting started.</h2></div><p>The beta uses the existing Echoes account<br />and invitation system.</p></div><div className="steps"><article><span className="step-number">01</span><h3>Open the Archive</h3><p>Follow the Play Beta link to the live Echoes app. There’s nothing to download.</p><ExternalLink size={22} /></article><article><span className="step-number">02</span><h3>Bring your invitation</h3><p>Already have an account? Sign in. New players need an invite code to register — <a className="text-link" href="#request-invite">request one below <ArrowRight size={14} /></a> if you don’t have one yet.</p><Compass size={22} /></article><article><span className="step-number">03</span><h3>Follow your curiosity</h3><p>Enter the Archive, meet the Resonances, and begin a conversation. This is a beta, so the experience is still evolving.</p><Sparkles size={22} /></article></div></section>
    <InviteRequestSection />
    <section className="faq-section wrap"><div><Eyebrow>A few useful answers</Eyebrow><h2>Before your<br />first echo.</h2><a className="text-link" href="/games/echoes-of-history/">Explore the game <ArrowUpRight size={17} /></a></div><div className="faq-list">{[
      ['Can I play right now?', 'Existing players can open Echoes and sign in. New accounts require a beta invite code. Use the request form on this page; receiving access is not automatic.'],
      ['Do I need a separate studio account?', 'No. The studio website links you directly to Echoes, where you use your existing game account.'],
      ['Does it run in my browser?', 'Yes. Echoes is a web app. Open it in an up-to-date browser. Device-specific support and performance may vary during the beta.'],
      ['Why does the Play button open a Railway address?', 'That is the current live home of Echoes of History. Your gameplay and account stay in the existing app.'],
      ['Where do my conversations go?', 'Gameplay is powered by AI, and messages are processed by the game’s backend and AI provider. Review the notices and terms shown in Echoes before entering personal information. This studio website does not collect your conversations.'],
      ['What happens to the info in the invite request form?', 'Your name, email, and optional message are sent straight to the Echoes of History backend for review — the same system the app’s own request flow uses. This studio website doesn’t store or see that data itself.'],
    ].map(([question, answer]) => <details key={question}><summary>{question}<Plus size={18} /></summary><p>{answer}</p></details>)}</div></section>
  </>;
}

function StudioPage() {
  return <><section className="page-intro studio-intro wrap"><Eyebrow>Glitzy Game Studios</Eyebrow><h1>A curious studio.<br /><em>Uncommon worlds.</em></h1><p>We make room for the strange, the playful, and the unexpected. Six distinct worlds, connected by a love of imagination.</p></section><figure className="studio-wide wrap"><Art name="studio-workshop" alt="An illustrated workshop filled with Glitzy game worlds, sketches, and creative possibilities." eager sizes="100vw" /><figcaption>Our creative world, imagined.</figcaption></figure><section className="studio-manifesto wrap"><Eyebrow>Different by design</Eyebrow><div><h2>There’s more than<br />one way to <em>play.</em></h2><p>Sometimes it’s a conversation that changes history. Sometimes it’s a community deciding what reality should be. And sometimes it’s a battle broom facing a house full of spiders.</p><p>Glitzy Game Studios brings these ideas together without asking them to look, feel, or play the same. Every game has a world of its own. We’re here to invite you in.</p><a className="button button-light" href="/games/">Find your next world <ArrowUpRight size={18} /></a></div></section><BetaFeature /></>;
}

function PrivacyPage() {
  return <section className="legal-page wrap"><Eyebrow>Website information</Eyebrow><h1>Your visit.<br /><em>Your privacy.</em></h1><div className="legal-copy"><h2>The studio website</h2><p>This website showcases Glitzy Game Studios and its games. Browsing it does not require an account or a conversation. The only information you can submit here is through the invite-code request form described below. This site does not include analytics scripts, advertising trackers, or newsletter forms.</p><h2>Requesting an invite code</h2><p>The beta page includes a form for requesting an invite code to Echoes of History. Submitting it sends your name, email address, and anything you choose to write in the optional message directly to the Echoes of History backend — the same system used by the app’s own invitation request flow. That information is reviewed by the Echoes of History team to approve access and email you an invite code. This studio website does not store that submission or use it for any other purpose. Review the Echoes of History app’s own privacy information for how it handles that data.</p><h2>Hosting and browser requests</h2><p>Like other websites, loading pages and images sends technical information such as your IP address and browser details to the hosting provider. The provider may keep operational logs. Images and fonts are served with the website.</p><h2>The Echoes of History beta</h2><p>Play Beta links take you to the separate Echoes application. Its accounts, invitations, conversations, and AI processing are handled by that app. Review its terms and privacy information before registering or sharing information. This page describes the studio website only.</p><h2>Changes</h2><p>If the studio website adds new forms or analytics, this information will be updated to describe them.</p></div></section>;
}

function NotFound() {
  return <section className="not-found wrap"><Eyebrow>404 / Uncharted territory</Eyebrow><h1>This world is<br />off the <em>map.</em></h1><p>Let’s find somewhere worth exploring.</p><a href="/games/" className="button button-light">Back to the games <ArrowRight size={18} /></a></section>;
}

export default function App({ path: initialPath }: { path: string }) {
  const path = normalizePath(initialPath);
  const game = games.find(g => path === `/games/${g.slug}/`);
  const page = path === '/' ? <Home /> : path === '/games/' ? <GamesPage /> : game ? <GamePage game={game} /> : path === '/studio/' ? <StudioPage /> : path === '/beta/echoes-of-history/' ? <BetaPage /> : path === '/privacy/' ? <PrivacyPage /> : <NotFound />;
  return <><a className="skip-link" href="#main">Skip to content</a><div id="top" /><Header path={path} /><main id="main" tabIndex={-1}>{page}</main><Footer /></>;
}
