import { useState } from "react";

import PersonalInfo from "./PersonalInfo";
import Education from "./Education";
import Skills from "./Skills";
import Experience from "./Experience";
import Projects from "./Projects";
import Certifications from "./Certifications";

import ResumePreview from "../ResumePreview/ResumePreview";

const Resume = () => {
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      fullName: "",
      jobTitle: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
      portfolio: "",
      summary: "",
    },

    education: [],
    skills: [],
    experience: [],
    projects: [],
    certifications: [],
  });

  const handleDownload = () => {
  window.print();
};

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-gray-100">
      {/* ================= HEADER ================= */}
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-5 md:px-6">
        {/* Left */}
        <div>
          <h1 className="text-lg font-semibold text-gray-900">
            CareerMatch AI
          </h1>

          <p className="text-xs text-gray-500">
            Resume Builder
          </p>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          {/* Download */}
         <button
  type="button"
  onClick={handleDownload}
  className="rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
>
  Download
</button>
        </div>
      </header>
      {/* ================= MAIN ================= */}
      <main className="min-h-0 flex-1">
        <div className="mx-auto flex h-full max-w-[1600px] flex-col lg:flex-row">
          {/* LEFT EDITOR */}
          <section className="min-h-0 w-full border-r border-gray-200 bg-gray-50 lg:w-1/2">
            <div className="h-full overflow-y-auto px-4 py-5 md:px-6">
              <div className="mx-auto max-w-3xl space-y-5 pb-10">
                {/* Personal Information */}
                <PersonalInfo
                  data={resumeData.personalInfo}
                  setResumeData={setResumeData}
                />
                {/* Education */}
                <Education
                  data={resumeData.education}
                  setResumeData={setResumeData}
                />
                {/* Skills */}
                <Skills
                  data={resumeData.skills}
                  setResumeData={setResumeData}
                />
                {/* Experience */}
                <Experience
                  data={resumeData.experience}
                  setResumeData={setResumeData}
                />
                {/* Projects */}
                <Projects
                  data={resumeData.projects}
                  setResumeData={setResumeData}
                />
                {/* Certifications */}
                <Certifications
                  data={resumeData.certifications}
                  setResumeData={setResumeData}
                />
              </div>
            </div>
          </section>

          {/* ================================================= */}
          {/* RIGHT PREVIEW */}
          {/* ================================================= */}
          <section className="min-h-0 w-full bg-gray-200 lg:w-1/2">
            <div className="flex h-full min-h-0 flex-col">
              {/* Preview Header */}
              <div className="flex h-14 shrink-0 items-center justify-between border-b border-gray-300 bg-white px-5">
                <div>
                  <h2 className="text-sm font-semibold text-gray-900">
                    Resume Preview
                  </h2>

                  <p className="text-xs text-gray-500">
                    Your resume updates automatically
                  </p>
                </div>

                <span className="flex items-center gap-1.5 text-xs font-medium text-green-600">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  Live
                </span>
              </div>

              {/* Preview Container */}
              <div className="min-h-0 flex-1 overflow-hidden p-4 md:p-5">
                <div className="flex h-full w-full items-start justify-center overflow-hidden">
                  <ResumePreview resumeData={resumeData} />
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Resume;