import requests
from config import Config
from utils.aqi_utils import calculate_aqi_from_pm25

GEOCODE_URL = "https://api.openweathermap.org/geo/1.0/direct"
AQI_URL = "https://api.openweathermap.org/data/2.5/air_pollution"

def get_coordinates(city):
    params = {
        "q": f"{city},IN",
        "limit": 1,
        "appid": Config.OPENWEATHER_API_KEY
    }

    res = requests.get(GEOCODE_URL, params=params, timeout=10)
    data = res.json()

    if not data:
        raise Exception(f"City not found: {city}")

    return data[0]["lat"], data[0]["lon"]

def fetch_real_aqi(location):
    if not location:
        raise Exception("Location is required")

    location = location.strip()

    # 1️⃣ Get lat & lon dynamically
    lat, lon = get_coordinates(location)

    # 2️⃣ Fetch AQI
    res = requests.get(
        AQI_URL,
        params={
            "lat": lat,
            "lon": lon,
            "appid": Config.OPENWEATHER_API_KEY
        },
        timeout=10
    )

    data = res.json()

    if "list" not in data or not data["list"]:
        raise Exception("Invalid AQI response")

    comp = data["list"][0]["components"]

    pm25 = comp.get("pm2_5", 0)
    aqi = calculate_aqi_from_pm25(pm25)

    return {
        "location": location,
        "aqi": aqi,
        "pm25": pm25,
        "pm10": comp.get("pm10", 0),
        "co": comp.get("co", 0),
        "no2": comp.get("no2", 0),
        "so2": comp.get("so2", 0),
        "o3": comp.get("o3", 0)
    }