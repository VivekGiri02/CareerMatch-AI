const express = require("express");
const router = express.Router();

const {
  createApplication,
  getMyApplications,
  getApplicationById,
} = require("../controllers/applicationController");

const { protect } = require("../middleware/authMiddleware");

// Submit a job application
router.post("/", protect, createApplication);

// Get logged-in user's applications
router.get("/my", protect, getMyApplications);

// Get a single application
router.get("/:id", protect, getApplicationById);

module.exports = router;