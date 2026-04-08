const express = require('express');
const router = express.Router();
const guestController = require('../controllers/guestController');
const authenticate = require("../middleware/AuthenticationMiddleware");
const authorize = require("../middleware/AuthorizationMiddleware");

router.post("/",guestController.guestGetAllQualifications);
module.exports = router;

