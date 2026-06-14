import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './styles/FeaturedWork.css';

const TERMINAL_LINES = [
  { prefix: '$', text: 'aditya deploy --env production --all', delay: 0 },
  { prefix: '>', text: 'Checking 9 active systems...', delay: 0.3, muted: true },
  { prefix: '✓', text: '[alpha-sentinel]  ● running   — live market data, 24/7 risk monitor', delay: 0.5, accent: true },
  { prefix: '✓', text: '[cosmic-labs]     ● running   — 15+ tools, circuit-breaker recovery', delay: 0.72, accent: true },
  { prefix: '✓', text: '[floral-ai]       ● running   — 200 farms, 100–200 emails / day', delay: 0.94, accent: true },
  { prefix: '✓', text: '[atam-agent]      ● running   — self-built tools, autonomous loop', delay: 1.16, accent: true },
  { prefix: '✓', text: '[strato-bot]      ● running   — ↑ conversions, context-aware', delay: 1.38, accent: true },
  { prefix: '✓', text: '[seo-writer]      ● running   — zero-touch, web → Drive pipeline', delay: 1.6, accent: true },
  { prefix: '✓', text: '[5g-monitor]      ● running   — real-time Grafana, InfluxDB', delay: 1.82, accent: true },
  { prefix: '✓', text: '[mathbot]         ● running   — algebra → calculus, LaTeX output', delay: 2.04, accent: true },
  { prefix: '✓', text: '[energy-pred]     ● running   — hourly Delhi forecast, 7yr dataset', delay: 2.26, accent: true },
  { prefix: '>', text: 'All 9 systems healthy. 10+ shipped to date.', delay: 2.5, muted: true },
];

function TerminalLine({ prefix, text, delay, muted, accent }) {
  return (
    <motion.div
      className={`term-line${muted ? ' term-line--muted' : ''}${accent ? ' term-line--accent' : ''}`}
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.55, delay, ease: [0.16, 0.8, 0.3, 1] }}
      viewport={{ once: true, margin: '-10% 0px' }}
    >
      <span className="term-prefix">{prefix}</span>
      <span className="term-text">{text}</span>
    </motion.div>
  );
}

export default function FeaturedWork() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 90%', 'center 55%'],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [22, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [60, 0]);

  return (
    <div ref={containerRef} className="featured-wrap">
      <motion.div
        className="featured-card"
        style={{ rotateX, scale, opacity, y }}
      >
        {/* Window chrome */}
        <div className="term-chrome">
          <span className="term-dot term-dot--red" />
          <span className="term-dot term-dot--yellow" />
          <span className="term-dot term-dot--green" />
          <span className="term-chrome-title">portfolio — production systems</span>
        </div>

        {/* Terminal body */}
        <div className="term-body">
          {TERMINAL_LINES.map((line) => (
            <TerminalLine key={line.text} {...line} />
          ))}
          <motion.div
            className="term-cursor"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          />
        </div>

        {/* Bottom metrics strip */}
        <div className="term-footer">
          {[
            { label: 'Systems shipped', value: '10+' },
            { label: 'Peak accuracy', value: '99.1%' },
            { label: 'Emails / day', value: '200+' },
            { label: 'Status', value: '● All live' },
          ].map((m) => (
            <div key={m.label} className="term-footer-stat">
              <span className="term-footer-label">{m.label}</span>
              <span className="term-footer-value">{m.value}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
