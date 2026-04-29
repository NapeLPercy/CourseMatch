const {
  createBlog,
  getAllBlogs,
  adminGetAllBlogs,
  getBlogById,
  getBlogShareById,
  deleteBlog,
  updateBlogStatus,
} = require("../services/blogService");

// CREATE BLOG
exports.createBlog = async (req, res) => {
  try {
    const { title, excerpt, topic } = req.body;
    const { userId } = req;
    const file = req.file;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "You are not authorized to access this resource",
      });
    }

    // blocks comes as string → must parse
    const blocks = req.body.blocks ? JSON.parse(req.body.blocks) : [];

    if (!title || !blocks.length) {
      return res.status(400).json({
        success: false,
        message: "Title and blocks are required",
      });
    }

    const blogData = {
      title,
      excerpt,
      topic,
      authorId: userId,
      coverImage: file ? `/uploads/${file.filename}` : null,
      blocks,
    };

    const blogId = await createBlog(blogData);

    res.status(201).json({
      success: true,
      message: `Blog successfuly submitted`,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL BLOGS (CARD VIEW)
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await getAllBlogs();
    res
      .status(200)
      .json({ success: true, message: "Blogs successfuly fetched", blogs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL BLOGS (CARD VIEW)
exports.adminGetAllBlogs = async (req, res) => {
  try {
    const blogs = await adminGetAllBlogs();
    res
      .status(200)
      .json({ success: true, message: "Blogs successfuly fetched", blogs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET SINGLE BLOG
exports.getBlogById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Blog id is required" });
    }

    const blog = await getBlogById(id);

    if (!blog) {
      return res.json({ success: false, message: "Blog not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Data fetched suvvessfully", blog });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//delete
exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Blog ID is required",
      });
    }

    const deleted = await deleteBlog(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to delete blog",
      error: err.message,
    });
  }
};

//update
exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const { userId } = req;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    if (!id || !status) {
      return res.status(400).json({
        success: false,
        message: "Blog ID and status are required",
      });
    }

    const updated = await updateBlogStatus(id, status);

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: `Blog status updated to ${status}`,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to update blog status",
      error: err.message,
    });
  }
};

//for blog sharing
exports.getBlogSharePage = async (req, res) => {

  const blog = await getBlogShareById(req.params.id);
  if (!blog) return res.status(404).send("Not found");

  const ua = req.headers["user-agent"] || "";
  const isBot = /facebookexternalhit|whatsapp|twitterbot|linkedinbot|slackbot|telegrambot|discordbot/i.test(ua);

  const serverUrl = process.env.BASE_URL;
  const frontendUrl = process.env.UI_URL;

  const imageUrl = blog.coverImageUrl;

  if (isBot) {
    return res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <meta property="og:title" content="${blog.title}" />
          <meta property="og:description" content="${blog.excerpt}" />
          <meta property="og:image" content="${imageUrl}" />
          <meta property="og:url" content="${serverUrl}/api/blogs/post/${blog.id}" />
          <meta property="og:type" content="article" />
        </head>
        <body></body>
      </html>
    `);
  }

  return res.redirect(`${frontendUrl}/blog/${blog.id}`);
};
