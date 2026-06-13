const { v4: uuidv4 } = require("uuid");
const prospectusModel = require("../models/Prospectus");

const addProspectus = async (universityCode, title, fileBuffer) => {
  const prospectusValues = [
    uuidv4(),
    universityCode.toUpperCase(),
    title,
    fileBuffer
  ];

  return await prospectusModel.addProspectus(prospectusValues);
};

const getProspectusPdf = async (universityCode) => {
  return await prospectusModel.getProspectusByUniversityCode(
    universityCode.toUpperCase()
  );
};

const deleteProspectus = async (universityCode) => {
  return await prospectusModel.deleteProspectus(
    universityCode.toUpperCase()
  );
};

module.exports = {
  addProspectus,
  getProspectusPdf,
  deleteProspectus
};