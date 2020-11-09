from flask import Blueprint, request, jsonify
from starter_app.models import User, db

bp = Blueprint('users', __name__)


@bp.route('/<int:user_id>/edit', methods=['GET', 'PATCH'])
def updateProfile(user_id):

    new_name = request.json['fullName']
    new_bio = request.json['bio']
    user = User.query.filter_by(id=user_id).first()
    user.full_name = new_name
    user.bio = new_bio
    db.session.commit()
    return {'user': user.to_dict()}
