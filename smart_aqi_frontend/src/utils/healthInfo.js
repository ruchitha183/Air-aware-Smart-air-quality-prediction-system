export const getHealthInfo = (aqi) => {
  if (aqi <= 100) {
    return {
      category: "Good",
      recommendation: "Air quality is good. Enjoy outdoor activities!",
      precaution: "No special precautions required."
    };
  } else if (aqi > 100 && aqi <= 150) {
    return {
      category: "Moderate",
      recommendation: "Sensitive groups should reduce outdoor activity.",
      precaution: "Children, elderly, and asthma patients should limit exposure."
    };
  } else {
    return {
      category: "Unhealthy",
      recommendation: "Avoid outdoor activities.",
      precaution: "Wear a mask and stay indoors as much as possible."
    };
  }
};
