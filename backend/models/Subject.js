const db = require("../config/db");

module.exports = {
  //Insert student's subjects
  insertSubjects: async (subjectValues) => {
    const sql = `
      INSERT INTO subject (subject_id, name, mark,endorsement_subject, student_id)
      VALUES ?
    `;

    return new Promise((resolve, reject) => {
      db.query(sql, [subjectValues], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },

  // Check if recommendations exist
  subjectsExist: async (studentId) => {
    const sql = `
      SELECT 1 
      FROM subject
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

  //Get student's subjects
  getSubjectsByStudentIdForUser: async (studentId) => {
    const sql = `SELECT subject_id AS id, name, mark, endorsement_subject FROM subject WHERE student_id = ?
  `;
    return new Promise((resolve, reject) => {
      db.query(sql, [studentId], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },

  //Update single mark value
  updateMark: async (subjectId, subjectMark) => {
    const sql = "UPDATE subject SET mark=? WHERE subject_id=?";

    return new Promise((resolve, reject) => {
      db.query(sql, [subjectMark, subjectId], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },
};
