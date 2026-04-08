const { getAllCourses } = require("../services/courseService");

// Get all qualifications, when a guest is computing aps
async function guestGetAllQualifications() {
  return getAllCourses();
}
module.exports = { guestGetAllQualifications };
