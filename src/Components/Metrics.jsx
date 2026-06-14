import { metrics } from '../data/content';
import './styles/Metrics.css';

export default function Metrics() {
  return (
    <section className="metrics">
      <div className="section-inner metrics-grid">
        {metrics.map((mt, i) => (
          <div key={mt.label} data-reveal data-delay={i * 70} className="metric-item">
            <div className="metric-value">
              <span data-count={mt.num}>0</span>
              <span className="metric-suffix">{mt.suffix}</span>
            </div>
            <div className="metric-label">{mt.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
