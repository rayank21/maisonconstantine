import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { FabricBackground } from '@/components/FabricBackground';
import { Landing } from '@/pages/Landing';
import { Collection } from '@/pages/Collection';
import { ProductPage } from '@/pages/Product';
import { About } from '@/pages/About';
import { Cart } from '@/pages/Cart';
import { Auth } from '@/pages/Auth';
import { Dashboard } from '@/pages/Dashboard';
import { ViewState } from '@/types';
import { Footer } from '@/components/Footer';

import { CartDrawer } from '@/components/CartDrawer';
import { CustomCursor } from '@/components/CustomCursor';
import { Preloader } from '@/components/Preloader';
import { AnimatePresence, motion } from 'framer-motion';
import { useAudio } from '@/hooks/useAudio';
import Lenis from '@studio-freight/lenis';
import { BackgroundMusic } from '@/components/BackgroundMusic';
import { StartScreen } from '@/components/StartScreen';
import { Chatbot } from '@/components/Chatbot';
import { Ticker } from '@/components/Ticker';

function App() {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  const { playHover, playClick, isMuted, toggleMute, resume } = useAudio();
  const [hasStarted, setHasStarted] = useState(false);

  // Global Sound Listeners
  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button') || target.closest('a') || target.closest('.cursor-pointer')) {
        playHover();
      }
    };

    const handleClick = () => {
      playClick();
    };

    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('click', handleClick);
    };
  }, [playHover, playClick]);

  const [view, setView] = useState<ViewState>('landing');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<{ productId: string; size: string; quantity: number }[]>([]);

  const addToCart = (productId: string, size: string) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.productId === productId && item.size === size);
      if (existing) {
        return prev.map(item =>
          item.productId === productId && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { productId, size, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (index: number) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Determine background variant based on view
  const getBackgroundVariant = (view: ViewState) => {
    switch (view) {
      case 'landing': return 'silk';
      case 'collection': return 'geometric'; // "grid of product cards" -> geometric/mosaic
      case 'product': return 'grain'; // "texture magnifier" -> grain
      case 'about': return 'geometric'; // "geometric gold tessellation"
      case 'cart': return 'dust';
      case 'auth': return 'dust';
      case 'dashboard': return 'geometric'; // "Animated charts" -> geometric
      default: return 'silk';
    }
  };

  const handleStart = () => {
    resume();
    setHasStarted(true);
  };

  return (
    <main className="min-h-screen relative overflow-hidden">
      {!hasStarted && <StartScreen onStart={handleStart} />}

      {hasStarted && (
        <>
          <Preloader />
          <BackgroundMusic videoId="vBu2OXGWBFI" isMuted={isMuted} volume={15} />
        </>
      )}

      <FabricBackground variant={getBackgroundVariant(view)} />

      <div className="fixed top-0 left-0 right-0 z-[60]">
        <Ticker />
      </div>

      <Navbar
        view={view}
        setView={setView}
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        isMuted={isMuted}
        toggleMute={toggleMute}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        removeFromCart={removeFromCart}
      />

      <Chatbot />
      <CustomCursor />

      <AnimatePresence mode="wait">
        <motion.div
          key={view}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          {view === 'landing' && <Landing setView={setView} setSelectedProductId={setSelectedProductId} />}
          {view === 'collection' && <Collection setView={setView} setSelectedProductId={setSelectedProductId} />}
          {view === 'product' && <ProductPage productId={selectedProductId} addToCart={addToCart} />}
          {view === 'about' && <About />}
          {view === 'cart' && <Cart />}
          {view === 'auth' && <Auth setView={setView} />}
          {view === 'dashboard' && <Dashboard />}
        </motion.div>
      </AnimatePresence>

      <Footer />
    </main>
  );
}

export default App;
