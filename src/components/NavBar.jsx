import { useState } from 'react';
import { navLinks } from '../data/content';
import './styles/NavBar.css';

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className="nav" data-nav>
        <div className="nav-inner section-inner">
          <a href="#top" className="nav-logo" data-magnetic onClick={closeMenu}>
            <span className="nav-logo-mark">✳</span>
            <span className="nav-logo-text">Aditya Nambidi</span>
          </a>
          <div className="nav-right">
            <div className="nav-links">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href}>{link.label}</a>
              ))}
            </div>
            <a href="#contact" className="nav-cta" data-magnetic>
              Book a call
              <span className="nav-cta-dot" />
            </a>
            <button
              className={`nav-hamburger${menuOpen ? ' is-open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      <div className={`nav-mobile-menu${menuOpen ? ' is-open' : ''}`} aria-hidden={!menuOpen}>
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={closeMenu}>
            {link.label}
          </a>
        ))}
        <a href="#contact" className="nav-mobile-cta" onClick={closeMenu}>
          Book a call
          <span className="nav-cta-dot" />
        </a>
      </div>
    </>
  );
}
