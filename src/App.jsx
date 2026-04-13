// ============================================================
// APP.JSX — ROOT COMPONENT
//
// This is the "brain" of the entire application.
// It owns ALL the state and passes data + functions down
// to child components via props.
//
// COMPONENT TREE:
//   App
//   ├── Navbar
//   ├── (page-wrap div)
//   │   ├── Hero
//   │   ├── InputSection   ← receives state + handlers as props
//   │   ├── Results        ← receives result data as props (if exists)
//   │   ├── HowItWorks
//   │   └── footer
//
// STATE MANAGEMENT (useState):
//   React's useState hook stores values that, when changed,
//   cause the component to re-render with the new value.
//   Format: const [value, setValue] = useState(initialValue)
//
// DATA FLOW:
//   State lives here in App → passed DOWN to children via props.
//   Children fire callbacks (like onAnalyze) to trigger changes.
//   This is called "lifting state up" — a core React pattern.
// ============================================================

import { useState, useRef } from 'react';

import Navbar      from './components/Navbar';
import Hero        from './components/Hero';
import InputSection from './components/InputSection';
import Results     from './components/Results';
import HowItWorks  from './components/HowItWorks';

import { analyzeResume } from './services/claudeApi';

import './styles/Layout.css';

function App() {

  // ---- STATE ----
  // Each piece of state below controls a different part of the UI.

  const [resume,  setResume]  = useState(''); // resume textarea value
  const [jobDesc, setJobDesc] = useState(''); // job description textarea value
 
  const [loading, setLoading] = useState(false); // true while API call is in-flight
  const [error,   setError]   = useState('');    // error message string (empty = no error)
  const [result,  setResult]  = useState(null);  // parsed JSON result from Claude (null = no result yet)

  // A ref to the results section so we can scroll to it after analysis
  const resultsRef = useRef(null);

  // ---- VALIDATE INPUTS ----
  // Before calling the API, make sure all fields are filled.
  // Returns an error string, or empty string if all good.
  function validate() {
    if (!resume.trim())  return 'Please paste your resume.';
    if (!jobDesc.trim()) return 'Please paste the job description.';
    return '';
  }

  // ---- HANDLE ANALYZE ----
  // This function is called when the user clicks "Analyze My Resume".
  // It's async because it awaits the API call.
  async function handleAnalyze() {
    // 1. Validate
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    // 2. Set loading state (disables button, shows spinner)
    setError('');
    setLoading(true);
    setResult(null); // clear any previous result

    try {
      // 3. Call the API service (defined in services/claudeApi.js)
      const data = await analyzeResume(resume, jobDesc);

      // 4. Store the result in state → triggers re-render → Results component appears
      setResult(data);

      // 5. Scroll smoothly to the results section
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);

    } catch (err) {
      // If anything goes wrong, show the error message
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      // Always turn off loading, whether success or error
      setLoading(false);
    }
  }

  // ---- HANDLE RESET ----
  // Clears the result so the user can start a new analysis.
  // (Inputs stay filled so the user can easily modify them.)
  function handleReset() {
    setResult(null);
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ---- RENDER ----
  // JSX is HTML-like syntax that React compiles to JavaScript.
  // Components are used like HTML tags: <Navbar />, <Hero />, etc.
  return (
    <>
      {/* Navbar sits outside the page-wrap so it's full-width */}
      <Navbar />

      {/* page-wrap centers content and adds horizontal padding */}
      <div className="page-wrap">

        {/* Hero: headline + stats bar */}
        <Hero />

        {/* Input form: textareas + API key + button
            We pass down state values AND setter functions as props */}
        <InputSection
          resume={resume}
          jobDesc={jobDesc}        
          onResumeChange={setResume}
          onJobChange={setJobDesc}
          onAnalyze={handleAnalyze}
          loading={loading}
          error={error}
        />

        {/* Results section — only renders if we have a result */}
        {result && (
          <div ref={resultsRef}>
            <Results result={result} onReset={handleReset} />
          </div>
        )}

        {/* Static explainer section */}
        <HowItWorks />

        {/* Footer */}
        <footer>
          <div className="footer__inner">
            <div className="footer__logo">
              ResumeLens
              <span className="footer__logo-dot" />
            </div>
            <div className="footer__note">
              Your data is never stored.
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}

export default App;
