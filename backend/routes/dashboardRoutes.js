const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/adminDashboardController');
const authenticate = require("../middleware/AuthenticationMiddleware");
const authorize = require("../middleware/AuthorizationMiddleware");

router.get("/dashboard",authenticate, authorize("ADMIN"), dashboardController.getAdminDashboard);
module.exports = router;