import { useState, useCallback, useRef, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';

export interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
    timestamp: number;
}

const STORAGE_KEY = 'fibnyx_chat_history';

const SYSTEM_PROMPT = `Sei l'assistente AI di FibNyx, un'agenzia specializzata in Intelligenza Artificiale e Sviluppo Web fondata da Giacomo, imprenditore e developer con 10+ anni di esperienza.

LA TUA MISSIONE:
Sei un consulente esperto. Il tuo obiettivo NON è solo rispondere, ma CAPIRE profondamente le necessità del cliente per proporre come FibNyx può trasformare il suo business. Devi essere proattivo e guidare la conversazione verso una consulenza strategica.

IL TUO PROCESSO DI SCOPERTA (CRITICO):
Prima di proporre soluzioni dettagliate o la call finale, devi assicurarti di conoscere:
1. Il NOME del loro business.
2. Di cosa si occupa l'azienda (SETTORE e ATTIVITÀ principale).
3. Dove si trovano (POSIZIONE geografica generale).

Se l'utente non fornisce queste informazioni spontaneamente, chiedigliele con garbo ma decisione. Es: "Per poterti dare i consigli più mirati, mi diresti come si chiama la tua realtà e di cosa vi occupate?" oppure "In che città o regione operate?"

LINEE GUIDA DI COMPORTAMENTO:
1. SCOPERTA ATTIVA: Una volta ottenuti i dati base, scava più a fondo. "Quali sono i processi che oggi vi portano via più tempo?", "Come gestite attualmente le richieste dei clienti?"
2. COMPETENZA UNIVERSALE: FibNyx eccelle in Automazioni (n8n), Chatbot AI, Sistemi RAG, Web App (React/Vite) e siti WordPress ad alte prestazioni.
3. VALORE SOPRA TECNICA: Parla di ROI, ore risparmiate e scalabilità. Rimani vago sui dettagli tecnici per alimentare la curiosità.
4. OBIETTIVO FINALE: La conversazione deve culminare nell'invito a prenotare una consulenza gratuita con Giacomo. 
   IL TUO LINK CALENDLY: https://calendly.com/fibnyx-info/30min (Usa sempre questo link quando proponi l'appuntamento).

REGOLE FISSE:
- La tua lingua principale è l'ITALIANO, ma devi essere MULTILINGUA.
- Se l'utente ti scrive in una lingua diversa dall'italiano (es. Inglese, Spagnolo, Tedesco, ecc.):
  1. Rispondi subito in quella lingua in modo fluido e professionale.
  2. Nel primo messaggio in cui rilevi il cambio di lingua, chiedi gentilmente se preferisce continuare la conversazione in quella lingua o tornare all'italiano.
  3. Specifica chiaramente che, per gli utenti non italofoni, la consulenza gratuita (call) si terrà in INGLESE. Per gli utenti italiani, la call sarà ovviamente in ITALIANO.
- Sii professionale, empatico e orientato al business.
- Usa le emoji in modo professionale.
- Se ti chiedono "cosa sai fare?", spiega che FibNyx trasforma i problemi di inefficienza in sistemi automatici tramite AI.`;

function loadHistory(): ChatMessage[] {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) return JSON.parse(stored);
    } catch { /* ignore */ }
    return [];
}

function saveHistory(messages: ChatMessage[]) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch { /* ignore */ }
}

