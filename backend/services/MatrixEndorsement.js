class MatricEndorsement {
  constructor(subjects = []) {
    this.subjects = subjects.map(s => ({
      ...s,
      mark: Number(s.mark)
    }));
  }

  // -------- HELPERS --------
  getHomeLanguage() {
    return this.subjects.find(
      s => s.name.endsWith("HL") || s.name === "Sesotho HL" || s.name === "English HL"
    );
  }

  getLifeOrientation() {
    return this.subjects.find(
      s => s.name === "Life Orientation" || s.name === "LO"
    );
  }

  getOtherSubjects() {
    const hl = this.getHomeLanguage();
    const lo = this.getLifeOrientation();
    return this.subjects.filter(s => s !== hl && s !== lo);
  }

  // ---------------- NSC PASS BASELINE ----------------
  /**
   * NSC Pass requires:
   * - HL >= 40%
   * - Pass at least 6 out of 7 subjects (>=30%)
   * - This means you can fail 1 subject (get below 30%)
   */
  hasNSCPass() {
    const hl = this.getHomeLanguage();
    if (!hl || hl.mark < 40) return false;

    // Count how many subjects passed at 30% or higher
    const passedSubjects = this.subjects.filter(s => s.mark >= 30).length;
    
    // Need at least 6 subjects passed (can fail 1)
    return passedSubjects >= 6;
  }

  // ---------------- ENDORSEMENTS ----------------
  /**
   * Bachelor's Degree Pass:
   * - HL >= 40%
   * - 4 subjects >= 50% (excluding HL and LO)
   * - Remaining subjects >= 30% (can have 1 failure)
   * - Must pass at least 6 out of 7 subjects total
   */
  isBachelor() {
    if (!this.hasNSCPass()) return false;
    
    const hl = this.getHomeLanguage();
    const lo = this.getLifeOrientation();
    const others = this.subjects.filter(s => s !== hl && s !== lo);
    
    const at50Plus = others.filter(s => s.mark >= 50).length;
    
    // Need 4 subjects at 50% or higher (from the 5 non-HL, non-LO subjects)
    // The other 1-2 subjects can be at 30%+ OR one can fail
    return at50Plus >= 4;
  }

  /**
   * Diploma Pass:
   * - HL >= 40%
   * - 4 subjects >= 40% (excluding HL and LO)
   * - Remaining subjects >= 30% (can have 1 failure)
   * - Must pass at least 6 out of 7 subjects total
   */
  isDiploma() {
    if (!this.hasNSCPass()) return false;
    
    const hl = this.getHomeLanguage();
    const lo = this.getLifeOrientation();
    const others = this.subjects.filter(s => s !== hl && s !== lo);
    
    const at40Plus = others.filter(s => s.mark >= 40).length;
    
    // Need 4 subjects at 40% or higher (from the 5 non-HL, non-LO subjects)
    return at40Plus >= 4;
  }

  /**
   * Higher Certificate Pass:
   * - HL >= 40%
   * - 2 subjects >= 40% (excluding HL, but LO can count)
   * - 3 subjects >= 30% (excluding HL)
   * - Must pass at least 6 out of 7 subjects total
   */
  isHigherCertificate() {
    if (!this.hasNSCPass()) return false;
    
    const hl = this.getHomeLanguage();
    const others = this.subjects.filter(s => s !== hl);
    
    const at40Plus = others.filter(s => s.mark >= 40).length;
    const at30Plus = others.filter(s => s.mark >= 30).length;
    
    // Need 2 at 40%+ and at least 3 more at 30%+ (can have 1 failure)
    return at40Plus >= 2 && at30Plus >= 5;
  }

  // ---------------- FINAL RESULT ----------------
  determine() {
    const hl = this.getHomeLanguage();
    
    if (!hl) return "Failure - No Home Language";
    if (hl.mark < 40) return "Failure - Home Language below 40%";
    
    // Check if minimum 6 subjects passed
    const passedSubjects = this.subjects.filter(s => s.mark >= 30).length;
    if (passedSubjects < 6) return "Failure - Less than 6 subjects passed";

    // Check in order of most stringent to least stringent
    if (this.isBachelor()) return "Bachelor";
    if (this.isDiploma()) return "Diploma";
    if (this.isHigherCertificate()) return "Certificate";

    return "NSC Pass (No Higher Education Access)";
  }
}

module.exports = MatricEndorsement;