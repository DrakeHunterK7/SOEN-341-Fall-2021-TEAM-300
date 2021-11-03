
import unittest
import os

from app import app

from mockupdb import MockupDB, go, Command
from pymongo import MongoClient
from json import dumps
import pytest



class GetDataSourceTestCase(unittest.TestCase):

	@pytest.fixture()
	def setup():
		pass
	@pytest.mark.run(order=1)
	def test_GivenANewUser_WhenRegisterWithNewEmail_ThenRegisterShouldBeSuccessful(self):
		app.testing = True
		self.app = app.test_client()
		data = {
			"username": "Joe",
			"email": "joe@gmail.com",
			"password": "123",
			"confirmPassword": "123"
		}
		response = self.app.post('/register', json=data)
		assert(response.status == 200)

	@pytest.mark.run(order=2)
	def test_GivenANewUser_WhenRegisterWithExistingEmail_ThenRegisterShouldBeFailed(self):
		app.testing = True
		self.app = app.test_client()
		data = {
			"username": "Joe",
			"email": "joe@gmail.com",
			"password": "123",
			"confirmPassword": "123"
		}
		response = self.app.post('/register', json=data)
		assert(response.status == 401)



	def test_getQuestionList(self):
		print("test_getQuestionList Started")
		app.testing = True
		self.app = app.test_client()
		response = self.app.get('/questionlist')
		print(response.data)
		print(response.status)

	@pytest.mark.run(order=3)
	def test_login(self):
		print("test_login Started")
		app.testing = True
		self.app = app.test_client()
		data = {
			"email": "bob@gmail.com",
			"password": "123"
		}
		response = self.app.post('/login', json=data)

	@pytest.mark.run(order=4)
	def test_getAnswerList(self):
		print("test_getAnswerList Started")
		app.testing = True
		self.app = app.test_client()
		response = self.app.get('/listanswers?question_id=6c0f5f38-3609-11ec-9cae-f4066954d05c')

	@pytest.mark.run(order=5)
	def test_getQuestions(self):
		print("test_getQuestions Started")
		server = MockupDB()
		port = server.run()
		client = MongoClient(server.uri, connectTimeoutMS=9999)
		request = server.receives()
		print(port)
		print(request.command_name)
		print(request.replies({'ok': 1, 'maxWireVersion': 6}))
		responder = server.autoresponds('ismaster', maxWireVersion=6)
		print(client.admin.command('ismaster') == {'ok': 1, 'maxWireVersion': 6})
		collection  = client.db.coll
		future = go(collection.insert_one, {"_id": 1})
		cmd = server.receives()
		print(cmd)
		print(cmd.ok())
		write_result = future()
		print(write_result)
		print(write_result.inserted_id)
		


if __name__ == "__main__":
	app.debug = True
	app.run(host='localhost', port=5000)