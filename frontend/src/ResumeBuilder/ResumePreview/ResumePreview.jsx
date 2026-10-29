const ResumePreview = ({ resumeData }) => {
  const {
    personalInfo = {},
    education = [],
    skills = [],
    experience = [],
    projects = [],
    certifications = [],
  } = resumeData;

  const hasData =
    Object.values(personalInfo).some((value) => value) ||
    education.length > 0 ||
    skills.length > 0 ||
    experience.length > 0 ||
    projects.length > 0 ||
    certifications.length > 0;

  return (
    <div
      id="printable-resume"
      className="mx-auto min-h-[1123px] w-full max-w-[794px] bg-white px-10 py-9 text-gray-800 shadow-lg"
    >
      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <header className="border-b border-gray-300 pb-5">
        <h1 className="text-[30px] font-bold leading-tight tracking-tight text-gray-950">
          {personalInfo.fullName || "Your Name"}
        </h1>

        {personalInfo.jobTitle && (
          <p className="mt-1 text-[15px] font-medium text-gray-600">
            {personalInfo.jobTitle}
          </p>
        )}

        {/* Contact Information */}
        {(personalInfo.email ||
          personalInfo.phone ||
          personalInfo.location) && (
          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-gray-600">
            {personalInfo.email && (
              <span>{personalInfo.email}</span>
            )}

            {personalInfo.email && personalInfo.phone && (
              <span className="text-gray-300">•</span>
            )}

            {personalInfo.phone && (
              <span>{personalInfo.phone}</span>
            )}

            {personalInfo.phone && personalInfo.location && (
              <span className="text-gray-300">•</span>
            )}

            {personalInfo.location && (
              <span>{personalInfo.location}</span>
            )}
          </div>
        )}

        {/* Links */}
        {(personalInfo.linkedin ||
          personalInfo.github ||
          personalInfo.portfolio) && (
          <div className="mt-1 flex flex-wrap items-center gap-x-3 text-[10px] text-gray-600">
            {personalInfo.linkedin && (
              <span>{personalInfo.linkedin}</span>
            )}

            {personalInfo.linkedin && personalInfo.github && (
              <span className="text-gray-300">•</span>
            )}

            {personalInfo.github && (
              <span>{personalInfo.github}</span>
            )}

            {personalInfo.github && personalInfo.portfolio && (
              <span className="text-gray-300">•</span>
            )}

            {personalInfo.portfolio && (
              <span>{personalInfo.portfolio}</span>
            )}
          </div>
        )}
      </header>

      {/* ================================================= */}
      {/* SUMMARY */}
      {/* ================================================= */}

      {personalInfo.summary && (
        <ResumeSection title="Professional Summary">
          <p className="text-[10.5px] leading-[1.6] text-gray-700">
            {personalInfo.summary}
          </p>
        </ResumeSection>
      )}

      {/* ================================================= */}
      {/* EDUCATION */}
      {/* ================================================= */}

      {education.length > 0 && (
        <ResumeSection title="Education">
          <div className="space-y-4">
            {education.map((item, index) => {
              const college =
                item.institution ||
                item.college ||
                item.collegeName;

              const field =
                item.field ||
                item.fieldOfStudy;

              const score =
                item.gpa ||
                item.cgpa ||
                item.grade ||
                item.percentage;

              return (
                <div
                  key={item.id || index}
                  className="grid grid-cols-[1fr_auto] gap-4"
                >
                  {/* Left */}
                  <div>
                    {item.degree && (
                      <h3 className="text-[12px] font-semibold text-gray-900">
                        {item.degree}
                      </h3>
                    )}

                    {college && (
                      <p className="mt-0.5 text-[10.5px] font-medium text-gray-700">
                        {college}
                      </p>
                    )}

                    {field && (
                      <p className="mt-0.5 text-[10px] text-gray-500">
                        {field}
                      </p>
                    )}

                    {score && (
                      <p className="mt-1 text-[9.5px] text-gray-500">
                        {item.gpa && `GPA: ${item.gpa}`}
                        {item.cgpa && `CGPA: ${item.cgpa}`}
                        {item.grade && `Grade: ${item.grade}`}
                        {item.percentage &&
                          `Percentage: ${item.percentage}`}
                      </p>
                    )}
                  </div>

                  {/* Right - Years */}
                  {(item.startYear || item.endYear) && (
                    <div className="whitespace-nowrap text-right text-[9.5px] font-medium text-gray-500">
                      {item.startYear || ""}
                      {item.startYear && item.endYear && " - "}
                      {item.endYear || ""}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </ResumeSection>
      )}

      {/* ================================================= */}
      {/* SKILLS */}
      {/* ================================================= */}

      {skills.length > 0 && (
        <ResumeSection title="Skills">
          <div className="flex flex-wrap gap-x-2 gap-y-1">
            {skills.map((skill, index) => {
              const skillName =
                typeof skill === "object"
                  ? skill.name || skill.label
                  : skill;

              if (!skillName) return null;

              return (
                <span
                  key={skill.id || index}
                  className="text-[10px] text-gray-700"
                >
                  {skillName}
                  {index !== skills.length - 1 && (
                    <span className="ml-2 text-gray-300">
                      •
                    </span>
                  )}
                </span>
              );
            })}
          </div>
        </ResumeSection>
      )}

      {/* ================================================= */}
      {/* EXPERIENCE */}
      {/* ================================================= */}

      {experience.length > 0 && (
        <ResumeSection title="Experience">
          <div className="space-y-4">
            {experience.map((item, index) => (
              <div key={item.id || index}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    {item.jobTitle && (
                      <h3 className="text-[12px] font-semibold text-gray-900">
                        {item.jobTitle}
                      </h3>
                    )}

                    {item.company && (
                      <p className="mt-0.5 text-[10.5px] font-medium text-gray-700">
                        {item.company}
                      </p>
                    )}
                  </div>

                  {(item.startDate || item.endDate) && (
                    <p className="whitespace-nowrap text-right text-[9.5px] text-gray-500">
                      {item.startDate || ""}
                      {item.startDate &&
                        item.endDate &&
                        " - "}
                      {item.endDate || ""}
                    </p>
                  )}
                </div>

                {item.location && (
                  <p className="mt-0.5 text-[9.5px] text-gray-500">
                    {item.location}
                  </p>
                )}

                {item.description && (
                  <p className="mt-1.5 whitespace-pre-line text-[10px] leading-[1.55] text-gray-700">
                    {item.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </ResumeSection>
      )}

      {/* ================================================= */}
      {/* PROJECTS */}
      {/* ================================================= */}

      {projects.length > 0 && (
        <ResumeSection title="Projects">
          <div className="space-y-4">
            {projects.map((item, index) => (
              <div key={item.id || index}>
                <div className="flex items-start justify-between gap-4">
                  {item.name && (
                    <h3 className="text-[12px] font-semibold text-gray-900">
                      {item.name}
                    </h3>
                  )}
                </div>

                {item.description && (
                  <p className="mt-1 text-[10px] leading-[1.55] text-gray-700">
                    {item.description}
                  </p>
                )}

                {item.technologies && (
                  <p className="mt-1 text-[9.5px] text-gray-500">
                    <span className="font-semibold text-gray-600">
                      Technologies:
                    </span>{" "}
                    {item.technologies}
                  </p>
                )}

                {(item.githubUrl || item.liveUrl) && (
                  <div className="mt-1 flex flex-wrap gap-x-3 text-[9px] text-gray-500">
                    {item.githubUrl && (
                      <span>
                        GitHub: {item.githubUrl}
                      </span>
                    )}

                    {item.liveUrl && (
                      <span>
                        Live: {item.liveUrl}
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </ResumeSection>
      )}

      {/* ================================================= */}
      {/* CERTIFICATIONS */}
      {/* ================================================= */}

      {certifications.length > 0 && (
        <ResumeSection title="Certifications">
          <div className="space-y-3">
            {certifications.map((item, index) => (
              <div
                key={item.id || index}
                className="grid grid-cols-[1fr_auto] gap-4"
              >
                <div>
                  {item.name && (
                    <h3 className="text-[11px] font-semibold text-gray-900">
                      {item.name}
                    </h3>
                  )}

                  {item.issuer && (
                    <p className="mt-0.5 text-[10px] text-gray-600">
                      {item.issuer}
                    </p>
                  )}

                  {item.credentialUrl && (
                    <p className="mt-0.5 text-[9px] text-gray-500">
                      {item.credentialUrl}
                    </p>
                  )}
                </div>

                {item.issueDate && (
                  <p className="whitespace-nowrap text-right text-[9.5px] text-gray-500">
                    {item.issueDate}
                  </p>
                )}
              </div>
            ))}
          </div>
        </ResumeSection>
      )}

      {/* ================================================= */}
      {/* EMPTY STATE */}
      {/* ================================================= */}

      {!hasData && (
        <div className="flex min-h-[700px] items-center justify-center">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-400">
              Your resume preview will appear here
            </p>

            <p className="mt-1 text-xs text-gray-400">
              Start entering your information on the left
            </p>
          </div>
        </div>
      )}
    </div>
  );
};


/* ================================================= */
/* REUSABLE SECTION */
/* ================================================= */

const ResumeSection = ({ title, children }) => {
  return (
    <section className="mt-6">
      <h2 className="mb-3 border-b border-gray-300 pb-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-gray-900">
        {title}
      </h2>

      {children}
    </section>
  );
};

export default ResumePreview;