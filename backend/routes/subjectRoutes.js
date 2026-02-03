const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/SubjectController');

// POST /api/sub/add-subjects
router.post('/addSubjects', subjectController.addSubjects);

// Get all subjects for a student
router.get('/:studentId', subjectController.getSubjects);

// Update a subject mark by Subject_Id
router.put("/:subjectId", subjectController.updateMark);

module.exports = router;
