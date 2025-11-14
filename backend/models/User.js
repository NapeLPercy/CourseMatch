const Account = require('./Account');

class User {
  constructor(idNumber, name, surname, gender, account = null) {
    this.idNumber = idNumber;
    this.name = name;
    this.surname = surname;
    this.gender = gender;
    this.account = account instanceof Account ? account : null;
  }

  getIdNumber() {
    return this.idNumber;
  }

  setIdNumber(idNumber) {
    this.idNumber = idNumber;
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

  getGender() {
    return this.gender;
  }

  setGender(gender) {
    this.gender = gender;
  }

  getAccount() {
    return this.account;
  }

  setAccount(account) {
    this.account = account;
  }
}

module.exports = User;
