"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/* ──────────────────────── nav items ──────────────────────── */
const NAV_ITEMS = [
  { id: "summary", label: "Summary" },
  { id: "audit", label: "Audit" },
  { id: "algorithm", label: "Algorithm" },
  { id: "market", label: "Market" },
  { id: "niche", label: "Niche" },
  { id: "competition", label: "Competition" },
  { id: "portfolio", label: "Portfolio" },
  { id: "profile", label: "Profile" },
  { id: "action", label: "Action Plan" },
  { id: "keywords", label: "Keywords" },
];

/* ──────────────────────── main page ──────────────────────── */
export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("hero");
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedField, setCopiedField] = useState("");
  const revealRefs = useRef<Set<Element>>(new Set());

  const revealCallback = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
      }
    });
  }, []);

  useEffect(() => {
    const revealObserver = new IntersectionObserver(revealCallback, {
      rootMargin: "0px 0px -60px 0px",
      threshold: 0.1,
    });

    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach((el) => {
      revealObserver.observe(el);
      revealRefs.current.add(el);
    });

    const allSections = [{ id: "hero" }, ...NAV_ITEMS];
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    allSections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) sectionObserver.observe(el);
    });

    const handleScroll = () => {
      setNavScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      revealObserver.disconnect();
      sectionObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [revealCallback]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const copyText = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(""), 2000);
  };

  const newTitle = "AI Engineer | LLM Apps, RAG Systems & SaaS";
  const newBio = `I build production-grade AI systems that drive revenue - LLM applications, RAG pipelines, and AI-powered SaaS platforms. 100% Job Success across 47 projects and $100K+ earned on Upwork.

What I Deliver:

AI AUTONOMOUS AGENTS & LLM APPLICATIONS
Custom agent systems using LangChain, OpenAI, and custom workflows. Built AI-powered directory platform with bulk posting automation ($12K project). Delivered enterprise-grade RAG pipelines with vector search, memory workflows, and tool integrations.

AI-POWERED SaaS PLATFORMS (SHIPPED, NOT PROTOTYPED)
Web3 & Fintech MVP: Loyalty platform with AI-driven optimization across multiple sprints
Property Automation: Django/React platform with enterprise API integrations (Yardi, Gmail, Outlook)
Airbyte Connector: IFS ERP to Databricks Lakehouse integration for enterprise data pipelines
OhmConnect: $72K contract, 2,920 hours - Python automation and Microsoft/Twilio integrations

ENTERPRISE EXPERIENCE
Senior Full-Stack Engineer at edX serving millions of learners globally
Lead Full Stack Engineer at Strada.ai building property automation
Associated with CodeFulcrum agency (8,400+ hours, 100% JSS, Top Rated Plus)

Stack: Next.js, React, Node.js, Python, Django, FastAPI, PostgreSQL, AWS, LangChain, OpenAI API, RAG, Vector DBs, Pinecone, LlamaIndex

100% Job Success | Top Rated | $100K+ on Upwork | 47 Completed Jobs
I respond within 4-8 hours. Send me your project details.`;

  const newSkills = [
    "AI Agent Development", "Python", "LangChain", "OpenAI API", "Generative AI",
    "RAG", "Machine Learning", "React", "Full-Stack Development", "SaaS Development",
    "Django", "PostgreSQL", "Amazon Web Services", "Node.js", "AI Chatbot Development",
  ];

  const employmentHistory = `CodeFulcrum (via Agency) - Full Stack Developer
8,400+ hours billed through agency | 100% JSS | Top Rated Plus
Built enterprise SaaS platforms, AI integrations, and automation systems for US-based clients.

edX - Senior Full-Stack Engineer (Contract)
Contributed to the Open edX platform serving millions of learners globally.
Stack: Python, Django, React, PostgreSQL, AWS

Strada.ai - Lead Full Stack Engineer
Led development of property automation platform with enterprise API integrations.
Stack: Django, React, Yardi API, Gmail/Outlook integrations

OhmConnect - Python Developer (Long-term Contract)
$72K contract, 2,920 hours. Built Python automation systems with Microsoft and Twilio integrations.`;

  return (
    <div>
      {/* ─── Navigation ─── */}
      <nav className={`navbar ${navScrolled ? "nav-scrolled" : ""}`}>
        <div className="nav-inner">
          <div className="nav-brand">
            <div className="nav-logo">HH</div>
            <span className="nav-title hidden sm:inline">Upwork Strategy Dashboard</span>
          </div>

          {/* Desktop nav */}
          <div className="nav-links">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => { e.preventDefault(); scrollTo(item.id); }}
                className={activeSection === item.id ? "active" : ""}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {mobileMenuOpen ? (
                <>
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="6" y1="18" x2="18" y2="6" />
                </>
              ) : (
                <>
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        <div className={`mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => { e.preventDefault(); scrollTo(item.id); }}
              className={activeSection === item.id ? "active" : ""}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section id="hero" className="hero">
        <div className="reveal">
          <span className="hero-badge">APRIL 2026</span>
        </div>
        <h1 className="reveal">
          Upwork Profile<br />
          Optimization &amp; Market Strategy
        </h1>
        <p className="reveal subtitle">
          Prepared for <strong>Hammad H.</strong> &mdash; Full Overhaul
        </p>
        <div className="hero-stats reveal">
          {[
            { value: "100%", label: "Job Success" },
            { value: "$100K+", label: "Earned" },
            { value: "46/80", label: "Profile Score" },
            { value: "109%", label: "AI Demand Growth" },
          ].map((stat) => (
            <div key={stat.label} className="hero-stat">
              <div className="value">{stat.value}</div>
              <div className="label">{stat.label}</div>
            </div>
          ))}
        </div>
        <div className="reveal">
          <a
            href="#summary"
            onClick={(e) => { e.preventDefault(); scrollTo("summary"); }}
            className="hero-cta"
          >
            View Full Analysis
          </a>
        </div>
      </section>

      {/* ═══════════════════ 01 EXECUTIVE SUMMARY ═══════════════════ */}
      <section id="summary" className="section">
        <div className="section-header reveal">
          <span className="section-number">01</span>
          <h2 className="section-title">Executive Summary</h2>
          <p className="section-subtitle">The core problem and the path forward</p>
        </div>

        <div className="reveal" style={{ marginBottom: 32 }}>
          <div className="alert alert-warning">
            <div className="alert-icon">!</div>
            <div>
              <span className="alert-title">Critical Issue: </span>
              Profile has strong credentials (100% JSS, Top Rated, $100K+) but broken positioning, keyword spam, and a rate that signals commodity work. Six critical issues identified.
            </div>
          </div>
        </div>

        <div className="cards-grid cards-3 reveal-stagger">
          <div className="card card-border-red reveal">
            <div className="card-icon">&#128680;</div>
            <h3>Root Cause</h3>
            <p>
              Profile identity crisis - title tries to cover AI/ML + Full Stack + Python + React. Skills section has 50+ repeated keywords (algorithmic spam). Bio uses unicode bold text that confuses UMA.
            </p>
          </div>
          <div className="card card-border-blue reveal">
            <div className="card-icon">&#129302;</div>
            <h3>Algorithm Issue</h3>
            <p>
              UMA (Llama 3.1-based AI) uses semantic understanding, not keyword density. Repeating &quot;Generative AI&quot; 5 times hurts ranking. Relevance matching (20-25% weight) is broken by keyword spam.
            </p>
          </div>
          <div className="card card-border-green reveal">
            <div className="card-icon">&#128161;</div>
            <h3>Opportunity</h3>
            <p>
              AI/ML demand on Upwork grew 109% YoY. Top AI freelancers earn $75-150/hr. With profile fixes + rate adjustment, profile score can jump from 46 to 70+ and increase invite volume 3-5x.
            </p>
          </div>
        </div>

        <div className="cards-grid cards-3 reveal-stagger" style={{ marginTop: 20 }}>
          <div className="card reveal">
            <span className="badge badge-danger">Rate Problem</span>
            <h3 style={{ marginTop: 12 }}>$40/hr = Wrong Signal</h3>
            <p>
              $40/hr with $100K+ earned and 100% JSS signals commodity work. Clients filter by rate. Moving to $75/hr aligns with market and signals expertise.
            </p>
          </div>
          <div className="card reveal">
            <span className="badge badge-strong">Market Tailwind</span>
            <h3 style={{ marginTop: 12 }}>AI Demand Surge</h3>
            <p>
              AI/ML category is the fastest-growing on Upwork. Enterprise clients have budget for AI specialists. RAG, LangChain, and agent development are the hottest sub-niches.
            </p>
          </div>
          <div className="card reveal">
            <span className="badge badge-info">Positioning Fix</span>
            <h3 style={{ marginTop: 12 }}>Niche Down to Scale Up</h3>
            <p>
              Stop being &quot;AI/ML &amp; Full Stack Developer.&quot; Become &quot;AI Engineer&quot; who also does full-stack. Lead with AI, support with SaaS delivery capability.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════ 02 CURRENT PROFILE AUDIT ═══════════════════ */}
      <div className="section-alt">
        <section id="audit" className="section">
          <div className="section-header reveal">
            <span className="section-number">02</span>
            <h2 className="section-title">Current Profile Audit</h2>
            <p className="section-subtitle">Scoring every dimension of your Upwork presence</p>
          </div>

          <div className="card reveal" style={{ marginBottom: 32 }}>
            <h3>Profile Scorecard</h3>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Dimension</th>
                    <th>Status</th>
                    <th style={{ width: 180 }}>Progress</th>
                    <th style={{ textAlign: "right" }}>Score</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { dim: "Credibility (JSS + Earnings)", status: "strong", badge: "badge-strong", score: 9, max: 10 },
                    { dim: "Title", status: "needs work", badge: "badge-broken", score: 4, max: 10 },
                    { dim: "Overview / Bio", status: "broken", badge: "badge-broken", score: 2, max: 10 },
                    { dim: "Skills Tags", status: "broken", badge: "badge-broken", score: 2, max: 10 },
                    { dim: "Rate Strategy", status: "dangerous", badge: "badge-danger", score: 2, max: 10 },
                    { dim: "Portfolio", status: "strong", badge: "badge-strong", score: 8, max: 10 },
                    { dim: "Work History", status: "strong", badge: "badge-strong", score: 8, max: 10 },
                    { dim: "Activity", status: "active", badge: "badge-good", score: 8, max: 10 },
                  ].map((row) => {
                    const pct = (row.score / row.max) * 100;
                    const barClass = pct >= 70 ? "progress-green" : pct >= 50 ? "progress-orange" : "progress-red";
                    return (
                      <tr key={row.dim}>
                        <td style={{ fontWeight: 500 }}>{row.dim}</td>
                        <td><span className={`badge ${row.badge}`}>{row.status}</span></td>
                        <td>
                          <div className="progress-bar">
                            <div className={`progress-fill ${barClass}`} style={{ width: `${pct}%` }} />
                          </div>
                        </td>
                        <td style={{ textAlign: "right", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>{row.score}/{row.max}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="scorecard-total">
              <span className="label">Total Profile Score</span>
              <span className="value">46/80</span>
            </div>
          </div>

          <div className="card reveal" style={{ marginBottom: 32 }}>
            <h3>Issues Found</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 20 }}>
              {[
                { num: 1, severity: "critical", badge: "badge-critical", title: "Keyword spam in skills & bio", desc: "50+ skills listed with duplicates. Unicode bold text in bio confuses UMA's NLP tokenizer. UMA penalizes keyword stuffing." },
                { num: 2, severity: "critical", badge: "badge-critical", title: "$40/hr rate is dangerously low", desc: "With 100% JSS and $100K+ earned, $40/hr signals commodity work. Market rate for your profile is $75-100/hr. Clients filter by rate." },
                { num: 3, severity: "high", badge: "badge-high", title: "Unicode bold text in bio", desc: "Unicode bold characters (U+1D5D4-U+1D5ED) create unknown tokens in the LLM tokenizer. UMA literally cannot read parts of your current bio." },
                { num: 4, severity: "high", badge: "badge-high", title: "Title too generic", desc: "\"AI/ML & Full Stack Developer | Python, Generative AI (LLMs, RAG) React\" - tries to rank for everything, ranks for nothing." },
                { num: 5, severity: "medium", badge: "badge-medium", title: "First 200 chars wasted", desc: "The first 200 characters of your bio are the most important for UMA matching. Currently wasted on generic filler instead of keywords + proof." },
                { num: 6, severity: "medium", badge: "badge-medium", title: "Redundant skills listed", desc: "Multiple variations of the same skill (e.g., 'Generative AI', 'Gen AI', 'AI') dilute relevance instead of strengthening it." },
                { num: 7, severity: "low", badge: "badge-low", title: "Low hourly rates in history", desc: "Some past contracts show very low rates. Can't change history but new rate positioning will offset this over time." },
              ].map((issue) => (
                <div key={issue.num} className="issue-item">
                  <div className="issue-number">{issue.num}</div>
                  <div className="issue-content">
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <span className={`badge ${issue.badge}`}>{issue.severity}</span>
                      <h4>{issue.title}</h4>
                    </div>
                    <p>{issue.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="stats-grid reveal-stagger">
            {[
              { label: "Jobs Completed", value: "47" },
              { label: "Hours Worked", value: "4,165" },
              { label: "Total Earned", value: "$100K+" },
              { label: "Job Success", value: "100%" },
            ].map((s) => (
              <div key={s.label} className="stat-card reveal">
                <div className="value">{s.value}</div>
                <div className="label">{s.label}</div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ═══════════════════ 03 UMA ALGORITHM DEEP DIVE ═══════════════════ */}
      <section id="algorithm" className="section">
        <div className="section-header reveal">
          <span className="section-number">03</span>
          <h2 className="section-title">UMA Algorithm Deep Dive</h2>
          <p className="section-subtitle">How Upwork&apos;s AI ranks your profile for every search</p>
        </div>

        <div className="keywords-container reveal" style={{ marginBottom: 32 }}>
          {["Llama 3.1 70B", "LoRA Fine-tuned", "Semantic Matching", "BM25 + Neural Hybrid", "Real-time Signals"].map((tag) => (
            <span key={tag} className="keyword-tag">{tag}</span>
          ))}
        </div>

        <div className="card reveal" style={{ marginBottom: 32 }}>
          <h3>How UMA Processes a Job Search</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 20, marginTop: 20 }}>
            {[
              { step: 1, title: "Job Posted", desc: "Client posts a job. UMA extracts intent, required skills, budget range, and project complexity." },
              { step: 2, title: "Candidate Pool", desc: "BM25 keyword matching creates initial pool of ~500 candidates from millions of profiles." },
              { step: 3, title: "Semantic Ranking", desc: "Llama 3.1 70B re-ranks using deep semantic understanding - title, bio, portfolio, and skills." },
              { step: 4, title: "Signal Boosting", desc: "Real-time signals (JSS, response time, availability, recent activity) adjust rankings." },
              { step: 5, title: "Final Ranking", desc: "Top 20-50 freelancers shown to client. Position 1-5 get 80%+ of invites and views." },
            ].map((s) => (
              <div key={s.step} className="step-item">
                <div className="step-number">{s.step}</div>
                <div>
                  <h4>{s.title}</h4>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card reveal" style={{ marginBottom: 32 }}>
          <h3>Signal Weights</h3>
          <div className="table-wrapper" style={{ marginTop: 20 }}>
            <table>
              <thead>
                <tr>
                  <th>Signal</th>
                  <th>Weight</th>
                  <th>Your Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { signal: "Job Success Score", weight: "25-30%", status: "MAXED", badge: "badge-maxed" },
                  { signal: "Relevance Match (Title + Skills + Bio)", weight: "20-25%", status: "BROKEN", badge: "badge-broken" },
                  { signal: "Recent Activity & Availability", weight: "15-20%", status: "OK", badge: "badge-ok" },
                  { signal: "Earnings & Job History", weight: "10-15%", status: "ACTIVE", badge: "badge-good" },
                  { signal: "Profile Completeness", weight: "10-15%", status: "STRONG", badge: "badge-strong" },
                  { signal: "Client Reviews & Ratings", weight: "10-15%", status: "GOOD", badge: "badge-good" },
                ].map((row) => (
                  <tr key={row.signal}>
                    <td>{row.signal}</td>
                    <td style={{ fontFamily: "'JetBrains Mono', monospace", color: "var(--text-muted)" }}>{row.weight}</td>
                    <td><span className={`badge ${row.badge}`}>{row.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="cards-grid cards-2 reveal-stagger" style={{ marginBottom: 32 }}>
          <div className="card reveal">
            <h3>JSS Calculation</h3>
            <div style={{ marginTop: 16 }}>
              {[
                { label: "Public Feedback Weight", value: "~40%" },
                { label: "Private Feedback Weight", value: "~30%" },
                { label: "Contract Outcomes", value: "~20%" },
                { label: "Long-term Relationships", value: "~10%" },
              ].map((r) => (
                <div key={r.label} className="jss-row">
                  <span className="jss-label">{r.label}</span>
                  <span className="jss-value">{r.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="card reveal">
            <h3>JSS Risk Factors</h3>
            <div style={{ marginTop: 16 }}>
              {[
                { label: "Bad Private Feedback (1-2 stars)", value: "Heavy penalty" },
                { label: "Contract Disputes", value: "Major drop" },
                { label: "No-feedback Closures", value: "Slight negative" },
                { label: "Low Earnings Contracts", value: "Less weight" },
              ].map((r) => (
                <div key={r.label} className="jss-row">
                  <span className="jss-label">{r.label}</span>
                  <span className="jss-risk">{r.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }} className="reveal">
          <div className="alert alert-info">
            <div className="alert-icon">i</div>
            <div>
              <span className="alert-title">Key Insight: </span>
              UMA is NOT a keyword matcher. It understands context and intent. A clean, focused profile with 15 precise skills will outrank a profile with 50+ spammed keywords every time.
            </div>
          </div>
          <div className="alert alert-warning">
            <div className="alert-icon">!</div>
            <div>
              <span className="alert-title">Warning: </span>
              Unicode bold text in your bio (U+1D5D4 range) creates unknown tokens in the LLM tokenizer. UMA literally cannot read parts of your current bio.
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ 04 MARKET & RATE ANALYSIS ═══════════════════ */}
      <div className="section-alt">
        <section id="market" className="section">
          <div className="section-header reveal">
            <span className="section-number">04</span>
            <h2 className="section-title">Market &amp; Rate Analysis</h2>
            <p className="section-subtitle">Where you stand vs. where you should be</p>
          </div>

          <div className="card reveal" style={{ marginBottom: 32 }}>
            <h3>Rate Comparison</h3>
            <div className="table-wrapper" style={{ marginTop: 20 }}>
              <table>
                <thead>
                  <tr>
                    <th>Tier</th>
                    <th>Rate Range</th>
                    <th>Profile</th>
                    <th>You</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { tier: "Pakistan Average", range: "$25-40/hr", profile: "General full-stack, mixed reviews", you: "current" },
                    { tier: "Pakistan AI Specialist", range: "$60-100/hr", profile: "AI-focused, strong JSS", you: "" },
                    { tier: "Global AI Engineer", range: "$120-250/hr", profile: "US/EU based, deep AI portfolio", you: "" },
                    { tier: "Global Top Rated", range: "$150-300/hr", profile: "Top Rated Plus, $500K+ earned", you: "" },
                  ].map((row) => (
                    <tr key={row.tier} className={row.you === "current" ? "highlight-row" : ""}>
                      <td style={{ fontWeight: 500 }}>{row.tier}</td>
                      <td style={{ fontFamily: "'JetBrains Mono', monospace" }}>{row.range}</td>
                      <td style={{ color: "var(--text-muted)" }}>{row.profile}</td>
                      <td>
                        {row.you === "current" && <span className="badge badge-danger">You are here</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="cards-grid cards-3 reveal-stagger" style={{ marginBottom: 32 }}>
            {[
              { label: "Profile Rate", rate: "$75/hr", desc: "What shows on your profile. Signals senior expertise.", tag: "Recommended" },
              { label: "Proposal Range", rate: "$60-85/hr", desc: "Flex range for proposals. Adjust based on project size and client budget.", tag: "Flexible" },
              { label: "Fixed-Price Projects", rate: "$5K-25K+", desc: "For enterprise AI builds. Value-based pricing on fixed scope projects.", tag: "Volume Play" },
            ].map((c) => (
              <div key={c.label} className="rate-card reveal">
                <span className="badge badge-info" style={{ marginBottom: 12, display: "inline-flex" }}>{c.tag}</span>
                <div className="rate-label">{c.label}</div>
                <div className="rate-value">{c.rate}</div>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>

          <div className="card reveal">
            <h3>AI Demand Growth (YoY)</h3>
            <div style={{ marginTop: 20 }}>
              {[
                { category: "AI Video", growth: 329, color: "var(--accent)" },
                { category: "AI Integration", growth: 178, color: "var(--blue)" },
                { category: "AI Annotation", growth: 154, color: "var(--purple)" },
                { category: "AI Overall", growth: 109, color: "var(--accent)" },
                { category: "AI Chatbot", growth: 71, color: "var(--teal)" },
              ].map((bar) => (
                <div key={bar.category} className="demand-row">
                  <div className="demand-header">
                    <span className="demand-label">{bar.category}</span>
                    <span className="demand-value">+{bar.growth}%</span>
                  </div>
                  <div className="demand-bar">
                    <div
                      className="demand-fill"
                      style={{ width: `${Math.min((bar.growth / 329) * 100, 100)}%`, background: bar.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ═══════════════════ 05 NICHE KEYWORDS ═══════════════════ */}
      <section id="niche" className="section">
        <div className="section-header reveal">
          <span className="section-number">05</span>
          <h2 className="section-title">Niche Keywords</h2>
          <p className="section-subtitle">Exact terms to target in your title, bio, and proposals</p>
        </div>

        <div className="card reveal" style={{ marginBottom: 32 }}>
          <h3>Primary Keywords</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 20 }}>
            {[
              { keyword: "AI Engineer", desc: "Broadest high-value term. Should be first words in your title." },
              { keyword: "LLM Application Development", desc: "Covers ChatGPT, Claude, GPT-4 integration projects." },
              { keyword: "RAG Systems", desc: "Retrieval-Augmented Generation - hottest AI sub-niche on Upwork." },
              { keyword: "AI Agent Development", desc: "Autonomous agents, tool-using AI - fastest growing category (420% YoY)." },
              { keyword: "AI SaaS", desc: "AI-powered software products - signals you ship, not just prototype." },
            ].map((kw) => (
              <div key={kw.keyword} className="keyword-row">
                <span className="keyword-name" style={{ fontWeight: 600 }}>{kw.keyword}</span>
                <span style={{ color: "var(--text-muted)", fontSize: 14 }}>{kw.desc}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card reveal" style={{ marginBottom: 32 }}>
          <h3>Secondary Keywords</h3>
          <div className="keywords-container" style={{ marginTop: 20 }}>
            {[
              "LangChain", "OpenAI API", "Python", "FastAPI", "Django",
              "React", "Next.js", "Node.js", "PostgreSQL", "AWS",
              "Vector Database", "Pinecone", "LlamaIndex", "Chatbot Development",
              "Full-Stack Development", "SaaS Development", "API Integration",
            ].map((kw) => (
              <span key={kw} className="keyword-tag">{kw}</span>
            ))}
          </div>
        </div>

        <div className="card reveal">
          <h3>Long-tail Sniper Keywords</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 20 }}>
            {[
              { keyword: "build AI agent with LangChain", competition: "low" },
              { keyword: "RAG pipeline with Pinecone", competition: "low" },
              { keyword: "LLM integration into SaaS", competition: "low" },
              { keyword: "AI chatbot for customer support", competition: "medium" },
              { keyword: "GPT-4 API integration", competition: "medium" },
              { keyword: "AI-powered automation system", competition: "low" },
              { keyword: "custom LLM fine-tuning", competition: "medium" },
            ].map((kw) => (
              <div key={kw.keyword} className="keyword-row">
                <span style={{ color: "var(--text)", fontSize: 14 }}>{kw.keyword}</span>
                <span className={`badge ${kw.competition === "low" ? "badge-strong" : "badge-warning"}`}>{kw.competition} competition</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ 06 COMPETITION ═══════════════════ */}
      <div className="section-alt">
        <section id="competition" className="section">
          <div className="section-header reveal">
            <span className="section-number">06</span>
            <h2 className="section-title">Competition</h2>
            <p className="section-subtitle">How you compare to top AI freelancers on Upwork</p>
          </div>

          <div className="stats-grid reveal-stagger" style={{ marginBottom: 32 }}>
            {[
              { label: "AI Freelancers (Active)", value: "12K+" },
              { label: "Top Rated in AI", value: "~800" },
              { label: "Earning $75+/hr", value: "~350" },
              { label: "100% JSS in AI", value: "~200" },
            ].map((s) => (
              <div key={s.label} className="stat-card reveal">
                <div className="value">{s.value}</div>
                <div className="label">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="card reveal" style={{ marginBottom: 32 }}>
            <h3>Competitor Landscape</h3>
            <div className="table-wrapper" style={{ marginTop: 20 }}>
              <table style={{ minWidth: 650 }}>
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Rate</th>
                    <th>Strengths</th>
                    <th>Weakness</th>
                    <th>Threat</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { type: "US/EU AI Specialists", rate: "$100-200/hr", strengths: "Native English, timezone", weakness: "Often academic, not shipping", threat: "Medium" },
                    { type: "Indian AI Agencies", rate: "$25-50/hr", strengths: "Low rates, team depth", weakness: "Quality variance, comms", threat: "Low" },
                    { type: "Pakistani AI Devs", rate: "$20-45/hr", strengths: "Direct competitors", weakness: "Few focused on AI niche", threat: "High" },
                    { type: "Eastern EU Freelancers", rate: "$50-90/hr", strengths: "Strong technical skills", weakness: "Less AI-specific work", threat: "Medium" },
                  ].map((row) => (
                    <tr key={row.type}>
                      <td style={{ fontWeight: 500 }}>{row.type}</td>
                      <td style={{ fontFamily: "'JetBrains Mono', monospace" }}>{row.rate}</td>
                      <td style={{ color: "var(--text-muted)" }}>{row.strengths}</td>
                      <td style={{ color: "var(--text-muted)" }}>{row.weakness}</td>
                      <td><span className={`badge ${row.threat === "High" ? "badge-danger" : row.threat === "Medium" ? "badge-warning" : "badge-strong"}`}>{row.threat}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="reveal">
            <div className="alert alert-info">
              <div className="alert-icon">i</div>
              <div>
                <span className="alert-title">Key Insight: </span>
                Your biggest competitive advantage is the combination of 100% JSS + $100K+ earned + AI specialization. Very few Pakistani freelancers have this trifecta. At $75/hr, you&apos;re still 30-50% cheaper than US/EU competitors with similar credentials.
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ═══════════════════ 07 PORTFOLIO ASSETS ═══════════════════ */}
      <section id="portfolio" className="section">
        <div className="section-header reveal">
          <span className="section-number">07</span>
          <h2 className="section-title">Portfolio Assets</h2>
          <p className="section-subtitle">Curated projects that prove your AI expertise</p>
        </div>

        <div className="reveal" style={{ marginBottom: 24 }}>
          <h3 className="tier-title">TIER 1 <span className="tier-subtitle">- Lead with these (show first)</span></h3>
        </div>
        <div className="cards-grid cards-2 reveal-stagger" style={{ marginBottom: 32 }}>
          {[
            {
              title: "AI-Powered Directory Platform",
              desc: "Built AI-powered directory with bulk posting automation, content generation, and intelligent categorization. $12K project.",
              tags: ["LangChain", "OpenAI", "Python", "React", "PostgreSQL"],
            },
            {
              title: "Enterprise RAG Pipeline",
              desc: "Production RAG system with vector search, memory workflows, tool integrations, and multi-source document ingestion.",
              tags: ["RAG", "Pinecone", "LlamaIndex", "FastAPI", "AWS"],
            },
            {
              title: "Web3 & Fintech MVP",
              desc: "Loyalty platform with AI-driven optimization across multiple sprints. Web3 integration with full-stack delivery.",
              tags: ["React", "Node.js", "Web3", "AI Optimization"],
            },
          ].map((p) => (
            <div key={p.title} className="portfolio-card reveal">
              <h4>{p.title}</h4>
              <p>{p.desc}</p>
              <div className="keywords-container">
                {p.tags.map((tag) => (
                  <span key={tag} className="keyword-tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="reveal" style={{ marginBottom: 24 }}>
          <h3 className="tier-title">TIER 2 <span className="tier-subtitle">- Supporting evidence</span></h3>
        </div>
        <div className="cards-grid cards-2 reveal-stagger" style={{ marginBottom: 32 }}>
          {[
            {
              title: "Strada.ai - Property Automation",
              desc: "Lead Full Stack Engineer. Django/React platform with Yardi, Gmail, Outlook API integrations.",
              tags: ["Django", "React", "REST API", "Yardi"],
            },
            {
              title: "AI Chatbot with Twilio",
              desc: "Customer support chatbot with Twilio integration, natural language understanding, and automated routing.",
              tags: ["Python", "Twilio", "OpenAI", "Chatbot"],
            },
            {
              title: "Airbyte Connector - IFS ERP",
              desc: "Custom Airbyte connector for IFS ERP to Databricks Lakehouse integration. Enterprise data pipeline.",
              tags: ["Python", "Airbyte", "Databricks", "ETL"],
            },
          ].map((p) => (
            <div key={p.title} className="portfolio-card reveal">
              <h4>{p.title}</h4>
              <p>{p.desc}</p>
              <div className="keywords-container">
                {p.tags.map((tag) => (
                  <span key={tag} className="keyword-tag-muted keyword-tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="reveal">
          <div className="alert alert-danger">
            <div className="alert-icon">!</div>
            <div>
              <span className="alert-title">Do NOT add: </span>
              Generic WordPress sites, simple landing pages, or non-AI projects that dilute your positioning. Keep portfolio focused on AI, SaaS, and enterprise work only.
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ 08 REWRITTEN PROFILE ═══════════════════ */}
      <div className="section-alt">
        <section id="profile" className="section">
          <div className="section-header reveal">
            <span className="section-number">08</span>
            <h2 className="section-title">Rewritten Profile</h2>
            <p className="section-subtitle">Copy-paste ready - optimized for UMA algorithm</p>
          </div>

          <div className="card profile-section reveal">
            <div className="profile-section-header">
              <div>
                <h3>TITLE</h3>
                <span className="char-count">{newTitle.length}/70 characters</span>
              </div>
              <button className="copy-btn" onClick={() => copyText(newTitle, "title")}>
                {copiedField === "title" ? "Copied!" : "Copy Title"}
              </button>
            </div>
            <div className="code-block">
              <strong>{newTitle}</strong>
            </div>
          </div>

          <div className="card profile-section reveal">
            <div className="profile-section-header">
              <h3>BIO / OVERVIEW</h3>
              <button className="copy-btn" onClick={() => copyText(newBio, "bio")}>
                {copiedField === "bio" ? "Copied!" : "Copy Bio"}
              </button>
            </div>
            <div className="code-block">{newBio}</div>
          </div>

          <div className="card profile-section reveal">
            <div className="profile-section-header">
              <h3>SKILLS</h3>
              <span className="char-count">{newSkills.length}/15 max</span>
            </div>
            <div className="keywords-container">
              {newSkills.map((skill) => (
                <span key={skill} className="keyword-tag">{skill}</span>
              ))}
            </div>
          </div>

          <div className="card profile-section reveal">
            <div className="profile-section-header">
              <h3>EMPLOYMENT HISTORY</h3>
              <button className="copy-btn" onClick={() => copyText(employmentHistory, "employment")}>
                {copiedField === "employment" ? "Copied!" : "Copy Employment"}
              </button>
            </div>
            <div className="code-block">{employmentHistory}</div>
          </div>
        </section>
      </div>

      {/* ═══════════════════ 09 ACTION PLAN ═══════════════════ */}
      <section id="action" className="section">
        <div className="section-header reveal">
          <span className="section-number">09</span>
          <h2 className="section-title">Action Plan</h2>
          <p className="section-subtitle">Step-by-step implementation roadmap</p>
        </div>

        {/* THIS WEEK */}
        <div className="reveal" style={{ marginBottom: 40 }}>
          <div className="action-group-title">
            <span className="badge badge-critical">This Week</span>
            <span className="label">Critical fixes - do these first</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { step: 1, title: "Replace your title", desc: "Change to: \"AI Engineer | LLM Apps, RAG Systems & SaaS\"", fixes: "Fixes relevance matching (20-25% of UMA weight)", priority: "critical" },
              { step: 2, title: "Rewrite your bio", desc: "Use the new bio from Section 08. Remove ALL unicode bold characters.", fixes: "Fixes NLP parsing + semantic matching", priority: "critical" },
              { step: 3, title: "Clean skills to 15", desc: "Remove all 50+ skills. Add exactly the 15 recommended skills from Section 08.", fixes: "Fixes keyword spam penalty", priority: "critical" },
              { step: 4, title: "Raise rate to $75/hr", desc: "Update profile rate. Use $60-85/hr range in proposals.", fixes: "Fixes rate signal + client filtering", priority: "critical" },
              { step: 5, title: "Remove unicode bold from bio", desc: "Replace all unicode bold characters with plain ASCII text. UMA cannot parse unicode bold.", fixes: "Fixes LLM tokenizer issues", priority: "high" },
            ].map((s) => (
              <div key={s.step} className="action-item">
                <div className="action-number">{s.step}</div>
                <div className="action-content">
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <h4>{s.title}</h4>
                    <span className={`badge ${s.priority === "critical" ? "badge-critical" : "badge-high"}`}>{s.priority}</span>
                  </div>
                  <p>{s.desc}</p>
                  <div className="fixes">{s.fixes}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* WITHIN 2 WEEKS */}
        <div className="reveal" style={{ marginBottom: 40 }}>
          <div className="action-group-title">
            <span className="badge badge-warning">Within 2 Weeks</span>
            <span className="label">Portfolio and positioning</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { step: 6, title: "Curate portfolio to 6-8 items", desc: "Remove non-AI projects. Lead with the 3 Tier 1 projects from Section 07.", fixes: "Improves portfolio quality signal", priority: "high" },
              { step: 7, title: "Add case study descriptions", desc: "Each portfolio item needs: problem, solution, tech stack, and result.", fixes: "Boosts semantic relevance for AI searches", priority: "high" },
              { step: 8, title: "Update employment history", desc: "Use the employment section from Section 08. Highlight AI and enterprise work.", fixes: "Strengthens earnings & history signal", priority: "high" },
              { step: 9, title: "Set up Upwork availability badge", desc: "Enable 'Available Now' badge and set preferred hours to maximize visibility.", fixes: "Boosts availability signal weight", priority: "medium" },
            ].map((s) => (
              <div key={s.step} className="action-item">
                <div className="action-number">{s.step}</div>
                <div className="action-content">
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <h4>{s.title}</h4>
                    <span className={`badge ${s.priority === "high" ? "badge-high" : "badge-medium"}`}>{s.priority}</span>
                  </div>
                  <p>{s.desc}</p>
                  <div className="fixes">{s.fixes}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* WITHIN 30 DAYS */}
        <div className="reveal">
          <div className="action-group-title">
            <span className="badge badge-strong">Within 30 Days</span>
            <span className="label">Growth and optimization</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { step: 10, title: "Send 15-20 targeted proposals", desc: "Use job search keywords from Section 10. Apply to AI-specific jobs only.", fixes: "Tests new positioning + builds recent activity signal", priority: "medium" },
              { step: 11, title: "Request updated reviews", desc: "Ask 3-5 recent clients for updated feedback mentioning AI/LLM work specifically.", fixes: "Boosts relevance in private feedback signals", priority: "medium" },
              { step: 12, title: "Track and iterate", desc: "Monitor profile views, search appearances, and invite volume. Adjust keywords if needed.", fixes: "Continuous optimization", priority: "low" },
              { step: 13, title: "Consider Upwork ads for top keywords", desc: "Run small ad campaigns for 'AI engineer' and 'LLM developer' searches if organic results are slow.", fixes: "Accelerates visibility while organic ranking builds", priority: "low" },
            ].map((s) => (
              <div key={s.step} className="action-item">
                <div className="action-number">{s.step}</div>
                <div className="action-content">
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <h4>{s.title}</h4>
                    <span className={`badge ${s.priority === "medium" ? "badge-medium" : "badge-low"}`}>{s.priority}</span>
                  </div>
                  <p>{s.desc}</p>
                  <div className="fixes">{s.fixes}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ 10 JOB SEARCH KEYWORDS ═══════════════════ */}
      <div className="section-alt">
        <section id="keywords" className="section">
          <div className="section-header reveal">
            <span className="section-number">10</span>
            <h2 className="section-title">Job Search Keywords</h2>
            <p className="section-subtitle">Use these to find and win the right projects</p>
          </div>

          <div className="reveal" style={{ marginBottom: 32 }}>
            <div className="alert alert-info">
              <div className="alert-icon">i</div>
              <div>
                <span className="alert-title">How to use: </span>
                Save these as Upwork search alerts. Check daily. Apply within 1-2 hours of posting for maximum visibility. Use exact phrases in your proposal opening line.
              </div>
            </div>
          </div>

          <div className="reveal" style={{ marginBottom: 32 }}>
            <h3 className="tier-title">TIER 1 <span className="tier-subtitle">- Highest match rate</span></h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 16 }}>
              {[
                { keyword: "AI agent", volume: "HIGH", match: "95%" },
                { keyword: "LLM application", volume: "HIGH", match: "90%" },
                { keyword: "RAG pipeline", volume: "MED", match: "95%" },
                { keyword: "AI SaaS", volume: "MED", match: "90%" },
                { keyword: "LangChain developer", volume: "MED", match: "90%" },
              ].map((kw) => (
                <div key={kw.keyword} className="keyword-row">
                  <span style={{ fontWeight: 500, color: "var(--text)" }}>{kw.keyword}</span>
                  <div style={{ display: "flex", gap: 8 }}>
                    <span className={`badge ${kw.volume === "HIGH" ? "badge-strong" : "badge-ok"}`}>{kw.volume} vol</span>
                    <span className="badge badge-info">{kw.match} match</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal" style={{ marginBottom: 32 }}>
            <h3 className="tier-title">TIER 2 <span className="tier-subtitle">- Good secondary targets</span></h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 16 }}>
              {[
                { keyword: "OpenAI API", volume: "HIGH", match: "85%" },
                { keyword: "AI chatbot", volume: "HIGH", match: "80%" },
                { keyword: "Next.js AI", volume: "MED", match: "85%" },
                { keyword: "RAG", volume: "MED", match: "90%" },
                { keyword: "Python AI", volume: "HIGH", match: "80%" },
              ].map((kw) => (
                <div key={kw.keyword} className="keyword-row">
                  <span style={{ fontWeight: 500, color: "var(--text)" }}>{kw.keyword}</span>
                  <div style={{ display: "flex", gap: 8 }}>
                    <span className={`badge ${kw.volume === "HIGH" ? "badge-strong" : "badge-ok"}`}>{kw.volume} vol</span>
                    <span className="badge badge-info">{kw.match} match</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal" style={{ marginBottom: 32 }}>
            <h3 className="tier-title">COMBOS <span className="tier-subtitle">- Multi-word search phrases</span></h3>
            <div className="keywords-container" style={{ marginTop: 16 }}>
              {[
                "\"AI agent\" + Next.js",
                "\"LangChain\" + SaaS",
                "\"RAG\" + Python",
                "\"AI chatbot\" + Twilio",
                "\"OpenAI API\" + React",
                "\"LLM\" + FastAPI",
                "\"AI automation\" + Django",
                "\"vector database\" + pipeline",
                "\"AI MVP\" + full-stack",
                "\"GPT-4\" + integration",
              ].map((combo) => (
                <span key={combo} className="keyword-tag">{combo}</span>
              ))}
            </div>
          </div>

          <div className="card reveal">
            <h3>Pro Tips</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 16 }}>
              {[
                { num: 1, tip: "Set up saved searches for all Tier 1 keywords with email alerts turned on." },
                { num: 2, tip: "Apply within 1-2 hours of job posting. Early applicants get 3x more views." },
                { num: 3, tip: "Use the exact job title keyword in the first sentence of your proposal." },
                { num: 4, tip: "For enterprise jobs ($5K+), send a Loom video walkthrough of a similar project." },
                { num: 5, tip: "Track which keywords lead to interviews. Double down on winners after 30 days." },
              ].map((t) => (
                <div key={t.num} className="pro-tip">
                  <span className="pro-tip-number">{t.num}.</span>
                  <p>{t.tip}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* ─── Footer ─── */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="nav-brand">
            <div className="nav-logo">HH</div>
            <span className="nav-title">Upwork Strategy Dashboard</span>
          </div>
          <div className="footer-links">
            <a href="#summary" onClick={(e) => { e.preventDefault(); scrollTo("summary"); }}>Summary</a>
            <a href="#audit" onClick={(e) => { e.preventDefault(); scrollTo("audit"); }}>Audit</a>
            <a href="#algorithm" onClick={(e) => { e.preventDefault(); scrollTo("algorithm"); }}>Algorithm</a>
            <a href="#market" onClick={(e) => { e.preventDefault(); scrollTo("market"); }}>Market</a>
            <a href="#action" onClick={(e) => { e.preventDefault(); scrollTo("action"); }}>Action Plan</a>
          </div>
          <p className="footer-credit">
            Prepared for <strong style={{ color: "var(--text-muted)" }}>Hammad H.</strong> &middot; April 2026
          </p>
        </div>
      </footer>
    </div>
  );
}
