const express = require('express');
const router = express.Router();
const guestController = require('../controllers/guestController');

router.post("/",guestController.guestGetAllQualifications);

router.get("/courses/filter/:keyword",guestController.guestGetQualificationsByFilter);
 
module.exports = router;

