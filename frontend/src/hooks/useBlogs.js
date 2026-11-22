import { useQuery } from "@tanstack/react-query";
import { getAllBlogs, getBlogBySlug } from "../services/blogService";

export function useGetAllBlogs() {
  return useQuery({
    queryKey: ["all_blog_posts"],
    queryFn: getAllBlogs,
  });
}

export function useGetBlogBySlug(blogSlug) {
  return useQuery({
    queryKey: ["blog_post", blogSlug],
    queryFn: () => getBlogBySlug(blogSlug),
  });
}
