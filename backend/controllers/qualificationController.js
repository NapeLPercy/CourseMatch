const { v4: uuidv4 } = require("uuid");
const dotenv = require("dotenv");
dotenv.config();

const courseModel = require("../models/Qualification");

//Add subjects
exports.addQualification = async (req, res) => {
  try {
    const { qualification } = req.body;
    const { userId, role } = req;

    if (!qualification || !userId || !role) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }
    //Insert qualifications
    await courseModel.insertQualificationWithPrereqs(qualification);

    return res.status(201).json({
      success: true,
      message: "Qualification added successfully",
    });
  } catch (error) {
    console.error("Add qualification error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Server error while adding qualification",
    });
  }
};

// Get all qualifications and thier faculty
exports.getAllQualifications = async (req, res) => {
  try {
   /* const {userId, role} = req;

     if (!userId || !role) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }*/

    //delegate to qualification model
    const qualifications = await courseModel.getAllQualificationsWithPrereqs();


    return res.status(200).json({
      qualifications: qualifications,
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
