const dotenv = require("dotenv");
dotenv.config();

const aiRecommendationService = require("../services/aiRecommendationService");
const { getStudentCompleteProfile } = require("../services/studentService");

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
    console.log("profile data", profile);
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

    console.log("results", results);
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
