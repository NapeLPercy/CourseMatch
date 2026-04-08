const express = require("express");
const router = express.Router();
const qualificationController = require("../controllers/qualificationController");
const authenticate = require("../middleware/AuthenticationMiddleware");
const authorize = require("../middleware/AuthorizationMiddleware");

router.post(
  "/add",
  authenticate,
  authorize("ADMIN"),
  qualificationController.addQualification,
);
router.get(
  "/",
  authenticate,
  authorize("ADMIN"),
  qualificationController.getAllQualifications,
);
router.delete(
  "/:code",
  authenticate,
  authorize("ADMIN"),
  qualificationController.deleteQualification,
);
module.exports = router;
