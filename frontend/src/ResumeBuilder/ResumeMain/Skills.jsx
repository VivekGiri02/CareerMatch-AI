import { useState } from "react";
import { Sparkles, X, Plus } from "lucide-react";

const Skills = ({ data, setResumeData }) => {
  const [inputValue, setInputValue] = useState("");

  const addSkill = (skill) => {
    const trimmed = skill.trim();
    if (trimmed && !data.includes(trimmed)) {
      setResumeData((prev) => ({
        ...prev,
        skills: [...prev.skills, trimmed],
      }));
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addSkill(inputValue);
      setInputValue("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-800">Skills & Expertise</h2>
          <p className="text-xs text-slate-500">
            Press <kbd className="px-1.5 py-0.5 bg-slate-100 rounded text-slate-600 font-mono text-[11px]">Enter</kbd> or type a comma to add key skills.
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. React, TypeScript, Node.js"
            className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition"
          />
          <button
            type="button"
            onClick={() => {
              addSkill(inputValue);
              setInputValue("");
            }}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-sm rounded-xl transition flex items-center gap-1.5 shrink-0"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>

        {data.length > 0 ? (
          <div className="flex flex-wrap gap-2 pt-2">
            {data.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1.5 bg-indigo-50/80 text-indigo-700 border border-indigo-100 px-3 py-1.5 rounded-lg text-xs font-medium group transition"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="text-indigo-400 hover:text-indigo-700 p-0.5 rounded-full hover:bg-indigo-100 transition"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
            <p className="text-xs text-slate-400">No skills added yet. Type above to add your technical or soft skills.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Skills;