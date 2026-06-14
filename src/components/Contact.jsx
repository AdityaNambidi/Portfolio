import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from '@formspree/react';
import { email, socialLinks } from '../data/content';
import TextHoverHeading from './TextHoverHeading';
import ContactShader from './ContactShader';
import './styles/Contact.css';

const FORMSPREE_ID = 'mrevrajj';

const ease = [0.16, 0.8, 0.3, 1];

export default function Contact() {
  const year = new Date().getFullYear();
  const [form, setForm] = useState({ name: '', email: '', business: '', problem: '' });
  const [incomplete, setIncomplete] = useState(false);
  const [state, formspreeSubmit] = useForm(FORMSPREE_ID);

  useEffect(() => {
    if (state.succeeded) {
      setForm({ name: '', email: '', business: '', problem: '' });
      setIncomplete(false);
    }
  }, [state.succeeded]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (incomplete) setIncomplete(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allFilled = Object.values(form).every((v) => v.trim() !== '');
    if (!allFilled) {
      setIncomplete(true);
      return;
    }
    setIncomplete(false);
    await formspreeSubmit(e);
  };

  return (
    <section id="contact" className="contact">
      <ContactShader />

      <div className="section-inner contact-inner">
        <div data-reveal className="section-label">(05) — Let&apos;s talk</div>

        <TextHoverHeading line1="Let's build AI" line2="that pays off." />

        <AnimatePresence mode="wait">
          {state.succeeded ? (
            <motion.div
              key="success"
              className="contact-success"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease }}
            >
              <div className="contact-success-icon" aria-hidden="true">✓</div>
              <div className="contact-success-body">
                <p className="contact-success-eyebrow">Message sent</p>
                <p className="contact-success-title">Got it — I&apos;ll be in touch shortly.</p>
                <p className="contact-success-sub">
                  I&apos;ll review what you sent and follow up within 24 hours to schedule your discovery call.
                  If anything&apos;s urgent, email me directly at{' '}
                  <a href={`mailto:${email}`}>{email}</a>.
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease }}
            >
              <p data-reveal data-delay="120" className="contact-desc">
                Tell me about your business and what you&apos;re trying to solve. I&apos;ll review it and follow up to schedule a free 15-minute discovery call — no pitch, just a clear read on whether there&apos;s a real opportunity worth pursuing.
              </p>

              <form
                data-reveal
                data-delay="120"
                className="contact-form"
                onSubmit={handleSubmit}
                noValidate
              >
                <div className="cf-row cf-row--2">
                  <div className="cf-field">
                    <label className="cf-label" htmlFor="cf-name">Name</label>
                    <input
                      id="cf-name"
                      name="name"
                      type="text"
                      className="cf-input"
                      placeholder="Your name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="cf-field">
                    <label className="cf-label" htmlFor="cf-email">Email</label>
                    <input
                      id="cf-email"
                      name="email"
                      type="email"
                      className="cf-input"
                      placeholder="you@company.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="cf-field">
                  <label className="cf-label" htmlFor="cf-business">What does your business do?</label>
                  <input
                    id="cf-business"
                    name="business"
                    type="text"
                    className="cf-input"
                    placeholder="e.g. We run a lending platform / We're a logistics startup / etc."
                    value={form.business}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="cf-field">
                  <label className="cf-label" htmlFor="cf-problem">What are you trying to solve or automate?</label>
                  <textarea
                    id="cf-problem"
                    name="problem"
                    className="cf-input cf-textarea"
                    placeholder="Describe the bottleneck, repetitive process, or opportunity you have in mind. The more detail, the better."
                    rows={4}
                    value={form.problem}
                    onChange={handleChange}
                    required
                  />
                </div>

                {incomplete && (
                  <p className="cf-error">Please fill in all fields before sending.</p>
                )}
                {state.errors && (
                  <p className="cf-error">
                    Something went wrong — try emailing me directly at{' '}
                    <a href={`mailto:${email}`}>{email}</a>.
                  </p>
                )}

                <div className="cf-footer">
                  <button
                    type="submit"
                    className="btn btn-primary contact-cta"
                    disabled={state.submitting}
                    data-magnetic
                  >
                    {state.submitting ? 'Sending…' : <>Send message <span>↗</span></>}
                  </button>
                  <a href={`mailto:${email}`} className="contact-email">{email}</a>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <footer className="contact-footer">
          <div className="contact-brand">
            <span className="contact-brand-mark">✳</span> Aditya Nambidi
          </div>
          <div className="contact-social">
            {socialLinks.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}
              </a>
            ))}
          </div>
          <div className="contact-copy">© {year} — Built with intent</div>
        </footer>
      </div>
    </section>
  );
}
