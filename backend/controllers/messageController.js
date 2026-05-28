const dotenv = require("dotenv");
dotenv.config();
const { sendEmailMessage } = require("../services/emailService");

exports.sendEmailMessage = async (req, res) => {
  try {
    const { userId, role } = req;
    const data = req.body;

    if (!userId || !role) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }

    // IMAGE URL
    let imageUrl = null;

    if (req.file) {
      imageUrl = `${process.env.BASE_URL}/uploads/${req.file.filename}`;
    }

    await sendEmailMessage({
      ...data,
      imageUrl,
    });

    return res.status(200).json({
      success: true,
      message: "Email successfully sent!",
    });
  } catch (error) {
    console.error("Send email error:", error);

    return res.status(500).json({
      success: false,
      message: "Error sending email",
    });
  }
};
