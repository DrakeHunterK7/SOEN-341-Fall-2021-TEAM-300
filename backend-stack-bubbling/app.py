from flask import Flask, request, make_response, jsonify
from flask_restful import Api, Resource, reqparse, inputs
from pymongo import MongoClient
from datetime import timedelta
from flask_cors import CORS
import datetime
import uuid
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager

app = Flask(__name__)

# CORS
CORS(app)

# JWT
app.config["JWT_SECRET_KEY"] = "SuperSecuredSecretKey"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
# app.config["JWT_REFRESH_TOKEN_EXPIRES"] = datetime.datetime.utcnow() + datetime.timedelta(days=24)
jwt = JWTManager(app)
# RestFul
api = Api(app)

# connect with DB
connectionString = "mongodb+srv://SOEN341T300:Soen_341_T_300@cluster0.qvzq2.mongodb.net/test?retryWrites=true&w=majority&ssl=true&ssl_cert_reqs=CERT_NONE"
client = MongoClient(connectionString)

# Register Info
RegisterInfo = reqparse.RequestParser()
RegisterInfo.add_argument('username', help='Username cannot be blank', required=True)
RegisterInfo.add_argument('email', help='emailAddress cannot be blank', required=True)
RegisterInfo.add_argument('password', help='Password cannot be blank', required=True)
RegisterInfo.add_argument('confirmPassword', help='Confirm Password cannot be blank', required=True)

# Login Info
LoginInfo = reqparse.RequestParser()
LoginInfo.add_argument('email', help='emailAddress cannot be blank', required=True)
LoginInfo.add_argument('password', help='Password cannot be blank', required=True)

# Post Question Info
PostQuestionInfo = reqparse.RequestParser()
PostQuestionInfo.add_argument('title', help='question title cannot be empty', required=True, type=str)
PostQuestionInfo.add_argument('body', help='question body cannot be empty', required=True, type=str)

# Post Answer Info
PostAnswerInfo = reqparse.RequestParser()
PostAnswerInfo.add_argument('question_id', help='Question_ID cannot be empty', required=True, type=str)
PostAnswerInfo.add_argument('body', help='Answer body cannot be empty', required=True, type=str)

# Vote Question Info
VoteQuestionInfo = reqparse.RequestParser()
VoteQuestionInfo.add_argument('question_id', help='question_id cannot be empty', required=True, type=str)
VoteQuestionInfo.add_argument('is_upvote', help='is_upvote cannot be empty', required=True, type=inputs.boolean)

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
            return make_response(jsonify({"message": "please check your password is same as the confirm password"}),
                                 201)
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


class PostAnswer(Resource):
    @staticmethod
    @jwt_required()
    def post():
        # Parse the request info
        info = PostAnswerInfo.parse_args()
        # Check the identity of User
        identity = get_jwt_identity()
        currentUser = None
        currentUser = UserCollection.find_one({"email": identity["email"]})
        if currentUser is None:
            return make_response(jsonify({"message": "The User identity is invalid"}), 401)
        # Convert question_id received to uuid
        # Check if question exist
        question_id = uuid.UUID(info["question_id"])
        currentQuestion = None
        currentQuestion = QuestionCollection.find_one({"_id": question_id})
        if currentQuestion is None:
            return make_response(jsonify({"message": "The Question identity is invalid"}), 401)
        newAnswer = {
            "_id": uuid.uuid1(),
            "user_id": currentUser["_id"],
            "body": info["body"],
            "createdAt": datetime.datetime.today(),
            "is_best_answer": False,
            "vote_count": 0
        }
        # Append the new Answer to answers of question
        QuestionCollection.update(
            {"_id": question_id},
            {"$push": {"answers": newAnswer}})
        return make_response(jsonify({"message": "The Answer posted successfully"}), 201)
class QuestionList(Resource):	
    @staticmethod
    def get():
	# get 100 questions
        res = QuestionCollection.aggregate([
    {'$lookup': {
            'from': 'Users', 
            'localField': 'user_id', 
            'foreignField': '_id', 
            'as': 'name'}},
    #{'$unwind':'$name'},
    {'$sort': {'createdAt':-1}},
	{'$limit' : 100},
	#{"$project": {'Username': { "$ifNull": ["$name.username", "deleted user"]}, 'title':'$title', 'body':'$body'}}
	{"$project": {
		'Username': {
			"$cond": {
				"if": {
					"$anyElementTrue": ["$name.username"]},
					"then": "$name.username",
					"else": ["deleted user"]}},
		'title':'$title',
		'body':'$body',
		'createdAt': '$createdAt',
		'vote_count': '$vote_count',
		'_id': '$_id'}}])
        return make_response(
            jsonify(list(res)), 201)


