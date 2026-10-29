import { Briefcase, Plus, Trash2, Calendar, MapPin, Building2 } from "lucide-react";

const Experience = ({ data, setResumeData }) => {
  const addExperience = () => {
    const newExperience = {
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    };

    setResumeData((prev) => ({
      ...prev,
      experience: [...prev.experience, newExperience],
    }));
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;

    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp, i) =>
        i === index ? { ...exp, [name]: value } : exp
      ),
    }));
  };

  const removeExperience = (index) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Work Experience</h2>
            <p className="text-xs text-slate-500">Detail your relevant past roles, internships, or freelance work.</p>
          </div>
        </div>

        <button
          type="button"
          onClick={addExperience}
          className="inline-flex items-center gap-2 bg-indigo-600 text-white font-medium text-xs px-4 py-2.5 rounded-xl hover:bg-indigo-700 active:scale-95 transition shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Experience
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-10 border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
          <p className="text-sm text-slate-500 font-medium">No experience added yet.</p>
          <p className="text-xs text-slate-400 mt-1">Click "+ Add Experience" to get started.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {data.map((exp, index) => (
            <div
              key={index}
              className="bg-slate-50/60 border border-slate-200/70 rounded-xl p-5 space-y-4 relative group"
            >
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Role #{index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeExperience(index)}
                  className="inline-flex items-center gap-1 text-slate-400 hover:text-red-600 text-xs font-medium p-1 rounded hover:bg-red-50 transition"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Job Title
                  </label>
                  <input
                    type="text"
                    name="position"
                    value={exp.position}
                    onChange={(e) => handleChange(index, e)}
                    placeholder="e.g. Frontend Developer"
                    className="w-full border border-slate-200 bg-white rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Company Name
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      name="company"
                      value={exp.company}
                      onChange={(e) => handleChange(index, e)}
                      placeholder="e.g. Stripe, Inc."
                      className="w-full border border-slate-200 bg-white rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      name="location"
                      value={exp.location}
                      onChange={(e) => handleChange(index, e)}
                      placeholder="e.g. Remote / New York"
                      className="w-full border border-slate-200 bg-white rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                      Start Date
                    </label>
                    <input
                      type="text"
                      name="startDate"
                      value={exp.startDate}
                      onChange={(e) => handleChange(index, e)}
                      placeholder="Jan 2022"
                      className="w-full border border-slate-200 bg-white rounded-xl px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                      End Date
                    </label>
                    <input
                      type="text"
                      name="endDate"
                      value={exp.endDate}
                      onChange={(e) => handleChange(index, e)}
                      placeholder="Present"
                      className="w-full border border-slate-200 bg-white rounded-xl px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Responsibilities & Achievements
                </label>
                <textarea
                  name="description"
                  value={exp.description}
                  onChange={(e) => handleChange(index, e)}
                  rows="3"
                  placeholder="• Developed high-performance React UI components...&#10;• Increased API response speed by 35%..."
                  className="w-full border border-slate-200 bg-white rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition resize-none"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Experience;