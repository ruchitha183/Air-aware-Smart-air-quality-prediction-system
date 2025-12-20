import pandas as pd
import joblib
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, r2_score
from utils.aqi_utils import calculate_aqi_from_pm25


def train_model():
    # ===============================
    # 1. Load dataset
    # ===============================
    df = pd.read_csv("data/city_day.csv")

    # ===============================
    # 2. Rename columns (clean names)
    # ===============================
    df = df.rename(columns={
        "PM2.5": "pm25",
        "PM10": "pm10",
        "NO": "no",
        "NO2": "no2",
        "NOx": "nox",
        "CO": "co",
        "SO2": "so2",
        "O3": "o3"
    })

    # ===============================
    # 3. Drop unused columns
    # ===============================
    df = df.drop(columns=["city", "date", "no", "nox"], errors="ignore")

    # ===============================
    # 4. Handle missing values
    # ===============================
    df = df.dropna()

    # ===============================
    # 5. Calculate AQI (TARGET)
    # ===============================
    df["aqi"] = df["pm25"].apply(calculate_aqi_from_pm25)

    # ===============================
    # 6. Feature selection
    # ===============================
    features = ["pm25", "pm10", "co", "no2", "so2", "o3"]
    X = df[features]
    y = df["aqi"]

    # ===============================
    # 7. Train-test split
    # ===============================
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    # ===============================
    # 8. Train ML model
    # ===============================
    model = RandomForestRegressor(
        n_estimators=300,
        max_depth=15,
        random_state=42,
        n_jobs=-1
    )

    model.fit(X_train, y_train)

    # ===============================
    # 9. Evaluation
    # ===============================
    preds = model.predict(X_test)

    print("MAE:", mean_absolute_error(y_test, preds))
    print("R2 Score:", r2_score(y_test, preds))

    # ===============================
    # 10. Save model
    # ===============================
    joblib.dump(model, "models/aqi_predictor.pkl")
    print("✅ Model trained and saved successfully")


if __name__ == "__main__":
    train_model()