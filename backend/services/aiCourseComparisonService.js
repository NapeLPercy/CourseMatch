const { v4: uuidv4 } = require("uuid");
const db = require("../config/db");
const AiCourseComparisonModel = require("../models/aiCourseComparisonModel");
const { generateCourseComparison } = require("./aiCourseComparisonBuilder");

async function getOrCreateCourseComparison(
  userId,
  qualifications,
  profile,
  subjects,
) {
  const courseCodes = qualifications.map((course) => course.course_code);
  const id = uuidv4();

  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) return reject(err);

      connection.beginTransaction(async (err) => {
        if (err) {
          connection.release();
          return reject(err);
        }

        try {
          // 1. CHECK IF EXISTS FIRST
          const existing = await AiCourseComparisonModel.getByUserAndCourses(
            userId,
            courseCodes,
          );

          if (existing) {
            connection.release();

            return resolve({
              id: existing.id,
              userId: existing.user_id,
              comparisonData:
                typeof existing.comparison_data === "string"
                  ? JSON.parse(existing.comparison_data)
                  : existing.comparison_data,
            });
          }

          // 2. GENERATE AI
          const comparisonData = await generateCourseComparison(
            qualifications[0],
            qualifications[1],
            profile,
            subjects,
          );

          // 3. INSERT
          await AiCourseComparisonModel.insertComparison(connection, {
            id,
            userId,
            comparisonData: JSON.stringify(comparisonData),
          });

          for (const courseCode of courseCodes) {
            await AiCourseComparisonModel.insertCourseLink(
              connection,
              id,
              courseCode,
            );
          }

          await new Promise((res, rej) => {
            connection.commit((err) => {
              if (err) return rej(err);
              res();
            });
          });

          // 4. ALWAYS FETCH AFTER CREATE (your rule)
          const createdRow = await AiCourseComparisonModel.getByUserAndCourses(
            userId,
            courseCodes,
          );

          connection.release();

          return resolve({
            id: createdRow.id,
            userId: createdRow.user_id,
            comparisonData:
              typeof createdRow.comparison_data === "string"
                ? JSON.parse(createdRow.comparison_data)
                : createdRow.comparison_data,
          });
        } catch (error) {
          connection.rollback(() => {
            connection.release();
            reject(error);
          });
        }
      });
    });
  });
}

module.exports = { getOrCreateCourseComparison };
