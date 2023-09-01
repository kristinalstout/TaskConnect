from random import randint, choice as rc
from app import app
from models import db, User


def create_users():
    users = [
        User(
            name="Amir",
            email="amir@example.com",
            password="password123",
        ),
        User(
            name="Kristina",
            email="kristina@example.com",
            password="password456",
        ),
        User(
            name="Matthew",
            email="matthew@example.com",
            password="password789",
        )
    ]

    return users

if __name__ == '__main__':
    with app.app_context():
        print("Clearing db...")
        User.query.delete()

        print("Seeding users...")
        users = create_users()
        db.session.add_all(users)
        db.session.commit()
        print("Done seeding!")
