const {
  addProspectus,
  getProspectusPdf,
  deleteProspectus,
} = require("../services/prospectusService");

exports.addProspectus = async (req, res) => {
  try {
    const { universityCode, title } = req.body;

    if (!req.file) {
      return res.status(400).json({
        message: "PDF file is required",
      });
    }

    await addProspectus(universityCode, title, req.file.buffer);

    res.status(201).json({
      message: "Prospectus uploaded successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error uploading prospectus",
    });
  }
};

exports.downloadProspectus = async (req, res) => {
  try {
    const { universityCode } = req.params;

    const prospectus = await getProspectusPdf(universityCode);

    if (!prospectus) {
      return res.status(404).json({
        message: "Prospectus not found",
      });
    }

    res.setHeader("Content-Type", "application/pdf");

    res.setHeader(
      "Content-Disposition",
      `inline; filename="${prospectus.title}.pdf"`,
    );

    res.send(prospectus.file_data);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error downloading prospectus",
    });
  }
};

exports.deleteProspectus = async (req, res) => {
  try {
    const { universityCode } = req.params;

    await deleteProspectus(universityCode);

    res.status(200).json({
      message: "Prospectus deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Error deleting prospectus",
    });
  }
};
