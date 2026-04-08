const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv");
dotenv.config();
const tutorModel = require("../models/Tutor");
const { addUserProfile } = require("./userService");
const { updateAccountRole } = require("./accountService");

/*1 Add user generic data
 2 Add tutor specifc data
 3 Patch Role in that account table*/
async function addTutorProfile(userId, profileData) {
  const conn = await new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) return reject(err);
      resolve(connection);
    });
  });

  try {
    await conn.promise().beginTransaction();
    const user = await addUserProfile(conn, profileData);

    const tutorId = uuidv4();

    const tutorData = extractTutorSpecifData(profileData);
    tutorData.id = tutorId;

    await tutorModel.createTutorProfile(conn, {
      userId,
      ...tutorData,
    });

    await updateAccountRole(conn, {
      userId: userId,
      role: tutorData.role,
    });

    await conn.promise().commit();

    return { userId: userId, tutorId };
  } catch (error) {
    await conn.promise().rollback();
    throw error;
  } finally {
    conn.release();
  }
}

//get tutor sepecif data
function extractTutorSpecifData({
  yearsOfExperience,
  highestQualification,
  role,
}) {
  return { yearsOfExperience, highestQualification, role };
}

async function getTutorId(userId) {
  return await tutorModel.getTutorId(userId);
}

module.exports = { addTutorProfile, getTutorId };
