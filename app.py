import os
import random
from flask import Flask, render_template, request, send_from_directory, jsonify
from flask_restful import Api, Resource
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///dillemmas.db'
db = SQLAlchemy(app)
api = Api(app)

class Dillemma(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    answer_1 = db.Column(db.String(255), nullable=False)
    question = db.Column(db.String(255), nullable=False)
    answer_2 = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return '<Dillema %r>' % self.id



@app.route('/')
def index():
    return render_template('index.html')

@app.route('/static/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')


class REST(Resource):
    def get(self):
        number = random.randint(1, db.session.query(Dillemma.id).count())
        dillemma = Dillemma.query.get(number)
        return jsonify(answer_1 = dillemma.answer_1,
                        question = dillemma.question,
                        answer_2 = dillemma.answer_2)

api.add_resource(REST, "/get")


if __name__ == '__main__':
    app.run(debug = True)