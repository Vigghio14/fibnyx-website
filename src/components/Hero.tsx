import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import gsap from 'gsap';
import RobotScene from './RobotScene';

const Hero: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [glitchDone, setGlitchDone] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Timeline di ingresso
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo('.hero-badge',
      { opacity: 0, y: -20, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.7)' }
    );

    tl.fromTo('.hero-title',
      { opacity: 0 },
      { opacity: 1, duration: 0.1 },
      '-=0.2'
    );

    tl.to('.hero-title', {
      keyframes: [
        { x: -3, skewX: 2, duration: 0.05 },
        { x: 3, skewX: -2, duration: 0.05 },
        { x: -2, skewX: 1, duration: 0.05 },
        { x: 2, skewX: -1, duration: 0.05 },
        { x: -1, skewX: 0.5, duration: 0.05 },
        { x: 0, skewX: 0, duration: 0.3 },
      ],
      ease: 'power2.out',
      onComplete: () => setGlitchDone(true),
    });

    tl.fromTo('.hero-description',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.2'
    );

    tl.fromTo('.hero-actions .btn',
      { opacity: 0, y: 20, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.15, ease: 'back.out(1.7)' },
      '-=0.4'
    );

    // Entrance animations remain, but ScrollTrigger is removed
    // since we're using discrete full-page transitions now.

    return () => { tl.kill(); };
  }, []);

  return (
    <section id="home" className="hero" ref={sectionRef}>
      <RobotScene />

      <div className="container hero-content" ref={contentRef}>
        <h1 className="hero-title" ref={titleRef}>
          {t.hero.title1}{' '}
          <span className={`gradient-text ${glitchDone ? 'settled' : ''}`}>
            {t.hero.title_accent}
          </span>
          <br />
          {t.hero.title2}
        </h1>

        <p className="hero-description">{t.hero.description}</p>

        <div className="hero-badge glass magnetic">
          <Sparkles size={14} />
          <span>{t.hero.badge}</span>
        </div>

        <div className="hero-actions">
          <a href="https://calendly.com/fibnyx-info/30min" target="_blank" rel="noopener noreferrer" className="btn btn-primary magnetic">
            {t.hero.cta_primary} <ArrowRight size={18} />
          </a>
          <a href="#services" className="btn btn-outline magnetic">
            {t.hero.cta_secondary}
          </a>
        </div>

        <div className="scroll-indicator">
          <div className="scroll-line" />
        </div>
      </div>

      <style>{`
        .hero {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          position: relative;
          overflow: hidden;
          padding: 0;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 900px;
          /* Push content to bottom half so robot face is visible */
          margin-top: auto;
          padding-bottom: 5vh;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1.25rem;
          border-radius: var(--radius-full);
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--neon-cyan);
          margin-bottom: var(--spacing-sm);
          opacity: 0;
        }

        .hero-title {
          font-size: clamp(2.8rem, 8vw, 5.5rem);
          font-weight: 800;
          line-height: 1.05;
          margin-bottom: var(--spacing-md);
          letter-spacing: -0.02em;
          opacity: 1;
        }

        .hero-title .gradient-text {
          display: inline-block;
          position: relative;
        }

        .hero-title .gradient-text.settled {
          text-shadow: 0 0 40px rgba(139, 92, 246, 0.3);
        }

        .hero-description {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.9);
          max-width: 620px;
          margin-bottom: var(--spacing-sm);
          opacity: 0;
          line-height: 1.75;
        }

        .hero-actions {
          display: flex;
          gap: var(--spacing-sm);
          flex-wrap: wrap;
          justify-content: center;
        }

        .hero-actions .btn {
          opacity: 0;
        }

        .scroll-indicator {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          opacity: 0;
        }

        .scroll-line {
          width: 1px;
          height: 50px;
          background: linear-gradient(to bottom, var(--neon-purple), transparent);
          animation: scrollPulse 2s ease-in-out infinite;
        }

        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: scaleY(1); }
          50% { opacity: 0.8; transform: scaleY(1.3); }
        }

        @media (max-width: 768px) {
          .hero {
            padding: 140px 0 60px;
          }
          .hero-actions {
            flex-direction: column;
            width: 100%;
            padding: 0 var(--spacing-sm);
          }
          .hero-actions .btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
