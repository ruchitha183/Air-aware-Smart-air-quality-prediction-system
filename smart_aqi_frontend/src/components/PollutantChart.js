import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell, Legend
} from "recharts";

const pollutantColors = {
  good: "#16a34a",
  moderate: "#eab308",
  unhealthy: "#f97316",
  veryUnhealthy: "#dc2626",
};

const getBarColor = (value) => {
  if (value <= 50) return pollutantColors.good;
  if (value <= 100) return pollutantColors.moderate;
  if (value <= 150) return pollutantColors.unhealthy;
  return pollutantColors.veryUnhealthy;
};

const PollutantChart = ({ data }) => {
  const chartData = [
    { name: "PM2.5", value: data?.pm25 || 0 },
    { name: "PM10", value: data?.pm10 || 0 },
    { name: "NO2", value: data?.no2 || 0 },
    { name: "SO2", value: data?.so2 || 0 },
    { name: "O3", value: data?.o3 || 0 },
    { name: "CO", value: data?.co || 0 },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Pollutant Levels (µg/m³)</h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            contentStyle={{ backgroundColor: "#f3f4f6", borderRadius: 8 }}
            itemStyle={{ color: "#111827", fontWeight: 600 }}
          />
          <Legend />
          <Bar dataKey="value" radius={[10, 10, 0, 0]} isAnimationActive={true}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.value)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PollutantChart;
