import { api } from "./api";

export async function guestGetAllQualifications(subjects) {
  const res = await api.post("/api/guest", { subjects });
  return res;
}

export async function guestFilterQualifications(keyword) {
  return await api.get(`/api/guest/courses/filter/${keyword}`);
}
