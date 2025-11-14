const MatrixEndorsement = require("../services/MatrixEndorsement") ;

const db = require("../config/db"); // import your MySQL connection
const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv");
dotenv.config();

// ✅ Register a new student and their subjects
exports.addSubjects = async (req, res) => {
  const { subjects, userId } = req.body;
  const studentId = uuidv4();

  const endorsement = new MatrixEndorsement(subjects).getStudentEndorsement() ;
console.log("Student endorsement is",endorsement);

return;

  console.log("In the server",subjects, userId);
  if (!subjects) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // 1️⃣ Insert into student table
  const studentQuery = `
    INSERT INTO student (student_id, endorsement, user_id)
    VALUES (?, ?, ?)
  `;

  db.query(studentQuery, [studentId, endorsement, userId], (err) => {
    if (err) {
      console.error("Error inserting student:", err);
      return res.status(500).json({ message: "Error inserting student",success:false });
    }

    // 2️⃣ Insert subjects
    const subjectQuery = `
      INSERT INTO subject (subject_id, name, mark, student_id)
      VALUES ?
    `;

    const subjectValues = subjects.map((s) => [
      uuidv4(),
      s.name,
      s.mark,
      studentId,
    ]);

    db.query(subjectQuery, [subjectValues], (err2) => {
      if (err2) {
        console.error("Error inserting subjects:", err2);
        return res.status(500).json({ message: "Error inserting subjects",success:false });
      }

      res
        .status(201)
        .json({ message: "Subjects added successfully",success:true });
    });
  });
};

// ✅ Get all subjects for a specific student
exports.getSubjects = async (req, res) => {
  const { studentId } = req.params;

  const query = "SELECT * FROM subject WHERE student_id = ?";
  db.query(query, [studentId], (err, results) => {
    if (err) {
      console.error("Error fetching subjects:", err);
      return res.status(500).json({ message: "Error fetching subjects" });
    }

    res.status(200).json(results);
  });
};
