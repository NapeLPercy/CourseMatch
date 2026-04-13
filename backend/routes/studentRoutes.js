const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const authenticate = require("../middleware/AuthenticationMiddleware");
const authorize = require("../middleware/AuthorizationMiddleware");

router.post(
  "/profile/basic",
  authenticate,
  studentController.createBasicProfile,
);

router.get(
  "/profile/basic",
  authenticate,
  authorize("STUDENT"),
  studentController.getBasicProfile,
);

router.patch(
  "/profile",
  authenticate,
  authorize("STUDENT"),
  studentController.completeProfile,
);

router.get(
  "/profile",
  authenticate,
  authorize("STUDENT"),
  studentController.getProfile,
);

router.get(
  "/matched",
  authenticate,
  authorize("STUDENT"),
  studentController.getMyMatchedQualifications,
);

module.exports = router;
