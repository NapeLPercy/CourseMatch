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

  //get coursesmatched to student
  getMyMatchedCourses: async (userId) => {
    const sql = `
    SELECT 
        ar.id,
        ar.fit_score,
        ar.reason,

        u.name AS university_name,
        u.abbreaviation,

        q.code AS course_code,
        q.name AS qualification_name,
        q.minimum_aps,
        q.nqf,

        f.name AS faculty_name

    FROM ai_course_recommendations ar

    JOIN qualification q 
        ON ar.course_code = q.code

    JOIN faculty f 
        ON q.faculty_id = f.faculty_id

    JOIN university u 
        ON f.university_abbreviation = u.abbreaviation

    WHERE ar.user_id = ?
    ORDER BY ar.fit_score DESC
  `;

    return new Promise((resolve, reject) => {
      db.query(sql, [userId], (err, rows) => {
        if (err) return reject(err);
        resolve(rows); // return ALL matched courses
      });
    });
  },
};
