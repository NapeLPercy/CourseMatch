const client = require("./openaiClient");

/* 1 Create a prompt
 2 Append data(student personality profile, subjects, qualifications)
*/

function buildCourseComparisonPrompt(
  courseA,
  courseB,
  studentProfile,
  subjects
) {
  return `
You are CourseMatch's expert career comparison AI.

Your task is to compare academic qualifications for a student and determine which qualification is the strongest fit.

You must use:
- the student's personality profile
- the student's academic subjects and marks
- the qualification information provided

--------------------------------------------------

IMPORTANT RULES

- Output MUST be STRICT valid JSON
- Do NOT output markdown
- Do NOT output explanations outside JSON
- Use the actual qualification names in all text
- Be objective but personalized
- Focus on helping the student make a decision
- Be decisive and choose a winner
- Do NOT use labels such as "Course A", "Course B", "Qualification A", or "Qualification B" in the response
- Do NOT repeat qualification descriptions unnecessarily
- Keep recommendations realistic and grounded in the supplied data

--------------------------------------------------

QUALIFICATIONS TO COMPARE

${JSON.stringify([courseA, courseB])}

--------------------------------------------------

STUDENT PROFILE

${JSON.stringify(studentProfile)}

--------------------------------------------------

SUBJECTS

${JSON.stringify(subjects)}

--------------------------------------------------

GENERATE THE FOLLOWING

1. winner
- qualificationName
- reason

2. courseComparisons

Generate one object PER qualification containing:

- qualificationName
- matchScore (0-100)

- advantages
  General benefits and strengths of this qualification.

- comparativeAdvantages
  Reasons this qualification may be a better choice than the other qualification(s) for THIS student specifically.

- challenges
  Realistic difficulties the student may face.

- academicFit
  Observations based on subjects and marks.

- personalityFit
  Observations based on personality profile.

- futureOutlook
  Likely future outcomes if this qualification is chosen.

3. careerComparison

Compare likely career opportunities, industries, growth opportunities and long-term career directions.

4. salaryComparison

Compare likely salary progression.

Include:
- entry
- mid
- senior

5. workEnvironmentComparison

Compare typical working environments, daily responsibilities, collaboration levels, lifestyle and work expectations.

6. decisionFactors

Key trade-offs the student should consider before making a decision.

7. finalRecommendation

A concise recommendation explaining which qualification is the strongest fit and why.

--------------------------------------------------

OUTPUT FORMAT (STRICT)

{
  "winner": {
    "qualificationName": "string",
    "reason": "string"
  },

  "courseComparisons": [
    {
      "qualificationName": "string",

      "matchScore": 0,

      "advantages": [
        "string"
      ],

      "comparativeAdvantages": [
        "string"
      ],

      "challenges": [
        "string"
      ],

      "academicFit": [
        "string"
      ],

      "personalityFit": [
        "string"
      ],

      "futureOutlook": [
        "string"
      ]
    }
  ],

  "careerComparison": [
    "string"
  ],

  "salaryComparison": {
    "entry": "string",
    "mid": "string",
    "senior": "string"
  },

  "workEnvironmentComparison": [
    "string"
  ],

  "decisionFactors": [
    "string"
  ],

  "finalRecommendation": "string"
}

--------------------------------------------------

CRITICAL VALIDATION

- Return ONLY valid JSON
- Do NOT wrap JSON in markdown
- Do NOT include comments
- Do NOT include explanations before or after the JSON
- Ensure courseComparisons contains one object for EACH qualification supplied
- qualificationName values must exactly match the qualification names provided in the input
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
const generateCourseComparison = async (
  courseA,
  courseB,
  studentProfile,
  subjects,
) => {
  const prompt = buildCourseComparisonPrompt(
    courseA,
    courseB,
    studentProfile,
    subjects,
  );
  const response = await client.responses.create({
    model: "gpt-4o",
    input: prompt,
  });

  const text = response.output[0].content[0].text;
  const parsed = safeJsonParse(text);

  return parsed;
};

module.exports = { generateCourseComparison };
