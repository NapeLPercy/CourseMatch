// models/prospectusModel.js

const db = require("../config/db");

const addProspectus = (prospectusValues) => {
  const sql = `
    INSERT INTO prospectus
    (id, university_code, title, file_data)
    VALUES (?, ?, ?, ?)
  `;

  return new Promise((resolve, reject) => {
    db.query(sql, prospectusValues, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

const getProspectusByUniversityCode = (universityCode) => {
  const sql = `
    SELECT *
    FROM prospectus
    WHERE university_code = ?
  `;

  return new Promise((resolve, reject) => {
    db.query(sql, [universityCode], (err, result) => {
      if (err) return reject(err);
      resolve(result[0]);
    });
  });
};

const deleteProspectus = (universityCode) => {
  const sql = `
    DELETE FROM prospectus
    WHERE university_code = ?
  `;

  return new Promise((resolve, reject) => {
    db.query(sql, [universityCode], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  addProspectus,
  getProspectusByUniversityCode,
  deleteProspectus
};