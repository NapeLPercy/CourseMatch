import computeAPS from "../apsCalculators/apsCalculator";

/*1 calculate aps
2 filters course by the aps
*/
export default function filterCoursesByAps(
  qualifications,
  subjects,
  universitySlug,
) {
  const aps = computeAPS(subjects, universitySlug);
  sessionStorage.setItem("aps", aps);
  return qualifications.filter((q) => q.minimum_aps <= aps);
}
