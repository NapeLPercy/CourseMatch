import { api, handleApiError } from "./api";

//users fetch courses relative to uni slug
export async function getUniversityCourses(uniSlug) {
  const res = await api.get(`/api/university/${uniSlug}`);
  return res;
}

/*ADMIN METHODS */
//get all universities
export async function getAllUniversities() {
  const res = await api.get(`/api/university/all`);
  return res;
}

//admin add university
export async function addUniversity(university) {
  const res = await api.post(`/api/university/`, { university });
  return res;
}

//admin delete university
export async function removeUniversity(abbreviation) {
  const res = await api.delete(`/api/university/${abbreviation}`);
  return res;
}
