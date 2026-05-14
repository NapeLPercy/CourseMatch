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
- number of universities where the student qualifies for at least 1 course
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
      const uniSlug = course.university?.abbreviation;
      const aps = this.getAPS(uniSlug);

      return course.minimum_aps <= aps;
    });
  }

  // -----------------------------
  // BUILD APS SUMMARY
  // Returns ALL universities, even if courseCount = 0
  // -----------------------------
  buildUniversityAPS(finalCourses) {
    const uniMap = new Map();

    // Step 1: Initialize all universities from full qualifications list
    this.qualifications.forEach((course) => {
      const uniSlug = course.university?.abbreviation;

      if (!uniMap.has(uniSlug)) {
        uniMap.set(uniSlug, {
          name: course.university?.name,
          abbreviation: uniSlug,
          aps: this.getAPS(uniSlug),
          courseCount: 0,
        });
      }
    });

    // Step 2: Count qualified courses per university
    finalCourses.forEach((course) => {
      const uniSlug = course.university?.abbreviation;

      if (uniMap.has(uniSlug)) {
        uniMap.get(uniSlug).courseCount += 1;
      }
    });

    // Step 3: Convert map to array
    return Array.from(uniMap.values());
  }

  // -----------------------------
  // FULL PIPELINE
  // -----------------------------
  getQualifiedCourses() {
    // Step 1: APS filter
    const apsFiltered = this.filterByAps();

    // Step 2: Endorsement filter
    const endorsementFiltered = filterCoursesByEndorsement(
      apsFiltered,
      this.studentEndorsement
    );

    // Step 3: Subject prerequisite filter
    const subjectFilter = new FilterBySubjects();

    const finalCourses = subjectFilter.filterCoursesByPrerequisites(
      this.subjects,
      endorsementFiltered
    );

    // Step 4: Build UI summary (includes all universities)
    const universityAPS = this.buildUniversityAPS(finalCourses);

    return {
      courses: finalCourses,
      universityAPS,
      // only count universities with at least one qualified course
      qualifiedUniversities: universityAPS.filter(
        (uni) => uni.courseCount > 0
      ).length,
    };
  }
}