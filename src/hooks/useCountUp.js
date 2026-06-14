import { useEffect, useRef } from 'react';
import { useReducedMotion } from './useMediaQuery';

export function useCountUp() {
  const reduce = useReducedMotion();
  const doneRef = useRef(new Set());

  useEffect(() => {
    const fmt = (n) => n.toLocaleString('en-US');

    const animate = (el) => {
      if (doneRef.current.has(el)) return;
      doneRef.current.add(el);
      const target = parseInt(el.getAttribute('data-count'), 10) || 0;
      if (reduce) {
        el.textContent = fmt(target);
        return;
      }
      const dur = 1700;
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = fmt(Math.round(target * eased));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const check = () => {
      const vh = window.innerHeight;
      document.querySelectorAll('[data-count]').forEach((el) => {
        if (el.getBoundingClientRect().top < vh * 0.85) animate(el);
      });
    };

    check();
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check, { passive: true });
    return () => {
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, [reduce]);
}
