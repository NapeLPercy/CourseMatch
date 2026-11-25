import { addCareerGoals, getCareerGoals } from "../services/studentService";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useAddCareerGoals() {
  return useMutation({
    mutationFn: (careerGoals) => addCareerGoals(careerGoals),
  });
}

export function useGetCareerGoals() {
  return useQuery({
    queryKey: ["career_goals"],
    queryFn: getCareerGoals,
    select: (res) => res.data.goals,
  });
}
