import dotenv from "dotenv";
import axios from "axios";
dotenv.config();

export const advancedMatching = async (req, res) => {
  try {
    const profile = req.body.profile;
    const courses = req.body.courses;

    if (!profile || !courses || !Array.isArray(courses)) {
      return res.status(400).json({ 
        error: "Invalid input: profile and courses array required" 
      });
    }

    const n8nResponse = await axios.post(process.env.N8N_WEBHOOK_URL, {
      profile,
      qualifiedCourses: courses,
    });

    const recommendedCourses = 
      n8nResponse?.data?.output?.[0]?.content?.[0]?.text?.courses || [];

    if (!Array.isArray(recommendedCourses)) {
      return res.status(500).json({ 
        error: "Invalid response format from matching service" 
      });
    }

    res.json({
      success: true,
      courses: recommendedCourses
    });

  } catch (error) {
    console.error("Advanced matching error:", error);
    
    res.status(500).json({ 
      success: false,
      error: "Failed to process course recommendations",
      message: error.message 
    });
  }
};
