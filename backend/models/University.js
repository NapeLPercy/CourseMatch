// models/University.js
const db = require("../config/db");

module.exports = {
  getUniversityCourses: async (universityName) => {
    console.log("Fetching courses for university:", universityName);

    const sql = `
      SELECT 
        c.*,
        ps.subject_name AS prereq_subject,
        ps.minimum_mark AS prereq_min_mark
      FROM university u
      INNER JOIN faculty f 
        ON f.university_abbreviation = u.abbreaviation
      INNER JOIN qualification c 
        ON c.faculty_id = f.faculty_id
      LEFT JOIN prerequisite_subject ps
        ON ps.qualification_code = c.code
      WHERE u.abbreaviation = ?
      ORDER BY c.code;
    `;

    return new Promise((resolve, reject) => {
      db.query(sql, [universityName], (err, result) => {
        if (err) {
          console.error("Error fetching courses:", err);
          return reject(err);
        }

        console.log("Raw course + prereq rows:", result);

        const courseMap = {};

        result.forEach((row) => {
          const code = row.Code; // ✅ correct grouping key

          if (!courseMap[code]) {
            courseMap[code] = {
              qualification_code: row.Code,
              qualification_name: row.Name,
              minimum_duration: row.Minimum_Duration,
              minimum_required: row.Minimum_APS,
              minimum_endorsement: row.Minimum_Endorsement,
              faculty_id: row.Faculty_Id,
              prereqs: [],
            };
          }

          if (row.prereq_subject) {
            courseMap[code].prereqs.push({
              subject: row.prereq_subject,
              min_mark: row.prereq_min_mark,
            });
          }
        });

        resolve(Object.values(courseMap));
      });
    });
  },
};

