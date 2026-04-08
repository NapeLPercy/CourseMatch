const db = require("../config/db");

module.exports = {
  // Insert basic tutor proifile
  createTutorProfile: async (
    conn,
    { userId, id, yearsOfExperience, highestQualification },
  ) => {
    const sql = `
      INSERT INTO tutor_profile (id, years_of_experience, highest_qualification, user_id)
      VALUES (?, ?, ?, ?)
    `;

    return new Promise((resolve, reject) => {
      conn.query(
        sql,
        [id, yearsOfExperience, highestQualification, userId],
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        },
      );
    });
  },

  
    getTutorId: async (userId) => {
    const sql = `SELECT id FROM tutor_profile WHERE user_id = ?`;

    return new Promise((resolve, reject) => {
      db.query(sql, [userId], (err, rows) => {
        if (err) return reject(err);
        resolve(rows[0] || null);
      });
    });
  },
};
