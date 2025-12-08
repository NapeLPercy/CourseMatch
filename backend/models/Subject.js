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
    console.log("In the mode, get student subject by id",studentId);
    const sql = "SELECT * FROM subject WHERE student_id = ?";

    return new Promise((resolve, reject) => {
      db.query(sql, [studentId], (err, result) => {
        if (err) return reject(err);
        console.log("In the mode, get student subject by id",result);
        resolve(result);
      });
    });
  }
};
