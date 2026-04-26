export const style = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink: #0d0f14;
    --ink2: #1c2030;
    --cream: #f5f2eb;
    --gold: #e8a020;
    --gold-light: #f5c060;
    --teal: #0a9e8a;
    --teal-light: #12c4ad;
    --muted: #7a7f90;
    --card-bg: #ffffff;
    --border: rgba(0,0,0,0.08);
    --font-display: 'Syne', sans-serif;
    --font-body: 'DM Sans', sans-serif;
  }

  body { font-family: var(--font-body); background: var(--cream); color: var(--ink); overflow-x: hidden; }

  /* NAV */
  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 5%; height: 68px;
    background: rgba(245,242,235,0.92);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
    transition: box-shadow 0.3s;
  }
  nav.scrolled { box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
  .nav-logo {
    font-family: var(--font-display); font-size: 1.5rem; font-weight: 800;
    color: var(--ink); cursor: pointer; letter-spacing: -0.5px; z-index: 101;
  }
  .nav-logo span { color: var(--teal); }
  .nav-links { display: flex; gap: 2rem; align-items: center; }
  .nav-links button {
    background: none; border: none; cursor: pointer;
    font-family: var(--font-body); font-size: 0.95rem; font-weight: 500;
    color: var(--ink); opacity: 0.7; transition: opacity 0.2s, color 0.2s;
    padding: 4px 0;
  }
  .nav-links button:hover { opacity: 1; color: var(--teal); }
  .nav-links button.active { opacity: 1; color: var(--teal); }
  .nav-cta {
    background: var(--ink); color: var(--cream);
    padding: 10px 22px; border-radius: 6px; opacity: 1;
    transition: background 0.2s, color 0.2s;
  }

  /* Hamburger */
  .nav-hamburger {
    display: none; flex-direction: column; gap: 5px; cursor: pointer;
    background: none; border: none; padding: 4px; z-index: 101;
  }
  .nav-hamburger span {
    display: block; width: 24px; height: 2px; background: var(--ink);
    border-radius: 2px; transition: transform 0.3s, opacity 0.3s;
  }
  .nav-hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .nav-hamburger.open span:nth-child(2) { opacity: 0; }
  .nav-hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

  /* HERO */
  .hero {
    min-height: 100vh; display: flex; align-items: center;
    padding: 100px 5% 80px;
    background: var(--ink2);
    position: relative; overflow: hidden;
  }
  .hero-bg-pattern {
    position: absolute; inset: 0; opacity: 0.04;
    background-image: radial-gradient(circle, #fff 1px, transparent 1px);
    background-size: 40px 40px;
  }
  .hero-glow {
    position: absolute; top: -100px; right: -100px;
    width: 600px; height: 600px; border-radius: 50%;
    background: radial-gradient(circle, rgba(10,158,138,0.25) 0%, transparent 70%);
    pointer-events: none;
  }
  .hero-glow2 {
    position: absolute; bottom: -150px; left: -100px;
    width: 500px; height: 500px; border-radius: 50%;
    background: radial-gradient(circle, rgba(232,160,32,0.15) 0%, transparent 70%);
    pointer-events: none;
  }
  .hero-inner { max-width: 1100px; margin: 0 auto; width: 100%; position: relative; z-index: 1; }
  .hero-tag {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(10,158,138,0.15); border: 1px solid rgba(10,158,138,0.3);
    color: var(--teal-light); padding: 6px 16px; border-radius: 100px;
    font-size: 0.8rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase;
    margin-bottom: 1.5rem;
    animation: fadeUp 0.7s ease forwards;
  }
  .hero-tag .dot { width: 6px; height: 6px; background: var(--teal-light); border-radius: 50%; animation: pulse 1.5s infinite; display: inline-block; flex-shrink: 0; }
  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.8)} }
  .hero h2 {
    font-family: var(--font-display); font-size: clamp(3rem, 6vw, 5.5rem);
    font-weight: 800; line-height: 1.02; letter-spacing: -2px;
    color: #fff; margin-bottom: 1.5rem;
    animation: fadeUp 0.7s 0.1s ease both;
  }
  .hero h2 em { color: var(--gold); font-style: normal; }
  .hero-sub {
    font-size: clamp(1rem, 1.4vw, 1.2rem); font-weight: 300; line-height: 1.7;
    color: rgba(255,255,255,0.65); max-width: 540px; margin-bottom: 2.5rem;
    animation: fadeUp 0.7s 0.2s ease both;
  }
  .hero-btns { display: flex; gap: 1rem; flex-wrap: wrap; animation: fadeUp 0.7s 0.3s ease both; }
  .btn-primary {
    background: var(--teal); color: #fff; border: none; cursor: pointer;
    padding: 14px 32px; border-radius: 8px; font-family: var(--font-body);
    font-size: 1rem; font-weight: 600; letter-spacing: 0.02em;
    transition: background 0.2s, transform 0.15s;
  }
  .btn-primary:hover { background: var(--teal-light); transform: translateY(-2px); }
  .btn-outline {
    background: transparent; color: #fff; border: 1.5px solid rgba(255,255,255,0.3);
    cursor: pointer; padding: 14px 32px; border-radius: 8px;
    font-family: var(--font-body); font-size: 1rem; font-weight: 500;
    transition: border-color 0.2s, background 0.2s;
  }
  .btn-outline:hover { border-color: #fff; background: rgba(255,255,255,0.05); }
  .btn-outline-dark {
    background: transparent; color: var(--ink); border: 1.5px solid rgba(0,0,0,0.25);
    cursor: pointer; padding: 14px 32px; border-radius: 8px;
    font-family: var(--font-body); font-size: 1rem; font-weight: 500;
    transition: border-color 0.2s, background 0.2s;
  }
  .btn-outline-dark:hover { border-color: var(--teal); color: var(--teal); background: rgba(10,158,138,0.04); }

  .hero-stats {
    display: flex; gap: 3rem; margin-top: 4rem; padding-top: 2.5rem;
    border-top: 1px solid rgba(255,255,255,0.1);
    animation: fadeUp 0.7s 0.4s ease both;
  }
  .stat-item { }
  .stat-num { font-family: var(--font-display); font-size: 2rem; font-weight: 800; color: var(--gold); }
  .stat-label { font-size: 0.85rem; color: rgba(255,255,255,0.5); margin-top: 2px; }

  @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }

  /* SECTIONS */
  section { padding: 96px 5%; }
  .section-inner { max-width: 1100px; margin: 0 auto; }
  .section-tag {
    font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;
    color: var(--teal); margin-bottom: 1rem;
  }
  .section-title {
    font-family: var(--font-display); font-size: clamp(2rem, 3.5vw, 3rem);
    font-weight: 800; letter-spacing: -1.5px; line-height: 1.1;
    color: var(--ink); margin-bottom: 1.2rem;
  }
  .section-sub { font-size: 1.05rem; color: var(--muted); line-height: 1.7; max-width: 520px; }

  /* WHAT IS */
  .what-is { background: var(--cream); }
  .what-is-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; margin-top: 4rem; }
  .what-is-visual {
    background: var(--ink2); border-radius: 20px; padding: 3rem;
    position: relative; overflow: hidden;
  }
  .what-is-visual::before {
    content: ''; position: absolute; top: -60px; right: -60px;
    width: 200px; height: 200px; border-radius: 50%;
    background: radial-gradient(circle, rgba(10,158,138,0.4) 0%, transparent 70%);
  }
  .visual-card {
    background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px; padding: 1.2rem 1.5rem; margin-bottom: 1rem;
    display: flex; align-items: center; gap: 1rem;
  }
  .visual-card:last-child { margin-bottom: 0; }
  .vc-icon { font-size: 1.5rem; }
  .vc-text { }
  .vc-title { font-family: var(--font-display); font-size: 0.95rem; font-weight: 700; color: #fff; }
  .vc-sub { font-size: 0.8rem; color: rgba(255,255,255,0.45); margin-top: 2px; }
  .what-is-text p { font-size: 1.05rem; color: #3d4155; line-height: 1.8; margin-bottom: 1.2rem; }

  /* OFFERS */
  .offers { background: #fff; }
  .offers-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; margin-top: 3.5rem; }
  .offer-card {
    background: var(--cream); border-radius: 16px; padding: 2rem;
    border: 1px solid var(--border); transition: transform 0.2s, box-shadow 0.2s;
    position: relative; overflow: hidden;
  }
  .offer-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.08); }
  .offer-card::after {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
    background: var(--teal); transform: scaleX(0); transform-origin: left;
    transition: transform 0.3s;
  }
  .offer-card:hover::after { transform: scaleX(1); }
  .offer-icon { font-size: 2rem; margin-bottom: 1rem; }
  .offer-title { font-family: var(--font-display); font-size: 1.1rem; font-weight: 700; color: var(--ink); margin-bottom: 0.6rem; }
  .offer-desc { font-size: 0.9rem; color: var(--muted); line-height: 1.6; }

  /* HOW IT WORKS */
  .how-it-works { background: var(--ink2); }
  .how-it-works .section-title { color: #fff; }
  .how-it-works .section-tag { color: var(--gold); }
  .how-it-works .section-sub { color: rgba(255,255,255,0.5); }
  .steps { display: flex; gap: 0; margin-top: 4rem; position: relative; }
  .steps::before {
    content: ''; position: absolute; top: 28px; left: 28px; right: 28px; height: 2px;
    background: rgba(255,255,255,0.08); z-index: 0;
  }
  .step {
    flex: 1; display: flex; flex-direction: column; align-items: center;
    text-align: center; padding: 0 1rem; position: relative; z-index: 1;
  }
  .step-num {
    width: 56px; height: 56px; border-radius: 50%;
    background: var(--ink); border: 2px solid rgba(255,255,255,0.15);
    display: flex; align-items: center; justify-content: center;
    font-family: var(--font-display); font-size: 1.1rem; font-weight: 800;
    color: var(--gold); margin-bottom: 1.5rem;
    transition: background 0.2s, border-color 0.2s;
  }
  .step:hover .step-num { background: var(--teal); border-color: var(--teal); color: #fff; }
  .step-title { font-family: var(--font-display); font-size: 1rem; font-weight: 700; color: #fff; margin-bottom: 0.5rem; }
  .step-desc { font-size: 0.85rem; color: rgba(255,255,255,0.45); line-height: 1.5; }

  /* WHY CHOOSE */
  .why-choose { background: var(--cream); }
  .why-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.2rem; margin-top: 3rem; }
  .why-item {
    display: flex; align-items: flex-start; gap: 1rem;
    background: #fff; padding: 1.5rem; border-radius: 12px;
    border: 1px solid var(--border);
    transition: box-shadow 0.2s;
  }
  .why-item:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.06); }
  .why-check {
    width: 28px; height: 28px; border-radius: 50%;
    background: rgba(10,158,138,0.1); display: flex; align-items: center;
    justify-content: center; flex-shrink: 0; color: var(--teal); font-size: 0.85rem; font-weight: 700;
  }
  .why-text { }
  .why-title { font-family: var(--font-display); font-size: 0.95rem; font-weight: 700; color: var(--ink); }
  .why-desc { font-size: 0.85rem; color: var(--muted); line-height: 1.5; margin-top: 3px; }

  /* CTA BANNER */
  .cta-banner {
    background: linear-gradient(135deg, var(--teal) 0%, #076e60 100%);
    padding: 80px 5%; text-align: center;
  }
  .cta-banner h2 {
    font-family: var(--font-display); font-size: clamp(2rem, 3.5vw, 3rem);
    font-weight: 800; letter-spacing: -1.5px; color: #fff; margin-bottom: 1rem;
  }
  .cta-banner p { color: rgba(255,255,255,0.75); font-size: 1.1rem; margin-bottom: 2rem; }
  .cta-inner { max-width: 1100px; margin: 0 auto; }
  .btn-white {
    background: #fff; color: var(--teal); border: none; cursor: pointer;
    padding: 14px 36px; border-radius: 8px; font-family: var(--font-body);
    font-size: 1rem; font-weight: 700; transition: transform 0.15s, box-shadow 0.2s;
  }
  .btn-white:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.15); }

  /* ---- ABOUT PAGE ---- */
  .about-hero {
    min-height: 60vh; display: flex; align-items: center;
    padding: 120px 5% 80px; background: var(--ink2);
    position: relative; overflow: hidden;
  }
  .about-hero .hero-bg-pattern { opacity: 0.03; }
  .about-hero-tag { display: flex; gap: 1rem; margin-bottom: 2rem; flex-wrap: wrap; }
  .tag-pill {
    background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.15);
    color: rgba(255,255,255,0.7); padding: 6px 16px; border-radius: 100px;
    font-size: 0.8rem; font-weight: 500;
  }
  .about-hero h1 {
    font-family: var(--font-display); font-size: clamp(2.5rem, 5vw, 4.5rem);
    font-weight: 800; letter-spacing: -2px; color: #fff; line-height: 1.05;
    margin-bottom: 1.5rem;
  }
  .about-hero h1 em { color: var(--teal-light); font-style: normal; }
  .about-hero p { font-size: 1.1rem; color: rgba(255,255,255,0.6); line-height: 1.7; max-width: 540px; }

  /* VISION MISSION */
  .vm-section { background: #fff; }
  .vm-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 3.5rem; }
  .vm-card {
    padding: 2.5rem; border-radius: 20px; position: relative; overflow: hidden;
  }
  .vm-card.vision { background: var(--ink2); }
  .vm-card.mission { background: var(--cream); border: 1px solid var(--border); }
  .vm-icon { font-size: 2.5rem; margin-bottom: 1.5rem; }
  .vm-title {
    font-family: var(--font-display); font-size: 1.4rem; font-weight: 800;
    letter-spacing: -0.5px; margin-bottom: 1rem;
  }
  .vm-card.vision .vm-title { color: var(--gold); }
  .vm-card.mission .vm-title { color: var(--ink); }
  .vm-card.vision p { color: rgba(255,255,255,0.6); line-height: 1.7; }
  .vm-card.mission p { color: var(--muted); line-height: 1.7; }

  /* PROBLEM */
  .problem-section { background: var(--cream); }
  .problem-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; margin-top: 4rem; }
  .problem-list { display: flex; flex-direction: column; gap: 1rem; }
  .problem-item {
    display: flex; align-items: flex-start; gap: 1rem;
    background: #fff; padding: 1.2rem 1.5rem; border-radius: 12px;
    border: 1px solid var(--border);
  }
  .prob-icon { font-size: 1.3rem; flex-shrink: 0; }
  .prob-text { font-size: 0.95rem; color: var(--ink); line-height: 1.5; }
  .solution-box {
    background: var(--teal); border-radius: 20px; padding: 3rem;
    color: #fff;
  }
  .solution-box h3 { font-family: var(--font-display); font-size: 1.6rem; font-weight: 800; margin-bottom: 1.2rem; letter-spacing: -0.5px; }
  .solution-box p { color: rgba(255,255,255,0.8); line-height: 1.7; font-size: 1rem; margin-bottom: 1.5rem; }
  .solution-btn {
    display: inline-block; background: #fff; color: var(--teal);
    padding: 12px 28px; border-radius: 8px; font-weight: 700; font-family: var(--font-body);
    font-size: 0.95rem; border: none; cursor: pointer; transition: transform 0.15s;
  }
  .solution-btn:hover { transform: translateY(-2px); }

  /* DIFFERENT */
  .different-section { background: #fff; }
  .diff-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin-top: 3rem; }
  .diff-card {
    background: var(--cream); border-radius: 16px; padding: 2rem;
    border: 1px solid var(--border); display: flex; gap: 1.2rem;
    transition: transform 0.2s;
  }
  .diff-card:hover { transform: translateY(-3px); }
  .diff-num {
    font-family: var(--font-display); font-size: 2rem; font-weight: 800;
    color: var(--teal); opacity: 0.3; line-height: 1; flex-shrink: 0;
  }
  .diff-content h4 { font-family: var(--font-display); font-size: 1rem; font-weight: 700; color: var(--ink); margin-bottom: 0.4rem; }
  .diff-content p { font-size: 0.88rem; color: var(--muted); line-height: 1.6; }

  /* FOUNDER */
  .founder-section { background: var(--ink2); }
  .founder-inner { max-width: 780px; margin: 0 auto; text-align: center; }
  .founder-quote-mark { font-family: var(--font-display); font-size: 6rem; color: var(--gold); opacity: 0.3; line-height: 0.5; margin-bottom: 2rem; }
  .founder-quote {
    font-size: clamp(1.1rem, 1.5vw, 1.35rem); line-height: 1.75;
    color: rgba(255,255,255,0.8); font-weight: 300; font-style: italic;
    margin-bottom: 2.5rem;
  }
  .founder-name { font-family: var(--font-display); font-size: 1rem; font-weight: 700; color: var(--gold); }
  .founder-role { font-size: 0.85rem; color: rgba(255,255,255,0.4); margin-top: 4px; }

  /* CLOSING */
  .closing-section { background: var(--cream); text-align: center; padding: 96px 5%; }
  .closing-section h2 {
    font-family: var(--font-display); font-size: clamp(2rem, 4vw, 3.5rem);
    font-weight: 800; letter-spacing: -1.5px; color: var(--ink); margin-bottom: 1.2rem;
  }
  .closing-section h2 em { color: var(--teal); font-style: normal; }
  .closing-section p { font-size: 1.1rem; color: var(--muted); margin-bottom: 2rem; }

  /* FOOTER */
  footer {
    background: var(--ink); color: rgba(255,255,255,0.5);
    padding: 40px 5%; display: flex; justify-content: space-between; align-items: center;
    font-size: 0.85rem;
  }
  .footer-logo { font-family: var(--font-display); font-size: 1.2rem; font-weight: 800; color: #fff; }
  .footer-logo span { color: var(--teal); }

  @media (max-width: 900px) {
    .offers-grid { grid-template-columns: 1fr 1fr; }
    .what-is-grid, .problem-grid, .vm-grid { grid-template-columns: 1fr; gap: 2.5rem; }
    .steps { flex-wrap: wrap; gap: 2rem; }
    .steps::before { display: none; }
    .step { flex: 0 0 40%; }
    .why-grid, .diff-grid { grid-template-columns: 1fr; }
    .hero-stats { gap: 2rem; flex-wrap: wrap; }
  }
  @media (max-width: 700px) {
    .nav-links { display: none; flex-direction: column; position: fixed; top: 68px; left: 0; right: 0;
      background: rgba(245,242,235,0.98); backdrop-filter: blur(12px);
      padding: 1.5rem 5% 2rem; gap: 0.5rem; border-bottom: 1px solid var(--border);
      z-index: 99;
    }
    .nav-links.open { display: flex; }
    .nav-links button { width: 100%; text-align: left; padding: 10px 0; font-size: 1.05rem; opacity: 0.8; }
    .nav-cta { padding: 12px 0; text-align: left; background: none; color: var(--teal); font-size: 1.05rem; }
    .nav-cta:hover { background: none; color: var(--teal-light); }
    .nav-hamburger { display: flex; }
    .offers-grid { grid-template-columns: 1fr; }
    .step { flex: 0 0 100%; }
    nav { padding: 0 4%; }
  }
`;