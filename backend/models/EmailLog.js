const db = require("../config/db");

const EmailModel = {
  createEmailLog: async ({
    id,
    recipientEmail,
    subject,
    message,
    status,
  }) => {
    const sql = `
      INSERT INTO email_logs (
        id,
        recipient_email,
        subject,
        message,
        status
      )
      VALUES (?, ?, ?, ?, ?)
    `;

    return new Promise((resolve, reject) => {
      db.query(
        sql,
        [id, recipientEmail, subject, message, status],
        (err, result) => {
          if (err) return reject(err);

          resolve(result);
        }
      );
    });
  },
};

module.exports = EmailModel;