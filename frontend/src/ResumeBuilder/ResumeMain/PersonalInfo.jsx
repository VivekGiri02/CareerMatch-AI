const PersonalInfo = ({ data, setResumeData }) => {
  const handleChange = (event) => {
    const { name, value } = event.target;

    setResumeData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [name]: value,
      },
    }));
  };

  const inputClass =
    "w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-gray-900";

  return (
    <section className="border border-gray-200 bg-white p-5 md:p-6">
      {/* Header */}
      <div className="mb-5">
        <h2 className="text-base font-semibold text-gray-900">
          Personal Information
        </h2>

        <p className="mt-1 text-xs text-gray-500">
          Add your basic professional information.
        </p>
      </div>

      {/* Fields */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Full Name */}
        <FormField label="Full Name">
          <input
            type="text"
            name="fullName"
            value={data.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            className={inputClass}
          />
        </FormField>

        {/* Job Title */}
        <FormField label="Job Title">
          <input
            type="text"
            name="jobTitle"
            value={data.jobTitle}
            onChange={handleChange}
            placeholder="e.g. Full Stack Developer"
            className={inputClass}
          />
        </FormField>

        {/* Email */}
        <FormField label="Email">
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={handleChange}
            placeholder="example@gmail.com"
            className={inputClass}
          />
        </FormField>

        {/* Phone */}
        <FormField label="Phone">
          <input
            type="text"
            name="phone"
            value={data.phone}
            onChange={handleChange}
            placeholder="+91 9876543210"
            className={inputClass}
          />
        </FormField>

        {/* Location */}
        <FormField label="Location">
          <input
            type="text"
            name="location"
            value={data.location}
            onChange={handleChange}
            placeholder="Ludhiana, Punjab"
            className={inputClass}
          />
        </FormField>

        {/* LinkedIn */}
        <FormField label="LinkedIn">
          <input
            type="text"
            name="linkedin"
            value={data.linkedin}
            onChange={handleChange}
            placeholder="LinkedIn profile URL"
            className={inputClass}
          />
        </FormField>

        {/* GitHub */}
        <FormField label="GitHub">
          <input
            type="text"
            name="github"
            value={data.github}
            onChange={handleChange}
            placeholder="GitHub profile URL"
            className={inputClass}
          />
        </FormField>

        {/* Portfolio */}
        <FormField label="Portfolio">
          <input
            type="text"
            name="portfolio"
            value={data.portfolio}
            onChange={handleChange}
            placeholder="Portfolio URL"
            className={inputClass}
          />
        </FormField>
      </div>

      {/* Summary */}
      <div className="mt-4">
        <label className="mb-2 block text-xs font-medium text-gray-700">
          Professional Summary
        </label>

        <textarea
          name="summary"
          value={data.summary}
          onChange={handleChange}
          rows={5}
          placeholder="Write a short professional summary..."
          className={`${inputClass} resize-none`}
        />
      </div>
    </section>
  );
};

/* Small reusable field wrapper */
const FormField = ({ label, children }) => {
  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-gray-700">
        {label}
      </label>

      {children}
    </div>
  );
};

export default PersonalInfo;