const jwt = require("jsonwebtoken");
const db = require("../config/db"); // adjust this path if your db file is elsewhere
const dotenv = require("dotenv");
dotenv.config();

/*Check if the role is allowed to access a resource */
const authorize = (...allowedRoles) => {
  return async (req, res, next) => {
    if (!req.role) {
      return res
        .status(401)
        .json({ success: false, message: "Not authenticated" });
    }

    if (!allowedRoles.includes(req.role)) {
      return res.status(403).json({
        success: false,
        message:
          "Access denied: You don’t have permission to view this resource.",
      });
    }

    next();
  };
};
module.exports = authorize;
