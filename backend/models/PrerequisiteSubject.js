class PrerequisiteSubject {
  constructor(name, minimumMark) {
    this.name = name;
    this.minimumMark = minimumMark;
  }

  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
  }

  getMinimumMark() {
    return this.minimumMark;
  }

  setMinimumMark(minimumMark) {
    this.minimumMark = minimumMark;
  }
}

module.exports = PrerequisiteSubject;
