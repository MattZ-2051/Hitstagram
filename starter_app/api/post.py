import os
from flask import Blueprint, request, jsonify
from starter_app.models import User, Post, Follower, db, Comment, Like
import boto3

bp = Blueprint('post', __name__)


llave = os.environ.get('S3_KEY')
secret_llave = os.environ.get('S3_SECRET')

s3 = boto3.client(
    's3',
    aws_access_key_id=llave,
    aws_secret_access_key=secret_llave
)


def upload_file_to_s3(file, bucket_name, acl="public-read"):
    print('bucket and file', file, bucket_name)

    try:

        s3.upload_fileobj(
            file,
            bucket_name,
            file.filename,
            ExtraArgs={
                "ACL": acl,
                "ContentType": file.content_type
            }
        )

    except Exception as e:
        # This is a catch all exception, edit this part to fit your needs.
        print("Something Happened: ", e)
        return e
    # Note your photo url will be different the correct url can be found in
    # bucket when you click on an image and check the image info.
    photoUrl = "{}{}".format(
        'https://s3-us-west-2.amazonaws.com/b.a.d/', file.filename)
    return photoUrl


@bp.route('/<int:user_id>/upload', methods=['POST'])
def upload(user_id):

    if "file" not in request.files:
        return "No file key in request.files", 500

    # B
    file = request.files["file"]  # file is the actual photo file

    if file:
        photo_url = upload_file_to_s3(file, 'b.a.d')
        try:
            photo = Post(caption='testing', img=photo_url, user_id=user_id)
            db.session.add(photo)
            db.session.commit()

            return {'photo': photo.to_dict()}
        except AssertionError as message:
            return jsonify({"error": str(message)}), 400

    else:
        print('something went wrong')


@bp.route('/<int:user_id>/upload/profileImg', methods=['PATCH'])
def profile_upload(user_id):

    if "file" not in request.files:
        return "No file key in request.files", 500

    # B
    file = request.files["file"]  # file is the actual photo file

    if file:
        photo_url = upload_file_to_s3(file, 'b.a.d')
        try:
            user = User.query.filter_by(id=user_id).first()
            user.profile_img = photo_url
            db.session.commit()

            return {'user': user.to_dict()}
        except AssertionError as message:
            return jsonify({"error": str(message)}), 400

    else:
        print('something went wrong')


@bp.route('/<int:user_id>/feed', methods=['GET'])
def feed(user_id):

    following = Follower.query.filter_by(user_id=user_id).all()
    post_info_list = []
    user_info_list = []
    logged_in_post = []

    logged_in_user_post = Post.query.filter_by(user_id=user_id).all()
    for post in logged_in_user_post:
        logged_in_post.append(post.to_dict())

    for follow in following:
        info = follow.to_dict()
        posts = Post.query.filter_by(user_id=info['userFollowedId']).all()
        for post in posts:
            postInfo = post.to_dict()
            post_info_list.append(postInfo)
            user = User.query.filter_by(id=postInfo['userId']).first()
            user_info_list.append(user)

    return({'posts': post_info_list, 'userInfo': [user.to_dict() for user in user_info_list],
            'loggedInUserPost': logged_in_post})


@bp.route('/<int:post_id>/data', methods=['GET'])
def single_post(post_id):

    obj = Post.query.filter_by(id=post_id).first()
    post = obj.to_dict()
    comment_list = []
    comment_user_info_list = []

    comments = Comment.query.filter_by(post_id=post['id']).all()
    user = User.query.filter_by(id=post['userId']).first()

    for comment in comments:
        comment_list.append(comment.to_dict())

    for comment in comment_list:
        userComment = User.query.filter_by(id=comment['userId']).first()
        comment_user_info_list.append(userComment.to_dict())

    return {'post': post, 'comments': comment_list, 'userInfo': user.to_dict(), 'commentUserInfo': comment_user_info_list}


@bp.route('<int:post_id>/<int:user_id>/<int:comment_id>/comment', methods=['POST', 'DELETE'])
def comment(post_id, user_id, comment_id):

    if request.method == 'POST':
        comment_data = request.get_json()
        new_comment = Comment(content=comment_data, post_id=post_id, user_id=user_id)
        user = User.query.filter_by(id=user_id).first()
        db.session.add(new_comment)
        db.session.commit()

        return {'comment': new_comment.to_dict(), 'user': user.to_dict()}

    if request.method == 'DELETE':

        info_list = []
        comment = Comment.query.filter_by(id=comment_id).first()
        db.session.delete(comment)
        db.session.commit()

        comments = Comment.query.filter_by(post_id=post_id).all()
        comment_data_list = []
        user_data_list = []

        for comment in comments:
            comment_data_list.append(comment.to_dict())
            data = comment.to_dict()
            user = User.query.filter_by(id=data['userId']).first()
            user_data_list.append(user.to_dict())

        print('======================================')
        print(comment_data_list)
        print(user_data_list)
        print('======================================')
        return {'comments': comment_data_list, 'userInfo': user_data_list}


@bp.route('<int:user_id>/profile', methods=['GET'])
def profile_info(user_id):

    user = User.query.filter_by(id=user_id).first()
    user_info = user.to_dict()
    post_info_list = []
    post = Post.query.filter_by(user_id=user_info['id']).all()

    for post_info in post:
        post_info_list.append(post_info.to_dict())

    return {'userInfo': user_info, 'posts': post_info_list}


@bp.route('<int:post_id>/post/comments', methods=['GET'])
def post_comments(post_id):

    comments = Comment.query.filter_by(post_id=post_id).all()
    comment_data_list = []
    user_data_list = []

    for comment in comments:
        comment_data_list.append(comment.to_dict())
        data = comment.to_dict()
        user = User.query.filter_by(id=data['userId']).first()
        user_data_list.append(user.to_dict())

    return {'comments': comment_data_list, 'userInfo': user_data_list}


@bp.route('<int:post_id>/<int:user_id>/like', methods=['POST', 'DELETE', 'GET'])
def like(post_id, user_id):

    if request.method == 'GET':
        like = Like.query.filter_by(user_id=user_id, post_id=post_id).first()
        if like is None:
            return {'like': False}
        else:
            return {'like': True}

    if request.method == 'POST':
        like = Like(user_id=user_id, post_id=post_id)
        db.session.add(like)
        db.session.commit()

        return {'like': like.to_dict()}

    if request.method == 'DELETE':
        like = Like.query.filter_by(user_id=user_id, post_id=post_id).first()
        db.session.delete(like)
        db.session.commit()

        return {'message': 'like removed'}, 200


@bp.route('explore/posts', methods=['GET'])
def explore():

    posts = Post.query.all()
    post_info_list = []
    for post in posts:
        post_info_list.append(post.to_dict())

    return {'posts': post_info_list}


@bp.route('<int:user_id>/user', methods=['GET'])
def explore_user(user_id):

    user = User.query.filter_by(id=user_id).first()

    return {'user': user.to_dict()}
