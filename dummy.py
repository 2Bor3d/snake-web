import flask

app = flask.Flask(__name__);


@app.route("/")
def index():
    with open("index.html", "r") as file:
        return file.read();


@app.route("/styles.css")
def styles():
    with open("styles.css", "r") as file:
        return flask.Response(file.read(), mimetype="text/css");


@app.route("/script.js")
def script():
    with open("script.js", "r") as file:
        return file.read();


if __name__ == "__main__":
    app.run();

