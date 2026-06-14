import { useEffect, useRef } from 'react';
import { useReducedMotion, useFinePointer } from './useMediaQuery';

export function useCustomCursor() {
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  const rafRef = useRef(null);

  useEffect(() => {
    if (reduce || !fine) return;

    const ring = document.querySelector('[data-cursor-ring]');
    const dot = document.querySelector('[data-cursor-dot]');
    if (!ring || !dot) return;

    let rx = -100, ry = -100, dx = -100, dy = -100, tx = -100, ty = -100;
    let scale = 1, targetScale = 1;

    const onMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
      ring.style.opacity = '1';
      dot.style.opacity = '1';
    };

    const hoverables = document.querySelectorAll(
      'a, button, [data-magnetic], [data-service-row], [data-chip], [data-project-card]',
    );
    const onEnter = () => { targetScale = 1.9; };
    const onLeave = () => { targetScale = 1; };

    hoverables.forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    const loop = () => {
      dx += (tx - dx) * 0.9;
      dy += (ty - dy) * 0.9;
      rx += (tx - rx) * 0.18;
      ry += (ty - ry) * 0.18;
      scale += (targetScale - scale) * 0.15;
      dot.style.transform = `translate(${dx}px, ${dy}px) translate(-50%, -50%)`;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%) scale(${scale})`;
      rafRef.current = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove);
    loop();

    return () => {
      window.removeEventListener('mousemove', onMove);
      hoverables.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reduce, fine]);
}

export function useMagnetic() {
  const reduce = useReducedMotion();
  const fine = useFinePointer();

  useEffect(() => {
    if (reduce || !fine) return;

    const elements = document.querySelectorAll('[data-magnetic]');
    const handlers = [];

    elements.forEach((el) => {
      const onMove = (e) => {
        const r = el.getBoundingClientRect();
        const mx = e.clientX - r.left - r.width / 2;
        const my = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${mx * 0.25}px, ${my * 0.35}px)`;
      };
      const onLeave = () => { el.style.transform = 'translate(0, 0)'; };
      el.addEventListener('mousemove', onMove);
      el.addEventListener('mouseleave', onLeave);
      handlers.push({ el, onMove, onLeave });
    });

    return () => {
      handlers.forEach(({ el, onMove, onLeave }) => {
        el.removeEventListener('mousemove', onMove);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, [reduce, fine]);
}
