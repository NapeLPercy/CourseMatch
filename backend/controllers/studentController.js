const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv");
dotenv.config();
const studentModel = require("../models/Student");

exports.getProfile = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }

    const profile = await studentModel.getStudentProfileByUserId(userId);

    return res.status(200).json({
      success: true,
      profile, // null if not created yet
    });
  } catch (error) {
    console.error("Get profile error:", error);
    return res.status(500).json({ success: false, message: "Server error fetching profile" });
  }
};

exports.addProfile = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }

    const profile = req.body.profileData || {};
        profile.id = uuidv4();//add profile id(pk)
    
    await studentModel.createStudentProfile(userId, profile);

    const saved = await studentModel.getStudentProfileByUserId(userId);

    return res.status(200).json({
      success: true,
      message: "Profile saved successfully",
      profile: saved,
    });
  } catch (error) {
    console.error("Save profile error:", error);
    return res.status(500).json({ success: false, message: "Server error saving profile" });
  }
};