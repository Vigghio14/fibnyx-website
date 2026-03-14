import React, { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import { translations } from './i18n';
import type { Language, Translations } from './i18n';

interface LanguageContextType {
    language: Language;
    t: Translations;
    toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('it');

    const toggleLanguage = useCallback(() => {
        setLanguage(prev => prev === 'it' ? 'en' : 'it');
    }, []);

    const t = translations[language];

    return (
        <LanguageContext.Provider value={{ language, t, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (!context) throw new Error('useLanguage must be used within LanguageProvider');
    return context;
};
