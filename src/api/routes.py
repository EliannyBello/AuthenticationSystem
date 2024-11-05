import datetime
from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from werkzeug.security import generate_password_hash, check_password_hash
from models import User, Profile
from extensions import db

bp_auth = Blueprint("bp_auth", __name__)

@bp_auth.route('/login', methods=['POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')
    if not email:
        return jsonify({"status": "error", "message": "Email is required"}), 422
    if not password:
        return jsonify({"status": "error", "message": "Password is required"}), 422
    found = User.query.filter_by(email=email).first()
    if not found or not check_password_hash(found.password, password):
        return jsonify({"status": "error", "message": "Email/password are incorrect"}), 401
    expire = datetime.timedelta(days=5)
    access_token = create_access_token(identity=found.id, expires_delta=expire)
    data = {
        "access_token": access_token,
        "user": found.serialize()
    }
    return jsonify({"status": "success", "message": "Login successfully", "data": data}), 200




@bp_auth.route('/register', methods=['POST'])
def register():
    username = request.json.get('username')
    email = request.json.get('email')
    password = request.json.get('password')
    if not username:
        return jsonify({"status": "error", "message": "Username is required"}), 422
    if not email:
        return jsonify({"status": "error", "message": "Email is required"}), 422
    if not password:
        return jsonify({"status": "error", "message": "Password is required"}), 422
    if User.query.filter_by(email=email).first():
        return jsonify({"status": "error", "message": "Email is already in use!"}), 422
    if User.query.filter_by(username=username).first():
        return jsonify({"status": "error", "message": "Username is already in use!"}), 422
    profile = Profile()
    user = User(username=username, email=email, password=generate_password_hash(password), profile=profile)
    db.session.add(user)
    db.session.commit()
    expire = datetime.timedelta(days=5)
    access_token = create_access_token(identity=user.id, expires_delta=expire)
    data = {
        "access_token": access_token,
        "user": user.serialize()
    }
    return jsonify({"status": "success", "message": "Register successfully", "data": data}), 200
