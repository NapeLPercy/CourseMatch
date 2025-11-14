class Faculty {
  constructor(name, qualifications = []) {
    this.name = name;
    this.qualifications = qualifications; // array of Qualification objects
  }

  getQualifications() {
    return this.qualifications;
  }

  setQualifications(qualifications) {
    this.qualifications = qualifications;
  }

  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
  }
}

module.exports = Faculty;
