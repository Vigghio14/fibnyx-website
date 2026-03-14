import React, { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface HeaderProps {
  scrolled?: boolean;
  onSectionChange?: (id: string) => void;
  activeIndex?: number;
  sections: string[];
}

const Header: React.FC<HeaderProps> = ({ onSectionChange, activeIndex, scrolled, sections }) => {
  const { t, language, toggleLanguage } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: '#home', label: t.nav.home },
    { href: '#services', label: t.nav.services },
    { href: '#ai-business', label: t.aiBusiness.section.label },
    { href: '#about', label: t.nav.about },
    { href: '#contact', label: t.nav.contact },
  ];

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    if (onSectionChange) onSectionChange(href);
  };

  return (
    <>
      <header className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="navbar-inner container">
          <a href="#home" className="navbar-logo magnetic" onClick={(e) => handleNavClick(e, '#home')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <img src="/logo.png" alt="FibNyx Logo" className="header-logo-img" />
            <span className="logo-text">Fib<span className="gradient-text">Nyx</span></span>
          </a>

          <nav className="navbar-links">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`nav-link magnetic ${sections && activeIndex !== undefined && sections[activeIndex] === link.href.replace('#', '') ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="navbar-actions">
            <button className="lang-toggle magnetic" onClick={toggleLanguage} aria-label="Toggle language">
              <Globe size={16} />
              <span>{language === 'it' ? 'EN' : 'IT'}</span>
            </button>
            <a href="https://calendly.com/fibnyx-info/30min" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm magnetic">
              {t.nav.cta}
            </a>
            <button
              className="mobile-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <nav className="mobile-nav">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className="mobile-nav-link"
              onClick={(e) => handleNavClick(e, link.href)}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              {link.label}
            </a>
          ))}
          <div className="mobile-nav-actions">
            <button className="lang-toggle" onClick={toggleLanguage}>
              <Globe size={16} />
              <span>{language === 'it' ? 'EN' : 'IT'}</span>
            </button>
            <a href="https://calendly.com/fibnyx-info/30min" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              {t.nav.cta}
            </a>
          </div>
        </nav>
      </div>

      <style>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          padding: 1.25rem 0;
          transition: all 0.4s var(--ease-out-expo);
          background: transparent;
        }

        .navbar-scrolled {
          padding: 0.6rem 0;
          background: rgba(3, 7, 18, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border-subtle);
        }

        .navbar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--spacing-md);
        }

        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
          font-size: 1.5rem;
          letter-spacing: -0.02em;
          text-decoration: none;
          color: var(--text-white);
          flex-shrink: 0;
        }

        .header-logo-img {
          height: 1.75rem;
          width: auto;
          object-fit: contain;
        }

        .navbar-scrolled .header-logo-img {
          height: 1.5rem;
        }

        .navbar-scrolled .navbar-logo {
          font-size: 1.3rem;
        }

        .navbar-links {
          display: flex;
          gap: 0.25rem;
        }

        .nav-link {
          padding: 0.5rem 1rem;
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--text-muted);
          border-radius: var(--radius-sm);
          transition: all var(--transition-fast);
          text-decoration: none;
        }

        .nav-link:hover {
          color: var(--text-white);
          background: rgba(255, 255, 255, 0.05);
        }

        .navbar-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .lang-toggle {
          display: flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.4rem 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-full);
          color: var(--text-muted);
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: all var(--transition-fast);
          font-family: 'Inter', sans-serif;
        }

        .lang-toggle:hover {
          color: var(--text-white);
          border-color: var(--border-light);
        }

        .btn-sm {
          padding: 0.5rem 1.25rem;
          font-size: 0.8rem;
        }

        .mobile-toggle {
          display: none;
          background: none;
          border: none;
          color: var(--text-white);
          cursor: pointer;
          padding: 0.25rem;
        }

        .mobile-menu {
          position: fixed;
          inset: 0;
          z-index: 999;
          background: rgba(3, 7, 18, 0.97);
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.4s var(--ease-out-expo);
        }

        .mobile-menu.open {
          opacity: 1;
          pointer-events: all;
        }

        .mobile-nav {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }

        .mobile-nav-link {
          font-family: 'Outfit', sans-serif;
          font-size: 2rem;
          font-weight: 700;
          color: var(--text-white);
          text-decoration: none;
          opacity: 0;
          transform: translateY(20px);
          transition: color var(--transition-fast);
        }

        .mobile-nav-link:hover {
          color: var(--neon-cyan);
        }

        .mobile-menu.open .mobile-nav-link {
          animation: fadeInUp 0.5s var(--ease-out-expo) forwards;
        }

        .mobile-nav-actions {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          margin-top: 1rem;
          opacity: 0;
        }

        .mobile-menu.open .mobile-nav-actions {
          animation: fadeInUp 0.5s var(--ease-out-expo) 0.5s forwards;
        }

        @media (max-width: 768px) {
          .navbar-links {
            display: none;
          }
          .navbar-actions .btn {
            display: none;
          }
          .mobile-toggle {
            display: flex;
          }
        }
      `}</style>
    </>
  );
};

export default Header;
