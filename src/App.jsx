import './App.css';
import { useReveal } from './hooks/useReveal';
import { useCountUp } from './hooks/useCountUp';
import { useScrollEngine } from './hooks/useScrollEngine';
import { useCustomCursor, useMagnetic } from './hooks/useCursor';

import CustomCursor from './components/CustomCursor';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Services from './components/Services';
import Process from './components/Process';
import Projects from './components/Projects';
import Metrics from './components/Metrics';
import About from './components/About';
import Contact from './components/Contact';

export default function App() {
  useReveal();
  useCountUp();
  useScrollEngine();
  useCustomCursor();
  useMagnetic();

  return (
    <div className="app-root">
      <CustomCursor />
      <NavBar />
      <Hero />
      <Marquee />
      <About />
      <Process />
      <Projects />
      <Metrics />
      <Services />
      <Contact />
    </div>
  );
}
