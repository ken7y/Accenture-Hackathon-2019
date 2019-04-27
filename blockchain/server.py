from flask import Flask, render_template
from flask_bootstrap import Bootstrap

app = Flask(__name__)
Bootstrap(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about_us')
def about_us():
    return render_template('about_us.html')

@app.route('/profile')
def profile():
    return render_template('profile.html')
@app.route('/donate')
def donate():
    return render_template('donate.html')

@app.route('/australia')
def australia():
    return render_template('australia.html')

if __name__ == "__main__":
    app.run(debug=True)
