const express = require("express");
const router = express.Router();
const upload = require("../middleware/docUpload");
const authenticate = require("../middleware/AuthenticationMiddleware");
const authorize = require("../middleware/AuthorizationMiddleware");

const {
  addProspectus,
  downloadProspectus,
  deleteProspectus,
} = require("../controllers/prospectusController");

router.post(
  "/",
  upload.single("file"),
  authenticate,
  authorize("ADMIN"),
  addProspectus,
);

router.get("/:universityCode", downloadProspectus);

router.delete(
  "/:universityCode",
  authenticate,
  authorize("ADMIN"),
  deleteProspectus,
);

module.exports = router;
