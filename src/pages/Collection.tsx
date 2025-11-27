import React, { useState } from 'react';
import { ViewState } from '@/types';
import { PRODUCTS } from '@/data/products';
import { motion } from 'framer-motion';

interface CollectionProps {
    setView: (view: ViewState) => void;
    setSelectedProductId: (id: string) => void;
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.215, 0.61, 0.355, 1] as const // Cubic bezier for smooth reveal
        }
    }
};

export const Collection = ({ setView, setSelectedProductId }: CollectionProps) => {
    const [activeFilter, setActiveFilter] = useState<'all' | 'tshirt' | 'hoodie'>('all');

    const filteredProducts = activeFilter === 'all'
        ? PRODUCTS
        : PRODUCTS.filter(p => p.category === activeFilter);

    const handleProductClick = (id: string) => {
        setSelectedProductId(id);
        setView('product');
    };

    return (
        <div className="pt-32 px-6 pb-24 min-h-screen bg-[#050505]">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 max-w-[1400px] mx-auto border-b border-white/10 pb-8">
                <div>
                    <h2 className="text-5xl md:text-7xl font-serif text-[#F5F5F5] mb-2">LA COLLECTION</h2>
                    <p className="text-[#D4AF37] font-mono text-sm tracking-widest">Automne / Hiver 2026</p>
                </div>

                <div className="flex gap-2 mt-8 md:mt-0">
                    {['all', 'tshirt', 'hoodie'].map(filter => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter as any)}
                            className={`uppercase text-xs font-bold tracking-[0.2em] px-6 py-3 border transition-all rounded-full ${activeFilter === filter
                                ? 'bg-[#F5F5F5] text-[#050505] border-[#F5F5F5]'
                                : 'border-white/20 text-white/50 hover:border-white hover:text-white'
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-x-8 gap-y-24 max-w-[1400px] mx-auto"
            >
                {filteredProducts.map((product, index) => {
                    // Editorial Layout Logic:
                    // Pattern: Large (8 cols) + Small (4 cols) | Small (4 cols) + Small (4 cols) + Small (4 cols)
                    // This creates a nice asymmetrical rhythm
                    const isLarge = index % 5 === 0 || index % 5 === 3;
                    const colSpan = isLarge ? 'lg:col-span-8' : 'lg:col-span-4';

                    return (
                        <motion.div
                            key={product.id}
                            variants={itemVariants}
                            onClick={() => handleProductClick(product.id)}
                            className={`group cursor-pointer ${colSpan}`}
                        >
                            {/* Image Area */}
                            <div className={`relative overflow-hidden bg-[#1A1A1A] mb-6 rounded-2xl ${isLarge ? 'aspect-[16/10]' : 'aspect-[3/4]'}`}>
                                {/* Main Image */}
                                <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                {/* Hover Image (Back View) */}
                                {product.images[1] && (
                                    <img
                                        src={product.images[1]}
                                        alt={`${product.name} back`}
                                        className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                    />
                                )}

                                {!product.inStock && (
                                    <div className="absolute top-4 right-4 bg-black/90 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-2 z-20">
                                        Epuisé
                                    </div>
                                )}
                            </div>

                            {/* Details */}
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-2xl font-serif text-[#F5F5F5] mb-1 group-hover:text-[#D4AF37] transition-colors italic">{product.name}</h3>
                                    <p className="text-white/40 text-xs uppercase tracking-widest font-sans">{product.category}</p>
                                </div>
                                <span className="font-mono text-[#F5F5F5] text-lg">{product.price}€</span>
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>
        </div>
    );
};
