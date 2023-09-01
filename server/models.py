from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin


metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})


db = SQLAlchemy(metadata=metadata)


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'


    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String) 
    group_id = db.Column(db.Integer, db.ForeignKey('groups.id'))
    task_id = db.Column(db.Integer, db.ForeignKey('tasks.id'))
    note_id = db.Column(db.Integer, db.ForeignKey('notes.id'))

    user_tasks = db.relationship("Task", backref="user")
    user_notes = db.relationship("Note", backref="user")


    serialize_rules = ("-groups.user", "-tasks.user", "-notes.user")

    @validates('name')
    def validate_name(self,key,name):
        if not name and not 1 <= name <= 20:
            raise ValueError
        return name


class Group(db.Model, SerializerMixin):
    __tablename__ = 'groups'


    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

  
    group_users = db.relationship("User", backref="group")


    serialize_rules = ("-users.group",)


class Task(db.Model, SerializerMixin):
    __tablename__ = 'tasks'


    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    task = db.Column(db.Text, nullable=False)
    status = db.Column(db.Boolean, default=False)

    task_users = db.relationship("User", backref="task")


    serialize_rules = ("-user.tasks", )
    
    @validates('task')
    def validate_task(self, key, task):
        if not (1 <= task <= 500):
            raise ValueError("Task value must be between 1 and 500")
        return task

class Note(db.Model, SerializerMixin):
    __tablename__ = 'notes'


    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    note_users = db.relationship("User", backref="note")


    serialize_rules = ("-user.notes",)

    @validates('note')
    def validate_note(self,key,note):
        if not note and not 1 <= note <= 500:
            raise ValueError
        return note