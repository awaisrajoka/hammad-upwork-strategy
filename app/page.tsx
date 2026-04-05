"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

function Badge({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: "strong" | "broken" | "warning" | "default" | "danger";
}) {
  const colors = {
    strong: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    broken: "bg-red-500/10 text-red-400 border-red-500/20",
    warning: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    danger: "bg-red-500/10 text-red-400 border-red-500/20",
    default: "bg-white/5 text-white/60 border-white/10",
  };
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors[variant]}`}
    >
      {children}
    </span>
  );
}

function SectionNumber({ number }: { number: string }) {
  return (
    <span className="text-[80px] font-bold text-white/[0.03] leading-none absolute -top-2 -left-2 select-none pointer-events-none">
      {number}
    </span>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-xl p-6 ${className}`}
    >
      {children}
    </div>
  );
}

function ProgressBar({ value, max = 10, color = "emerald" }: { value: number; max?: number; color?: string }) {
  const pct = (value / max) * 100;
  const colorMap: Record<string, string> = {
    emerald: "bg-emerald-400",
    red: "bg-red-400",
    amber: "bg-amber-400",
  };
  const barColor = pct >= 70 ? colorMap.emerald : pct >= 50 ? colorMap.amber : colorMap.red;
  return (
    <div className="w-full bg-white/5 rounded-full h-2">
      <div className={`${barColor} h-2 rounded-full transition-all duration-700`} style={{ width: `${pct}%` }} />
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="px-3 py-1 text-xs rounded-md bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-white/60 hover:text-white"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

export default function Dashboard() {
  const newTitle = "AI Engineer | LLM Apps, RAG Systems & SaaS";
  const newBio = `I build production-grade AI systems that drive revenue - LLM applications, RAG pipelines, and AI-powered SaaS platforms. 100% Job Success across 47 projects and $100K+ earned on Upwork.

What I Deliver:
- Custom LLM applications with retrieval-augmented generation (RAG), vector search, and memory workflows
- AI-powered SaaS platforms from MVP to scale - Django, React, PostgreSQL, AWS
- Intelligent chatbots and AI agents that integrate with enterprise systems
- Data pipelines, automation tools, and predictive analytics dashboards

Technical Stack:
AI/ML: OpenAI, LangChain, LlamaIndex, Pinecone, Hugging Face, TensorFlow, PyTorch
Backend: Python (Django, FastAPI), Node.js, REST APIs
Frontend: React, Next.js, TypeScript
Databases: PostgreSQL, MongoDB, Redis
Cloud: AWS, GCP, Azure, Docker, Kubernetes

Recent Highlights:
- Built AI-powered directory platform with bulk posting automation ($12K project)
- Delivered Web3 & Fintech MVP for loyalty platform across multiple sprints
- Developed Airbyte connector for IFS ERP to Databricks Lakehouse integration
- Led property automation platform build at Strada.ai (Django/React/AWS)
- Senior Full-Stack Engineer at edX serving millions of learners globally

I work with founders, CTOs, and product teams who need AI integrated into real products - not prototypes. Fast communication, clean architecture, on-time delivery.

Let's talk about your project.`;

  const newSkills = [
    "AI Agent Development",
    "Python",
    "LangChain",
    "OpenAI API",
    "Generative AI",
    "RAG",
    "Machine Learning",
    "React",
    "Full-Stack Development",
    "SaaS Development",
    "Django",
    "PostgreSQL",
    "Amazon Web Services",
    "Node.js",
    "AI Chatbot Development",
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-sm font-bold">
              HH
            </div>
            <span className="text-white/60 text-sm">Upwork Strategy Dashboard</span>
          </div>
          <span className="text-white/30 text-xs">Generated April 6, 2026</span>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 pt-24 pb-20">
        {/* Hero */}
        <motion.section initial="hidden" animate="visible" variants={stagger} className="mb-20">
          <motion.div variants={fadeIn}>
            <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight">
              Upwork Profile Optimization
              <br />
              <span className="text-emerald-400">&amp; Market Strategy</span>
            </h1>
            <p className="text-white/40 text-lg mb-10">
              Prepared for <span className="text-white/80">Hammad H.</span> - Full Overhaul
            </p>
          </motion.div>
          <motion.div variants={fadeIn} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Overall Score", value: "46/80", sub: "Needs Work" },
              { label: "Current Rate", value: "$40/hr", sub: "Dangerously Low" },
              { label: "Job Success", value: "100%", sub: "Excellent" },
              { label: "Critical Issues", value: "6", sub: "Found" },
            ].map((stat) => (
              <Card key={stat.label}>
                <p className="text-white/40 text-xs uppercase tracking-wider mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-white/40 text-xs mt-1">{stat.sub}</p>
              </Card>
            ))}
          </motion.div>
        </motion.section>

        {/* 01 Executive Summary */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="mb-20 relative"
        >
          <SectionNumber number="01" />
          <motion.div variants={fadeIn}>
            <h2 className="text-2xl font-bold mb-6 pl-2">Executive Summary</h2>
          </motion.div>
          <motion.div variants={fadeIn}>
            <Card>
              <div className="space-y-4">
                {[
                  {
                    title: "Core Problem",
                    desc: "Profile has strong credentials (100% JSS, Top Rated, $100K+) but broken positioning, keyword spam, and a rate that signals commodity work.",
                    badge: "broken" as const,
                  },
                  {
                    title: "Root Cause",
                    desc: "Massive keyword stuffing block (50+ repeated terms) at the bottom of the bio is actively penalized by UMA's 2026 semantic engine. The algorithm reads this as spam.",
                    badge: "danger" as const,
                  },
                  {
                    title: "Algorithm Issue",
                    desc: "UMA no longer matches on keyword density - it uses LLM-based semantic understanding. Repeating 'Generative AI' 5 times hurts more than it helps.",
                    badge: "broken" as const,
                  },
                  {
                    title: "Rate Problem",
                    desc: "$40/hr with Top Rated + 100% JSS + AI/ML skills is leaving $30-60/hr on the table. Premium clients skip profiles priced this low.",
                    badge: "danger" as const,
                  },
                  {
                    title: "Market Tailwind",
                    desc: "AI skills demand is up 109% YoY on Upwork. AI agent development, LLM integration, and RAG systems are the highest-growth categories.",
                    badge: "strong" as const,
                  },
                  {
                    title: "The Fix",
                    desc: "Delete keyword spam, rewrite bio for semantic clarity, raise rate to $75/hr, specialize title around AI engineering. Expected result: more invites from higher-quality clients.",
                    badge: "strong" as const,
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4 items-start">
                    <Badge variant={item.badge}>{item.title}</Badge>
                    <p className="text-white/70 text-sm flex-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </motion.section>

        {/* 02 Current Profile Audit */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="mb-20 relative"
        >
          <SectionNumber number="02" />
          <motion.div variants={fadeIn}>
            <h2 className="text-2xl font-bold mb-6 pl-2">Current Profile Audit</h2>
          </motion.div>
          <motion.div variants={fadeIn}>
            <Card className="mb-4">
              <h3 className="text-lg font-semibold mb-4 text-white/90">Profile Scorecard</h3>
              <div className="space-y-3">
                {[
                  { dim: "Credibility (JSS, Badges)", rating: "STRONG", score: 9, variant: "strong" as const },
                  { dim: "Title & Positioning", rating: "NEEDS WORK", score: 4, variant: "warning" as const },
                  { dim: "Bio / Overview", rating: "BROKEN", score: 2, variant: "broken" as const },
                  { dim: "Skills Selection", rating: "OK", score: 5, variant: "warning" as const },
                  { dim: "Rate Strategy", rating: "DANGEROUS", score: 2, variant: "broken" as const },
                  { dim: "Portfolio", rating: "STRONG", score: 8, variant: "strong" as const },
                  { dim: "Work History", rating: "STRONG", score: 8, variant: "strong" as const },
                  { dim: "Recent Activity (90-day)", rating: "ACTIVE", score: 8, variant: "strong" as const },
                ].map((row) => (
                  <div key={row.dim} className="flex items-center gap-4">
                    <span className="text-white/60 text-sm w-52 shrink-0">{row.dim}</span>
                    <Badge variant={row.variant}>{row.rating}</Badge>
                    <div className="flex-1">
                      <ProgressBar value={row.score} />
                    </div>
                    <span className="text-white/80 text-sm font-mono w-10 text-right">{row.score}/10</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-white/60">Overall Score</span>
                <span className="text-2xl font-bold text-amber-400">46/80</span>
              </div>
            </Card>
          </motion.div>
          <motion.div variants={fadeIn}>
            <Card>
              <h3 className="text-lg font-semibold mb-4 text-white/90">Issues Identified</h3>
              <div className="space-y-3">
                {[
                  { severity: "CRITICAL", issue: "Massive keyword stuffing block (50+ repeated terms) at bottom of bio - UMA penalizes this as algorithmic spam" },
                  { severity: "CRITICAL", issue: "Rate at $40/hr is dangerously low for Top Rated AI/ML engineer with 100% JSS and $100K+ earnings" },
                  { severity: "HIGH", issue: "Unicode bold formatting throughout bio may confuse UMA's NLP parsing and renders inconsistently" },
                  { severity: "HIGH", issue: "Title tries to cover 3 roles (AI/ML + Full Stack + Python + Generative AI + React) - no clear specialization" },
                  { severity: "MEDIUM", issue: "First 200 characters waste prime real estate on credential-dumping instead of client-focused hook" },
                  { severity: "MEDIUM", issue: "Redundant skills: 'API' and 'API Integration' overlap; 'n8n' signals low-code/cheap work" },
                  { severity: "LOW", issue: "Some hourly jobs billed at $22-30/hr bring down perceived value in work history" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Badge
                      variant={
                        item.severity === "CRITICAL" ? "broken" : item.severity === "HIGH" ? "danger" : item.severity === "MEDIUM" ? "warning" : "default"
                      }
                    >
                      {item.severity}
                    </Badge>
                    <p className="text-white/70 text-sm">{item.issue}</p>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
          <motion.div variants={fadeIn} className="mt-4">
            <Card>
              <h3 className="text-lg font-semibold mb-4 text-white/90">Current Stats</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Job Success", value: "100%" },
                  { label: "Badge", value: "Top Rated" },
                  { label: "Total Earnings", value: "$100K+" },
                  { label: "Total Jobs", value: "47" },
                  { label: "Total Hours", value: "4,165" },
                  { label: "Response Time", value: "4-8 hrs" },
                  { label: "Current Rate", value: "$40/hr" },
                  { label: "Portfolio Items", value: "15 pages" },
                ].map((s) => (
                  <div key={s.label} className="bg-white/[0.02] rounded-lg p-3">
                    <p className="text-white/40 text-xs">{s.label}</p>
                    <p className="text-white font-semibold">{s.value}</p>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </motion.section>

        {/* 03 UMA Algorithm Deep Dive */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="mb-20 relative"
        >
          <SectionNumber number="03" />
          <motion.div variants={fadeIn}>
            <h2 className="text-2xl font-bold mb-6 pl-2">UMA Algorithm Deep Dive</h2>
          </motion.div>
          <motion.div variants={fadeIn}>
            <Card className="mb-4">
              <h3 className="text-lg font-semibold mb-2 text-white/90">The Engine</h3>
              <p className="text-white/60 text-sm mb-4">
                Upwork{"'"}s UMA (Upwork Mindful AI) has evolved into a Predictive Compatibility Engine in 2026. Built on Llama 3.1 70B with LoRA fine-tuning, it no longer matches on keywords - it predicts which freelancer will get hired, complete the job without disputes, and deliver a 5-star result.
              </p>
              <h3 className="text-lg font-semibold mb-2 text-white/90">How UMA Reads Hammad{"'"}s Profile</h3>
              <p className="text-white/60 text-sm">
                UMA uses semantic understanding to parse profiles. It reads the first 200 characters with the heaviest weight, then scans portfolio descriptions using Computer Vision and NLP. Repeating keywords is flagged as spam. Unicode formatting can confuse the NLP parser. The keyword block at the bottom of Hammad{"'"}s bio is likely triggering UMA{"'"}s spam detection, actively suppressing his visibility.
              </p>
            </Card>
          </motion.div>
          <motion.div variants={fadeIn}>
            <Card>
              <h3 className="text-lg font-semibold mb-4 text-white/90">Ranking Signal Weights</h3>
              <div className="space-y-3">
                {[
                  { signal: "Job Success Score", weight: "25-30%", desc: "Client satisfaction, private feedback", pct: 90 },
                  { signal: "Relevance Match", weight: "20-25%", desc: "Semantic match of skills + portfolio vs job", pct: 30 },
                  { signal: "Activity & Response", weight: "15-20%", desc: "Login frequency, response rate, proposals", pct: 80 },
                  { signal: "Earnings Recency", weight: "10-15%", desc: "Last 90 days weighted highest", pct: 75 },
                  { signal: "Profile Completeness", weight: "10-15%", desc: "Video, portfolio, certs, all fields filled", pct: 70 },
                  { signal: "Client Reviews", weight: "10-15%", desc: "Star ratings + recency of reviews", pct: 90 },
                ].map((row) => (
                  <div key={row.signal}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white/80 text-sm">{row.signal}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-white/40 text-xs">{row.desc}</span>
                        <span className="text-emerald-400 text-sm font-mono">{row.weight}</span>
                      </div>
                    </div>
                    <div className="w-full bg-white/5 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-700 ${row.pct >= 70 ? "bg-emerald-400" : row.pct >= 50 ? "bg-amber-400" : "bg-red-400"}`}
                        style={{ width: `${row.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-red-500/5 border border-red-500/10 rounded-lg">
                <p className="text-red-400 text-sm font-semibold mb-1">Key Insight</p>
                <p className="text-white/60 text-sm">
                  Hammad scores excellently on JSS, reviews, and activity - but the Relevance Match signal (20-25% of ranking) is likely being destroyed by keyword spam. Fixing the bio alone could dramatically improve search visibility.
                </p>
              </div>
            </Card>
          </motion.div>
        </motion.section>

        {/* 04 Market & Rate Analysis */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="mb-20 relative"
        >
          <SectionNumber number="04" />
          <motion.div variants={fadeIn}>
            <h2 className="text-2xl font-bold mb-6 pl-2">Market &amp; Rate Analysis</h2>
          </motion.div>
          <motion.div variants={fadeIn}>
            <Card className="mb-4">
              <h3 className="text-lg font-semibold mb-4 text-white/90">Rate Comparison</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 text-white/40 font-medium">Benchmark</th>
                      <th className="text-right py-3 text-white/40 font-medium">Rate</th>
                      <th className="text-right py-3 text-white/40 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-white/70">
                    {[
                      { bench: "Pakistan avg Full Stack", rate: "$25-40/hr", status: "Floor", variant: "default" as const },
                      { bench: "Pakistan top AI/ML", rate: "$60-100/hr", status: "Target", variant: "warning" as const },
                      { bench: "Global AI/ML freelancers", rate: "$120-250/hr", status: "Premium", variant: "strong" as const },
                      { bench: "Global Top Rated AI engineers", rate: "$150-300/hr", status: "Elite", variant: "strong" as const },
                      { bench: "Hammad's current rate", rate: "$40/hr", status: "Dangerous", variant: "broken" as const },
                      { bench: "Hammad's recent hourly jobs", rate: "$22-35/hr", status: "Critical", variant: "broken" as const },
                    ].map((row) => (
                      <tr key={row.bench} className="border-b border-white/5">
                        <td className="py-3">{row.bench}</td>
                        <td className="py-3 text-right font-mono">{row.rate}</td>
                        <td className="py-3 text-right">
                          <Badge variant={row.variant}>{row.status}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>
          <motion.div variants={fadeIn}>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  type: "Profile Rate",
                  rate: "$75/hr",
                  desc: "Signals premium positioning. Filters out budget clients. Attracts serious AI projects.",
                  color: "emerald",
                },
                {
                  type: "Proposal Rate",
                  rate: "$60-85/hr",
                  desc: "Flexible per project scope. Lower for smaller jobs, higher for complex AI/LLM builds.",
                  color: "emerald",
                },
                {
                  type: "Fixed-Price Projects",
                  rate: "$5K-25K+",
                  desc: "Premium project pricing. Value-based, not hourly. Ideal for SaaS MVPs and AI platforms.",
                  color: "emerald",
                },
              ].map((card) => (
                <Card key={card.type}>
                  <p className="text-white/40 text-xs uppercase tracking-wider mb-1">{card.type}</p>
                  <p className="text-3xl font-bold text-emerald-400 mb-2">{card.rate}</p>
                  <p className="text-white/50 text-sm">{card.desc}</p>
                </Card>
              ))}
            </div>
          </motion.div>
          <motion.div variants={fadeIn} className="mt-4">
            <Card>
              <h3 className="text-lg font-semibold mb-2 text-white/90">AI Skills Demand Growth (2025-2026)</h3>
              <div className="space-y-2 mt-4">
                {[
                  { skill: "AI Video Generation & Editing", growth: "+329%" },
                  { skill: "AI Integration", growth: "+178%" },
                  { skill: "AI Data Annotation & Labeling", growth: "+154%" },
                  { skill: "AI Skills (Overall)", growth: "+109%" },
                  { skill: "AI Chatbot Development", growth: "+71%" },
                ].map((row) => (
                  <div key={row.skill} className="flex items-center justify-between py-2 border-b border-white/5">
                    <span className="text-white/70 text-sm">{row.skill}</span>
                    <span className="text-emerald-400 font-mono text-sm font-semibold">{row.growth}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </motion.section>

        {/* 05 Niche Keyword Strategy */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="mb-20 relative"
        >
          <SectionNumber number="05" />
          <motion.div variants={fadeIn}>
            <h2 className="text-2xl font-bold mb-6 pl-2">Niche Keyword Strategy</h2>
          </motion.div>
          <motion.div variants={fadeIn}>
            <Card className="mb-4">
              <h3 className="text-lg font-semibold mb-3 text-white/90">Primary Keywords</h3>
              <p className="text-white/40 text-xs mb-3">Title + First 200 chars + Skills - highest algorithmic weight</p>
              <div className="flex flex-wrap gap-2">
                {["AI Engineer", "LLM Applications", "RAG Systems", "AI Agent Development", "SaaS Development", "Python", "LangChain", "OpenAI API", "Full-Stack AI"].map((kw) => (
                  <span key={kw} className="px-3 py-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg text-sm">
                    {kw}
                  </span>
                ))}
              </div>
            </Card>
          </motion.div>
          <motion.div variants={fadeIn}>
            <Card className="mb-4">
              <h3 className="text-lg font-semibold mb-3 text-white/90">Secondary Keywords</h3>
              <p className="text-white/40 text-xs mb-3">Bio body + Portfolio descriptions - moderate weight</p>
              <div className="flex flex-wrap gap-2">
                {["Generative AI", "Vector Database", "Pinecone", "LlamaIndex", "Django", "React", "Next.js", "PostgreSQL", "AWS", "Machine Learning", "NLP", "Chatbot Development", "FastAPI"].map((kw) => (
                  <span key={kw} className="px-3 py-1.5 bg-white/5 text-white/60 border border-white/10 rounded-lg text-sm">
                    {kw}
                  </span>
                ))}
              </div>
            </Card>
          </motion.div>
          <motion.div variants={fadeIn}>
            <Card>
              <h3 className="text-lg font-semibold mb-3 text-white/90">Long-tail Sniper Keywords</h3>
              <p className="text-white/40 text-xs mb-3">Near-zero competition, high intent</p>
              <div className="space-y-2">
                {[
                  { kw: "LLM app development with RAG", competition: "Very Low" },
                  { kw: "AI agent builder Python LangChain", competition: "Very Low" },
                  { kw: "custom GPT integration SaaS", competition: "Low" },
                  { kw: "enterprise AI chatbot Django", competition: "Very Low" },
                  { kw: "vector search RAG pipeline developer", competition: "Very Low" },
                  { kw: "AI-powered SaaS MVP builder", competition: "Low" },
                ].map((row) => (
                  <div key={row.kw} className="flex items-center justify-between py-2 border-b border-white/5">
                    <span className="text-white/70 text-sm font-mono">{row.kw}</span>
                    <Badge variant="strong">{row.competition}</Badge>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </motion.section>

        {/* 06 Job Volume & Competition */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="mb-20 relative"
        >
          <SectionNumber number="06" />
          <motion.div variants={fadeIn}>
            <h2 className="text-2xl font-bold mb-6 pl-2">Job Volume &amp; Competition</h2>
          </motion.div>
          <motion.div variants={fadeIn}>
            <Card className="mb-4">
              <h3 className="text-lg font-semibold mb-4 text-white/90">Platform Stats</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { label: "AI/ML jobs posted monthly", value: "12,000+" },
                  { label: "Avg proposals per AI job", value: "15-30" },
                  { label: "LLM/RAG specific jobs", value: "3,500+" },
                  { label: "AI agent jobs (growing)", value: "2,000+" },
                  { label: "Avg AI project budget", value: "$5K-25K" },
                  { label: "Top AI freelancer rate", value: "$150-300/hr" },
                ].map((s) => (
                  <div key={s.label} className="bg-white/[0.02] rounded-lg p-3">
                    <p className="text-white/40 text-xs">{s.label}</p>
                    <p className="text-white font-semibold">{s.value}</p>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
          <motion.div variants={fadeIn}>
            <Card>
              <h3 className="text-lg font-semibold mb-4 text-white/90">Competitor Landscape</h3>
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
                      { type: "Budget full-stack devs (India/PK)", rate: "$15-30/hr", pos: "Generalist", threat: "Low" },
                      { type: "Mid-tier AI freelancers", rate: "$40-60/hr", pos: "AI + Full Stack", threat: "Medium" },
                      { type: "Specialized AI engineers (US/EU)", rate: "$120-200/hr", pos: "AI-only", threat: "Low (diff market)" },
                      { type: "AI agencies", rate: "$80-150/hr", pos: "Team-based", threat: "Medium" },
                      { type: "Top Rated Plus AI from PK", rate: "$60-100/hr", pos: "Specialized AI", threat: "High" },
                    ].map((row) => (
                      <tr key={row.type} className="border-b border-white/5">
                        <td className="py-3">{row.type}</td>
                        <td className="py-3 text-right font-mono">{row.rate}</td>
                        <td className="py-3 text-right">{row.pos}</td>
                        <td className="py-3 text-right">
                          <Badge variant={row.threat === "High" ? "broken" : row.threat === "Medium" ? "warning" : "strong"}>{row.threat}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-lg">
                <p className="text-emerald-400 text-sm font-semibold mb-1">Differentiation Opportunity</p>
                <p className="text-white/60 text-sm">
                  Hammad{"'"}s unique edge: production-grade AI + full-stack SaaS execution + Top Rated + 100% JSS from Pakistan. Very few competitors combine deep AI expertise with proven SaaS delivery at this credential level. Position as &quot;AI Engineer who ships production SaaS&quot; - not a generalist full-stack developer.
                </p>
              </div>
            </Card>
          </motion.div>
        </motion.section>

        {/* 07 Portfolio Assets */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="mb-20 relative"
        >
          <SectionNumber number="07" />
          <motion.div variants={fadeIn}>
            <h2 className="text-2xl font-bold mb-6 pl-2">Portfolio Assets</h2>
          </motion.div>
          <motion.div variants={fadeIn}>
            <Card className="mb-4">
              <h3 className="text-lg font-semibold mb-4 text-white/90">Tier 1 - Must Add</h3>
              <p className="text-white/40 text-xs mb-4">These portfolio items will directly boost UMA relevance for AI/LLM job searches</p>
              <div className="space-y-4">
                {[
                  {
                    title: "AI-Powered Directory Platform with Bulk Posting Automation",
                    desc: "Built an intelligent directory system with AI-driven bulk posting, automated content generation, and smart categorization. Full-stack implementation with Python backend and React frontend.",
                    tags: ["AI Automation", "Python", "React", "LLM Integration"],
                  },
                  {
                    title: "RAG-Powered Enterprise Knowledge Base",
                    desc: "Custom retrieval-augmented generation system with vector search, document parsing, and conversational AI interface. Built with LangChain, Pinecone, and OpenAI.",
                    tags: ["RAG", "LangChain", "Pinecone", "OpenAI", "Vector DB"],
                  },
                  {
                    title: "AI Agent for Automated Data Pipeline (Airbyte/Databricks)",
                    desc: "Developed custom Airbyte connector for IFS ERP to Databricks Lakehouse integration. Automated data extraction, transformation, and loading with intelligent error handling.",
                    tags: ["ETL", "AI Agent", "Python", "Databricks", "Enterprise"],
                  },
                  {
                    title: "Web3 & Fintech MVP - AI-Powered Loyalty Platform",
                    desc: "Full-stack MVP for a blockchain-based loyalty platform with AI-driven reward optimization and smart contract integration.",
                    tags: ["Web3", "AI", "React", "Node.js", "MVP"],
                  },
                ].map((item) => (
                  <div key={item.title} className="p-4 bg-white/[0.02] rounded-lg border border-white/5">
                    <h4 className="text-white/90 font-medium mb-1">{item.title}</h4>
                    <p className="text-white/50 text-sm mb-3">{item.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400/80 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
          <motion.div variants={fadeIn}>
            <Card>
              <h3 className="text-lg font-semibold mb-4 text-white/90">Tier 2 - Should Add</h3>
              <div className="space-y-4">
                {[
                  {
                    title: "Property Automation Platform (Strada.ai)",
                    desc: "Django/React platform with enterprise API integrations (Yardi, Gmail, Outlook), task automation, and scheduling workflows.",
                    tags: ["Django", "React", "AWS", "Enterprise", "Automation"],
                  },
                  {
                    title: "AI Chatbot with Microsoft/Twilio Integration",
                    desc: "Automated bot system with Microsoft integrations and Twilio messaging. Python backend with intelligent conversation flows.",
                    tags: ["AI Chatbot", "Python", "Twilio", "Microsoft", "NLP"],
                  },
                ].map((item) => (
                  <div key={item.title} className="p-4 bg-white/[0.02] rounded-lg border border-white/5">
                    <h4 className="text-white/90 font-medium mb-1">{item.title}</h4>
                    <p className="text-white/50 text-sm mb-3">{item.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 bg-white/5 text-white/50 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-amber-500/5 border border-amber-500/10 rounded-lg">
                <p className="text-amber-400 text-sm font-semibold mb-1">Warning - Do NOT Add</p>
                <p className="text-white/60 text-sm">
                  Avoid adding generic &quot;website development&quot; or &quot;WordPress&quot; portfolio items. These dilute the AI specialization signal. Every portfolio item should reinforce the &quot;AI Engineer who builds production SaaS&quot; positioning.
                </p>
              </div>
            </Card>
          </motion.div>
        </motion.section>

        {/* 08 Rewritten Profile */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="mb-20 relative"
        >
          <SectionNumber number="08" />
          <motion.div variants={fadeIn}>
            <h2 className="text-2xl font-bold mb-6 pl-2">Rewritten Profile</h2>
          </motion.div>
          <motion.div variants={fadeIn}>
            <Card className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-white/90">New Title</h3>
                <CopyButton text={newTitle} />
              </div>
              <div className="p-4 bg-white/[0.02] rounded-lg border border-emerald-500/20 font-mono text-emerald-400">
                {newTitle}
              </div>
              <p className="text-white/40 text-xs mt-2">50 characters - focused, semantic, UMA-optimized</p>
            </Card>
          </motion.div>
          <motion.div variants={fadeIn}>
            <Card className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-white/90">New Bio / Overview</h3>
                <CopyButton text={newBio} />
              </div>
              <div className="p-4 bg-white/[0.02] rounded-lg border border-white/10">
                <pre className="text-white/70 text-sm whitespace-pre-wrap font-sans leading-relaxed">
                  {newBio}
                </pre>
              </div>
              <p className="text-white/40 text-xs mt-2">
                No unicode formatting. No keyword stuffing. Semantic clarity for UMA. First 200 chars optimized for the money zone.
              </p>
            </Card>
          </motion.div>
          <motion.div variants={fadeIn}>
            <Card className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-white/90">New Skills (15)</h3>
                <CopyButton text={newSkills.join(", ")} />
              </div>
              <div className="flex flex-wrap gap-2">
                {newSkills.map((skill, i) => (
                  <span
                    key={skill}
                    className={`px-3 py-1.5 rounded-lg text-sm border ${
                      i < 7
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                        : "bg-white/5 text-white/60 border-white/10"
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <p className="text-white/40 text-xs mt-3">
                First 7 skills (green) are primary AI signals. Remaining 8 support full-stack credibility without diluting specialization.
              </p>
            </Card>
          </motion.div>
          <motion.div variants={fadeIn}>
            <Card>
              <h3 className="text-lg font-semibold mb-3 text-white/90">Employment History Update</h3>
              <p className="text-white/40 text-xs mb-4">Reframe existing roles to emphasize AI outcomes, not just tech stacks</p>
              <div className="space-y-4">
                {[
                  {
                    role: "Lead Full Stack Engineer | Strada.ai",
                    period: "January 2025 - Present",
                    update: "Add: 'Integrated AI-driven automation for property management workflows, reducing manual tasks by 60%.' Lead with the AI angle.",
                  },
                  {
                    role: "Senior Full-Stack Engineer | edX",
                    period: "May 2023 - December 2024",
                    update: "Add: 'Contributed to ML-powered recommendation systems and data pipeline optimization serving millions of learners.' Emphasize scale + data.",
                  },
                  {
                    role: "Backend Engineer | Ugami",
                    period: "January 2021 - December 2023",
                    update: "Add: 'Built intelligent reward algorithms and predictive analytics for gamified fintech platform.' Frame the blockchain work as AI-adjacent.",
                  },
                ].map((item) => (
                  <div key={item.role} className="p-4 bg-white/[0.02] rounded-lg border border-white/5">
                    <h4 className="text-white/90 font-medium">{item.role}</h4>
                    <p className="text-white/40 text-xs mb-2">{item.period}</p>
                    <p className="text-amber-400/80 text-sm">{item.update}</p>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </motion.section>

        {/* 09 Action Plan & Timeline */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="mb-20 relative"
        >
          <SectionNumber number="09" />
          <motion.div variants={fadeIn}>
            <h2 className="text-2xl font-bold mb-6 pl-2">Action Plan &amp; Timeline</h2>
          </motion.div>
          <motion.div variants={fadeIn}>
            <Card className="mb-4">
              <h3 className="text-lg font-semibold mb-4 text-white/90">This Week</h3>
              <Badge variant="broken">CRITICAL</Badge>
              <div className="space-y-3 mt-4">
                {[
                  "DELETE the entire keyword block at the bottom of the bio immediately",
                  "Remove ALL unicode bold formatting - replace with plain text",
                  "Change profile rate from $40/hr to $75/hr",
                  "Update title to: 'AI Engineer | LLM Apps, RAG Systems & SaaS'",
                  "Rewrite bio with new first-200-character hook (copy from Section 08)",
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-white/[0.02] rounded-lg">
                    <span className="text-emerald-400 font-mono text-sm font-bold shrink-0">{i + 1}.</span>
                    <span className="text-white/70 text-sm">{step}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
          <motion.div variants={fadeIn}>
            <Card className="mb-4">
              <h3 className="text-lg font-semibold mb-4 text-white/90">Within 2 Weeks</h3>
              <Badge variant="warning">HIGH</Badge>
              <div className="space-y-3 mt-4">
                {[
                  "Update skills list to recommended 15 (remove API, n8n, ETL Pipeline; add LangChain, OpenAI API, RAG, etc.)",
                  "Rewrite all portfolio descriptions with semantic keywords matching AI/SaaS job searches",
                  "Update employment history descriptions to emphasize AI outcomes and scale metrics",
                  "Add profile video (even 60 seconds) - boosts Profile Completeness signal by 10-15%",
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-white/[0.02] rounded-lg">
                    <span className="text-amber-400 font-mono text-sm font-bold shrink-0">{i + 6}.</span>
                    <span className="text-white/70 text-sm">{step}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
          <motion.div variants={fadeIn}>
            <Card>
              <h3 className="text-lg font-semibold mb-4 text-white/90">Within 30 Days</h3>
              <Badge variant="default">MEDIUM</Badge>
              <div className="space-y-3 mt-4">
                {[
                  "Add 3-5 new portfolio items showcasing AI/LLM work specifically (see Section 07)",
                  "Start bidding at $60-85/hr on proposals - never below $55/hr",
                  "Target AI agent, RAG, and LLM-specific job posts exclusively for 30 days to retrain UMA's matching model",
                  "Pursue at least 2-3 fixed-price AI projects at $5K+ to build high-value work history",
                  "Monitor invite rates - expect improvement within 2-3 weeks of implementing changes",
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-white/[0.02] rounded-lg">
                    <span className="text-white/40 font-mono text-sm font-bold shrink-0">{i + 10}.</span>
                    <span className="text-white/70 text-sm">{step}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </motion.section>

        {/* 10 Job Search Keywords */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          className="mb-20 relative"
        >
          <SectionNumber number="10" />
          <motion.div variants={fadeIn}>
            <h2 className="text-2xl font-bold mb-6 pl-2">Job Search Keywords</h2>
          </motion.div>
          <motion.div variants={fadeIn}>
            <Card className="mb-4">
              <h3 className="text-lg font-semibold mb-4 text-white/90">Tier 1 - Primary Search Terms</h3>
              <p className="text-white/40 text-xs mb-3">High volume, strong match to profile</p>
              <div className="space-y-2">
                {[
                  { kw: "AI agent developer", vol: "High", comp: "Medium" },
                  { kw: "LLM application development", vol: "High", comp: "Medium" },
                  { kw: "RAG pipeline developer", vol: "Medium", comp: "Low" },
                  { kw: "AI SaaS developer", vol: "High", comp: "Medium" },
                  { kw: "LangChain developer", vol: "Medium", comp: "Low" },
                ].map((row) => (
                  <div key={row.kw} className="flex items-center justify-between py-2 border-b border-white/5">
                    <span className="text-white/80 text-sm font-mono">{row.kw}</span>
                    <div className="flex gap-2">
                      <Badge variant="strong">Vol: {row.vol}</Badge>
                      <Badge variant={row.comp === "Low" ? "strong" : "warning"}>Comp: {row.comp}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
          <motion.div variants={fadeIn}>
            <Card className="mb-4">
              <h3 className="text-lg font-semibold mb-4 text-white/90">Tier 2 - Secondary Search Terms</h3>
              <div className="space-y-2">
                {[
                  { kw: "OpenAI API integration", vol: "Medium", comp: "Medium" },
                  { kw: "Python AI developer", vol: "High", comp: "High" },
                  { kw: "chatbot developer LLM", vol: "Medium", comp: "Medium" },
                  { kw: "generative AI engineer", vol: "Medium", comp: "Medium" },
                  { kw: "full stack AI developer", vol: "Medium", comp: "High" },
                ].map((row) => (
                  <div key={row.kw} className="flex items-center justify-between py-2 border-b border-white/5">
                    <span className="text-white/70 text-sm font-mono">{row.kw}</span>
                    <div className="flex gap-2">
                      <Badge variant={row.vol === "High" ? "strong" : "default"}>Vol: {row.vol}</Badge>
                      <Badge variant={row.comp === "High" ? "broken" : "warning"}>Comp: {row.comp}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
          <motion.div variants={fadeIn}>
            <Card>
              <h3 className="text-lg font-semibold mb-4 text-white/90">Tier 3 - Sniper Keywords</h3>
              <p className="text-white/40 text-xs mb-3">Low competition, high conversion when matched</p>
              <div className="space-y-2">
                {[
                  "vector database RAG implementation",
                  "AI agent Python LangChain production",
                  "LLM-powered SaaS MVP",
                  "enterprise AI chatbot Django",
                  "Pinecone embeddings developer",
                  "AI workflow automation n8n Python",
                ].map((kw) => (
                  <div key={kw} className="flex items-center justify-between py-2 border-b border-white/5">
                    <span className="text-white/60 text-sm font-mono">{kw}</span>
                    <Badge variant="strong">Low Comp</Badge>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-lg">
                <p className="text-emerald-400 text-sm font-semibold mb-1">Pro Tip</p>
                <p className="text-white/60 text-sm">
                  Set up saved searches for Tier 1 and Tier 3 keywords. Apply within the first hour of posting - UMA gives early applicants a boost in ranking. Combine keywords like &quot;LLM + SaaS&quot; or &quot;RAG + Python&quot; for more targeted results.
                </p>
              </div>
            </Card>
          </motion.div>
        </motion.section>

        {/* Footer */}
        <footer className="border-t border-white/5 pt-8 mt-10">
          <div className="flex items-center justify-between text-white/30 text-sm">
            <p>Upwork Profile Strategy Report - Hammad H.</p>
            <p>Generated April 6, 2026</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
