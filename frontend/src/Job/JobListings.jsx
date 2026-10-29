import { useEffect, useMemo, useState } from "react";
import { apiRequest } from "../api.js";

import ResumeUpload from "./ResumeUpload";
import JobFilters from "./JobFilters";
import MatchScore from "./MatchScore";
import MatchDetails from "./MatchDetails";
import ApplyNow from "./ApplyNow";

const JobListings = () => {
  const [resume, setResume] = useState(null);
  const [analyzed, setAnalyzed] = useState(false);

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [workMode, setWorkMode] = useState("");
  const [sortBy, setSortBy] = useState("match");

  // Fetch jobs from the backend API.
  useEffect(() => {
    let cancelled = false;

    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await apiRequest("/jobs");

        if (!data.success || !Array.isArray(data.jobs)) {
          throw new Error(data.message || "Unable to load jobs.");
        }

        const formattedJobs = data.jobs.map((job) => ({
          ...job,
          id: job._id,
          type: job.employmentType || "Full-time",
          workMode: job.workMode || "On-site",
          experience: job.experience || "Fresher",
          matchScore: null,
          matchedSkills: [],
          missingSkills: [],
          skills: Array.isArray(job.skills) ? job.skills : [],
        }));

        if (!cancelled) {
          setJobs(formattedJobs);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Unable to load jobs.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchJobs();

    return () => {
      cancelled = true;
    };
  }, []);

  // Search, location filter, work mode filter and sorting.
  const filteredJobs = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    const filtered = jobs.filter((job) => {
      const title = (job.title || "").toLowerCase();
      const company = (job.company || "").toLowerCase();
      const jobLocation = (job.location || "").toLowerCase();

      const matchesSearch =
        !searchValue ||
        title.includes(searchValue) ||
        company.includes(searchValue) ||
        job.skills.some((skill) =>
          skill.toLowerCase().includes(searchValue)
        );

      const matchesLocation =
        !location ||
        jobLocation.includes(location.toLowerCase());

      const matchesWorkMode =
        !workMode || job.workMode === workMode;

      return (
        matchesSearch &&
        matchesLocation &&
        matchesWorkMode
      );
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === "company") {
        return (a.company || "").localeCompare(b.company || "");
      }

      if (sortBy === "title") {
        return (a.title || "").localeCompare(b.title || "");
      }

      // Until real resume matching is implemented,
      // show the newest jobs first.
      return (
        new Date(b.createdAt || 0).getTime() -
        new Date(a.createdAt || 0).getTime()
      );
    });
  }, [jobs, search, location, workMode, sortBy]);

  const handleAnalyzeResume = () => {
    if (!resume) return;

    // This currently unlocks the job list.
    // Actual resume parsing and AI matching are not implemented yet.
    setAnalyzed(true);
  };

  const handleResumeChange = (file) => {
    setResume(file);
    setAnalyzed(false);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {/* PAGE HEADER */}

        <div className="mb-8">
          <p className="text-sm font-medium text-blue-600">
            CareerMatch AI
          </p>

          <h1 className="mt-2 text-2xl font-semibold text-gray-900 sm:text-3xl">
            Find jobs that match your resume
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
            Upload your resume and explore job opportunities
            that match your career interests.
          </p>
        </div>

        {/* RESUME UPLOAD */}

        <section className="border border-gray-200 bg-white p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center bg-gray-900 text-sm font-semibold text-white">
              1
            </div>

            <div>
              <h2 className="font-semibold text-gray-900">
                Upload your resume
              </h2>

              <p className="text-sm text-gray-500">
                Upload the resume you want to use.
              </p>
            </div>
          </div>

          <ResumeUpload onResumeUpload={handleResumeChange} />

          <div className="mt-5 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={handleAnalyzeResume}
              disabled={!resume || analyzed || loading}
              className={`px-6 py-2.5 text-sm font-medium transition ${
                resume && !analyzed && !loading
                  ? "bg-gray-900 text-white hover:bg-black"
                  : "cursor-not-allowed bg-gray-200 text-gray-400"
              }`}
            >
              {analyzed ? "Resume Uploaded ✓" : "Continue to Jobs"}
            </button>

            {!resume && (
              <p className="text-xs text-gray-500">
                Upload a resume to continue.
              </p>
            )}
          </div>
        </section>

        {/* LOADING */}

        {loading && (
          <section className="mt-6 border border-gray-200 bg-white px-6 py-12 text-center">
            <p className="text-sm text-gray-600">
              Loading jobs from CareerMatch AI...
            </p>
          </section>
        )}

        {/* ERROR */}

        {!loading && error && (
          <section className="mt-6 border border-red-200 bg-red-50 p-5">
            <h3 className="font-semibold text-red-800">
              Unable to load jobs
            </h3>

            <p className="mt-2 text-sm text-red-700">
              {error}
            </p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-3 text-sm font-semibold text-red-700 underline"
            >
              Try Again
            </button>
          </section>
        )}

        {/* BEFORE CONTINUING */}

        {!loading && !error && !analyzed && (
          <section className="mt-6 border border-gray-200 bg-white px-6 py-12 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                  d="M12 16V4m0 0L8 8m4-4 4 4"
                />

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                  d="M5 20h14"
                />
              </svg>
            </div>

            <h3 className="mt-4 font-semibold text-gray-900">
              {resume
                ? "Your resume is ready"
                : "Start by uploading your resume"}
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
              {resume
                ? "Click Continue to Jobs to browse available opportunities."
                : "Upload your PDF or DOCX resume to continue."}
            </p>
          </section>
        )}

        {/* JOB RESULTS */}

        {!loading && !error && analyzed && (
          <>
            <div className="mt-6 border border-green-200 bg-green-50 p-4">
              <p className="text-sm font-semibold text-green-800">
                Jobs loaded successfully
              </p>

              <p className="mt-1 text-xs text-green-700">
                {jobs.length} available jobs loaded from the backend.
              </p>
            </div>

            {/* JOB HEADER */}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Available Jobs
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Search and filter available opportunities.
                </p>
              </div>

              <p className="text-sm text-gray-500">
                {filteredJobs.length} jobs found
              </p>
            </div>

            {/* FILTERS */}

            <div className="mt-4">
              <JobFilters
                search={search}
                onSearchChange={setSearch}
                location={location}
                onLocationChange={setLocation}
                workMode={workMode}
                onWorkModeChange={setWorkMode}
                sortBy={sortBy}
                onSortChange={setSortBy}
              />
            </div>

            {/* JOB CARDS */}

            <div className="mt-4 space-y-4">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <article
                    key={job.id}
                    className="border border-gray-200 bg-white p-5 sm:p-6"
                  >
                    {/* JOB DETAILS */}

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex items-start gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-gray-200 bg-gray-50 font-semibold text-gray-700">
                          {(job.company || "?").charAt(0).toUpperCase()}
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {job.title}
                          </h3>

                          <p className="mt-1 text-sm font-medium text-gray-600">
                            {job.company}
                          </p>

                          <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-500">
                            <span>{job.location}</span>
                            <span>•</span>
                            <span>{job.type}</span>
                            <span>•</span>
                            <span>{job.workMode}</span>
                          </div>
                        </div>
                      </div>

                      {typeof job.matchScore === "number" && (
                        <MatchScore score={job.matchScore} />
                      )}
                    </div>

                    {/* DESCRIPTION */}

                    <p className="mt-5 text-sm leading-6 text-gray-600">
                      {job.description}
                    </p>

                    {/* REQUIRED SKILLS */}

                    {job.skills.length > 0 && (
                      <div className="mt-5">
                        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                          Required Skills
                        </h4>

                        <div className="flex flex-wrap gap-2">
                          {job.skills.map((skill) => (
                            <span
                              key={skill}
                              className="border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs text-gray-700"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* APPLICATION DETAILS */}

                    <div className="mt-6 flex flex-col gap-4 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="text-xs text-gray-500">
                        <span>{job.experience}</span>

                        <span className="mx-2">•</span>

                        <span>{job.salary}</span>
                      </div>

                      <ApplyNow job={job} resume={resume} />
                    </div>
                  </article>
                ))
              ) : (
                <div className="border border-gray-200 bg-white px-6 py-12 text-center">
                  <h3 className="font-semibold text-gray-900">
                    No jobs found
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    Try changing your search or filters.
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setSearch("");
                      setLocation("");
                      setWorkMode("");
                    }}
                    className="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-700"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default JobListings;