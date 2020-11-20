from dotenv import load_dotenv
from starter_app import app, db
from starter_app.models import User, Post, Comment, Like, Follower

load_dotenv()

with app.app_context():
    db.drop_all()
    db.create_all()

    ian = User(full_name='Ian', username='ianaa.io',
               password='password')

    pollow = User(full_name='Braydon Kevin', username='pollow',
                  password='password', profile_img='https://images.unsplash.com/photo-1602603889213-69cb31a64b0b?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60')

    scar = User(full_name='Oscar Smells', username='scar',
                password='password', profile_img='https://images.unsplash.com/photo-1605718665998-85fbd49c5eff?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60')

    andoni = User(full_name='Andoni B', username='Demo',
                  password='password', profile_img='https://images.unsplash.com/photo-1605425971671-aed55e6f4660?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60')

    sam = User(full_name='Sam', username='Mr.Sam',
               password='password', profile_img='https://images.unsplash.com/photo-1605715677594-b784198660ce?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=500&q=60')

    matt = User(full_name='Matt Testing', username='Zaphod',
                password='password', profile_img='https://images.unsplash.com/photo-1605132641261-0e8e54fdf6c3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60')

    andoni_post = Post(caption='first post', img='https://images.unsplash.com/photo-1605002713581-123e77bcf83d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', user_id=4)

    matt_post = Post(caption='matts post', img='https://images.unsplash.com/photo-1604951493261-e3c630592c31?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', user_id=6)

    andoni_second_post = Post(caption='this is andoni second post', img='https://images.unsplash.com/photo-1604756436936-5de2b9707fa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', user_id=4)

    andoni_third_post = Post(caption='Dukkha, Samudaya, Nirohdha, Magga', user_id=4 ,img='https://images.unsplash.com/photo-1538024333176-f25f63f873ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60')

    scar_post = Post(caption="ventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?", img='https://images.unsplash.com/photo-1604961872836-261fa413ea03?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60', user_id=3)

    scar_second_post = Post(caption='This is my awesome post! with my just as awesome caption!', user_id=3, img='https://images.unsplash.com/photo-1605737507250-675582df9024?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=500&q=60')

    pollow_post = Post(caption='Nice cut G!', user_id=2, img='https://images.unsplash.com/photo-1605497788044-5a32c7078486?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzM3x8fGVufDB8fHw%3D&auto=format&fit=crop&w=500&q=60')

    sam_post = Post(caption='Sold out Dates', user_id=5, img='https://images.unsplash.com/photo-1605737804470-0d611b7b827c?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0MHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=500&q=60')

    matt_second_post = Post(caption='Bikes are dope', user_id=6, img='https://images.unsplash.com/photo-1605737710291-98fe72919667?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0OHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=500&q=60')

    scar_third_post = Post(caption='puuuuuuuurrrrrrrrrrrrrr', user_id=3, img='https://images.unsplash.com/photo-1605763588123-7ff925e74387?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2NXx8fGVufDB8fHw%3D&auto=format&fit=crop&w=500&q=60')

    pollow_second_post = Post(caption='ah suuuhhhh dude', user_id=2, img='https://images.unsplash.com/photo-1605656817292-529131d346c4?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMzZ8fHxlbnwwfHx8&auto=format&fit=crop&w=500&q=60')

    andoni_comment = Comment(content='Comment Comment Comment!', post_id=4, user_id=4)

    matt_comment = Comment(content='Loreimpus!!!', post_id=3, user_id=2)

    testing_comment = Comment(content='ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit', post_id=4, user_id=4)

    another_comment = Comment(content='masdfasdfasdfsadf!!!', post_id=3, user_id=6)

    matt_follow = Follower(user_followed_id=4, user_id=6)

    andoni_follow = Follower(user_followed_id=6, user_id=4)

    andoni_second_follow = Follower(user_followed_id=3, user_id=4)

    andoni_third_follow = Follower(user_followed_id=5, user_id=4)

    scar_follow = Follower(user_followed_id=4, user_id=3)

    matt_like = Like(user_id=6, post_id=1)

    sam_comment = Comment(content='asdfasdfasdfasdf', post_id=1, user_id=5)

    braydon_commment = Comment(content='comment', post_id=2, user_id=2)

    braydon_second_comment = Comment(content='asdfasdfasdft comment', post_id=1, user_id=2)

    sam_second_commment = Comment(content='asdfasdfasdfasdf sam comment on andoni post', post_id=2, user_id=5)

    db.session.add(ian)
    db.session.add(pollow)
    db.session.add(scar)
    db.session.add(andoni)
    db.session.add(sam)
    db.session.add(matt)
    db.session.add(andoni_third_post)
    db.session.add(andoni_post)
    db.session.add(scar_second_post)
    db.session.add(pollow_post)
    db.session.add(matt_second_post)
    db.session.add(sam_post)
    db.session.add(andoni_second_post)
    db.session.add(matt_post)
    db.session.add(scar_post)
    db.session.add(scar_third_post)
    db.session.add(matt_comment)
    db.session.add(andoni_follow)
    db.session.add(andoni_second_follow)
    db.session.add(andoni_third_follow)
    db.session.add(matt_like)
    db.session.add(andoni_comment)
    db.session.add(matt_follow)
    db.session.add(scar_follow)
    db.session.add(testing_comment)
    db.session.add(another_comment)
    db.session.add(sam_comment)
    db.session.add(braydon_commment)
    db.session.add(braydon_second_comment)
    db.session.add(sam_second_commment)

    db.session.commit()
