"""
The flask application package.
"""

from flask import Flask
app = Flask(__name__)

import backend_stack_bubbling.views
