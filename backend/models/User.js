const db = require("../config/db");

module.exports = {
 getUser: async (userId) => {
    const sql = `
      SELECT id from user WHERE id = ?
    `;

    return new Promise((resolve, reject) => {
      db.query(sql, [userId], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }
};
