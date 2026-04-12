// ============================================================
// HOW IT WORKS COMPONENT
// Simple 3-step explainer section at the bottom of the page.
// Purely presentational — no props, no state.
// ============================================================

import '../styles/Layout.css';

const STEPS = [
  {
    num:   '01',
    title: 'Paste your resume',
    desc:  'Copy-paste your full resume — the more detail, the better the analysis.',
  },
  {
    num:   '02',
    title: 'Add the job description',
    desc:  'Paste the full job posting including requirements and responsibilities.',
  },
  {
    num:   '03',
    title: 'Get your full report',
    desc:  'Instantly see your ATS score, keyword gaps, and specific changes to land more interviews.',
  },
];

function HowItWorks() {
  return (
    <div className="how-section">
      <div className="how-section__title">How it works</div>
      <div className="how-steps">
        {STEPS.map(step => (
          <div key={step.num} className="how-step">
            <div className="how-step__num">{step.num}</div>
            <div className="how-step__title">{step.title}</div>
            <p className="how-step__desc">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HowItWorks;
