const express = require("express");
const router = express.Router();
const automationController = require("../controllers/AutomationController");




router.post("/advanced-matching", automationController.advancedMatching);

module.exports = router;
