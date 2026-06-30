const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authenticate = require("../middleware/AuthenticationMiddleware");
const authorize = require("../middleware/AuthorizationMiddleware");
router.post("/register", authController.register);
router.post("/login", authController.login);

router.post("/request-reset", authController.requestPasswordReset);
router.post("/reset", authController.resetPassword);
router.post("/verify", authController.verifyAccount);

router.get(
  "/accounts",
  authenticate,
  authorize("ADMIN"),
  authController.getAdminAccounts,
);

router.post(
  "/add",
  authenticate,
  authorize("ADMIN"),
  authController.adminAddAccount,
);
module.exports = router;
