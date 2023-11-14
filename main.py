from flask import Flask, redirect, render_template, session, request, flash, url_for, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from flask_socketio import SocketIO, emit, join_room,send

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = 'icantbelievethisisencrypted'
socketio = SocketIO(app)
db = SQLAlchemy(app)

# db model
class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80))
    email = db.Column(db.String(120))
    password = db.Column(db.String(50))

    def __init__(self, username, email, password):
        self.username = username
        self.email = email
        self.password = password

# db class for message
class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(200))
    time = db.Column(db.DateTime, default=datetime.utcnow)
    sender = db.Column(db.Integer)
    receiver = db.Column(db.Integer)

    def __init__(self, content, time, sender, receiver):
        self.content = content
        self.time = time
        self.sender = sender
        self.receiver = receiver

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if 'user_id' in session:
        flash('Another user cannot log in. You are already logged in.')
        return redirect(url_for('chat'))

    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        password = request.form['password']

        existing_user = Users.query.filter((Users.username == username) | (Users.email == email)).first()
        if existing_user:
            flash('User already exists. Please log in or choose a different username/email.')
            return render_template('login.html')
        else:
            hashed_password = generate_password_hash(password)
            new_user = Users(username=username, email=email, password=hashed_password)
            db.session.add(new_user)
            db.session.commit()
            flash('User Registered')
            return redirect(url_for('login'))

    return render_template('register.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if 'user_id' in session:
        user = Users.query.get(session['user_id'])
        chat_message = Message.query.all()
        users = Users.query.all()
        return render_template('chattest.html', users=users, username=user.username, chat_message=chat_message)

    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        user = Users.query.filter_by(email=email).first()
        if user and check_password_hash(user.password, password):
            session['user_id'] = user.id
            flash("Login successful.")
            chat_message = Message.query.all()
            users = Users.query.all()
            return render_template('chattest.html', users=users, username=user.username, chat_message=chat_message)
        else:
            flash("Login failed. Please check your email and password.")
            return render_template('login.html')
    return render_template('login.html')

@app.route('/chat', methods=["POST", "GET"])
def chat():
    if 'user_id' in session:
        user_id = session['user_id']
        user = Users.query.get(user_id)
        users = Users.query.filter(Users.id != user_id).all()
        return render_template('chattest.html', users=users, username=user.username)
    else:
        flash("Please log in to access the chat.")
        return redirect(url_for('login'))


# @socketio.on('message')
# def handle_message(data):
#     user_id = session['user_id']
#     selected_user_id = data['selectedUserId']
#     room_name_sender = f"{user_id}"
#     room_name_receiver = f"{selected_user_id}"

#     if 'content' in data:
#         content = data['content']
#         print(f"Received message from {user_id} to {selected_user_id} with content: {content}")
#         message = Message(content=content, sender=user_id, receiver=selected_user_id, time=datetime.now())
#         db.session.add(message)
#         db.session.commit()

#         #emit messages to both the sender and receiver rooms
#         send({"content": content, "sender": user_id}, to=room_name_sender)
#         send({"content": content, "sender": user_id}, to=room_name_receiver)
#         print(f"Sent message to rooms: {room_name_sender} and {room_name_receiver}")

#     else:
#         print("Error: 'content' key not found in message data") 



# Updated 'handle_message' function to handle messages more efficiently
@socketio.on('message')
def handle_message(data):
    user_id = session['user_id']
    selected_user_id = data['selectedUserId']
    room_name_sender = f"user_{user_id}"
    room_name_receiver = f"user_{selected_user_id}"

    if 'content' in data:
        content = data['content']
        print(f"Received message from {user_id} to {selected_user_id} with content: {content}")
        message = Message(content=content, sender=user_id, receiver=selected_user_id, time=datetime.now())
        db.session.add(message)
        db.session.commit()

        # Emit messages to both the sender and receiver rooms
        send({"content": content, "sender": user_id, 'time': message.time.isoformat()}, room=room_name_sender)
        send({"content": content, "sender": user_id, 'time': message.time.isoformat()}, room=room_name_receiver)
        print(f"Sent message to rooms: {room_name_sender} and {room_name_receiver}")

    else:
        print("Error: 'content' key not found in message data")
        

@socketio.on('join')
def handle_join(data):
    user_id = session.get('user_id')
    if user_id is None:
        # Handle the case where 'user_id' is not in the session
        return

    selected_user_id = data['selectedUserId']
    room_name_sender = f"user_{user_id}"
    room_name_receiver = f"user_{selected_user_id}"

    # Join the user to their own room
    join_room(room_name_sender)

    # Retrieve previous messages from the database
    messages = Message.query.filter(
        ((Message.sender == user_id) & (Message.receiver == selected_user_id)) |
        ((Message.sender == selected_user_id) & (Message.receiver == user_id))
    ).order_by(Message.time).all()

    # Emit previous messages to both rooms
    for message in messages:
        send({'content': message.content, 'sender': message.sender, 'time': message.time.isoformat()},
             room=room_name_sender)  # Used 'room' instead of 'to'
        send({'content': message.content, 'sender': message.sender, 'time': message.time.isoformat()},
             room=room_name_receiver)  # Used 'room' instead of 'to'

# @socketio.on('join')
# def handle_join(data):
#     user_id = session.get('user_id')
#     if user_id is None:
#         # Handle the case where 'user_id' is not in the session
#         return

#     selected_user_id = data['selectedUserId']
#     room_name_sender = f"{user_id}"
#     room_name_receiver = f"{selected_user_id}"

#     # Join the user to their own room
#     join_room(room_name_sender)
    
#     # Retrieve previous messages from the database
#     messages = Message.query.filter(
#         ((Message.sender == user_id) & (Message.receiver == selected_user_id)) |
#         ((Message.sender == selected_user_id) & (Message.receiver == user_id))
#     ).order_by(Message.time).all()

#     # Emit previous messages to both rooms
#     for message in messages:
#         send({'content': message.content, 'sender': message.sender, 'time': message.time.isoformat()},
#              to=room_name_sender)
#         send({'content': message.content, 'sender': message.sender, 'time': message.time.isoformat()},
#              to=room_name_receiver)


@app.route('/get_messages/<int:selected_user_id>')
def get_messages(selected_user_id):
    user_id = session.get('user_id')
    if user_id:
        messages = Message.query.filter(
            ((Message.sender == user_id) & (Message.receiver == selected_user_id)) |
            ((Message.sender == selected_user_id) & (Message.receiver == user_id))
        ).order_by(Message.time).all()

        messages_data = [
            {'content': message.content, 'sender': message.sender, 'time': message.time} for message in messages
        ]

        return jsonify(messages_data)
    else:
        return jsonify({'error': 'User not logged in'}), 403


@app.route('/logout')
def logout():
    if 'user_id' in session:
        session.pop('user_id', None)
    return redirect(url_for('login'))

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    socketio.run(app, debug=True)
