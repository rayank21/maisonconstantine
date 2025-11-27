import React, { useState } from 'react';
import { ViewState } from '@/types';

interface AuthProps {
    setView: (view: ViewState) => void;
}

export const Auth = ({ setView }: AuthProps) => {
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    // Simulate network request
    setTimeout(() => {
        localStorage.setItem('mc_auth', 'true');
        setLoading(false);
        setView('dashboard');
    }, 1500);
  };

  return (
    <div className="h-screen flex items-center justify-center px-6 relative z-10">
      <div className="w-full max-w-md bg-brand-charcoal/50 backdrop-blur-xl border border-brand-white/10 p-8 md:p-12">
        <h2 className="text-3xl font-serif text-brand-white mb-2 text-center">MAISON CONSTANTINE</h2>
        <p className="text-brand-beige/50 text-center mb-8 text-sm tracking-widest uppercase">Accès Membre</p>
        
        <div className="space-y-6">
            <div>
                <label className="block text-xs uppercase tracking-widest text-brand-white/50 mb-2">Email</label>
                <input 
                    type="email" 
                    className="w-full bg-brand-black/50 border border-brand-white/10 p-3 text-brand-white focus:border-brand-gold outline-none transition-colors"
                    placeholder="admin@maisonconstantine.com"
                />
            </div>
            <div>
                <label className="block text-xs uppercase tracking-widest text-brand-white/50 mb-2">Mot de passe</label>
                <input 
                    type="password" 
                    className="w-full bg-brand-black/50 border border-brand-white/10 p-3 text-brand-white focus:border-brand-gold outline-none transition-colors"
                    placeholder="••••••••"
                />
            </div>

            <button 
                onClick={handleLogin}
                disabled={loading}
                className="w-full bg-brand-gold text-brand-black py-4 font-bold uppercase tracking-widest hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-wait"
            >
                {loading ? 'Connexion...' : 'Se Connecter'}
            </button>

            <p className="text-center text-xs text-brand-white/30 mt-4">
                Accès réservé aux administrateurs et membres fondateurs.
            </p>
        </div>
      </div>
    </div>
  );
};
