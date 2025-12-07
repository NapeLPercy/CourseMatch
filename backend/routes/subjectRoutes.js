const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/SubjectController');

// POST /api/sub/add-subjects
router.post('/addSubjects', subjectController.addSubjects);

// Get all subjects for a student
router.get('/:studentId', subjectController.getSubjects);


module.exports = router;
