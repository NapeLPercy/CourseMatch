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
  recommendedCourse,
  studentProfile,
  subjects,
}) => {
  const existingDeepDive = await aiCourseDeepDiveModel.getDeepDive({
    userId,
    courseId: recommendedCourse.course_code,
  });

  if (existingDeepDive) {
    return appendMissingProperties(existingDeepDive, recommendedCourse);
  }

  //delete unnecesary data
  const cleanSubjectsData = cleanSubjects(subjects);
  const cleanProfileData = cleanProfile(studentProfile);
  const cleanQualificationData = cleanQualification(recommendedCourse);

  const aiInput = {
    qualification: cleanQualificationData,
    profile: cleanProfileData,
    subjects: cleanSubjectsData,
  };

  // Generate AI data (NO TRANSACTION HERE)
  const generatedDeepDive = await generateDeepDive(aiInput);
  generatedDeepDive = appendMissingProperties(
    existingDeepDive,
    recommendedCourse,
  );

  const deepDive = {
    id: uuidv4(),
    userId: userId,
    courseId: recommendedCourse.course_code,
    ...generatedDeepDive,
  };

  await aiCourseDeepDiveModel.createDeepDive(deepDive);
  deepDive.createdAt = Date.now();
  return deepDive;
};

function appendMissingProperties(deepDive, course) {
  const {
    minimum_nqf: nqf,
    fit_score,
    minimum_aps: aps,
    faculty_name: faculty,
    qualification_name,
    university_name,
  } = course;

  return Object.assign(deepDive, {
    nqf,
    fit_score,
    aps,
    faculty,
    qualification_name,
    university_name,
  });
}

module.exports = { getOrCreateDeepDive };
