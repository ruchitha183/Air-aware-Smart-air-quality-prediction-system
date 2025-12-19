const AQILegend = () => {
  const levels = [
    { label: "Good", color: "#16a34a" },
    { label: "Moderate", color: "#eab308" },
    { label: "Unhealthy", color: "#f97316" },
    { label: "Very Unhealthy", color: "#dc2626" },
  ];

  return (
    <div className="flex gap-4 items-center mb-4">
      {levels.map((level) => (
        <div key={level.label} className="flex items-center gap-1">
          <div style={{ backgroundColor: level.color }} className="w-4 h-4 rounded-full border border-gray-300"></div>
          <span className="text-sm font-medium">{level.label}</span>
        </div>
      ))}
    </div>
  );
};

export default AQILegend;
