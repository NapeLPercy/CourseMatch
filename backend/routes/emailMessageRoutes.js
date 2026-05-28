const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");
const authenticate = require("../middleware/AuthenticationMiddleware");
const authorize = require("../middleware/AuthorizationMiddleware");
const upload = require("../middleware/multer");

//admin
router.post(
  "/send",
  upload.single("coursematchImage"),
  authenticate,
  authorize("ADMIN"),
  messageController.sendEmailMessage,
);


module.exports = router;