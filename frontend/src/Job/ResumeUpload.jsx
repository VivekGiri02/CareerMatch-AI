import { useRef, useState } from "react";
import { apiRequest } from "../api.js";

const ResumeUpload = ({ onResumeUpload }) => {
  const [resume, setResume] = useState(null);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const handleFile = async (file) => {
  if (!file) return;

  const allowedTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (!allowedTypes.includes(file.type)) {
    setError("Please upload a PDF or DOCX file.");
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    setError("File size should be less than 5MB.");
    return;
  }

  setError("");
  setResume(file);

  try {
    const formData = new FormData();
    formData.append("resume", file);

    const token = localStorage.getItem("token");

    const response = await fetch(
      "http://localhost:5000/api/resumes",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Resume upload failed.");
    }

    if (onResumeUpload) {
      onResumeUpload({
        name: data.resume.name,
        url: data.resume.url,
      });
    }
  } catch (err) {
    setResume(null);
    setError(err.message || "Unable to upload resume.");
    
    if (onResumeUpload) {
      onResumeUpload(null);
    }
  }
};

  const handleFileChange = (e) => {
    handleFile(e.target.files?.[0]);
  };

  const handleRemove = () => {
    setResume(null);
    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    if (onResumeUpload) {
      onResumeUpload(null);
    }
  };

  return (
    <section className="border border-gray-200 bg-white p-6">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-gray-900">
          Upload Your Resume
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Upload your resume and we'll find jobs that best match your profile.
        </p>
      </div>

      {!resume ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="cursor-pointer border border-dashed border-gray-300 px-6 py-10 text-center transition hover:border-gray-500 hover:bg-gray-50"
        >
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
            <svg
              className="h-6 w-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                d="M12 16V4m0 0L8 8m4-4 4 4M5 20h14"
              />
            </svg>
          </div>

          <p className="text-sm font-medium text-gray-900">
            Click to upload your resume
          </p>

          <p className="mt-1 text-xs text-gray-500">
            PDF or DOCX · Maximum 5MB
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 border border-gray-200 bg-gray-50 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-white text-sm font-semibold text-gray-700">
              PDF
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-gray-900">
                {resume.name}
              </p>

              <p className="mt-1 text-xs text-gray-500">
                {(resume.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-green-600">
              ✓ Ready
            </span>

            <button
              type="button"
              onClick={handleRemove}
              className="text-sm font-medium text-red-600 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        </div>
      )}

      {error && (
        <p className="mt-3 text-sm text-red-600">
          {error}
        </p>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.docx"
        onChange={handleFileChange}
        className="hidden"
      />
    </section>
  );
};

export default ResumeUpload;