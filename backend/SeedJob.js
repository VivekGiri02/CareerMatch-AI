const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Job = require("./models/Job");

dotenv.config();

// Companies used to generate demo jobs.
// These entries do not represent verified vacancies.
const companies = [
  "Infosys",
  "TCS",
  "Wipro",
  "Accenture",
  "Cognizant",
  "Capgemini",
  "HCLTech",
  "Tech Mahindra",
  "IBM",
  "Oracle",
  "Microsoft",
  "Amazon",
];

const locations = [
  "Bangalore",
  "Hyderabad",
  "Pune",
  "Delhi",
  "Chennai",
  "Mumbai",
  "Noida",
  "Gurgaon",
  "Kolkata",
  "Ahmedabad",
  "Jaipur",
  "Remote",
];

const jobRoles = [
  {
    title: "Frontend Developer",
    description:
      "Build responsive and accessible user interfaces for modern web applications.",
    skills: ["HTML", "CSS", "JavaScript", "React"],
    minSalary: 4,
    maxSalary: 8,
    experience: "Fresher",
  },
  {
    title: "Backend Developer",
    description:
      "Develop server-side applications, APIs, authentication systems, and database integrations.",
    skills: ["Node.js", "Express", "MongoDB", "REST API"],
    minSalary: 5,
    maxSalary: 10,
    experience: "0-2 Years",
  },
  {
    title: "MERN Stack Developer",
    description:
      "Develop full-stack web applications using MongoDB, Express, React, and Node.js.",
    skills: ["MongoDB", "Express", "React", "Node.js"],
    minSalary: 5,
    maxSalary: 10,
    experience: "0-2 Years",
  },
  {
    title: "React Developer",
    description:
      "Create reusable React components and responsive interfaces for web products.",
    skills: ["React", "JavaScript", "CSS", "REST API"],
    minSalary: 5,
    maxSalary: 9,
    experience: "0-2 Years",
  },
  {
    title: "Node.js Developer",
    description:
      "Build scalable backend services and REST APIs using Node.js.",
    skills: ["Node.js", "Express", "JavaScript", "MongoDB"],
    minSalary: 5,
    maxSalary: 10,
    experience: "0-2 Years",
  },
  {
    title: "Java Developer",
    description:
      "Develop and maintain Java applications using object-oriented programming.",
    skills: ["Java", "OOP", "SQL", "Spring Boot"],
    minSalary: 4,
    maxSalary: 9,
    experience: "Fresher",
  },
  {
    title: "Python Developer",
    description:
      "Write Python applications, automate workflows, and integrate APIs.",
    skills: ["Python", "SQL", "Git", "REST API"],
    minSalary: 4,
    maxSalary: 9,
    experience: "0-2 Years",
  },
  {
    title: "Software Engineer",
    description:
      "Design, develop, test, and maintain software applications.",
    skills: ["Java", "Data Structures", "Algorithms", "Git"],
    minSalary: 4,
    maxSalary: 9,
    experience: "Fresher",
  },
  {
    title: "Full Stack Developer",
    description:
      "Build frontend interfaces and backend services for complete web applications.",
    skills: ["React", "Node.js", "MongoDB", "JavaScript"],
    minSalary: 5,
    maxSalary: 12,
    experience: "1-3 Years",
  },
  {
    title: "Data Analyst",
    description:
      "Analyze datasets, prepare reports, and communicate business insights.",
    skills: ["SQL", "Python", "Excel", "Power BI"],
    minSalary: 4,
    maxSalary: 9,
    experience: "Fresher",
  },
  {
    title: "Data Scientist",
    description:
      "Analyze complex datasets and develop statistical and machine learning models.",
    skills: ["Python", "Pandas", "Machine Learning", "SQL"],
    minSalary: 6,
    maxSalary: 14,
    experience: "0-2 Years",
  },
  {
    title: "Machine Learning Engineer",
    description:
      "Develop, evaluate, and deploy machine learning models and pipelines.",
    skills: ["Python", "Machine Learning", "TensorFlow", "SQL"],
    minSalary: 6,
    maxSalary: 15,
    experience: "1-3 Years",
  },
  {
    title: "DevOps Engineer",
    description:
      "Automate deployment pipelines and improve infrastructure reliability.",
    skills: ["Linux", "Docker", "AWS", "CI/CD"],
    minSalary: 6,
    maxSalary: 14,
    experience: "1-3 Years",
  },
  {
    title: "Cloud Engineer",
    description:
      "Build and maintain cloud infrastructure, services, and deployment environments.",
    skills: ["AWS", "Linux", "Docker", "Networking"],
    minSalary: 5,
    maxSalary: 13,
    experience: "0-2 Years",
  },
  {
    title: "Cybersecurity Analyst",
    description:
      "Monitor security events, investigate vulnerabilities, and support incident response.",
    skills: ["Networking", "Linux", "Security", "Python"],
    minSalary: 4,
    maxSalary: 10,
    experience: "0-2 Years",
  },
  {
    title: "QA Engineer",
    description:
      "Test software applications and identify defects before release.",
    skills: ["Manual Testing", "Test Cases", "SQL", "Jira"],
    minSalary: 3,
    maxSalary: 8,
    experience: "Fresher",
  },
  {
    title: "Automation Test Engineer",
    description:
      "Create automated test suites to improve software quality and release confidence.",
    skills: ["Selenium", "Java", "Testing", "Git"],
    minSalary: 4,
    maxSalary: 9,
    experience: "0-2 Years",
  },
  {
    title: "UI/UX Designer",
    description:
      "Design intuitive user experiences, wireframes, prototypes, and visual interfaces.",
    skills: ["Figma", "Wireframing", "Prototyping", "UI Design"],
    minSalary: 4,
    maxSalary: 9,
    experience: "Fresher",
  },
  {
    title: "SQL Developer",
    description:
      "Write optimized SQL queries and maintain relational database objects.",
    skills: ["SQL", "MySQL", "Database Design", "Query Optimization"],
    minSalary: 4,
    maxSalary: 9,
    experience: "0-2 Years",
  },
  {
    title: "Mobile App Developer",
    description:
      "Build and maintain mobile applications with modern development frameworks.",
    skills: ["React Native", "JavaScript", "REST API", "Git"],
    minSalary: 4,
    maxSalary: 10,
    experience: "0-2 Years",
  },
];

