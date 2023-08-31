from flask import Flask, request
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_sqlalchemy import SQLAlchemy
from models import db, Group, User, CollaborativeTask, IndividualTask, CollaborativeNote, IndividualNote 
from flask import Flask, request, make_response
import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get(
    "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)
api = Api(app)
db.init_app(app)


@app.route('/')
def home():
    return '<Welcome to TaskConnect Server!</h1>'


class Groups(Resource):

    def get(self):
        groups = Group.query.all()
        group_list = [group.to_dict() for group in groups]
        return make_response(group_list, 200)
        
    
    def post(self):
        new_group = Group()
        data = request.get_json()
        try:
            for key in data:
                setattr(new_group, key, data[key])
            db.session.add(new_group)
            db.session.commit()
            return make_response(new_group.to_dict(rules=('-users',)), 201) 
        except ValueError as error:
            new_error = {"error": str(error)}
            return make_response(new_error, 400)


    def post(self):
        data = request.get_json()
        new_group = Group(user_id=data['user_id'], group=data['group'])
        db.session.add(new_group)
        db.session.commit()
        return make_response({'message': 'Group created successfully', 'id': new_group.id}, 201)

class GroupById(Resource):

    def get(self, id):
        group = GroupById.query.filter(Groups.id==id).first()
        if not group: 
            return make_response({'group not found'}, 404)
        return make_response(group.to_dict(), 200)
    
    def patch(self,id):
        data = request.get_json()
        group = GroupById.query.filter(Groups.id==id).first()
        if not group:
            return make_response({"error: note not found"}, 404)
        
        try:
            for key in data:
                setattr(group, key, data[key])            
            db.session.add(group)
            db.session.commit()

            return make_response(group.to_dict(rules=("-users",)), 202)
        except ValueError as error:
            new_error = {"error": str(error)}
            return make_response(new_error, 400)
        

    def delete(self, id):
        group = GroupById.query.filter(Groups.id==id).first()
        db.session.delete(group)
        db.session.commit()
        return make_response({}, 204)
    
class Users(Resource):
    def get(self):
       
        users = [user.to_dict(rules=('-groups.user', '-collaborativetasks.user', '-collaborativenotes.user',)) for user in User.query.all()]
        return make_response(users, 200)

    def post(self):
        data = request.get_json()
        new_user = User(name=data['name'])
        db.session.add(new_user)
        db.session.commit()
        return make_response({'message': 'User created successfully', 'id': new_user.id}, 201)

class UserById(Resource):

    def get(self, id):
        user = UserById.query.filter(Users.id==id).first()
        if not user: 
            return make_response({'note not found'}, 404)
        return make_response(user.to_dict(), 200)
    
    def patch(self,id):
        data = request.get_json()
        user = UserById.query.filter(Users.id==id).first()
        if not user:
            return make_response({"error: note not found"}, 404)
        
        try:
            for key in data:
                setattr(user, key, data[key])            
            db.session.add(user)
            db.session.commit()

            return make_response(user.to_dict(rules=("-users",)), 202)
        except ValueError as error:
            new_error = {"error": str(error)}
            return make_response(new_error, 400)
        

    def delete(self, id):
        user = UserById.query.filter(Users.id==id).first()
        db.session.delete(user)
        db.session.commit()
        return make_response({}, 204)


class CollaborativeTasks(Resource):
    def get(self):
        tasks = CollaborativeTask.query.all()
        task_list = [task.to_dict(rules=('-group.collaborativetasks', '-task.collaborativetasks',)) for task in tasks]
        return make_response(task_list, 200)

    def post(self):
        new_task = CollaborativeTask()
        db.session.add(new_task)
        db.session.commit()
        return make_response({'message': 'Collaborative task created successfully', 'id': new_task.id}, 201)


class CollaborativeTaskById(Resource):

    def get(self, id):
        task = CollaborativeTaskById.query.filter(CollaborativeTasks.id==id).first()
        if not task: 
            return make_response({'note not found'}, 404)
        return make_response(task.to_dict(), 200)
    
    def patch(self,id):
        data = request.get_json()
        task= CollaborativeTaskById.query.filter(CollaborativeTasks.id==id).first()
        if not task:
            return make_response({"error: note not found"}, 404)
        
        try:
            for key in data:
                setattr(task, key, data[key])            
            db.session.add(task)
            db.session.commit()

            return make_response(task.to_dict(rules=("-users",)), 202)
        except ValueError as error:
            new_error = {"error": str(error)}
            return make_response(new_error, 400)
        

    def delete(self, id):
        note = CollaborativeTaskById.query.filter(CollaborativeTasks.id==id).first()
        db.session.delete(note)
        db.session.commit()
        return make_response({}, 204)

class CollaborativeNotes(Resource):
    def get(self):
        notes = CollaborativeNote.query.all()
        note_list = [note.to_dict(rules=('-group.collaborativenotes',)) for note in notes]
        return make_response(note_list, 200)

    def post(self):
        data = request.get_json()
        new_note = CollaborativeNote(note=data['note'])
        db.session.add(new_note)
        db.session.commit()
        return make_response({'message': 'Collaborative note created successfully', 'id': new_note.id}, 201)

class CollaborativeNoteById(Resource):
    
    def get(self, id):
        note =  CollaborativeNoteById.query.filter( CollaborativeNote.id==id).first()
        if not note: 
            return make_response({'note not found'}, 404)
        return make_response(note.to_dict(), 200)
    
    def patch(self,id):
        data = request.get_json()
        note = CollaborativeNoteById.query.filter(CollaborativeNote.id==id).first()
        if not note:
            return make_response({"error: note not found"}, 404)
        
        try:
            for key in data:
                setattr(note, key, data[key])            
            db.session.add(note)
            db.session.commit()

            return make_response(note.to_dict(rules=("-users",)), 202)
        except ValueError as error:f
        new_error = {"error": str(error)}
        return make_response(new_error, 400)
        
    def delete(self, id):
        note = CollaborativeNoteById.query.filter( CollaborativeNotes.id==id).first()
        db.session.delete(note)
        db.session.commit()
        return make_response({}, 204)

class IndividualTasks(Resource):
    def get(self):
        tasks = IndividualTask.query.all()
        task_list = [task.to_dict(rules=('-user.individualtasks',)) for task in tasks]
        return make_response(task_list, 200)

    def post(self):
        data = request.get_json()
        new_task = IndividualTask(user_id=data['user_id'], task=data['task'])
        db.session.add(new_task)
        db.session.commit()
        return make_response({'message': 'Individual task created successfully', 'id': new_task.id}, 201)


class IndividualTaskById(Resource):

    def get(self, id):
        task = IndividualTask.filter(IndividualNote.id==id).first()
        if not task:
            return make_response({'task not found'}, 404)
        return make_response(task.to_dict(), 200)

    def patch(self, id):
        
        data = request.get_json()
        task = IndividualTaskById.query.filter(IndividualTasks.id==id).first()
        if not task:
            return make_response({"error: note not found"}, 404)
        
        try:
            for key in data:
                setattr(task, key, data[key])            
            db.session.add(task)
            db.session.commit()

            return make_response(task.to_dict(rules=("-users",)), 202)
        except ValueError as error:
            new_error = {"error": str(error)}
            return make_response(new_error, 400)
    

    def delete(self, id):
        task = IndividualTask.query.filter(IndividualTask.id==id).first()
        db.session.delete(task)
        db.session.commit()
        return make_response({'message': 'Individual task deleted successfully'}, 200)

class IndividualNotes(Resource):
    def get(self):
        notes = IndividualNote.query.all()
        note_list = [note.to_dict(rules=('-user.individualnotes',)) for note in notes]
        return make_response(note_list, 200)

    def post(self):
        data = request.get_json()
        new_note = IndividualNote(user_id=data['user_id'], note=data['note'])
        db.session.add(new_note)
        db.session.commit()
        return make_response({'message': 'Individual note created successfully', 'id': new_note.id}, 201)


class IndividualNoteById(Resource):

    def get(self, id):
        note = IndividualNoteById.query.filter(IndividualNote.id==id).first()
        if not note: 
            return make_response({'note not found'}, 404)
        return make_response(note.to_dict(), 200)
    
    def patch(self,id):
        data = request.get_json()
        note = IndividualNoteById.query.filter(IndividualNote.id==id).first()
        if not note:
            return make_response({"error: note not found"}, 404)
        
        try:
            for key in data:
                setattr(note, key, data[key])            
            db.session.add(note)
            db.session.commit()

            return make_response(note.to_dict(rules=("-users",)), 202)
        except ValueError as error:
            new_error = {"error": str(error)}
            return make_response(new_error, 400)
        

    def delete(self, id):
        note = IndividualNoteById.query.filter(IndividualNotes.id==id).first()
        db.session.delete(note)
        db.session.commit()
        return make_response({}, 204)

api.add_resource(Users, '/users')
api.add_resource(UserById, '/users/<int:user_id>')
api.add_resource(Groups, '/groups')
api.add_resource(GroupById, '/groups/<int:group_id>')
api.add_resource(CollaborativeTasks, '/collaborativetasks')
api.add_resource(CollaborativeTaskById, '/collaborativetasks/<int:task_id>')
api.add_resource(CollaborativeNotes, '/collaborativenotes')
api.add_resource(CollaborativeNoteById, '/collaborativenotes/<int:note_id>')
api.add_resource(IndividualTasks, '/individualtasks')
api.add_resource(IndividualTaskById, '/individualtasks/<int:task_id>')
api.add_resource(IndividualNotes, '/individualnotes')
api.add_resource(IndividualNoteById, '/individualnotes/<int:id>')

if __name__ == '__main__':
    app.run(debug=True)