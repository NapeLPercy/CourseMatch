const blogModel = require("../models/Blog");
const { v4: uuidv4 } = require("uuid");

async function createBlog(blog) {
  blog.id = uuidv4();
  return await blogModel.createBlog(blog);
}

async function getBlogById(id) {
  return await blogModel.getBlogById(id);
}

async function getBlogShareById(id) {
  return await blogModel.getBlogShareById(id);
}

async function getAllBlogs() {
  return await blogModel.getAllBlogs();
}

async function adminGetAllBlogs() {
  return await blogModel.adminGetAllBlogs();
}

async function updateBlogStatus(id, status) {
  return await blogModel.updateBlogStatus(id, status);
}

async function deleteBlog(id) {
  return await blogModel.deleteBlog(id);
}

module.exports = {
  createBlog,
  getBlogById,
  getAllBlogs,
  adminGetAllBlogs,
  deleteBlog,
  updateBlogStatus,
  getBlogShareById
};
