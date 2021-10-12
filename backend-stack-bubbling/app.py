from flask import Flask, request, make_response
from flask_restful import Api, Resource, reqparse
from pymongo import MongoClient
import datetime
import uuid
import os

from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager

app = Flask(__name__)

# RestFul
api = Api(app)

# JWT
app.config["JWT_SECRET_KEY"] = os.environ.get("JWT_SECRET")
jwt = JWTManager(app)


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
    def get(self):
        return{"msg": "this is register page"}


loginData = reqparse.RequestParser()
loginData.add_argument('email_address', help='emailAddress cannot be blank', required=True)
loginData.add_argument('password', help='Password cannot be blank', required=True)

class Login(Resource):
    def get(self):
        return{"msg": "user logined"}
    def post(self):
        data = loginData.parse_args()
        db.find_one()
        return data


api.add_resource(Register, '/register')
api.add_resource(Login, '/login')


if __name__ == "__main__":
    app.debug = True
    app.run(host='localhost', port=5000)