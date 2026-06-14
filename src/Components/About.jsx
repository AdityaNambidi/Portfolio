import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { capabilities, stack } from '../data/content';
import { useFinePointer } from '../hooks/useMediaQuery';
import './styles/About.css';

const ease = [0.16, 0.8, 0.3, 1];

// ─── Desktop: single character animated by scroll ─────────────────────────────
function ScrollChar({ char, dist, scrollYProgress, spread = 50, rotateSpread = 28 }) {
  const isSpace = char === ' ' || char === '\u00A0';
  const x       = useTransform(scrollYProgress, [0, 0.55], [dist * spread, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 0.55], [dist * rotateSpread, 0]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.55],
    [Math.max(0, 1 - Math.abs(dist) * 0.15), Math.max(0.06, 1 - Math.abs(dist) * 0.07), 1]
  );

  return (
    <motion.span
      className={`about-char${isSpace ? ' about-char-space' : ''}`}
      style={{ x, rotateX, opacity }}
    >
      {isSpace ? '\u00A0' : char}
    </motion.span>
  );
}

function CharLine({ text, scrollYProgress, className = '', spread, rotateSpread }) {
  const chars  = text.split('');
  const center = (chars.length - 1) / 2;
  return (
    <div className={`about-char-line ${className}`} style={{ perspective: '700px' }}>
      {chars.map((ch, i) => (
        <ScrollChar
          key={i}
          char={ch}
          dist={i - center}
          scrollYProgress={scrollYProgress}
          spread={spread}
          rotateSpread={rotateSpread}
        />
      ))}
    </div>
  );
}

