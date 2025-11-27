import React, { useState, useEffect, useRef } from 'react';
import { ViewState } from '@/types';
import { ArrowRight, ShieldCheck, Leaf } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { motion, AnimatePresence } from 'framer-motion';
import { MagneticButton } from '@/components/MagneticButton';
import { Logo } from '@/components/Logo';

interface LandingProps {
    setView: (view: ViewState) => void;
    setSelectedProductId: (id: string) => void;
}

// --- 2. ANIMATION UTILS (Framer Motion) ---
const revealVar = {
    hidden: { filter: 'blur(10px)', y: 20, opacity: 0 },
    visible: {
        filter: 'blur(0px)',
        y: 0,
        opacity: 1,
        transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }
    }
};

const staggerContainer = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.1 }
    }
};

const ParallaxImage = ({ src, alt, className }: { src: string, alt: string, className?: string }) => {
    return (
        <div className={`overflow-hidden ${className}`}>
            <motion.img
                src={src}
                alt={alt}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.7 }}
            />
        </div>
    );
};

const TextReveal = ({ text, className = "" }: { text: string, className?: string }) => {
    return (
        <motion.div
            className={`overflow-hidden ${className}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={staggerContainer}
        >
            {text.split(" ").map((word, i) => (
                <span key={i} className="inline-block mr-[0.2em] overflow-hidden">
                    <motion.span
                        className="inline-block"
                        variants={{
                            hidden: { y: "100%" },
                            visible: { y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
                        }}
                    >
                        {word}
                    </motion.span>
                </span>
            ))}
        </motion.div>
    );
};

// --- 4. FLASHLIGHT & BUTTONS ---
const FlashlightCard = ({ children, onClick, className = "" }: { children: React.ReactNode, onClick?: () => void, className?: string }) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: -500, y: -500 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;
        const rect = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        setOpacity(1);
    };

    return (
        <motion.div
            ref={divRef}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setOpacity(0)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVar}
            className={`relative overflow-hidden ${className}`}
        >
            <div
                className="pointer-events-none absolute -inset-px transition duration-300 z-20"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(192,192,192,0.15), transparent 40%)`
                }}
            />
            {children}
        </motion.div>
    );
};

const BorderBeamButton = ({ children, onClick, className = "" }: any) => (
    <button
        onClick={onClick}
        className={`group relative overflow-hidden rounded-full border border-white/20 bg-black/50 px-8 py-4 transition-transform active:scale-95 hover:scale-105 ${className}`}
    >
        <span className="relative z-10 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-white group-hover:text-brand-gold transition-colors">
            {children}
        </span>
        <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-0 left-0 h-full w-[200%] animate-border-beam bg-gradient-to-r from-transparent via-white/50 to-transparent"
                    style={{ transform: 'skewX(-20deg)' }} />
            </div>
        </div>
    </button>
);

// --- 8. MARQUEE INFINITE ---
const MarqueeLoop = () => (
    <div className="relative flex overflow-hidden w-full bg-brand-black py-8 border-y border-white/5">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-brand-black to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-brand-black to-transparent z-10 pointer-events-none"></div>

        <motion.div
            className="flex whitespace-nowrap gap-16 text-4xl font-serif text-white/20 italic"
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
        >
            {[...Array(10)].map((_, i) => (
                <React.Fragment key={i}>
                    <span>MAISON CONSTANTINE</span>
                    <span className="text-brand-gold">•</span>
                    <span>PREMIUM HERITAGE</span>
                    <span className="text-brand-gold">•</span>
                </React.Fragment>
            ))}
        </motion.div>
    </div>
);

