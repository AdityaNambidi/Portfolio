import { useEffect, useRef } from 'react';
import { useReducedMotion } from './useMediaQuery';

export function useReveal() {
  const reduce = useReducedMotion();
  const observedRef = useRef(new Set());

  useEffect(() => {
    if (reduce) {
      document.querySelectorAll('[data-reveal]').forEach((el) => {
        el.classList.add('is-revealed');
      });
      return;
    }

    const items = Array.from(document.querySelectorAll('[data-reveal]'));

    const reveal = (el) => {
      if (observedRef.current.has(el)) return;
      observedRef.current.add(el);
      const delay = parseInt(el.getAttribute('data-delay') || '0', 10);
      el.style.transitionDelay = `${delay}ms`;
      el.classList.add('is-revealed');
    };

    const checkVisible = () => {
      const vh = window.innerHeight || 800;
      items.forEach((el) => {
        if (el.getBoundingClientRect().top < vh * 0.92) reveal(el);
      });
    };

    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              reveal(entry.target);
              io.unobserve(entry.target);
            }
          });
        },
        { rootMargin: '0px 0px -5% 0px', threshold: 0.01 },
      );
      items.forEach((el) => io.observe(el));

      checkVisible();
      requestAnimationFrame(checkVisible);

      const fallback = setTimeout(() => items.forEach(reveal), 2600);
      return () => {
        io.disconnect();
        clearTimeout(fallback);
      };
    }

    items.forEach(reveal);
  }, [reduce]);
}
