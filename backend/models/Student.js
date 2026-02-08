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

  //STUDENT PERSONAL PROFILE
  getStudentProfileByUserId: async (userId) => {
    const sql = `SELECT * FROM student_profile WHERE user_id = ? LIMIT 1`;

    return new Promise((resolve, reject) => {
      db.query(sql, [userId], (err, rows) => {
        if (err) return reject(err);
        resolve(rows[0] || null);
      });
    });
  },

  createStudentProfile: async (userId, profile) => {
    const sql = `
      INSERT INTO student_profile (
        id,
        full_name, age,
        dream_job, aspiration, goals,
        strengths, weaknesses,
        hobbies, enjoyed_subjects, disliked_subjects,
        work_style, problem_solving_approach, preferred_environment, user_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)
    `;

    const params = [
      profile.id,
      profile.fullName ?? null,
      profile.age ?? null,
      profile.dreamJob ?? null,
      profile.aspiration ?? null,
      profile.goals ?? null,
      profile.strengths ?? null,
      profile.weaknesses ?? null,
      profile.hobbies ?? null,
      profile.enjoyedSubjects ?? null,
      profile.dislikedSubjects ?? null,
      profile.workStyle ?? null,
      profile.problemSolvingApproach ?? null,
      profile.preferredEnvironment ?? null,
      userId,
    ];

    return new Promise((resolve, reject) => {
      db.query(sql, params, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },
};

  

