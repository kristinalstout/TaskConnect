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
    task_id = db.Column(db.Integer, db.ForeignKey('collaborativetasks.id'))
    note_id = db.Column(db.Integer, db.ForeignKey('collaborativenotes.id'))
    

    serialize_rules = ("-groups.user", "-collaborativetasks.user", "-collaborativenotes.user")

    @validates('name')
    def validate_name(self,key,name):
        if not name and not 1 <= name <= 20:
            raise ValueError
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
    users = db.relationship("User", secondary="user_table")
    task_id = db.relationship("CollaborativeTask", backref="group")
    note_id = db.relationship("CollaborativeNote", backref="group")


    serialize_rules = ("-users.group", "-collaborativetasks.group", "-collaborativenotes.group")



class CollaborativeTask(db.Model, SerializerMixin):
    __tablename__ = 'collaborativetasks'


    id = db.Column(db.Integer, primary_key=True)
    group_id = db.Column(db.Integer, db.ForeignKey('groups.id'))
    task = db.Column(db.Text, nullable=False)
    status = db.Column(db.Boolean, default=False)


    serialize_rules = ("-group.collaborativetasks", "-task.collaborativetasks")

    @validates('task')
    def validate_task(self,key,task):
        if not task and task is not 1 <= task <= 500:
            raise ValueError
        return task

class IndividualTask(db.Model, SerializerMixin):
    __tablename__ = 'individualtasks'


    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    task = db.Column(db.Text, nullable=False)
    status = db.Column(db.Boolean, default=False)


    serialize_rules = ("-user.individualtasks", )

    @validates('task')
    def validate_task(self,key,task):
        if not task and task is not 1 <= task <= 500:
            raise ValueError
        return task


class CollaborativeNote(db.Model, SerializerMixin):
    __tablename__ = 'collaborativenotes'


    id = db.Column(db.Integer, primary_key=True)
    note = db.Column(db.Text, nullable=False)
    group_id = db.Column(db.Integer, db.ForeignKey('groups.id'))


    serialize_rules = ("-group.collaborativenotes",)


    @validates('note')
    def validate_note(self,key,note):
        if not note and not 1 <= note <= 500:
            raise ValueError
        return note


class IndividualNote(db.Model, SerializerMixin):
    __tablename__ = 'individualnotes'


    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))


    serialize_rules = ("-user.individualnotes",)

    @validates('note')
    def validate_note(self,key,note):
        if not note and not 1 <= note <= 500:
            raise ValueError
        return note
