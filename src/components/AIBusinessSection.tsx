import React, { useRef } from 'react';
import { useLanguage } from '../LanguageContext';
import { BarChart as ChartBar, ArrowRight } from 'lucide-react';

interface AIBusinessSectionProps {
  onOpenDetail: () => void;
}

const AIBusinessSection: React.FC<AIBusinessSectionProps> = ({ onOpenDetail }) => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section id="ai-business" className="ai-business-section" ref={sectionRef}>
      <div className="container">
        <div className="ai-business-content glass-strong">
          <div className="content-left">
            <div className="section-label">— {t.aiBusiness.section.label}</div>
            <h2 className="section-title">
              {t.aiBusiness.section.title} <span className="gradient-text">{t.aiBusiness.section.title_accent}</span>
            </h2>
            <p className="section-description">
              {t.aiBusiness.section.description}
            </p>
            <ul className="highlights-list">
              {(t.aiBusiness.section as any).highlights.map((item: string, i: number) => (
                <li key={i} className="highlight-item">
                  <span className="dot"></span> {item}
                </li>
              ))}
            </ul>
            <button className="btn btn-primary magnetic" onClick={onOpenDetail}>
              {t.aiBusiness.section.cta} <ArrowRight size={18} />
            </button>
          </div>
          <div className="content-right">
            <div className="visual-container">
              <div className="pulse-circle"></div>
              <ChartBar size={120} className="visual-icon" />
              <div className="data-circles">
                <div className="circle circle-1">88%</div>
                <div className="circle circle-2">66%</div>
                <div className="circle circle-3">ROI</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .ai-business-section {
          background: var(--bg-deep);
        }

        .ai-business-content {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 60px;
          padding: 80px;
          align-items: center;
          position: relative;
          overflow: hidden;
        }

        .section-description {
          font-size: 1.25rem;
          color: var(--text-light);
          margin-bottom: 25px;
          line-height: 1.6;
          max-width: 600px;
        }

        .highlights-list {
          list-style: none;
          padding: 0;
          margin: 0 0 40px 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .highlight-item {
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--text-white);
          font-size: 1.1rem;
        }

        .highlight-item .dot {
          width: 8px;
          height: 8px;
          background: var(--neon-cyan);
          border-radius: 50%;
          box-shadow: 0 0 10px var(--neon-cyan);
        }

        .content-right {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .visual-container {
          position: relative;
          width: 300px;
          height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .visual-icon {
          color: var(--neon-cyan);
          filter: drop-shadow(0 0 20px rgba(0, 240, 255, 0.4));
          z-index: 2;
        }

        .pulse-circle {
          position: absolute;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(0, 240, 255, 0.1) 0%, transparent 70%);
          border-radius: 50%;
          animation: pulse-glow 3s ease-in-out infinite;
        }

        .data-circles {
          position: absolute;
          inset: 0;
        }

        .circle {
          position: absolute;
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: var(--glass-strong);
          backdrop-filter: blur(10px);
          border: 1px solid var(--border-light);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-family: 'Outfit', sans-serif;
          color: var(--text-white);
          font-size: 1.1rem;
          box-shadow: var(--shadow-glow-sm);
        }

        .circle-1 { top: 0; left: 0; border-color: var(--neon-cyan); }
        .circle-2 { bottom: 0; right: 20px; border-color: var(--neon-purple); }
        .circle-3 { top: 30%; right: -20px; border-color: var(--neon-green); }

        @media (max-width: 992px) {
          .ai-business-content {
            grid-template-columns: 1fr;
            padding: 60px 40px;
            text-align: center;
          }
          .section-description {
            margin-left: auto;
            margin-right: auto;
          }
          .content-right {
            display: none;
          }
        }
      `}</style>
    </section>
  );
};

export default AIBusinessSection;
