"""
Routes and views for the flask application.
"""

from datetime import datetime
from flask import render_template
from backend_stack_bubbling import app
import pyrebase
import json

#Firebase configuration, copied from firebase account
firebaseConfig = {    
    "apiKey": "AIzaSyDXYlDeiaSsuw0rfvk1xzU4cmRZG4G7xAI",
    "authDomain": "soen341-c5e5c.firebaseapp.com",
    "databaseURL": "https://soen341-c5e5c-default-rtdb.firebaseio.com",
    "projectId": "soen341-c5e5c",
    "storageBucket": "soen341-c5e5c.appspot.com",
    "messagingSenderId": "955718022518",
    "appId": "1:955718022518:web:83feded9797ea63cb77657",
    "measurementId": "G-D5JTWZSW6E"
    }

# Initialization using config
firebase = pyrebase.initialize_app(firebaseConfig)

# Database
db = firebase.database()

# Authentication, shows the users and permissions of firebase, we are not likely to use it
auth =  firebase.auth()

# Storage, can store files, such as .txt .jpg .png, we are not likely to use it, 
# Unless we want profile picture
storage = firebase.storage()

# render_template is a method to re-use html code as html template, backend don't need this
# just for the sake for readability

# Auto generated webpages, ignore that
@app.route('/')
@app.route('/home')
def home():
    """Renders the home page."""
    return render_template(
        'index.html',
        title='Home Page',
        year=datetime.now().year,
    )

# Auto generated webpages, ignore that
@app.route('/contact')
def contact():
    """Renders the contact page."""
    return render_template(
        'contact.html',
        title='Contact',
        year=datetime.now().year,
        message='Your contact page.'
    )

# Auto generated webpages, ignore that
@app.route('/about')
def about():
    """Renders the about page."""
    return render_template(
        'about.html',
        title='About',
        year=datetime.now().year,
        message='Your application description page.'
    )

# Read and display the firebase database root
@app.route('/firebase/read')
def firebaseRead():
    return render_template(
        "display_json_template.html",
        jsonValue = json.dumps(db.get().val()))

# Push (Append) an item (Bot User) to a child 
@app.route('/firebase/push')
def firebasePush():
    user = {'name':'Bot User', 'password':'Bot Password'}
    db.child('Users').push(user)
    return render_template(
        "display_json_template.html",
        jsonValue=json.dumps(user))

# Set an item (SquaredPants) of a child
@app.route("/firebase/set")
def firebaseSet():
    user = {"name":"Sponge Bob", "password" : "Jellyfish"}
    db.child("Users").child("SquaredPants").set(user)
    return render_template(
        "display_json_template.html",
        jsonValue=json.dumps(user))

# Update an item (SquaredPants) of a child
@app.route("/firebase/update")
def firebaseUpdate():
    nameUpdate = {"name":"Patrick"}
    db.child("Users").child("SquaredPants").update(nameUpdate)
    return render_template(
        "display_json_template.html",
        jsonValue=json.dumps(nameUpdate))

# Remove a child (Users)
@app.route("/firebase/remove")
def firebaseRemove():
    db.child("Users").remove()
    return render_template(
        "display_json_template.html",
        jsonValue="Users removed")

