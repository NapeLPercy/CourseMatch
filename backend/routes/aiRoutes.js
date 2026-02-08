const express = require("express");
const router = express.Router();
const aiController = require("../controllers/aiController");
const authenticate = require("../middleware/AuthenticationMiddleware");
const authorize = require("../middleware/AuthorizationMiddleware");

router.post("/ai-recommendations",authenticate,authorize("STUDENT"), aiController.getAIRecommendations);

module.exports = router;
