from flask import Flask, render_template, url_for


app = Flask(__name__)


@app.route('/')
def index():
	return render_template('example.html')


app.run(debug=True)
