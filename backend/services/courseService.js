const courseModel = require("../models/Qualification");

//Insert qualification
async function addCourse(course) {
  return await courseModel.insertQualificationWithPrereqs(course);
}

// Fetch all qualifications
async function getAllCourses() {
  return await courseModel.getAllQualificationsWithPrereqs();
}

// Delete a qualification
async function deleteCourse(code) {
  return await courseModel.deleteQualification(code);
}

//guest filters qualification
async function getQualificationsByFilter(keyword) {
  let whereClause = "";

  switch (keyword.toLowerCase()) {
    case "bachelor-degree-courses":
      whereClause = `
        (
          q.nqf >= 7
          OR LOWER(q.name) LIKE '%bachelor%'
        )
      `;
      break;

    case "diploma-courses":
      whereClause = `
        (
          q.nqf = 6
          OR LOWER(q.name) LIKE '%diploma%'
        )
      `;
      break;

    case "higher-certificate-courses":
      whereClause = `
        (
          q.nqf = 5
          OR LOWER(q.name) LIKE '%higher certificate%'
          OR LOWER(q.name) LIKE '%certificate%'
        )
      `;
      break;

    case "extended-programmes":
      whereClause = `
        (
          LOWER(q.name) LIKE '%extended%'
          OR LOWER(q.name) LIKE '%ecp%'
          OR LOWER(q.name) LIKE '%extended curriculum%'
        )
      `;
      break;

    case "courses-without-maths":
      whereClause = `
        q.code NOT IN (
          SELECT DISTINCT qualification_code
          FROM prerequisite_subject
          WHERE LOWER(subject_name) LIKE '%math%'
             OR LOWER(subject_name) LIKE '%mathematics%'
       )
      `;
      break;
    default:
      throw new Error("Invalid filter");
  }
  return await courseModel.getQualificationsByFilter(whereClause);
}

module.exports = {
  addCourse,
  getAllCourses,
  deleteCourse,
  getQualificationsByFilter,
};
