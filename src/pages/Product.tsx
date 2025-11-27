import { useState, useEffect } from 'react';
import { PRODUCTS } from '@/data/products';
import { Product } from '@/types';
import { Clock, Ruler, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';

interface ProductPageProps {
    productId: string | null;
    addToCart: (productId: string, size: string) => void;
}

export const ProductPage = ({ productId, addToCart }: ProductPageProps) => {
    const [product, setProduct] = useState<Product | null>(null);
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [viewers, setViewers] = useState(3);

    useEffect(() => {
        if (productId) {
            const found = PRODUCTS.find(p => p.id === productId);
            if (found) {
                setProduct(found);
                setCurrentImageIndex(0);
                setSelectedSize('');
            }
        }
    }, [productId]);

    useEffect(() => {
        const interval = setInterval(() => {
            setViewers(prev => Math.max(2, prev + Math.floor(Math.random() * 3) - 1));
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    if (!product) {
        return <div className="pt-32 text-center text-white">Chargement...</div>;
    }

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    };

    return (
        <div className="pt-24 min-h-screen grid grid-cols-1 lg:grid-cols-12 gap-0 bg-[#050505]">
            {/* Left: Visuals Gallery (Col 1-7) - FULL HEIGHT */}
            <div className="lg:col-span-7 relative flex flex-col items-center bg-[#0a0a0a] h-[60vh] lg:h-[calc(100vh-6rem)] sticky top-24">

                {/* Main Image Viewport */}
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden group">

                    {product.images.length > 1 && (
                        <>
                            <button onClick={prevImage} className="absolute left-6 z-30 p-4 rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all opacity-0 group-hover:opacity-100">
                                <ChevronLeft size={24} />
                            </button>
                            <button onClick={nextImage} className="absolute right-6 z-30 p-4 rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-white hover:text-black transition-all opacity-0 group-hover:opacity-100">
                                <ChevronRight size={24} />
                            </button>
                        </>
                    )}

                    {/* Active Image - OBJECT COVER for Full Fill */}
                    <img
                        src={product.images[currentImageIndex]}
                        alt={`${product.name} view ${currentImageIndex + 1}`}
                        className="w-full h-full object-contain transition-transform duration-700 drop-shadow-2xl"
                    />

                    {/* Indicators */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                        {product.images.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentImageIndex(idx)}
                                className={`h-1 rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'bg-[#D4AF37] w-8' : 'bg-white/30 w-2 hover:bg-white'}`}
                            />
                        ))}
                    </div>
                </div>

                <div className="absolute top-6 left-6 z-20">
                    <div className="bg-black/30 backdrop-blur-md px-4 py-2 flex items-center gap-2 text-[10px] uppercase tracking-widest text-white rounded-full border border-white/10">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                        {viewers} viewing
                    </div>
                </div>
            </div>

            {/* Right: Details (Col 8-12) - SCROLLABLE */}
            <div className="lg:col-span-5 px-8 lg:px-16 py-12 lg:py-24 flex flex-col justify-center bg-[#050505]">
                <div className="mb-6 flex items-center gap-3">
                    <span className="px-3 py-1 border border-white/10 text-[10px] text-white/60 uppercase tracking-widest rounded-full">
                        {product.category}
                    </span>
                    {product.inStock && (
                        <span className="text-[10px] text-[#D4AF37] uppercase tracking-widest flex items-center gap-1 animate-pulse">
                            ● In Stock
                        </span>
                    )}
                </div>

                <h1 className="text-5xl md:text-6xl font-serif text-[#F5F5F5] mb-6 leading-[0.9]">
                    {product.name}
                </h1>

                <div className="text-3xl font-light text-[#D4AF37] mb-10 font-serif">
                    {product.price}€
                </div>

                <p className="text-white/60 leading-loose text-sm mb-12 font-light max-w-md">
                    {product.description}
                </p>

                <div className="mb-12">
                    <div className="flex justify-between mb-4 items-end border-b border-white/10 pb-2">
                        <span className="text-xs uppercase tracking-widest text-white font-bold">Taille</span>
                        <button className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-colors">
                            <Ruler size={12} /> Guide
                        </button>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                        {product.sizes.map(size => (
                            <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`aspect-square flex items-center justify-center text-sm font-medium transition-all duration-300 rounded-sm ${selectedSize === size
                                    ? 'bg-[#D4AF37] text-black'
                                    : 'bg-[#1A1A1A] text-white hover:bg-[#252525]'
                                    }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                <button
                    disabled={!product.inStock || !selectedSize}
                    onClick={() => product.inStock && selectedSize && addToCart(product.id, selectedSize)}
                    className="group relative w-full py-6 bg-[#F5F5F5] text-black font-bold tracking-[0.2em] uppercase text-xs overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed rounded-sm"
                >
                    <span className="relative z-10 group-hover:text-[#D4AF37] transition-colors duration-300">
                        {product.inStock ? (selectedSize ? 'Ajouter au Panier' : 'Sélectionner Taille') : 'Rupture'}
                    </span>
                    <div className="absolute inset-0 bg-[#050505] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)]"></div>
                </button>

                <div className="mt-16 space-y-6">
                    <div className="flex items-start gap-4 text-white/40 text-xs leading-relaxed">
                        <Clock size={16} className="shrink-0 mt-0.5" />
                        <p>Expédition express sous 24h. Livraison offerte pour les membres.</p>
                    </div>
                    <div className="flex items-start gap-4 text-white/40 text-xs leading-relaxed">
                        <ShieldCheck size={16} className="shrink-0 mt-0.5" />
                        <p>Authenticité garantie. Chaque pièce est vérifiée à la main avant envoi.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
