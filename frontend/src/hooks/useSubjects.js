import { getAllSystemSubjects } from "../services/subjectService";
import { useQuery } from "@tanstack/react-query";

export function useGetAllSystemSubjects() {
  return useQuery({
    queryKey: ["all_system_subjects"],
    queryFn: getAllSystemSubjects,
    select: (res) => res.data.subjects,
  });
}
