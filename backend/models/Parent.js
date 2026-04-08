const db = require("../config/db");

module.exports = {
  createParentProfile: async (conn,{ userId, id, relationshipToStudent, purpose },) => {
    const sql = `
      INSERT INTO parent_profile (id, relationship_with_student, purpose, user_id)
      VALUES (?, ?, ?, ?)
    `;

    return new Promise((resolve, reject) => {
      conn.query(
        sql,
        [id, relationshipToStudent, purpose, userId],
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        },
      );
    });
  },

    getParentId: async (userId) => {
    const sql = `SELECT id FROM parent_profile WHERE user_id = ?`;

    return new Promise((resolve, reject) => {
      db.query(sql, [userId], (err, rows) => {
        if (err) return reject(err);
        resolve(rows[0] || null);
      });
    });
  },
};
