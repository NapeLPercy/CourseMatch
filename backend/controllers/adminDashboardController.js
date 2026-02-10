const dotenv = require("dotenv");
dotenv.config();
const AdminDashboard = require("../models/AdminDashboard");//"../models/AdminDashboard"

exports.getAdminDashboard = async (req, res) => {
  try {
    // If you already protect routes with authorize("ADMIN"), you can remove this check.
    // If your authenticate middleware sets req.user (with role), use that.
    const userId = req.userId;

    if (!userId) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    const dashboard = await AdminDashboard.getDashboardData();

    return res.status(200).json({
      success: true,
      dashboard,
    });
  } catch (error) {
    console.error("Admin dashboard error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error fetching admin dashboard",
    });
  }
};
