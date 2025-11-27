import React from 'react';

export const Logo = ({ className = "", variant = "gold" }: { className?: string, variant?: "gold" | "white" | "outline" }) => {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Logo Image */}
      <img 
        src="/images/logo-fox.png" 
        alt="Maison Constantine Fox" 
        className="h-12 w-auto object-contain"
        onError={(e) => {
            // Fallback if image not found
            e.currentTarget.style.display = 'none';
        }}
      />
      <div className={`font-serif font-bold tracking-widest ${variant === 'gold' ? 'text-brand-gold' : 'text-brand-white'}`}>
        MAISON CONSTANTINE
      </div>
    </div>
  );
};
