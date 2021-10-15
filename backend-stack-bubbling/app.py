from flask import Flask, request, make_response, jsonify
from flask_restful import Api, Resource, reqparse
from pymongo import MongoClient
from datetime import timedelta
import datetime
import uuid
import os

from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager

app = Flask(__name__)

# JWT
#app.config["JWT_SECRET_KEY"] = os.environ.get("JWT_SECRET")
app.config["JWT_SECRET_KEY"] = "SuperSecuredSecretKey"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
# app.config["JWT_REFRESH_TOKEN_EXPIRES"] = datetime.datetime.utcnow() + datetime.timedelta(days=24)
jwt = JWTManager(app)
# RestFul
api = Api(app)



# connect with DB
connectionString = "mongodb+srv://SOEN341T300:Soen_341_T_300@cluster0.qvzq2.mongodb.net/test?retryWrites=true&w=majority&ssl=true&ssl_cert_reqs=CERT_NONE"
client = MongoClient(connectionString)
RegisterInfo = reqparse.RequestParser()
RegisterInfo.add_argument('username', help='Username cannot be blank', required=True)
RegisterInfo.add_argument('email', help='emailAddress cannot be blank', required=True)
RegisterInfo.add_argument('password', help='Password cannot be blank', required=True)
LoginInfo = reqparse.RequestParser()
LoginInfo.add_argument('email', help='emailAddress cannot be blank', required=True)
LoginInfo.add_argument('password', help='Password cannot be blank', required=True)

DB = client["Stack-Bubbling"]
UserCollection = DB["Users"]


class Register(Resource):
    def post(self):
        data = RegisterInfo.parse_args()
        res = UserCollection.find_one({
            "email": data.email
        })
        if res is not None:
            return make_response(jsonify({"message": "you have to use valid email and password to resigter"}), 401)
        else:
            UserCollection.insert_one({
                "_id": uuid.uuid1(),
                "username": data.username,
                "email": data.email,
                "password": data.password,
                "createdAt": datetime.datetime.today()
            })
            return make_response(jsonify({"message": "register successful, please login"}), 201)

class Login(Resource):
    def post(self):
        data = LoginInfo.parse_args()
        # validation of email and pass
        res = UserCollection.find_one({
            "email": data.email,
            "password": data.password
        })
        # if user_info_email is existing in the database
        if res is not None:
            # create token
            access_token = create_access_token(identity={"email": data.email})
            return make_response(jsonify(access_token=access_token), 201)
        else:
            return make_response(jsonify({
                "message": "the email or password is invalid"
            }), 401)

        # things to do after
        # sorting the token at the frontend
        # for logout function, the frontend will do some operation remove token in the frontend
        # write the @jwt_required() before the post and get




api.add_resource(Register, '/register')
api.add_resource(Login, '/login')


if __name__ == "__main__":
    app.debug = True
    app.run(host='localhost', port=5000)