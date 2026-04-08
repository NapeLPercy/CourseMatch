const dotenv = require("dotenv");
dotenv.config();

const {
  deleteUniversity,
  getAllUniversities,
  getUniversityCourses,
  addUniversity,
} = require("../services/universityService");

// Get courses for each university
exports.getUniversityCourses = async (req, res) => {
  try {
    const { universityName } = req.params;

    const qualifications = await getUniversityCourses(universityName);

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
    const universities = await getAllUniversities();

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

//delete university info
exports.deleteUniversity = async (req, res) => {
  try {
    const { abbreviation } = req.params;

    if (!abbreviation || !abbreviation.trim()) {
      return res.status(400).json({
        success: false,
        message: "University abbreviation is required",
      });
    }

    const result = await deleteUniversity(abbreviation.trim());
 

    if (result === 0) {
      return res.status(404).json({
        success: false,
        message: "University not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "University and related data deleted successfully",
      meta: result,
    });
  } catch (error) {
    console.error("Delete university error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error deleting university",
    });
  }
};

//add university data
exports.addUniversity = async (req, res) => {
  try {
    const { university } = req.body;
    const userId = req.userId;

    if (!university || !userId) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    //Insert university and faculty
    await addUniversity(university);

    return res.status(201).json({
      success: true,
      message: "University added successfully",
    });
  } catch (error) {
    console.error("Add university error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while adding subjects",
    });
  }
};
