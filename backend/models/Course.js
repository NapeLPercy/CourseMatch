class Course {
  constructor(name, code, minimumAps, duration, prerequisiteSubjects = []) {
    this.name = name;
    this.code = code;
    this.minimumAps = minimumAps;
    this.duration = duration;
    this.needMath = false;
    this.minumumEndorsement = null;
    this.prerequisiteSubjects = prerequisiteSubjects; // array of PrerequisiteSubject
  }

  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
  }

  getCode() {
    return this.code;
  }

  setCode(code) {
    this.code = code;
  }

  getMinimumAps() {
    return this.minimumAps;
  }

  setMinimumAps(minimumAps) {
    this.minimumAps = minimumAps;
  }

  getDuration() {
    return this.duration;
  }

  setDuration(duration) {
    this.duration = duration;
  }

  isNeedMath() {
    return this.needMath;
  }

  setNeedMath(needMath) {
    this.needMath = needMath;
  }

  getMinumumEndorsement() {
    return this.minumumEndorsement;
  }

  setMinumumEndorsement(minumumEndorsement) {
    this.minumumEndorsement = minumumEndorsement;
  }

  getPrerequisiteSubjects() {
    return this.prerequisiteSubjects;
  }

  setPrerequisiteSubjects(prerequisiteSubjects) {
    this.prerequisiteSubjects = prerequisiteSubjects;
  }
}

module.exports = Course;
