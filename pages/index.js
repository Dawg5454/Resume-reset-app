import { useState } from "react";
import Head from "next/head";

const CHANDLER_RESUME = `CHANDLER V. JOHNSON
Marietta, GA | 901-314-5509 | djohnson5454@gmail.com
linkedin.com/in/chandler-johnson54/

REAL ESTATE MANAGER

Strategic and results-driven Commercial Real Estate Executive with over 20 years of experience leading high-growth expansion programs for nationally recognized brands including Valvoline, The Home Depot, and AutoZone. Proven expertise in site selection, deal negotiation, entitlement processes, and portfolio optimization across diverse urban, suburban, and rural markets.

CORE COMPETENCIES
Site Selection | Lease Negotiation | Market Expansion Strategy | Portfolio Optimization
Asset Disposition | Entitlement & Permitting | Cross-Functional Leadership | Broker & Developer Relations
P&L Accountability | Trade Area Analytics | Retail Rollout Planning | Executive Site Committee Management

CAREER HIGHLIGHTS
• $500M+ in revenue impact from strategic site acquisition and development programs.
• 300+ deals closed: 200+ approvals, 160+ executed contracts, and 150+ store openings.
• Led the launch of AutoZone's 1st Ground-Up Mega-Hub (20,000 SF).
• Named Top Performer three consecutive years (2021, 2022, 2023).

PROFESSIONAL EXPERIENCE

Valvoline Inc. – Atlanta, GA
Senior Real Estate Manager | Nov 2019 – Present
• Opened 45 new stores driving $65M+ in incremental revenue.
• Managing 40 active developments projected to generate $50M+ in future sales.
• Achieved 100+ site approvals and 80+ executed contracts.
• Direct cross-functional coordination between Research, Legal, and Construction teams.

The Home Depot – Atlanta, GA
Real Estate Manager | Jan 2018 – Nov 2019
• Oversaw 10 developments under construction or entitlement totaling $500M+ in projected sales.
• Managed a 400+ store portfolio including lease renegotiations and property dispositions.
• Delivered $30M+ in value creation through strategic carve-outs and lease actions.

AutoZone, Inc. – Memphis, TN
Real Estate Development Manager | Jan 2007 – Dec 2017
• Opened 100+ new/relocated/remodeled stores generating $180M+ in revenue.
• Secured 180+ site approvals and 130+ contracts.
• Built strong partnerships with brokers, consultants, and municipalities.
• Drove location strategy with detailed forecasting, trade area analysis, and pro forma modeling.

EDUCATION
Bachelor of Science in Consumer Economics
University of Georgia – Athens, GA
Terry College of Business Real Estate Program | Full Athletic Scholarship (Football) | Outback Bowl Champion

TECHNICAL SKILLS
Lucernex | Expesite | Microsoft Office (Excel, Word, PowerPoint, Outlook)`;

