const FilterPanel = ({ filters, setFilters }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow mb-6 flex gap-4">
      <select
        className="p-2 rounded border"
        value={filters.pollutant}
        onChange={(e) =>
          setFilters({ ...filters, pollutant: e.target.value })
        }
      >
        <option value="">All Pollutants</option>
        <option value="pm25">PM2.5</option>
        <option value="pm10">PM10</option>
        <option value="co">CO</option>
      </select>

      <select
        className="p-2 rounded border"
        value={filters.level}
        onChange={(e) =>
          setFilters({ ...filters, level: e.target.value })
        }
      >
        <option value="">All Levels</option>
        <option value="good">Good</option>
        <option value="moderate">Moderate</option>
        <option value="poor">Poor</option>
      </select>
    </div>
  );
};

export default FilterPanel;
