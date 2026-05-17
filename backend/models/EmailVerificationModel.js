const db = require("../config/db");

module.exports = {
  // Create verification token record
  createVerificationToken: async (conn,data) => {
    
    const sql = `
      INSERT INTO email_verification_token
      (id, account_id, token_hash, expires_at)
      VALUES (?, ?, ?, ?)
    `;

    const values = [
      data.id,
      data.account_id,
      data.token_hash,
      data.expires_at,
    ];

    return new Promise((resolve, reject) => {
      conn.query(sql, values, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },

  // Get token record by token hash
  getByTokenHash: async (tokenHash) => {
    const sql = `
      SELECT *
      FROM email_verification_token
      WHERE token_hash = ?
      LIMIT 1
    `;

    return new Promise((resolve, reject) => {
      db.query(sql, [tokenHash], (err, result) => {
        if (err) return reject(err);
        resolve(result[0] || null);
      });
    });
  },

  // Delete token by token hash
  deleteByTokenHash: async (tokenHash) => {
    const sql = `
      DELETE
      FROM email_verification_token
      WHERE token_hash = ?
    `;

    return new Promise((resolve, reject) => {
      db.query(sql, [tokenHash], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },

  // Delete existing tokens for an account
  deleteByAccountId: async (accountId) => {
    const sql = `
      DELETE
      FROM email_verification_token
      WHERE account_id = ?
    `;

    return new Promise((resolve, reject) => {
      db.query(sql, [accountId], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },
};