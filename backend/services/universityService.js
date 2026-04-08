const dotenv = require("dotenv");
dotenv.config();
const universityModel = require("../models/University");

//users fetch courses relative to uni slug
async function getUniversityCourses(uniSlug) {
  return await universityModel.getUniversityCourses(uniSlug);
}

//get all universities relative to uni slug
async function getAllUniversities() {
  return await universityModel.getUniversitiesWithFaculties();
}

//admin add university
async function addUniversity(university) {
  return await universityModel.addUniversityWithFaculties(university);
}

//admin delete university
async function deleteUniversity(abbreviation) {
  return await universityModel.deleteUniversity(abbreviation);
}

module.exports = {
  getUniversityCourses,
  getAllUniversities,
  deleteUniversity,
  addUniversity,
};
