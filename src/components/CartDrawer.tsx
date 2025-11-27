import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import emailjs from '@emailjs/browser';

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    cartItems: { productId: string; size: string; quantity: number }[];
    removeFromCart: (index: number) => void;
}

export const CartDrawer = ({ isOpen, onClose, cartItems, removeFromCart }: CartDrawerProps) => {
    const [email, setEmail] = React.useState('');
    const [promoCode, setPromoCode] = React.useState('');
    const [discount, setDiscount] = React.useState(0);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [isSuccess, setIsSuccess] = React.useState(false);

    // Calculate subtotal
    const subtotal = cartItems.reduce((acc, item) => {
        const product = PRODUCTS.find(p => p.id === item.productId);
        return acc + (product ? product.price * item.quantity : 0);
    }, 0);

    const handleApplyPromo = () => {
        const code = promoCode.toUpperCase();
        if (code === 'NDRC20') {
            setDiscount(0.20); // 20%
        } else if (code === 'INSTANTANIMAL') {
            setDiscount(0.99); // 99%
        } else {
            setDiscount(0);
            alert("Code promo invalide");
        }
    };

    const total = subtotal * (1 - discount);

    const handleQuoteRequest = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // --- CONFIGURATION EMAILJS ---
        const SERVICE_ID = 'service_irs94g9';
        const TEMPLATE_ID = 'template_umjgshd';
        const PUBLIC_KEY = '5NVIBX_c7z28usX2A';

        // Prepare template params
        const templateParams = {
            to_email: email,
            total: `${total.toFixed(2)}€`,
            subtotal: `${subtotal}€`,
            discount: discount > 0 ? `- ${(subtotal * discount).toFixed(2)}€ (Code: ${promoCode})` : 'Aucune remise',
            cart_details: cartItems.map(item => {
                const p = PRODUCTS.find(p => p.id === item.productId);
                return `${p?.name} (${item.size}) x${item.quantity} - ${p?.price}€`;
            }).join('\n'),
            my_email: 'rayandu2121@gmail.com'
        };

        try {
            await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
            setIsSuccess(true);
        } catch (error) {
            console.error('Erreur envoi email:', error);
            alert("Une erreur est survenue lors de l'envoi. Vérifiez la console.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetState = () => {
        setIsSuccess(false);
        setEmail('');
        setPromoCode('');
        setDiscount(0);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-[#0a0a0a] border-l border-white/10 z-[101] flex flex-col shadow-2xl"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/5 flex justify-between items-center mt-8">
                            <h2 className="text-2xl font-serif text-white flex items-center gap-3">
                                <ShoppingBag size={20} className="text-brand-gold" />
                                Panier <span className="text-sm font-mono text-white/40">({cartItems.length})</span>
                            </h2>
                            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/60 hover:text-white">
                                <X size={24} />
                            </button>
                        </div>

                        {/* Items List */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {cartItems.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                                    <ShoppingBag size={48} className="mb-4" />
                                    <p className="font-serif text-lg">Votre panier est vide</p>
                                    <button onClick={onClose} className="mt-4 text-xs uppercase tracking-widest border-b border-white/20 pb-1 hover:text-brand-gold hover:border-brand-gold transition-colors">
                                        Continuer mes achats
                                    </button>
                                </div>
                            ) : (
                                cartItems.map((item, index) => {
                                    const product = PRODUCTS.find(p => p.id === item.productId);
                                    if (!product) return null;

                                    return (
                                        <motion.div
                                            layout
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            key={`${item.productId}-${item.size}-${index}`}
                                            className="flex gap-4 bg-white/5 p-4 rounded-lg border border-white/5"
                                        >
                                            <div className="w-20 h-24 bg-[#111] rounded-md overflow-hidden shrink-0">
                                                <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 flex flex-col justify-between">
                                                <div>
                                                    <div className="flex justify-between items-start">
                                                        <h3 className="font-serif text-white text-lg leading-none">{product.name}</h3>
                                                        <span className="font-mono text-brand-gold text-sm">{product.price}€</span>
                                                    </div>
                                                    <p className="text-white/40 text-xs uppercase tracking-widest mt-2">{product.category} — {item.size}</p>
                                                </div>
                                                <div className="flex justify-between items-center mt-4">
                                                    <div className="flex items-center gap-3 border border-white/10 rounded-full px-2 py-1">
                                                        <button className="text-white/40 hover:text-white px-1">-</button>
                                                        <span className="text-xs font-mono w-4 text-center">{item.quantity}</span>
                                                        <button className="text-white/40 hover:text-white px-1">+</button>
                                                    </div>
                                                    <button
                                                        onClick={() => removeFromCart(index)}
                                                        className="text-white/20 hover:text-red-400 transition-colors"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })
                            )}
                        </div>

                        {/* Footer / Checkout */}
                        {cartItems.length > 0 && (
                            <div className="p-6 border-t border-white/5 bg-[#050505]">
                                {/* Promo Code */}
                                <div className="mb-6 flex gap-2">
                                    <input
                                        type="text"
                                        value={promoCode}
                                        onChange={(e) => setPromoCode(e.target.value)}
                                        placeholder="Code Promo (ex: NDRC20)"
                                        className="flex-1 bg-white/5 border border-white/10 p-2 text-white text-xs uppercase tracking-widest focus:border-brand-gold outline-none"
                                    />
                                    <button
                                        onClick={handleApplyPromo}
                                        className="bg-white/10 text-white px-4 text-xs uppercase tracking-widest hover:bg-brand-gold hover:text-black transition-colors"
                                    >
                                        Appliquer
                                    </button>
                                </div>

                                <div className="space-y-2 mb-6 text-white">
                                    <div className="flex justify-between items-center text-xs text-white/60 uppercase tracking-widest">
                                        <span>Sous-total</span>
                                        <span>{subtotal}€</span>
                                    </div>
                                    {discount > 0 && (
                                        <div className="flex justify-between items-center text-xs text-brand-gold uppercase tracking-widest">
                                            <span>Remise (-{(discount * 100)}%)</span>
                                            <span>-{(subtotal * discount).toFixed(2)}€</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between items-center pt-4 border-t border-white/10">
                                        <span className="text-sm uppercase tracking-widest text-white">Total</span>
                                        <span className="text-2xl font-serif text-brand-gold">{total.toFixed(2)}€</span>
                                    </div>
                                </div>

                                {isSuccess ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="bg-green-500/10 border border-green-500/20 p-4 rounded-lg text-center"
                                    >
                                        <p className="text-green-400 font-serif text-lg mb-2">Devis Envoyé !</p>
                                        <p className="text-white/60 text-xs mb-4">Un email a été envoyé à {email}.</p>
                                        <button onClick={resetState} className="text-xs uppercase tracking-widest text-white hover:text-brand-gold underline">
                                            Fermer
                                        </button>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleQuoteRequest} className="space-y-4">
                                        <div>
                                            <input
                                                type="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="votre@email.com"
                                                className="w-full bg-white/5 border border-white/10 p-3 text-white text-sm focus:border-brand-gold outline-none transition-colors rounded-sm"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full py-4 bg-brand-gold text-black font-bold uppercase tracking-[0.2em] text-xs hover:bg-white transition-colors flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-wait"
                                        >
                                            {isSubmitting ? 'Envoi en cours...' : 'Finaliser le Devis'}
                                            {!isSubmitting && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
                                        </button>
                                    </form>
                                )}
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
