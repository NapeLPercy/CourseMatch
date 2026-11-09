import { getUniversityCourses } from "../services/universityService";
import { useQuery } from "@tanstack/react-query";

export function useGetUniversityCourses(universityAbbreviation) {
  return useQuery({
    queryKey: ["university_courses", universityAbbreviation],
    queryFn: () => {
      return getUniversityCourses(universityAbbreviation);
    },
  });
}
