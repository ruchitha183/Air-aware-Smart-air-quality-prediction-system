from flask import Blueprint, jsonify, request
from services.external_aqi import fetch_real_aqi
from services.prediction_service import predict_aqi_trend
from database.mongo import aqi_collection

aqi_bp = Blueprint("aqi", __name__)

@aqi_bp.route("/current", methods=["GET"])
def get_current_aqi():
    location = request.args.get("location")

    try:
        data = fetch_real_aqi(location)
        aqi_collection.insert_one(data)

        # 🔑 FIX: remove ObjectId
        data.pop("_id", None)

        return jsonify(data)
    except Exception as e:
        return jsonify({
            "error": str(e),
            "message": "Failed to fetch AQI data"
        }), 500


@aqi_bp.route("/predict", methods=["GET"])
def get_prediction():
    location = request.args.get("location")

    try:
        current = fetch_real_aqi(location)
        prediction = predict_aqi_trend(current)

        return jsonify(prediction)
    except Exception as e:
        return jsonify({
            "error": str(e),
            "message": "Prediction failed"
        }), 500