const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv");
dotenv.config();
const { getSubjects, addSubjects } = require("../services/subjectService");

/*Add subjects*/
exports.addSubjects = async (req, res) => {
  try {
    const { subjects } = req.body;
    const userId = req.userId;
    const studentId = req.studentId;

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "You are not authorized" });
    }

    if (!subjects) {
      return res.status(400).json({
        success: false,
        message: "Subjects are required",
      });
    }


    await addSubjects(subjects, studentId, userId);

    return res.status(201).json({
      success: true,
      message: "Subjects added successfully",
      subjects: subjects,
    });
  } catch (error) {
    console.error("Add subjects error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while adding subjects",
    });
  }
};

// Get subjects for a student
exports.getSubjects = async (req, res) => {
  try {
    const { userId, studentId } = req;

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "You are not authorized" });
    }

    if (!studentId) {
      return res
        .status(400)
        .json({ success: false, message: "Student id is required" });
    }
    //delegate to subject model
    const subjects = await getSubjects(studentId);

    console.log("here are my subjects");
    return res.status(200).json({
      subjects: subjects,
      success: true,
      message: "Subjects successfuly fetched!",
    });
  } catch (error) {
    console.error("Get subjects error:", error);
    return res.status(500).json({
      message: "Error fetching subjects",
      success: false,
    });
  }
};

exports.updateMark = async (req, res) => {
  try {
    const { subjectId } = req.params;
    const { Mark } = req.body;
    const { userId } = req.user;

    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "You are not authorized" });
    }

    if (Mark === undefined || Mark === null) {
      return res.status(400).json({ message: "Mark is required" });
    }

    // optional: validate mark is a number 0-100
    const markNum = Number(Mark);
    if (!Number.isFinite(markNum) || markNum < 0 || markNum > 100) {
      return res.status(400).json({ message: "Mark must be 0-100" });
    }

    await updateMark(subjectId, markNum);

    return res.status(200).json({
      message: "Mark updated",
      success: true,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Server error: ",
      success: false,
    });
  }
};
