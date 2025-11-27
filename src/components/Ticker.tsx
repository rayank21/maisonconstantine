import React from 'react';
import { motion } from 'framer-motion';

export const Ticker = () => {
    return (
        <div className="bg-brand-gold text-black py-2 overflow-hidden relative z-[60]">
            <div className="flex whitespace-nowrap animate-marquee">
                {[...Array(10)].map((_, i) => (
                    <span key={i} className="mx-8 text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-4">
                        ✨ Offre Exclusive Collaborateurs NDRC : -20% avec le code <span className="bg-black text-brand-gold px-2 py-0.5 rounded-sm">NDRC20</span>
                    </span>
                ))}
            </div>
        </div>
    );
};
