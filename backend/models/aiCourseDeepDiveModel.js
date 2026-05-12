const db = require("../config/db");

const aiCourseDeepDiveModel = {
  // CREATE deep dive
  createDeepDive: async (deepDive) => {
    const sql = `
      INSERT INTO ai_course_deep_dives (
        id,
        summary,
        challenges,
        career_paths,
        companies,
        salary,
        how_to_excel,
        alternatives,
        user_id,
        course_code
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      deepDive.id,
      deepDive.summary,
      deepDive.challenges || null,
      JSON.stringify(deepDive.careerPaths || []),
      JSON.stringify(deepDive.companies || []),
      JSON.stringify(deepDive.salary || {}),
      JSON.stringify(deepDive.howToExcel || []),
      JSON.stringify(deepDive.alternatives || []),
      deepDive.userId,
      deepDive.courseId,
    ];

    return new Promise((resolve, reject) => {
      db.query(sql, values, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },

  // GET deep dive (by user + course)
  getDeepDive: async ({ userId, courseId }) => {
    const sql = `
    SELECT *
    FROM ai_course_deep_dives
    WHERE user_id = ? AND course_code = ?
    LIMIT 1
  `;

    return new Promise((resolve, reject) => {
      db.query(sql, [userId, courseId], (err, results) => {
        if (err) return reject(err);

        if (results.length === 0) return resolve(null);

        const row = results[0];

        resolve({
          id: row.id,
          summary: row.summary,
          challenges: row.challenges,

          careerPaths: safeParseJSON(row.career_paths) || [],
          companies: safeParseJSON(row.companies) || [],
          salary: safeParseJSON(row.salary) || {},
          howToExcel: safeParseJSON(row.how_to_excel) || [],
          alternatives: safeParseJSON(row.alternatives) || [],

          createdAt: row.created_at,
          userId: row.user_id,
          courseId: row.course_id,
        });
      });
    });
  },
  // CHECK if deep dive exists
  existsDeepDive: async ({ userId, courseId }) => {
    const sql = `
      SELECT 1
      FROM ai_course_deep_dives
      WHERE user_id = ? AND course_code = ?
      LIMIT 1
    `;

    return new Promise((resolve, reject) => {
      db.query(sql, [userId, courseId], (err, results) => {
        if (err) return reject(err);
        resolve(results.length > 0);
      });
    });
  },
};

function safeParseJSON(value) {
  if (!value) return value;

  // If it's already an object/array → return as is
  if (typeof value === "object") return value;

  // If it's a string → parse it
  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch (e) {
      console.error("JSON parse failed:", value);
      return null;
    }
  }

  return value;
}
module.exports = aiCourseDeepDiveModel;
