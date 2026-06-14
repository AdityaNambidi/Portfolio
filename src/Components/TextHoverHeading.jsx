import { useRef, useState, useEffect, useCallback, useId } from 'react';
import { useFinePointer } from '../hooks/useMediaQuery';
import './styles/TextHoverHeading.css';

export default function TextHoverHeading({ line1 = 'Got busywork', line2 = 'AI could do?' }) {
  const svgRef = useRef(null);
  const gradRef = useRef(null);
  const strokeRef1 = useRef(null);
  const strokeRef2 = useRef(null);
  const [hovered, setHovered] = useState(false);
  const fine = useFinePointer();
  const uid = useId().replace(/:/g, '');

  const updateGrad = useCallback((clientX, clientY) => {
    const svg = svgRef.current;
    const grad = gradRef.current;
    if (!svg || !grad) return;
    const rect = svg.getBoundingClientRect();
    const cx = ((clientX - rect.left) / rect.width) * 100;
    const cy = ((clientY - rect.top) / rect.height) * 100;
    grad.setAttribute('cx', `${cx}%`);
    grad.setAttribute('cy', `${cy}%`);
  }, []);

  const setGradPercent = useCallback((cx, cy) => {
    const grad = gradRef.current;
    if (!grad) return;
    grad.setAttribute('cx', `${cx}%`);
    grad.setAttribute('cy', `${cy}%`);
  }, []);

  // Trigger stroke-draw CSS animation on mount
  useEffect(() => {
    const el1 = strokeRef1.current;
    const el2 = strokeRef2.current;
    if (!el1 || !el2) return;
    void el1.getBoundingClientRect();
    el1.style.animation = 'thh-draw 2.2s cubic-bezier(0.4,0,0.2,1) forwards';
    el2.style.animation = 'thh-draw 2.2s cubic-bezier(0.4,0,0.2,1) 0.25s forwards';
  }, []);

  // Mobile: auto-drifting green spot — simulates cursor wandering over the text
  useEffect(() => {
    if (fine) return;

    const start = performance.now();
    let rafId;

    const loop = (now) => {
      const t = (now - start) / 1000;
      const cx = 50 + 38 * Math.sin(t * 0.55) + 12 * Math.sin(t * 1.1 + 0.8);
      const cy = 50 + 28 * Math.sin(t * 0.42 + 1.4) + 10 * Math.cos(t * 0.85);
      setGradPercent(cx, cy);
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, [fine, setGradPercent]);

  const showAccent = fine ? hovered : true;

  const layout = fine
    ? { viewBox: '0 0 700 210', y1: 76, y2: 148, gradH: 210 }
    : { viewBox: '0 0 700 240', y1: 88, y2: 178, gradH: 240 };

  const gradId = `rg${uid}`;
  const maskId = `rm${uid}`;
  const lgId   = `lg${uid}`;

  return (
    <div className={`thh-wrap${fine ? '' : ' thh-wrap--touch'}`}>
      <svg
        ref={svgRef}
        className="thh-svg"
        viewBox={layout.viewBox}
        xmlns="http://www.w3.org/2000/svg"
        onMouseEnter={fine ? () => setHovered(true) : undefined}
        onMouseLeave={fine ? () => setHovered(false) : undefined}
        onMouseMove={fine ? (e) => updateGrad(e.clientX, e.clientY) : undefined}
        aria-label={`${line1} ${line2}`}
        role="heading"
        aria-level="2"
      >
        <defs>
          <linearGradient id={lgId} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="700" y2={layout.gradH}>
            <stop offset="0%"   stopColor="var(--accent)" />
            <stop offset="50%"  stopColor="#b8ff4a" />
            <stop offset="100%" stopColor="var(--accent)" />
          </linearGradient>

          <radialGradient
            id={gradId}
            ref={gradRef}
            gradientUnits="userSpaceOnUse"
            r={fine ? '28%' : '32%'}
            cx="50%"
            cy="50%"
          >
            <stop offset="0%"   stopColor="white" />
            <stop offset="100%" stopColor="black" />
          </radialGradient>

          <mask id={maskId}>
            <rect x="0" y="0" width="100%" height="100%" fill={`url(#${gradId})`} />
          </mask>
        </defs>

        <text x="350" y={layout.y1} className="thh-text" textAnchor="middle" dominantBaseline="middle" stroke="var(--line)" strokeWidth="0.4" fill="none">{line1}</text>
        <text x="350" y={layout.y2} className="thh-text" textAnchor="middle" dominantBaseline="middle" stroke="var(--line)" strokeWidth="0.4" fill="none">{line2}</text>

        <text ref={strokeRef1} x="350" y={layout.y1} className="thh-text" textAnchor="middle" dominantBaseline="middle"
          stroke="var(--ink)" strokeWidth="0.5" fill="none"
          strokeDasharray="2000" strokeDashoffset="2000" opacity="0.55"
        >{line1}</text>
        <text ref={strokeRef2} x="350" y={layout.y2} className="thh-text" textAnchor="middle" dominantBaseline="middle"
          stroke="var(--ink)" strokeWidth="0.5" fill="none"
          strokeDasharray="2000" strokeDashoffset="2000" opacity="0.55"
        >{line2}</text>

        {showAccent && (
          <>
            <text x="350" y={layout.y1} className="thh-text" textAnchor="middle" dominantBaseline="middle"
              stroke={`url(#${lgId})`} strokeWidth="0.6" fill="none" mask={`url(#${maskId})`}
            >{line1}</text>
            <text x="350" y={layout.y2} className="thh-text" textAnchor="middle" dominantBaseline="middle"
              stroke={`url(#${lgId})`} strokeWidth="0.6" fill="none" mask={`url(#${maskId})`}
            >{line2}</text>
          </>
        )}
      </svg>
    </div>
  );
}
