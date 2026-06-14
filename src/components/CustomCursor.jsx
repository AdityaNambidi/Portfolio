import { useEffect } from 'react';
import { useFinePointer, useReducedMotion } from '../hooks/useMediaQuery';
import './styles/CustomCursor.css';

export default function CustomCursor() {
  const fine = useFinePointer();
  const reduce = useReducedMotion();

  useEffect(() => {
    document.body.classList.toggle('has-custom-cursor', fine && !reduce);
    return () => document.body.classList.remove('has-custom-cursor');
  }, [fine, reduce]);

  if (reduce || !fine) return null;

  return (
    <>
      <div className="cursor-ring" data-cursor-ring aria-hidden="true" />
      <div className="cursor-dot" data-cursor-dot aria-hidden="true" />
    </>
  );
}
