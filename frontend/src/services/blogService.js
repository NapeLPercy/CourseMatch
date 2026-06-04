import {api} from "../services/api";

export async function createBlog(blog) {
  return await api.post(`/api/blogs`,blog);
}

export async function getBlogById(slug) {
  return await api.get(`/api/blogs/${slug}`);
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


export async function getPageRelatedPosts(search) {
  return await api.get("/api/blogs/search/related", {
    params: { search },
  });
}