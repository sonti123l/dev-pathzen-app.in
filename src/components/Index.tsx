import { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { style } from "~/helpers/constants/style";

const NavBar = ({ page, setPage, onJoin }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const handleNav = (dest) => {
    setPage(dest);
    setMenuOpen(false);
  };

  return (
    <nav className={scrolled ? "scrolled" : ""}>
      <div className="nav-logo" onClick={() => handleNav("home")}>
        Path<span>Zen</span>
      </div>
      <div className={`nav-links${menuOpen ? " open" : ""}`}>
        <button
          className={page === "home" ? "active" : ""}
          onClick={() => handleNav("home")}
        >
          Home
        </button>
        <button
          className={page === "about" ? "active" : ""}
          onClick={() => handleNav("about")}
        >
          About
        </button>
        <button
          onClick={() => {
            handleNav("home");
            setTimeout(
              () =>
                document
                  .getElementById("offers")
                  ?.scrollIntoView({ behavior: "smooth" }),
              100,
            );
          }}
        >
          Programs
        </button>
        <button
          className="nav-cta"
          onClick={() => onJoin({ to: "/login" })}
        >
          Join PathZen
        </button>
      </div>
      <button
        className={`nav-hamburger${menuOpen ? " open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>
    </nav>
  );
};

const Footer = ({ setPage }) => (
  <footer>
    <div className="footer-logo">
      Path<span>Zen</span>
    </div>
    <div>© 2026 PathZen. All rights reserved.</div>
    <div style={{ display: "flex", gap: "1.5rem" }}>
      <span style={{ cursor: "pointer" }} onClick={() => setPage("home")}>
        Home
      </span>
      <span style={{ cursor: "pointer" }} onClick={() => setPage("about")}>
        About
      </span>
      <span>Contact</span>
    </div>
  </footer>
);

// ─── HOME PAGE ─────────────────────────────────────────────────────────────────
const HomePage = ({ setPage, navigate }) => {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg-pattern" />
        <div className="hero-glow" />
        <div className="hero-glow2" />
        <div className="hero-inner">
          <div className="hero-tag">
            <span className="dot"></span> India's Career Clarity Platform
          </div>
          <h2>
            Your Career.
            <br />
            Your Path.
            <br />
            <em>Your Zen.</em>
          </h2>
          <p className="hero-sub">
            PathZen helps engineering students discover the right career path
            and prepare for real industry roles through structured mentorship,
            skill training, and practical guidance.
          </p>
          <div className="hero-btns">
            <button
              className="btn-primary"
              onClick={() => navigate({ to: "/login" })}
            >
              Get Started
            </button>
            <button className="btn-outline" onClick={() => setPage("about")}>
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* WHAT IS PATHZEN */}
      <section className="what-is">
        <div className="section-inner">
          <p className="section-tag">What is PathZen?</p>
          <div className="what-is-grid">
            <div className="what-is-text">
              <h2 className="section-title">
                Bridging College Education & Industry Reality
              </h2>
              <p>
                PathZen is a student-focused career development platform
                designed to close the gap between what colleges teach and what
                industries actually expect from new hires.
              </p>
              <p>
                We guide students to choose the right career path based on their
                interests, strengths, and market demand — so they stop guessing
                and start growing.
              </p>
              <button
                className="btn-primary"
                style={{ marginTop: "1rem" }}
                onClick={() => setPage("about")}
              >
                Our Story →
              </button>
            </div>
            <div className="what-is-visual">
              {[
                {
                  icon: "🎯",
                  title: "Interest-Based Matching",
                  sub: "Discover what truly fits you",
                },
                {
                  icon: "📊",
                  title: "Market Demand Analysis",
                  sub: "Align with industry trends",
                },
                {
                  icon: "🏆",
                  title: "Strength Assessment",
                  sub: "Build on what you're good at",
                },
                {
                  icon: "🚀",
                  title: "Clear Roadmap",
                  sub: "Step-by-step path to employment",
                },
              ].map((c, i) => (
                <div className="visual-card" key={i}>
                  <div className="vc-icon">{c.icon}</div>
                  <div className="vc-text">
                    <div className="vc-title">{c.title}</div>
                    <div className="vc-sub">{c.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE OFFER */}
      <section className="offers" id="offers">
        <div className="section-inner">
          <p className="section-tag">What We Offer</p>
          <h2 className="section-title">
            Everything You Need
            <br />
            to Land Your First Role
          </h2>
          <div className="offers-grid">
            {[
              {
                icon: "🗺️",
                title: "Career Path Guidance",
                desc: "We help you choose the right domain — Software Development, Data Science, UI/UX, or Core Engineering.",
              },
              {
                icon: "📚",
                title: "Skill Development",
                desc: "Structured learning modules designed around real industry needs, not outdated syllabi.",
              },
              {
                icon: "👤",
                title: "1-on-1 Mentorship",
                desc: "Personalized guidance from experienced industry mentors who've walked your path.",
              },
              {
                icon: "📈",
                title: "Progress Tracking",
                desc: "Continuous evaluation and feedback to ensure you're always improving and on track.",
              },
              {
                icon: "💼",
                title: "Placement Preparation",
                desc: "Resume building, mock interviews, and real-world project experience to make you job-ready.",
              },
              {
                icon: "⚡",
                title: "Structured Roadmap",
                desc: "No more confusion. A time-saving, clear roadmap from where you are to where you want to be.",
              },
            ].map((o, i) => (
              <div className="offer-card" key={i}>
                <div className="offer-icon">{o.icon}</div>
                <div className="offer-title">{o.title}</div>
                <p className="offer-desc">{o.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-it-works">
        <div className="section-inner">
          <p className="section-tag">How It Works</p>
          <h2 className="section-title">
            Five Steps to
            <br />
            Career Clarity
          </h2>
          <p className="section-sub">
            A proven process that takes you from confusion to confidence in the
            most efficient way possible.
          </p>
          <div className="steps">
            {[
              {
                num: "01",
                title: "Assessment",
                desc: "Understand your interests, strengths & career personality",
              },
              {
                num: "02",
                title: "Guidance",
                desc: "Choose the right career domain with expert support",
              },
              {
                num: "03",
                title: "Training",
                desc: "Learn the exact skills your target industry demands",
              },
              {
                num: "04",
                title: "Mentorship",
                desc: "Get ongoing 1-on-1 support from industry experts",
              },
              {
                num: "05",
                title: "Placement Prep",
                desc: "Interview, apply, and become truly job-ready",
              },
            ].map((s, i) => (
              <div className="step" key={i}>
                <div className="step-num">{s.num}</div>
                <div className="step-title">{s.title}</div>
                <p className="step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="why-choose">
        <div className="section-inner">
          <p className="section-tag">Why PathZen?</p>
          <h2 className="section-title">
            Built Different,
            <br />
            For a Reason
          </h2>
          <div className="why-grid">
            {[
              {
                title: "Clear Career Direction",
                desc: "No more confusion about what to pursue — we give you a definitive, researched answer.",
              },
              {
                title: "Industry-Relevant Skills",
                desc: "We teach only what hiring managers actually look for, not outdated academic content.",
              },
              {
                title: "Personalized Mentorship",
                desc: "Every student gets individual attention and guidance tailored to their unique profile.",
              },
              {
                title: "Real-World Preparation",
                desc: "Mock interviews, live projects, and portfolio reviews that mirror actual hiring processes.",
              },
              {
                title: "Time-Saving Roadmap",
                desc: "A structured plan means zero time wasted on irrelevant courses or wrong directions.",
              },
              {
                title: "Student-First Philosophy",
                desc: "We measure our success by your placement, not by enrollment numbers.",
              },
            ].map((w, i) => (
              <div className="why-item" key={i}>
                <div className="why-check">✓</div>
                <div className="why-text">
                  <div className="why-title">{w.title}</div>
                  <p className="why-desc">{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="cta-banner" id="cta">
        <div className="cta-inner">
          <h2>Start Your Career Journey Today</h2>
          <p>
            Take the first step toward your dream job. Join PathZen and get the
            clarity you've been looking for.
          </p>
          <button
            className="btn-white"
            onClick={() => navigate({ to: "/login" })}
          >
            Join Now
          </button>
        </div>
      </div>
    </>
  );
};

// ─── ABOUT PAGE ────────────────────────────────────────────────────────────────
const AboutPage = ({ setPage, navigate }) => (
  <>
    {/* ABOUT HERO */}
    <section className="about-hero">
      <div className="hero-bg-pattern" />
      <div className="hero-glow" />
      <div
        className="section-inner"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div className="about-hero-tag">
          <span className="tag-pill">Est. 2026</span>
          <span className="tag-pill">India-Focused</span>
          <span className="tag-pill">Student-First</span>
        </div>
        <h1>
          We Don't Just Guide
          <br />
          Careers — We Build <em>Futures.</em>
        </h1>
        <p>
          PathZen is a career development initiative focused on helping students
          make the right decisions and become genuinely industry-ready — not
          just technically, but mentally and professionally.
        </p>
      </div>
    </section>

    {/* VISION & MISSION */}
    <section className="vm-section">
      <div className="section-inner">
        <p className="section-tag">Our Foundation</p>
        <h2 className="section-title">Vision & Mission</h2>
        <div className="vm-grid">
          <div className="vm-card vision">
            <div className="vm-icon">🔭</div>
            <div className="vm-title">Our Vision</div>
            <p>
              To become India's most trusted career guidance platform — the one
              students turn to first when they're unsure about their future,
              knowing they'll leave with clarity and a plan.
            </p>
          </div>
          <div className="vm-card mission">
            <div className="vm-icon">🎯</div>
            <div className="vm-title">Our Mission</div>
            <p>
              To provide structured guidance, practical skills, and mentorship
              that enables students to confidently enter the professional world
              — without wasting years figuring it out alone.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* THE PROBLEM */}
    <section className="problem-section">
      <div className="section-inner">
        <p className="section-tag">The Problem We Solve</p>
        <h2 className="section-title">Why PathZen Exists</h2>
        <div className="problem-grid">
          <div className="problem-list">
            {[
              {
                icon: "😕",
                text: "Students don't know which career to choose from dozens of options",
              },
              {
                icon: "🐑",
                text: "Many follow peers or family pressure without personal clarity",
              },
              {
                icon: "📉",
                text: "College education rarely aligns with what industries actually need",
              },
              {
                icon: "😰",
                text: "Most students feel completely unprepared when placement season arrives",
              },
            ].map((p, i) => (
              <div className="problem-item" key={i}>
                <div className="prob-icon">{p.icon}</div>
                <p className="prob-text">{p.text}</p>
              </div>
            ))}
          </div>
          <div className="solution-box">
            <h3>PathZen Is the Solution</h3>
            <p>
              We built PathZen to tackle each of these problems head-on. Our
              platform provides a structured, personalized, and proven system
              that takes students from confusion to employment-readiness.
            </p>
            <p>
              Every resource, mentor, and module we offer is designed with a
              singular goal: your successful placement in a role that actually
              fits you.
            </p>
            <button className="solution-btn" onClick={() => setPage("home")}>
              See How It Works →
            </button>
          </div>
        </div>
      </div>
    </section>

    {/* WHAT MAKES US DIFFERENT */}
    <section className="different-section">
      <div className="section-inner">
        <p className="section-tag">What Makes Us Different</p>
        <h2 className="section-title">
          Our Approach to
          <br />
          Career Development
        </h2>
        <p className="section-sub">
          We believe every student is unique. Instead of a one-size-fits-all
          method, we guide based on personal interests, skills, and goals.
        </p>
        <div className="diff-grid">
          {[
            {
              title: "Individual Focus",
              desc: "Every student gets a personalized assessment and custom roadmap — not a generic curriculum.",
            },
            {
              title: "Practical Over Theory",
              desc: "We prioritize hands-on learning, real projects, and industry exposure over textbook knowledge.",
            },
            {
              title: "Mentor-Led Growth",
              desc: "Our mentors aren't just teachers — they're active professionals who guide from lived experience.",
            },
            {
              title: "Career-Centric Training",
              desc: "Every skill, every module, every session is aligned with a specific placement outcome.",
            },
          ].map((d, i) => (
            <div className="diff-card" key={i}>
              <div className="diff-num">0{i + 1}</div>
              <div className="diff-content">
                <h4>{d.title}</h4>
                <p>{d.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* FOUNDER'S NOTE */}
    <section className="founder-section">
      <div className="section-inner">
        <div className="founder-inner">
          <div className="founder-quote-mark">"</div>
          <p className="founder-quote">
            PathZen was created with a vision to simplify career decisions for
            students. Having observed the confusion and lack of guidance among
            students, we built PathZen to provide clarity, direction, and real
            opportunities. We don't want any student to lose precious years
            wondering what to do next.
          </p>
          <div className="founder-name">Founder, PathZen</div>
          <div className="founder-role">
            Career Development Platform · India
          </div>
        </div>
      </div>
    </section>

    {/* CLOSING */}
    <div className="closing-section">
      <div className="section-inner">
        <h2>
          At PathZen, we don't just
          <br />
          guide careers — we build <em>futures.</em>
        </h2>
        <p>Join thousands of students who found their path with PathZen.</p>
        <button
          className="btn-primary"
          style={{ fontSize: "1.05rem", padding: "16px 40px" }}
          onClick={() => navigate({ to: "/get-started" })}
        >
          Start Your Journey Today
        </button>
      </div>
    </div>
  </>
);

// ─── APP ───────────────────────────────────────────────────────────────────────
export default function PathZenApp() {
  const [page, setPage] = useState("home");
  const navigate = useNavigate();

  const switchPage = (p) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setPage(p);
  };

  return (
    <>
      <style>{style}</style>
      <NavBar page={page} setPage={switchPage} onJoin={navigate} />
      {page === "home" ? (
        <HomePage setPage={switchPage} navigate={navigate} />
      ) : (
        <AboutPage setPage={switchPage} navigate={navigate} />
      )}
      <Footer setPage={switchPage} />
    </>
  );
}
