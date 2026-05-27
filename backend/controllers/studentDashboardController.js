const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv");
dotenv.config();
const { computeStudentDashboard } = require("../services/studentService");

// Get subjects for a student
exports.computeStudentDashboard = async (req, res) => {
  try {
    const { userId, studentId } = req;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "You are not authorized",
      });
    }

    if (!studentId) {
      return res.status(400).json({
        success: false,
        message: "Student id is required",
      });
    }

    const dashboard = await computeStudentDashboard(userId, studentId);

    return res.status(200).json({
      success: true,
      dashboard,
    });

  } catch (error) {
    console.error("Get dashboard error:", error);

    return res.status(500).json({
      success: false,
      message: "Error fetching dashboard data",
    });
  }
};
