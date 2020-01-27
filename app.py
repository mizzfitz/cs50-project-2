import os

from flask import Flask, request, url_for, redirect, render_template, jsonify
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

channels={}

@app.route("/")
def index():
    return render_template("test.html")

@app.route("/<string:channelName>")
def channel(channelName):
    if channels.get(channelName):
        return render_template("channel.html", channels=channels, messages=channels[channelName])

    return render_template("index.html", channels=channels, error="404: That channel does not appear to exist.  Please choose another")

if __name__ == "__main__":
    app.run()
