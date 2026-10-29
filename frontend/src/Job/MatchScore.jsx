const MatchScore = ({ score }) => {
  const getScoreStyle = () => {
    if (score >= 90) {
      return "border-green-200 bg-green-50 text-green-700";
    }

    if (score >= 75) {
      return "border-blue-200 bg-blue-50 text-blue-700";
    }

    return "border-gray-200 bg-gray-100 text-gray-700";
  };

  return (
    <div
      className={`inline-flex items-center border px-3 py-1.5 text-sm font-semibold ${getScoreStyle()}`}
    >
      {score}% Match
    </div>
  );
};

export default MatchScore;