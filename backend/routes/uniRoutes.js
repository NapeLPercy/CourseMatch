const express = require("express");
const router = express.Router();
const universityController = require("../controllers/universityController");
const authenticate = require("../middleware/AuthenticationMiddleware");
const authorize = require("../middleware/AuthorizationMiddleware");

router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  universityController.addUniversity,
);
router.get("/all", authenticate, universityController.getAllUniversities);
router.get(
  "/:universityName",
  authenticate,
  authorize("STUDENT"),
  universityController.getUniversityCourses,
);
router.delete(
  "/:abbreviation",
  authenticate,
  authorize("ADMIN"),
  universityController.deleteUniversity,
);

module.exports = router;
