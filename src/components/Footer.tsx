import React from 'react';
import { useLanguage } from '../LanguageContext';

interface FooterProps {
  onLegalClick?: (page: 'privacy' | 'terms' | 'cookies') => void;
}

const Footer: React.FC<FooterProps> = ({ onLegalClick }) => {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      {/* Pulsing grid */}
      <div className="footer-grid-bg" />

      <div className="container footer-content">
        <div className="footer-brand" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyItems: 'center', gap: '0.75rem' }}>
            <img src="/logo.png" alt="FibNyx Logo" className="footer-logo-img" />
            <span className="footer-logo">Fib<span className="gradient-text">Nyx</span></span>
          </div>
          <p className="footer-tagline">{t.footer.tagline}</p>
        </div>

        <div className="footer-links">
          <a href="#home">Home</a>
          <a href="#services">{t.nav.services}</a>
          <a href="#about">{t.nav.about}</a>
          <a href="#contact">{t.nav.contact}</a>
        </div>


        <div className="footer-bottom">
          <div className="footer-legal-links">
            <a href="#" onClick={(e) => { e.preventDefault(); onLegalClick?.('privacy'); }}>Privacy Policy</a>
            <a href="#" onClick={(e) => { e.preventDefault(); onLegalClick?.('terms'); }}>Termini</a>
            <a href="#" onClick={(e) => { e.preventDefault(); onLegalClick?.('cookies'); }}>Cookie Policy</a>
          </div>
          <span>© {year} FibNyx. {t.footer.rights}</span>
        </div>
      </div>

      <style>{`
        .site-footer {
          position: relative;
          padding: var(--spacing-xl) 0 var(--spacing-md);
          overflow: hidden;
          border-top: 1px solid var(--border-subtle);
        }

        .footer-grid-bg {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(139, 92, 246, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          animation: gridPulse 6s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes gridPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }

        .footer-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--spacing-lg);
        }

        .footer-brand {
          text-align: center;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-family: 'Outfit', sans-serif;
          font-size: 2rem;
          font-weight: 800;
          color: var(--text-white);
        }

        .footer-logo-img {
          height: 2.5rem;
          width: auto;
          object-fit: contain;
        }

        .footer-tagline {
          margin-top: 0.5rem;
          font-size: 0.9rem;
          color: var(--text-muted) !important;
        }

        .footer-links {
          display: flex;
          gap: 2rem;
          flex-wrap: wrap;
          justify-content: center;
        }

        .footer-links a {
          font-size: 0.85rem;
          color: var(--text-muted);
          transition: color var(--transition-fast);
        }

        .footer-links a:hover {
          color: var(--neon-cyan);
        }


        .footer-bottom {
          font-size: 0.8rem;
          color: var(--text-dim);
          padding-top: var(--spacing-md);
          border-top: 1px solid var(--border-subtle);
          width: 100%;
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          align-items: center;
        }

        .footer-legal-links {
          display: flex;
          gap: 1.5rem;
        }

        .footer-legal-links a {
          color: var(--text-dim);
          text-decoration: none;
          transition: color 0.3s;
        }

        .footer-legal-links a:hover {
          color: var(--neon-cyan);
        }

        @media (max-width: 600px) {
          .footer-links {
            gap: 1rem;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
