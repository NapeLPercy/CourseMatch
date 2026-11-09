import { getOrCreateAIRecommedations } from "../services/aiService";

import { useQuery } from "@tanstack/react-query";

export function useGetOrCreateAIRecommendations(
  subjects,
  qualifiedCourses,
  universityAbbreviation,
) {
  return useQuery({
    queryKey: [
      "AI_course_Recommendations",
      universityAbbreviation,
      subjects,
      qualifiedCourses,
    ],

    queryFn: () =>
      getOrCreateAIRecommedations(
        subjects,
        qualifiedCourses,
        universityAbbreviation,
      ),

    enabled:
      !!universityAbbreviation &&
      subjects.length > 0 &&
      qualifiedCourses.length > 0,

    staleTime: 5 * 60 * 1000,
  });
}
