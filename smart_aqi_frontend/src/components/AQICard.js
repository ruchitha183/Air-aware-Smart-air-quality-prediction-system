const getAQIColor = (aqi) => {
  if (aqi <= 50) return "bg-green-500";
  if (aqi <= 100) return "bg-yellow-500";
  if (aqi <= 150) return "bg-orange-500";
  return "bg-red-500";
};

const AQICard = ({ data }) => {
  if (!data?.aqi) return null;

  return (
    <div className={`${getAQIColor(data.aqi)} text-white p-6 rounded-xl shadow-lg`}>
      <h2 className="text-xl font-semibold mb-2">Current AQI</h2>
      <p className="text-5xl font-bold">{data.aqi?.toFixed(2)}</p>
      <p className="mt-2 text-sm">Location: {data.location}</p>
    </div>
  );
};

export default AQICard;