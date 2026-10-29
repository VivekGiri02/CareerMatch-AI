import { Award, Plus, Trash2, Calendar, Link, Building } from "lucide-react";

const Certifications = ({ data, setResumeData }) => {
  const addCertification = () => {
    const newCertification = {
      name: "",
      organization: "",
      date: "",
      link: "",
    };

    setResumeData((prev) => ({
      ...prev,
      certifications: [...prev.certifications, newCertification],
    }));
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;

    setResumeData((prev) => ({
      ...prev,
      certifications: prev.certifications.map((cert, i) =>
        i === index ? { ...cert, [name]: value } : cert
      ),
    }));
  };

  const removeCertification = (index) => {
    setResumeData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Certifications & Licenses</h2>
            <p className="text-xs text-slate-500">Industry badges, licenses, and verified online courses.</p>
          </div>
        </div>

        <button
          type="button"
          onClick={addCertification}
          className="inline-flex items-center gap-2 bg-indigo-600 text-white font-medium text-xs px-4 py-2.5 rounded-xl hover:bg-indigo-700 active:scale-95 transition shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Certificate
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-10 border border-dashed border-slate-200 rounded-xl bg-slate-50/50">
          <p className="text-sm text-slate-500 font-medium">No certifications added.</p>
          <p className="text-xs text-slate-400 mt-1">Click "+ Add Certificate" to list your achievements.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {data.map((certificate, index) => (
            <div
              key={index}
              className="bg-slate-50/60 border border-slate-200/70 rounded-xl p-5 space-y-4 relative group"
            >
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Certification #{index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeCertification(index)}
                  className="inline-flex items-center gap-1 text-slate-400 hover:text-red-600 text-xs font-medium p-1 rounded hover:bg-red-50 transition"
                >
                  <Trash2 className="w-4 h-4" />
                  Remove
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Certificate Title
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={certificate.name}
                    onChange={(e) => handleChange(index, e)}
                    placeholder="e.g. AWS Certified Solutions Architect"
                    className="w-full border border-slate-200 bg-white rounded-xl px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Issuing Organization
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      name="organization"
                      value={certificate.organization}
                      onChange={(e) => handleChange(index, e)}
                      placeholder="e.g. Amazon Web Services"
                      className="w-full border border-slate-200 bg-white rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Issue Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      name="date"
                      value={certificate.date}
                      onChange={(e) => handleChange(index, e)}
                      placeholder="e.g. August 2023"
                      className="w-full border border-slate-200 bg-white rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    Credential URL
                  </label>
                  <div className="relative">
                    <Link className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      name="link"
                      value={certificate.link}
                      onChange={(e) => handleChange(index, e)}
                      placeholder="https://verify.credential.com/id"
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

export default Certifications;