// ============================================================
// SCORE RING COMPONENT
// A reusable SVG circle that fills up based on a score (0–100).
//
// HOW THE SVG RING WORKS:
//   - We draw two circles: a grey background ring + a colored
//     progress ring on top.
//   - stroke-dasharray controls how much of the circle is drawn.
//     e.g. "150 300" means: draw 150px of stroke, skip 300px.
//   - The total circumference = 2 × π × radius ≈ 238px for r=38.
//   - So score 75 → filled = 0.75 × 238 ≈ 179px stroke shown.
//   - CSS transition animates the change smoothly.
// ============================================================

import { useEffect, useRef } from 'react';

function ScoreRing({ score, color }) {
  const ringRef = useRef(null);  // direct reference to the SVG <circle>

  // Geometry
  const radius      = 38;
  const circumference = 2 * Math.PI * radius;  // ≈ 238.76

  // After the component renders (or score changes),
  // update the stroke-dasharray to animate the ring filling up.
  useEffect(() => {
    if (!ringRef.current) return;
    const filled = (score / 100) * circumference;
    // "filled gap" — how much to draw, how much to skip
    ringRef.current.style.strokeDasharray = `${filled} ${circumference}`;
  }, [score, circumference]);

  return (
    // rotate(-90deg) so the ring starts at the top (12 o'clock position)
    // instead of the right (3 o'clock, which is SVG's default 0°)
    <svg
      width="96"
      height="96"
      viewBox="0 0 96 96"
      style={{ transform: 'rotate(-90deg)' }}
    >
      {/* Background grey ring — always full circle */}
      <circle
        cx="48" cy="48" r={radius}
        fill="none"
        stroke="var(--border)"
        strokeWidth="7"
      />
      {/* Colored progress ring — dasharray animated via useEffect */}
      <circle
        ref={ringRef}
        cx="48" cy="48" r={radius}
        fill="none"
        stroke={color}
        strokeWidth="7"
        strokeLinecap="round"
        strokeDasharray="0 300"           /* starts empty */
        style={{ transition: 'stroke-dasharray 1.2s cubic-bezier(.4,0,.2,1)' }}
      />
    </svg>
  );
}

export default ScoreRing;
