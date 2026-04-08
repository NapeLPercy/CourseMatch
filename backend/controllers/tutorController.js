const dotenv = require("dotenv");
dotenv.config();
const { addTutorProfile } = require("../services/tutorService");
const { generateToken } = require("../services/accountService");

/* 1 Add basic tutor profile
2 Re-issue a jwt*/
exports.addTutorProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { tutorData } = req.body;

    if (!tutorData) {
      return res
        .status(400)
        .json({ success: false, message: "Profile data is required" });
    }

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "Not authenticated" });
    }

    const result = await addTutorProfile(userId, tutorData);

    const role = "TUTOR";
    const account = { role, user_id: userId };
    const token = generateToken(account);

    return res.status(200).json({
      success: true,
      message: "Profile saved successfully",
      user: { userId: result.userId, tutorId: result.tutorId, token, role },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
