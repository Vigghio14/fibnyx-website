import React, { useRef, useState } from 'react';
import { Send, Mail, Calendar, Bot } from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import Footer from './Footer';

interface ContactProps {
  onOpenChat?: () => void;
  onLegalClick?: (page: 'privacy' | 'terms' | 'cookies') => void;
}

const Contact: React.FC<ContactProps> = ({ onOpenChat, onLegalClick }) => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = t.contact.errors.required;
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = t.contact.errors.email;
    if (!formData.message.trim()) newErrors.message = t.contact.errors.required;
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length) {
      setErrors(v);
      return;
    }
    setErrors({});

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          access_key: "1f98b38d-c859-40c5-b90d-2d475f66184e"
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setErrors({ submit: t.contact.errors.send_fail });
      }
    } catch (err) {
      setErrors({ submit: t.contact.errors.error });
    }
  };

  return (
    <section id="contact" ref={sectionRef}>
      {/* Wave background */}
      <div className="contact-wave">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="rgba(139, 92, 246, 0.03)" d="M0,160 C320,200 480,120 720,160 C960,200 1120,120 1440,160 L1440,320 L0,320 Z">
            <animate attributeName="d"
              values="M0,160 C320,200 480,120 720,160 C960,200 1120,120 1440,160 L1440,320 L0,320 Z;
                      M0,180 C320,140 480,200 720,140 C960,180 1120,100 1440,140 L1440,320 L0,320 Z;
                      M0,160 C320,200 480,120 720,160 C960,200 1120,120 1440,160 L1440,320 L0,320 Z"
              dur="8s" repeatCount="indefinite" />
          </path>
        </svg>
      </div>

      <div className="container">
        <div className="section-header" style={{ textAlign: 'center', marginBottom: 'var(--spacing-xl)', position: 'relative', zIndex: 1 }}>
          <span className="section-label">— {t.contact.label}</span>
          <h2 className="section-title">
            {t.contact.title}{' '}
            <span className="gradient-text">{t.contact.title_accent}</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>{t.contact.description}</p>
        </div>

        <div className="contact-grid">
          {/* Contact Info */}
          <div className="contact-info">
            <div className="info-card glass">
              <div className="info-item">
                <Mail size={20} className="info-icon" />
                <div>
                  <strong>{t.contact.email}</strong>
                  <span>info@fibnyx.com</span>
                </div>
              </div>
            </div>

            <a href="https://calendly.com/fibnyx-info/30min" target="_blank" rel="noopener noreferrer" className="btn btn-neon calendly-btn">
              <Calendar size={18} />
              {t.contact.calendly}
            </a>

            <div className="chat-promo glass">
              <p className="chat-promo-text">{t.contact.chat_label} 👇</p>
              <button
                className="btn btn-primary chat-btn-contact"
                onClick={(e) => { e.preventDefault(); onOpenChat?.(); }}
                style={{ marginTop: '0.5rem', width: '100%' }}
              >
                <Bot size={18} /> {t.nav.cta}
              </button>
            </div>
          </div>

          {/* Form */}
          <form className="contact-form glass" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder={t.contact.placeholder_name}
                value={formData.name}
                onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="form-error">{errors.name}</span>}
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder={t.contact.placeholder_email}
                value={formData.email}
                onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="form-error">{errors.email}</span>}
            </div>
            <div className="form-group">
              <textarea
                placeholder={t.contact.placeholder_message}
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))}
                className={errors.message ? 'error' : ''}
              />
              {errors.message && <span className="form-error">{errors.message}</span>}
            </div>
            <button type="submit" className="btn btn-primary submit-btn">
              {submitted ? '✓' : t.contact.cta}
              {!submitted && <Send size={16} />}
            </button>
            {errors.submit && <span className="form-error" style={{ textAlign: 'center' }}>{errors.submit}</span>}
          </form>
        </div>

        <Footer onLegalClick={onLegalClick} />
      </div>

      <style>{`
        #contact {
          background: linear-gradient(180deg, var(--bg-deep) 0%, var(--bg-dark) 100%);
        }

        .contact-wave {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 200px;
          pointer-events: none;
          z-index: 0;
        }

        .contact-wave svg {
          width: 100%;
          height: 100%;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: var(--spacing-lg);
          position: relative;
          z-index: 1;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .info-card {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .info-item {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .info-icon {
          color: var(--neon-cyan);
          flex-shrink: 0;
        }

        .info-item strong {
          display: block;
          font-size: 0.8rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 0.15rem;
        }

        .info-item span {
          color: var(--text-white);
          font-size: 0.95rem;
        }

        .calendly-btn {
          width: 100%;
          text-align: center;
        }

        .chat-promo {
          padding: 1.5rem;
          text-align: center;
        }

        .chat-promo-text {
          color: var(--text-white) !important;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .chat-promo-hint {
          font-size: 0.85rem;
          color: var(--text-muted) !important;
        }

        .contact-form {
          padding: 2rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .form-group {
          position: relative;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 1rem 1.25rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-md);
          color: var(--text-white);
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
          transition: all var(--transition-fast);
          resize: vertical;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: var(--neon-purple);
          box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
        }

        .form-group input.error,
        .form-group textarea.error {
          border-color: #ef4444;
        }

        .form-error {
          font-size: 0.75rem;
          color: #ef4444;
          margin-top: 0.25rem;
          display: block;
        }

        .submit-btn {
          width: 100%;
          padding: 1rem;
          font-size: 0.95rem;
          margin-top: 0.5rem;
        }

        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;
