import { useEffect, useRef } from 'react';
import { useReducedMotion } from './useMediaQuery';

export function useScrollEngine() {
  const reduce = useReducedMotion();
  const rafRef = useRef(null);
  const stateRef = useRef({ lastY: 0, vel: 0, mx: 0 });

  useEffect(() => {
    const nav = document.querySelector('[data-nav]');
    const parallaxEls = Array.from(document.querySelectorAll('[data-parallax]'));
    const track = document.querySelector('[data-marquee-track]');

    const onScroll = () => {
      const y = window.scrollY;
      const s = stateRef.current;
      s.vel = y - s.lastY;
      s.lastY = y;

      if (nav) {
        if (y > 30) {
          nav.classList.add('is-scrolled');
        } else {
          nav.classList.remove('is-scrolled');
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    const loop = () => {
      if (!reduce) {
        const y = window.scrollY;
        const s = stateRef.current;

        parallaxEls.forEach((el) => {
          if (el.hasAttribute('data-reveal') && !el.classList.contains('is-revealed')) return;
          const depth = parseFloat(el.getAttribute('data-depth') || '0');
          el.style.transform = `translateY(${y * depth}px)`;
        });

        s.vel *= 0.85;

        if (track) {
          const half = track.scrollWidth / 2 || 1;
          s.mx -= 0.45 + Math.min(Math.abs(s.vel) * 0.06, 3.5);
          if (-s.mx >= half) s.mx += half;
          track.style.transform = `translateX(${s.mx.toFixed(2)}px)`;
        }
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    loop();
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reduce]);
}
