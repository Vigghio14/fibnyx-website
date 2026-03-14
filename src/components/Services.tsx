import React, { useRef, useEffect } from 'react';
import { Cpu, Globe, Brain, Calculator, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import gsap from 'gsap';

const iconMap: Record<string, React.ReactNode> = {
  cpu: <Cpu size={28} />,
  globe: <Globe size={28} />,
  brain: <Brain size={28} />,
  calculator: <Calculator size={28} />,
};

interface ServicesProps {
  onSelectService?: (index: number) => void;
}

const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Stagger entrance can be here, but we'll trigger it 
    // when the section becomes active if needed.
    // For now, let's just make sure cards are visible 
    // when GSAP reveals the section.
    gsap.set('.service-card', { opacity: 1, y: 0 });
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(card, {
      rotateX,
      rotateY,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = (index: number) => {
    const card = cardsRef.current[index];
    if (!card) return;

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: 'elastic.out(1, 0.5)',
    });
  };

  return (
    <section id="services" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">— {t.services.label}</span>
          <h2 className="section-title">
            {t.services.title}{' '}
            <span className="gradient-text">{t.services.title_accent}</span>
          </h2>
        </div>

        <div className="services-grid">
          {t.services.items.map((item, i) => (
            <div
              className="service-card glass magnetic"
              key={i}
              ref={el => { cardsRef.current[i] = el; }}
              onMouseMove={(e) => handleMouseMove(e, i)}
              onMouseLeave={() => handleMouseLeave(i)}
              onClick={() => onSelectService?.(i)}
            >
              <div className="service-icon">
                {iconMap[item.icon] || <Cpu size={28} />}
              </div>
              <h3 className="service-title">{item.title}</h3>
              <p className="service-desc">{item.description}</p>
              <div className="service-tags">
                {item.tags.map((tag, j) => (
                  <span className="tag" key={j}>{tag}</span>
                ))}
              </div>
              <div className="service-arrow">
                <ArrowUpRight size={18} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        #services {
          background: linear-gradient(180deg, var(--bg-deep) 0%, var(--bg-dark) 100%);
          width: 100%;
          height: 100%;
        }

        #services .section-header {
          text-align: center;
          margin-bottom: var(--spacing-md);
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
          max-width: 900px;
          margin: 0 auto;
        }

        .service-card {
          padding: 1.5rem 1.75rem;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          transition: background 0.3s;
          transform-style: preserve-3d;
          perspective: 1000px;
        }

        .service-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: var(--radius-lg);
          padding: 1px;
          background: linear-gradient(135deg, transparent 30%, rgba(139, 92, 246, 0.3) 100%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.45s ease;
        }

        .service-card:hover::before {
          opacity: 1;
        }

        .service-icon {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-md);
          background: rgba(139, 92, 246, 0.1);
          color: var(--neon-purple);
          margin-bottom: 1rem;
          transition: all 0.4s ease;
        }

        .service-card:hover .service-icon {
          background: var(--gradient-primary);
          color: white;
          transform: scale(1.1) translateZ(20px);
          box-shadow: var(--shadow-glow-sm);
        }

        .service-title {
          font-size: 1.25rem;
          margin-bottom: 0.5rem;
          color: var(--text-white);
          transform: translateZ(10px);
        }

        .service-desc {
          font-size: 0.9rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin-bottom: 1rem;
          transform: translateZ(5px);
        }

        .service-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .service-arrow {
          position: absolute;
          top: 2rem;
          right: 2rem;
          color: var(--text-dim);
          transition: all 0.4s ease;
        }

        .service-card:hover .service-arrow {
          color: var(--neon-cyan);
          transform: translate(5px, -5px) translateZ(30px);
        }

        @media (max-width: 768px) {
          .services-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default Services;
