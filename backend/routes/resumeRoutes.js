const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const { protect } = require("../middleware/authMiddleware");

const uploadDir = path.join(__dirname, "../uploads/resumes");

fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const safeName = `${req.user._id}-${Date.now()}${extension}`;

    cb(null, safeName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const allowedExtensions = [".pdf", ".docx"];
  const extension = path.extname(file.originalname).toLowerCase();

  if (
    allowedTypes.includes(file.mimetype) &&
    allowedExtensions.includes(extension)
  ) {
    return cb(null, true);
  }

  cb(new Error("Only PDF and DOCX files are allowed."));
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

router.post("/", protect, (req, res, next) => {
  upload.single("resume")(req, res, (error) => {
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message || "Resume upload failed",
      });
    }

    next();
  });
}, (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Please select a resume file",
    });
  }

  const resumeUrl = `/uploads/resumes/${req.file.filename}`;

  return res.status(201).json({
    success: true,
    message: "Resume uploaded successfully",
    resume: {
      name: req.file.originalname,
      url: resumeUrl,
    },
  });
});

module.exports = router;