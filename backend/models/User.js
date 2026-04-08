const db = require("../config/db");

module.exports = {
  getUser: async (userId) => {
    const sql = `SELECT id from user WHERE id = ?`;

    return new Promise((resolve, reject) => {
      db.query(sql, [userId], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },

  addUser: async (conn, userId) => {
    const sql = `INSERT INTO user (id) VALUES (?)`;

    return new Promise((resolve, reject) => {
      conn.query(sql, [userId], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },

  //insert user profile
  createUserProfile: async (conn, { id, fullName, age, gender }) => {
    const sql = "INSERT INTO user(id, full_name, age, gender) VALUES(?,?,?,?)";

    return new Promise((resolve, reject) => {
      conn.query(sql, [id, fullName, age, gender], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },
};
