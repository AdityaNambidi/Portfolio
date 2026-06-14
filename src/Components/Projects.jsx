import { projects } from '../data/content';
import FeaturedWork from './FeaturedWork';
import './styles/Projects.css';

export default function Projects() {
  return (
    <section id="work" className="projects">
      <div className="section-inner">
        <div data-reveal className="projects-header">
          <div>
            <div className="section-label">(03) — Selected work</div>
            <h2 className="section-title">Shipped &amp;<br />running.</h2>
          </div>
          <span className="projects-count">09 projects in production</span>
        </div>

        {/* 3D perspective tilt terminal showcase */}
        <FeaturedWork />

        <div className="project-stack">
          {projects.map((p) => (
            <div
              key={p.n}
              className="project-stack-item"
              style={{ top: `${p.stickyTop}px` }}
            >
              <article
                data-project-card
                data-reveal
                data-delay={p.delay}
                className={`project-card${p.variant ? ` project-card--${p.variant}` : ''}`}
              >
                <div className="project-card-num">{p.n}</div>
                <div className={`project-card-body${p.img ? ' project-card-body--has-img' : ''}`}>
                  <div className="project-card-content">
                    <div className="project-card-meta">
                      <span className="project-card-shot">▣ {p.shot}</span>
                      <span className="project-card-metric">{p.metric}</span>
                    </div>
                    <h3 className="project-card-title">{p.title}</h3>
                    <p className="project-card-blurb">{p.blurb}</p>
                    <div className="project-card-tags">
                      {p.tags.map((t) => (
                        <span key={t} className="project-tag">{t}</span>
                      ))}
                    </div>
                  </div>
                  {p.img && (
                    <div className="project-card-img-wrap">
                      <img src={p.img} alt={p.title} className="project-card-img" />
                    </div>
                  )}
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
