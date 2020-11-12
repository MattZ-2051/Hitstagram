from flask import Blueprint, request, jsonify
from starter_app.models import User, Follower, Post,db

bp = Blueprint('number', __name__)


@bp.route('/<int:user_id>/counts', methods=["GET"])
def followers(user_id):

    follower_count = 0
    post_count = 0
    followers = Follower.query.filter_by(user_id=user_id).all()
    for follow in followers:
        follower_count += 1

    posts = Post.query.filter_by(user_id=user_id).all()

    for post in posts:
        post_count += 1
    return{'followerCount': follower_count, 'postCount': post_count}
