const db = require("../config/db");

module.exports = {
  //Patch a user role, used during onboarding
  updateAccountRole: async (conn, { userId, role }) => {
    const sql = `UPDATE account SET role = ? WHERE user_id = ?`;

    return new Promise((resolve, reject) => {
      conn.query(sql, [role, userId], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },

  //Checks whether or not an email is registered
  checkAccountByEmail: async (email) => {
    const sql = `SELECT id FROM account WHERE email = ?`;

    return new Promise((resolve, reject) => {
      db.query(sql, [email], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },

  //Login user
  login: async (email) => {
    const sql = `SELECT id,role,user_id, email, password FROM account WHERE email = ?`;

    return new Promise((resolve, reject) => {
      db.query(sql, [email], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },

  // Add user account, email uniqueness already confirmed
  addAccount: async (conn, { accountId, email, hashedPassword, userId }) => {
    const sql = `INSERT INTO account (id, email, password, user_id) VALUES (?, ?, ?, ?)`;
    return new Promise((resolve, reject) => {
      conn.query(
        sql,
        [accountId, email, hashedPassword, userId],
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        },
      );
    });
  },
};
