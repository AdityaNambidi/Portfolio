import { motion } from 'framer-motion';
import HeroCanvas from './HeroCanvas';
import './styles/Hero.css';

const ease = [0.16, 0.8, 0.3, 1];

const lineVariants = {
  hidden: { y: '105%' },
  visible: (i) => ({
    y: 0,
    transition: { duration: 1.1, delay: 0.08 + i * 0.13, ease },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: 0.1 + i * 0.1, ease },
  }),
};

export default function Hero() {
  return (
    <header id="top" className="hero">
      <HeroCanvas />

      {/* Meta row — fades up */}
      <div className="hero-top">
        <motion.div
          className="hero-tag"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          <span className="hero-tag-accent">[ Independent ]</span>
          <br />
          AI strategy · automation · custom builds
        </motion.div>
        <motion.div
          className="hero-status"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          <span className="hero-status-dot" />
          Available — 2026
        </motion.div>
      </div>

      {/* Title — per-line clip reveal */}
      <div className="hero-body">
        <h1 className="hero-title">
          {['AI that', 'earns its', 'keep.'].map((line, i) => (
            <span key={line} className="hero-line-wrap">
              <motion.span
                className={`hero-line${i === 2 ? ' hero-title-accent' : ''}`}
                variants={lineVariants}
                initial="hidden"
                animate="visible"
                custom={i}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Bottom row */}
        <motion.div
          className="hero-bottom"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={5}
        >
          <p className="hero-desc">
            I&apos;m <span className="hero-desc-name">Aditya</span> — I build AI systems that eliminate bottlenecks, cut operational costs, and run in production without hand-holding. From strategy to full end-to-end builds.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="btn btn-primary" data-magnetic>
              Book a discovery call <span>↗</span>
            </a>
            <a href="#work" className="btn btn-ghost" data-magnetic>
              See the work
            </a>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
