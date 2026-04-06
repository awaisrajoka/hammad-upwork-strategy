"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/* ──────────────────────── reusable components ──────────────────────── */

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="px-4 py-2 text-sm rounded-xl bg-[#1d4ed8] text-white hover:bg-[#1e40af] transition-all font-semibold cursor-pointer"
    >
      {copied ? "Copied!" : label}
    </button>
  );
}

function Badge({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: "strong" | "broken" | "warning" | "default" | "danger" | "info" | "maxed" | "ok" | "weak" | "declining" | "good" | "wrong" | "empty" | "critical" | "high" | "medium" | "low";
}) {
  const colors: Record<string, string> = {
    strong: "bg-green-50 text-green-700 border-green-200",
    maxed: "bg-green-50 text-green-700 border-green-200",
    good: "bg-green-50 text-green-700 border-green-200",
    ok: "bg-blue-50 text-blue-700 border-blue-200",
    broken: "bg-red-50 text-red-700 border-red-200",
    wrong: "bg-red-50 text-red-700 border-red-200",
    empty: "bg-red-50 text-red-700 border-red-200",
    danger: "bg-red-50 text-red-700 border-red-200",
    critical: "bg-red-50 text-red-700 border-red-200",
    warning: "bg-amber-50 text-amber-700 border-amber-200",
    weak: "bg-amber-50 text-amber-700 border-amber-200",
    declining: "bg-amber-50 text-amber-700 border-amber-200",
    high: "bg-amber-50 text-amber-700 border-amber-200",
    medium: "bg-blue-50 text-blue-700 border-blue-200",
    low: "bg-slate-50 text-slate-500 border-slate-200",
    info: "bg-[#eff6ff] text-[#1d4ed8] border-blue-200",
    default: "bg-slate-50 text-slate-600 border-slate-200",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-[0.04em] border ${colors[variant] || colors.default}`}
    >
      {children}
    </span>
  );
}

function PillBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#eff6ff] text-[#1d4ed8] text-[11px] font-semibold uppercase tracking-[0.04em]">
      {children}
    </span>
  );
}

function SectionHeader({ number, title, subtitle }: { number: string; title: string; subtitle: string }) {
  return (
    <div className="mb-10 reveal">
      <div className="flex items-center gap-4 mb-2">
        <span className="text-[#3b82f6]/30 text-4xl md:text-5xl font-bold font-mono">{number}</span>
        <h2 className="text-2xl md:text-4xl font-bold text-slate-900">{title}</h2>
      </div>
      <p className="text-slate-500 text-base md:text-lg ml-0 md:ml-[76px]">{subtitle}</p>
    </div>
  );
}

function Card({
  children,
  className = "",
  borderColor,
  gradient,
}: {
  children: React.ReactNode;
  className?: string;
  borderColor?: "red" | "blue" | "green" | "amber" | "indigo";
  gradient?: boolean;
}) {
  const borderMap: Record<string, string> = {
    red: "border-l-4 border-l-red-500",
    blue: "border-l-4 border-l-blue-500",
    green: "border-l-4 border-l-green-500",
    amber: "border-l-4 border-l-amber-500",
    indigo: "border-l-4 border-l-indigo-500",
  };
  if (gradient) {
    return (
      <div className={`gradient-border-card rounded-2xl p-5 md:p-6 card-hover ${className}`}>
        {children}
      </div>
    );
  }
  return (
    <div
      className={`bg-white border border-slate-200 rounded-2xl p-5 md:p-6 card-hover ${borderColor ? borderMap[borderColor] : ""} ${className}`}
    >
      {children}
    </div>
  );
}

function InfoCallout({ type, children }: { type: "info" | "warning" | "danger"; children: React.ReactNode }) {
  const styles = {
    info: { bg: "bg-blue-50", border: "border-blue-200", iconColor: "text-[#1d4ed8]", iconBg: "bg-blue-100", icon: "i" },
    warning: { bg: "bg-amber-50", border: "border-amber-200", iconColor: "text-amber-600", iconBg: "bg-amber-100", icon: "!" },
    danger: { bg: "bg-red-50", border: "border-red-200", iconColor: "text-red-600", iconBg: "bg-red-100", icon: "!" },
  };
  const s = styles[type];
  return (
    <div className={`${s.bg} border ${s.border} rounded-xl p-4 md:p-5 flex gap-3 md:gap-4 items-start`}>
      <div className={`w-7 h-7 md:w-8 md:h-8 rounded-full ${s.iconBg} flex items-center justify-center shrink-0`}>
        <span className={`${s.iconColor} font-bold text-sm`}>{s.icon}</span>
      </div>
      <div className="text-slate-600 text-sm leading-relaxed">{children}</div>
    </div>
  );
}

function ProgressBar({ value, max = 10 }: { value: number; max?: number }) {
  const pct = (value / max) * 100;
  const barColor = pct >= 70 ? "bg-green-500" : pct >= 50 ? "bg-amber-500" : "bg-red-500";
  return (
    <div className="w-full bg-slate-100 rounded-full h-2">
      <div className={`${barColor} h-2 rounded-full progress-fill`} style={{ width: `${pct}%` }} />
    </div>
  );
}

/* ──────────────────────── nav items ──────────────────────── */
const NAV_ITEMS = [
  { id: "hero", label: "Home" },
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
  const revealRefs = useRef<Set<Element>>(new Set());

  const revealCallback = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
      }
    });
  }, []);

  useEffect(() => {
    // Scroll reveal observer
    const revealObserver = new IntersectionObserver(revealCallback, {
      rootMargin: "0px 0px -60px 0px",
      threshold: 0.1,
    });

    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach((el) => {
      revealObserver.observe(el);
      revealRefs.current.add(el);
    });

    // Active section observer
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
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) sectionObserver.observe(el);
    });

    // Nav scroll shadow
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
    <div className="min-h-screen bg-white">
      {/* ─── Navigation ─── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md transition-shadow duration-200 ${navScrolled ? "nav-scrolled" : ""}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#1d4ed8] flex items-center justify-center text-white text-sm font-bold">
              HH
            </div>
            <span className="text-slate-800 text-sm font-semibold hidden sm:inline">Upwork Strategy Dashboard</span>
          </div>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(item.id);
                }}
                className={`relative px-3 py-1.5 text-sm transition-all ${
                  activeSection === item.id
                    ? "text-[#1d4ed8] font-semibold"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#1d4ed8] rounded-full" />
                )}
              </a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 cursor-pointer"
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
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 px-4 py-3 space-y-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(item.id);
                }}
                className={`block px-3 py-2 rounded-lg text-sm transition-all ${
                  activeSection === item.id
                    ? "bg-[#eff6ff] text-[#1d4ed8] font-semibold"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section id="hero" className="min-h-screen flex flex-col items-center justify-center text-center pt-20 pb-16 relative" style={{ background: "linear-gradient(135deg, #f0f7ff 0%, #e8f0fe 40%, #ffffff 100%)" }}>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <div className="reveal">
            <PillBadge>APRIL 2026</PillBadge>
          </div>
          <h1 className="reveal text-4xl sm:text-5xl md:text-7xl font-bold text-slate-900 mt-6 mb-5 tracking-tight leading-tight">
            Upwork Profile<br />
            Optimization &amp; Market Strategy
          </h1>
          <p className="reveal text-slate-500 text-lg md:text-xl mb-12 md:mb-16">
            Prepared for <span className="text-slate-800 font-semibold">Hammad H.</span> &mdash; Full Overhaul
          </p>
          <div className="reveal grid grid-cols-2 md:flex md:flex-wrap items-center justify-center gap-8 md:gap-16 mb-12 md:mb-16 reveal-stagger">
            {[
              { value: "100%", label: "Job Success" },
              { value: "$100K+", label: "Earned" },
              { value: "46/80", label: "Profile Score" },
              { value: "109%", label: "AI Demand Growth" },
            ].map((stat) => (
              <div key={stat.label} className="reveal">
                <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1d4ed8] font-mono">{stat.value}</p>
                <p className="text-slate-400 text-xs sm:text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
          <div className="reveal">
            <a
              href="#summary"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("summary");
              }}
              className="inline-flex items-center px-8 py-4 rounded-xl bg-[#1d4ed8] hover:bg-[#1e40af] text-white font-semibold text-lg transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30"
            >
              View Full Analysis
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════ 01 EXECUTIVE SUMMARY ═══════════════════ */}
      <section id="summary" className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <SectionHeader number="01" title="Executive Summary" subtitle="The core problem and the path forward" />

          <div className="reveal mb-8">
            <InfoCallout type="warning">
              <span className="font-semibold text-amber-700">Critical Issue:</span> Profile has strong credentials (100% JSS, Top Rated, $100K+) but broken positioning, keyword spam, and a rate that signals commodity work. Six critical issues identified.
            </InfoCallout>
          </div>

          <div className="grid md:grid-cols-3 gap-5 reveal-stagger">
            <Card borderColor="red" className="reveal">
              <div className="text-2xl mb-3">&#128680;</div>
              <h3 className="text-lg font-bold mb-2 text-slate-900">Root Cause</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Profile identity crisis - title tries to cover AI/ML + Full Stack + Python + React. Skills section has 50+ repeated keywords (algorithmic spam). Bio uses unicode bold text that confuses UMA.
              </p>
            </Card>
            <Card borderColor="blue" className="reveal">
              <div className="text-2xl mb-3">&#129302;</div>
              <h3 className="text-lg font-bold mb-2 text-slate-900">Algorithm Issue</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                UMA (Llama 3.1-based AI) uses semantic understanding, not keyword density. Repeating &quot;Generative AI&quot; 5 times hurts ranking. Relevance matching (20-25% weight) is broken by keyword spam.
              </p>
            </Card>
            <Card borderColor="green" className="reveal">
              <div className="text-2xl mb-3">&#128161;</div>
              <h3 className="text-lg font-bold mb-2 text-slate-900">Opportunity</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                AI/ML demand on Upwork grew 109% YoY. Top AI freelancers earn $75-150/hr. With profile fixes + rate adjustment, profile score can jump from 46 to 70+ and increase invite volume 3-5x.
              </p>
            </Card>
          </div>

          <div className="grid md:grid-cols-3 gap-5 mt-5 reveal-stagger">
            <Card className="reveal">
              <Badge variant="danger">Rate Problem</Badge>
              <h3 className="text-lg font-bold mt-3 mb-2 text-slate-900">$40/hr = Wrong Signal</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                $40/hr with $100K+ earned and 100% JSS signals commodity work. Clients filter by rate. Moving to $75/hr aligns with market and signals expertise.
              </p>
            </Card>
            <Card className="reveal">
              <Badge variant="strong">Market Tailwind</Badge>
              <h3 className="text-lg font-bold mt-3 mb-2 text-slate-900">AI Demand Surge</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                AI/ML category is the fastest-growing on Upwork. Enterprise clients have budget for AI specialists. RAG, LangChain, and agent development are the hottest sub-niches.
              </p>
            </Card>
            <Card className="reveal">
              <Badge variant="info">Positioning Fix</Badge>
              <h3 className="text-lg font-bold mt-3 mb-2 text-slate-900">Niche Down to Scale Up</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Stop being &quot;AI/ML &amp; Full Stack Developer.&quot; Become &quot;AI Engineer&quot; who also does full-stack. Lead with AI, support with SaaS delivery capability.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* ═══════════════════ 02 CURRENT PROFILE AUDIT ═══════════════════ */}
      <section id="audit" className="py-16 md:py-20 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <SectionHeader number="02" title="Current Profile Audit" subtitle="Scoring every dimension of your Upwork presence" />

          <Card className="mb-8 reveal">
            <h3 className="text-lg font-bold mb-5 text-slate-900">Profile Scorecard</h3>
            <div className="overflow-x-auto table-scroll">
              <table className="w-full text-sm min-w-[600px]">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 text-slate-400 font-medium text-xs uppercase tracking-wider">Dimension</th>
                    <th className="text-left py-3 text-slate-400 font-medium text-xs uppercase tracking-wider">Status</th>
                    <th className="text-left py-3 text-slate-400 font-medium text-xs uppercase tracking-wider w-48">Progress</th>
                    <th className="text-right py-3 text-slate-400 font-medium text-xs uppercase tracking-wider">Score</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700">
                  {[
                    { dim: "Title", status: "broken", score: 3, max: 10 },
                    { dim: "Overview / Bio", status: "weak", score: 4, max: 10 },
                    { dim: "Skills Tags", status: "broken", score: 2, max: 10 },
                    { dim: "Portfolio", status: "warning", score: 5, max: 10 },
                    { dim: "Rate Strategy", status: "wrong", score: 2, max: 10 },
                    { dim: "Job Success Score", status: "maxed", score: 10, max: 10 },
                    { dim: "Earnings & History", status: "strong", score: 9, max: 10 },
                    { dim: "Response Time", status: "ok", score: 6, max: 10 },
                    { dim: "Availability Badge", status: "good", score: 7, max: 10 },
                  ].map((row) => (
                    <tr key={row.dim} className="border-b border-slate-100">
                      <td className="py-3 font-medium text-slate-800">{row.dim}</td>
                      <td className="py-3"><Badge variant={row.status as "broken" | "weak" | "warning" | "wrong" | "maxed" | "strong" | "ok" | "good"}>{row.status}</Badge></td>
                      <td className="py-3"><ProgressBar value={row.score} max={row.max} /></td>
                      <td className="py-3 text-right font-mono font-bold text-slate-800">{row.score}/{row.max}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between">
              <span className="text-slate-400 text-sm">Total Profile Score</span>
              <span className="text-2xl font-bold font-mono text-amber-600">46/80</span>
            </div>
          </Card>

          <Card className="mb-8 reveal">
            <h3 className="text-lg font-bold mb-5 text-slate-900">Issues Found</h3>
            <div className="space-y-4">
              {[
                { num: 1, severity: "critical", title: "Title is a keyword dump", desc: "\"AI/ML & Full Stack Developer | Python, Generative AI (LLMs, RAG) React\" - tries to rank for everything, ranks for nothing." },
                { num: 2, severity: "critical", title: "Skills section is spammed", desc: "50+ skills listed with duplicates. UMA penalizes keyword stuffing. Maximum 15 skills allowed, each should be unique." },
                { num: 3, severity: "critical", title: "Bio uses unicode bold text", desc: "Unicode bold characters (U+1D5D4-U+1D5ED) confuse NLP tokenizers. UMA can't properly parse the bio." },
                { num: 4, severity: "high", title: "$40/hr undercuts your value", desc: "With 100% JSS and $100K+ earned, $40/hr signals commodity work. Market rate for your profile is $75-100/hr." },
                { num: 5, severity: "high", title: "Portfolio needs curation", desc: "15 pages of items with no clear hierarchy. Need 6-8 focused AI/SaaS case studies." },
                { num: 6, severity: "medium", title: "Response time could improve", desc: "4-8 hours is acceptable but not competitive. Top freelancers respond within 1-2 hours during business hours." },
              ].map((issue) => (
                <div key={issue.num} className="flex gap-4 items-start p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-300 font-mono font-bold text-lg shrink-0 w-6">{issue.num}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <Badge variant={issue.severity as "critical" | "high" | "medium"}>{issue.severity}</Badge>
                      <span className="font-semibold text-slate-900">{issue.title}</span>
                    </div>
                    <p className="text-slate-500 text-sm">{issue.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 reveal-stagger">
            {[
              { label: "Jobs Completed", value: "47" },
              { label: "Hours Worked", value: "4,165" },
              { label: "Total Earned", value: "$100K+" },
              { label: "Job Success", value: "100%" },
            ].map((s) => (
              <Card key={s.label} className="text-center reveal">
                <p className="text-2xl md:text-3xl font-bold font-mono text-[#1d4ed8]">{s.value}</p>
                <p className="text-slate-400 text-xs mt-1">{s.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ 03 UMA ALGORITHM DEEP DIVE ═══════════════════ */}
      <section id="algorithm" className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <SectionHeader number="03" title="UMA Algorithm Deep Dive" subtitle="How Upwork's AI ranks your profile for every search" />

          <div className="flex flex-wrap gap-2 mb-8 reveal">
            {["Llama 3.1 70B", "LoRA Fine-tuned", "Semantic Matching", "BM25 + Neural Hybrid", "Real-time Signals"].map((tag) => (
              <span key={tag} className="px-3 py-1.5 rounded-full bg-[#eff6ff] text-[#1d4ed8] text-xs font-semibold">
                {tag}
              </span>
            ))}
          </div>

          <Card className="mb-8 reveal">
            <h3 className="text-lg font-bold mb-5 text-slate-900">How UMA Processes a Job Search</h3>
            <div className="space-y-5">
              {[
                { step: 1, title: "Job Posted", desc: "Client posts a job. UMA extracts intent, required skills, budget range, and project complexity." },
                { step: 2, title: "Candidate Pool", desc: "BM25 keyword matching creates initial pool of ~500 candidates from millions of profiles." },
                { step: 3, title: "Semantic Ranking", desc: "Llama 3.1 70B re-ranks using deep semantic understanding - title, bio, portfolio, and skills." },
                { step: 4, title: "Signal Boosting", desc: "Real-time signals (JSS, response time, availability, recent activity) adjust rankings." },
                { step: 5, title: "Final Ranking", desc: "Top 20-50 freelancers shown to client. Position 1-5 get 80%+ of invites and views." },
              ].map((s) => (
                <div key={s.step} className="flex gap-4 items-start">
                  <div className="w-9 h-9 rounded-full bg-[#eff6ff] flex items-center justify-center shrink-0 border border-blue-200">
                    <span className="text-[#1d4ed8] font-bold text-sm">{s.step}</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-0.5">{s.title}</h4>
                    <p className="text-slate-500 text-sm">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="mb-8 reveal">
            <h3 className="text-lg font-bold mb-5 text-slate-900">Signal Weights</h3>
            <div className="overflow-x-auto table-scroll">
              <table className="w-full text-sm min-w-[550px]">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 text-slate-400 font-medium text-xs uppercase tracking-wider">Signal</th>
                    <th className="text-left py-3 text-slate-400 font-medium text-xs uppercase tracking-wider">Weight</th>
                    <th className="text-left py-3 text-slate-400 font-medium text-xs uppercase tracking-wider">Your Status</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700">
                  {[
                    { signal: "Relevance Match (Title + Skills + Bio)", weight: "20-25%", status: "broken", badge: "broken" },
                    { signal: "Job Success Score", weight: "15-20%", status: "100% - Maxed", badge: "maxed" },
                    { signal: "Earnings & Job History", weight: "10-15%", status: "$100K+ / 47 jobs", badge: "strong" },
                    { signal: "Availability & Response", weight: "10%", status: "4-8 hrs", badge: "ok" },
                    { signal: "Recent Activity", weight: "10%", status: "Active", badge: "good" },
                    { signal: "Portfolio Quality", weight: "5-10%", status: "Needs curation", badge: "warning" },
                    { signal: "Rate vs Budget Fit", weight: "5-10%", status: "$40/hr too low", badge: "wrong" },
                    { signal: "Client Preference Signals", weight: "5%", status: "Top Rated badge", badge: "strong" },
                  ].map((row) => (
                    <tr key={row.signal} className="border-b border-slate-100">
                      <td className="py-3 text-slate-800">{row.signal}</td>
                      <td className="py-3 font-mono text-slate-600">{row.weight}</td>
                      <td className="py-3"><Badge variant={row.badge as "broken" | "maxed" | "strong" | "ok" | "good" | "warning" | "wrong"}>{row.status}</Badge></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <div className="grid md:grid-cols-2 gap-5 mb-8 reveal-stagger">
            <Card className="reveal">
              <h3 className="text-lg font-bold mb-4 text-slate-900">JSS Calculation</h3>
              <div className="space-y-3 text-sm">
                {[
                  { label: "Public Feedback Weight", value: "~40%" },
                  { label: "Private Feedback Weight", value: "~30%" },
                  { label: "Contract Outcomes", value: "~20%" },
                  { label: "Long-term Relationships", value: "~10%" },
                ].map((r) => (
                  <div key={r.label} className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-600">{r.label}</span>
                    <span className="font-mono font-semibold text-slate-800">{r.value}</span>
                  </div>
                ))}
              </div>
            </Card>
            <Card className="reveal">
              <h3 className="text-lg font-bold mb-4 text-slate-900">JSS Risk Factors</h3>
              <div className="space-y-3 text-sm">
                {[
                  { label: "Bad Private Feedback (1-2 stars)", value: "Heavy penalty" },
                  { label: "Contract Disputes", value: "Major drop" },
                  { label: "No-feedback Closures", value: "Slight negative" },
                  { label: "Low Earnings Contracts", value: "Less weight" },
                ].map((r) => (
                  <div key={r.label} className="flex justify-between items-center py-2 border-b border-slate-100">
                    <span className="text-slate-600">{r.label}</span>
                    <span className="font-mono text-amber-600 text-xs">{r.value}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-4 reveal">
            <InfoCallout type="info">
              <span className="font-semibold text-[#1d4ed8]">Key Insight:</span> UMA is NOT a keyword matcher. It understands context and intent. A clean, focused profile with 15 precise skills will outrank a profile with 50+ spammed keywords every time.
            </InfoCallout>
            <InfoCallout type="warning">
              <span className="font-semibold text-amber-700">Warning:</span> Unicode bold text in your bio (U+1D5D4 range) creates unknown tokens in the LLM tokenizer. UMA literally cannot read parts of your current bio.
            </InfoCallout>
          </div>
        </div>
      </section>

      {/* ═══════════════════ 04 MARKET & RATE ANALYSIS ═══════════════════ */}
      <section id="market" className="py-16 md:py-20 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <SectionHeader number="04" title="Market & Rate Analysis" subtitle="Where you stand vs. where you should be" />

          <Card className="mb-8 reveal">
            <h3 className="text-lg font-bold mb-5 text-slate-900">Rate Comparison</h3>
            <div className="overflow-x-auto table-scroll">
              <table className="w-full text-sm min-w-[550px]">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 text-slate-400 font-medium text-xs uppercase tracking-wider">Tier</th>
                    <th className="text-left py-3 text-slate-400 font-medium text-xs uppercase tracking-wider">Rate Range</th>
                    <th className="text-left py-3 text-slate-400 font-medium text-xs uppercase tracking-wider">Profile</th>
                    <th className="text-left py-3 text-slate-400 font-medium text-xs uppercase tracking-wider">You</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700">
                  {[
                    { tier: "Entry-level AI", range: "$25-40/hr", profile: "< $10K earned, < 90% JSS", you: true },
                    { tier: "Mid-level AI", range: "$50-75/hr", profile: "$30K-100K earned, 95%+ JSS", you: false },
                    { tier: "Senior AI Engineer", range: "$75-120/hr", profile: "$100K+ earned, 98%+ JSS", you: false },
                    { tier: "Expert / Top Rated Plus", range: "$120-200/hr", profile: "$200K+ earned, agency or TRP", you: false },
                  ].map((row) => (
                    <tr key={row.tier} className={`border-b border-slate-100 ${row.you ? "bg-red-50" : ""}`}>
                      <td className="py-3 text-slate-800 font-medium">{row.tier}</td>
                      <td className="py-3 font-mono">{row.range}</td>
                      <td className="py-3 text-slate-500">{row.profile}</td>
                      <td className="py-3">
                        {row.you && <Badge variant="danger">You are here</Badge>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <div className="grid md:grid-cols-3 gap-5 mb-8 reveal-stagger">
            {[
              { label: "Profile Rate", rate: "$75/hr", desc: "What shows on your profile. Signals senior expertise.", badge: "Recommended" },
              { label: "Proposal Range", rate: "$60-85/hr", desc: "Flex range for proposals. Adjust based on project size and client budget.", badge: "Flexible" },
              { label: "Enterprise / Long-term", rate: "$50-60/hr", desc: "Discount for 200+ hour contracts or retainer clients. Volume makes up the difference.", badge: "Volume Play" },
            ].map((card) => (
              <Card key={card.label} gradient className="reveal">
                <PillBadge>{card.badge}</PillBadge>
                <h3 className="text-lg font-bold mt-3 mb-1 text-slate-900">{card.label}</h3>
                <p className="text-3xl font-bold font-mono text-[#1d4ed8] mb-2">{card.rate}</p>
                <p className="text-slate-500 text-sm">{card.desc}</p>
              </Card>
            ))}
          </div>

          <Card className="reveal">
            <h3 className="text-lg font-bold mb-5 text-slate-900">AI Demand Growth (YoY)</h3>
            <div className="space-y-4">
              {[
                { category: "AI/ML General", growth: 109, color: "bg-[#1d4ed8]" },
                { category: "LLM / ChatGPT Integration", growth: 340, color: "bg-[#2563eb]" },
                { category: "RAG & Vector Search", growth: 280, color: "bg-[#3b82f6]" },
                { category: "AI Agent Development", growth: 420, color: "bg-[#1d4ed8]" },
                { category: "Traditional Web Dev", growth: 12, color: "bg-slate-300" },
              ].map((bar) => (
                <div key={bar.category}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-slate-600">{bar.category}</span>
                    <span className="text-sm font-mono font-bold text-[#16a34a]">+{bar.growth}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5">
                    <div
                      className={`${bar.color} h-2.5 rounded-full progress-fill`}
                      style={{ width: `${Math.min((bar.growth / 420) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* ═══════════════════ 05 NICHE KEYWORDS ═══════════════════ */}
      <section id="niche" className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <SectionHeader number="05" title="Niche Keywords" subtitle="Exact terms to target in your title, bio, and proposals" />

          <Card className="mb-8 reveal">
            <h3 className="text-lg font-bold mb-5 text-slate-900">Primary Keywords</h3>
            <div className="space-y-4">
              {[
                { keyword: "AI Engineer", desc: "Broadest high-value term. Should be first words in your title." },
                { keyword: "LLM Application Development", desc: "Covers ChatGPT, Claude, GPT-4 integration projects." },
                { keyword: "RAG Systems", desc: "Retrieval-Augmented Generation - hottest AI sub-niche on Upwork." },
                { keyword: "AI Agent Development", desc: "Autonomous agents, tool-using AI - fastest growing category (420% YoY)." },
                { keyword: "AI SaaS", desc: "AI-powered software products - signals you ship, not just prototype." },
              ].map((kw) => (
                <div key={kw.keyword} className="flex flex-col sm:flex-row sm:items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="font-semibold text-slate-900 shrink-0">{kw.keyword}</span>
                  <span className="text-slate-500 text-sm">{kw.desc}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="mb-8 reveal">
            <h3 className="text-lg font-bold mb-5 text-slate-900">Secondary Keywords</h3>
            <div className="flex flex-wrap gap-2">
              {[
                "LangChain", "OpenAI API", "Python", "FastAPI", "Django",
                "React", "Next.js", "Node.js", "PostgreSQL", "AWS",
                "Vector Database", "Pinecone", "LlamaIndex", "Chatbot Development",
                "Full-Stack Development", "SaaS Development", "API Integration",
              ].map((kw) => (
                <span key={kw} className="px-3 py-1.5 rounded-full bg-[#eff6ff] text-[#1d4ed8] text-sm font-medium border border-blue-100">
                  {kw}
                </span>
              ))}
            </div>
          </Card>

          <Card className="reveal">
            <h3 className="text-lg font-bold mb-5 text-slate-900">Long-tail Sniper Keywords</h3>
            <div className="space-y-3">
              {[
                { keyword: "build AI agent with LangChain", competition: "low" },
                { keyword: "RAG pipeline with Pinecone", competition: "low" },
                { keyword: "LLM integration into SaaS", competition: "low" },
                { keyword: "AI chatbot for customer support", competition: "medium" },
                { keyword: "GPT-4 API integration", competition: "medium" },
                { keyword: "AI-powered automation system", competition: "low" },
                { keyword: "custom LLM fine-tuning", competition: "medium" },
              ].map((kw) => (
                <div key={kw.keyword} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-800 text-sm">{kw.keyword}</span>
                  <Badge variant={kw.competition === "low" ? "strong" : "warning"}>{kw.competition} competition</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* ═══════════════════ 06 COMPETITION ═══════════════════ */}
      <section id="competition" className="py-16 md:py-20 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <SectionHeader number="06" title="Competition" subtitle="How you compare to top AI freelancers on Upwork" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 reveal-stagger">
            {[
              { label: "AI Freelancers (Active)", value: "12K+" },
              { label: "Top Rated in AI", value: "~800" },
              { label: "Earning $75+/hr", value: "~350" },
              { label: "100% JSS in AI", value: "~200" },
            ].map((s) => (
              <Card key={s.label} className="text-center reveal">
                <p className="text-2xl md:text-3xl font-bold font-mono text-[#1d4ed8]">{s.value}</p>
                <p className="text-slate-400 text-xs mt-1">{s.label}</p>
              </Card>
            ))}
          </div>

          <Card className="mb-8 reveal">
            <h3 className="text-lg font-bold mb-5 text-slate-900">Competitor Landscape</h3>
            <div className="overflow-x-auto table-scroll">
              <table className="w-full text-sm min-w-[650px]">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 text-slate-400 font-medium text-xs uppercase tracking-wider">Type</th>
                    <th className="text-left py-3 text-slate-400 font-medium text-xs uppercase tracking-wider">Rate</th>
                    <th className="text-left py-3 text-slate-400 font-medium text-xs uppercase tracking-wider">Strengths</th>
                    <th className="text-left py-3 text-slate-400 font-medium text-xs uppercase tracking-wider">Weakness</th>
                    <th className="text-left py-3 text-slate-400 font-medium text-xs uppercase tracking-wider">Threat</th>
                  </tr>
                </thead>
                <tbody className="text-slate-700">
                  {[
                    { type: "US/EU AI Specialists", rate: "$100-200/hr", strengths: "Native English, timezone", weakness: "Often academic, not shipping", threat: "Medium" },
                    { type: "Indian AI Agencies", rate: "$25-50/hr", strengths: "Low rates, team depth", weakness: "Quality variance, comms", threat: "Low" },
                    { type: "Pakistani AI Devs", rate: "$20-45/hr", strengths: "Direct competitors", weakness: "Few focused on AI niche", threat: "High" },
                    { type: "Eastern EU Freelancers", rate: "$50-90/hr", strengths: "Strong technical skills", weakness: "Less AI-specific work", threat: "Medium" },
                  ].map((row) => (
                    <tr key={row.type} className="border-b border-slate-100">
                      <td className="py-3 text-slate-800 font-medium">{row.type}</td>
                      <td className="py-3 font-mono">{row.rate}</td>
                      <td className="py-3 text-slate-500">{row.strengths}</td>
                      <td className="py-3 text-slate-500">{row.weakness}</td>
                      <td className="py-3"><Badge variant={row.threat === "High" ? "danger" : row.threat === "Medium" ? "warning" : "strong"}>{row.threat}</Badge></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <div className="reveal">
            <InfoCallout type="info">
              <span className="font-semibold text-[#1d4ed8]">Key Insight:</span> Your biggest competitive advantage is the combination of 100% JSS + $100K+ earned + AI specialization. Very few Pakistani freelancers have this trifecta. At $75/hr, you&apos;re still 30-50% cheaper than US/EU competitors with similar credentials.
            </InfoCallout>
          </div>
        </div>
      </section>

      {/* ═══════════════════ 07 PORTFOLIO ASSETS ═══════════════════ */}
      <section id="portfolio" className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <SectionHeader number="07" title="Portfolio Assets" subtitle="Curated projects that prove your AI expertise" />

          <div className="mb-6 reveal">
            <h3 className="text-lg font-bold text-slate-900 mb-1">TIER 1 <span className="text-slate-400 font-normal text-sm">- Lead with these (show first)</span></h3>
          </div>
          <div className="grid md:grid-cols-2 gap-5 mb-8 reveal-stagger">
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
                title: "Property Automation SaaS",
                desc: "Django/React platform with Yardi, Gmail, Outlook API integrations. Full property management automation for Strada.ai.",
                tags: ["Django", "React", "REST API", "Yardi", "AWS"],
              },
              {
                title: "AI Agent System",
                desc: "Custom autonomous agent with tool-using capabilities, memory, and multi-step reasoning for enterprise workflows.",
                tags: ["LangChain", "OpenAI", "Python", "Agent Architecture"],
              },
            ].map((p) => (
              <Card key={p.title} className="reveal">
                <h4 className="text-base font-bold text-slate-900 mb-2">{p.title}</h4>
                <p className="text-slate-500 text-sm mb-4">{p.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-0.5 rounded-full bg-[#eff6ff] text-[#1d4ed8] text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          <div className="mb-6 reveal">
            <h3 className="text-lg font-bold text-slate-900 mb-1">TIER 2 <span className="text-slate-400 font-normal text-sm">- Supporting evidence</span></h3>
          </div>
          <div className="grid md:grid-cols-2 gap-5 mb-8 reveal-stagger">
            {[
              {
                title: "Airbyte Connector - IFS ERP",
                desc: "Custom Airbyte connector for IFS ERP to Databricks Lakehouse integration. Enterprise data pipeline.",
                tags: ["Python", "Airbyte", "Databricks", "ETL"],
              },
              {
                title: "OhmConnect Automation",
                desc: "$72K contract, 2,920 hours. Python automation with Microsoft and Twilio integrations.",
                tags: ["Python", "Microsoft API", "Twilio", "Automation"],
              },
              {
                title: "edX Platform Contributions",
                desc: "Senior Full-Stack Engineer on Open edX serving millions of learners globally.",
                tags: ["Python", "Django", "React", "PostgreSQL"],
              },
              {
                title: "Web3 & Fintech MVP",
                desc: "Loyalty platform with AI-driven optimization across multiple sprints. Web3 integration.",
                tags: ["React", "Node.js", "Web3", "AI Optimization"],
              },
            ].map((p) => (
              <Card key={p.title} className="reveal">
                <h4 className="text-base font-bold text-slate-900 mb-2">{p.title}</h4>
                <p className="text-slate-500 text-sm mb-4">{p.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          <div className="reveal">
            <InfoCallout type="danger">
              <span className="font-semibold text-red-700">Do NOT add:</span> Generic WordPress sites, simple landing pages, or non-AI projects that dilute your positioning. Keep portfolio focused on AI, SaaS, and enterprise work only.
            </InfoCallout>
          </div>
        </div>
      </section>

      {/* ═══════════════════ 08 REWRITTEN PROFILE ═══════════════════ */}
      <section id="profile" className="py-16 md:py-20 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <SectionHeader number="08" title="Rewritten Profile" subtitle="Copy-paste ready - optimized for UMA algorithm" />

          <Card className="mb-6 reveal">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900">TITLE</h3>
                <span className="text-slate-400 text-xs font-mono">{newTitle.length}/70 characters</span>
              </div>
              <CopyButton text={newTitle} label="Copy Title" />
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200">
              <p className="text-slate-900 text-lg font-semibold">{newTitle}</p>
            </div>
          </Card>

          <Card className="mb-6 reveal">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <h3 className="text-lg font-bold text-slate-900">BIO / OVERVIEW</h3>
              <CopyButton text={newBio} label="Copy Bio" />
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200">
              <pre className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap font-sans">{newBio}</pre>
            </div>
          </Card>

          <Card className="mb-6 reveal">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <h3 className="text-lg font-bold text-slate-900">SKILLS</h3>
              <span className="text-slate-400 text-sm font-mono">{newSkills.length}/15 max</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {newSkills.map((skill) => (
                <span key={skill} className="px-3 py-1.5 rounded-full bg-[#eff6ff] border border-blue-200 text-[#1d4ed8] text-sm font-medium">
                  {skill}
                </span>
              ))}
            </div>
          </Card>

          <Card className="reveal">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <h3 className="text-lg font-bold text-slate-900">EMPLOYMENT HISTORY</h3>
              <CopyButton text={employmentHistory} label="Copy Employment" />
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200">
              <pre className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap font-sans">{employmentHistory}</pre>
            </div>
          </Card>
        </div>
      </section>

      {/* ═══════════════════ 09 ACTION PLAN ═══════════════════ */}
      <section id="action" className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <SectionHeader number="09" title="Action Plan" subtitle="Step-by-step implementation roadmap" />

          {/* THIS WEEK */}
          <div className="mb-10 reveal">
            <div className="flex items-center gap-3 mb-5">
              <span className="px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-bold uppercase tracking-wider">This Week</span>
              <span className="text-slate-400 text-sm">Critical fixes - do these first</span>
            </div>
            <div className="space-y-4">
              {[
                { step: 1, title: "Replace your title", desc: "Change to: \"AI Engineer | LLM Apps, RAG Systems & SaaS\"", fixes: "Fixes relevance matching (20-25% of UMA weight)", priority: "critical" },
                { step: 2, title: "Rewrite your bio", desc: "Use the new bio from Section 08. Remove ALL unicode bold characters.", fixes: "Fixes NLP parsing + semantic matching", priority: "critical" },
                { step: 3, title: "Clean skills to 15", desc: "Remove all 50+ skills. Add exactly the 15 recommended skills from Section 08.", fixes: "Fixes keyword spam penalty", priority: "critical" },
                { step: 4, title: "Raise rate to $75/hr", desc: "Update profile rate. Use $60-85/hr range in proposals.", fixes: "Fixes rate signal + client filtering", priority: "critical" },
              ].map((s) => (
                <div key={s.step} className="flex gap-4 items-start p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-300 font-mono font-bold text-lg shrink-0 w-6">{s.step}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-semibold text-slate-900">{s.title}</span>
                      <Badge variant={s.priority as "critical" | "high"}>{s.priority}</Badge>
                    </div>
                    <p className="text-slate-500 text-sm mb-1">{s.desc}</p>
                    <p className="text-green-600 text-xs">{s.fixes}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* WITHIN 2 WEEKS */}
          <div className="mb-10 reveal">
            <div className="flex items-center gap-3 mb-5">
              <span className="px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-600 text-xs font-bold uppercase tracking-wider">Within 2 Weeks</span>
              <span className="text-slate-400 text-sm">Portfolio and positioning</span>
            </div>
            <div className="space-y-4">
              {[
                { step: 5, title: "Curate portfolio to 6-8 items", desc: "Remove non-AI projects. Lead with the 4 Tier 1 projects from Section 07.", fixes: "Improves portfolio quality signal", priority: "high" },
                { step: 6, title: "Add case study descriptions", desc: "Each portfolio item needs: problem, solution, tech stack, and result.", fixes: "Boosts semantic relevance for AI searches", priority: "high" },
                { step: 7, title: "Update employment history", desc: "Use the employment section from Section 08. Highlight AI and enterprise work.", fixes: "Strengthens earnings & history signal", priority: "high" },
              ].map((s) => (
                <div key={s.step} className="flex gap-4 items-start p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-300 font-mono font-bold text-lg shrink-0 w-6">{s.step}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-semibold text-slate-900">{s.title}</span>
                      <Badge variant={s.priority as "critical" | "high"}>{s.priority}</Badge>
                    </div>
                    <p className="text-slate-500 text-sm mb-1">{s.desc}</p>
                    <p className="text-green-600 text-xs">{s.fixes}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* WITHIN 30 DAYS */}
          <div className="reveal">
            <div className="flex items-center gap-3 mb-5">
              <span className="px-3 py-1 rounded-full bg-green-50 border border-green-200 text-green-600 text-xs font-bold uppercase tracking-wider">Within 30 Days</span>
              <span className="text-slate-400 text-sm">Growth and optimization</span>
            </div>
            <div className="space-y-4">
              {[
                { step: 8, title: "Send 15-20 targeted proposals", desc: "Use job search keywords from Section 10. Apply to AI-specific jobs only.", fixes: "Tests new positioning + builds recent activity signal", priority: "high" },
                { step: 9, title: "Request updated reviews", desc: "Ask 3-5 recent clients for updated feedback mentioning AI/LLM work specifically.", fixes: "Boosts relevance in private feedback signals", priority: "medium" },
                { step: 10, title: "Track and iterate", desc: "Monitor profile views, search appearances, and invite volume. Adjust keywords if needed.", fixes: "Continuous optimization", priority: "medium" },
              ].map((s) => (
                <div key={s.step} className="flex gap-4 items-start p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-300 font-mono font-bold text-lg shrink-0 w-6">{s.step}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-semibold text-slate-900">{s.title}</span>
                      <Badge variant={s.priority as "critical" | "high" | "medium"}>{s.priority}</Badge>
                    </div>
                    <p className="text-slate-500 text-sm mb-1">{s.desc}</p>
                    <p className="text-green-600 text-xs">{s.fixes}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ 10 JOB SEARCH KEYWORDS ═══════════════════ */}
      <section id="keywords" className="py-16 md:py-20 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <SectionHeader number="10" title="Job Search Keywords" subtitle="Use these to find and win the right projects" />

          <div className="reveal mb-8">
            <InfoCallout type="info">
              <span className="font-semibold text-[#1d4ed8]">How to use:</span> Save these as Upwork search alerts. Check daily. Apply within 1-2 hours of posting for maximum visibility. Use exact phrases in your proposal opening line.
            </InfoCallout>
          </div>

          <div className="mb-8 reveal">
            <h3 className="text-lg font-bold text-slate-900 mb-4">TIER 1 <span className="text-slate-400 font-normal text-sm">- Highest match rate</span></h3>
            <div className="space-y-3">
              {[
                { keyword: "AI engineer", volume: "High", match: "95%" },
                { keyword: "LLM application", volume: "High", match: "90%" },
                { keyword: "RAG pipeline", volume: "Medium", match: "95%" },
                { keyword: "AI agent development", volume: "High", match: "95%" },
                { keyword: "LangChain developer", volume: "Medium", match: "90%" },
              ].map((kw) => (
                <div key={kw.keyword} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl bg-white border border-slate-200">
                  <span className="font-medium text-slate-900">{kw.keyword}</span>
                  <div className="flex gap-2">
                    <Badge variant={kw.volume === "High" ? "strong" : "ok"}>{kw.volume} volume</Badge>
                    <Badge variant="info">{kw.match} match</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8 reveal">
            <h3 className="text-lg font-bold text-slate-900 mb-4">TIER 2 <span className="text-slate-400 font-normal text-sm">- Good secondary targets</span></h3>
            <div className="space-y-3">
              {[
                { keyword: "OpenAI API integration", volume: "Medium", match: "85%" },
                { keyword: "AI SaaS development", volume: "Medium", match: "90%" },
                { keyword: "chatbot development", volume: "High", match: "80%" },
                { keyword: "Python AI developer", volume: "Medium", match: "85%" },
                { keyword: "AI automation", volume: "High", match: "80%" },
              ].map((kw) => (
                <div key={kw.keyword} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl bg-white border border-slate-200">
                  <span className="font-medium text-slate-900">{kw.keyword}</span>
                  <div className="flex gap-2">
                    <Badge variant={kw.volume === "High" ? "strong" : "ok"}>{kw.volume} volume</Badge>
                    <Badge variant="info">{kw.match} match</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-8 reveal">
            <h3 className="text-lg font-bold text-slate-900 mb-4">COMBOS <span className="text-slate-400 font-normal text-sm">- Multi-word search phrases</span></h3>
            <div className="flex flex-wrap gap-2">
              {[
                "build AI agent LangChain",
                "RAG system Pinecone",
                "LLM integration SaaS",
                "AI chatbot customer support",
                "GPT-4 API React",
                "AI-powered automation Python",
                "vector search pipeline",
                "AI MVP development",
                "LLM fine-tuning deployment",
                "enterprise AI integration",
              ].map((combo) => (
                <span key={combo} className="px-3 py-1.5 rounded-full bg-[#eff6ff] text-[#1d4ed8] text-sm font-medium border border-blue-100">
                  {combo}
                </span>
              ))}
            </div>
          </div>

          <Card className="reveal">
            <h3 className="text-lg font-bold mb-4 text-slate-900">Pro Tips</h3>
            <div className="space-y-3">
              {[
                { num: 1, tip: "Set up saved searches for all Tier 1 keywords with email alerts turned on." },
                { num: 2, tip: "Apply within 1-2 hours of job posting. Early applicants get 3x more views." },
                { num: 3, tip: "Use the exact job title keyword in the first sentence of your proposal." },
                { num: 4, tip: "For enterprise jobs ($5K+), send a Loom video walkthrough of a similar project." },
                { num: 5, tip: "Track which keywords lead to interviews. Double down on winners after 30 days." },
              ].map((t) => (
                <div key={t.num} className="flex gap-3 items-start">
                  <span className="text-[#1d4ed8] font-mono font-bold text-sm shrink-0">{t.num}.</span>
                  <p className="text-slate-600 text-sm">{t.tip}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-slate-200 py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#1d4ed8] flex items-center justify-center text-white text-xs font-bold">
                HH
              </div>
              <span className="text-slate-800 text-sm font-semibold">Upwork Strategy Dashboard</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-400">
              <a href="#summary" onClick={(e) => { e.preventDefault(); scrollTo("summary"); }} className="hover:text-[#1d4ed8] transition-colors">Summary</a>
              <a href="#audit" onClick={(e) => { e.preventDefault(); scrollTo("audit"); }} className="hover:text-[#1d4ed8] transition-colors">Audit</a>
              <a href="#algorithm" onClick={(e) => { e.preventDefault(); scrollTo("algorithm"); }} className="hover:text-[#1d4ed8] transition-colors">Algorithm</a>
              <a href="#market" onClick={(e) => { e.preventDefault(); scrollTo("market"); }} className="hover:text-[#1d4ed8] transition-colors">Market</a>
              <a href="#action" onClick={(e) => { e.preventDefault(); scrollTo("action"); }} className="hover:text-[#1d4ed8] transition-colors">Action Plan</a>
            </div>
            <p className="text-slate-400 text-sm">
              Prepared for <span className="text-slate-600 font-medium">Hammad H.</span> &middot; April 2026
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
