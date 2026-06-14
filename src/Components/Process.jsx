import { useRef, useState, useLayoutEffect } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
} from 'framer-motion';
import { processSteps } from '../data/content';
import './styles/Process.css';

const TOTAL = processSteps.length;
const ease = [0.16, 0.8, 0.3, 1];

// Step activates earlier in scroll — last step ~75% through section progress
function stepThreshold(index) {
  return (index + 0.12) / (TOTAL - 0.05);
}

function TimelineSpine({ scrollYProgress, stepsRef, nodeRefs }) {
  const [metrics, setMetrics] = useState(null);
  const fillScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useLayoutEffect(() => {
    const measure = () => {
      const container = stepsRef.current;
      const first = nodeRefs.current[0];
      const last = nodeRefs.current[TOTAL - 1];
      if (!container || !first || !last) return;

      const cr = container.getBoundingClientRect();
      const fr = first.getBoundingClientRect();
      const lr = last.getBoundingClientRect();

      setMetrics({
        top: fr.top - cr.top + fr.height / 2,
        height: lr.top - fr.top,
        left: fr.left - cr.left + fr.width / 2,
      });
    };

    measure();
    window.addEventListener('resize', measure);
    const ro = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(measure)
      : null;
    if (ro && stepsRef.current) ro.observe(stepsRef.current);

    return () => {
      window.removeEventListener('resize', measure);
      ro?.disconnect();
    };
  }, [stepsRef, nodeRefs]);

  if (!metrics) return null;

  return (
    <div
      className="pt-spine-rail"
      style={{
        top: metrics.top,
        height: metrics.height,
        left: metrics.left,
      }}
      aria-hidden="true"
    >
      <div className="pt-spine-track" />
      <motion.div className="pt-spine-fill" style={{ scaleY: fillScale }} />
    </div>
  );
}

function StepRow({ step, index, scrollYProgress, nodeRef }) {
  const [active, setActive] = useState(false);
  const threshold = stepThreshold(index);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActive(v >= threshold);
  });

  const clipProgress = useTransform(
    scrollYProgress,
    [threshold - 0.06, threshold + 0.04],
    ['inset(0 100% 0 0)', 'inset(0 0% 0 0)']
  );

  return (
    <div className={`pt-row${active ? ' is-active' : ''}`}>
      <motion.span
        className="pt-watermark"
        style={{ clipPath: clipProgress }}
        aria-hidden="true"
      >
        {step.n}
      </motion.span>

      <div className="pt-row-inner">
        <div className="pt-left">
          <motion.span
            className="pt-stamp"
            animate={{ opacity: active ? 1 : 0.35, y: active ? 0 : 4 }}
            transition={{ duration: 0.4, ease }}
          >
            {step.stamp}
          </motion.span>

          <div className="pt-node-wrap">
            <motion.div
              ref={nodeRef}
              className="pt-node"
              animate={active
                ? { scale: 1.2, backgroundColor: 'var(--accent)', borderColor: 'var(--accent)' }
                : { scale: 1, backgroundColor: 'transparent', borderColor: 'rgba(255,255,255,0.18)' }
              }
              transition={{ type: 'spring', stiffness: 320, damping: 20 }}
            >
              <AnimatePresence>
                {active && (
                  <motion.span
                    className="pt-node-ping"
                    initial={{ scale: 1, opacity: 0.6 }}
                    animate={{ scale: 2.8, opacity: 0 }}
                    exit={{}}
                    transition={{ duration: 1.2, ease: 'easeOut', repeat: Infinity, repeatDelay: 1.4 }}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        <div className="pt-center">
          <motion.h3
            className="pt-title"
            animate={{
              color: active ? 'var(--panel-ink)' : 'rgba(255,255,255,0.22)',
              y: active ? 0 : 10,
            }}
            transition={{ duration: 0.45, ease }}
          >
            {step.title}
          </motion.h3>
          <motion.span
            className="pt-underline"
            animate={{ scaleX: active ? 1 : 0 }}
            transition={{ duration: 0.4, ease, delay: active ? 0.08 : 0 }}
          />
        </div>

        <motion.p
          className="pt-desc"
          animate={{ opacity: active ? 0.72 : 0.2, y: active ? 0 : 6 }}
          transition={{ duration: 0.45, ease, delay: active ? 0.05 : 0 }}
        >
          {step.desc}
        </motion.p>
      </div>
    </div>
  );
}

export default function Process() {
  const logRef = useRef(null);
  const stepsRef = useRef(null);
  const nodeRefs = useRef([]);

  const { scrollYProgress } = useScroll({
    target: logRef,
    // Finish progress while the section is still well in view
    offset: ['start 92%', 'end 72%'],
  });

  return (
    <section id="process" className="process">
      <div className="process-head-band">
        <div className="process-head-inner">
          <div data-reveal className="process-header">
            <span className="section-label" style={{ color: 'var(--accent)' }}>(02) — How it works</span>
            <h2 className="section-title process-section-title">
              How a project<br />actually runs.
            </h2>
          </div>
        </div>
      </div>

      <div ref={logRef} className="process-log">
        <div ref={stepsRef} className="pt-steps">
          <TimelineSpine
            scrollYProgress={scrollYProgress}
            stepsRef={stepsRef}
            nodeRefs={nodeRefs}
          />
          {processSteps.map((step, i) => (
            <StepRow
              key={step.n}
              step={step}
              index={i}
              scrollYProgress={scrollYProgress}
              nodeRef={(el) => { nodeRefs.current[i] = el; }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
