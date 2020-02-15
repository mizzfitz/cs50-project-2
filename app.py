import os

from flask import Flask, request, url_for, redirect, render_template, jsonify
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

class Empty(): pass

channels={
        "general": [["benjamin","15:07","Hi everyone"],["guest","15:09","hi back :)"]],
            "questions": [["thomas","17:34","I have a weird question"]]
}

@app.route("/")
def index():
    return render_template("index.html", channels=channels)

@app.route("/<string:channel>")
def channel(channel):
    return render_template("index.html", channels=channels)

@app.route("/%load%channel", methods=["POST"])
def load_channel():
    channel = request.form.get("channel")
    
    if (channels.get(channel)):
        return jsonify({"success": True, "messages": channels[channel]})
    
    return jsonify({"success": False})


if __name__ == "__main__":
    app.run()