export default function Home() {
  const [resume, setResume] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleReset = async () => {
    if (!resume.trim()) {
      setError("Please paste your resume first.");
      return;
    }
    setLoading(true);
    setError("");
    setResult("");
    try {
      const res = await fetch("/api/transform", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setResult(data.result);
    } catch (err) {
      setError(err.message || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const loadExample = (role) => {
    setResume(`I am a ${role} with 8 years of experience in residential real estate. I have helped over 150 families buy and sell homes. I specialize in negotiations, market analysis, and client relationship management. I have closed $40M in transactions and consistently ranked in the top 10% of agents in my market. I manage listings, coordinate with lenders, title companies, and inspectors, and guide clients through complex transactions from contract to close.`);
    setResult("");
    setError("");
  };

  return (
    <>
      <Head>
        <title>ResetResume | Chandler Johnson Coaching</title>
        <meta name="description" content="Transform your residential real estate resume into a corporate RE powerhouse." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Barlow:wght@300;400;500;600&family=Barlow+Condensed:wght@400;600;700&display=swap" rel="stylesheet" />
      </Head>

      <div className="app">
        {/* Header */}
        <header className="header">
          <div className="header-inner">
            <div className="logo">
              <span className="logo-mark">RR</span>
              <div className="logo-text">
                <span className="logo-name">ResetResume</span>
                <span className="logo-sub">by Chandler Johnson Coaching</span>
              </div>
            </div>
            <nav className="nav">
              <a href="https://www.linkedin.com/in/chandler-johnson54/" target="_blank" rel="noopener noreferrer" className="nav-link">About Chandler</a>
            </nav>
          </div>
        </header>

        {/* Hero */}
        <section className="hero">
          <div className="hero-bg" />
          <div className="hero-inner">
            <p className="hero-eyebrow">Corporate Real Estate Career Transition Tool</p>
            <h1 className="hero-title">
              Turn Your Residential Resume<br />
              Into a <span className="gold">Corporate RE Powerhouse</span>
            </h1>
            <p className="hero-sub">
              Paste your resume. AI rewrites it using the language, framing, and positioning that Fortune 500 real estate hiring managers actually respond to.
            </p>
            <div className="stats">
              <div className="stat"><span className="stat-num">20+</span><span className="stat-label">Years Corporate RE</span></div>
              <div className="stat-divider" />
              <div className="stat"><span className="stat-num">300+</span><span className="stat-label">Deals Closed</span></div>
              <div className="stat-divider" />
              <div className="stat"><span className="stat-num">$500M+</span><span className="stat-label">Revenue Impact</span></div>
              <div className="stat-divider" />
              <div className="stat"><span className="stat-num">3</span><span className="stat-label">Fortune 500 Brands</span></div>
            </div>
          </div>
        </section>

        {/* Tool */}
        <section className="tool">
          <div className="tool-inner">
            {/* Examples */}
            <div className="examples-row">
              <span className="examples-label">Try an example:</span>
              {["Leasing Agent", "Buyer's Broker", "Property Manager"].map((role) => (
                <button key={role} className="example-pill" onClick={() => loadExample(role)}>{role}</button>
              ))}
            </div>

            {/* Action Row */}
            <div className="action-row">
              <button className="btn-reset" onClick={handleReset} disabled={loading}>
                {loading ? (
                  <><span className="spinner" /> Transforming...</>
                ) : (
                  <><span className="btn-icon">✦</span> Reset My Resume</>
                )}
              </button>
              <button className="btn-clear" onClick={() => { setResume(""); setResult(""); setError(""); }}>
                <span>✕</span> Clear
              </button>
              {error && <p className="error-msg">{error}</p>}
            </div>

            {/* Panels */}
            <div className="panels">
              <div className="panel">
                <div className="panel-header">
                  <span className="panel-title">YOUR CURRENT RESUME</span>
                  <button className="paste-btn" onClick={() => navigator.clipboard.readText().then(t => setResume(t))}>Paste plain text</button>
                </div>
                <textarea
                  className="panel-textarea"
                  placeholder="Paste your residential real estate resume here..."
                  value={resume}
                  onChange={(e) => setResume(e.target.value)}
                />
              </div>

              <div className="panel">
                <div className="panel-header">
                  <span className="panel-title">CORPORATE RE VERSION</span>
                  {result && (
                    <button className="paste-btn" onClick={() => navigator.clipboard.writeText(result)}>
                      AI Rewritten — Copy
                    </button>
                  )}
                </div>
                <div className="panel-result">
                  {loading && (
                    <div className="loading-state">
                      <div className="loading-ring" />
                      <p>Rewriting for corporate RE...</p>
                    </div>
                  )}
                  {!loading && !result && (
                    <div className="empty-state">
                      <span className="empty-icon">✦</span>
                      <p>Your corporate RE resume will appear here</p>
                    </div>
                  )}
                  {!loading && result && (
                    <pre className="result-text">{result}</pre>
                  )}
                </div>
              </div>
            </div>

            {/* Chandler Example */}
            <div className="example-card">
              <div className="example-card-header">
                <span className="example-tag">REAL EXAMPLE</span>
                <span className="example-title">How Chandler's Resume Reads in Corporate RE</span>
              </div>
              <div className="example-card-body">
                <pre className="example-resume">{CHANDLER_RESUME}</pre>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-inner">
            <p className="footer-copy">© 2026 Chandler Johnson Coaching · Real Estate Reset™</p>
            <p className="footer-tagline">Built for residential realtors ready to make the corporate leap.</p>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { font-size: 16px; }
        body { background: #0e1628; color: #e8e0d0; font-family: 'Barlow', sans-serif; }

        .app { min-height: 100vh; display: flex; flex-direction: column; }

        /* Header */
        .header { background: #0a1020; border-bottom: 1px solid rgba(201,168,76,0.2); position: sticky; top: 0; z-index: 100; }
        .header-inner { max-width: 1200px; margin: 0 auto; padding: 0 2rem; height: 64px; display: flex; align-items: center; justify-content: space-between; }
        .logo { display: flex; align-items: center; gap: 0.75rem; }
        .logo-mark { background: #c9a84c; color: #0a1020; font-family: 'Cormorant Garamond', serif; font-weight: 700; font-size: 1.1rem; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; border-radius: 4px; letter-spacing: 0.05em; }
        .logo-text { display: flex; flex-direction: column; }
        .logo-name { font-family: 'Barlow Condensed', sans-serif; font-weight: 700; font-size: 1.1rem; letter-spacing: 0.08em; color: #fff; text-transform: uppercase; line-height: 1; }
        .logo-sub { font-size: 0.65rem; color: #c9a84c; letter-spacing: 0.12em; text-transform: uppercase; margin-top: 2px; }
        .nav-link { color: #a09880; font-size: 0.8rem; letter-spacing: 0.08em; text-transform: uppercase; text-decoration: none; transition: color 0.2s; }
        .nav-link:hover { color: #c9a84c; }

        /* Hero */
        .hero { position: relative; padding: 5rem 2rem 4rem; overflow: hidden; }
        .hero-bg { position: absolute; inset: 0; background: radial-gradient(ellipse at 30% 50%, rgba(201,168,76,0.07) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(201,168,76,0.04) 0%, transparent 50%); pointer-events: none; }
        .hero-inner { max-width: 860px; margin: 0 auto; text-align: center; position: relative; }
        .hero-eyebrow { font-family: 'Barlow Condensed', sans-serif; font-size: 0.75rem; letter-spacing: 0.2em; text-transform: uppercase; color: #c9a84c; margin-bottom: 1.25rem; }
        .hero-title { font-family: 'Cormorant Garamond', serif; font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 600; line-height: 1.15; color: #fff; margin-bottom: 1.5rem; }
        .gold { color: #c9a84c; }
        .hero-sub { font-size: 1.05rem; color: #8a9ab5; line-height: 1.7; max-width: 600px; margin: 0 auto 3rem; font-weight: 300; }
        .stats { display: flex; align-items: center; justify-content: center; gap: 0; flex-wrap: wrap; border: 1px solid rgba(201,168,76,0.2); border-radius: 8px; background: rgba(10,16,32,0.6); overflow: hidden; }
        .stat { padding: 1.25rem 2rem; text-align: center; }
        .stat-num { display: block; font-family: 'Cormorant Garamond', serif; font-size: 1.8rem; font-weight: 700; color: #c9a84c; line-height: 1; }
        .stat-label { display: block; font-size: 0.65rem; letter-spacing: 0.15em; text-transform: uppercase; color: #6a7a95; margin-top: 0.3rem; }
        .stat-divider { width: 1px; height: 40px; background: rgba(201,168,76,0.2); }

        /* Tool */
        .tool { flex: 1; padding: 3rem 2rem 4rem; }
        .tool-inner { max-width: 1200px; margin: 0 auto; }
        .examples-row { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.25rem; flex-wrap: wrap; }
        .examples-label { font-size: 0.7rem; letter-spacing: 0.15em; text-transform: uppercase; color: #6a7a95; }
        .example-pill { background: transparent; border: 1px solid rgba(201,168,76,0.3); color: #c9a84c; padding: 0.35rem 1rem; border-radius: 100px; font-size: 0.8rem; cursor: pointer; font-family: 'Barlow', sans-serif; transition: all 0.2s; letter-spacing: 0.05em; }
        .example-pill:hover { background: rgba(201,168,76,0.1); border-color: #c9a84c; }

        .action-row { display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem; flex-wrap: wrap; }
        .btn-reset { background: #c9a84c; color: #0a1020; border: none; padding: 0.85rem 2rem; font-family: 'Barlow Condensed', sans-serif; font-size: 1rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; border-radius: 4px; display: flex; align-items: center; gap: 0.5rem; transition: all 0.2s; }
        .btn-reset:hover:not(:disabled) { background: #dbb85a; transform: translateY(-1px); }
        .btn-reset:disabled { opacity: 0.6; cursor: not-allowed; }
        .btn-icon { font-size: 0.9rem; }
        .btn-clear { background: transparent; border: 1px solid rgba(255,255,255,0.15); color: #8a9ab5; padding: 0.85rem 1.5rem; font-family: 'Barlow', sans-serif; font-size: 0.85rem; cursor: pointer; border-radius: 4px; display: flex; align-items: center; gap: 0.5rem; transition: all 0.2s; }
        .btn-clear:hover { border-color: rgba(255,255,255,0.3); color: #fff; }
        .error-msg { color: #e07070; font-size: 0.85rem; }

        .panels { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 2.5rem; }
        @media (max-width: 768px) { .panels { grid-template-columns: 1fr; } .stat-divider { display: none; } .stat { padding: 1rem 1.5rem; } }

        .panel { background: #111d35; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; overflow: hidden; display: flex; flex-direction: column; min-height: 400px; }
        .panel-header { padding: 1rem 1.25rem; border-bottom: 1px solid rgba(255,255,255,0.06); display: flex; justify-content: space-between; align-items: center; background: rgba(0,0,0,0.2); }
        .panel-title { font-family: 'Barlow Condensed', sans-serif; font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; color: #c9a84c; }
        .paste-btn { font-size: 0.72rem; color: #6a7a95; background: none; border: none; cursor: pointer; font-family: 'Barlow', sans-serif; transition: color 0.2s; }
        .paste-btn:hover { color: #c9a84c; }
        .panel-textarea { flex: 1; background: transparent; border: none; color: #c8d0e0; font-family: 'Barlow', sans-serif; font-size: 0.875rem; line-height: 1.7; padding: 1.25rem; resize: none; outline: none; min-height: 360px; }
        .panel-textarea::placeholder { color: #3a4a65; }
        .panel-result { flex: 1; padding: 1.25rem; overflow-y: auto; min-height: 360px; display: flex; flex-direction: column; }

        .loading-state { display: flex; flex-direction: column; align-items: center; justify-content: center; flex: 1; gap: 1rem; color: #6a7a95; font-size: 0.85rem; }
        .loading-ring { width: 32px; height: 32px; border: 2px solid rgba(201,168,76,0.2); border-top-color: #c9a84c; border-radius: 50%; animation: spin 0.8s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner { display: inline-block; width: 14px; height: 14px; border: 2px solid rgba(10,16,32,0.3); border-top-color: #0a1020; border-radius: 50%; animation: spin 0.8s linear infinite; }

        .empty-state { display: flex; flex-direction: column; align-items: center; justify-content: center; flex: 1; gap: 0.75rem; color: #3a4a65; }
        .empty-icon { font-size: 1.5rem; color: rgba(201,168,76,0.2); }

        .result-text { white-space: pre-wrap; font-family: 'Barlow', sans-serif; font-size: 0.875rem; line-height: 1.75; color: #c8d0e0; }

        /* Example Card */
        .example-card { background: #0a1020; border: 1px solid rgba(201,168,76,0.15); border-radius: 8px; overflow: hidden; }
        .example-card-header { padding: 1rem 1.5rem; border-bottom: 1px solid rgba(201,168,76,0.1); display: flex; align-items: center; gap: 1rem; }
        .example-tag { font-family: 'Barlow Condensed', sans-serif; font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase; color: #c9a84c; background: rgba(201,168,76,0.1); padding: 0.25rem 0.75rem; border-radius: 100px; border: 1px solid rgba(201,168,76,0.2); }
        .example-title { font-size: 0.85rem; color: #8a9ab5; }
        .example-card-body { padding: 1.5rem; overflow-x: auto; }
        .example-resume { white-space: pre-wrap; font-family: 'Barlow', sans-serif; font-size: 0.8rem; line-height: 1.75; color: #6a7a95; max-height: 300px; overflow-y: auto; }

        /* Footer */
        .footer { background: #0a1020; border-top: 1px solid rgba(201,168,76,0.1); padding: 2rem; text-align: center; }
        .footer-copy { font-size: 0.8rem; color: #3a4a65; margin-bottom: 0.4rem; }
        .footer-tagline { font-size: 0.75rem; color: #2a3a55; font-style: italic; }
      `}</style>
    </>
  );
}
