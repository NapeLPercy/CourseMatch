const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  insertQualificationWithPrereqs: async (payload) => {
    const {
      fac_id,
      code,
      name,
      minaps,
      min_endorsement,
      min_duration,
      prerequisites = [],
    } = payload;

    return new Promise((resolve, reject) => {
      db.getConnection((err, connection) => {
        if (err) return reject(err);

        // promise wrapper
        const conn = connection.promise();

        connection.beginTransaction(async (err) => {
          if (err) {
            connection.release();
            return reject(err);
          }

          try {
            // Insert qualification
            const qualificationSql = `
              INSERT INTO qualification
                (code, name, minimum_aps, minimum_endorsement, minimum_duration, faculty_id)
              VALUES (?, ?, ?, ?, ?, ?)
            `;

            await conn.query(qualificationSql, [
              code,
              name,
              minaps,
              min_endorsement,
              min_duration,
              fac_id,
            ]);

            // Insert prerequisites (bulk)
            if (prerequisites.length > 0) {
              const prereqSql = `
                INSERT INTO prerequisite_subject
                  (subject_id, subject_name, minimum_mark, qualification_code)
                VALUES ?
              `;

              // generate a unique id per row
              const prereqValues = prerequisites.map((p) => [
                uuidv4(),
                p.name,
                p.min_mark,
                code,
              ]);

              await conn.query(prereqSql, [prereqValues]);
            }

            // Commit
            connection.commit((err) => {
              if (err) {
                return connection.rollback(() => {
                  connection.release();
                  reject(err);
                });
              }

              connection.release();
              resolve({ success: true });
            });
          } catch (e) {
            connection.rollback(() => {
              connection.release();
              reject(e);
            });
          }
        });
      });
    });
  },

  //get all courses & prereq
   getAllQualificationsWithPrereqs: async () => {
    const sql = `
      SELECT
        q.code                         AS qualification_code,
        q.name                         AS qualification_name,
        q.minimum_aps                  AS minimum_aps,
        q.minimum_endorsement          AS minimum_endorsement,
        q.minimum_duration             AS minimum_duration,

        f.faculty_id                   AS faculty_id,
        f.name                         AS faculty_name,
        f.University_Abbreviation      AS university_abbreviation,

        u.name                         AS university_name,
        u.url                          AS university_url,

        ps.subject_id                  AS subject_id,
        ps.subject_name                AS subject_name,
        ps.minimum_mark                AS minimum_mark

      FROM qualification q
      JOIN faculty f
        ON f.faculty_id = q.faculty_id
      JOIN university u
        ON u.abbreaviation = f.University_Abbreviation

      LEFT JOIN prerequisite_subject ps
        ON ps.qualification_code = q.code

      ORDER BY u.abbreaviation, f.faculty_id, q.code, ps.subject_name;
    `;

    return new Promise((resolve, reject) => {
      db.query(sql, (err, rows) => {
        if (err) return reject(err);

        const map = new Map();

        for (const r of rows) {
          const key = r.qualification_code;

          if (!map.has(key)) {
            map.set(key, {
              code: r.qualification_code,
              name: r.qualification_name,
              minimum_aps: r.minimum_aps,
              minimum_endorsement: r.minimum_endorsement,
              minimum_duration: r.minimum_duration,

              faculty: {
                faculty_id: r.faculty_id,
                name: r.faculty_name,
                university_abbreviation: r.university_abbreviation,
              },

              university: {
                abbreviation: r.university_abbreviation,
                name: r.university_name,
                url: r.university_url,
              },

              prerequisites: [],
            });
          }

          // Add prereq only if it exists (LEFT JOIN may return nulls)
          if (r.subject_id) {
            map.get(key).prerequisites.push({
              subject_id: r.subject_id,
              subject_name: r.subject_name,
              minimum_mark: r.minimum_mark,
            });
          }
        }

        resolve(Array.from(map.values()));
      });
    });
  },
};

