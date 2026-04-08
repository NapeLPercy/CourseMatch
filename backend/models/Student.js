// models/Student.js
const db = require("../config/db");

module.exports = {
  //patch student endorsement(during subjects insertion)
  insertStudentEndorsement: async (endorsement, userId) => {
    const sql = `UPDATE student_profile SET endorsement = ? WHERE user_id = ?`;

    return new Promise((resolve, reject) => {
      db.query(sql, [endorsement, userId], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },

  //used to persist initial student data
  createProfile: async (conn, { userId, id, age, grade }) => {
    const sql = `
      INSERT INTO student_profile (id, age, grade, user_id)
      VALUES (?, ?, ?, ?)
    `;
    return new Promise((resolve, reject) => {
      conn.query(sql, [id, age, grade, userId], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },

  //get student basic profile
  getStudentBasicProfileByUserId: async (userId) => {
    const sql = `
    SELECT 
      sp.id AS studentId, 
      u.full_name AS fullName, 
      sp.grade, 
      sp.endorsement 
    FROM student_profile sp
    INNER JOIN user u 
      ON u.id = sp.user_id
    WHERE sp.user_id = ?
  `;

    return new Promise((resolve, reject) => {
      db.query(sql, [userId], (err, result) => {
        if (err) return reject(err);
        resolve(result[0] || null);
      });
    });
  },

  //get complete student profile
  getStudentProfileByUserId: async (userId) => {
    const sql = `SELECT * FROM student_profile WHERE user_id = ? LIMIT 1`;

    return new Promise((resolve, reject) => {
      db.query(sql, [userId], (err, rows) => {
        if (err) return reject(err);
        resolve(rows[0] || null);
      });
    });
  },

  //get student id
  getStudentId: async (userId) => {
    const sql = `SELECT id FROM student_profile WHERE user_id = ?`;

    return new Promise((resolve, reject) => {
      db.query(sql, [userId], (err, rows) => {
        if (err) return reject(err);
        resolve(rows[0] || null);
      });
    });
  },

  // Patch student's complete profile info
  updateStudentProfile: async (userId, profile) => {
    const sql = `
    UPDATE student_profile
    SET
      dream_job = ?,
      aspiration = ?,
      goals = ?,
      strengths = ?,
      weaknesses = ?,
      hobbies = ?,
      enjoyed_subjects = ?,
      disliked_subjects = ?,
      work_style = ?,
      problem_solving_approach = ?,
      preferred_environment = ?
    WHERE user_id = ?
  `;

    const params = [
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
