import React from 'react';
import { X } from 'lucide-react';

interface CookiePolicyProps {
    onClose: () => void;
}

const CookiePolicy: React.FC<CookiePolicyProps> = ({ onClose }) => {
    return (
        <div className="legal-overlay glass">
            <div className="legal-content scroll-container">
                <button className="legal-close" onClick={onClose} aria-label="Close">
                    <X size={24} />
                </button>

                <h1 className="gradient-text">Cookie Policy</h1>
                <p className="last-updated">Ultimo aggiornamento: Marzo 2026</p>

                <section>
                    <h2>Cosa sono i cookie?</h2>
                    <p>I cookie sono piccoli file di testo che vengono salvati sul vostro dispositivo quando visitate un sito web. Ci aiutano a far funzionare il sito correttamente e a capire come i visitatori interagiscono con esso.</p>
                </section>

                <section>
                    <h2>Cookie che utilizziamo</h2>
                    <ul>
                        <li><strong>Necessari:</strong> Per il funzionamento base del sito e la sicurezza.</li>
                        <li><strong>Analitici:</strong> Per capire quante persone visitano il sito (dati anonimizzati).</li>
                        <li><strong>Funzionali:</strong> Per ricordare le vostre preferenze, come la lingua.</li>
                    </ul>
                </section>

                <section>
                    <h2>Gestione dei cookie</h2>
                    <p>Potete modificare le preferenze dei cookie in qualsiasi momento tramite le impostazioni del vostro browser o il nostro banner di consenso.</p>
                </section>
            </div>
        </div>
    );
};

export default CookiePolicy;
