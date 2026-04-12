// ============================================================
// INPUT SECTION COMPONENT
// Contains all user inputs:
//   1. Resume textarea
//   2. Job description textarea
//   3. API key input
//   4. Analyze button
//
// PROPS received from App.jsx (parent):
//   - resume, jobDesc, apiKey  → current input values (state)
//   - onResumeChange, onJobChange, onApiKeyChange → updater fns
//   - onAnalyze  → function to call the Claude API
//   - loading    → boolean: true while waiting for API response
//   - error      → string: error message to display (or empty)
//
// PATTERN: "Controlled components"
//   React controls each input's value. When the user types,
//   onChange fires → updates state in App → re-renders with
//   new value. This keeps state as the single source of truth.
// ============================================================

import '../styles/InputSection.css';

function InputSection({
  resume, jobDesc, apiKey,
  onResumeChange, onJobChange, onApiKeyChange,
  onAnalyze, loading, error,
}) {
  return (
    <section className="input-section">

      {/* ---- TWO-COLUMN TEXTAREA GRID ---- */}
      <div className="input-grid">

        {/* Resume input */}
        <div className="input-card">
          <div className="input-card__label">
            <span className="input-card__dot dot--purple" />
            Your Resume
          </div>
          <textarea
            className="input-card__textarea"
            placeholder="Paste your full resume here — work experience, skills, education..."
            value={resume}                    // controlled value from state
            onChange={e => onResumeChange(e.target.value)}  // update on every keystroke
          />
          {/* Live character counter */}
          <div className="input-card__count">
            {resume.length.toLocaleString()} characters
          </div>
        </div>

        {/* Job description input */}
        <div className="input-card">
          <div className="input-card__label">
            <span className="input-card__dot dot--green" />
            Job Description
          </div>
          <textarea
            className="input-card__textarea"
            placeholder="Paste the full job description here — requirements, responsibilities, skills..."
            value={jobDesc}
            onChange={e => onJobChange(e.target.value)}
          />
          <div className="input-card__count">
            {jobDesc.length.toLocaleString()} characters
          </div>
        </div>
      </div>

      {/* ---- ANALYZE BUTTON ---- */}
      <button
        className="analyze-btn"
        onClick={onAnalyze}
        disabled={loading}  // disabled while API call is in-flight
      >
        {/* Conditionally render spinner OR button text */}
        {loading
          ? <><span className="spinner" /> Analyzing…</>
          : '✦ Analyze My Resume'
        }
      </button>

      {/* ---- ERROR MESSAGE ---- */}
      {/* Only render if error string is non-empty */}
      {error && (
        <div className="error-msg">{error}</div>
      )}

    </section>
  );
}

export default InputSection;
