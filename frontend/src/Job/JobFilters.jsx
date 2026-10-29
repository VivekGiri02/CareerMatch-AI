const JobFilters = ({
  search,
  onSearchChange,
  location,
  onLocationChange,
  workMode,
  onWorkModeChange,
  sortBy,
  onSortChange,
}) => {
  return (
    <div className="border border-gray-200 bg-white p-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Search */}

        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-500">
            Search jobs
          </label>

          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Job, company or skill"
            className="w-full border border-gray-200 px-3 py-2.5 text-sm outline-none transition focus:border-gray-500"
          />
        </div>

        {/* Location */}

        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-500">
            Location
          </label>

          <select
            value={location}
            onChange={(e) => onLocationChange(e.target.value)}
            className="w-full border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-gray-500"
          >
            <option value="">All Locations</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Pune">Pune</option>
            <option value="Delhi">Delhi</option>
            <option value="Chennai">Chennai</option>
          </select>
        </div>

        {/* Work Mode */}

        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-500">
            Work Mode
          </label>

          <select
            value={workMode}
            onChange={(e) => onWorkModeChange(e.target.value)}
            className="w-full border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-gray-500"
          >
            <option value="">All Modes</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
            <option value="On-site">On-site</option>
          </select>
        </div>

        {/* Sort */}

        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-500">
            Sort By
          </label>

          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-gray-500"
          >
            <option value="match">Best Match</option>
            <option value="company">Company</option>
            <option value="title">Job Title</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default JobFilters;