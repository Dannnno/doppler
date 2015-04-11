from flask import Flask, render_template, url_for


app = Flask(__name__)


@app.route('/')
def index():
	return render_template('example.html')


@app.route('/map')
def map():
	return render_template(
		'map.html', API_KEY='AIzaSyBM_DeIkDCDTs9gWa0j_qV4FHQKGD0amYU')

app.run(debug=True)
