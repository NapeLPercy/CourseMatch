// models/University.js
const db = require("../config/db");

module.exports = {
  //add university and courses
    addUniversityWithFaculties: async ({ abbreviation, name, url, faculties }) => {
    // faculties = ["Faculty of X", "Faculty of Y", ...]
    return new Promise((resolve, reject) => {
      db.getConnection((err, connection) => {
        if (err) return reject(err);

        const conn = connection.promise();

        connection.beginTransaction(async (err) => {
          if (err) {
            connection.release();
            return reject(err);
          }

          const rollback = (e) =>
            connection.rollback(() => {
              connection.release();
              reject(e);
            });

          try {
            // 1) Insert university
            const uniSql = `
              INSERT INTO university (abbreaviation, name, url)
              VALUES (?, ?, ?)
            `;
            await conn.query(uniSql, [abbreviation, name, url]);

            // 2) Insert faculties (bulk)
            if (Array.isArray(faculties) && faculties.length > 0) {
              const facSql = `
                INSERT INTO faculty (name, university_abbreviation)
                VALUES ?
              `;

              const values = faculties.map((facName) => [
                facName.name,
                abbreviation,
              ]);


              await conn.query(facSql, [values]);
            }

            // 3) Commit
            connection.commit((err) => {
              if (err) return rollback(err);

              connection.release();
              resolve({ success: true });
            });
          } catch (e) {
            rollback(e);
          }
        });
      });
    });
  },
  //get courses for a specific university
  getUniversityCourses: async (universityName) => {
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

        const courseMap = {};

        result.forEach((row) => {
          const code = row.Code; //

          if (!courseMap[code]) {
            courseMap[code] = {
              qualification_code: row.Code,
              qualification_name: row.Name,
              minimum_duration: row.Minimum_Duration,
              minimum_aps: row.Minimum_APS,
              minimum_endorsement: row.Minimum_Endorsement,
              faculty_id: row.Faculty_Id,
              prereqs: [],
            };
          }

          if (row.prereq_subject) {
            courseMap[code].prereqs.push({
              subject_name: row.prereq_subject,
              min_mark: row.prereq_min_mark,
            });
          }
        });

        resolve(Object.values(courseMap));
      });
    });
  },

  //get all universities & faculties
  getUniversitiesWithFaculties: async () => {
    const sql = `
      SELECT
        u.abbreaviation        AS university_abbreviation,
        u.name                AS university_name,
        u.url                 AS university_url,
        f.faculty_id,
        f.name                AS faculty_name
      FROM university u
      LEFT JOIN faculty f
        ON f.University_Abbreviation = u.abbreaviation
      ORDER BY u.abbreaviation, f.faculty_id
    `;

    return new Promise((resolve, reject) => {
      db.query(sql, (err, rows) => {
        if (err) return reject(err);

        // Transform flat rows → nested structure
        const map = new Map();

        rows.forEach((row) => {
          const uniKey = row.university_abbreviation;

          if (!map.has(uniKey)) {
            map.set(uniKey, {
              abbreviation: row.university_abbreviation,
              name: row.university_name,
              url: row.university_url,
              faculties: [],
            });
          }

          if (row.faculty_id) {
            map.get(uniKey).faculties.push({
              faculty_id: row.faculty_id,
              name: row.faculty_name,
            });
          }
        });

        resolve(Array.from(map.values()));
      });
    });
  },

  //delete university and its data
  deleteUniversity: async (universityAbbrev) => {
    console.log("her we are ",universityAbbrev);
    const sql = "DELETE FROM university WHERE abbreaviation = ?";
    return new Promise((resolve, reject) => {
      db.query(sql, [universityAbbrev], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },
};
