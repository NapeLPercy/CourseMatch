const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const authenticate = require("../middleware/AuthenticationMiddleware");
const authorize = require("../middleware/AuthorizationMiddleware");

// add student profile
router.post('/add-profile',authenticate,authorize("STUDENT"),studentController.addProfile);
router.get('/get-profile',authenticate,authorize("STUDENT"),studentController.getProfile);

module.exports = router;