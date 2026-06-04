const blogModel = require("../models/Blog");
const { v4: uuidv4 } = require("uuid");

async function createBlog(blog) {
  blog.id = uuidv4();blog.slug = blog.title
  .toLowerCase()
  .trim()
  .replace(/[^\w\s]/g, "") // remove ?, !, :, ', (), etc.
  .replace(/\s+/g, "-")    // spaces -> -
  .replace(/-+/g, "-");    // remove duplicate -
  return await blogModel.createBlog(blog);
}

async function getBlogBySlug(slug) {
  return await blogModel.getBlogBySlug(slug);
}
async function getBlogBySearchKeyword(keyword){
  return await blogModel.getPostsByKeyword(keyword);
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
  getBlogBySlug,
  getAllBlogs,
  adminGetAllBlogs,
  deleteBlog,
  updateBlogStatus,
  getBlogShareById,
  getBlogBySearchKeyword
};
