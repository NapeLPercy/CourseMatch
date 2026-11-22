import { useQuery } from "@tanstack/react-query";
import { guestFilterQualifications } from "../services/guestService";

export function useGuestFilterQualifications(courseCategory) {
  return useQuery({
    queryKey: [courseCategory],
    queryFn: () => guestFilterQualifications(courseCategory),
  });
}
