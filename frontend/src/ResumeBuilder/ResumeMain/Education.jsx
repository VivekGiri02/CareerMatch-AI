import { GraduationCap, Plus, Trash2, Building, Calendar, Award } from "lucide-react";

const Education = ({ data, setResumeData }) => {
  const addEducation = () => {
    const newEducation = {
      degree: "",
      college: "",
      startYear: "",
      endYear: "",
      percentage: "",
    };

    setResumeData((prev) => ({
      ...prev,
      education: [...prev.education, newEducation],
    }));
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;

    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((edu, i) =>
        i === index ? { ...edu, [name]: value } : edu
      ),
    }));
  };

  const removeEducation = (index) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Education Background</h2>
            <p className="text-xs text-slate-500">Degrees, academic credentials, and institutions.</p>
          </div>
        </div>

        <button
          type="button"
          onClick={addEducation}
          className="inline-flex items-center gap-2 bg-indigo-600 text-white font-medium text-xs px-4 py-2.5 rounded-xl hover:bg-indigo-700 active:scale-95 transition shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Education
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-10 border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
          <p className="text-sm text-slate-500 font-medium">No education entries yet.</p>
          <p className="text-xs text-slate-400 mt-1">Click "+ Add Education" to add your academic qualifications.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {data.map((education, index) => (
            <div
              key={index}
              className="bg-slate-50/60 border border-slate-200/70 rounded-xl p-5 space-y-4 relative group"
            >
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Education #{index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeEducation(index)}
                  className="inline-flex items-center gap-1 text-slate-400 hover:text-red-600 text-xs font-medium p-1 rounded hover:bg-red-50 transition"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Degree / Qualification
                  </label>
                  <input
                    type="text"
                    name="degree"
                    value={education.degree}
                    onChange={(e) => handleChange(index, e)}
                    placeholder="e.g. B.S. in Computer Science"
                    className="w-full border border-slate-200 bg-white rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    College / University
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      name="college"
                      value={education.college}
                      onChange={(e) => handleChange(index, e)}
                      placeholder="e.g. Stanford University"
                      className="w-full border border-slate-200 bg-white rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                      Start Year
                    </label>
                    <input
                      type="text"
                      name="startYear"
                      value={education.startYear}
                      onChange={(e) => handleChange(index, e)}
                      placeholder="2018"
                      className="w-full border border-slate-200 bg-white rounded-xl px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                      End Year
                    </label>
                    <input
                      type="text"
                      name="endYear"
                      value={education.endYear}
                      onChange={(e) => handleChange(index, e)}
                      placeholder="2022"
                      className="w-full border border-slate-200 bg-white rounded-xl px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    CGPA / Grade / Percentage
                  </label>
                  <div className="relative">
                    <Award className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      name="percentage"
                      value={education.percentage}
                      onChange={(e) => handleChange(index, e)}
                      placeholder="e.g. 3.8 / 4.0 or 88%"
                      className="w-full border border-slate-200 bg-white rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Education;