import os
from flask import Blueprint, request, jsonify
from starter_app.models import User, Follower, db

bp = Blueprint('follow', __name__)


@bp.route('<int:user_id>/add/<int:user_followed_id>', methods=['GET','POST','DELETE'])
def follow(user_id, user_followed_id):

    if request.method == 'POST':

        new_follow = Follower(user_followed_id=user_followed_id, user_id=user_id)
        db.session.add(new_follow)
        db.session.commit()

        return {'message': 'user followed'}

    if request.method == 'GET':

        follow = Follower.query.filter_by(user_followed_id=user_followed_id, user_id=user_id).first()

        if follow is None:
            return {'follow': False}
        else:
            return {'follow': True}

    if request.method == 'DELETE':

        follow =  follow = Follower.query.filter_by(user_followed_id=user_followed_id, user_id=user_id).first()
        db.session.delete(follow)
        db.session.commit()

        return {'message': 'user unfollowed'}
