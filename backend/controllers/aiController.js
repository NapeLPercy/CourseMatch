const dotenv = require("dotenv");
dotenv.config();

const aiRecommendationService = require("../services/aiRecommendationService");
const { getOrCreateDeepDive } = require("../services/aiCourseDeepDiveService");
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
    console.error("AI fit error:", error);
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
    console.error("AI deep dive error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error generating AI deep dive results",
    });
  }
};
