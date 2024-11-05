from flask import Flask
from extensions import db, jwt
from routes import bp_auth

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
app.config["JWT_SECRET_KEY"] = "your_jwt_secret_key"
db.init_app(app)
jwt.init_app(app)
app.register_blueprint(bp_auth, url_prefix="/auth")

if __name__ == "__main__":
    app.run(debug=True)
