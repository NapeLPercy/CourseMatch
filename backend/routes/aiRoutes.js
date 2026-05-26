const express = require("express");
const router = express.Router();
const aiController = require("../controllers/aiController");
const authenticate = require("../middleware/AuthenticationMiddleware");
const authorize = require("../middleware/AuthorizationMiddleware");

router.post("/ai-recommendations",authenticate,authorize("STUDENT"), aiController.getAIRecommendations);
router.post("/deep-dive",authenticate,authorize("STUDENT"), aiController.getAIDeepDive);
router.post("/course-comparisons",authenticate,authorize("STUDENT"), aiController.getAICourseComparison);

module.exports = router;
