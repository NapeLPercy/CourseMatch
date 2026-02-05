const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv");
dotenv.config();

const universityModel = require("../models/University");

// Get courses for each university
exports.getUniversityCourses = async (req, res) => {
  try {
    const { universityName } = req.params;

    const qualifications =
      await universityModel.getUniversityCourses(universityName);

    return res.status(200).json({
      message: "Courses successfully fetched",
      success: true,
      courses: qualifications,
    });
  } catch (error) {
    console.error("Get courses error:", error);
    return res.status(500).json({
      message: "Error fetching university courses ",
      success: false,
    });
  }
};

//get all universities and thier faculties
exports.getAllUniversities = async (req, res) => {

  try {

    const universities = await universityModel.getUniversitiesWithFaculties();

    return res.status(200).json({
      message: "Universities successfully fetched",
      success: true,
      universities: universities,
    });
  } catch (error) {
    console.error("Get courses error:", error);
    return res.status(500).json({
      message: error.message || "Error fetching universities",
      success: false,
    });
  }
};
