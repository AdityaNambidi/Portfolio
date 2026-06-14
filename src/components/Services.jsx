import { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { services } from '../data/content';
import './styles/Services.css';

// Fire once when scrollYProgress crosses this threshold going down.
// No reversal — strips stay assembled for the rest of the page.
const THRESH_IN = 0.35;

const SPRING = { type: 'spring', stiffness: 50, damping: 16 };

function sr(seed) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

function getScatter(index) {
  const s = index * 31;
  return {
    x:      (sr(s)      - 0.5) * 480,
    y:      (sr(s + 3)  - 0.5) * 900,
    rotate: (sr(s + 7)  - 0.5) * 52,
    scale:  0.78 + sr(s + 11) * 0.24,
  };
}

// ─── Single strip ─────────────────────────────────────────────────────────────
function ServiceStrip({ svc, index, assembled }) {
  const scatter = useMemo(() => getScatter(index), [index]);
  const delay   = index * 0.07;

  const assembled_target = { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 };
  const scatter_target   = { ...scatter, opacity: 0 };

  return (
    <motion.div
      className="svc-strip"
      initial={scatter_target}
      animate={assembled ? assembled_target : scatter_target}
      transition={{ ...SPRING, delay }}
    >
      <div className="svc-strip-num">{svc.n}</div>

      <div className="svc-strip-body">
        <div className="svc-strip-type">{svc.type}</div>
        <h3 className="svc-strip-title">{svc.title}</h3>
        <p className="svc-strip-desc">{svc.desc}</p>
      </div>

      <div className="svc-strip-metric">
        <span className="svc-strip-metric-val">{svc.metric}</span>
        <span className="svc-strip-metric-label">{svc.metricLabel}</span>
      </div>

      <div className="svc-strip-meta">
        <span className="svc-strip-timeline">{svc.timeline}</span>
        <span className="svc-strip-arrow">→</span>
      </div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function Services() {
  const outerRef = useRef(null);
  const firedRef = useRef(false);                  // never reset — fire once only
  const [assembled, setAssembled] = useState(false);

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ['start end', 'end start'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (!firedRef.current && v >= THRESH_IN) {
      firedRef.current = true;
      setAssembled(true);
    }
  });

  // Edge case: already in view on hard-load
  useEffect(() => {
    if (scrollYProgress.get() >= THRESH_IN) {
      firedRef.current = true;
      setAssembled(true);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    // No outer scroll-space div needed — section is now normal flow height
    <section ref={outerRef} id="services" className="services-section">
      <div className="services-inner">

        <div data-reveal className="services-head">
          <div className="section-label">(04) — What I do</div>
          <h2 className="section-title services-section-title">
            Where AI actually<br />makes money.
          </h2>
        </div>

        <div className="svc-list">
          {services.map((svc, i) => (
            <ServiceStrip
              key={svc.n}
              svc={svc}
              index={i}
              assembled={assembled}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
