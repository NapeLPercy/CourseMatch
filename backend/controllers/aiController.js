const dotenv = require("dotenv");
dotenv.config();

const studentModel = require("../models/Student");
const CourseModel = require("../models/Qualification"); // you can rename
const AiFitService = require("../services/aiRecommendations");

exports.getAIRecommendations= async (req, res) => {
  try {
    const userId = req.userId;
    const { qualifiedCourses, subjects } = req.body;

    console.log("DATA",subjects,qualifiedCourses);

    if (!userId) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }

    //validate qualified course presence
    if (!qualifiedCourses || qualifiedCourses.length === 0) {
      return res.status(200).json({
        success: true,
        results: [],
        message: "No qualified courses found for this university.",
      });
    }

    //validate subjects
    if (!subjects || subjects.length === 0) {
      return res.status(200).json({
        success: true,
        results: [],
        message: "No subjects found.",
      });
    }

    // 1) Student profile (soft signals for fit)
    const profile = await studentModel.getStudentProfileByUserId(userId);

    if (!profile) {
      return res.status(400).json({
        success: false,
        message: "Please complete your student profile first.",
      });
    }


    // 3) AI scoring + explanation
    const results = await AiFitService.scoreAndExplainFit({
      studentProfile: profile,
      subjects: subjects,
      courses: qualifiedCourses,
    });

    console.log("IN THE CONTROLLER",results);

    return res.status(200).json({
      success: true,
      results: results,
    });
  } catch (error) {
    console.error("AI fit error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error generating AI fit results",
    });
  }
};
