const db = require("../config/db");

module.exports = {
  // Insert student's subjects
  insertSubjects: async (subjectValues) => {
    const sql = `
      INSERT INTO student_subject (
        student_id,
        subject_id,
        mark,
        endorsement_subject
      )
      VALUES ?
    `;

    return new Promise((resolve, reject) => {
      db.query(sql, [subjectValues], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },

  // Check if student has submitted subjects
  subjectsExist: async (studentId) => {
    const sql = `
      SELECT 1
      FROM student_subject
      WHERE student_id = ?
      LIMIT 1
    `;

    return new Promise((resolve, reject) => {
      db.query(sql, [studentId], (err, rows) => {
        if (err) return reject(err);
        resolve(rows.length > 0);
      });
    });
  },

  // Get student's subjects
  getSubjectsByStudentIdForUser: async (studentId) => {
    const sql = `
      SELECT
        ss.subject_id AS id,
        s.name,
        ss.mark
      FROM student_subject ss
      JOIN subject s
        ON ss.subject_id = s.subject_id
      WHERE ss.student_id = ?
    `;

    return new Promise((resolve, reject) => {
      db.query(sql, [studentId], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },

  // Update single mark value
  updateMark: async (studentSubjectId, subjectMark) => {
    const sql = `
      UPDATE student_subject
      SET mark = ?
      WHERE student_subject_id = ?
    `;

    return new Promise((resolve, reject) => {
      db.query(sql, [subjectMark, studentSubjectId], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },
};
