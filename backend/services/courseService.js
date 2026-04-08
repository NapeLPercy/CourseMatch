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

module.exports = { addCourse, getAllCourses, deleteCourse };
