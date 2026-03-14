import React, { useEffect, useRef, useState } from 'react';
import { X, TrendingUp, BarChart3, ArrowLeft, PieChart, ShieldCheck, Cpu, Briefcase } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import gsap from 'gsap';

interface AIBusinessPageProps {
  onClose: () => void;
}

const categoryIcons: Record<string, React.ReactNode> = {
  benefits: <ShieldCheck size={24} />,
  market: <TrendingUp size={24} />,
  adoption: <PieChart size={24} />,
  workforce: <Briefcase size={24} />,
  efficiency: <BarChart3 size={24} />,
  infrastructure: <Cpu size={24} />,
  governance: <ShieldCheck size={24} />,
  education: <TrendingUp size={24} />,
};

const AIBusinessPage: React.FC<AIBusinessPageProps> = ({ onClose }) => {
  const { t } = useLanguage();
  const pageRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>('benefits');

  useEffect(() => {
    if (pageRef.current) {
      gsap.fromTo(pageRef.current,
        { y: '100%', autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.8, ease: 'power4.out' }
      );
    }
  }, []);

  const handleClose = () => {
    if (pageRef.current) {
      gsap.to(pageRef.current, {
        y: '100%',
        autoAlpha: 0,
        duration: 0.6,
        ease: 'power4.in',
        onComplete: onClose
      });
    }
  };

  const categories = Object.keys(t.aiBusiness.page.categories);

  return (
    <div className="ai-page-overlay" ref={pageRef}>
      <aside className="ai-page-sidebar glass-strong">
        <div className="sidebar-header">
          <span className="logo-text">Fib<span className="gradient-text">Nyx</span></span>
          <div className="sidebar-label">{t.aiBusiness.page.reportTitle}</div>
        </div>
        <nav className="sidebar-nav">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`nav-item magnetic ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              <span className="icon">{categoryIcons[cat]}</span>
              <span className="label">{(t.aiBusiness.page.categories as any)[cat].title}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <button className="btn btn-outline btn-sm magnetic" onClick={handleClose}>
            <ArrowLeft size={16} /> {t.aiBusiness.page.close}
          </button>
        </div>
      </aside>

      <main className="ai-page-main container">
        <button className="close-btn mobile-only magnetic" onClick={handleClose}>
          <X size={24} />
        </button>

        <header className="main-header">
          <h1 className="main-title">
            {t.aiBusiness.page.title} <span className="gradient-text">{t.aiBusiness.page.subtitle}</span>
          </h1>
          <p className="main-intro">{t.aiBusiness.page.intro}</p>
        </header>

        <div className="dashboard-content">
          <div key={activeCategory} className="category-view">
            <div className="view-header">
              <h2 className="view-title">
                {categoryIcons[activeCategory]}
                {(t.aiBusiness.page.categories as any)[activeCategory].title}
              </h2>
              <p className="category-long-desc">
                {(t.aiBusiness.page.categories as any)[activeCategory].longDesc}
              </p>
            </div>

            <div className="stats-grid">
              {(t.aiBusiness.page.categories as any)[activeCategory].items.map((item: any, idx: number) => (
                <div key={idx} className="stat-card glass-strong magnetic">
                  <div className="stat-value gradient-text">{item.value}</div>
                  <div className="stat-label">{item.label}</div>
                  <p className="stat-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <footer className="main-footer">
          <div className="source-tag">{t.aiBusiness.page.source}</div>
        </footer>
      </main>

      <style>{`
        .ai-page-overlay {
          position: fixed;
          inset: 0;
          background: var(--bg-deep);
          z-index: 2000;
          display: flex;
          overflow: hidden;
        }

        /* SIDEBAR */
        .ai-page-sidebar {
          width: 300px;
          height: 100vh;
          border-right: 1px solid var(--border-subtle);
          display: flex;
          flex-direction: column;
          padding: 40px 20px;
          z-index: 2002;
        }

        .sidebar-header {
          margin-bottom: 50px;
          padding: 0 10px;
        }

        .sidebar-label {
          font-size: 0.75rem;
          color: var(--text-dim);
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-top: 5px;
        }

        .sidebar-nav {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 12px 15px;
          background: transparent;
          border: 1px solid transparent;
          border-radius: var(--radius-md);
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: left;
        }

        .nav-item:hover {
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-white);
        }

        .nav-item.active {
          background: rgba(139, 92, 246, 0.1);
          border-color: rgba(139, 92, 246, 0.3);
          color: var(--neon-purple);
        }

        .nav-item.active .icon {
          color: var(--neon-cyan);
        }

        .sidebar-footer {
          margin-top: 20px;
        }

        /* MAIN CONTENT */
        .ai-page-main {
          flex: 1;
          height: 100vh;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          padding: 80px 60px;
          position: relative;
        }

        .close-btn {
          position: fixed;
          top: 30px;
          right: 30px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-subtle);
          color: var(--text-white);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 2001;
        }

        .main-header {
          margin-bottom: 40px;
          max-width: 900px;
        }

        .main-title {
          font-size: clamp(2rem, 4vw, 3rem);
          margin-bottom: 15px;
          line-height: 1.1;
        }

        .main-intro {
          font-size: 1.1rem;
          color: var(--text-light);
          line-height: 1.5;
        }

        .dashboard-content {
          opacity: 1;
          visibility: visible;
          position: relative;
          z-index: 1;
          animation: dashboardFadeIn 0.5s ease-out forwards;
        }

        @keyframes dashboardFadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .view-header {
          margin-bottom: 40px;
        }

        .category-long-desc {
          margin-top: 20px;
          font-size: 1.15rem;
          line-height: 1.7;
          color: var(--text-light);
          max-width: 1000px;
          border-left: 2px solid var(--neon-purple);
          padding-left: 25px;
          background: rgba(139, 92, 246, 0.03);
          padding-top: 15px;
          padding-bottom: 15px;
          border-radius: 0 var(--radius-md) var(--radius-md) 0;
        }

        .view-title {
          font-size: 1.75rem;
          display: flex;
          align-items: center;
          gap: 15px;
          color: var(--text-white);
        }

        .view-title svg {
          color: var(--neon-cyan);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 25px;
        }

        .stat-card {
          padding: 35px;
          display: flex;
          flex-direction: column;
          gap: 15px;
          transition: transform 0.4s var(--ease-out-expo);
        }

        .stat-card:hover {
          transform: translateY(-5px);
          border-color: var(--neon-purple);
        }

        .stat-value {
          font-size: 3rem;
          font-weight: 800;
          font-family: 'Outfit', sans-serif;
          line-height: 1;
        }

        .stat-label {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-white);
        }

        .stat-desc {
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.6;
        }

        .main-footer {
          margin-top: 80px;
          padding-top: 30px;
          border-top: 1px solid var(--border-subtle);
          display: flex;
          justify-content: space-between;
          color: var(--text-dim);
          font-size: 0.85rem;
        }

        .mobile-only {
          display: none;
        }

        @media (max-width: 1024px) {
          .ai-page-sidebar {
            display: none;
          }
          .mobile-only {
            display: flex;
          }
          .ai-page-main {
            padding: 80px 30px;
          }
          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default AIBusinessPage;
