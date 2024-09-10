#!usr/bin/env python3
"""
Basic Flask App
"""


from flask import Flask, render_template


app = Flask(__name__)


@app.route('/', methods=['GET'], strict_slashes=False)
def index():
    """
    Hello world
    """
    return render_template('0-index.html')
