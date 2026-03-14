import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Trash2, Bot } from 'lucide-react';
import { useGeminiChat } from '../hooks/useGeminiChat';
import { useLanguage } from '../LanguageContext';

interface ChatBubbleProps {
  isOpenExternal?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ isOpenExternal, onOpenChange }) => {
  const { t } = useLanguage();
  const [isOpenInternal, setIsOpenInternal] = useState(false);

  const isOpen = isOpenExternal ?? isOpenInternal;
  const setIsOpen = (open: boolean) => {
    setIsOpenInternal(open);
    onOpenChange?.(open);
  };

  const { messages, isLoading, sendMessage, clearHistory } = useGeminiChat();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Window */}
      <div className={`chat-window ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="chat-header">
          <div className="chat-header-info">
            <div className="chat-avatar">
              <Bot size={20} />
            </div>
            <div>
              <span className="chat-title">{t.chat.title}</span>
              <span className="chat-status">{isLoading ? t.chat.typing : t.chat.subtitle}</span>
            </div>
          </div>
          <div className="chat-header-actions">
            <button className="chat-action-btn" onClick={clearHistory} aria-label="Clear chat">
              <Trash2 size={16} />
            </button>
            <button className="chat-action-btn" onClick={() => setIsOpen(false)} aria-label="Close chat">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div
          className="chat-messages"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          {messages.map((msg, i) => (
            <div key={i} className={`chat-msg ${msg.role}`}>
              {msg.role === 'assistant' && (
                <div className="msg-avatar">
                  <Bot size={14} />
                </div>
              )}
              <div className="msg-bubble">
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="chat-msg assistant">
              <div className="msg-avatar">
                <Bot size={14} />
              </div>
              <div className="msg-bubble typing">
                <span className="dot" /><span className="dot" /><span className="dot" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="chat-input-area">
          <input
            ref={inputRef}
            type="text"
            placeholder={t.chat.placeholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          <button className="chat-send-btn" onClick={handleSend} disabled={isLoading || !input.trim()}>
            <Send size={16} />
          </button>
        </div>
      </div>

      {/* Floating Bubble */}
      <button
        className={`chat-bubble ${isOpen ? 'hidden' : ''}`}
        onClick={() => setIsOpen(true)}
        aria-label="Open AI Chat"
      >
        <div className="bubble-icon">
          <MessageCircle size={24} />
        </div>
        <div className="bubble-pulse" />
      </button>

      <style>{`
        .chat-bubble {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 1001;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: var(--gradient-primary);
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow-glow-md);
          transition: all 0.4s var(--ease-out-expo);
        }

        .chat-bubble:hover {
          transform: scale(1.1);
          box-shadow: var(--shadow-glow-lg);
        }

        .chat-bubble.hidden {
          transform: scale(0);
          opacity: 0;
          pointer-events: none;
        }

        .bubble-icon {
          color: white;
          position: relative;
          z-index: 2;
        }

        .bubble-pulse {
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          border: 2px solid var(--neon-purple);
          animation: pulse-glow 3s ease-in-out infinite;
        }

        .chat-window {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 1002;
          width: 400px;
          max-height: 600px;
          background: var(--bg-dark);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-xl);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
          transform: scale(0.8) translateY(20px);
          opacity: 0;
          pointer-events: none;
          transition: all 0.4s var(--ease-out-expo);
          transform-origin: bottom right;
        }

        .chat-window.open {
          transform: scale(1) translateY(0);
          opacity: 1;
          pointer-events: all;
        }

        .chat-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.25rem;
          background: rgba(255, 255, 255, 0.03);
          border-bottom: 1px solid var(--border-subtle);
        }

        .chat-header-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .chat-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--gradient-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .chat-title {
          display: block;
          font-weight: 700;
          font-size: 0.9rem;
          color: var(--text-white);
          font-family: 'Outfit', sans-serif;
        }

        .chat-status {
          display: block;
          font-size: 0.7rem;
          color: var(--neon-cyan);
        }

        .chat-header-actions {
          display: flex;
          gap: 0.25rem;
        }

        .chat-action-btn {
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 0.4rem;
          border-radius: var(--radius-sm);
          transition: all var(--transition-fast);
        }

        .chat-action-btn:hover {
          color: var(--text-white);
          background: rgba(255, 255, 255, 0.05);
        }

        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          min-height: 300px;
          max-height: 400px;
        }

        .chat-messages::-webkit-scrollbar {
          width: 4px;
        }
        .chat-messages::-webkit-scrollbar-thumb {
          background: var(--border-light);
          border-radius: 2px;
        }

        .chat-msg {
          display: flex;
          gap: 0.5rem;
          align-items: flex-end;
          animation: fadeInUp 0.3s var(--ease-out-expo);
        }

        .chat-msg.user {
          flex-direction: row-reverse;
        }

        .msg-avatar {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: var(--gradient-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }

        .msg-bubble {
          max-width: 80%;
          padding: 0.75rem 1rem;
          border-radius: 16px;
          font-size: 0.85rem;
          line-height: 1.5;
          word-wrap: break-word;
        }

        .chat-msg.assistant .msg-bubble {
          background: rgba(255, 255, 255, 0.06);
          color: var(--text-light);
          border-bottom-left-radius: 4px;
        }

        .chat-msg.user .msg-bubble {
          background: var(--gradient-primary);
          color: white;
          border-bottom-right-radius: 4px;
        }

        .msg-bubble.typing {
          display: flex;
          gap: 4px;
          padding: 0.75rem 1.25rem;
        }

        .dot {
          width: 6px;
          height: 6px;
          background: var(--text-muted);
          border-radius: 50%;
          animation: bounce 1.4s ease-in-out infinite;
        }

        .dot:nth-child(2) { animation-delay: 0.16s; }
        .dot:nth-child(3) { animation-delay: 0.32s; }

        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }

        .chat-input-area {
          display: flex;
          gap: 0.5rem;
          padding: 1rem;
          border-top: 1px solid var(--border-subtle);
          background: rgba(255, 255, 255, 0.02);
        }

        .chat-input-area input {
          flex: 1;
          padding: 0.7rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-subtle);
          border-radius: var(--radius-full);
          color: var(--text-white);
          font-family: 'Inter', sans-serif;
          font-size: 0.85rem;
          transition: border-color var(--transition-fast);
        }

        .chat-input-area input:focus {
          outline: none;
          border-color: var(--neon-purple);
        }

        .chat-send-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--gradient-primary);
          border: none;
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all var(--transition-fast);
          flex-shrink: 0;
        }

        .chat-send-btn:hover:not(:disabled) {
          transform: scale(1.1);
          box-shadow: var(--shadow-glow-sm);
        }

        .chat-send-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        @media (max-width: 480px) {
          .chat-window {
            bottom: 0;
            right: 0;
            left: 0;
            width: 100%;
            max-height: 100vh;
            border-radius: var(--radius-xl) var(--radius-xl) 0 0;
            transform-origin: bottom center;
          }

          .chat-bubble {
            bottom: 1.25rem;
            right: 1.25rem;
          }
        }
      `}</style>
    </>
  );
};

export default ChatBubble;
