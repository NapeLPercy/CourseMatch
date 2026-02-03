// models/Subject.js
const db = require("../config/db");

module.exports = {
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

  getSubjectsByStudentId: async (studentId) => {

    const sql = "SELECT * FROM subject WHERE student_id = ?";

    return new Promise((resolve, reject) => {
      db.query(sql, [studentId], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },

  updateMark : async (subjectId, subjectMark)=>{
    const sql = "UPDATE subject SET mark=? WHERE subject_id=?";

    return new Promise((resolve, reject) => {
      db.query(sql, [subjectMark, subjectId], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });

  }
};
