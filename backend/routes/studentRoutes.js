const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const studentDashboardController = require("../controllers/studentDashboardController");
const authenticate = require("../middleware/AuthenticationMiddleware");
const authorize = require("../middleware/AuthorizationMiddleware");
const attachProfileId = require("../middleware/profileMiddleware");

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
  "/personality",
  authenticate,
  authorize("STUDENT"),
  studentController.addPersonalityProfile,
);

router.patch(
  "/goals",
  authenticate,
  authorize("STUDENT"),
  studentController.addCareerGoals,
);

router.get(
  "/personality",
  authenticate,
  authorize("STUDENT"),
  studentController.getPersonalityProfile,
);

router.get(
  "/goals",
  authenticate,
  authorize("STUDENT"),
  studentController.getCareerGoals,
);

router.get(
  "/matched",
  authenticate,
  authorize("STUDENT"),
  studentController.getMyMatchedQualifications,
);

router.get(
  "/dashboard",
  authenticate,
  authorize("STUDENT"),
  attachProfileId,
  studentDashboardController.computeStudentDashboard,
);

router.get(
  "/courses/ai-recommended",
  authenticate,
  authorize("STUDENT"),
  studentController.getMyAICourseRecommendations,
);

module.exports = router;
