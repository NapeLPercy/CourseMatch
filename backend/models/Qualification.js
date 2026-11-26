const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

//insert qualifications and pre-requiste subjects list
module.exports = {
  insertQualificationWithPrereqs: async (payload) => {
    const {
      fac_id,
      code,
      name,
      nqf,
      mode_of_study,
      minaps,
      min_endorsement,
      min_duration,
      prerequisites = [],
    } = payload;

    const connection = await new Promise((resolve, reject) => {
      db.getConnection((err, conn) => {
        if (err) return reject(err);
        resolve(conn);
      });
    });

    const conn = connection.promise();

    try {
      await conn.beginTransaction();

      const qualificationSql = `
      INSERT INTO qualification
        (code, name, minimum_aps, nqf, mode_of_study,
         minimum_endorsement, minimum_duration, faculty_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

      await conn.query(qualificationSql, [
        code,
        name,
        minaps,
        nqf,
        mode_of_study,
        min_endorsement,
        min_duration,
        fac_id,
      ]);

      if (prerequisites.length > 0) {
        // Look up subject IDs from the master catalogue
        const subjectNames = prerequisites.map((p) => p.name.trim());

        const [subjects] = await conn.query(
          `SELECT subject_id, name FROM subject WHERE name IN (?)`,
          [subjectNames],
        );

        const subjectMap = new Map(subjects.map((s) => [s.name, s.subject_id]));

        // Ensure every prerequisite exists in the catalogue
        const missingSubjects = subjectNames.filter(
          (name) => !subjectMap.has(name),
        );

        if (missingSubjects.length > 0) {
          throw new Error(
            `Subjects not found in master catalogue: ${missingSubjects.join(", ")}`,
          );
        }

        const prereqValues = prerequisites.map((p) => [
          code,
          subjectMap.get(p.name.trim()),
          p.min_mark,
        ]);

        const prereqSql = `
        INSERT INTO qualification_subject
          (qualification_code, subject_id, minimum_mark)
        VALUES ?
      `;

        await conn.query(prereqSql, [prereqValues]);
      }

      await conn.commit();

      return { success: true };
    } catch (error) {
      await conn.rollback();
      throw error;
    } finally {
      connection.release();
    }
  },

  //get all courses & prereq
  getAllQualificationsWithPrereqs: async () => {
    const sql = `
      SELECT
        q.code                         AS qualification_code,
        q.name                         AS qualification_name,
        q.minimum_aps                  AS minimum_aps,
        q.nqf                          AS qualification_nqf,
        q.minimum_endorsement          AS minimum_endorsement,
        q.minimum_duration             AS minimum_duration,

        f.faculty_id                   AS faculty_id,
        f.name                         AS faculty_name,
        f.University_Abbreviation      AS university_abbreviation,

        u.name                         AS university_name,
        u.url                          AS university_url,
        
        s.subject_id AS subject_id,
        s.name AS subject_name,
        qs.minimum_mark AS minimum_mark

      FROM qualification q
      JOIN faculty f
        ON f.faculty_id = q.faculty_id
      JOIN university u
        ON u.abbreaviation = f.University_Abbreviation

      LEFT JOIN qualification_subject qs
      ON qs.qualification_code = q.code
      LEFT JOIN subject s
    ON s.subject_id = qs.subject_id
      ORDER BY u.abbreaviation, f.faculty_id, q.code, s.name;
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
              nqf: r.qualification_nqf,
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

          // Add prereq only if it exists
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

  getQualificationsByFilter: async (whereClause) => {
    const sql = `
    SELECT
      q.code                         AS qualification_code,
      q.name                         AS qualification_name,
      q.minimum_aps                  AS minimum_aps,
      q.nqf                          AS qualification_nqf,
      q.minimum_endorsement          AS minimum_endorsement,
      q.minimum_duration             AS minimum_duration,

      f.faculty_id                   AS faculty_id,
      f.name                         AS faculty_name,
      f.University_Abbreviation      AS university_abbreviation,

      u.name                         AS university_name,
      u.url                          AS university_url,

      s.subject_id AS subject_id,
      s.name AS subject_name,
      qs.minimum_mark AS minimum_mark

    FROM qualification q
    JOIN faculty f
      ON f.faculty_id = q.faculty_id
    JOIN university u
      ON u.abbreaviation = f.University_Abbreviation
   
    LEFT JOIN qualification_subject qs
    ON qs.qualification_code = q.code
    LEFT JOIN subject s
    ON s.subject_id = qs.subject_id

    WHERE ${whereClause}

    ORDER BY
      u.abbreaviation,
      f.faculty_id,
      q.code,
      s.name;
  `;

    return new Promise((resolve, reject) => {
      db.query(sql, (err, rows) => {
        if (err) return reject(err);

        const qualificationsMap = {};

        rows.forEach((row) => {
          if (!qualificationsMap[row.qualification_code]) {
            qualificationsMap[row.qualification_code] = {
              qualification_code: row.qualification_code,
              qualification_name: row.qualification_name,
              minimum_aps: row.minimum_aps,
              qualification_nqf: row.qualification_nqf,
              minimum_endorsement: row.minimum_endorsement,
              minimum_duration: row.minimum_duration,

              faculty_id: row.faculty_id,
              faculty_name: row.faculty_name,
              university_abbreviation: row.university_abbreviation,

              university_name: row.university_name,
              university_url: row.university_url,

              prereqs: [],
            };
          }

          if (row.subject_id) {
            qualificationsMap[row.qualification_code].prereqs.push({
              subject_id: row.subject_id,
              subject_name: row.subject_name,
              min_mark: row.minimum_mark,
            });
          }
        });

        resolve(Object.values(qualificationsMap));
      });
    });
  },
  //Delete a qualification
  deleteQualification: async (qualificationCode) => {
    const sql = `DELETE FROM qualification WHERE code = ?`;

    return new Promise((resolve, reject) => {
      db.query(sql, [qualificationCode], (err, result) => {
        if (err) return reject(err);

        resolve({
          affectedRows: result.affectedRows,
        });
      });
    });
  },
};
