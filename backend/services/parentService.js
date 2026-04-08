const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv");
dotenv.config();
const parentModel = require("../models/Parent");
const { addUserProfile } = require("./userService");
const { updateAccountRole } = require("./accountService");

/* 1 Add user generic data
2 Add parent specifc data
3 Patch Role in that account table*/
async function addParentProfile(userId, profileData) {
  const conn = await new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) return reject(err);
      resolve(connection);
    });
  });

  try {
    await conn.promise().beginTransaction();

    const user = await addUserProfile(conn, profileData);

    const parentId = uuidv4();

    const parentData = extractParentSpecifData(profileData);
    parentData.id = parentId;

    await parentModel.createParentProfile(conn, {
      userId,
      ...parentData,
    });

    await updateAccountRole(conn, {
      userId: userId,
      role: parentData.role,
    });

    await conn.promise().commit();

    return { userId: user.id, parentId };
  } catch (error) {
    await conn.promise().rollback();
    throw error;
  } finally {
    conn.release();
  }
}
/* Get parent specif data from payload(which can have 
tutor/student depending on selected role)*/
function extractParentSpecifData({ relationshipToStudent, purpose, role }) {
  return { relationshipToStudent, purpose, role };
}

// Get parent id
async function getParentId(userId) {
  return await parentModel.getParentId(userId);
}
module.exports = { addParentProfile, getParentId };
