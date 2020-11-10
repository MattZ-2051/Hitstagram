from dotenv import load_dotenv
from starter_app import app, db
from starter_app.models import User, Post, Comment, Like, Follower

load_dotenv()

with app.app_context():
    db.drop_all()
    db.create_all()

    ian = User(full_name='Ian', username='ianaa.io',
               password='password')

    pollow = User(full_name='Braydon Kevin', username='pillow',
                  password='password')

    scar = User(full_name='Oscar Smells', username='wet-bread',
                password='password')

    andoni = User(full_name='Andoni B', username='MIP',
                  password='password')

    sam = User(full_name='Sam', username='Mr.Sam',
               password='password')

    matt = User(full_name='Matt Testing', username='mdizzle',
                password='password')

    andoni_post = Post(caption='first post', img='https://images.unsplash.com/photo-1605002713581-123e77bcf83d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', user_id=4)

    matt_post = Post(caption='matts post', img = 'https://images.unsplash.com/photo-1604951493261-e3c630592c31?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', user_id=6)

    andoni_second_post = Post(caption='this is andoni second post', img='https://images.unsplash.com/photo-1604756436936-5de2b9707fa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', user_id=4)

    scar_post = Post(caption='thjis is scars post', img='https://images.unsplash.com/photo-1604961872836-261fa413ea03?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', user_id=3)

    andoni_comment = Comment(content='second comment, still testing!', post_id=2, user_id=4)

    matt_comment = Comment(content='first comment, testing!!!', post_id=1, user_id=6)

    matt_follow = Follower(user_followed_id=4, user_id=6)

    andoni_follow = Follower(user_followed_id=6, user_id=4)

    andoni_second_follow = Follower(user_followed_id=3, user_id=4)

    scar_follow = Follower(user_followed_id=4, user_id=3)

    matt_like = Like(user_id=6, post_id=1)

    db.session.add(ian)
    db.session.add(pollow)
    db.session.add(scar)
    db.session.add(andoni)
    db.session.add(sam)
    db.session.add(matt)
    db.session.add(andoni_post)
    db.session.add(andoni_second_post)
    db.session.add(matt_post)
    db.session.add(scar_post)
    db.session.add(matt_comment)
    db.session.add(andoni_follow)
    db.session.add(andoni_second_follow)
    db.session.add(matt_like)
    db.session.add(andoni_comment)
    db.session.add(matt_follow)
    db.session.add(scar_follow)

    db.session.commit()
