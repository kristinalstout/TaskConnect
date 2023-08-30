from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Table, Column, ForeignKey, Integer, String, Text, MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

user_table = Table(
    "user_table",
    db.metadata,
    Column("user_id", ForeignKey("users.id")),
    Column("user_name", ForeignKey("users.name")),
)

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    groups = db.relationship("Group", secondary=user_table)
    collaborative_tasks = db.relationship("CollaborativeTask", backref="user")
    collaborative_notes = db.relationship("CollaborativeNote", backref="user")
    individual_tasks = db.relationship("IndividualTask", backref="user")
    individual_notes = db.relationship("IndividualNote", backref="user")

    serialize_rules = ("-groups.users", "-collaborative_tasks.user", "-collaborative_notes.user")

    @validates('name')
    def validate_name(self, key, name):
        if not name or not 1 <= len(name) <= 20:
            raise ValueError("Invalid name")
        return name

class Group(db.Model, SerializerMixin):
    __tablename__ = 'groups'

    id = db.Column(db.Integer, primary_key=True)
    collaborative_tasks = db.relationship("CollaborativeTask", backref="group")
    collaborative_notes = db.relationship("CollaborativeNote", backref="group")
    users = db.relationship("User", secondary=user_table)

    serialize_rules = ("-users.groups", "-collaborative_tasks.group", "-collaborative_notes.group")

class CollaborativeTask(db.Model, SerializerMixin):
    __tablename__ = 'collaborativetasks'

    id = db.Column(db.Integer, primary_key=True)
    group_id = db.Column(db.Integer, db.ForeignKey('groups.id'))
    task = db.Column(db.Text, nullable=False)

    serialize_rules = ("-group.collaborative_tasks",)

    @validates('task')
    def validate_task(self, key, task):
        if not task or not 1 <= len(task) <= 500:
            raise ValueError("Invalid task")
        return task

class IndividualTask(db.Model, SerializerMixin):
    __tablename__ = 'individualtasks'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    task = db.Column(db.Text, nullable=False)

    serialize_rules = ("-user.individual_tasks",)

    @validates('task')
    def validate_task(self, key, task):
        if not task or not 1 <= len(task) <= 500:
            raise ValueError("Invalid task")
        return task

class CollaborativeNote(db.Model, SerializerMixin):
    __tablename__ = 'collaborativenotes'

    id = db.Column(db.Integer, primary_key=True)
    note = db.Column(db.Text, nullable=False)
    group_id = db.Column(db.Integer, db.ForeignKey('groups.id'))

    serialize_rules = ("-group.collaborative_notes",)

    @validates('note')
    def validate_note(self, key, note):
        if not note or not 1 <= len(note) <= 500:
            raise ValueError("Invalid note")
        return note

class IndividualNote(db.Model, SerializerMixin):
    __tablename__ = 'individualnotes'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    serialize_rules = ("-user.individual_notes",)

    @validates('content')
    def validate_content(self, key, content):
        if not content or not 1 <= len(content) <= 500:
            raise ValueError("Invalid content")
        return content
