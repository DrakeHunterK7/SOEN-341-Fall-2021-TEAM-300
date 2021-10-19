from flask import Flask, request, make_response, jsonify
from flask_restful import Api, Resource, reqparse
from pymongo import MongoClient
from datetime import timedelta
from flask_cors import CORS
import datetime
import uuid
import os

from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager

app = Flask(__name__)

# CORS
CORS(app)

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

PostQuestionInfo = reqparse.RequestParser()
PostQuestionInfo.add_argument('title', help='question title cannot be empty', required=True, type=str)
PostQuestionInfo.add_argument('body', help='question body cannot be empty', required=True, type=str)

DB = client["Stack-Bubbling"]
UserCollection = DB["Users"]
QuestionCollection = DB["Questions"]

class Register(Resource):
    @staticmethod
    def post():
        data = RegisterInfo.parse_args()
        res = UserCollection.find_one({
            "email": data.email
        })
        if data.confirmPassword != data.password:
            return make_response(jsonify({"message": "please check your password is same as the confirm password"}), 201)
        if res is not None:
            return make_response(jsonify({"message": "you have to use valid email and password to register"}), 401)
        else:
            UserCollection.insert_one({
                "_id": uuid.uuid1(),
                "username": data.username,
                "email": data.email,
                "password": data.password,
                "createdAt": datetime.datetime.today()
            })
            return make_response(jsonify({"message": "register successful, please login"}), 200)
          
class Login(Resource):
    @staticmethod
    def post():
        data = LoginInfo.parse_args()
        # validation of email and pass
        res = UserCollection.find_one({
            "email": data.email,
            "password": data.password
        })
        print(res)
        # if user_info_email is existing in the database
        if res is not None:
            print(res)
            # create token
            access_token = create_access_token(identity={"email": data.email})
            return make_response(jsonify(access_token=access_token), 201)
        else:
            return make_response(jsonify({
                "message": "the email or password is invalid"
            }), 203)

        # things to do after
        # sorting the token at the frontend
        # for logout function, the frontend will do some operation remove token in the frontend
        # write the @jwt_required() before the post and get


class Logout(Resource):
    def post(self):
        return {""}


class PostQuestion(Resource):
    # This decorator is needed when we need to check the identity of the user
    # When using this decorator, the request must have a header["Authorization"] with value "Bearer [jwt_token]"
    @jwt_required()
    def post(self):
        # Parse the Json received in request to [info]
        info = PostQuestionInfo.parse_args()
        # get_jwt_identity() will get the [email] from token sent through header["Authorization"] of the request
        identity = get_jwt_identity()
        currentUser = None
        # Get the current user using his [email]
        currentUser = UserCollection.find_one({"email": identity["email"]})
        if currentUser is None:
            return make_response(jsonify({"message": "Unable to perform operation, User identity invalid"}), 401)
        newQuestion = {
        "_id" : uuid.uuid1(),
        "user_id": currentUser["user_id"],
        "title": info["title"],
        "body": info["body"],
        "createdAt": datetime.datetime.today(),
        "vote_count": 0,
        "answers": []
        }
        QuestionCollection.insert_one(newQuestion)
        return make_response(jsonify({"message": "Question was posted successfully"}), 201)
    # Things to do
    # Handle the response info in the front end
    # Design & Implement a refresh token

api.add_resource(Logout, '/logout')
api.add_resource(Register, '/register')
api.add_resource(Login, '/login')
api.add_resource(PostQuestion, '/postquestion')

if __name__ == "__main__":
    app.debug = True
    app.run(host='localhost', port=5000)
