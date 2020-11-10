from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime

db = SQLAlchemy()


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(100), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=False)
    hashed_password = db.Column(db.String(100), nullable=False)
    profile_img = db.Column(db.String(100), nullable=True)
    bio = db.Column(db.String(1000), nullable=True)
    posts = db.relationship('Post', backref='user', lazy=True)
    followers = db.relationship('Follower', backref='users', lazy=True)
    likes = db.relationship('Like', backref='users', lazy=True)
    comments = db.relationship('Comment', backref='users', lazy=True)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
          "id": self.id,
          "fullName": self.full_name,
          "username": self.username,
          'profileImg': self.profile_img,
          'bio': self.bio
        }


class Post(db.Model):

    __tablename__ = 'posts'

    id = db.Column(db.Integer, primary_key=True)
    caption = db.Column(db.Text, nullable=False)
    img = db.Column(db.String(1000), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    comments = db.relationship('Comment', backref='posts', lazy=True)
    likes = db.relationship('Like', backref='posts', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'caption': self.caption,
            'img': self.img,
            'userId': self.user_id
        }


class Comment(db.Model):

    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(100), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'postId': self.post_id,
            'userId': self.user_id
        }


class Follower(db.Model):

    __tablename__ = 'followers'

    id = db.Column(db.Integer, primary_key=True)
    user_followed_id = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'userFollowedId': self.user_followed_id,
            'userId': self.user_id
        }


class Like(db.Model):

    __tablename__ = 'likes'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)

    def to_dict(self):

        return {
            'id': self.id,
            'userId': self.user_id,
            'postId': self.post_id
        }
