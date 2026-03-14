import React, { useEffect, useRef, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import ServiceDetailPage from './components/ServiceDetailPage';
import AIBusinessSection from './components/AIBusinessSection';
import AIBusinessPage from './components/AIBusinessPage';
import About from './components/About';
import Contact from './components/Contact';
import ChatBubble from './components/ChatBubble';
import { LanguageProvider } from './LanguageContext';
import MagneticCursor from './components/MagneticCursor';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import CookiePolicy from './components/CookiePolicy';
import CookieConsent from './components/CookieConsent';

const sections = ['home', 'services', 'ai-business', 'about', 'contact'];

const App: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [showAIDetail, setShowAIDetail] = useState(false);
    const [activeService, setActiveService] = useState<number | null>(null);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [legalPage, setLegalPage] = useState<'privacy' | 'terms' | 'cookies' | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Track active section based on scroll position for Header indicator
    useEffect(() => {
        const handleScroll = () => {
            const scrollPos = window.scrollY + 200;
            sections.forEach((id, index) => {
                const element = document.getElementById(id);
                if (element &&
                    scrollPos >= element.offsetTop &&
                    scrollPos < element.offsetTop + element.offsetHeight) {
                    setActiveIndex(index);
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const gotoSection = (index: number) => {
        const id = sections[index];
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActiveIndex(index);
        }
    };

    useEffect(() => {
        const handlePopState = () => {
            if (activeService !== null) {
                setActiveService(null);
            } else if (showAIDetail) {
                setShowAIDetail(false);
            } else if (legalPage !== null) {
                setLegalPage(null);
            }
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [activeService, showAIDetail, legalPage]);

    const openServiceDetail = (index: number) => {
        window.history.pushState({ type: 'service', index }, '');
        setActiveService(index);
    };

    const openAIDetail = () => {
        window.history.pushState({ type: 'ai' }, '');
        setShowAIDetail(true);
    };

    const openLegal = (page: 'privacy' | 'terms' | 'cookies') => {
        window.history.pushState({ type: 'legal', page }, '');
        setLegalPage(page);
    };

    return (
        <LanguageProvider>
            <div className="app-container" ref={containerRef}>
                <MagneticCursor />
                <Header
                    scrolled={activeIndex > 0}
                    onSectionChange={(id: string) => {
                        const idx = sections.indexOf(id.replace('#', ''));
                        if (idx !== -1) gotoSection(idx);
                    }}
                    activeIndex={activeIndex}
                    sections={sections}
                />
                <main>
                    <Hero />
                    <Services onSelectService={openServiceDetail} />
                    <AIBusinessSection onOpenDetail={openAIDetail} />
                    <About />
                    <Contact
                        onOpenChat={() => setIsChatOpen(true)}
                        onLegalClick={openLegal}
                    />
                    {/* Pass legal click handler through a wrapped component or similar,
                        or just let Footer handle its own positioning in Contact */}
                </main>
                {showAIDetail && <AIBusinessPage onClose={() => window.history.back()} />}
                {activeService !== null && (
                    <ServiceDetailPage
                        serviceIndex={activeService}
                        onClose={() => window.history.back()}
                    />
                )}
                {legalPage === 'privacy' && <PrivacyPolicy onClose={() => window.history.back()} />}
                {legalPage === 'terms' && <TermsOfService onClose={() => window.history.back()} />}
                {legalPage === 'cookies' && <CookiePolicy onClose={() => window.history.back()} />}

                <ChatBubble isOpenExternal={isChatOpen} onOpenChange={setIsChatOpen} />
                <CookieConsent />
            </div>
        </LanguageProvider>
    );
};

export default App;
