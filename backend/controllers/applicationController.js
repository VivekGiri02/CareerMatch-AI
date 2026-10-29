const Application = require("../models/Application");
const Job = require("../models/Job");

// Submit an application
const createApplication = async (req, res) => {
  try {
    const {
      jobId,
      fullName,
      email,
      phone,
      resume,
      coverLetter,
    } = req.body;

    if (
      !jobId ||
      !fullName?.trim() ||
      !email?.trim() ||
      !phone?.trim() ||
      !resume?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Job, name, email, phone and resume are required",
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address",
      });
    }

    if (phone.trim().length < 7 || phone.trim().length > 20) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid phone number",
      });
    }

    if (typeof resume !== "string" || resume.trim().length > 2048) {
      return res.status(400).json({
        success: false,
        message: "Invalid resume reference",
      });
    }

    if (
      typeof coverLetter === "string" &&
      coverLetter.length > 5000
    ) {
      return res.status(400).json({
        success: false,
        message: "Cover letter is too long",
      });
    }

    // Validate the job ID
    if (!/^[0-9a-fA-F]{24}$/.test(jobId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID",
      });
    }

    // Verify the job exists and is active
    const job = await Job.findOne({
      _id: jobId,
      isActive: true,
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found or no longer available",
      });
    }

    // Prevent duplicate applications
    const existingApplication = await Application.findOne({
      user: req.user._id,
      job: job._id,
    });

    if (existingApplication) {
      return res.status(409).json({
        success: false,
        message: "You have already applied for this job",
      });
    }

    const application = await Application.create({
      user: req.user._id,
      job: job._id,
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      resume: resume.trim(),
      coverLetter: coverLetter?.trim() || "",
    });

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "You have already applied for this job",
      });
    }

    console.error("Create application error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Server error while submitting application",
    });
  }
};

// Get the logged-in user's applications
const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      user: req.user._id,
    })
      .populate("job")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    console.error("Get applications error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch applications",
    });
  }
};

// Get a single application owned by the logged-in user
const getApplicationById = async (req, res) => {
  try {
    const application = await Application.findOne({
      _id: req.params.id,
      user: req.user._id,
    }).populate("job");

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    return res.status(200).json({
      success: true,
      application,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid application ID",
      });
    }

    console.error("Get application error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch application",
    });
  }
};

module.exports = {
  createApplication,
  getMyApplications,
  getApplicationById,
};