import React, { useEffect, useRef } from 'react';

interface FabricBackgroundProps {
  variant?: 'silk' | 'dust' | 'geometric' | 'grain';
}

export const FabricBackground = ({ variant = 'silk' }: FabricBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resize);
    resize();

    // Particle system for 'dust'
    const particles: {x: number, y: number, speed: number, size: number, alpha: number}[] = [];
    if (variant === 'dust') {
      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          speed: 0.2 + Math.random() * 0.5,
          size: 1 + Math.random() * 2,
          alpha: 0.1 + Math.random() * 0.4
        });
      }
    }

    const render = () => {
      if (!ctx) return;
      
      // Clear background
      ctx.fillStyle = '#0B0B0B';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      time += 0.01;

      if (variant === 'silk') {
        // Silk Effect: Sine waves
        ctx.lineWidth = 1;
        for (let i = 0; i < 5; i++) {
          ctx.beginPath();
          const opacity = 0.1 - (i * 0.015);
          ctx.strokeStyle = `rgba(192, 192, 192, ${opacity})`; // Silver color
          
          for (let x = 0; x < canvas.width; x += 5) {
            // Complex wave function
            const y = canvas.height / 2 
              + Math.sin(x * 0.002 + time + i) * 100 
              + Math.sin(x * 0.005 - time * 0.5) * 50
              + Math.cos(x * 0.001 + time * 0.2) * 50
              + (i * 30); // Vertical offset for each line
            
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      } 
      else if (variant === 'dust') {
        // Silver Dust Effect
        ctx.fillStyle = '#C0C0C0'; // Silver
        particles.forEach(p => {
          p.y -= p.speed;
          if (p.y < 0) p.y = canvas.height;
          
          // Wobble
          const x = p.x + Math.sin(time + p.y * 0.01) * 20;

          ctx.globalAlpha = p.alpha + Math.sin(time * 2 + p.y) * 0.1;
          ctx.beginPath();
          ctx.arc(x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.globalAlpha = 1;
      }
      else if (variant === 'geometric') {
        // Geometric Tessellation (simplified)
        ctx.strokeStyle = 'rgba(192, 192, 192, 0.05)';
        ctx.lineWidth = 1;
        const size = 100;
        
        for (let x = 0; x < canvas.width + size; x += size) {
          for (let y = 0; y < canvas.height + size; y += size) {
            ctx.save();
            ctx.translate(x, y);
            // Rotate slightly based on time and position
            ctx.rotate((time * 0.05) + (x + y) * 0.0005);
            ctx.strokeRect(-size/2, -size/2, size * 0.8, size * 0.8);
            ctx.restore();
          }
        }
      }
      else if (variant === 'grain') {
          // Grain Effect
          // Static noise
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const buffer = new Uint32Array(imageData.data.buffer);
          
          for(let i = 0; i < buffer.length; i++) {
              if (Math.random() < 0.05) { // 5% noise
                 // Add slight lightness
                 // Since background is black (0xFF000000 in little endian BGRA? No, #0B0B0B is dark grey)
                 // We just draw pixels on top in next pass for performance or simulate here
              }
          }
          // Canvas pixel manipulation is heavy, let's just draw random dots
           ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
           for (let i = 0; i < 1000; i++) {
               const x = Math.random() * canvas.width;
               const y = Math.random() * canvas.height;
               ctx.fillRect(x, y, 1, 1);
           }
      }

      // Vertical Brand Spine
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, 0);
      ctx.lineTo(canvas.width / 2, canvas.height);
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [variant]);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none" />;
};
