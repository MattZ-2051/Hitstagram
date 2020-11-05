from dotenv import load_dotenv
from starter_app import app, db
from starter_app.models import User

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

    db.session.add(ian)
    db.session.add(pollow)
    db.session.add(scar)
    db.session.add(andoni)
    db.session.add(sam)
    db.session.add(matt)

    db.session.commit()
