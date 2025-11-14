class Subject {
  constructor(name, mark) {
    this.name = name;
    this.mark = mark;
    this.studentId = null;
    this.subjectId = null;
  }

  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
  }

  getMark() {
    return this.mark;
  }

  setMark(mark) {
    this.mark = mark;
  }

  getStudentId() {
    return this.studentId;
  }

  setStudentId(studentId) {
    this.studentId = studentId;
  }

  getSubjectId() {
    return this.subjectId;
  }

  setSubjectId(subjectId) {
    this.subjectId = subjectId;
  }
}

module.exports = Subject;
