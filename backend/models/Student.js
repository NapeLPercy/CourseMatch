// models/Student.js
const db = require("../config/db");

module.exports = {
  createStudent: async (studentId, endorsement, userId) => {
    const sql = `
      INSERT INTO student (student_id, endorsement, user_id)
      VALUES (?, ?, ?)
    `;

    return new Promise((resolve, reject) => {
      db.query(sql, [studentId, endorsement, userId], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },

  getStudentInfo: async (userId) => {
    const sql =
      "SELECT student_id AS studentId, endorsement FROM student WHERE user_id = ?";
    return new Promise((resolve, reject) => {
      db.query(sql, [userId], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },
};
