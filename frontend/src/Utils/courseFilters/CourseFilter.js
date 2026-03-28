import filterCoursesByAps from "./filterByAps";
import filterCoursesByEndorsement from "./filterByEndorsement";
import FilterBySubjects from "./filterBySubjects";

/*
1 filter courses by APS
2 takes aps filtered courses and filters them by endorsement
3 takes endorsement filtered courses and filters them by prerequiste subjects*/
export default class CourseFilter {
  constructor(subjects, qualifications, studentEndorsement, universitySlug) {
    this.subjects = subjects;
    this.qualifications = qualifications;
    this.studentEndorsement = studentEndorsement;
    this.universitySlug = universitySlug;
  }

  //First filter
  getQualifiedCourses() {
    
    const qualifiedByAps = filterCoursesByAps(
      this.qualifications,
      this.subjects,
      this.universitySlug,
    );

    // Second filter
    const qualifiedByEndorsement = filterCoursesByEndorsement(
      qualifiedByAps,
      this.studentEndorsement,
    );

    return qualifiedByEndorsement;
    // Third filter
    const filterBySubjects = new FilterBySubjects();
    return filterBySubjects.filterCoursesByPrerequisites(
      this.subjects,
      qualifiedByEndorsement,
    );
  }
}
