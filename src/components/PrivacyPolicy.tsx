import React from 'react';
import { X } from 'lucide-react';


interface PrivacyPolicyProps {
  onClose: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onClose }) => {

  return (
    <div className="legal-overlay glass">
      <div className="legal-content scroll-container">
        <button className="legal-close" onClick={onClose} aria-label="Close">
          <X size={24} />
        </button>

        <h1 className="gradient-text">Informativa sulla Privacy</h1>
        <p className="last-updated">Ultimo aggiornamento: Marzo 2026</p>

        <section>
          <h2>1. Introduzione</h2>
          <p>Benvenuti su FibNyx. La vostra privacy è estremamente importante per noi. Questa Informativa sulla Privacy spiega come raccogliamo, utilizziamo, divulghiamo e proteggiamo le vostre informazioni quando visitate il nostro sito web.</p>
        </section>

        <section>
          <h2>2. Raccolta dei Dati</h2>
          <p>Raccogliamo le informazioni che ci fornite direttamente quando utilizzate il nostro modulo di contatto o interagite con il nostro chatbot AI (nome business, settore, posizione). Raccogliamo anche dati tecnici come l'indirizzo IP tramite cookie per migliorare l'esperienza utente.</p>
        </section>

        <section>
          <h2>3. Utilizzo dei Dati</h2>
          <p>Utilizziamo i vostri dati per:</p>
          <ul>
            <li>Fornire e gestire i nostri servizi.</li>
            <li>Rispondere alle vostre richieste di contatto.</li>
            <li>Gestire le prenotazioni tramite Calendly.</li>
            <li>Migliorare le prestazioni e la sicurezza del sito.</li>
          </ul>
        </section>

        <section>
          <h2>4. Diritti dell'Utente (GDPR)</h2>
          <p>Ai sensi del GDPR, avete il diritto di accedere ai vostri dati, chiederne la rettifica, la cancellazione o la limitazione del trattamento. Potete contattarci a hello@fibnyx.ai per qualsiasi richiesta.</p>
        </section>
      </div>

      <style>{`
        .legal-overlay {
          position: fixed;
          inset: 0;
          z-index: 2000;
          background: rgba(3, 7, 18, 0.95);
          backdrop-filter: blur(20px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          animation: fadeIn 0.4s ease-out;
        }

        .legal-content {
          background: var(--bg-dark);
          width: 100%;
          max-width: 800px;
          height: 90vh;
          border-radius: var(--radius-xl);
          border: 1px solid var(--border-light);
          padding: 3rem;
          position: relative;
          overflow-y: auto;
          color: var(--text-light);
          line-height: 1.6;
        }

        .legal-close {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          transition: color 0.3s;
        }

        .legal-close:hover {
          color: var(--text-white);
        }

        .legal-content h1 {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
        }

        .last-updated {
          color: var(--text-dim);
          font-size: 0.9rem;
          margin-bottom: 2rem;
        }

        .legal-content h2 {
          color: var(--text-white);
          margin-top: 2rem;
          margin-bottom: 1rem;
        }

        .legal-content p, .legal-content ul {
          margin-bottom: 1rem;
        }

        .legal-content ul {
          padding-left: 1.5rem;
        }

        @media (max-width: 768px) {
          .legal-overlay {
            padding: 0;
          }
          .legal-content {
            height: 100vh;
            border-radius: 0;
            padding: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default PrivacyPolicy;
