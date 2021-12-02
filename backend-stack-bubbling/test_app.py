
import unittest
import os

from app import app

from mockupdb import MockupDB, go, Command
from pymongo import MongoClient
from json import dumps
import json
import pytest
from flask import jsonify


class Api_TestCase(unittest.TestCase):

	def setUp(self):
		app.testing = True
		self.app = app.test_client()
	def tearDown(self):
		pass

	@staticmethod
	def userJoeData():
		return {
			"username": "Joe",
			"email": "joe@gmail.com",
			"password": "123",
			"confirmPassword": "123"
		}
	@staticmethod
	def userJoeLoginData():
		return {
			"email": Api_TestCase.userJoeData()["email"],
			"password": Api_TestCase.userJoeData()["password"]
		}
	def userJoeAccessToken(self):
		response = self.app.post('/login', json=self.userJoeLoginData())
		return "Bearer " + json.loads(response.data)["access_token"]

	
	@pytest.mark.run(order=1)
	def test_GivenANewUser_WhenRegisterWithCorrectPasswordAndConfirmPassword_ThenStatusCodeShouldBe200Or401(self):
		response = self.app.post('/register', json=self.userJoeData())
		assert(response.status_code == 200 or response.status_code == 401)

	@pytest.mark.run(order=2)
	def test_GivenAnyUser_WhenRequestForQuestionList_ThenStatusCodeShouldBe201(self):
		response = self.app.get('/questionlist')
		assert(response.status_code == 201)

	@pytest.mark.run(order=3)
	def test_GivenAnyUser_WhenRequestForAnswerListForAQuestion_ThenStatusCodeShouldBe201(self):
		response = self.app.get('/listanswers?question_id=25932d6c-411e-11ec-96ca-f4066954d05c')
		assert(response.status_code == 201)

	@pytest.mark.run(order=4)
	def test_GivenARegisteredUser_WhenHeLoginWithValidInfo_ThenStatusCodeShouldBe201(self):
		response = self.app.post('/login', json=self.userJoeLoginData())
		assert(response.status_code == 201)

	@pytest.mark.run(order=5)
	def test_GivenUserJoeAlreadyPostedAQuestion_WhenHeRequestToSeeHisQuestion_ThenStatusCodeShouldBe201(self):
		response = self.app.get("/listmyquestions", headers={"Authorization": self.userJoeAccessToken()})
		assert(response.status_code == 201)

	@pytest.mark.run(order=6)
	def test_GivenAnUserNotLoggined_WhenHeRequestToSeeHisQuestion_ThenStatusCodeShouldBe401(self):
		response = self.app.get("/listmyquestions")
		assert(response.status_code == 401)

	@pytest.mark.run(order=7)
	def test_GivenAQuestion_WhenWeTryToSetBestAnswerWhenThereIsNoOtherBestAnswer_ThenStatusCodeShouldBe201(self):
		response = self.app.post("/declarebestanswer?question_id=5aa10bdb-4b48-11ec-b9b6-f4066954d05c&answer_id=be4fce5d-4b50-11ec-b5f1-f4066954d05c", headers={"Authorization": self.userJoeAccessToken()})
		self.app.post("/test_resetbestanswer?question_id=5aa10bdb-4b48-11ec-b9b6-f4066954d05c&answer_id=be4fce5d-4b50-11ec-b5f1-f4066954d05c", headers={"Authorization": self.userJoeAccessToken()})						
		assert(response.status_code == 201)

	@pytest.mark.run(order=8)
	def test_GivenAQuestion_WhenThereIsAlreadyABestAnswerForIt_ThenStatusCodeShouldBe200(self):
		response = self.app.post("/declarebestanswer?question_id=4d3a9fbf-4121-11ec-8364-f4066954d05c&answer_id=cbcbcaba-4185-11ec-a15c-f4066954d05c", headers={"Authorization": self.userJoeAccessToken()})						
		assert(response.status_code == 200)

	@pytest.mark.run(order=9)
	def test_GivenAUser_WhenTheUserVotesOnAQuestion_ThenStatusCodeShouldBe200(self):
		response = self.app.post("/votequestion?question_id=5aa10bdb-4b48-11ec-b9b6-f4066954d05c&is_upvote=True", headers={"Authorization": self.userJoeAccessToken()})						
		assert(response.status_code == 200)

	@pytest.mark.run(order=10)
	def test_GivenAUser_WhenTheUserVotesOnAnAnswer_ThenStatusCodeShouldBe200(self):
		response = self.app.post("/voteanswer?question_id=5aa10bdb-4b48-11ec-b9b6-f4066954d05c&&answer_id=be4fce5d-4b50-11ec-b5f1-f4066954d05c&is_upvote=True", headers={"Authorization": self.userJoeAccessToken()})						
		assert(response.status_code == 200)


	# @pytest.mark.run(order=5)
	# def test_getQuestions(self):
	# 	print("test_getQuestions Started")
	# 	server = MockupDB()
	# 	port = server.run()
	# 	client = MongoClient(server.uri, connectTimeoutMS=9999)
	# 	request = server.receives()
	# 	print(port)
	# 	print(request.command_name)
	# 	print(request.replies({'ok': 1, 'maxWireVersion': 6}))
	# 	responder = server.autoresponds('ismaster', maxWireVersion=6)
	# 	print(client.admin.command('ismaster') == {'ok': 1, 'maxWireVersion': 6})
	# 	collection  = client.db.coll
	# 	future = go(collection.insert_one, {"_id": 1})
	# 	cmd = server.receives()
	# 	print(cmd)
	# 	print(cmd.ok())
	# 	write_result = future()
	# 	print(write_result)
	# 	print(write_result.inserted_id)
		


if __name__ == "__main__":
	app.debug = True
	app.run(host='localhost', port=5000)