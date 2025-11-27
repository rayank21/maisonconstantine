import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, ChevronRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
    id: string;
    text: string;
    sender: 'bot' | 'user';
    options?: { label: string; action: string }[];
}

const INITIAL_MESSAGES: Message[] = [
    {
        id: '1',
        text: "Bienvenue chez Maison Constantine. Je suis votre concierge digital. Comment puis-je vous assister aujourd'hui ?",
        sender: 'bot',
        options: [
            { label: "L'Histoire de la Maison", action: 'history' },
            { label: "Livraison & Retours", action: 'shipping' },
            { label: "Guide des Tailles", action: 'sizing' },
            { label: "Parler à un humain", action: 'contact' }
        ]
    }
];

const RESPONSES: Record<string, { text: string; options?: { label: string; action: string }[] }> = {
    history: {
        text: "Maison Constantine est née de la fusion entre l'héritage millénaire de la ville des ponts et le streetwear contemporain. Chaque pièce est conçue comme un pont entre deux mondes, célébrant une élégance intemporelle.",
        options: [
            { label: "Voir la Collection", action: 'collection_link' },
            { label: "Autre question", action: 'reset' }
        ]
    },
    shipping: {
        text: "Nous expédions chaque commande sous 24h avec le plus grand soin. La livraison est offerte pour nos membres et prend généralement 2 à 4 jours ouvrés en Europe.",
        options: [
            { label: "Suivre ma commande", action: 'track' },
            { label: "Autre question", action: 'reset' }
        ]
    },
    sizing: {
        text: "Nos coupes sont 'oversized' pour un confort absolu et une silhouette signature. Nous vous recommandons votre taille habituelle pour le look Maison Constantine, ou une taille en dessous pour un fit plus ajusté.",
        options: [
            { label: "Voir le guide complet", action: 'size_guide' },
            { label: "Autre question", action: 'reset' }
        ]
    },
    contact: {
        text: "Notre service client est disponible pour vous. Vous pouvez nous écrire directement à contact@maisonconstantine.com.",
        options: [
            { label: "Copier l'email", action: 'copy_email' },
            { label: "Autre question", action: 'reset' }
        ]
    },
    track: {
        text: "Pour suivre votre commande, veuillez vous connecter à votre espace membre via l'icône utilisateur dans le menu.",
        options: [{ label: "Retour au menu", action: 'reset' }]
    },
    size_guide: {
        text: "Vous trouverez un guide détaillé sur chaque page produit, juste au-dessus de la sélection des tailles.",
        options: [{ label: "Retour au menu", action: 'reset' }]
    },
    copy_email: {
        text: "L'adresse contact@maisonconstantine.com a été copiée dans votre presse-papier.",
        options: [{ label: "Retour au menu", action: 'reset' }]
    },
    collection_link: {
        text: "Je vous invite à explorer notre collection actuelle via le menu principal.",
        options: [{ label: "Retour au menu", action: 'reset' }]
    }
};

export const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping, isOpen]);

    const handleOptionClick = (label: string, action: string) => {
        // Add user message
        const userMsg: Message = {
            id: Date.now().toString(),
            text: label,
            sender: 'user'
        };
        setMessages(prev => [...prev, userMsg]);
        setIsTyping(true);

        // Simulate bot thinking
        setTimeout(() => {
            if (action === 'reset') {
                setMessages(prev => [...prev, { ...INITIAL_MESSAGES[0], id: Date.now().toString() }]);
            } else if (action === 'copy_email') {
                navigator.clipboard.writeText('contact@maisonconstantine.com');
                const response = RESPONSES[action];
                setMessages(prev => [...prev, { id: Date.now().toString(), text: response.text, sender: 'bot', options: response.options }]);
            } else {
                const response = RESPONSES[action];
                if (response) {
                    setMessages(prev => [...prev, { id: Date.now().toString(), text: response.text, sender: 'bot', options: response.options }]);
                }
            }
            setIsTyping(false);
        }, 1000);
    };

    return (
        <>
            {/* Toggle Button */}
            <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-8 right-8 z-50 p-4 rounded-full bg-[#D4AF37] text-black shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:scale-110 transition-transform duration-300 ${isOpen ? 'hidden' : 'flex'}`}
            >
                <MessageSquare size={24} />
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.9 }}
                        className="fixed bottom-8 right-8 z-50 w-[350px] md:w-[400px] h-[600px] max-h-[80vh] bg-[#050505]/95 backdrop-blur-xl border border-[#D4AF37]/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-gradient-to-r from-[#D4AF37]/10 to-transparent">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                                <span className="font-serif text-[#D4AF37] tracking-widest text-sm">CONCIERGE</span>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-white/50 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                            {messages.map((msg) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={msg.id}
                                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                                >
                                    <div
                                        className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${msg.sender === 'user'
                                                ? 'bg-[#D4AF37] text-black rounded-tr-none'
                                                : 'bg-white/5 text-white/90 border border-white/10 rounded-tl-none'
                                            }`}
                                    >
                                        {msg.text}
                                    </div>

                                    {/* Options (only for bot messages) */}
                                    {msg.sender === 'bot' && msg.options && (
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {msg.options.map((opt, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => handleOptionClick(opt.label, opt.action)}
                                                    className="text-xs border border-[#D4AF37]/30 text-[#D4AF37] px-4 py-2 rounded-full hover:bg-[#D4AF37] hover:text-black transition-all duration-300 flex items-center gap-1"
                                                >
                                                    {opt.label} <ChevronRight size={12} />
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            ))}

                            {isTyping && (
                                <div className="flex items-center gap-1 ml-4">
                                    <span className="w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <span className="w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                    <span className="w-1.5 h-1.5 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area (Visual only for now as we use options) */}
                        <div className="p-4 border-t border-white/10 bg-black/20">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Sélectionnez une option..."
                                    disabled
                                    className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-4 text-sm text-white/50 cursor-not-allowed"
                                />
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#D4AF37]/50">
                                    <Sparkles size={16} />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
