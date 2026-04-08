const express = require('express');
const router = express.Router();
const tutorController = require('../controllers/tutorController');
const authenticate = require("../middleware/AuthenticationMiddleware");
const authorize = require("../middleware/AuthorizationMiddleware");

router.post('/profile',authenticate,tutorController.addTutorProfile);

module.exports = router;