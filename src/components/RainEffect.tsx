import React, { useEffect, useRef } from 'react';

interface RainEffectProps {
  active: boolean;
}

export function RainEffect({ active }: RainEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const rainCount = 180;
    const drops: Array<{ x: number; y: number; l: number; ys: number; opacity: number }> = [];
    for (let i = 0; i < rainCount; i++) {
      drops.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        l: Math.random() * 20 + 20, // longer drops
        ys: Math.random() * 15 + 15, // faster speeds
        opacity: Math.random() * 0.4 + 0.2
      });
    }

    // Keep track of active splashes
    const splashes: Array<{ x: number; y: number; r: number; maxR: number; opacity: number }> = [];

    const draw = () => {
      // 1. Draw atmospheric rain wash vignette
      ctx.fillStyle = 'rgba(10, 20, 35, 0.22)';
      ctx.fillRect(0, 0, width, height);

      // 2. Draw raindrops
      for (let i = 0; i < rainCount; i++) {
        const d = drops[i];
        ctx.beginPath();
        ctx.strokeStyle = `rgba(160, 210, 255, ${d.opacity})`;
        ctx.lineWidth = 1.5;
        ctx.lineCap = 'round';
        ctx.moveTo(d.x, d.y);
        // diagonal rain representing slight wind
        ctx.lineTo(d.x + d.ys * 0.12, d.y + d.l);
        ctx.stroke();

        d.y += d.ys;
        d.x += d.ys * 0.12;

        // When drop hits the bottom or close to it, create a splash
        if (d.y > height - 10) {
          if (Math.random() < 0.3) {
            splashes.push({
              x: d.x,
              y: height - Math.random() * 25,
              r: 1,
              maxR: Math.random() * 20 + 10,
              opacity: d.opacity
            });
          }
          d.y = -d.l;
          d.x = Math.random() * width;
        }
      }

      // 3. Draw & update splashes
      for (let i = splashes.length - 1; i >= 0; i--) {
        const s = splashes[i];
        ctx.beginPath();
        ctx.strokeStyle = `rgba(180, 220, 255, ${s.opacity})`;
        ctx.lineWidth = 0.8;
        // draw oval ripple
        ctx.ellipse(s.x, s.y, s.r, s.r * 0.3, 0, 0, Math.PI * 2);
        ctx.stroke();

        s.r += 1.5;
        s.opacity -= 0.04;

        if (s.opacity <= 0 || s.r >= s.maxR) {
          splashes.splice(i, 1);
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ mixBlendMode: 'screen' }}
      />
      {/* Dark storm overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-slate-900/40 pointer-events-none mix-blend-multiply" />
    </div>
  );
}
