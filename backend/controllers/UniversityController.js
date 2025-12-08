const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv");
dotenv.config();

const UniversityModel = require("../models/University");

// Get subjects for a student (async)
exports.getUniversityCourses = async (req, res) => {
  console.log("About to get university courses data");

  try {
    const { universityName } = req.params;

    const qualifications = await UniversityModel.getUniversityCourses(
      universityName
    );


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
