/* 1 Indentify compulsory subjects(HL,FAL, Math and LO)
2 Indentify 3 highest eletives(minimun of 3)
*/

class SubjectsSanitizer {
  constructor(subjects = []) {
    this.subjects = subjects;
  }

  setSubjects(subjects) {
    this.subjects = subjects;
  }

  sanitize() {
    const homeLanguage = this.subjects.find((s) => s.name.endsWith("HL"));
    const firstAdditional = this.subjects.find((s) => s.name.endsWith("FAL"));
    const lifeOrientation = this.subjects.find(
      (s) => s.name === "Life Orientation" || s.name === "LO",
    );
    const mathOrLit = this.subjects.find(
      (s) =>
        s.name === "Mathematics" ||
        s.name === "Mathematical Literacy" ||
        "Technical Mathematics",
    );

    const topElectives = this.subjects
      .filter(
        (s) =>
          s !== homeLanguage &&
          s !== firstAdditional &&
          s !== lifeOrientation &&
          s !== mathOrLit,
      )
      .sort((a, b) => b.mark - a.mark)
      .slice(0, 3);

    // Final sanitized list of exactly 7 subjects
    const apsSubjects = [
      homeLanguage,
      firstAdditional,
      mathOrLit,
      lifeOrientation,
      ...topElectives,
    ];

    apsSubjects.forEach((subject) => {
      subject.aps_subject = 1;
    });

    return apsSubjects;
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = SubjectsSanitizer;
}
