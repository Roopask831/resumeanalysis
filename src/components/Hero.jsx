// ============================================================
// HERO COMPONENT
// The top section: headline, subtext, and stats bar.
// This is purely presentational — no logic, just JSX + CSS.
// ============================================================

import '../styles/Hero.css';

// Static stats shown in the bar below the headline.
// Using an array of objects so we can .map() over them
// instead of repeating JSX manually for each stat.
const STATS = [
  { num: '98%',  label: 'ATS Accuracy' },
  { num: '3',    label: 'Key Scores'   },
  { num: '10s',  label: 'Analysis Time'},
  { num: 'Free', label: 'No Sign-up'   },
];

function Hero() {
  return (
    <>
      {/* ---- HERO TEXT ---- */}
      <section className="hero" id="top">

        {/* clamp() in CSS makes the font scale fluidly with viewport */}
        <h1 className="hero__title">
          Beat the ATS.<br />
          <em>Land the interview.</em>   {/* <em> gets gradient text via CSS */}
        </h1>

        <p className="hero__subtitle">
          Paste your resume and any job description. Get your ATS score,
          missing keywords, and exact changes to make — in seconds.
        </p>
      </section>

      {/* ---- STATS BAR ---- */}
      <div className="stats-bar">
        {STATS.map((stat, index) => (
          // React.Fragment lets us return two sibling elements
          // without adding an extra <div> to the DOM
          <React.Fragment key={stat.label}>
            <div className="stat-item">
              <div className="stat-item__num">{stat.num}</div>
              <div className="stat-item__lbl">{stat.label}</div>
            </div>
            {/* Add a vertical divider after every stat except the last */}
            {index < STATS.length - 1 && (
              <div className="stat-divider" />
            )}
          </React.Fragment>
        ))}
      </div>
    </>
  );
}

// We need React in scope for React.Fragment
import React from 'react';

export default Hero;
