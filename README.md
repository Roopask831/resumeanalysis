# ResumeLens — AI Resume Optimizer

A React web app that analyzes your resume against a job description using Claude AI.
Returns an ATS score, keyword gaps, and specific recommended changes.

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm start

# 3. Open http://localhost:3000
```

Get an Anthropic API key at https://console.anthropic.com — it's free to start.

---

## Project Structure

```
resume-optimizer/
├── public/
│   └── index.html          ← The single HTML page React mounts into
│
├── src/
│   ├── index.js            ← Entry point: mounts <App> into #root
│   ├── App.jsx             ← Root component: owns all state & logic
│   │
│   ├── components/
│   │   ├── Navbar.jsx      ← Sticky top bar with logo
│   │   ├── Hero.jsx        ← Headline + stats bar
│   │   ├── InputSection.jsx← Resume/job textareas + analyze button
│   │   ├── ScoreRing.jsx   ← Reusable animated SVG score ring
│   │   ├── Results.jsx     ← Full analysis output display
│   │   └── HowItWorks.jsx  ← 3-step explainer section
│   │
│   ├── services/
│   │   └── claudeApi.js    ← All Claude API call logic lives here
│   │
│   └── styles/
│       ├── global.css      ← CSS variables, resets, animations
│       ├── Navbar.css
│       ├── Hero.css
│       ├── InputSection.css
│       ├── Results.css
│       └── Layout.css      ← HowItWorks + Footer + page-wrap
│
└── package.json
```

---

## How the Logic Works

### 1. State lives in App.jsx
All data that can change (resume text, results, loading state) is stored
as `useState` in the root `App` component. This is called "lifting state up."

### 2. Props flow downward
App passes values and functions to children as props:
```
App (owns state)
 └── InputSection receives: resume, jobDesc, apiKey, onAnalyze, loading, error
 └── Results      receives: result, onReset
```

### 3. User types → onChange → state updates → re-render
Each textarea is a "controlled component":
```jsx
<textarea value={resume} onChange={e => setResume(e.target.value)} />
```
React controls the value. Every keystroke updates state and re-renders.

### 4. User clicks Analyze → handleAnalyze() fires
1. Validates inputs
2. Sets `loading = true` (button shows spinner)
3. Calls `analyzeResume()` from `services/claudeApi.js`
4. On success: sets `result` state → Results component appears
5. On error: sets `error` state → error message appears
6. Finally: sets `loading = false`

### 5. API call in claudeApi.js
Sends a structured prompt to Claude asking for JSON back.
The prompt specifies exact field names so we can reliably parse the response.
Strips any ```json fences Claude might add before JSON.parse().

### 6. ScoreRing animation
Uses `useEffect` + a `ref` to set `stroke-dasharray` on the SVG circle
after render. CSS `transition` animates the ring filling up smoothly.

---

## Key React Concepts Used

| Concept | Where | What it does |
|---|---|---|
| `useState` | App.jsx | Stores values that trigger re-renders |
| `useEffect` | ScoreRing.jsx | Runs code after render (animates ring) |
| `useRef` | App.jsx, ScoreRing.jsx | Direct DOM access without re-render |
| Props | All components | Pass data parent → child |
| Conditional render | App.jsx | `{result && <Results />}` |
| `.map()` | Results.jsx, Hero.jsx | Render arrays of JSX elements |
| Controlled inputs | InputSection.jsx | React owns input values |
| Async/await | App.jsx, claudeApi.js | Handle API calls cleanly |
