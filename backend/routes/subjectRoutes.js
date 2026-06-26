const express = require("express");
const router = express.Router();
const subjectController = require("../controllers/subjectController");
const authenticate = require("../middleware/AuthenticationMiddleware");
const authorize = require("../middleware/AuthorizationMiddleware");
const attachProfileId = require("../middleware/profileMiddleware");

router.post(
  "/add",
  authenticate,
  authorize("STUDENT"),
  attachProfileId,
  subjectController.addSubjects,
);
router.get(
  "/",
  authenticate,
  authorize("STUDENT"),
  attachProfileId,
  subjectController.getSubjects,
);

router.patch(
  "/:subjectId",
  authenticate,
  authorize("STUDENT"),
   attachProfileId,
  subjectController.updateMark,
);

module.exports = router;
