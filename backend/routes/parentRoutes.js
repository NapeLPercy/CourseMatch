const express = require('express');
const router = express.Router();
const parentController = require('../controllers/parentController');
const authenticate = require("../middleware/AuthenticationMiddleware");
const authorize = require("../middleware/AuthorizationMiddleware");

router.post('/profile',authenticate,parentController.addParentProfile);

module.exports = router;