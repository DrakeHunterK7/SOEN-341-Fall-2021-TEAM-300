"""
Routes and views for the flask application.
"""

from datetime import datetime
from flask import render_template
from backend_stack_bubbling import app
import pyrebase
import json
import pymongo
from pymongo import MongoClient
import re
from bson import json_util

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
    return render_template(
        "display_json_template.html",
        jsonValue="Hello")

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


cluster = MongoClient("mongodb+srv://new_user_0:new_user_0@cluster0.co9ge.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
db = cluster["sample_db"]
collection = db["sample_collection"]

# Query all document that name match regex (contain letter o)
@app.route("/mongodb/query")
def mongoDBQuery():
    query = {
        "name":{
        "$regex" : "o",
        "$options" : "i"
        }
    }
    return render_template(
        "display_json_template.html",
        jsonValue=json.loads(json_util.dumps(list(collection.find(query)))))

# Insert one document
@app.route("/mongodb/insert")
def mongoDBInsert():
    post = {"name":"JoJo", "score":5}
    collection.insert_one(post)
    return render_template(
        "display_json_template.html",
        jsonValue=json.loads(json_util.dumps(post)))


# Insert many document
@app.route("/mongodb/insertMany")
def mongoDBInsertMany():
    post_1 = {"name":"Dio", "score":500}
    post_2 = {"name":"Dio version 2", "score":1000}
    collection.insert_many([post_2,post_1])
    return render_template(
        "display_json_template.html",
        jsonValue="Insert many Dio")


# Delete all document that name match regex (contain letter o)
@app.route("/mongodb/delete")
def mongoDBDelete():
    query = {
        "name":{
        "$regex" : "D",
        "$options" : "i"
        }
    }
    collection.delete_many(query)
    return render_template(
        "display_json_template.html",
        jsonValue=json.dumps(query))

# Find document with score of 5 and update it to 10
@app.route("/mongodb/update")
def mongoDBUpdate():
    collection.update_one(
        {"score":5}, 
        {"$set" : {"score" : "20"}})
    return render_template(
        "display_json_template.html",
        jsonValue="JoJo Updated and stronger")

# app.route is for front end people to worry
# we only need to return to them json
# app.route is there only for the sake of testing

