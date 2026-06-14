import { marqueeItems } from '../data/content';
import './styles/Marquee.css';

export default function Marquee() {
  const items = marqueeItems.map((m) => (
    <span key={m} className="marquee-item">
      {m}
      <span className="marquee-star">✳</span>
    </span>
  ));

  return (
    <div className="marquee">
      <div className="marquee-track" data-marquee-track>
        <div className="marquee-set">{items}</div>
        <div className="marquee-set" aria-hidden="true">{items}</div>
      </div>
    </div>
  );
}
