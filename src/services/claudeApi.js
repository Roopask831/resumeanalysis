const API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export async function analyzeResume(resume, jobDesc) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.REACT_APP_GROQ_KEY}`
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 1500,
      messages: [
        { role: 'user', content: buildPrompt(resume, jobDesc) }
      ]
    })
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error?.message || `API error ${response.status}`);
  }

  const data = await response.json();
  const raw = data.choices[0].message.content;
  const clean = raw.replace(/```json|```/g, '').trim();

  try {
    return JSON.parse(clean);
  } catch {
    throw new Error('Unexpected response format. Please try again.');
  }
}

function buildPrompt(resume, jobDesc) {
  return `You are an expert ATS analyst and career coach.

Analyze this resume against the job description. Respond ONLY with a valid JSON object, no markdown, no explanation:

{
  "ats_score": <integer 0-100>,
  "keyword_match_score": <integer 0-100>,
  "readability_score": <integer 0-100>,
  "matched_keywords": [<up to 12 keywords found in both resume and job description>],
  "missing_keywords": [<up to 12 important keywords from job description missing in resume>],
  "changes": [
    {
      "type": "critical" or "important" or "suggestion",
      "title": "<short title>",
      "detail": "<specific actionable advice>"
    }
  ],
  "summary": "<2-3 sentence honest overall assessment>"
}

RESUME:
${resume}

JOB DESCRIPTION:
${jobDesc}`;
}