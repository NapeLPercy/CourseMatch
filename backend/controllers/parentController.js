const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv");
dotenv.config();
const { addParentProfile } = require("../services/parentService");
const { generateToken } = require("../services/accountService");

/* 1 Add basic parent info
2 re-issue jwt */
exports.addParentProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { parentData } = req.body;

    if (!parentData) {
      return res
        .status(400)
        .json({ success: false, message: "Profile data is required" });
    }

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "Not authenticated" });
    }

    const result = await addParentProfile(userId, parentData);

    const role = "PARENT";
    const account = { role, user_id: userId };
    const token = generateToken(account);

    return res.status(200).json({
      success: true,
      message: "Profile saved successfully",
      user: { userId: result.userId, parentId: result.parentId, token, role },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
