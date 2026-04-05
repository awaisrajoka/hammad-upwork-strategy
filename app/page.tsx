"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="px-4 py-2 text-sm rounded-lg bg-indigo-500/20 border border-indigo-500/30 hover:bg-indigo-500/30 transition-all text-indigo-300 hover:text-indigo-200 font-medium"
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
  variant?: "strong" | "broken" | "warning" | "default" | "danger" | "info" | "maxed" | "ok" | "weak" | "declining" | "good" | "wrong" | "empty";
}) {
  const colors: Record<string, string> = {
    strong: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
    maxed: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
    good: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
    ok: "bg-blue-500/15 text-blue-400 border-blue-500/25",
    broken: "bg-red-500/15 text-red-400 border-red-500/25",
    wrong: "bg-red-500/15 text-red-400 border-red-500/25",
    empty: "bg-red-500/15 text-red-400 border-red-500/25",
    danger: "bg-red-500/15 text-red-400 border-red-500/25",
    warning: "bg-amber-500/15 text-amber-400 border-amber-500/25",
    weak: "bg-amber-500/15 text-amber-400 border-amber-500/25",
    declining: "bg-amber-500/15 text-amber-400 border-amber-500/25",
    info: "bg-indigo-500/15 text-indigo-400 border-indigo-500/25",
    default: "bg-white/5 text-white/60 border-white/10",
  };
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${colors[variant] || colors.default}`}
    >
      {children}
    </span>
  );
}

function SectionHeader({ number, title, subtitle }: { number: string; title: string; subtitle: string }) {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-4 mb-3">
        <span className="text-indigo-400/40 text-5xl font-bold font-mono">{number}</span>
        <h2 className="text-3xl md:text-4xl font-bold text-white">{title}</h2>
      </div>
      <p className="text-white/40 text-lg ml-0 md:ml-[76px]">{subtitle}</p>
    </div>
  );
}

function Card({
  children,
  className = "",
  borderColor,
}: {
  children: React.ReactNode;
  className?: string;
  borderColor?: "red" | "teal" | "green" | "amber" | "indigo" | "none";
}) {
  const borderMap: Record<string, string> = {
    red: "border-t-2 border-t-red-500",
    teal: "border-t-2 border-t-teal-500",
    green: "border-t-2 border-t-emerald-500",
    amber: "border-t-2 border-t-amber-500",
    indigo: "border-t-2 border-t-indigo-500",
    none: "",
  };
  return (
    <div
      className={`bg-[#111318] border border-[#1e2028] rounded-2xl p-6 md:p-8 ${borderColor ? borderMap[borderColor] : ""} ${className}`}
    >
      {children}
    </div>
  );
}

function InfoCallout({ type, children }: { type: "info" | "warning" | "danger"; children: React.ReactNode }) {
  const styles = {
    info: { bg: "bg-indigo-500/5", border: "border-indigo-500/20", icon: "i", iconColor: "text-indigo-400", iconBg: "bg-indigo-500/20" },
    warning: { bg: "bg-amber-500/5", border: "border-amber-500/20", icon: "!", iconColor: "text-amber-400", iconBg: "bg-amber-500/20" },
    danger: { bg: "bg-red-500/5", border: "border-red-500/20", icon: "!", iconColor: "text-red-400", iconBg: "bg-red-500/20" },
  };
  const s = styles[type];
  return (
    <div className={`${s.bg} border ${s.border} rounded-xl p-5 flex gap-4 items-start`}>
      <div className={`w-8 h-8 rounded-full ${s.iconBg} flex items-center justify-center shrink-0`}>
        <span className={`${s.iconColor} font-bold text-sm`}>{s.icon}</span>
      </div>
      <div className="text-white/70 text-sm leading-relaxed">{children}</div>
    </div>
  );
}

function ProgressBar({ value, max = 10 }: { value: number; max?: number }) {
  const pct = (value / max) * 100;
  const barColor = pct >= 70 ? "bg-emerald-400" : pct >= 50 ? "bg-amber-400" : "bg-red-400";
  return (
    <div className="w-full bg-white/5 rounded-full h-2.5">
      <div className={`${barColor} h-2.5 rounded-full transition-all duration-700`} style={{ width: `${pct}%` }} />
    </div>
  );
}

