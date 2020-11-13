import os
from flask import Blueprint, request, jsonify
from starter_app.models import User, Post, Follower, db, Comment
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

    # print(request.form.getlist('file'))
    # photo_file = request.form.getlist('file')[0]
    # photo_name = f'{user_id},{photo_file}'
    # print(photo_name)
    # print('===========================')
    print('===========================')
    print(request.files)
    print('===========================')
    if "file" not in request.files:
        return "No file key in request.files", 500

    # B
    file = request.files["file"]  # file is the actual photo file

    if file:
        photo_url = upload_file_to_s3(file, 'b.a.d')
        print('===========================')
        print(photo_url)
        try:
            photo = Post(caption='testing', img=photo_url, user_id=user_id)
            db.session.add(photo)
            db.session.commit()

            return {'photo': photo.to_dict()}
        except AssertionError as message:
            return jsonify({"error": str(message)}), 400

    else:
        print('something went wrong')


@bp.route('/<int:user_id>/feed', methods=['GET'])
def feed(user_id):

    following = Follower.query.filter_by(user_id=user_id).all()
    post_info_list = []
    user_info_list = []
    comment_info_list = []
    comment_user_info_list = []
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
            comments = Comment.query.filter_by(post_id=postInfo['id']).all()
            for comment in comments:
                comment_info_list.append(comment)
                commentInfo = comment.to_dict()
                comment_user_info = User.query.filter_by(id=commentInfo['userId']).first()
                comment_user_info_list.append(comment_user_info)
    return({'posts': post_info_list, 'userInfo': [user.to_dict() for user in user_info_list],
            'postComments': [comment.to_dict() for comment in comment_info_list],
            'postCommentUserInfo': [user.to_dict() for user in comment_user_info_list],
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
