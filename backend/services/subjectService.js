const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv");
dotenv.config();
const subjectModel = require("../models/Subject");
const { insertStudentEndorsement } = require("./studentService");
const SubjectsSanitizer = require("./subjectsSanitizer");
const MatricEndorsement = require("./matrixEndorsement");

/* 1 Clean subjects
2 Compute matric endorsement for 7 clean subjects
3 Compute and insert endorsement */

async function addSubjects(subjects, studentId, userId) {
  const conn = await new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) return reject(err);
      resolve(connection);
    });
  });

  try {
    await conn.promise().beginTransaction();

    const subjectValues = subjects.map((s) => [
      uuidv4(),
      s.name,
      s.mark,
      s.endorsementSubject,
      studentId,
    ]);

    //check if subjectsexists

    const exist = await subjectModel.subjectsExist(studentId);
    if (exist) {
      return { subjectsExists: true };
    }

    await subjectModel.insertSubjects(subjectValues);

    let { endorsement } = computeEndorsementAndAPSSubjects(subjects);

    await insertStudentEndorsement(endorsement, userId);

    await conn.promise().commit();
  } catch (error) {
    await conn.promise().rollback();
    throw error;
  } finally {
    conn.release();
  }
}

//Compute endorsement and 7 aps subjects
function computeEndorsementAndAPSSubjects(subjects) {
  const sanitizedSubjects = new SubjectsSanitizer(subjects).sanitize();
  const endorsement = new MatricEndorsement(sanitizedSubjects).determine();
  return { sanitizedSubjects, endorsement };
}
// Get student's subjects list
async function getSubjects(studentId) {
  return await subjectModel.getSubjectsByStudentIdForUser(studentId);
}

// Update a mark value
async function updateMark(subjectId, markNum) {
  await subjectModel.updateMark(subjectId, markNum);
}
module.exports = {
  getSubjects,
  updateMark,
  addSubjects,
  computeEndorsementAndAPSSubjects,
};
