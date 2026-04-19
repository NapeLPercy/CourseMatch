const client = require("./openaiClient");

/* 1 Create a prompt
 2 Append data(student personality profile, subjects, qualification)
*/

function buildDeepDivePrompt({ qualification, studentProfile, subjects }) {
  return `
You are an CourseMatch's expert career advisor AI.

Your task is to generate a personalized "deep dive" analysis for a student based on:
- their qualification (course)
- their academic subjects and marks
- their personality profile

IMPORTANT:
- The response MUST be strictly valid JSON
- Do NOT include any text outside the JSON
- Do NOT include explanations before or after the JSON

---

Generate the following fields:

1. summary:
A personalized, future-focused explanation of how this course fits the student's
 personality profile and what their future could look like. Do NOT repeat input data directly.

2. challenges:
A realistic paragraph describing difficulties the student may face in this field, based on their personality profile.

3. career_paths:
An array of 3–5 career options. Each must include:
- title
- description

4. companies:
An array of real companies relevant to this field, preferably in South Africa.

5. salary:
An object with:
- entry
- mid
- senior

6. how_to_excel:
An array of actionable steps tailored to the student's strengths and personality.

7. alternatives:
An array of related alternative courses(3-5).

---

STUDENT DATA:

Qualification:
${JSON.stringify(qualification)}

Personality Profile:
${JSON.stringify(studentProfile)}

Subjects:
${JSON.stringify(subjects)}

---

OUTPUT FORMAT (STRICT):

{
  "summary": "string",
  "challenges": "string",
  "careerPaths": [
    { "title": "string", "description": "string" }
  ],
  "companies": ["string"],
  "salary": {
    "entry": "string",
    "mid": "string",
    "senior": "string"
  },
  "howToExcel": ["string"],
  "alternatives": ["string"]
}
`.trim();
}

// Handles cases where model accidentally adds text around JSON.
function safeJsonParse(text) {
  const first = text.indexOf("{");
  const last = text.lastIndexOf("}");
  if (first === -1 || last === -1 || last <= first)
    throw new Error("No JSON object found in AI output");
  const json = text.slice(first, last + 1);
  return JSON.parse(json);
}

//send request to openAI
const generateDeepDive = async ({
  qualification,
  profile: studentProfile,
  subjects,
}) => {
  const prompt = buildDeepDivePrompt({
    qualification,
    studentProfile,
    subjects,
  });

  const response = await client.responses.create({
    model: "gpt-4o",
    input: prompt,
  });

  const text = response.output[0].content[0].text;
  const parsed = safeJsonParse(text);

  return parsed;
};

module.exports = { generateDeepDive };
