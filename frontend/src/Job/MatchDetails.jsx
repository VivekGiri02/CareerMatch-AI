const MatchDetails = ({ matchedSkills = [], missingSkills = [] }) => {
  return (
    <div className="mt-5 space-y-4">
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
          Matching Skills
        </p>

        <div className="flex flex-wrap gap-2">
          {matchedSkills.map((skill) => (
            <span
              key={skill}
              className="border border-green-100 bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700"
            >
              ✓ {skill}
            </span>
          ))}
        </div>
      </div>

      {missingSkills.length > 0 && (
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
            Skills To Improve
          </p>

          <div className="flex flex-wrap gap-2">
            {missingSkills.map((skill) => (
              <span
                key={skill}
                className="border border-gray-200 bg-white px-2.5 py-1 text-xs text-gray-600"
              >
                + {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchDetails;