const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/SubjectController');
const authenticate = require("../middleware/AuthenticationMiddleware");
const authorize = require("../middleware/AuthorizationMiddleware");

// POST /api/sub/add-subjects
router.post('/addSubjects',authenticate,authorize("STUDENT"),subjectController.addSubjects);

// Get all subjects for a student
router.get('/:studentId',authenticate,authorize("STUDENT"), subjectController.getSubjects);

// Update a subject mark by Subject_Id
router.put("/:subjectId",authenticate,authorize("STUDENT"), subjectController.updateMark);

module.exports = router;
