import React, { useRef } from 'react';
import { useLanguage } from '../LanguageContext';

const About: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section id="about" ref={sectionRef}>
      <div className="container">
        <div className="about-grid">
          {/* Left: Stats & Visual */}
          <div className="about-left">
            <div className="about-avatar-container">
              <div className="avatar-ring">
                <div className="avatar-placeholder">
                  <span>F</span>
                </div>
                <div className="avatar-orbit" />
              </div>
            </div>

            <div className="about-stats-grid">
              {t.about.stats.map((stat, i) => (
                <div className="stat-item glass" key={i} style={{ opacity: 1, transform: 'none' }}>
                  <span className="stat-value gradient-text">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Bio */}
          <div className="about-right">
            <span className="section-label">— {t.about.label}</span>
            <h2 className="section-title">
              {t.about.title}{' '}
              <span className="gradient-text">{t.about.title_accent}</span>
            </h2>
            <p className="about-bio">{t.about.description}</p>
            <p className="about-bio">{t.about.description2}</p>

            <div className="skills-container">
              {t.about.skills.map((skill, i) => (
                <span className="skill-tag" key={i}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        #about {
          background: linear-gradient(180deg, var(--bg-dark) 0%, var(--bg-deep) 100%);
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          gap: var(--spacing-xl);
          align-items: center;
        }

        .about-left {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--spacing-lg);
        }

        .about-avatar-container {
          position: relative;
          display: flex;
          justify-content: center;
        }

        .avatar-ring {
          position: relative;
          width: 180px;
          height: 180px;
        }

        .avatar-placeholder {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: var(--gradient-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Outfit', sans-serif;
          font-size: 4rem;
          font-weight: 800;
          color: white;
          position: relative;
          z-index: 2;
        }

        .avatar-orbit {
          position: absolute;
          inset: -15px;
          border-radius: 50%;
          border: 1px solid rgba(139, 92, 246, 0.2);
          animation: spin-slow 20s linear infinite;
        }

        .avatar-orbit::before {
          content: '';
          position: absolute;
          top: -4px;
          left: 50%;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--neon-cyan);
          box-shadow: 0 0 12px var(--neon-cyan);
        }

        .about-stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
          width: 100%;
          max-width: 320px;
        }

        .stat-item {
          padding: 1.25rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .stat-value {
          font-family: 'Outfit', sans-serif;
          font-size: 2rem;
          font-weight: 800;
        }

        .stat-label {
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--text-muted);
        }

        .about-right {
          display: flex;
          flex-direction: column;
        }

        .about-bio {
          font-size: 1rem;
          line-height: 1.8;
          color: var(--text-light);
          margin-bottom: var(--spacing-sm);
        }

        .skills-container {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: var(--spacing-md);
        }

        .skill-tag {
          opacity: 1; /* Ensure visible after section alpha is 1 */
          padding: 0.4rem 1rem;
          font-size: 0.78rem;
          font-weight: 500;
          background: rgba(139, 92, 246, 0.08);
          color: var(--neon-purple);
          border: 1px solid rgba(139, 92, 246, 0.15);
          border-radius: var(--radius-full);
          transition: all 0.3s var(--ease-out-expo);
        }

        .skill-tag:hover {
          background: rgba(139, 92, 246, 0.15);
          border-color: rgba(139, 92, 246, 0.3);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(139, 92, 246, 0.15);
        }

        @media (max-width: 992px) {
          .about-grid {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .about-right {
            align-items: center;
          }
          .skills-container {
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
};

export default About;
