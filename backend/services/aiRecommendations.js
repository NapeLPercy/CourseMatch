const client = require("./openaiClient");

// -------- Prompt builder lives here --------
function buildFitPrompt({ studentProfile, subjects, courses }) {
  return `
You are CourseMatch's "fit scoring" assistant.
You will receive:
1) A student's personal profile (soft preferences)
2) A list of courses that are ALREADY QUALIFIED (eligibility already checked)
3) A list of subjects(name & marks) they accomplished in Grade 12

Task:
- Make this computations considering student's Subjects, Profile and Qualified Courses
- Score each course 0–100 for "fit" (preferences + strengths alignment + goals alignment)
- Provide a short explanation (1–2 sentences) using ONLY provided data
- Do NOT invent requirements, subjects, or facts
- Keep explanations practical and student-friendly

Return STRICT JSON ONLY in this shape (no markdown):
{
  "results": [
    {
      "qualification_code": "string",
      "qualification_name":"string",
      "fit_score": number,
      "reason": "string"
    }
  ]
}

Rules:
- Include every course exactly once
- Don't add or remove courses
- If profile info is missing, explain with "Not enough info" rather than guessing.

StudentProfile:
${JSON.stringify(studentProfile)}

Courses:
${JSON.stringify(courses)}

Subjects: 
${JSON.stringify(subjects)}

`.trim();
}

function safeJsonParse(text) {
  // Handles cases where model accidentally adds text around JSON.
  const first = text.indexOf("{");
  const last = text.lastIndexOf("}");
  if (first === -1 || last === -1 || last <= first)
    throw new Error("No JSON object found in AI output");
  const json = text.slice(first, last + 1);
  return JSON.parse(json);
}

module.exports = {
  scoreAndExplainFit: async ({ studentProfile, subjects, courses }) => {
    const prompt = buildFitPrompt({ studentProfile, subjects, courses });

    const response = await client.responses.create({
      model: "gpt-4o",
      input: prompt,
    });

    const text = response.output[0].content[0].text;
    const parsed = safeJsonParse(text);
    return parsed.results; // or return parsed if you want the whole object
  },
};
