import { useState } from "react";
import { apiRequest } from "../api.js";

const ApplyNow = ({ job, resume }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    coverLetter: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please log in before applying for a job.");
      return;
    }

    // Resume must be available before applying.
    const resumeReference =
  typeof resume === "string"
    ? resume
    : resume?.url || resume?.resumeUrl || resume?.path || "";

    if (!resumeReference.trim()) {
      setError(
        "Please upload your resume first. A valid resume reference is required."
      );
      return;
    }

    setLoading(true);

    try {
      const result = await apiRequest("/applications", {
        method: "POST",
        body: JSON.stringify({
          jobId: job._id || job.id,
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          resume: resumeReference,
          coverLetter: formData.coverLetter,
        }),
      });

      if (result.success) {
        setSubmitted(true);
      } else {
        setError(result.message || "Unable to submit your application.");
      }
    } catch (err) {
      setError(err.message || "Something went wrong while applying.");

      if (err.message?.toLowerCase().includes("already applied")) {
        setError("You have already applied for this job.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (loading) return;

    setIsOpen(false);
    setSubmitted(false);
    setError("");
  };

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setError("");
          setSubmitted(false);
          setIsOpen(true);
        }}
        className="bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
      >
        Apply Now
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4 py-6">
          <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto bg-white shadow-lg">
            <div className="flex items-start justify-between border-b border-gray-200 px-6 py-5">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Apply for {job.title}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {job.company} · {job.location}
                </p>
              </div>

              <button
                type="button"
                onClick={handleClose}
                disabled={loading}
                className="text-xl text-gray-400 hover:text-gray-900"
              >
                ×
              </button>
            </div>

            {submitted ? (
              <div className="px-6 py-12 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-50 text-xl text-green-600">
                  ✓
                </div>

                <h3 className="mt-4 text-xl font-semibold text-gray-900">
                  Application Submitted!
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Your application for {job.title} at {job.company} has been
                  saved successfully.
                </p>

                <button
                  type="button"
                  onClick={handleClose}
                  className="mt-6 bg-gray-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 px-6 py-6">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    autoComplete="name"
                    required
                    className="w-full border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    autoComplete="email"
                    required
                    className="w-full border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Phone
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    autoComplete="tel"
                    required
                    className="w-full border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Resume
                  </label>

                  <div className="border border-gray-200 bg-gray-50 px-4 py-3">
                    <p className="text-sm font-medium text-gray-700">
                      {typeof resume === "string"
                        ? resume
                        : resume?.name || "Resume"}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      A valid resume URL or stored reference is required.
                    </p>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Cover Letter
                    <span className="ml-1 text-xs font-normal text-gray-400">
                      (Optional)
                    </span>
                  </label>

                  <textarea
                    name="coverLetter"
                    value={formData.coverLetter}
                    onChange={handleChange}
                    rows="5"
                    maxLength={5000}
                    placeholder="Write a short message to the company..."
                    className="w-full resize-none border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
                  />
                </div>

                {error && (
                  <div
                    role="alert"
                    className="border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                  >
                    {error}
                  </div>
                )}

                <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">
                  <button
                    type="button"
                    onClick={handleClose}
                    disabled={loading}
                    className="border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {loading ? "Submitting..." : "Submit Application"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ApplyNow;
