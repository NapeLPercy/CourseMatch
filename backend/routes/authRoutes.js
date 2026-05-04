const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/register", authController.register);
router.post("/login", authController.login);

router.post("/request-reset", authController.requestPasswordReset);
router.post("/reset", authController.resetPassword);
router.get("/accounts", authController.getAdminAccounts);
module.exports = router;
