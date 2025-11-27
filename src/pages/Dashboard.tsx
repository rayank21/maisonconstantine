import React, { useEffect, useRef } from 'react';
import { TrendingUp, Users, ShoppingBag, Activity } from 'lucide-react';

export const Dashboard = () => {
  // Canvas for sales chart
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Draw a dummy chart
      ctx.fillStyle = '#0B0B0B'; // clear
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);
      
      // Random data points
      const points = [10, 40, 30, 70, 50, 90, 60, 100, 80, 120];
      const stepX = canvas.width / (points.length - 1);
      
      points.forEach((p, i) => {
          const x = i * stepX;
          const y = canvas.height - (p * (canvas.height / 150));
          ctx.lineTo(x, y);
      });

      ctx.strokeStyle = '#C0C0C0';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Fill under
      ctx.lineTo(canvas.width, canvas.height);
      ctx.lineTo(0, canvas.height);
      ctx.fillStyle = 'rgba(192, 192, 192, 0.1)';
      ctx.fill();

  }, []);

  return (
    <div className="pt-24 px-6 min-h-screen">
      <header className="flex justify-between items-center mb-12">
        <div>
            <h2 className="text-3xl font-serif text-brand-white">Tableau de Bord</h2>
            <p className="text-brand-beige/50">Vue d'ensemble des performances</p>
        </div>
        <div className="bg-brand-charcoal px-4 py-2 rounded border border-brand-white/10 text-xs text-brand-gold animate-pulse">
            LIVE
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
              { label: 'Ventes du jour', value: '1,240€', icon: TrendingUp },
              { label: 'Visiteurs en ligne', value: '42', icon: Users },
              { label: 'Commandes', value: '12', icon: ShoppingBag },
              { label: 'Taux de conv.', value: '3.2%', icon: Activity },
          ].map((stat, i) => (
              <div key={i} className="bg-brand-charcoal/30 p-6 border border-brand-white/5">
                  <div className="flex justify-between items-start mb-4">
                      <stat.icon className="text-brand-gold" size={20} />
                      <span className="text-xs text-brand-white/30 uppercase tracking-widest">
                          {i === 1 ? 'Temps réel' : '+12% vs hier'}
                      </span>
                  </div>
                  <div className="text-3xl font-mono text-brand-white">{stat.value}</div>
                  <div className="text-sm text-brand-beige/50 mt-1">{stat.label}</div>
              </div>
          ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-brand-charcoal/30 p-6 border border-brand-white/5">
              <h3 className="text-xl font-serif text-brand-white mb-6">Evolution des Ventes</h3>
              <div className="w-full h-64 bg-brand-black/50 relative">
                  <canvas ref={canvasRef} width={600} height={250} className="w-full h-full" />
              </div>
          </div>

          <div className="bg-brand-charcoal/30 p-6 border border-brand-white/5">
              <h3 className="text-xl font-serif text-brand-white mb-6">Top Produits</h3>
              <div className="space-y-4">
                  {[
                      { name: 'Le Constantinois Noir', sales: 45 },
                      { name: 'Signature Hoodie', sales: 32 },
                      { name: 'L\'Aube Dorée', sales: 28 },
                  ].map((p, i) => (
                      <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-brand-white/5 flex items-center justify-center text-xs font-mono text-brand-gold">
                                  {i + 1}
                              </div>
                              <span className="text-sm text-brand-white">{p.name}</span>
                          </div>
                          <span className="text-sm font-mono text-brand-beige/50">{p.sales} ventes</span>
                      </div>
                  ))}
              </div>
          </div>
      </div>
    </div>
  );
};
