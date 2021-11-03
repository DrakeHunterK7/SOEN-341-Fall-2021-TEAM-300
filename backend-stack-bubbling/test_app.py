
import unittest
import os

from app import app

from mockupdb import MockupDB, go, Command
from pymongo import MongoClient
from json import dumps
import pytest



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
		return response.data

	
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
		response = self.app.get('/listanswers?question_id=6c0f5f38-3609-11ec-9cae-f4066954d05c')
		assert(response.status_code == 201)
		print(self.userJoeAccessToken())

	@pytest.mark.run(order=4)
	def test_GivenARegisteredUser_WhenHeLoginWithValidInfo_ThenStatusCodeShouldBe201(self):
		response = self.app.post('/login', json=self.userJoeLoginData())
		assert(response.status_code == 201)


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