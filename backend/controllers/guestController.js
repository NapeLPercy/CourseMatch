const dotenv = require("dotenv");
dotenv.config();

const { guestGetAllQualifications, guestGetQualificationsByFilter } = require("../services/guestService");

const {
  computeEndorsementAndAPSSubjects,
} = require("../services/subjectService");

/* 1 Get all qualifications and thier faculty
2 Sanitize subjects
3 Compute endorsement
*/
exports.guestGetAllQualifications = async (req, res) => {
  try {
    const { subjects } = req.body;

    const { sanitizedSubjects, endorsement } =
      computeEndorsementAndAPSSubjects(subjects);

    const qualifications = await guestGetAllQualifications();

    return res.status(200).json({
      qualifications: qualifications,
      sanitizedSubjects,
      endorsement,
      success: true,
      message: "Qualifications successfuly fetched!",
    });
  } catch (error) {
    console.error("Get qualifications error:", error);
    return res.status(500).json({
      message: "Error fetching qualifications",
      success: false,
    });
  }
};

//guestget qualifications
exports.guestGetQualificationsByFilter = async (req, res) => {
  try {
    const { keyword } = req.params;
    const qualifications =
      await guestGetQualificationsByFilter(keyword);

    res.status(200).json(qualifications);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to fetch qualifications",
    });
  }
};
