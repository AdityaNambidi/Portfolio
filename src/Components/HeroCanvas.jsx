import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useMediaQuery';

function hex2rgb(hex) {
  let h = hex.replace('#', '');
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function readCssVar(name, fallback) {
  const val = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return val || fallback;
}

export default function HeroCanvas() {
  const canvasRef = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;

    const canvas = canvasRef.current;
    const header = canvas?.parentElement;
    if (!canvas || !header) return;

    const ctx = canvas.getContext('2d');
    let dots = [];
    let W = 0;
    let H = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -9999, y: -9999 };
    let rafId;

    const build = () => {
      const r = header.getBoundingClientRect();
      W = window.innerWidth;
      H = r.height;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = [];
      const gap = 40;
      for (let x = gap; x < W; x += gap) {
        for (let y = gap; y < H; y += gap) {
          dots.push({ bx: x, by: y, x, y });
        }
      }
    };

    build();
    window.addEventListener('resize', build);

    const onMove = (e) => {
      const r = header.getBoundingClientRect();
      mouse.x = e.clientX;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    header.addEventListener('mousemove', onMove);
    header.addEventListener('mouseleave', onLeave);

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const accent = hex2rgb(readCssVar('--accent', '#CDFB5B').replace(/\s/g, ''));
      const inkRaw = readCssVar('--ink', '#ECE7DB').trim();
      const ink = hex2rgb(inkRaw.startsWith('#') ? inkRaw : '#ECE7DB');
      const R = 130;

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        const dx = d.x - mouse.x;
        const dy = d.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        let tx = d.bx;
        let ty = d.by;
        let near = 0;

        if (dist < R) {
          const f = 1 - dist / R;
          const ang = Math.atan2(dy, dx);
          tx = d.bx + Math.cos(ang) * f * 14;
          ty = d.by + Math.sin(ang) * f * 14;
          near = f;
        }

        d.x += (tx - d.x) * 0.12;
        d.y += (ty - d.y) * 0.12;
        const c = near > 0.05 ? accent : ink;
        const a = near > 0.05 ? 0.25 + near * 0.65 : 0.14;
        const sz = near > 0.05 ? 1.1 + near * 1.8 : 1.1;

        ctx.beginPath();
        ctx.fillStyle = `rgba(${c[0]},${c[1]},${c[2]},${a})`;
        ctx.arc(d.x, d.y, sz, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', build);
      header.removeEventListener('mousemove', onMove);
      header.removeEventListener('mouseleave', onLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [reduce]);

  if (reduce) return null;

  return <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />;
}
