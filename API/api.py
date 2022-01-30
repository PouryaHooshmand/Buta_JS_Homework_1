import json
from flask import (Flask, abort, make_response, request, send_from_directory,
                   session)
from werkzeug.wrappers import Response
from flask_cors import CORS
from tinydb import TinyDB, Query

app = Flask(__name__)
app.config["DEBUG"] = True
cors = CORS(app)

db = TinyDB("API/db.json")
Post = Query()

@app.route('/posts', methods=['GET'])
def get_posts():
    posts = db.all()
    resp = make_response(json.dumps(posts))
    return resp

@app.route('/posts/<pid>', methods=['GET'])
def get_post(pid):
    post = db.get(Post.id == int(pid))
    if post:
        resp = make_response(json.dumps(post))
    else:
        resp = make_response(json.dumps({}))
    return resp

@app.route('/posts', methods=['POST'])
def send_posts():
    post = request.get_json()
    db.insert(post)
    return "ok"
    
app.run()