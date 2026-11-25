import { api, handleApiError } from "./api";

export async function getStudentDashboard() {
  const res = await api.get(`/api/student/dashboard`);
  return res;
}

export async function getPersonalityProfile() {
  const res = await api.get(`/api/student/personality`);
  return res;
}

export async function getCareerGoals() {
  const res = await api.get(`/api/student/goals`);
  return res;
}

export async function addPersonalityProfile(personalityProfile) {
  const res = await api.patch(`/api/student/personality`, {
    personalityProfile,
  });
  return res;
}

export async function addCareerGoals(careerGoals) {
  const res = await api.patch(`/api/student/goals`, { careerGoals });
  return res;
}

export async function getMyMatches() {
  const res = await api.get(`/api/student/matched`);
  return res;
}

export async function getMyAiRecommededCourses() {
  const res = await api.get("/api/student/courses/ai-recommended");
  return res?.data;
}
