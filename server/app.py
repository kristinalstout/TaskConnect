from flask import Flask, request, make_response
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import Session
from models import db, Group, User, Task, Note
import os
from flask_cors import cross_origin

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get("DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)
api = Api(app)
db.init_app(app)

# app.use(CORS({
#   origin: ['http://localhost:3000', 'http://localhost:5000']
# }))

# CORS(app, resources={r"/api/*": {"origins": "*"}})

# @cross_origin(origin="*")
@app.route('/')
def home():
    return '<Welcome to TaskConnect Server!</h1>'

@app.route('/login', methods=['POST'])
def login():
    """
    Sign in a user.
    """
    data = request.get_json()

    try:
        user = User.query.filter_by(email=data['email']).first()
        if user and user.check_password(data['password']):
            session = Session(user_id=user.id)
            db.session.add(session)
            db.session.commit()

            response = {
                'id': session.id,
                'username': user.name,  # Use the 'name' attribute instead of 'username'
            }
            return make_response(response, 200)
    except:
        response = {'error': 'Invalid email or password.'}
        return make_response(response, 401)

    
#     CORS(app, resources={
#     r'/login': {'origins': '*'},
#     r'/logout': {'origins': '*'},
# })


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
            return make_response(new_group.to_dict(rules=("-notes","-tasks",)), 201) 
        except ValueError as error:
            new_error = {"error": str(error)}
        return make_response(new_error, 400)

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
        users = User.query.all()
        user_list = [user.to_dict(rules=('-groups.user', '-tasks.user', '-notes.user',)) for user in users]
        return make_response(user_list, 200)

    def post(self):
        new_user = User()
        data = request.get_json()

        try:
            for key in data:
                setattr(new_user, key, data[key])
            db.session.add(new_user)
            db.session.commit()
            return make_response(new_user.to_dict(rules=('-posts',)), 201) 
        except ValueError as error:
            new_error = {"error": str(error)}
        return make_response(new_error, 400)

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
            return make_response({"error: user not found"}, 404)
        
        try:
            for key in data:
                setattr(user, key, data[key])            
            db.session.add(user)
            db.session.commit()

            return make_response(user.to_dict(rules=("-notes","-tasks",)), 202)
        except ValueError as error:
            new_error = {"error": str(error)}
            return make_response(new_error, 400)
        

    def delete(self, id):
        user = UserById.query.filter(Users.id==id).first()
        db.session.delete(user)
        db.session.commit()
        return make_response({}, 204)


class Tasks(Resource):
    def get(self):
        tasks = Task.query.all()
        task_list = [task.to_dict(rules=()) for task in tasks]
        return make_response(task_list, 200)

    def post(self):
        new_task = Task()
        data = request.get_json()

        try:
            for key in data:
                setattr(new_task, key, data[key])
            db.session.add(new_task)
            db.session.commit()
            return make_response(new_task.to_dict(rules=('-users',)), 201) 
        except ValueError as error:
            new_error = {"error": str(error)}
        return make_response(new_error, 400)


class TaskById(Resource):

    def get(self, id):
        task = TaskById.query.filter(Tasks.id==id).first()
        if not task: 
            return make_response({'note not found'}, 404)
        return make_response(task.to_dict(), 200)
    
    def patch(self,id):
        data = request.get_json()
        task= TaskById.query.filter(Tasks.id==id).first()
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
        note = TaskById.query.filter(Tasks.id==id).first()
        db.session.delete(note)
        db.session.commit()
        return make_response({}, 204)

class Notes(Resource):
    def get(self):
        notes = Note.query.all()
        note_list = [note.to_dict(rules=('-group.notes',)) for note in notes]
        return make_response(note_list, 200)

    def post(self):
        new_note = Note()
        data = request.get_json()

        try:
            for key in data:
                setattr(new_note, key, data[key])
            db.session.add(new_note)
            db.session.commit()
            return make_response(new_note.to_dict(rules=('-users',)), 201) 
        except ValueError as error:
            new_error = {"error": str(error)}
        return make_response(new_error, 400)

class NoteById(Resource):
    
    def get(self, id):
        note =  NoteById.query.filter(Note.id==id).first()
        if not note: 
            return make_response({'note not found'}, 404)
        return make_response(note.to_dict(), 200)
    
    def patch(self,id):
        data = request.get_json()
        note = NoteById.query.filter(Note.id==id).first()
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
        note = NoteById.query.filter( Notes.id==id).first()
        db.session.delete(note)
        db.session.commit()
        return make_response({}, 204)


# Views go here!
api.add_resource(Users, '/users')
api.add_resource(UserById, '/users/<int:id>')
api.add_resource(Groups, '/groups')
api.add_resource(GroupById, '/groups/<int:id>')
api.add_resource(Tasks, '/tasks')
api.add_resource(TaskById, '/tasks/<int:id>')
api.add_resource(Notes, '/notes')
api.add_resource(NoteById, '/notes/<int:id>')

@app.route('/')
def index():
    return '<h1>Phase 4 Project Server</h1>'


if __name__ == '__main__':
    app.run(debug=True)