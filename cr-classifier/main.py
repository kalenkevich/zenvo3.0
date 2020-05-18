#!/usr/bin/env python

import os
from flask import Flask
from routes.debug_route import noop
from routes.classify_skills_route import get_classified_skills, start_classify_skills
from routes.classify_contractors_route import get_classified_contractors, start_classify_contractors

app = Flask(__name__)

app.add_url_rule('/noop', 'noop', noop, methods=["GET"])
app.add_url_rule('/classify/skills', 'get_classified_skills', get_classified_skills, methods=["POST"])
app.add_url_rule('/classify/contractors', 'start_classify_skills', start_classify_skills, methods=["POST"])
app.add_url_rule('/classified/skills', 'get_classified_contractors', get_classified_contractors, methods=["GET"])
app.add_url_rule('/classified/contractors', 'start_classify_contractors', start_classify_contractors, methods=["GET"])

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=os.environ.get('PORT', 3003), debug=True)