const NAV_ITEMS = [
  { id: "summary", label: "Summary" },
  { id: "audit", label: "Audit" },
  { id: "algorithm", label: "Algorithm" },
  { id: "market", label: "Market" },
  { id: "niche", label: "Niche" },
  { id: "competition", label: "Competition" },
  { id: "portfolio", label: "Portfolio" },
  { id: "profile", label: "New Profile" },
  { id: "action", label: "Action Plan" },
  { id: "keywords", label: "Keywords" },
];

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("summary");

  useEffect(() => {
    const observer = new IntersectionObserver(
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
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

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

  return (
    <div className="min-h-screen bg-[#0a0b0f]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0b0f]/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-indigo-500 flex items-center justify-center text-white text-sm font-bold">
              HH
            </div>
            <span className="text-white/50 text-sm font-medium">Upwork Strategy Dashboard</span>
          </div>
          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                  activeSection === item.id
                    ? "bg-indigo-500/15 text-indigo-300 border border-indigo-500/30"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6">
        {/* Hero */}
        <section id="summary" className="min-h-screen flex flex-col items-center justify-center text-center pt-20 pb-32">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeIn}>
              <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-sm font-semibold tracking-wider uppercase mb-8">
                April 2026
              </span>
            </motion.div>
            <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
              Upwork Profile<br />
              Optimization &amp; Market Strategy
            </motion.h1>
            <motion.p variants={fadeIn} className="text-white/40 text-xl mb-16">
              Prepared for <span className="text-white/80 font-semibold">Hammad H.</span> - Full Overhaul
            </motion.p>
            <motion.div variants={fadeIn} className="flex flex-wrap items-center justify-center gap-12 md:gap-20 mb-16">
              {[
                { value: "100%", label: "Job Success" },
                { value: "$100K+", label: "Earned" },
                { value: "46/80", label: "Profile Score" },
                { value: "109%", label: "AI Demand Growth" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-4xl md:text-5xl font-bold text-emerald-400 font-mono">{stat.value}</p>
                  <p className="text-white/40 text-sm mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
            <motion.div variants={fadeIn}>
              <a
                href="#audit"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("audit")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center px-8 py-4 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-semibold text-lg transition-all shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40"
              >
                View Full Analysis
              </a>
            </motion.div>
          </motion.div>
        </section>

        {/* 01 Executive Summary */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={stagger}
          className="py-24"
        >
          <motion.div variants={fadeIn}>
            <SectionHeader number="01" title="Executive Summary" subtitle="The core problem and the path forward" />
          </motion.div>

          <motion.div variants={fadeIn}>
            <InfoCallout type="warning">
              <span className="font-semibold text-amber-400">Critical Issue:</span> Profile has strong credentials (100% JSS, Top Rated, $100K+) but broken positioning, keyword spam, and a rate that signals commodity work. Six critical issues identified.
            </InfoCallout>
          </motion.div>

          <motion.div variants={fadeIn} className="grid md:grid-cols-3 gap-6 mt-8">
            <Card borderColor="red">
              <div className="text-3xl mb-4">🚨</div>
              <h3 className="text-xl font-bold mb-3">Root Cause</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Profile identity crisis - title tries to cover AI/ML + Full Stack + Python + React. Skills section has 50+ repeated keywords (algorithmic spam). Bio uses unicode bold text that confuses UMA.
              </p>
            </Card>
            <Card borderColor="teal">
              <div className="text-3xl mb-4">🤖</div>
              <h3 className="text-xl font-bold mb-3">Algorithm Issue</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                UMA (Llama 3.1-based AI) uses semantic understanding, not keyword density. Repeating &quot;Generative AI&quot; 5 times hurts ranking. Relevance matching (20-25% weight) is broken by keyword spam.
              </p>
            </Card>
            <Card borderColor="green">
              <div className="text-3xl mb-4">💡</div>
              <h3 className="text-xl font-bold mb-3">Opportunity</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                AI skills demand is up 109% YoY. LLM/RAG development commands $120-250/hr globally. Position as &quot;AI Engineer who ships production SaaS&quot; - a category with near-zero competition from Pakistan.
              </p>
            </Card>
          </motion.div>

          <motion.div variants={fadeIn} className="grid md:grid-cols-3 gap-6 mt-6">
            <Card>
              <Badge variant="danger">Rate Problem</Badge>
              <p className="text-white/60 text-sm leading-relaxed mt-4">
                $40/hr is no-man{"'"}s land - too expensive for budget clients, too cheap for premium. Recommended: $75/hr profile, $60-85/hr proposals.
              </p>
            </Card>
            <Card>
              <Badge variant="strong">Market Tailwind</Badge>
              <p className="text-white/60 text-sm leading-relaxed mt-4">
                AI skills demand grew 109% YoY. AI chatbot dev +71%. AI integration +178%. AI video +329%. Market is moving fast in the right direction.
              </p>
            </Card>
            <Card>
              <Badge variant="info">Positioning Fix</Badge>
              <p className="text-white/60 text-sm leading-relaxed mt-4">
                Move from &quot;AI/ML &amp; Full Stack Developer&quot; to &quot;AI Engineer | LLM Apps, RAG Systems &amp; SaaS&quot; - own the niche with semantic clarity.
              </p>
            </Card>
          </motion.div>
        </motion.section>

        {/* 02 Current Profile Audit */}
        <motion.section
          id="audit"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={stagger}
          className="py-24"
        >
          <motion.div variants={fadeIn}>
            <SectionHeader number="02" title="Current Profile Audit" subtitle="What's working, what's broken" />
          </motion.div>
          <motion.div variants={fadeIn}>
            <Card className="mb-6">
              <div className="space-y-5">
                {[
                  { dim: "Credibility (JSS, Badges)", status: "STRONG", score: 9, variant: "strong" as const },
                  { dim: "Title & Positioning", status: "NEEDS WORK", score: 4, variant: "warning" as const },
                  { dim: "Bio Content & Structure", status: "BROKEN", score: 2, variant: "broken" as const },
                  { dim: "Skills / Keywords", status: "BROKEN", score: 2, variant: "broken" as const },
                  { dim: "Rate Strategy", status: "DANGEROUS", score: 2, variant: "wrong" as const },
                  { dim: "Portfolio", status: "STRONG", score: 8, variant: "strong" as const },
                  { dim: "Work History Alignment", status: "STRONG", score: 8, variant: "strong" as const },
                  { dim: "Recent Activity (90-day)", status: "ACTIVE", score: 8, variant: "strong" as const },
                ].map((row) => (
                  <div key={row.dim} className="flex items-center gap-4 md:gap-6">
                    <span className="text-white/70 text-sm w-48 md:w-56 shrink-0">{row.dim}</span>
                    <div className="w-28 shrink-0">
                      <Badge variant={row.variant}>{row.status}</Badge>
                    </div>
                    <div className="flex-1 hidden md:block">
                      <ProgressBar value={row.score} />
                    </div>
                    <span className="text-white/50 text-sm font-mono w-12 text-right shrink-0">{row.score}/10</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div variants={fadeIn}>
            <Card className="mb-6">
              <h3 className="text-xl font-bold mb-6">Issues Identified</h3>
              <div className="space-y-4">
                {[
                  { n: 1, text: "Massive keyword stuffing block (50+ repeated terms) at bottom of bio - UMA penalizes as algorithmic spam", severity: "CRITICAL" },
                  { n: 2, text: "Rate at $40/hr is dangerously low for Top Rated AI/ML engineer with 100% JSS and $100K+ earnings", severity: "CRITICAL" },
                  { n: 3, text: "Unicode bold formatting throughout bio may confuse UMA's NLP parsing and renders inconsistently", severity: "HIGH" },
                  { n: 4, text: "Title tries to cover 3+ roles (AI/ML + Full Stack + Python + Generative AI + React) - no clear specialization", severity: "HIGH" },
                  { n: 5, text: "First 200 characters waste prime real estate on credential-dumping instead of client-focused hook", severity: "MEDIUM" },
                  { n: 6, text: "Redundant skills: 'API' and 'API Integration' overlap; 'n8n' signals low-code/cheap work", severity: "MEDIUM" },
                  { n: 7, text: "Some hourly jobs billed at $22-30/hr bring down perceived value in work history", severity: "LOW" },
                ].map((item) => (
                  <div key={item.n} className="flex items-start gap-4">
                    <span className="text-indigo-400/60 font-bold font-mono text-lg w-6 shrink-0">{item.n}</span>
                    <p className="text-white/60 text-sm leading-relaxed flex-1">{item.text}</p>
                    <Badge variant={item.severity === "CRITICAL" ? "broken" : item.severity === "HIGH" ? "warning" : "default"}>
                      {item.severity}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div variants={fadeIn}>
            <Card>
              <h3 className="text-xl font-bold mb-6">Current Stats</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "JSS", value: "100%" },
                  { label: "Badge", value: "Top Rated" },
                  { label: "Total Earned", value: "$100K+" },
                  { label: "Total Jobs", value: "47" },
                  { label: "Hours", value: "4,165" },
                  { label: "Current Rate", value: "$40/hr" },
                  { label: "Completed", value: "46" },
                  { label: "In Progress", value: "1" },
                ].map((s) => (
                  <div key={s.label} className="bg-white/[0.03] border border-white/5 rounded-xl p-4">
                    <p className="text-emerald-400 text-2xl font-bold font-mono">{s.value}</p>
                    <p className="text-white/40 text-xs mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </motion.section>

        {/* 03 UMA Algorithm Deep Dive */}
        <motion.section
          id="algorithm"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={stagger}
          className="py-24"
        >
          <motion.div variants={fadeIn}>
            <SectionHeader number="03" title="UMA Algorithm Deep Dive" subtitle="How Upwork's AI decides who gets seen" />
          </motion.div>

          <motion.div variants={fadeIn}>
            <Card className="mb-6">
              <h3 className="text-xl font-bold mb-4">The Engine</h3>
              <div className="flex flex-wrap gap-3 mb-6">
                {["Llama 3.1 70B", "LoRA Fine-tuning", "Multi-Agent System", "Fireworks AI + AWS"].map((tech) => (
                  <span key={tech} className="px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 rounded-lg text-sm font-medium">
                    {tech}
                  </span>
                ))}
              </div>
              <p className="text-white/60 text-sm leading-relaxed">
                UMA is a multi-agent AI with task-specific expert models for profile review, job analysis, feedback, and proposal generation. It has evolved into a Predictive Compatibility Engine in 2026 - it no longer matches on keywords. It predicts which freelancer will get hired, complete the job without disputes, and deliver a 5-star result.
              </p>
            </Card>
          </motion.div>

          <motion.div variants={fadeIn}>
            <Card className="mb-6">
              <h3 className="text-xl font-bold mb-6">How UMA Reads Your Profile</h3>
              <div className="space-y-4">
                {[
                  "Extracts job requirements from client postings (semantic analysis)",
                  "Scans your title, overview, skills, portfolio, work history, feedback",
                  "Generates AI-written match summary showing client why you're a fit",
                  "Ranks you against other freelancers on weighted signals",
                  "Client sees: your profile + Uma's auto-generated relevance summary",
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0">
                      <span className="text-indigo-400 font-bold text-sm">{i + 1}</span>
                    </div>
                    <p className="text-white/60 text-sm leading-relaxed pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div variants={fadeIn}>
            <Card className="mb-6">
              <h3 className="text-xl font-bold mb-2">Ranking Signal Weights</h3>
              <p className="text-white/40 text-sm mb-6">Signal Breakdown - Hammad{"'"}s Status</p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 text-white/40 font-medium">Signal</th>
                      <th className="text-left py-3 text-white/40 font-medium">Weight</th>
                      <th className="text-left py-3 text-white/40 font-medium hidden md:table-cell">Description</th>
                      <th className="text-right py-3 text-white/40 font-medium">Your Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/70">
                    {[
                      { signal: "Job Success Score", weight: "25-30%", desc: "Client satisfaction, private feedback", status: "100% MAXED", variant: "maxed" as const },
                      { signal: "Relevance Match", weight: "20-25%", desc: "Skills + keywords + portfolio vs job", status: "BROKEN", variant: "broken" as const },
                      { signal: "Activity & Response", weight: "15-20%", desc: "Login, response rate, proposals", status: "OK", variant: "ok" as const },
                      { signal: "Earnings Recency", weight: "10-15%", desc: "Last 90 days weighted highest", status: "ACTIVE", variant: "strong" as const },
                      { signal: "Profile Completeness", weight: "10-15%", desc: "Video, portfolio, certs, all fields", status: "STRONG", variant: "strong" as const },
                      { signal: "Client Reviews", weight: "10-15%", desc: "Star ratings, recency", status: "GOOD", variant: "good" as const },
                    ].map((row) => (
                      <tr key={row.signal} className="border-b border-white/5">
                        <td className="py-4 font-medium">{row.signal}</td>
                        <td className="py-4 font-mono text-indigo-300">{row.weight}</td>
                        <td className="py-4 text-white/40 hidden md:table-cell">{row.desc}</td>
                        <td className="py-4 text-right"><Badge variant={row.variant}>{row.status}</Badge></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={fadeIn}>
            <Card className="mb-6">
              <h3 className="text-xl font-bold mb-4">JSS Calculation</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white/60 text-sm font-semibold mb-3">Contract Value Weighting</h4>
                  <div className="space-y-2">
                    {[
                      { range: "$1 - $250", weight: "1x weight" },
                      { range: "$251 - $1,000", weight: "1.25x weight" },
                      { range: "$1,000+", weight: "1.5x weight" },
                    ].map((r) => (
                      <div key={r.range} className="flex justify-between py-2 border-b border-white/5">
                        <span className="text-white/60 text-sm">{r.range}</span>
                        <span className="text-white/80 text-sm font-mono">{r.weight}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-white/60 text-sm font-semibold mb-3">JSS Visibility Thresholds</h4>
                  <div className="space-y-2">
                    {[
                      { range: "90%+", label: "Premium", variant: "strong" as const },
                      { range: "80-89%", label: "Normal", variant: "ok" as const },
                      { range: "75-79%", label: "Reduced", variant: "warning" as const },
                      { range: "<75%", label: "Severely Reduced", variant: "broken" as const },
                    ].map((r) => (
                      <div key={r.range} className="flex justify-between items-center py-2 border-b border-white/5">
                        <span className="text-white/60 text-sm font-mono">{r.range}</span>
                        <Badge variant={r.variant}>{r.label}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={fadeIn}>
            <InfoCallout type="info">
              <span className="font-semibold text-indigo-300">Key UMA Insight:</span> UMA uses SEMANTIC understanding, not keyword density. Repeating keywords 50 times hurts, not helps. The first 200 characters of your bio carry the most weight.
            </InfoCallout>
          </motion.div>
          <motion.div variants={fadeIn} className="mt-4">
            <InfoCallout type="warning">
              <span className="font-semibold text-amber-300">Specialized Profiles Removed May 28, 2026.</span> One profile per freelancer. UMA will dynamically surface your most relevant work per job - but only if portfolio items have clear, keyword-rich descriptions.
            </InfoCallout>
          </motion.div>
        </motion.section>

        {/* 04 Market & Rate Analysis */}
        <motion.section
          id="market"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={stagger}
          className="py-24"
        >
          <motion.div variants={fadeIn}>
            <SectionHeader number="04" title="Market & Rate Analysis" subtitle="Pakistan vs Global rates, demand growth, and pricing strategy" />
          </motion.div>

          <motion.div variants={fadeIn}>
            <Card className="mb-6">
              <h3 className="text-xl font-bold mb-6">Rate Comparison Table</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 text-white/40 font-medium">Category</th>
                      <th className="text-right py-3 text-white/40 font-medium">Pakistan Avg</th>
                      <th className="text-right py-3 text-white/40 font-medium">Global Avg</th>
                      <th className="text-right py-3 text-white/40 font-medium">Top-End</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/70">
                    {[
                      { cat: "General Pakistan Freelancer", pk: "$10-20/hr", global: "-", top: "-" },
                      { cat: "AI Developer (Mid-Level)", pk: "$30-50/hr", global: "$50-150/hr", top: "$200+/hr" },
                      { cat: "AI/LLM Engineering", pk: "$40-75/hr", global: "$100-175/hr", top: "$175-300/hr" },
                      { cat: "Full Stack Dev", pk: "$20-40/hr", global: "$70-120/hr", top: "$160/hr" },
                      { cat: "Hammad's Current Rate", pk: "$40/hr", global: "-", top: "-" },
                    ].map((row) => (
                      <tr key={row.cat} className="border-b border-white/5">
                        <td className="py-4">{row.cat}</td>
                        <td className="py-4 text-right font-mono">{row.pk}</td>
                        <td className="py-4 text-right font-mono">{row.global}</td>
                        <td className="py-4 text-right font-mono text-emerald-400">{row.top}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={fadeIn}>
            <h3 className="text-xl font-bold mb-6">Recommended Tiered Rate Strategy</h3>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {[
                {
                  rate: "$75/hr",
                  type: "Profile Rate",
                  desc: "Visible rate - entry point. High enough for quality signal, low enough to avoid sticker shock. Filters budget clients automatically.",
                },
                {
                  rate: "$60-85/hr",
                  type: "AI/LLM Proposals",
                  desc: "Quote in proposals for AI agent + LLM projects where you're a perfect fit. Justify with project history and 100% JSS.",
                },
                {
                  rate: "$5K-25K+",
                  type: "Fixed-Price Projects",
                  desc: 'Sell outcomes, not hours. "$8K for a complete RAG system" not "100 hours at $80/hr." Value-based pricing.',
                },
              ].map((card) => (
                <Card key={card.type} borderColor="indigo">
                  <p className="text-4xl font-bold text-emerald-400 font-mono mb-2">{card.rate}</p>
                  <p className="text-white/90 font-semibold text-sm mb-3">{card.type}</p>
                  <p className="text-white/50 text-sm leading-relaxed">{card.desc}</p>
                </Card>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeIn}>
            <Card>
              <h3 className="text-xl font-bold mb-4">AI Skills Demand Growth (Upwork Official 2026)</h3>
              <div className="space-y-3 mt-6">
                {[
                  { skill: "AI Video Generation & Editing", growth: "+329%", pct: 100 },
                  { skill: "AI Integration", growth: "+178%", pct: 54 },
                  { skill: "AI Data Annotation & Labeling", growth: "+154%", pct: 47 },
                  { skill: "AI Skills (Overall)", growth: "+109%", pct: 33 },
                  { skill: "AI Chatbot Development", growth: "+71%", pct: 22 },
                ].map((row) => (
                  <div key={row.skill}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-white/70 text-sm">{row.skill}</span>
                      <span className="text-emerald-400 font-mono text-sm font-bold">{row.growth}</span>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-2">
                      <div className="bg-emerald-400 h-2 rounded-full transition-all duration-700" style={{ width: `${row.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </motion.section>

        {/* 05 Niche Keyword Strategy */}
        <motion.section
          id="niche"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={stagger}
          className="py-24"
        >
          <motion.div variants={fadeIn}>
            <SectionHeader number="05" title="Niche Keyword Strategy" subtitle="Where to position for maximum visibility and minimum competition" />
          </motion.div>

          <motion.div variants={fadeIn}>
            <Card className="mb-6">
              <h3 className="text-lg font-bold mb-2">Primary Keywords</h3>
              <p className="text-white/40 text-xs mb-5">Title + First 200 chars + Skills - highest algorithmic weight</p>
              <div className="space-y-3">
                {[
                  { kw: "AI Engineer", note: "+109% demand, semantic match to new title" },
                  { kw: "LLM Applications", note: "Differentiates from generic 'AI developer' crowd" },
                  { kw: "RAG Systems", note: "Technical differentiator, growing demand" },
                  { kw: "LangChain", note: "Clients search for this specific tech stack" },
                  { kw: "OpenAI API", note: "High-volume search term" },
                  { kw: "SaaS Development", note: "Consistent demand, proven track record" },
                ].map((row) => (
                  <div key={row.kw} className="flex items-center gap-4 py-2 border-b border-white/5">
                    <span className="text-emerald-400 font-semibold text-sm w-40 shrink-0">{row.kw}</span>
                    <span className="text-white/40 text-sm">{row.note}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div variants={fadeIn}>
            <Card className="mb-6">
              <h3 className="text-lg font-bold mb-2">Secondary Keywords</h3>
              <p className="text-white/40 text-xs mb-5">Bio body + Portfolio descriptions - moderate weight</p>
              <div className="flex flex-wrap gap-2">
                {["Generative AI", "Vector Database", "Pinecone", "LlamaIndex", "Django", "React", "Next.js", "PostgreSQL", "AWS", "Machine Learning", "NLP", "Chatbot Development", "FastAPI", "AI Automation"].map((kw) => (
                  <span key={kw} className="px-3 py-1.5 bg-white/5 text-white/60 border border-white/10 rounded-lg text-sm">
                    {kw}
                  </span>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div variants={fadeIn}>
            <Card>
              <h3 className="text-lg font-bold mb-2">Long-Tail Sniper Keywords</h3>
              <p className="text-white/40 text-xs mb-5">Portfolio descriptions - near-zero competition</p>
              <div className="space-y-3">
                {[
                  { kw: "LLM app development with RAG", comp: "Very Low" },
                  { kw: "AI agent builder Python LangChain", comp: "Very Low" },
                  { kw: "custom GPT integration SaaS", comp: "Low" },
                  { kw: "enterprise AI chatbot Django", comp: "Very Low" },
                  { kw: "vector search RAG pipeline developer", comp: "Very Low" },
                  { kw: "AI-powered SaaS MVP builder", comp: "Low" },
                ].map((row) => (
                  <div key={row.kw} className="flex items-center justify-between py-2 border-b border-white/5">
                    <span className="text-white/60 text-sm font-mono">{row.kw}</span>
                    <Badge variant="strong">{row.comp}</Badge>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </motion.section>

        {/* 06 Job Volume & Competition */}
        <motion.section
          id="competition"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={stagger}
          className="py-24"
        >
          <motion.div variants={fadeIn}>
            <SectionHeader number="06" title="Job Volume & Competition" subtitle="Active jobs, proposals per listing, and the opportunity gap" />
          </motion.div>

          <motion.div variants={fadeIn}>
            <Card className="mb-6">
              <h3 className="text-xl font-bold mb-6">Platform Statistics</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { value: "12,000+", label: "AI/ML jobs posted monthly" },
                  { value: "15-30", label: "Avg proposals per AI job" },
                  { value: "3,500+", label: "LLM/RAG specific jobs" },
                  { value: "2,000+", label: "AI agent jobs (growing)" },
                  { value: "$5K-25K", label: "Avg AI project budget" },
                  { value: "$150-300/hr", label: "Top AI freelancer rate" },
                ].map((s) => (
                  <div key={s.label} className="bg-white/[0.03] border border-white/5 rounded-xl p-4">
                    <p className="text-emerald-400 text-2xl font-bold font-mono">{s.value}</p>
                    <p className="text-white/40 text-xs mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div variants={fadeIn}>
            <Card>
              <h3 className="text-xl font-bold mb-6">Competitor Landscape</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 text-white/40 font-medium">Type</th>
                      <th className="text-right py-3 text-white/40 font-medium">Rate</th>
                      <th className="text-right py-3 text-white/40 font-medium">Positioning</th>
                      <th className="text-right py-3 text-white/40 font-medium">Threat</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/70">
                    {[
                      { type: "Budget full-stack devs (India/PK)", rate: "$15-30/hr", pos: "Generalist", threat: "Low", v: "strong" as const },
                      { type: "Mid-tier AI freelancers", rate: "$40-60/hr", pos: "AI + Full Stack", threat: "Medium", v: "warning" as const },
                      { type: "Specialized AI engineers (US/EU)", rate: "$120-200/hr", pos: "AI-only", threat: "Low (diff market)", v: "strong" as const },
                      { type: "AI agencies", rate: "$80-150/hr", pos: "Team-based", threat: "Medium", v: "warning" as const },
                      { type: "Top Rated Plus AI from PK", rate: "$60-100/hr", pos: "Specialized AI", threat: "High", v: "broken" as const },
                    ].map((row) => (
                      <tr key={row.type} className="border-b border-white/5">
                        <td className="py-4">{row.type}</td>
                        <td className="py-4 text-right font-mono">{row.rate}</td>
                        <td className="py-4 text-right">{row.pos}</td>
                        <td className="py-4 text-right"><Badge variant={row.v}>{row.threat}</Badge></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-6">
                <InfoCallout type="info">
                  <span className="font-semibold text-indigo-300">Key Insight:</span> Hammad{"'"}s unique edge is production-grade AI + full-stack SaaS execution + Top Rated + 100% JSS from Pakistan. Very few competitors combine deep AI expertise with proven SaaS delivery at this credential level. Position as &quot;AI Engineer who ships production SaaS&quot; - not a generalist full-stack developer.
                </InfoCallout>
              </div>
            </Card>
          </motion.div>
        </motion.section>

        {/* 07 Portfolio Assets */}
        <motion.section
          id="portfolio"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={stagger}
          className="py-24"
        >
          <motion.div variants={fadeIn}>
            <SectionHeader number="07" title="Portfolio Assets" subtitle="Prioritized for Upwork - what to add and what to avoid" />
          </motion.div>

          {[
            {
              tier: "TIER 1 - Must Add",
              items: [
                { title: "AI-Powered Directory Platform with Bulk Posting Automation", desc: "Built intelligent directory system with AI-driven bulk posting, automated content generation, and smart categorization. $12K project with 5-star review.", tags: ["AI Automation", "Python", "React", "LLM Integration"], label: "YOUR #1 PROOF POINT for AI + SaaS builds" },
                { title: "RAG-Powered Enterprise Knowledge Base", desc: "Custom retrieval-augmented generation system with vector search, document parsing, and conversational AI. Built with LangChain, Pinecone, and OpenAI.", tags: ["RAG", "LangChain", "Pinecone", "OpenAI", "Vector DB"], label: "Proves AI-native products, not just API wrappers" },
                { title: "Web3 & Fintech MVP - AI-Powered Loyalty Platform", desc: "Full-stack MVP for blockchain-based loyalty platform with AI-driven reward optimization. Sprint-based delivery with 5-star review.", tags: ["Web3", "AI", "React", "Node.js", "MVP"], label: "Proves complex SaaS architecture at scale" },
              ],
            },
            {
              tier: "TIER 2 - Should Add",
              items: [
                { title: "Property Automation Platform (Strada.ai)", desc: "Django/React platform with enterprise API integrations (Yardi, Gmail, Outlook), task automation, and scheduling workflows.", tags: ["Django", "React", "AWS", "Enterprise", "Automation"], label: "Enterprise client + automation focus" },
                { title: "AI Chatbot with Microsoft/Twilio Integration", desc: "Automated bot system with Microsoft integrations and Twilio messaging. Python backend with intelligent conversation flows.", tags: ["AI Chatbot", "Python", "Twilio", "Microsoft", "NLP"], label: "Proves chatbot/integration expertise" },
                { title: "Airbyte Connector for IFS ERP to Databricks", desc: "Custom Airbyte connector for enterprise data pipeline. Automated extraction, transformation, and loading with intelligent error handling.", tags: ["ETL", "AI Agent", "Python", "Databricks", "Enterprise"], label: "Enterprise data engineering proof" },
              ],
            },
          ].map((section) => (
            <motion.div variants={fadeIn} key={section.tier} className="mb-8">
              <h3 className="text-lg font-bold mb-4">
                <Badge variant={section.tier.includes("1") ? "strong" : "info"}>{section.tier}</Badge>
              </h3>
              <div className="space-y-4">
                {section.items.map((item) => (
                  <Card key={item.title}>
                    <p className="text-indigo-400/60 text-xs font-semibold uppercase tracking-wider mb-2">{item.label}</p>
                    <h4 className="text-white/90 text-lg font-semibold mb-2">{item.title}</h4>
                    <p className="text-white/50 text-sm mb-4 leading-relaxed">{item.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span key={tag} className="px-2.5 py-1 bg-indigo-500/10 text-indigo-300/80 text-xs rounded-md border border-indigo-500/15">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </motion.div>
          ))}

          <motion.div variants={fadeIn}>
            <InfoCallout type="danger">
              <span className="font-semibold text-red-400">Do NOT add:</span> Generic &quot;website development&quot; or &quot;WordPress&quot; portfolio items. These dilute the AI specialization signal. Every portfolio item should reinforce the &quot;AI Engineer who builds production SaaS&quot; positioning.
            </InfoCallout>
          </motion.div>
        </motion.section>

        {/* 08 Rewritten Profile */}
        <motion.section
          id="profile"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={stagger}
          className="py-24"
        >
          <motion.div variants={fadeIn}>
            <SectionHeader number="08" title="Rewritten Profile" subtitle="Copy-paste ready - optimized for UMA's semantic matching" />
          </motion.div>

          <motion.div variants={fadeIn}>
            <Card className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold">TITLE</h3>
                  <p className="text-white/40 text-xs mt-1 font-mono">{newTitle.length} / 50 characters</p>
                </div>
                <CopyButton text={newTitle} label="Copy Title" />
              </div>
              <div className="p-5 bg-white/[0.03] rounded-xl border border-indigo-500/20 font-mono text-indigo-300 text-lg">
                {newTitle}
              </div>
            </Card>
          </motion.div>

          <motion.div variants={fadeIn}>
            <Card className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold">BIO / OVERVIEW</h3>
                  <p className="text-white/40 text-xs mt-1">First 200 chars are critical for UMA</p>
                </div>
                <CopyButton text={newBio} label="Copy Bio" />
              </div>
              <div className="p-5 bg-white/[0.03] rounded-xl border border-white/10">
                <pre className="text-white/70 text-sm whitespace-pre-wrap font-sans leading-relaxed">
                  {newBio}
                </pre>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={fadeIn}>
            <Card className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold">SKILLS</h3>
                  <p className="text-white/40 text-xs mt-1 font-mono">15 / 15 max</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {newSkills.map((skill) => (
                  <span key={skill} className="px-3 py-1.5 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 rounded-lg text-sm font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div variants={fadeIn}>
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">EMPLOYMENT HISTORY UPDATE</h3>
                <CopyButton
                  text="Lead Full Stack Engineer | Strada.ai | January 2025 - Present\nLed end-to-end build of AI-powered property automation platform. Integrated enterprise APIs (Yardi, Gmail, Outlook), built task automation reducing admin overhead by 60%. Django/DRF + React + TypeScript + AWS.\n\nSenior Full-Stack Engineer | edX | May 2023 - December 2024\nContributed to ML-powered recommendation systems and data pipeline optimization on global EdTech platform serving millions of learners. Django backend, DevOps automation with Ansible and CI/CD.\n\nBackend Engineer | Ugami | January 2021 - December 2023\nBuilt intelligent reward algorithms and predictive analytics for gamified fintech platform. Integrated banking-as-a-service, card transactions, and loyalty APIs."
                  label="Copy Employment"
                />
              </div>
              <div className="space-y-5">
                {[
                  {
                    role: "Lead Full Stack Engineer | Strada.ai",
                    period: "January 2025 - Present",
                    desc: "Led end-to-end build of AI-powered property automation platform. Integrated enterprise APIs (Yardi, Gmail, Outlook), built task automation reducing admin overhead by 60%. Django/DRF + React + TypeScript + AWS.",
                  },
                  {
                    role: "Senior Full-Stack Engineer | edX",
                    period: "May 2023 - December 2024",
                    desc: "Contributed to ML-powered recommendation systems and data pipeline optimization on global EdTech platform serving millions of learners. Django backend, DevOps automation with Ansible and CI/CD.",
                  },
                  {
                    role: "Backend Engineer | Ugami",
                    period: "January 2021 - December 2023",
                    desc: "Built intelligent reward algorithms and predictive analytics for gamified fintech platform. Integrated banking-as-a-service, card transactions, and loyalty APIs.",
                  },
                ].map((item) => (
                  <div key={item.role} className="p-4 bg-white/[0.02] rounded-xl border border-white/5">
                    <h4 className="text-white/90 font-semibold">{item.role}</h4>
                    <p className="text-white/40 text-xs mb-2">{item.period}</p>
                    <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </motion.section>

        {/* 09 Action Plan */}
        <motion.section
          id="action"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={stagger}
          className="py-24"
        >
          <motion.div variants={fadeIn}>
            <SectionHeader number="09" title="Action Plan & Timeline" subtitle="Step-by-step execution roadmap" />
          </motion.div>

          {[
            {
              phase: "THIS WEEK",
              subtitle: "Immediate Actions",
              badgeVariant: "broken" as const,
              items: [
                { n: 1, text: 'Replace title with: "AI Engineer | LLM Apps, RAG Systems & SaaS"', fix: "Relevance matching", priority: "CRITICAL" },
                { n: 2, text: "Replace bio with new version (delete ALL keyword spam + unicode)", fix: "Relevance + completeness", priority: "CRITICAL" },
                { n: 3, text: "Replace skills with 15 clean, strategic skills", fix: "Relevance matching", priority: "CRITICAL" },
                { n: 4, text: "Change profile rate from $40/hr to $75/hr", fix: "Market positioning", priority: "CRITICAL" },
                { n: 5, text: "Update employment history with AI-focused descriptions", fix: "Completeness", priority: "HIGH" },
              ],
            },
            {
              phase: "WITHIN 2 WEEKS",
              subtitle: "Short-Term Actions",
              badgeVariant: "warning" as const,
              items: [
                { n: 6, text: "Add 4-6 portfolio items with AI-optimized descriptions", fix: "Relevance + completeness", priority: "HIGH" },
                { n: 7, text: "Send 10 targeted proposals to AI/LLM/RAG jobs at $60-85/hr", fix: "Activity signal", priority: "HIGH" },
                { n: 8, text: "Record profile intro video (AI engineering focus)", fix: "Completeness + relevance", priority: "MEDIUM" },
                { n: 9, text: "Close/request feedback on any stale contracts", fix: "Activity + JSS", priority: "MEDIUM" },
              ],
            },
            {
              phase: "WITHIN 30 DAYS",
              subtitle: "Medium-Term Actions",
              badgeVariant: "default" as const,
              items: [
                { n: 10, text: "Complete one quick-win AI contract to reset 90-day recency", fix: "90-day recency reset", priority: "HIGH" },
                { n: 11, text: "Pursue 2-3 fixed-price AI projects at $5K+", fix: "High-value work history", priority: "MEDIUM" },
                { n: 12, text: "Target AI agent, RAG, LLM-specific jobs exclusively for 30 days", fix: "Retrain UMA matching", priority: "MEDIUM" },
                { n: 13, text: "Monitor invite rates - expect improvement within 2-3 weeks", fix: "Tracking", priority: "LOW" },
              ],
            },
          ].map((phase) => (
            <motion.div variants={fadeIn} key={phase.phase} className="mb-8">
              <Card>
                <div className="flex items-center gap-3 mb-6">
                  <h3 className="text-xl font-bold">{phase.phase}</h3>
                  <span className="text-white/40 text-sm">{phase.subtitle}</span>
                </div>
                <div className="space-y-4">
                  {phase.items.map((item) => (
                    <div key={item.n} className="flex items-start gap-4 p-4 bg-white/[0.02] rounded-xl border border-white/5">
                      <span className="text-indigo-400 font-bold font-mono text-lg w-6 shrink-0">{item.n}</span>
                      <div className="flex-1">
                        <p className="text-white/80 text-sm">{item.text}</p>
                        <p className="text-white/30 text-xs mt-1">Fixes: {item.fix}</p>
                      </div>
                      <Badge variant={item.priority === "CRITICAL" ? "broken" : item.priority === "HIGH" ? "warning" : "default"}>
                        {item.priority}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.section>

        {/* 10 Job Search Keywords */}
        <motion.section
          id="keywords"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={stagger}
          className="py-24"
        >
          <motion.div variants={fadeIn}>
            <SectionHeader number="10" title="Job Search Keywords" subtitle="Exact search terms to find the highest-value jobs on Upwork" />
          </motion.div>

          <motion.div variants={fadeIn}>
            <InfoCallout type="info">
              <span className="font-semibold text-indigo-300">How to use:</span> Search these keywords on Upwork daily. Set up Saved Searches with email alerts for Tier 1 keywords so you{"'"}re first to apply. Combine terms for laser-targeted results.
            </InfoCallout>
          </motion.div>

          <motion.div variants={fadeIn} className="mt-8">
            <Card className="mb-6">
              <h3 className="text-lg font-bold mb-2">TIER 1</h3>
              <p className="text-white/40 text-xs mb-5">Strongest Differentiators - Search Daily</p>
              <div className="space-y-3">
                {[
                  { kw: '"AI agent"', badges: ["HIGH VOL", "EXACT TITLE MATCH"] },
                  { kw: '"LLM application development"', badges: ["HIGH VOL", "SKILL MATCH"] },
                  { kw: '"RAG pipeline developer"', badges: ["MED VOL", "NICHE"] },
                  { kw: '"AI SaaS"', badges: ["MED VOL", "TITLE MATCH"] },
                  { kw: '"LangChain developer"', badges: ["MED VOL", "SKILL MATCH"] },
                  { kw: '"AI security"', badges: ["LOW VOL", "ZERO COMPETITION"] },
                ].map((row) => (
                  <div key={row.kw} className="flex items-center justify-between py-3 border-b border-white/5">
                    <span className="text-white/80 text-sm font-mono font-semibold">{row.kw}</span>
                    <div className="flex gap-2">
                      {row.badges.map((b) => (
                        <Badge key={b} variant={b.includes("HIGH") ? "strong" : b.includes("ZERO") ? "info" : "default"}>{b}</Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div variants={fadeIn}>
            <Card className="mb-6">
              <h3 className="text-lg font-bold mb-2">TIER 2</h3>
              <p className="text-white/40 text-xs mb-5">High-Value Technical Keywords</p>
              <div className="space-y-3">
                {[
                  { kw: '"OpenAI API"', badges: ["HIGH VOL"] },
                  { kw: '"AI chatbot"', badges: ["HIGH VOL"] },
                  { kw: '"Next.js AI"', badges: ["MED VOL"] },
                  { kw: '"RAG" / "retrieval augmented generation"', badges: ["MED VOL"] },
                  { kw: '"Python AI developer"', badges: ["HIGH VOL"] },
                  { kw: '"generative AI engineer"', badges: ["MED VOL"] },
                ].map((row) => (
                  <div key={row.kw} className="flex items-center justify-between py-3 border-b border-white/5">
                    <span className="text-white/70 text-sm font-mono">{row.kw}</span>
                    <div className="flex gap-2">
                      {row.badges.map((b) => (
                        <Badge key={b} variant={b.includes("HIGH") ? "strong" : "default"}>{b}</Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div variants={fadeIn}>
            <Card className="mb-6">
              <h3 className="text-lg font-bold mb-2">COMBOS</h3>
              <p className="text-white/40 text-xs mb-5">Multi-Term Searches - Less Competition, Premium Results</p>
              <div className="space-y-3">
                {[
                  { combo: '"AI agent" + Next.js', desc: "Full-stack AI apps" },
                  { combo: '"LangChain" + SaaS', desc: "AI-powered products" },
                  { combo: '"RAG" + Python', desc: "Backend RAG work" },
                  { combo: '"autonomous" + Python API', desc: "Backend agent work" },
                  { combo: '"AI" + "full stack" + Django', desc: "Direct portfolio proof" },
                ].map((row) => (
                  <div key={row.combo} className="flex items-center justify-between py-3 border-b border-white/5">
                    <span className="text-indigo-300 text-sm font-mono">{row.combo}</span>
                    <span className="text-white/40 text-sm">{row.desc}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div variants={fadeIn}>
            <Card>
              <h3 className="text-lg font-bold mb-4">Pro Tips</h3>
              <div className="space-y-3">
                {[
                  'Lead with "AI agent" and "LLM" - these are the hottest Upwork keywords right now',
                  "Apply within the first hour of posting - UMA gives early applicants a ranking boost",
                  "Don't bid below $55/hr - with Top Rated, $100K+ earnings, and 100% JSS, push $60-85/hr minimum",
                  'Set up Saved Searches with alerts for: "AI agent", "LangChain", "RAG", "AI SaaS"',
                  "Reference specific completed projects in proposals - mention the $12K directory build, $72K OhmConnect contract",
                ].map((tip, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-emerald-400 font-bold font-mono text-sm shrink-0">{i + 1}</span>
                    <p className="text-white/60 text-sm leading-relaxed">{tip}</p>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </motion.section>

        {/* Footer */}
        <footer className="border-t border-white/5 py-12 mt-10 text-center">
          <p className="text-white/30 text-sm">
            Upwork Profile Strategy Report - Hammad H.
          </p>
          <p className="text-white/20 text-xs mt-2">
            Generated April 2026 | Data: Upwork Official, UMA Algorithm Research, GigRadar, Jobbers
          </p>
        </footer>
      </div>
    </div>
  );
}
