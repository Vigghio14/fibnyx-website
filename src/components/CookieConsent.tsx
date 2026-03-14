import React, { useState, useEffect } from 'react';


const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('fibnyx_cookie_consent');
    if (!consent) {
      setTimeout(() => setIsVisible(true), 2000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('fibnyx_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="cookie-banner glass">
      <div className="container cookie-content">
        <p>Utilizziamo i cookie per migliorare la tua esperienza e analizzare il traffico. Continuando a navigare, accetti il nostro uso dei cookie.</p>
        <div className="cookie-actions">
          <button className="btn btn-primary btn-sm" onClick={handleAccept}>Accetta tutto</button>
        </div>
      </div>

      <style>{`
        .cookie-banner {
          position: fixed;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1000;
          width: 90%;
          max-width: 600px;
          padding: 1.5rem;
          border-radius: var(--radius-lg);
          border: 1px solid var(--border-light);
          animation: slideUp 0.5s var(--ease-out-expo);
        }

        .cookie-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
        }

        .cookie-content p {
          font-size: 0.85rem;
          color: var(--text-light);
          line-height: 1.5;
          margin: 0;
        }

        .cookie-actions {
          display: flex;
          gap: 1rem;
          flex-shrink: 0;
        }

        @keyframes slideUp {
          from { transform: translate(-50%, 100px); opacity: 0; }
          to { transform: translate(-50%, 0); opacity: 1; }
        }

        @media (max-width: 600px) {
          .cookie-content {
            flex-direction: column;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
};

export default CookieConsent;