export const Landing = ({ setView, setSelectedProductId }: LandingProps) => {
    const [introDone, setIntroDone] = useState(false);

    // Grid Selection: Use Product 1 (Tshirt Noir), 3 (Pull), 4 (Hoodie) to avoid duplicates and show new items
    const gridSelection = [PRODUCTS[0], PRODUCTS[2], PRODUCTS[3]];

    useEffect(() => {
        setTimeout(() => setIntroDone(true), 2500);
    }, []);

    function handleProductClick(id: string) {
        setSelectedProductId(id);
        setView('product');
    }

    return (
        <div className="relative w-full min-h-screen bg-[#050505] text-[#F5F5F5] overflow-x-hidden selection:bg-brand-gold selection:text-black">

            {/* INTRO SHUTTER */}
            <AnimatePresence>
                {!introDone && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none">
                        <div className="absolute inset-0 flex">
                            {[0, 1, 2, 3, 4].map(i => (
                                <motion.div
                                    key={i}
                                    className="h-full flex-1 bg-brand-black border-r border-white/5"
                                    initial={{ scaleY: 1 }}
                                    exit={{ scaleY: 0, transition: { duration: 0.8, delay: 0.5 + i * 0.1, ease: [0.77, 0, 0.175, 1] } }}
                                    style={{ originY: 0 }}
                                />
                            ))}
                        </div>

                        <motion.div
                            className="relative z-10"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.2, transition: { duration: 0.5 } }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <Logo className="scale-150" />
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* HERO SECTION */}
            <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
                {/* Video Background Placeholder instead of 3D */}
                <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-[#050505] via-[#1a1a1a] to-[#050505]">
                    <div className="absolute inset-0 opacity-20 bg-[url('/noise.png')] mix-blend-overlay"></div>
                </div>

                <div className="relative z-10 text-center px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2, duration: 1 }}
                    >
                        <h2 className="text-xs md:text-sm font-mono text-brand-gold uppercase tracking-[0.5em] mb-6">
                            Collection 2026
                        </h2>
                    </motion.div>

                    <TextReveal
                        text="L'ART DE VIVRE"
                        className="text-6xl md:text-9xl font-serif leading-none mb-12 text-white mix-blend-difference"
                    />

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2.5, duration: 1 }}
                    >
                        <MagneticButton onClick={() => setView('collection')}>
                            <BorderBeamButton>
                                Découvrir la Collection <ArrowRight size={14} />
                            </BorderBeamButton>
                        </MagneticButton>
                    </motion.div>
                </div>
            </section>

            <MarqueeLoop />

            {/* SELECTION (Bento Grid with Liquid Effect) */}
            <section className="py-32 px-6 max-w-[1600px] mx-auto">
                <TextReveal text="LA SÉLECTION" className="text-4xl md:text-6xl font-serif mb-16 text-center justify-center" />

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-10%" }}
                    variants={staggerContainer}
                >
                    {gridSelection.map((product) => (
                        <motion.div key={product.id} variants={revealVar} onClick={() => handleProductClick(product.id)}>
                            <div className="group relative overflow-hidden cursor-pointer">
                                <div className="aspect-[3/4] overflow-hidden bg-[#111] relative rounded-2xl">
                                    {/* Liquid Distortion Effect simulated via scale/opacity here for simplicity without complex shader, real displacement requires heavy WebGL setup or inline SVG trickery which is flaky in React sometimes. We stick to smooth CSS scale + parallax. */}
                                    <ParallaxImage src={product.images[0]} alt={product.name} className="w-full h-full" />

                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>

                                    {/* Hover Reveal Info */}
                                    <div className="absolute bottom-0 left-0 w-full p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] bg-gradient-to-t from-black/80 to-transparent rounded-b-2xl">
                                        <p className="text-white text-sm font-mono">Ajouter au panier +</p>
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-serif text-white group-hover:text-[#D4AF37] transition-colors">{product.name}</h3>
                                        <p className="text-white/40 text-xs uppercase tracking-widest mt-1">{product.category}</p>
                                    </div>
                                    <div className="px-3 py-1 border border-white/10 rounded-full text-xs font-mono text-[#D4AF37]">
                                        {product.price}€
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* BENTO GRID / DNA */}
            <section className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-10%" }}
                    variants={staggerContainer}
                >
                    <motion.div variants={revealVar} className="h-full">
                        <FlashlightCard className="h-full min-h-[320px] bg-white/5 backdrop-blur-sm border border-white/10 p-8 flex flex-col items-center justify-center text-center group rounded-2xl hover:bg-white/10 transition-colors duration-500">
                            <img src="/images/logo-fox.png" className="w-24 opacity-20 mb-6 group-hover:opacity-40 transition-opacity duration-500" alt="DNA" />
                            <h3 className="text-2xl font-serif mb-4 text-white/90">Notre Héritage</h3>
                            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
                                L'âme de Constantine tissée dans chaque fibre. Une élégance intemporelle pour le monde moderne.
                            </p>
                        </FlashlightCard>
                    </motion.div>

                    <motion.div variants={revealVar} className="h-full">
                        <FlashlightCard className="h-full min-h-[320px] bg-white/5 backdrop-blur-sm border border-white/10 p-8 flex flex-col items-center justify-center text-center group rounded-2xl hover:bg-white/10 transition-colors duration-500">
                            <ShieldCheck size={40} className="mb-6 text-brand-gold/80 group-hover:scale-110 transition-transform duration-500" />
                            <h3 className="text-2xl font-serif mb-4 text-white/90">Garantie à Vie</h3>
                            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
                                Nous réparons gratuitement toute usure prématurée. Une promesse de qualité absolue.
                            </p>
                        </FlashlightCard>
                    </motion.div>

                    <motion.div variants={revealVar} className="h-full">
                        <FlashlightCard className="h-full min-h-[320px] bg-white/5 backdrop-blur-sm border border-white/10 p-8 flex flex-col items-center justify-center text-center group rounded-2xl hover:bg-white/10 transition-colors duration-500">
                            <Leaf size={40} className="mb-6 text-brand-gold/80 group-hover:scale-110 transition-transform duration-500" />
                            <h3 className="text-2xl font-serif mb-4 text-white/90">100% Bio & Éthique</h3>
                            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
                                Coton Supima certifié, cultivé sans produits chimiques. Respect de la terre et des hommes.
                            </p>
                        </FlashlightCard>
                    </motion.div>
                </motion.div>
            </section>

        </div>
    );
};
