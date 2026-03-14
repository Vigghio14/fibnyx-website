import React, { useEffect, useRef } from 'react';
import { X, CheckCircle2, ArrowRight, Zap, Target, Shield, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import gsap from 'gsap';

interface ServiceDetailPageProps {
  serviceIndex: number;
  onClose: () => void;
}

const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ serviceIndex, onClose }) => {
  const { t } = useLanguage();
  const pageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const service = t.services.items[serviceIndex] as any;
  const details = service.details || {
    fullTitle: service.title,
    fullDescription: service.description,
    features: [],
    benefits: []
  };

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(pageRef.current,
      { y: '100%', autoAlpha: 0 },
      { y: '0%', autoAlpha: 1, duration: 0.8, ease: 'power4.out' }
    );

    tl.fromTo('.detail-animate',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
      '-=0.4'
    );

    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleClose = () => {
    gsap.to(pageRef.current, {
      y: '100%',
      autoAlpha: 0,
      duration: 0.6,
      ease: 'power4.in',
      onComplete: onClose
    });
  };

  return (
    <div className="service-detail-page" ref={pageRef}>
      <div className="detail-container">
        <button className="close-btn magnetic" onClick={handleClose} aria-label="Close">
          <X size={24} />
        </button>

        <div className="detail-content" ref={contentRef}>
          <div className="detail-header detail-animate">
            <span className="section-label">— {t.services.label}</span>
            <h1 className="detail-title">
              {details.fullTitle.split(' ').slice(0, -1).join(' ')}{' '}
              <span className="gradient-text">{details.fullTitle.split(' ').pop()}</span>
            </h1>
          </div>

          <div className="detail-main-grid">
            <div className="detail-info detail-animate">
              <p className="detail-description">{details.fullDescription}</p>

              <div className="detail-tags">
                {service.tags.map((tag: string, i: number) => (
                  <span key={i} className="tag">{tag}</span>
                ))}
              </div>

              <div className="detail-cta-box glass-strong">
                <h3>{t.services.common.ready}</h3>
                <p>{t.services.common.discuss}</p>
                <button className="btn btn-primary" onClick={handleClose}>
                  {t.services.common.cta} <ArrowRight size={18} />
                </button>
              </div>
            </div>

            <div className="detail-features detail-animate">
              <div className="feature-section">
                <h3 className="section-subtitle"><Zap size={20} className="icon-neon" /> {t.services.common.features}</h3>
                <div className="feature-list">
                  {details.features.map((feature: string, i: number) => (
                    <div key={i} className="feature-item">
                      <CheckCircle2 size={18} className="text-neon" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="feature-section">
                <h3 className="section-subtitle"><Target size={20} className="icon-neon" /> {t.services.common.benefits}</h3>
                <div className="feature-list">
                  {details.benefits.map((benefit: string, i: number) => (
                    <div key={i} className="feature-item">
                      <Shield size={18} className="text-neon" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="detail-footer-nav detail-animate" style={{ textAlign: 'center', marginTop: '4rem' }}>
            <button className="btn btn-outline" onClick={handleClose}>
              <ArrowLeft size={18} /> {t.services.common.back}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .service-detail-page {
          position: fixed;
          inset: 0;
          z-index: 2000;
          background: var(--bg-deep);
          overflow-y: auto;
          padding: 4rem 1rem;
        }

        .detail-container {
          max-width: 1000px;
          margin: 0 auto;
          position: relative;
        }

        .close-btn {
          position: fixed;
          top: 2rem;
          right: 2rem;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-light);
          color: var(--text-white);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          z-index: 10;
        }

        .close-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: rotate(90deg);
        }

        .detail-header {
          margin-bottom: 3rem;
          text-align: left;
        }

        .detail-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          margin-top: 1rem;
        }

        .detail-main-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 4rem;
        }

        .detail-description {
          font-size: 1.15rem;
          line-height: 1.8;
          color: var(--text-light);
          margin-bottom: 2rem;
        }

        .detail-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-bottom: 3rem;
        }

        .detail-cta-box {
          padding: 2.5rem;
          border-radius: var(--radius-xl);
          text-align: center;
        }

        .detail-cta-box h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }

        .detail-cta-box p {
          font-size: 0.95rem;
          margin-bottom: 2rem;
          color: var(--text-muted);
        }

        .feature-section {
          margin-bottom: 3rem;
        }

        .section-subtitle {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 1.25rem;
          margin-bottom: 1.5rem;
          color: var(--text-white);
        }

        .icon-neon {
          color: var(--neon-cyan);
        }

        .text-neon {
          color: var(--neon-purple);
        }

        .feature-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .feature-item {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.02);
          border-radius: var(--radius-md);
          border: 1px solid transparent;
          transition: all 0.3s ease;
        }

        .feature-item:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: var(--border-subtle);
          transform: translateX(10px);
        }

        .feature-item span {
          font-size: 0.95rem;
          color: var(--text-light);
        }

        @media (max-width: 900px) {
          .detail-main-grid {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          
          .service-detail-page {
            padding: 6rem 1.5rem 3rem;
          }

          .close-btn {
            top: 1rem;
            right: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default ServiceDetailPage;
