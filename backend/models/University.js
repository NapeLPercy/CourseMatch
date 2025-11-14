class University {
  constructor(name, abbreviation, url, faculties = []) {
    this.name = name;
    this.abbreviation = abbreviation;
    this.url = url;
    this.faculties = faculties; // array of Faculty
  }

  getName() {
    return this.name;
  }

  setName(name) {
    this.name = name;
  }

  getAbbreviation() {
    return this.abbreviation;
  }

  setAbbreviation(abbreviation) {
    this.abbreviation = abbreviation;
  }

  getUrl() {
    return this.url;
  }

  setUrl(url) {
    this.url = url;
  }

  getFaculties() {
    return this.faculties;
  }

  setFaculties(faculties) {
    this.faculties = faculties;
  }
}

module.exports = University;
