import joblib
import pandas as pd

# Load trained model
model = joblib.load("models/aqi_predictor.pkl")

def predict_aqi_trend(current_data):
    # 🔑 Use DataFrame with feature names (IMPORTANT)
    features = pd.DataFrame([{
        "pm25": current_data["pm25"],
        "pm10": current_data["pm10"],
        "co": current_data["co"],
        "no2": current_data["no2"],
        "so2": current_data["so2"],
        "o3": current_data["o3"]
    }])

    base = model.predict(features)[0]

    return {
        "hours": [
            {"label": f"{i}:00", "aqi": int(base + (i % 5))}
            for i in range(24)
        ],
        "weekdays": [
            {"label": day, "aqi": int(base + idx * 2)}
            for idx, day in enumerate(
                ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
            )
        ],
        "months": [
            {"label": m, "aqi": int(base + idx * 3)}
            for idx, m in enumerate(
                ["Jan","Feb","Mar","Apr","May","Jun",
                 "Jul","Aug","Sep","Oct","Nov","Dec"]
            )
        ]
    }