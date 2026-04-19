const { v4: uuidv4 } = require("uuid");
const db = require("../config/db");
const aiCourseDeepDiveModel = require("../models/aiCourseDeepDiveModel");
const { generateDeepDive } = require("./aiCourseDeepDiveBuilder");
const {
  cleanProfile,
  cleanSubjects,
  cleanQualification,
} = require("./aiInputSanitizer");

const getOrCreateDeepDive = async ({
  userId,
  qualification,
  studentProfile,
  subjects,
}) => {
  //  Check if exists
  const existing = await aiCourseDeepDiveModel.getDeepDive({
    userId,
    courseId: qualification.course_code,
  });

  if (existing) {
    return existing;
  }

  //delete unnecesary data
  const cleanSubjectsData = cleanSubjects(subjects);
  const cleanProfileData = cleanProfile(studentProfile);
  const cleanQualificationData = cleanQualification(qualification);

  const aiInput = {
    qualification: cleanQualificationData,
    profile: cleanProfileData,
    subjects: cleanSubjectsData,
  };


  // Generate AI data (NO TRANSACTION HERE)
  const aiData = await generateDeepDive(aiInput);
  
  const deepDive = {
    id: uuidv4(),
    userId: userId,
    courseId: qualification.course_code,
    ...aiData,
  };


  const results = await aiCourseDeepDiveModel.createDeepDive(deepDive);
  return deepDive;
};

module.exports = { getOrCreateDeepDive };
