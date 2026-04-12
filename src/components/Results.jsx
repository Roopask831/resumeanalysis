// ============================================================
// RESULTS COMPONENT
// Displays the full analysis returned by Claude:
//   - 3 animated score rings
//   - AI summary
//   - Matched / missing keywords
//   - Recommended changes (critical / important / suggestion)
//
// PROPS:
//   - result  → the parsed JSON object from the API
//   - onReset → function to hide results and start over
//
// This component is purely for display ("presentational").
// All data comes in via props; it has no state of its own.
// ============================================================

import ScoreRing from './ScoreRing';
import '../styles/Results.css';

// Config for each score ring: which ring id, color, label, description
const SCORE_CARDS = [
  {
    key:   'ats_score',
    color: 'var(--accent)',
    mod:   'ats',
    name:  'ATS Score',
    desc:  'Applicant Tracking System compatibility',
  },
  {
    key:   'keyword_match_score',
    color: 'var(--blue)',
    mod:   'kw',
    name:  'Keyword Match',
    desc:  'Job description alignment score',
  },
  {
    key:   'readability_score',
    color: 'var(--amber)',
    mod:   'read',
    name:  'Readability',
    desc:  'Structure, clarity & formatting',
  },
];

// Icon and styling config for each change severity type
const CHANGE_CONFIG = {
  critical:   { icon: '⚠', mod: 'critical',   label: 'Critical'   },
  important:  { icon: '●', mod: 'important',  label: 'Important'  },
  suggestion: { icon: '✦', mod: 'suggestion', label: 'Suggestion' },
};

function Results({ result, onReset }) {
  return (
    <section className="results">

      {/* ---- HEADER ---- */}
      <div className="results__header">
        <div className="results__title">
          Analysis Results <span>— see your full report below</span>
        </div>
        <button className="reset-btn" onClick={onReset}>
          ↺ New Analysis
        </button>
      </div>

      {/* ---- SCORE RINGS ---- */}
      <div className="scores-grid">
        {SCORE_CARDS.map(card => (
          <div key={card.key} className={`score-card score-card--${card.mod}`}>
            {/* Ring container: SVG ring + centered number */}
            <div className="ring-wrap">
              {/* ScoreRing draws the SVG and animates it */}
              <ScoreRing score={result[card.key]} color={card.color} />
              {/* Number sits absolutely centered over the SVG */}
              <div className="ring-num" style={{ color: card.color }}>
                {result[card.key]}
              </div>
            </div>
            <div className="score-card__name">{card.name}</div>
            <div className="score-card__desc">{card.desc}</div>
          </div>
        ))}
      </div>

      {/* ---- SUMMARY ---- */}
      <div className="summary-card">
        <div className="summary-card__icon">✦</div>
        <div>
          <div className="summary-card__label">AI Assessment</div>
          <p className="summary-card__text">{result.summary}</p>
        </div>
      </div>

      {/* ---- KEYWORDS GRID ---- */}
      <div className="kw-grid">

        {/* Matched keywords (green) */}
        <div className="kw-card">
          <div className="kw-card__title">
            Matched Keywords
            <span className="kw-badge kw-badge--green">
              {result.matched_keywords?.length ?? 0}
            </span>
          </div>
          <div className="kw-tags">
            {result.matched_keywords?.length
              ? result.matched_keywords.map(kw => (
                  <span key={kw} className="kw-tag kw-tag--found">✓ {kw}</span>
                ))
              : <span style={{ color: 'var(--muted)', fontSize: '13px' }}>None found</span>
            }
          </div>
        </div>

        {/* Missing keywords (red) */}
        <div className="kw-card">
          <div className="kw-card__title">
            Missing Keywords
            <span className="kw-badge kw-badge--red">
              {result.missing_keywords?.length ?? 0}
            </span>
          </div>
          <div className="kw-tags">
            {result.missing_keywords?.length
              ? result.missing_keywords.map(kw => (
                  <span key={kw} className="kw-tag kw-tag--missing">+ {kw}</span>
                ))
              : <span style={{ color: 'var(--muted)', fontSize: '13px' }}>All keywords matched!</span>
            }
          </div>
        </div>

      </div>

      {/* ---- RECOMMENDED CHANGES ---- */}
      <div className="changes-card">
        <div className="changes-card__title">✦ Recommended Changes</div>

        {result.changes?.map((change, i) => {
          // Look up config for this type, fall back to 'suggestion'
          const cfg = CHANGE_CONFIG[change.type] || CHANGE_CONFIG.suggestion;
          return (
            <div key={i} className="change-item">
              {/* Severity icon box */}
              <div className={`change-item__icon change-item__icon--${cfg.mod}`}>
                {cfg.icon}
              </div>
              {/* Text content */}
              <div className="change-item__body">
                <div className="change-item__head">
                  <span className="change-item__name">{change.title}</span>
                  <span className={`change-item__pill change-item__pill--${cfg.mod}`}>
                    {cfg.label}
                  </span>
                </div>
                <p className="change-item__detail">{change.detail}</p>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}

export default Results;
