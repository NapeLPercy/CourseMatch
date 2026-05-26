const db = require("../config/db");

const AiCourseComparisonModel = {
  getById: (id) => {
    const sql = `
      SELECT *
      FROM ai_course_comparisons
      WHERE id = ?
      LIMIT 1
    `;

    return new Promise((resolve, reject) => {
      db.query(sql, [id], (err, results) => {
        if (err) return reject(err);

        resolve(results.length ? results[0] : null);
      });
    });
  },

  getByUserAndCourses: (userId, courseCodes) => {
    const placeholders = courseCodes.map(() => "?").join(",");

    const sql = `
      SELECT c.*
      FROM ai_course_comparisons c
      JOIN course_comparison_courses cc
        ON cc.comparison_id = c.id
      WHERE c.user_id = ?
        AND cc.course_code IN (${placeholders})
      GROUP BY c.id
      HAVING COUNT(DISTINCT cc.course_code) = ?
      LIMIT 1
    `;

    return new Promise((resolve, reject) => {
      db.query(
        sql,
        [userId, ...courseCodes, courseCodes.length],
        (err, results) => {
          if (err) return reject(err);

          resolve(results.length ? results[0] : null);
        }
      );
    });
  },

  insertComparison: (connection, comparison) => {
    const sql = `
      INSERT INTO ai_course_comparisons (
        id,
        user_id,
        comparison_data
      )
      VALUES (?, ?, ?)
    `;

    return new Promise((resolve, reject) => {
      connection.query(
        sql,
        [
          comparison.id,
          comparison.userId,
          JSON.stringify(comparison.comparisonData),
        ],
        (err, results) => {
          if (err) return reject(err);
          resolve(results);
        }
      );
    });
  },

  insertCourseLink: (connection, comparisonId, courseCode) => {
    const sql = `
      INSERT INTO course_comparison_courses (
        comparison_id,
        course_code
      )
      VALUES (?, ?)
    `;

    return new Promise((resolve, reject) => {
      connection.query(
        sql,
        [comparisonId, courseCode],
        (err, results) => {
          if (err) return reject(err);
          resolve(results);
        }
      );
    });
  },
};

module.exports = AiCourseComparisonModel;