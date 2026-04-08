import computeAPS from "../apsCalculators/apsCalculator";
import filterCoursesByEndorsement from "./filterByEndorsement";
import FilterBySubjects from "./filterBySubjects";

/*
Multi-university course filter pipeline:

1. Filter courses by APS (each university has its own APS rules)
2. Filter by endorsement
3. Filter by prerequisite subjects

Output:
- filtered courses
- APS per university (for UI)
- number of qualified universities
*/

export default class MultiCourseFilter {
  constructor(subjects, qualifications, studentEndorsement) {
    this.subjects = subjects;
    this.qualifications = qualifications;
    this.studentEndorsement = studentEndorsement;

    // Cache APS per university
    this.apsCache = new Map();
  }

  // -----------------------------
  // APS CALCULATION (cached)
  // -----------------------------
  getAPS(universitySlug) {
    if (!this.apsCache.has(universitySlug)) {
      const aps = computeAPS(this.subjects, universitySlug);
      this.apsCache.set(universitySlug, aps);
    }

    return this.apsCache.get(universitySlug);
  }

  // -----------------------------
  // APS FILTER (core step)
  // -----------------------------
  filterByAps() {
    return this.qualifications.filter((course) => {
      const uni = course.university?.abbreviation;
      const aps = this.getAPS(uni);

      return course.minimum_aps <= aps;
    });
  }

  // -----------------------------
  // BUILD APS SUMMARY (UI feature)
  // -----------------------------
  buildUniversityAPS(finalCourses) {
    const uniMap = new Map();

    // Step 1: group courses per university
    finalCourses.forEach((course) => {
      const uniSlug = course.university?.abbreviation;

      if (!uniMap.has(uniSlug)) {
        uniMap.set(uniSlug, {
          name: course.university?.name,
          abbreviation: uniSlug,
          courseCount: 0,
        });
      }

      uniMap.get(uniSlug).courseCount++;
    });

    // Step 2: attach APS
    const result = [];

    for (const [uniSlug, data] of uniMap.entries()) {
      result.push({
        ...data,
        aps: this.getAPS(uniSlug), // reuse cached APS
      });
    }

    return result;
  }

  // -----------------------------
  // FULL PIPELINE
  // -----------------------------
  getQualifiedCourses() {
    // Step 1: APS filter
    const apsFiltered = this.filterByAps();

    // Step 2: endorsement filter
    const endorsementFiltered = filterCoursesByEndorsement(
      apsFiltered,
      this.studentEndorsement,
    );

    // Step 3: subject prerequisite filter
    const subjectFilter = new FilterBySubjects();

    const finalCourses = subjectFilter.filterCoursesByPrerequisites(
      this.subjects,
      endorsementFiltered,
    );

    const universityAPS = this.buildUniversityAPS(finalCourses);
    return {
      courses: finalCourses,
      universityAPS,
      qualifiedUniversities: universityAPS.length,
    };
  }
}
