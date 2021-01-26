import random
from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///dillemmas.db'
db = SQLAlchemy(app)

class Dillemma(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    answer_1 = db.Column(db.String(255), nullable=False)
    question = db.Column(db.String(255), nullable=False)
    answer_2 = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return '<Dillema %r>' % self.id



@app.route('/', methods = ['GET'])
def index():
    if request.method == 'GET':
        number = random.randint(1, db.session.query(Dillemma.id).count())
        dillemma = Dillemma.query.get(number)
        return render_template('index.html', dillemma = dillemma)


if __name__ == '__main__':
    app.run()