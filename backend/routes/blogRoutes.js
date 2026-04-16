const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const authenticate = require("../middleware/AuthenticationMiddleware");
const authorize = require("../middleware/AuthorizationMiddleware");
const upload = require("../middleware/multer");

//admin
router.post(
  "/",
  upload.single("coverImage"),
  authenticate,
  authorize("ADMIN"),
  blogController.createBlog,
);

router.get(
  "/admin/all",
  authenticate,
  authorize("ADMIN"),
  blogController.adminGetAllBlogs,
);

router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  blogController.deleteBlog,
);
router.patch(
  "/:id/status",
  authenticate,
  authorize("ADMIN"),
  blogController.updateBlog,
);
//guest
router.get("/all", blogController.getAllBlogs);
router.get("/:id", blogController.getBlogById);

//for sharing
router.get("/post/:id", blogController.getBlogSharePage);

module.exports = router;
