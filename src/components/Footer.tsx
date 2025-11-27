import { Logo } from './Logo';
import { MagneticButton } from './MagneticButton';
import { ArrowRight, Instagram } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-[#050505] text-white pt-24 pb-12 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24">
                    {/* Brand Column */}
                    <div className="md:col-span-4 space-y-8">
                        <Logo className="scale-100 origin-left" />
                        <p className="text-white/40 text-sm leading-relaxed max-w-xs">
                            L'élégance intemporelle de Constantine, réinventée pour le monde moderne.
                        </p>
                        <div className="flex gap-6">
                            <a href="https://www.instagram.com/maisonconstantine25/" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-brand-gold transition-colors">
                                <Instagram size={20} />
                            </a>
                            <a href="https://www.tiktok.com/@maisonconstantine25dz" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-brand-gold transition-colors">
                                {/* Custom TikTok Icon since Lucide might not have it */}
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className="md:col-span-2 md:col-start-6 space-y-6">
                        <h4 className="font-serif text-lg">Collection</h4>
                        <ul className="space-y-4 text-sm text-white/40">
                            <li><a href="#" className="hover:text-white transition-colors">Nouveautés</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Best-sellers</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Accessoires</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Archives</a></li>
                        </ul>
                    </div>

                    <div className="md:col-span-2 space-y-6">
                        <h4 className="font-serif text-lg">Maison</h4>
                        <ul className="space-y-4 text-sm text-white/40">
                            <li><a href="#" className="hover:text-white transition-colors">Notre Histoire</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Ateliers</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Carrières</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Presse</a></li>
                        </ul>
                    </div>

                    <div className="md:col-span-2 space-y-6">
                        <h4 className="font-serif text-lg">Légal</h4>
                        <ul className="space-y-4 text-sm text-white/40">
                            <li><a href="#" className="hover:text-white transition-colors">CGV</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Confidentialité</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Retours</a></li>
                            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                        </ul>
                    </div>
                </div>

                {/* Newsletter Section */}
                <div className="border-t border-white/5 pt-12 pb-12 mb-12">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                        <div className="max-w-md">
                            <h3 className="text-2xl font-serif mb-4">Newsletter</h3>
                            <p className="text-white/40 text-sm mb-6">
                                Inscrivez-vous pour recevoir nos actualités et invitations exclusives.
                            </p>
                            <div className="flex gap-4">
                                <input
                                    type="email"
                                    placeholder="votre@email.com"
                                    className="bg-transparent border-b border-white/20 py-2 w-full focus:outline-none focus:border-brand-gold transition-colors text-white placeholder:text-white/20"
                                />
                            </div>
                        </div>
                        <MagneticButton>
                            <button className="px-8 py-3 bg-white text-black font-mono text-xs uppercase tracking-widest hover:bg-brand-gold transition-colors">
                                S'inscrire
                            </button>
                        </MagneticButton>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-[10px] text-white/20 uppercase tracking-widest">
                    <p>© 2026 Maison Constantine. Tous droits réservés.</p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <span>Visa</span>
                        <span>Mastercard</span>
                        <span>Amex</span>
                        <span>PayPal</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};
