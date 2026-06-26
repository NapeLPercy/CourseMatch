import { api, handleApiError } from "./api";

export async function getSubjects() {
  const res = api.get(`/api/subjects`);
  return res;
}

export async function addStudentSubjects(subjects) {
  const res = api.post(`/api/subjects/add`, { subjects });
  return res;
}

export async function updateMark(subjectId, newSubjectMark) {
  console.log("in the service", subjectId, newSubjectMark);
  return api.patch(`/api/subjects/${subjectId}`, { newSubjectMark });
}
