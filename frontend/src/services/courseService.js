import { api, handleApiError } from "./api";

/*ADMIN METHODS*/
export async function addCourse(qualification) {
  const res = await api.post(`/api/qualification/add`, { qualification });
  return res;
}

export async function getAllCourses() {
  const res = await api.get(`/api/qualification`);
  return res;
}

export async function deleteCourse(code) {
  const res = await api.delete(`/api/qualification/${code}`);
  return res;
}
