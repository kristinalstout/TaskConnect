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

class Group(db.Model, SerializerMixin):
    __tablename__ = 'groups'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    group_users = db.relationship("User", backref="group", overlaps="user,user_groups")

    serialize_rules = ("-users.group",)

class Task(db.Model, SerializerMixin):
    __tablename__ = 'tasks'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    task = db.Column(db.Text, nullable=False)
    status = db.Column(db.Boolean, default=False)

    task_users = db.relationship("User", backref="task", overlaps="user,user_tasks")

    serialize_rules = ("-user.tasks",)

    @validates('task')
    def validate_task(self, key, task):
        if not (1 <= len(task) <= 500):
            raise ValueError("Task value must be between 1 and 500 characters")
        return task

class Note(db.Model, SerializerMixin):
    __tablename__ = 'notes'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    note_users = db.relationship("User", backref="note", overlaps="user,user_notes")

    serialize_rules = ("-user.notes",)

    @validates('content')
    def validate_content(self, key, content):
        if not (1 <= len(content) <= 500):
            raise ValueError("Content value must be between 1 and 500 characters")
        return content