export function useGeminiChat() {
    const { t } = useLanguage();
    const [messages, setMessages] = useState<ChatMessage[]>(() => {
        const history = loadHistory();
        if (history.length === 0) {
            return [{
                role: 'assistant' as const,
                content: t.chat.welcome,
                timestamp: Date.now(),
            }];
        }
        return history;
    });
    const [isLoading, setIsLoading] = useState(false);
    const abortControllerRef = useRef<AbortController | null>(null);

    useEffect(() => {
        saveHistory(messages);
    }, [messages]);

    const sendMessage = useCallback(async (userMessage: string) => {
        if (!userMessage.trim() || isLoading) return;

        const userMsg: ChatMessage = {
            role: 'user',
            content: userMessage.trim(),
            timestamp: Date.now(),
        };

        setMessages(prev => [...prev, userMsg]);
        setIsLoading(true);

        try {
            // Check for API key
            const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

            if (!apiKey) {
                // Fallback: simulate AI response
                await new Promise(resolve => setTimeout(resolve, 1200));
                const fallbackResponse = generateFallbackResponse(userMessage);
                const assistantMsg: ChatMessage = {
                    role: 'assistant',
                    content: fallbackResponse,
                    timestamp: Date.now(),
                };
                setMessages(prev => [...prev, assistantMsg]);
                setIsLoading(false);
                return;
            }

            abortControllerRef.current = new AbortController();

            const { GoogleGenerativeAI } = await import('@google/generative-ai');
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({ model: 'models/gemini-2.5-flash' });

            // Gemini SDK requires history to start with a 'user' message and alternate roles.
            const rawHistory = messages.map(m => ({
                role: m.role === 'assistant' ? 'model' as const : 'user' as const,
                parts: [{ text: m.content }],
            }));

            const chatHistory = [];
            let lastRole = null;
            for (const msg of rawHistory) {
                // Must start with user
                if (chatHistory.length === 0 && msg.role !== 'user') continue;
                // Avoid consecutive identical roles
                if (msg.role === lastRole) continue;
                chatHistory.push(msg);
                lastRole = msg.role;
            }

            console.log('Messages state:', messages);
            console.log('Filtered history for Gemini:', chatHistory);

            const chat = model.startChat({
                history: chatHistory,
                systemInstruction: {
                    role: 'system',
                    parts: [{ text: SYSTEM_PROMPT }],
                },
            });

            const result = await chat.sendMessage(userMessage);
            const text = result.response.text();

            const assistantMsg: ChatMessage = {
                role: 'assistant',
                content: text,
                timestamp: Date.now(),
            };

            setMessages(prev => [...prev, assistantMsg]);
        } catch (error) {
            console.error('Chat error:', error);
            const errorMsg: ChatMessage = {
                role: 'assistant',
                content: 'Mi scuso, ho avuto un problema tecnico. Riprova tra un momento oppure contattaci direttamente a hello@fibnyx.ai 📧',
                timestamp: Date.now(),
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsLoading(false);
        }
    }, [isLoading, messages]);

    const clearHistory = useCallback(() => {
        const welcomeMsg: ChatMessage = {
            role: 'assistant',
            content: t.chat.welcome,
            timestamp: Date.now(),
        };
        setMessages([welcomeMsg]);
        localStorage.removeItem(STORAGE_KEY);
    }, [t.chat.welcome]);

    return { messages, isLoading, sendMessage, clearHistory };
}

function generateFallbackResponse(userMessage: string): string {
    const msg = userMessage.toLowerCase();
    const calendlyLink = 'https://calendly.com/fibnyx-info/30min';

    if (msg.includes('prezzo') || msg.includes('costo') || msg.includes('quanto')) {
        return `Ogni progetto FibNyx è unico e costruito su misura per massimizzare il tuo ROI. 💰 Per darti un'idea precisa dell'investimento, avrei bisogno di capire meglio la tua realtà. Come si chiama la tua azienda e di cosa vi occupate nello specifico? Se vuoi, possiamo anche parlarne in una consulenza gratuita: ${calendlyLink}`;
    }

    if (msg.includes('cosa fai') || msg.includes('servizi') || msg.includes('fare')) {
        return 'In FibNyx trasformiamo processi lenti e manuali in sistemi automatici ad alta efficienza tramite AI e Web App su misura. 🚀 Per capire quale delle nostre soluzioni fa per te, mi diresti il nome della tua attività e in che settore operi?';
    }

    if (msg.includes('call') || msg.includes('appuntamento') || msg.includes('parlare') || msg.includes('prenota')) {
        return `Ottima idea! 📅 Parlare direttamente con Giacomo è il modo più veloce per analizzare il tuo business. Puoi prenotare la tua consulenza gratuita qui: ${calendlyLink}. Mi diresti comunque il nome della tua azienda così arriviamo preparati?`;
    }

    return 'Ciao! 👋 Sono qui per capire come FibNyx può far fare un salto di qualità al tuo business tramite l\'AI. Per iniziare, mi racconteresti come si chiama la tua attività, di cosa vi occupate e dove vi trovate?';
}
