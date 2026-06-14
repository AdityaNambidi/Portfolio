import { useEffect } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';
import { useReducedMotion } from '../hooks/useMediaQuery';

const LENIS_OPTIONS = {
  autoRaf: true,
  duration: 1.15,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  wheelMultiplier: 0.85,
  touchMultiplier: 1.35,
  syncTouch: false,
};

const NAV_OFFSET = -96;

function LenisAnchorHandler() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return undefined;

    const onClick = (e) => {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      lenis.scrollTo(target, { offset: NAV_OFFSET, duration: 1.2 });
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [lenis]);

  return null;
}

export default function SmoothScroll({ children }) {
  const reduce = useReducedMotion();

  if (reduce) return children;

  return (
    <ReactLenis root options={LENIS_OPTIONS}>
      <LenisAnchorHandler />
      {children}
    </ReactLenis>
  );
}
