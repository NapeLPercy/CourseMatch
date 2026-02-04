const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv");
dotenv.config();

const StudentModel = require("../models/Student");
const SubjectModel = require("../models/Subject");
const SubjectSanitizer = require("../services/SubjectSanitizer");
const MatrixEndorsement = require("../services/MatrixEndorsement");

//Add subjects
exports.addSubjects = async (req, res) => {
  try {
   
    const { subjects} = req.body;
    const userId = req.userId;
    const studentId = uuidv4();

    if (!subjects || !userId) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    //clean subjects 
    const sanitizedSubjects = new SubjectSanitizer(subjects).sanitize();
    
    //compute matric endorsement
    let endorsement = new MatrixEndorsement(sanitizedSubjects).determine();

    //Insert student
    await StudentModel.createStudent(studentId, endorsement, userId);

    //Prepare subject values
    const subjectValues = subjects.map((s) => [
      uuidv4(),
      s.name,
      s.mark,
      s.endorsementSubject,
      studentId,
    ]);

    //Insert all subjects
    await SubjectModel.insertSubjects(subjectValues);

    return res.status(201).json({
      success: true,
      message: "Subjects added successfully",
      endorsementSubjects: sanitizedSubjects,
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
    const { studentId } = req.params;
    const userId = req.userId;

    //delegate to subject model
    const subjects = await SubjectModel.getSubjectsByStudentIdForUser(studentId, userId);

    return res.status(200).json({
      subjects:subjects,
      success:true,
      message:"Subjects successfuly fetched!",
    });


  } catch (error) {
    console.error("Get subjects error:", error);
    return res.status(500).json({
      message: "Error fetching subjects",
      success:false,
    });
  }
};


exports.updateMark = async (req, res) => {
  try {
    const { subjectId } = req.params;    
    const { Mark } = req.body;            

    console.log(subjectId, Mark);
    if (Mark === undefined || Mark === null) {
      return res.status(400).json({ message: "Mark is required" });
    }

    // optional: validate mark is a number 0-100
    const markNum = Number(Mark);
    if (!Number.isFinite(markNum) || markNum < 0 || markNum > 100) {
      return res.status(400).json({ message: "Mark must be 0-100" });
    }

    const updated = await SubjectModel.updateMark(subjectId, markNum);

    console.log(updated,"HERE WE ARE");
    
    return res.status(200).json({
      message: "Mark updated",
      success: true,
    });

  } catch (err) {
    console.error(err);
     return res.status(500).json({
      message: "Server error: ",
      success:false
    });
  }
};

