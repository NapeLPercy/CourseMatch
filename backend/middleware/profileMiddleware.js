const { getStudentId } = require("../services/studentService");
const { getTutorId } = require("../services/tutorService");
const { getParentId } = require("../services/parentService");

// Attach roleId(studentId, parentId, or tutorId) to request
const attachProfileId = async (req, res, next) => {
  const role = req.role;

  try {
    let results = null;

    switch (role) {
      case "PARENT":
        results = await getParentId(req.userId);
        if (results) req.parentId = results.id;
        break;

      case "STUDENT":
        results = await getStudentId(req.userId);
        
        if (results) req.studentId = results.id;
        break;

      case "TUTOR":
        results = await getTutorId(req.userId);
        if (results) req.tutorId = results.id;
        break;
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = attachProfileId;
