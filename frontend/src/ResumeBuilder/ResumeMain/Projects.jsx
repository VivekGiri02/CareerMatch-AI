import { FolderGit2, Plus, Trash2, Link } from "lucide-react";
const Projects = ({ data, setResumeData }) => {
  const addProject = () => {
    const newProject = {
      name: "",
      description: "",
      technologies: "",
      github: "",
      live: "",
    };

    setResumeData((prev) => ({
      ...prev,
      projects: [...prev.projects, newProject],
    }));
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;

    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.map((proj, i) =>
        i === index ? { ...proj, [name]: value } : proj
      ),
    }));
  };

  const removeProject = (index) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
            <FolderGit2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Featured Projects</h2>
            <p className="text-xs text-slate-500">Highlight your technical & personal accomplishments.</p>
          </div>
        </div>

        <button
          type="button"
          onClick={addProject}
          className="inline-flex items-center gap-2 bg-indigo-600 text-white font-medium text-xs px-4 py-2.5 rounded-xl hover:bg-indigo-700 active:scale-95 transition shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-10 border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
          <p className="text-sm text-slate-500 font-medium">No projects added yet.</p>
          <p className="text-xs text-slate-400 mt-1">Click "+ Add Project" to showcase what you've built.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {data.map((project, index) => (
            <div
              key={index}
              className="bg-slate-50/60 border border-slate-200/70 rounded-xl p-5 space-y-4 relative group"
            >
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Project #{index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeProject(index)}
                  className="inline-flex items-center gap-1 text-slate-400 hover:text-red-600 text-xs font-medium p-1 rounded hover:bg-red-50 transition"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Project Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={project.name}
                    onChange={(e) => handleChange(index, e)}
                    placeholder="e.g. E-Commerce Platform"
                    className="w-full border border-slate-200 bg-white rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={project.description}
                    onChange={(e) => handleChange(index, e)}
                    rows="3"
                    placeholder="Briefly describe what you built, key technical challenges solved, and results achieved..."
                    className="w-full border border-slate-200 bg-white rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition resize-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Technologies Used
                  </label>
                  <input
                    type="text"
                    name="technologies"
                    value={project.technologies}
                    onChange={(e) => handleChange(index, e)}
                    placeholder="e.g. React, TailwindCSS, Express.js, PostgreSQL"
                    className="w-full border border-slate-200 bg-white rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Repository (GitHub)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-sm font-bold text-slate-400">
  GH
</span>
                    <input
                      type="text"
                      name="github"
                      value={project.github}
                      onChange={(e) => handleChange(index, e)}
                      placeholder="https://github.com/username/project"
                      className="w-full border border-slate-200 bg-white rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Live Demo Link
                  </label>
                  <div className="relative">
                    <Link className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      name="live"
                      value={project.live}
                      onChange={(e) => handleChange(index, e)}
                      placeholder="https://myproject.com"
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

export default Projects;