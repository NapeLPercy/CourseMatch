import { api, handleApiError } from "./api";

export async function getOrCreateAIRecommedations(
  subjects,
  qualifiedCourses,
  uniSlug,
) {
  const res = await api.post(`/api/recommendation/ai-recommendations`, {
    subjects,
    qualifiedCourses,
    uniSlug,
  });

  return res;
}

export async function getOrCreateDeepDive(subjects, qualification) {
  const res = await api.post(`/api/recommendation/deep-dive`, {
    subjects,
    qualification,
  });

  return res;
}
