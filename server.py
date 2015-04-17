import os

from flask import Flask, render_template, url_for, send_from_directory


app = Flask(__name__)


@app.route('/')
def index():
	return render_template('example.html')


@app.route('/game')
def game():
	return render_template('game.html', 
		js_files=['utility.js', 'gamesquare.js', 'gameboard.js', 'main.js'])


@app.route('/favicon.ico')
def favicon():
    return send_from_directory(
    	os.path.join(app.root_path, 'static'),
		'favicon.ico', mimetype='image/vnd.microsoft.icon')


app.run(debug=True)
