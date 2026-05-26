const dotenv = require("dotenv");
dotenv.config();
const aiRecommendationService = require("../services/aiRecommendationService");
const { getOrCreateDeepDive } = require("../services/aiCourseDeepDiveService");
const { getStudentCompleteProfile } = require("../services/studentService");
const {getOrCreateCourseComparison} = require("../services/aiCourseComparisonService");
//const { use } = require("react");

/*fetch or create AI scoring + explanation*/
exports.getAIRecommendations = async (req, res) => {
  try {
    const userId = req.userId;
    const { qualifiedCourses, subjects, uniSlug: universityAbbrev } = req.body;

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "Not authenticated" });
    }

    if (!qualifiedCourses || qualifiedCourses.length === 0) {
      return res.status(200).json({
        success: true,
        results: [],
        message: "No qualified courses found for this university.",
      });
    }

    if (!subjects || subjects.length === 0) {
      return res.status(200).json({
        success: true,
        results: [],
        message: "No subjects found.",
      });
    }

    const profile = await getStudentCompleteProfile(userId);

    if (!profile || !profile.dream_job) {
      return res.status(400).json({
        success: false,
        message: "Please complete your student profile first.",
      });
    }

    const results = await aiRecommendationService.getOrCreateRecommendations({
      userId,
      universityAbbrev,
      studentProfile: profile,
      subjects,
      qualifiedCourses,
    });

    return res.status(200).json({
      success: true,
      results: results,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error generating AI fit results",
    });
  }
};

//fetch or create deep dive data
exports.getAIDeepDive = async (req, res) => {
  try {
    const userId = req.userId;
    const { subjects, qualification } = req.body;

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "Not authenticated" });
    }

    if (!qualification) {
      return res.status(400).json({
        success: false,
        message: "Qualification data is required.",
      });
    }

    if (!subjects || subjects.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No subjects found.",
      });
    }

    const profile = await getStudentCompleteProfile(userId);

    const results = await getOrCreateDeepDive({
      userId,
      qualification,
      studentProfile: profile,
      subjects,
    });

    return res.status(200).json({
      success: true,
      results: results,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error generating AI deep dive results",
    });
  }
};

//fetch or create course comparisons
exports.getAICourseComparison = async (req, res) => {
  try {
    const userId  = req.userId;
    const { qualifications, subjects } = req.body;
    
    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "Not authenticated" });
    }

    if (!qualifications) {
      return res.status(400).json({
        success: false,
        message: "Qualifications data is required.",
      });
    }

    if (!subjects || subjects.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No subjects found.",
      });
    }

    const profile = await getStudentCompleteProfile(userId);

    
    const comparison = await getOrCreateCourseComparison(
      userId,
      qualifications,
      profile,
      subjects,
    );

    if (!comparison) {
      return res.status(404).json({
        success: false,
        message: "Comparison not found",
      });
    }

    return res.json({
      success: true,
      comparison,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch comparison",
    });
  }
};
