const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv");
dotenv.config();

const StudentModel = require("../models/Student");
const SubjectModel = require("../models/Subject");
const SubjectSanitizer = require("../services/SubjectSanitizer");
const MatrixEndorsement = require("../services/MatrixEndorsement");

//Add subjects (async/await version)
exports.addSubjects = async (req, res) => {
  try {
    const { subjects, userId } = req.body;
    const studentId = uuidv4();

    if (!subjects || !userId) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    console.log("Subjects before clean ===", subjects);

    const sanitizedSubjects = new SubjectSanitizer(subjects).sanitize();

    console.log("Subjects after clean ===", sanitizedSubjects);

    let endorsement = new MatrixEndorsement(sanitizedSubjects).determine();
    console.log("Student endorsement is:", endorsement);
  
    
    //Insert student
    await StudentModel.createStudent(studentId, endorsement, userId);

    //Prepare subject values
    const subjectValues = subjects.map((s) => [
      uuidv4(),
      s.name,
      s.mark,
      studentId,
    ]);

    //Insert all subjects
    await SubjectModel.insertSubjects(subjectValues);

    return res.status(201).json({
      success: true,
      message: "Subjects added successfully",
    });
  } catch (error) {
    console.error("Add subjects error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while adding subjects",
    });
  }
};

// =======================================
// ✅ Get subjects for a student (async)
// =======================================
exports.getSubjects = async (req, res) => {
  console.log("About to get the data ");
  try {
    const { studentId } = req.params;

    const subjects = await SubjectModel.getSubjectsByStudentId(studentId);

    console.log("Subjects", subjects);
    return res.status(200).json(subjects);
  } catch (error) {
    console.error("Get subjects error:", error);
    return res.status(500).json({
      message: "Error fetching subjects",
    });
  }
};
