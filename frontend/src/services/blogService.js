import {api} from "../services/api";

export async function createBlog(blog) {
  console.log(blog);
  return await api.post(`/api/blogs`,blog);
}

export async function getBlogById(id) {
  return await api.get(`/api/blogs/${id}`);
}

export async function getAllBlogs() {
  return await api.get(`/api/blogs/all`);
}

export async function adminGetAllBlogs() {
  return await api.get(`/api/blogs/admin/all`);
}

export async function deleteBlog(id) {
  return await api.delete(`/api/blogs/${id}`);
}


export async function updateBlogStatus(status,id) {
  return await api.patch(`/api/blogs/${id}/status`,{status});
}