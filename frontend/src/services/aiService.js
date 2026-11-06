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

export async function getOrCreateDeepDive(subjects, recommendationId) {
  const res = await api.post(`/api/recommendation/deep-dive`, {
    subjects,
    recommendationId,
  });

  return res;
}

//course-comparisons
export async function getOrCreateCourseComparisons(data) {
  const res = await api.post(`/api/recommendation/course-comparisons`, data);
  return res;
}
