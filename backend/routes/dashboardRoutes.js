const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/adminDashboardController');
const authenticate = require("../middleware/AuthenticationMiddleware");
const authorize = require("../middleware/AuthorizationMiddleware");

// Add all courses for a university
router.get("/dashboard",authenticate, authorize("ADMIN"), dashboardController.getAdminDashboard);
module.exports = router;