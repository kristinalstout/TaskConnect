from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)

    user_tasks = db.relationship("Task", backref="user", overlaps="user,user_tasks")
    user_notes = db.relationship("Note", backref="user", overlaps="user,user_notes")

    serialize_rules = ("-groups.user", "-tasks.user", "-notes.user")

    @validates('name')
    def validate_name(self, key, name):
        if not name or not (1 <= len(name) <= 20):
            raise ValueError("Name must be between 1 and 20 characters")
        return name

user_table = db.Table(
    "user_table",
    db.Base.metadata,
    db.Column("user_id", db.ForeignKey("users.id")),
    db.Column("user_name", db.ForeignKey("users.name")),
)

class Group(db.Model, SerializerMixin):
    __tablename__ = 'groups'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)


    serialize_rules = ("-users.group", "-tasks.group", "-notes.group")

class Task(db.Model, SerializerMixin):
    __tablename__ = 'tasks'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    task = db.Column(db.Text, nullable=False)
    status = db.Column(db.Boolean, default=False)


    serialize_rules = ("-user.tasks", )

    @validates('task')
    def validate_task(self,key,task):
        if not task and task is not 1 <= task <= 500:
            raise ValueError
        return task

class Note(db.Model, SerializerMixin):
    __tablename__ = 'notes'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))


    serialize_rules = ("-user.notes",)

    @validates('note')
    def validate_note(self,key,note):
        if not note and not 1 <= note <= 500:
            raise ValueError
        return note