const employmentTypes = [
  "Full-time",
  "Full-time",
  "Internship",
  "Contract",
];

const workModes = ["Remote", "Hybrid", "On-site"];

const formatSalary = (min, max) => `₹${min}–${max} LPA`;

// Generate 20 roles × 12 companies = 240 unique demo job records.
const generateJobs = () => {
  const jobs = [];

  jobRoles.forEach((role, roleIndex) => {
    companies.forEach((company, companyIndex) => {
      const locationIndex =
        (roleIndex * 3 + companyIndex) % locations.length;

      const workMode =
        workModes[(roleIndex + companyIndex) % workModes.length];

      // Keep Remote as a work mode as well as a supported location.
      const location = locations[locationIndex];

      jobs.push({
        title: role.title,
        company,
        location,
        employmentType:
          employmentTypes[(roleIndex + companyIndex) % employmentTypes.length],
        workMode,
        experience: role.experience,
        description: role.description,
        skills: [...role.skills],
        salary: formatSalary(role.minSalary, role.maxSalary),
        applyUrl: "",
        isActive: true,
      });
    });
  });

  return jobs;
};

const seedJobs = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing from the backend .env file.");
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected for job seeding.");

    const sampleJobs = generateJobs();
    let insertedCount = 0;
    let skippedCount = 0;

    for (const job of sampleJobs) {
      // Check the same role, company, and location to avoid duplicates.
      const exists = await Job.findOne({
        title: job.title,
        company: job.company,
        location: job.location,
      }).select("_id");

      if (exists) {
        skippedCount++;
        continue;
      }

      await Job.create(job);
      insertedCount++;
    }

    const totalJobs = await Job.countDocuments();

    console.log("-----------------------------------");
    console.log("Demo job seeding completed!");
    console.log(`Generated demo jobs: ${sampleJobs.length}`);
    console.log(`New jobs inserted: ${insertedCount}`);
    console.log(`Existing jobs skipped: ${skippedCount}`);
    console.log(`Total jobs in database: ${totalJobs}`);
    console.log("-----------------------------------");
  } catch (error) {
    console.error("Seeding jobs failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

seedJobs();