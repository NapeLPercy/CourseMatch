import {
  addPersonalityProfile,
  getPersonalityProfile,
} from "../services/studentService";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useAddPersonalityProfile() {
  console.log("About to submit data to users");
  return useMutation({
    mutationFn: (personalityProfile) =>
      addPersonalityProfile(personalityProfile),
  });
}

export function useGetPersonalityProfile() {
  return useQuery({
    queryKey: ["personality_profile"],
    queryFn: getPersonalityProfile,
    select: (res) => res.data.personality,
  });
}
