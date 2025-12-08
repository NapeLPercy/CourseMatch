const express = require('express');
const router = express.Router();
const universityController = require('../controllers/UniversityController');

// Get all courses for a university


router.get('/:universityName', universityController.getUniversityCourses);


module.exports = router;