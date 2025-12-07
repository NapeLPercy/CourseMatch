class SubjectSanitizer {
  constructor(subjects = []) {
    this.subjects = subjects;
  }

  setSubjects(subjects) {
    this.subjects = subjects;
  }

  sanitize() {
    // Identify core subjects
    const homeLanguage = this.subjects.find(s => s.name.endsWith("HL"));
    const firstAdditional = this.subjects.find(s => s.name.endsWith("FAL"));
    const lifeOrientation = this.subjects.find(
      s => s.name === "Life Orientation" || s.name === "LO"
    );
    const mathOrLit = this.subjects.find(
      s => s.name === "Mathematics" || s.name === "Mathematical Literacy"
    );

    // Filter out compulsory subjects to get electives
    const electives = this.subjects.filter(
      s =>
        s !== homeLanguage &&
        s !== firstAdditional &&
        s !== lifeOrientation &&
        s !== mathOrLit
    );

    // Sort electives by highest mark
    const topElectives = electives
      .sort((a, b) => b.mark - a.mark)
      .slice(0, 3); // pick best 3

    // Final sanitized list of exactly 7 subjects
    return [
      homeLanguage,
      firstAdditional,
      mathOrLit,
      lifeOrientation,
      ...topElectives,
    ];
  }
}

// Export if needed
if (typeof module !== "undefined" && module.exports) {
  module.exports = SubjectSanitizer;
}
