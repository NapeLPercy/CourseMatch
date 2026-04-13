const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv");
dotenv.config();
const studentModel = require("../models/Student");
const { addUserProfile } = require("./userService");
const { updateAccountRole } = require("./accountService");

/* 1 Add user generic data
2 Add student specifc data
3 Patch Role in that account table */

async function addStudentProfile(userId, profileData) {
  const conn = await new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) return reject(err);
      resolve(connection);
    });
  });

  try {
    await conn.promise().beginTransaction();

    const user = await addUserProfile(conn, profileData);

    const studentId = uuidv4();

    const studentData = extractStudentSpecifData(profileData);
    studentData.id = studentId;

    await studentModel.createProfile(conn, {
      userId,
      ...studentData,
    });

    await updateAccountRole(conn, {
      userId: userId,
      role: studentData.role,
    });

    await conn.promise().commit();

    return { userId: userId, studentId };
  } catch (error) {
    await conn.promise().rollback();
    throw error;
  } finally {
    conn.release();
  }
}

// factory function to return student data
function extractStudentSpecifData({ grade, age, role }) {
  return { grade, age, role };
}

//insert complete student data
async function addStudentCompleteProfile(userId, profile) {
  await studentModel.updateStudentProfile(userId, profile);
}
//get complete student profile
async function getStudentProfile(userId) {
  return await studentModel.getStudentProfileByUserId(userId);
}

//get basic student profile
async function getStudentBasicProfile(userId) {
  return await studentModel.getStudentBasicProfileByUserId(userId);
}

async function getStudentCompleteProfile(userId) {
  return await studentModel.getStudentProfileByUserId(userId);
}

//patch endorsement after subjects insertion
async function insertStudentEndorsement(endorsement, userId) {
  await studentModel.insertStudentEndorsement(endorsement, userId);
}

async function getStudentId(userId) {
  return await studentModel.getStudentId(userId);
}


//user tries to view courses they were matched to
async function getMatchedCourses(userId){
  return await studentModel.getMyMatchedCourses(userId);
}

module.exports = {
  addStudentProfile,
  addStudentCompleteProfile,
  getStudentProfile,
  insertStudentEndorsement,
  getStudentBasicProfile,
  getStudentCompleteProfile,
  getStudentId,
  getMatchedCourses,
};
