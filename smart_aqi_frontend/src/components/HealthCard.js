const HealthCard = ({ aqi }) => {
  let message = "Air quality is good. Enjoy outdoor activities!";
  let color = "bg-green-100 text-green-800";

  if (aqi > 100 && aqi <= 150) {
    message = "Sensitive groups should reduce outdoor activity.";
    color = "bg-yellow-100 text-yellow-800";
  } else if (aqi > 150) {
    message = "Avoid outdoor activities. Wear a mask if necessary.";
    color = "bg-red-100 text-red-800";
  }

  return (
    <div className={`p-6 rounded-xl shadow ${color}`}>
      <h2 className="text-xl font-semibold mb-2">Health Recommendation</h2>
      <p>{message}</p>
    </div>
  );
};

export default HealthCard;