// ─── Mobile: char line — instant reveal on enter ───────────────────────────────
function CharLineMobile({ text, className = '', delay = 0 }) {
  return (
    <motion.div
      className={`about-char-line ${className}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.65, delay, ease }}
    >
      {text.split('').map((ch, i) => (
        <span
          key={i}
          className={`about-char${ch === ' ' || ch === '\u00A0' ? ' about-char-space' : ''}`}
        >
          {ch === ' ' ? '\u00A0' : ch}
        </span>
      ))}
    </motion.div>
  );
}

// ─── Desktop: word-level variant for body copy ────────────────────────────────
function WordLine({ text, scrollYProgress, className = '' }) {
  const words  = text.split(' ');
  const center = (words.length - 1) / 2;
  return (
    <p className={`about-word-line ${className}`} style={{ perspective: '500px' }}>
      {words.map((word, i) => (
        <WordItem
          key={i}
          word={word}
          dist={i - center}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </p>
  );
}

function WordItem({ word, dist, scrollYProgress }) {
  const x = useTransform(scrollYProgress, [0.1, 0.65], [dist * 38, 0]);
  const opacity = useTransform(scrollYProgress, [0.05, 0.5], [Math.max(0, 1 - Math.abs(dist) * 0.18), 1]);
  const y = useTransform(scrollYProgress, [0.1, 0.65], [Math.abs(dist) * 14, 0]);
  return (
    <motion.span className="about-word" style={{ x, y, opacity }}>
      {word}{' '}
    </motion.span>
  );
}

// ─── Desktop: entire column slides in from an x-offset ───────────────────────
function SlideBlock({ children, className = '', offsetX, scrollYProgress, start = 0.05, end = 0.6 }) {
  const x       = useTransform(scrollYProgress, [start, end], [offsetX, 0]);
  const opacity = useTransform(scrollYProgress, [start, start + 0.2], [0, 1]);
  return (
    <motion.div className={className} style={{ x, opacity }}>
      {children}
    </motion.div>
  );
}

function CapabilityCard({ title, desc, index, scrollYProgress }) {
  const dist = index - 1.5;
  const x = useTransform(scrollYProgress, [0.35, 0.78], [dist * 40, 0]);
  const opacity = useTransform(scrollYProgress, [0.3 + index * 0.04, 0.62 + index * 0.04], [0, 1]);
  const y = useTransform(scrollYProgress, [0.35, 0.78], [22, 0]);
  return (
    <motion.div className="capability-card" style={{ x, opacity, y }}>
      <div className="capability-title">{title}</div>
      <div className="capability-desc">{desc}</div>
    </motion.div>
  );
}

// ─── Mobile: simple fade-up block ─────────────────────────────────────────────
function FadeBlock({ children, className = '', delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

// ─── Scatter chips ────────────────────────────────────────────────────────────
function seededRand(seed) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

const chipVariantsMobile = {
  hidden: { opacity: 0, scale: 0.85, y: 10 },
  visible: (i) => ({
    opacity: 1, scale: 1, y: 0,
    transition: { duration: 0.4, delay: i * 0.03, ease },
  }),
};

function StackChip({ label, index, scrollYProgress }) {
  const start = 0.6 + index * 0.022;
  const end = start + 0.14;
  const scatterX = (seededRand(index * 3) - 0.5) * 280;
  const scatterY = (seededRand(index * 7) - 0.5) * 140;
  const scatterRotate = (seededRand(index * 13) - 0.5) * 40;

  const x = useTransform(scrollYProgress, [start, end], [scatterX, 0]);
  const y = useTransform(scrollYProgress, [start, end], [scatterY, 0]);
  const rotate = useTransform(scrollYProgress, [start, end], [scatterRotate, 0]);
  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const scale = useTransform(scrollYProgress, [start, end], [0.6, 1]);

  return (
    <motion.span
      className="stack-chip"
      style={{ x, y, rotate, opacity, scale }}
      whileHover={{
        scale: 1.08,
        backgroundColor: 'var(--accent)',
        color: 'var(--bg)',
        transition: { duration: 0.18 },
      }}
    >
      {label}
    </motion.span>
  );
}

function AboutLabel({ scrollYProgress }) {
  const opacity = useTransform(scrollYProgress, [0, 0.25], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.25], [16, 0]);
  return (
    <motion.div className="section-label about-label" style={{ opacity, y }}>
      (01) — Who you&apos;d work with
    </motion.div>
  );
}

function AboutBody({ scrollYProgress }) {
  const opacity = useTransform(scrollYProgress, [0.35, 0.7], [0, 1]);
  const y = useTransform(scrollYProgress, [0.35, 0.7], [18, 0]);
  return (
    <motion.p className="about-body" style={{ opacity, y }}>
      Most AI projects fail not because the model was wrong, but because the system around it wasn&apos;t thought through. I focus on the glue — the workflows, the edge cases, and the handoffs — that turn a generic LLM into a high-ROI business asset.
    </motion.p>
  );
}

function StackHeader({ scrollYProgress }) {
  const opacity = useTransform(scrollYProgress, [0.55, 0.78], [0, 1]);
  const x = useTransform(scrollYProgress, [0.55, 0.78], [-30, 0]);
  return (
    <motion.div className="stack-header" style={{ opacity, x }}>
      <span className="stack-line" />
      The stack I build on
    </motion.div>
  );
}

// ─── Mobile layout ────────────────────────────────────────────────────────────
function AboutMobile() {
  return (
    <section id="about" className="about">
      <div className="about-banner">
        <motion.div
          className="section-label about-label"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease }}
        >
          (01) — Who you&apos;d work with
        </motion.div>

        <CharLineMobile text="I build AI that" className="about-char-line--hero" delay={0.05} />
        <CharLineMobile text="earns its keep." className="about-char-line--hero" delay={0.15} />
      </div>

      <div className="section-inner about-grid">
        <FadeBlock className="about-left" delay={0}>
          <h2 className="section-title about-title">Hi,<br />I&apos;m Aditya.</h2>
          <div className="about-details">
            <div className="about-block">
              <div className="about-block-label">Education</div>
              <div className="about-block-item">Delhi Technological University — Undergrad &apos;27</div>
              <div className="about-block-item muted">Abu Dhabi Indian School &apos;23</div>
            </div>
          </div>
        </FadeBlock>

        <FadeBlock className="about-right" delay={0.1}>
          <motion.p
            className="about-word-line about-lead"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease }}
          >
            I build AI systems that don&apos;t just demo well — they work at scale, in production.
          </motion.p>

          <motion.p
            className="about-body"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
          >
            Most AI projects fail not because the model was wrong, but because the system around it wasn&apos;t thought through. I focus on the glue — the workflows, the edge cases, and the handoffs — that turn a generic LLM into a high-ROI business asset.
          </motion.p>

          <div className="capabilities-grid">
            {capabilities.map((c, i) => (
              <motion.div
                key={c.t}
                className="capability-card"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease }}
              >
                <div className="capability-title">{c.t}</div>
                <div className="capability-desc">{c.d}</div>
              </motion.div>
            ))}
          </div>
        </FadeBlock>
      </div>

      <div className="section-inner stack-section">
        <motion.div
          className="stack-header"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease }}
        >
          <span className="stack-line" />
          The stack I build on
        </motion.div>

        <motion.div
          className="stack-chips"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {stack.map((s, i) => (
            <motion.span
              key={s}
              custom={i}
              variants={chipVariantsMobile}
              className="stack-chip"
            >
              {s}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── Desktop layout — scroll-driven animations ────────────────────────────────
function AboutDesktop() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 98%', 'center 15%'],
  });

  return (
    <section id="about" className="about" ref={sectionRef}>
      <div className="about-banner">
        <AboutLabel scrollYProgress={scrollYProgress} />

        <CharLine
          text="I build AI that"
          scrollYProgress={scrollYProgress}
          className="about-char-line--hero"
          spread={58}
          rotateSpread={24}
        />
        <CharLine
          text="earns its keep."
          scrollYProgress={scrollYProgress}
          className="about-char-line--hero"
          spread={58}
          rotateSpread={24}
        />
      </div>

      <div className="section-inner about-grid">
        <SlideBlock
          className="about-left"
          offsetX={-80}
          scrollYProgress={scrollYProgress}
          start={0.2}
          end={0.7}
        >
          <h2 className="section-title about-title">Hi,<br />I&apos;m Aditya.</h2>
          <div className="about-details">
            <div className="about-block">
              <div className="about-block-label">Education</div>
              <div className="about-block-item">Delhi Technological University — Undergrad &apos;27</div>
              <div className="about-block-item muted">Abu Dhabi Indian School &apos;23</div>
            </div>
          </div>
        </SlideBlock>

        <SlideBlock
          className="about-right"
          offsetX={80}
          scrollYProgress={scrollYProgress}
          start={0.25}
          end={0.75}
        >
          <WordLine
            text="I build AI systems that don't just demo well — they work at scale, in production."
            scrollYProgress={scrollYProgress}
            className="about-lead"
          />

          <AboutBody scrollYProgress={scrollYProgress} />

          <div className="capabilities-grid">
            {capabilities.map((c, i) => (
              <CapabilityCard
                key={c.t}
                title={c.t}
                desc={c.d}
                index={i}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </SlideBlock>
      </div>

      <div className="section-inner stack-section">
        <StackHeader scrollYProgress={scrollYProgress} />

        <div className="stack-chips">
          {stack.map((s, i) => (
            <StackChip
              key={s}
              label={s}
              index={i}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function About() {
  const fine = useFinePointer();
  return fine ? <AboutDesktop /> : <AboutMobile />;
}