class PostQuestion(Resource):
    # This decorator is needed when we need to check the identity of the user
    # When using this decorator, the request must have a header["Authorization"] with value "Bearer [jwt_token]"
    @staticmethod
    @jwt_required()
    def post():
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
            "_id": uuid.uuid1(),
            "user_id": currentUser["_id"],
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


class ListAnswers(Resource):
    @staticmethod
    def get():
        # Get the current Question's ID
        questionID = uuid.UUID(request.args.get("question_id"))
        # List all the answers associated with that Question using the ID
        return make_response(
            jsonify(
                list(
                    QuestionCollection.find_one(
                        {"_id": questionID})["answers"])), 201)

class VoteQuestion(Resource):
    @staticmethod
    @jwt_required()
    def post():
        info = VoteQuestionInfo.parse_args()
        identity = get_jwt_identity()
        responseMessage = ""
        actionTaken = ""
        currentUser = UserCollection.find_one(
            {
                "email": identity["email"]
            })
        voteChange = 0
        questionID = uuid.UUID(info["question_id"])
        # No Votes at all
        if "votes" not in currentUser:
            if info["is_upvote"]:
                voteChange += 1
            else:
                voteChange -= 1
            actionTaken = "NewVote"
            UserCollection.update(
                {
                    "_id" : currentUser["_id"]
                },
                {
                    "$push": 
                    {
                        "votes": 
                        {
                            "post_id" : questionID,
                            "is_upvote": info["is_upvote"]
                        }
                    }
                })
        else:
            for vote in currentUser["votes"]:
                # Vote on this answer exist
                if vote["post_id"] == questionID:
                    # Cancel vote
                    if vote["is_upvote"] == info["is_upvote"]:
                        if info["is_upvote"]:
                            voteChange -= 1
                        else:
                            voteChange += 1
                        actionTaken = "CancelVote"
                        UserCollection.update(
                        {
                            "_id": currentUser["_id"]
                        },
                        {
                            "$pull" : 
                            {
                                "votes": 
                                {
                                    "post_id": questionID
                                }
                            }
                        })                    
                        break
                    # Change vote
                    else:
                        if info["is_upvote"]:
                            voteChange += 2
                        else:
                            voteChange -= 2                            
                        actionTaken = "ChangeVote"
                        UserCollection.update(
                        {
                            "_id": currentUser["_id"],
                            "votes.post_id": questionID
                        },
                        {
                            "$set": 
                            {
                                "votes.$.is_upvote": info["is_upvote"]
                            }
                        })
                        break
            # No vote on this answer
            if voteChange == 0:
                if info["is_upvote"]:
                    voteChange += 1
                else:
                    voteChange -= 1
                actionTaken = "NewVote"
                UserCollection.update(
                    {
                        "_id": currentUser["_id"]
                    },
                    {
                        "$push": 
                        {
                            "votes" : 
                            {
                                "post_id" : questionID,
                                "is_upvote": info["is_upvote"]
                            }
                        }
                    })
        # Now change vote count of answer
        QuestionCollection.update(
            {
                "_id": questionID
            },
            {
                "$inc": 
                {
                    "vote_count": voteChange
                }
            })
        if actionTaken == "NewVote":
            responseMessage = "Upvoted" if info["is_upvote"] else "Downvoted"
        elif actionTaken == "ChangeVote":
            responseMessage = "Changed vote to upvote" if info["is_upvote"] else "Changed vote to downvote"
        else:
            responseMessage = "Cancelled upvote" if info["is_upvote"] else "Cancelled downvote"
        return make_response(jsonify(
            {
                "message": responseMessage,
                "actionTaken": actionTaken,
                "is_upvote": info["is_upvote"]
            }), 200)


api.add_resource(Login, '/login')
api.add_resource(Register, '/register')
api.add_resource(PostAnswer, "/postanswer")
api.add_resource(QuestionList, '/questionlist')
api.add_resource(PostQuestion, '/postquestion')
api.add_resource(ListAnswers, '/listanswers')
api.add_resource(VoteQuestion, '/votequestion')

if __name__ == "__main__":
    app.debug = True
    app.run(host='localhost', port=5000)