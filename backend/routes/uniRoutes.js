const express = require('express');
const router = express.Router();
const universityController = require('../controllers/UniversityController');
const authenticate = require("../middleware/AuthenticationMiddleware");
const authorize = require("../middleware/AuthorizationMiddleware");
// Get all courses for a university


router.get("/get-all",authenticate, universityController.getAllUniversities);
router.get('/:universityName',authenticate,authorize("STUDENT"),universityController.getUniversityCourses);


module.exports = router;