class Student {
  constructor(name, surname, APS, endorsement, subjects = []) {
    this.name = name;
    this.surname = surname;
    this.APS = APS;
    this.endorsement = endorsement;
    this.subjects = subjects; // array of Subject
    this.studentId = null;
  }

  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
  }

  getSurname() {
    return this.surname;
  }

  setSurname(surname) {
    this.surname = surname;
  }

  getAPS() {
    return this.APS;
  }

  setAPS(APS) {
    this.APS = APS;
  }

  getEndorsement() {
    return this.endorsement;
  }

  setEndorsement(endorsement) {
    this.endorsement = endorsement;
  }

  getSubjects() {
    return this.subjects;
  }

  setSubjects(subjects) {
    this.subjects = subjects;
  }

  getStudentId() {
    return this.studentId;
  }

  setStudentId(studentId) {
    this.studentId = studentId;
  }
}

module.exports = Student;
