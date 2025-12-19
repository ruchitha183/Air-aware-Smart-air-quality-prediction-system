import { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";

const PredictionChart = ({ data }) => {
  const [range, setRange] = useState("hours");

  const defaultData = {
    hours: Array.from({ length: 24 }, (_, i) => ({ label: `${i}:00`, aqi: 80 + Math.random() * 30 })),
    weekdays: [
      { label: "Mon", aqi: 85 }, { label: "Tue", aqi: 90 }, { label: "Wed", aqi: 95 },
      { label: "Thu", aqi: 88 }, { label: "Fri", aqi: 92 }, { label: "Sat", aqi: 85 }, { label: "Sun", aqi: 80 },
    ],
    months: [
      { label: "Jan", aqi: 90 }, { label: "Feb", aqi: 92 }, { label: "Mar", aqi: 95 },
      { label: "Apr", aqi: 100 }, { label: "May", aqi: 105 }, { label: "Jun", aqi: 98 },
      { label: "Jul", aqi: 96 }, { label: "Aug", aqi: 100 }, { label: "Sep", aqi: 102 },
      { label: "Oct", aqi: 99 }, { label: "Nov", aqi: 97 }, { label: "Dec", aqi: 95 },
    ],
  };

  const chartData = data && Object.keys(data).length ? data : defaultData;

  const getLineColor = (aqi) => {
    if (aqi <= 50) return "#16a34a";
    if (aqi <= 100) return "#eab308";
    if (aqi <= 150) return "#f97316";
    return "#dc2626";
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">AQI Prediction</h2>
        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded"
        >
          <option value="hours">Hours</option>
          <option value="weekdays">Weekdays</option>
          <option value="months">Months</option>
        </select>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={chartData[range]}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip
            contentStyle={{ backgroundColor: "#f3f4f6", borderRadius: 8 }}
            itemStyle={{ fontWeight: 600 }}
          />
          <Line
            type="monotone"
            dataKey="aqi"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 6 }}
            isAnimationActive={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PredictionChart;
