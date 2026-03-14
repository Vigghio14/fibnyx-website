import React from 'react';
import { X } from 'lucide-react';

interface TermsOfServiceProps {
    onClose: () => void;
}

const TermsOfService: React.FC<TermsOfServiceProps> = ({ onClose }) => {
    return (
        <div className="legal-overlay glass">
            <div className="legal-content scroll-container">
                <button className="legal-close" onClick={onClose} aria-label="Close">
                    <X size={24} />
                </button>

                <h1 className="gradient-text">Termini e Condizioni</h1>
                <p className="last-updated">Ultimo aggiornamento: Marzo 2026</p>

                <section>
                    <h2>1. Accettazione dei Termini</h2>
                    <p>Accedendo e utilizzando il sito web di FibNyx, accettate di essere vincolati dai seguenti termini e condizioni d'uso.</p>
                </section>

                <section>
                    <h2>2. Utilizzo del Sito</h2>
                    <p>Il contenuto di questo sito è fornito a scopo informativo e promozionale dei servizi di consulenza AI di FibNyx. È vietato qualsiasi uso improprio, inclusa la copia di materiali protetti da copyright senza autorizzazione.</p>
                </section>

                <section>
                    <h2>3. Limitazione di Responsabilità</h2>
                    <p>Sebbene ci impegniamo a fornire informazioni accurate, FibNyx non garantisce che il sito sia privo di errori o che i risultati ottenuti dall'uso dell'AI siano infallibili.</p>
                </section>

                <section>
                    <h2>4. Legge Applicabile</h2>
                    <p>Questi termini sono regolati dalle leggi dello Stato Italiano e della Comunità Europea.</p>
                </section>
            </div>

            {/* Styles are inherited from PrivacyPolicy or shared via index.css if necessary, 
          but for simplicity in this structure we replicate the overlay styles if needed or assume shared logic */}
        </div>
    );
};

export default TermsOfService;
