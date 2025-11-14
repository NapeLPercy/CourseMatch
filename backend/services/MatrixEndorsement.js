/**
 * South African NSC (National Senior Certificate) Endorsement Calculator
 * Based on official Umalusi requirements
 */

class MatrixEndorsement {
 // Minimum requirements
  static MIN_HOME_LANGUAGE_MARK = 40;
  static MIN_SUBJECTS_PASS = 6;
  static TOTAL_SUBJECTS_REQUIRED = 7;

  constructor(studentSubjects = []) {
    // studentSubjects format: { "English HL": ["65", "level"], "Mathematics": ["72", "level"], ... }
    this.studentSubjects = studentSubjects;
  }

  setStudentSubjects(studentSubjects) {
    this.studentSubjects = studentSubjects;
  }

  /**
   * Determines the endorsement type for the student
   * @returns {string} - "Bachelor", "Diploma", "Higher Certificate", or "Does not have NSC"
   */
  getStudentEndorsement() {
    if (this.isBachelor()) {
      return "Bachelor";
    } else if (this.isDiploma()) {
      return "Diploma";
    } else if (this.isCertificate()) {
      return "Higher Certificate";
    }
    return "Does not have NSC";
  }

  /**
   * Bachelor's Pass Requirements:
   * - Pass 6 out of 7 subjects (minimum 40%)
   * - At least 4 subjects at 50% or more (Level 4+)
   * - At least 2 subjects at 60% or more (Level 5+)
   * - Home Language at 40% or more (Level 3+)
   * - At least 30% in Life Orientation
   */
  isBachelor() {
    if (!this.hasPassedMinimumSubjects()) return false;
    if (!this.hasHomeLanguagePass()) return false;

    const marks = this.getAllMarks();
    const level4Plus = marks.filter(mark => mark >= 50).length; // 50%+ (Level 4+)
    const level5Plus = marks.filter(mark => mark >= 60).length; // 60%+ (Level 5+)

    return level4Plus >= 4 && level5Plus >= 2;
  }

  /**
   * Diploma Pass Requirements:
   * - Pass 6 out of 7 subjects (minimum 40%)
   * - At least 4 subjects at 40% or more (Level 3+)
   * - At least 2 subjects at 50% or more (Level 4+)
   * - Home Language at 40% or more (Level 3+)
   * - At least 30% in Life Orientation
   */
  isDiploma() {
    if (!this.hasPassedMinimumSubjects()) return false;
    if (!this.hasHomeLanguagePass()) return false;

    const marks = this.getAllMarks();
    const level3Plus = marks.filter(mark => mark >= 40).length; // 40%+ (Level 3+)
    const level4Plus = marks.filter(mark => mark >= 50).length; // 50%+ (Level 4+)

    return level3Plus >= 4 && level4Plus >= 2;
  }

  /**
   * Higher Certificate Pass Requirements:
   * - Pass 6 out of 7 subjects (minimum 40%)
   * - At least 2 subjects at 40% or more (Level 3+)
   * - At least 4 subjects at 30% or more (Level 2+)
   * - Home Language at 40% or more (Level 3+)
   * - At least 30% in Life Orientation
   */
  isCertificate() {
    if (!this.hasPassedMinimumSubjects()) return false;
    if (!this.hasHomeLanguagePass()) return false;

    const marks = this.getAllMarks();
    const level3Plus = marks.filter(mark => mark >= 40).length; // 40%+ (Level 3+)
    const level2Plus = marks.filter(mark => mark >= 30).length; // 30%+ (Level 2+)

    return level3Plus >= 2 && level2Plus >= 4;
  }

  /**
   * Checks if student passed at least 6 out of 7 subjects (40%+)
   * Note: Life Orientation requires 30%+ to pass
   */
    hasPassedMinimumSubjects() {
    let passedCount = 0;

    for (const [subjectName, subjectData] of Object.entries(this.studentSubjects)) {
      const mark = parseInt(subjectData[0], 10);
      
      // Life Orientation has a lower pass requirement (30%)
      if (this.isLifeOrientation(subjectName)) {
        if (mark >= 30) passedCount++;
      } else {
        if (mark >= 40) passedCount++;
      }
    }

    return passedCount >= MatrixEndorsement.MIN_SUBJECTS_PASS;
  }

  /**
   * Checks if Home Language meets minimum requirement (40%)
   */
  hasHomeLanguagePass() {
    for (const [subjectName, subjectData] of Object.entries(this.studentSubjects)) {
      if (this.isHomeLanguage(subjectName)) {
        const mark = parseInt(subjectData[0], 10);
        return mark >= MatrixEndorsement.MIN_HOME_LANGUAGE_MARK;
      }
    }
    return false; // No Home Language found
  }

  /**
   * Gets all marks excluding Life Orientation (for endorsement calculations)
   */
  getAllMarks() {
    const marks = [];
    for (const [subjectName, subjectData] of Object.entries(this.studentSubjects)) {
      if (!this.isLifeOrientation(subjectName)) {
        marks.push(parseInt(subjectData[0], 10));
      }
    }
    return marks;
  }

  /**
   * Checks if subject is a Home Language
   */
  isHomeLanguage(subjectName) {
    return subjectName.toUpperCase().includes('HL') || 
           subjectName.toUpperCase().endsWith(' HOME LANGUAGE');
  }

  /**
   * Checks if subject is Life Orientation
   */
  isLifeOrientation(subjectName) {
    return subjectName.toUpperCase().includes('LIFE ORIENTATION') ||
           subjectName.toUpperCase() === 'LO';
  }

  /**
   * Converts a percentage mark to achievement level
   */
  static getAchievementLevel(mark) {
    if (mark >= 80) return 7;
    if (mark >= 70) return 6;
    if (mark >= 60) return 5;
    if (mark >= 50) return 4;
    if (mark >= 40) return 3;
    if (mark >= 30) return 2;
    return 1;
  }
}

// Export for use as module
if (typeof module !== 'undefined' && module.exports) {
  module.exports = MatrixEndorsement;
}