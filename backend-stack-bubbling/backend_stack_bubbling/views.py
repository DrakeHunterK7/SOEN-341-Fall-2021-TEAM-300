"""
Routes and views for the flask application.
"""

from datetime import datetime
from flask import render_template
from backend_stack_bubbling import app
import pyrebase
import json

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

firebase = pyrebase.initialize_app(firebaseConfig)
db = firebase.database()
auth =  firebase.auth()
storage = firebase.storage()

print(db)
people = db.child("People").get()
print(people.val())
print(json.dumps(db.get().val(),indent = 4))

@app.route('/')
@app.route('/home')
def home():
    """Renders the home page."""
    return render_template(
        'index.html',
        title='Home Page',
        year=datetime.now().year,
    )

@app.route('/contact')
def contact():
    """Renders the contact page."""
    return render_template(
        'contact.html',
        title='Contact',
        year=datetime.now().year,
        message='Your contact page.'
    )

@app.route('/about')
def about():
    """Renders the about page."""
    return render_template(
        'about.html',
        title='About',
        year=datetime.now().year,
        message='Your application description page.'
    )

@app.route('/firebase/read')
def firebaseRead():
    return render_template(
        "display_json_template.html",
        jsonValue = json.dumps(db.get().val()))

@app.route('/firebase/push')
def firebasePush():
    user = {'name':'Bot User', 'password':'Bot Password'}
    db.child('Users').push(user)
    return render_template(
        "display_json_template.html",
        jsonValue=json.dumps(user))

@app.route("/firebase/set")
def firebaseSet():
    user = {"name":"Sponge Bob", "password" : "Jellyfish"}
    db.child("Users").child("SquaredPants").set(user)
    return render_template(
        "display_json_template.html",
        jsonValue=json.dumps(user))

@app.route("/firebase/update")
def firebaseUpdate():
    nameUpdate = {"name":"Patrick"}
    db.child("Users").child("SquaredPants").update(nameUpdate)
    return render_template(
        "display_json_template.html",
        jsonValue=json.dumps(nameUpdate))

@app.route("/firebase/remove")
def firebaseRemove():
    db.child("Users").remove()
    return render_template(
        "display_json_template.html",
        jsonValue="Users removed")

