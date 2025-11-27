import React from 'react';
import { ShoppingBag, Menu, X, Volume2, VolumeX, User } from 'lucide-react';
import { Logo } from './Logo';
import { ViewState } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface NavbarProps {
  view: ViewState;
  setView: (view: ViewState) => void;
  cartCount: number;
  onOpenCart: () => void;
  isMuted?: boolean;
  toggleMute?: () => void;
}

export const Navbar = ({ view, setView, cartCount, onOpenCart, isMuted = false, toggleMute }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 mix-blend-difference text-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left: Logo */}
        <div onClick={() => setView('landing')} className="cursor-pointer">
          <Logo variant="white" className="scale-75 origin-left" />
        </div>

        {/* Center: Desktop Menu */}
        <div className="hidden md:flex items-center gap-12 font-serif text-sm tracking-widest">
          <button onClick={() => setView('collection')} className="hover:text-brand-gold transition-colors uppercase">Collection</button>
          <button onClick={() => setView('about')} className="hover:text-brand-gold transition-colors uppercase">L'Esprit</button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-6">
          {/* Sound Toggle */}
          {toggleMute && (
            <button onClick={toggleMute} className="hover:text-brand-gold transition-colors">
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
          )}

          <button onClick={() => setView('auth')} className="hover:text-brand-gold transition-colors">
            <User size={20} />
          </button>

          <button onClick={onOpenCart} className="relative hover:text-brand-gold transition-colors">
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-brand-gold text-brand-black text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>

          <button className="md:hidden" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu size={24} />
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-brand-black flex flex-col items-center justify-center gap-8 md:hidden"
          >
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-4 right-4 p-4 text-white hover:text-brand-gold transition-colors"
            >
              <X size={32} />
            </button>

            <button onClick={() => { setView('collection'); setIsMobileMenuOpen(false); }} className="text-2xl font-serif text-white hover:text-brand-gold transition-colors uppercase tracking-widest">
              Collection
            </button>
            <button onClick={() => { setView('about'); setIsMobileMenuOpen(false); }} className="text-2xl font-serif text-white hover:text-brand-gold transition-colors uppercase tracking-widest">
              L'Esprit
            </button>
            <button onClick={() => { setView('auth'); setIsMobileMenuOpen(false); }} className="text-2xl font-serif text-white hover:text-brand-gold transition-colors uppercase tracking-widest">
              Compte
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
