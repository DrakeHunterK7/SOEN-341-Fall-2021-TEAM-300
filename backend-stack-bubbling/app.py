from flask import Flask, request, make_response
from flask_restful import Api, Resource, reqparse
from pymongo import MongoClient
import datetime
import uuid

app = Flask(__name__)
api = Api(app)
# app.config['SECRET_KEY'] = "key"

# connect with DB
cluster = "mongodb+srv://SOEN341T300:Soen_341_T_300@cluster0.qvzq2.mongodb.net/test?retryWrites=true&w=majority&ssl=true&ssl_cert_reqs=CERT_NONE"
client = MongoClient(cluster)
parser = reqparse.RequestParser()
parser.add_argument('username', help='Username cannot be blank', required=True)
parser.add_argument('email_address', help='emailAddress cannot be blank', required=True)
parser.add_argument('password', help='Password cannot be blank', required=True)

db = client["Stack-Bubbling"]["Users"]


class Register(Resource):
    def post(self):
        data = parser.parse_args()
        # todo - Check of Email and username
        db.insert_one({
            "user_id": uuid.uuid1(),
            "username": data.username,
            "email_address": data.email_address,
            "password": data.password,
            "createdAt": datetime.datetime.today()
        })
        return {"msg": "please login"}


# api.add_resource(Home.Home, '/')
api.add_resource(Register, '/register')

if __name__ == "__main__":
    app.debug = True
    app.run(host='localhost', port=5000)
