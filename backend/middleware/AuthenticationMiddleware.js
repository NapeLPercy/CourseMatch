const jwt = require("jsonwebtoken");
const db = require("../config/db"); // adjust this path if your db file is elsewhere
const dotenv = require("dotenv");
dotenv.config();
const userModel = require("../models/User");

const authenticate = async (req, res, next) => {
  let token;

  /* 1 Check for Authorization header and Bearer token
  2 Verify token using secret
  3 Verify decoded user_id exist in DB
  4 Attach user id & role to request for use in controllers
  */
  if (req.headers.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const response = await userModel.getUser(decoded.userId);

      const rows = response[0];

      const role = decoded.role;
      if (!(rows.id && role)) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      req.userId = rows.id;
      req.role = role;
      next();
    } catch (error) {
      console.error("Token verification failed:", error);
      return res
        .status(401)
        .json({ success: false, message: "Not authorized, invalid token" });
    }
  } else {
    return res
      .status(401)
      .json({ success: false, message: "Not authorized, no token provided" });
  }
};
module.exports = authenticate;
