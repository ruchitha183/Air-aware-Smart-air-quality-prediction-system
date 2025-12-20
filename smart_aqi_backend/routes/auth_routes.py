from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from database.mongo import users_collection
from models.user_model import hash_password, check_password

auth_bp = Blueprint("auth", __name__)

# ======================
# REGISTER
# ======================
@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"error": "Missing fields"}), 400

    # Check if user exists
    if users_collection.find_one({"email": email}):
        return jsonify({"error": "User already exists"}), 409

    user = {
        "email": email,
        "password": hash_password(password)
    }

    users_collection.insert_one(user)

    return jsonify({"message": "User registered successfully"}), 201


# ======================
# LOGIN
# ======================
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = users_collection.find_one({"email": email})

    if not user:
        return jsonify({"error": "Invalid email or password"}), 401

    if not check_password(password, user["password"]):
        return jsonify({"error": "Invalid email or password"}), 401

    token = create_access_token(identity=email)

    return jsonify({
        "message": "Login successful",
        "token": token
    }), 200