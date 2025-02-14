from flask import Blueprint, request, jsonify
from flask_login import current_user, login_user, logout_user, login_required
from starter_app.models import User, db
from .forms import LoginForm, SignUpForm

bp = Blueprint('session', __name__)


@bp.route('/login', methods=["POST"])
# def login():
#     if not request.is_json:
#         return jsonify({"msg": "Missing JSON in request"}), 400
#     user_name = request.json.get("username", None)
#     user_password = request.json.get("password", None)
#     if not user_name or not user_password:
#         return {"errors": ["Missing required credentials"]}, 400
#     user = User.query.filter(User.username == user_name).first()
#     if not user or not user.check_password(user_password):
#         return {"errors": ["Invalid user credentials"]}, 401
#     login_user(user)
#     return {"user": current_user.to_dict()}
def login():
    if current_user.is_authenticated:
        return current_user.to_dict()

    data = request.json
    form = LoginForm(csrf_token=request.headers["x-Csrftoken"])
    if form.validate_on_submit():
        data = request.json
        user = User.query.filter(User.username == data["username"]).first()
        if not user or not user.check_password(data["password"]):
            return {"error": "No match found for username and password."}
        login_user(user)
        return user.to_dict()
    print(form.errors)
    return form.errors, 401


@bp.route('/signup', methods=["POST"])
# def signup():
#     if not request.is_json:
#         return jsonify({'msg': 'Missing JSON in request'}), 400
#     username = request.json.get('username', None)
#     user = User.query.filter(User.username == username).first()
#     if user:
#         return jsonify({"errors":
#                        "The email you've entered has been already registered"}
#                        ), 400
#     fullName = request.json.get('fullName', None)
#     password = request.json.get('password', None)
#     newUser = User(full_name=fullName, username=username, password=password)
#     db.session.add(newUser)
#     db.session.commit()
#     login_user(newUser)
#     return {'user': newUser.to_dict()}
def sign_up():
    if current_user.is_authenticated:
        return current_user.to_dict()
    form = SignUpForm(csrf_token=request.headers["x-Csrftoken"])
    if form.validate_on_submit():
        data = request.json
        user = User(
            full_name=data["fullName"],
            username=data["username"],
            password=data["password"],
        )
        db.session.add(user)
        db.session.commit()

        newUser = User.query.filter(
            User.email == user.to_dict()["username"]).first()
        login_user(newUser)
        return user.to_dict()
    return form.errors, 401


@bp.route('/logout', methods=['POST'])
def logout():
    logout_user()
    return {'msg': 'You have been logged out'}, 200


@bp.route('/load')
def load():
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {}


@bp.route("/get_csrf")
def get_csrf_token():
    form = LoginForm()
    return {"csrfT": form.csrf_token._value()}
