const db = require("../config/db");

module.exports = {
  getDashboardAiData: async (userId) => {
    const recommendationSql = `
    SELECT 
      cr.id,
      cr.course_code,
      cr.university_abbrev,
      cr.fit_score,
      cr.created_at,
      cr.reason,
      q.name,
      q.nqf,
      q.minimum_aps
    FROM ai_course_recommendations cr
    INNER JOIN qualification q
    ON cr.course_code = q.code
    WHERE user_id = ?
    ORDER BY created_at DESC
    LIMIT 1
  `;

    const deepDiveSql = `
    SELECT 
      d.id,
      d.course_code,
      d.description,
      d.created_at,
      q.name,
      q.nqf,
      q.minimum_aps
    FROM ai_course_deep_dives d
    INNER JOIN qualification q
      ON d.course_code = q.code
    WHERE d.user_id = ?
    ORDER BY d.created_at DESC
    LIMIT 1
  `;

    const comparisonSql = `
    SELECT 
      id,
      comparison_data,
      created_at
    FROM ai_course_comparisons
    WHERE user_id = ?
    ORDER BY created_at DESC
    LIMIT 1
  `;

    return new Promise((resolve, reject) => {
      db.query(recommendationSql, [userId], (err, recommendations) => {
        if (err) return reject(err);

        db.query(deepDiveSql, [userId], (err, deepDive) => {
          if (err) return reject(err);

          db.query(comparisonSql, [userId], (err, comparisons) => {
            if (err) return reject(err);

            resolve({
              recommendation: recommendations[0] || null,
              deepDive: deepDive[0] || null,
              comparison: comparisons[0] || null,
            });
          });
        });
      });
    });
  },
};
