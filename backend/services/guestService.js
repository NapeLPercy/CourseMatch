const { getAllCourses,  getQualificationsByFilter } = require("./courseService");

// Get all qualifications, when a guest is computing aps
async function guestGetAllQualifications() {
  return getAllCourses();
}

async function guestGetQualificationsByFilter(keyword){
  return getQualificationsByFilter(keyword);
}
module.exports = { guestGetAllQualifications, guestGetQualificationsByFilter };
