import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../api.js";

const Dashboard = () => {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const fetchApplications = async () => {
      const token = localStorage.getItem("token");
      const savedUser = localStorage.getItem("user");

      if (!token || !savedUser) {
        navigate("/login", { replace: true });
        return;
      }

      try {
        const parsedUser = JSON.parse(savedUser);

        if (!parsedUser || typeof parsedUser !== "object") {
          throw new Error("Invalid user session");
        }

        if (cancelled) return;

        setUser(parsedUser);
        setAuthenticated(true);

        // Fetch applications belonging to the logged-in user.
        const data = await apiRequest("/applications/my");

        if (cancelled) return;

        const backendApplications = Array.isArray(data.applications)
          ? data.applications
          : [];

        const formattedApplications = backendApplications.map(
          (application) => {
            const job =
              application.job && typeof application.job === "object"
                ? application.job
                : {};

            return {
              id: application._id,
              role: job.title || "Job details unavailable",
              company: job.company || "Company unavailable",
              location: job.location || "Location unavailable",
              status: application.status || "Applied",
              appliedDate: application.createdAt
                ? new Date(application.createdAt).toLocaleDateString(
                    "en-IN",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }
                  )
                : "Date unavailable",
              applicantName: application.fullName || "",
              email: application.email || parsedUser.email || "",
              resume: application.resume || "",
              coverLetter: application.coverLetter || "",
              // The current Application schema does not store a match score.
              match: null,
            };
          }
        );

        setApplications(formattedApplications);
        setError("");
      } catch (err) {
        if (cancelled) return;

        console.error("Dashboard applications error:", err);

        if (
          err.message?.toLowerCase().includes("token") ||
          err.message?.toLowerCase().includes("log in") ||
          err.message?.includes("401")
        ) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login", { replace: true });
          return;
        }

        setError(
          err.message || "Unable to load your applications. Please try again."
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchApplications();

    return () => {
      cancelled = true;
    };
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("careerMatchLoggedIn");
    localStorage.removeItem("careerMatchUser");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");

    window.dispatchEvent(new Event("careerMatchAuthChanged"));
    navigate("/login", { replace: true });
  };

  const filteredApplications = useMemo(() => {
    if (activeFilter === "All") {
      return applications;
    }

    return applications.filter(
      (application) => application.status === activeFilter
    );
  }, [applications, activeFilter]);

  const totalApplications = applications.length;

  const underReviewCount = applications.filter(
    (application) => application.status === "Under Review"
  ).length;

  const shortlistedCount = applications.filter(
    (application) => application.status === "Shortlisted"
  ).length;

  const bestMatchScores = applications
    .map((application) => application.match)
    .filter(
      (match) =>
        typeof match === "number" &&
        Number.isFinite(match) &&
        match >= 0 &&
        match <= 100
    );

  const bestMatch =
    bestMatchScores.length > 0 ? Math.max(...bestMatchScores) : null;

  const getStatusStyle = (status) => {
    switch (status) {
      case "Shortlisted":
        return "border-green-200 bg-green-50 text-green-700";

      case "Under Review":
        return "border-yellow-200 bg-yellow-50 text-yellow-700";

      case "Applied":
        return "border-blue-200 bg-blue-50 text-blue-700";

      case "Rejected":
        return "border-red-200 bg-red-50 text-red-700";

      case "Hired":
        return "border-green-200 bg-green-50 text-green-700";

      default:
        return "border-gray-200 bg-gray-50 text-gray-600";
    }
  };

  if (!authenticated && loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-sm text-gray-600">Loading your dashboard...</p>
      </main>
    );
  }

  if (!authenticated) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="flex flex-col gap-5 border-b border-gray-200 pb-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-blue-600">
              CareerMatch AI
            </p>

            <h1 className="mt-2 text-2xl font-semibold text-gray-900 sm:text-3xl">
              My Dashboard
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Track your job applications and career progress.
            </p>

            {user?.email && (
              <p className="mt-2 text-sm text-gray-700">
                Logged in as:{" "}
                <span className="font-medium">{user.email}</span>
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="w-fit border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Logout
          </button>
        </div>

        {/* PROFILE */}
        <section className="mt-6 border border-gray-200 bg-white p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center bg-blue-50 text-lg font-semibold text-blue-600">
                CM
              </div>

              <div>
                <h2 className="font-semibold text-gray-900">
                  My Career Profile
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Manage your resume and discover matching jobs.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate("/resume-builder")}
              className="w-fit border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Open Resume Builder
            </button>
          </div>
        </section>

        {/* STATS */}
        <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="border border-gray-200 bg-white p-5">
            <p className="text-sm text-gray-500">Applications</p>
            <p className="mt-2 text-2xl font-semibold text-gray-900">
              {totalApplications}
            </p>
          </div>

          <div className="border border-gray-200 bg-white p-5">
            <p className="text-sm text-gray-500">Under Review</p>
            <p className="mt-2 text-2xl font-semibold text-gray-900">
              {underReviewCount}
            </p>
          </div>

          <div className="border border-gray-200 bg-white p-5">
            <p className="text-sm text-gray-500">Shortlisted</p>
            <p className="mt-2 text-2xl font-semibold text-gray-900">
              {shortlistedCount}
            </p>
          </div>

          <div className="border border-gray-200 bg-white p-5">
            <p className="text-sm text-gray-500">Best Match</p>
            <p className="mt-2 text-2xl font-semibold text-gray-900">
              {bestMatch !== null ? `${bestMatch}%` : "--"}
            </p>
          </div>
        </section>

        {/* APPLICATIONS */}
        <section className="mt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                My Applications
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Jobs you have actually applied for.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/jobs")}
              className="w-fit text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Explore Jobs →
            </button>
          </div>

          {error && (
            <div
              role="alert"
              className="mt-5 border border-red-200 bg-red-50 p-4 text-sm text-red-700"
            >
              <p>{error}</p>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-2 font-semibold underline"
              >
                Try again
              </button>
            </div>
          )}

          {/* FILTERS */}
          {!loading && applications.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {[
                "All",
                "Applied",
                "Under Review",
                "Shortlisted",
                "Rejected",
                "Hired",
              ].map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`border px-4 py-2 text-xs font-medium ${
                    activeFilter === filter
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-gray-200 bg-white text-gray-600 hover:border-gray-400"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          )}

          {/* APPLICATION LIST */}
          <div className="mt-4 space-y-3">
            {loading && (
              <div className="border border-gray-200 bg-white px-6 py-12 text-center text-sm text-gray-500">
                Loading applications from your account...
              </div>
            )}

            {!loading &&
              filteredApplications.map((application) => (
                <article
                  key={application.id}
                  className="border border-gray-200 bg-white p-5"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-gray-200 bg-gray-50 font-semibold text-gray-700">
                        {application.company?.charAt(0)?.toUpperCase() || "J"}
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {application.role}
                        </h3>

                        <p className="mt-1 text-sm font-medium text-gray-600">
                          {application.company}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          {application.location}
                        </p>

                        {application.email && (
                          <p className="mt-1 text-xs text-gray-500">
                            Applicant: {application.email}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:justify-end">
                      <div className="text-xs text-gray-500">
                        Applied {application.appliedDate}
                      </div>

                      <div
                        className={`w-fit border px-3 py-1.5 text-xs font-semibold ${getStatusStyle(
                          application.status
                        )}`}
                      >
                        {application.status}
                      </div>

                      {application.match !== null ? (
                        <div className="w-fit border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700">
                          {application.match}% Match
                        </div>
                      ) : (
                        <div className="w-fit border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs text-gray-500">
                          Match score unavailable
                        </div>
                      )}
                    </div>
                  </div>

                  {/* APPLICATION STATUS PROGRESS */}
                  <div className="mt-5 border-t border-gray-100 pt-4">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 flex-1 bg-blue-500" />

                      <div
                        className={`h-1.5 flex-1 ${
                          [
                            "Under Review",
                            "Shortlisted",
                            "Rejected",
                            "Hired",
                          ].includes(application.status)
                            ? "bg-blue-500"
                            : "bg-gray-200"
                        }`}
                      />

                      <div
                        className={`h-1.5 flex-1 ${
                          ["Shortlisted", "Hired"].includes(
                            application.status
                          )
                            ? "bg-green-500"
                            : "bg-gray-200"
                        }`}
                      />

                      <div
                        className={`h-1.5 flex-1 ${
                          ["Rejected", "Hired"].includes(application.status)
                            ? "bg-green-500"
                            : "bg-gray-200"
                        }`}
                      />
                    </div>

                    <div className="mt-2 flex justify-between text-[11px] text-gray-400">
                      <span>Applied</span>
                      <span>Review</span>
                      <span>Shortlisted</span>
                      <span>Decision</span>
                    </div>
                  </div>
                </article>
              ))}

            {/* NO APPLICATIONS */}
            {!loading &&
              !error &&
              applications.length === 0 && (
                <div className="border border-gray-200 bg-white px-6 py-14 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center bg-blue-50 text-blue-600">
                    ✓
                  </div>

                  <h3 className="mt-4 font-semibold text-gray-900">
                    No applications yet
                  </h3>

                  <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
                    You haven't applied to any jobs yet. Explore available
                    jobs and submit your first application.
                  </p>

                  <button
                    type="button"
                    onClick={() => navigate("/jobs")}
                    className="mt-5 bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
                  >
                    Explore Jobs
                  </button>
                </div>
              )}

            {/* FILTER HAS NO RESULT */}
            {!loading &&
              !error &&
              applications.length > 0 &&
              filteredApplications.length === 0 && (
                <div className="border border-gray-200 bg-white px-6 py-12 text-center">
                  <h3 className="font-semibold text-gray-900">
                    No applications found
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    You don't have any applications with this status.
                  </p>
                </div>
              )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Dashboard;