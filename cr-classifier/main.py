#!/usr/bin/env python

import os
from flask import Flask
from routes.debug_route import noop
from routes.search_route import search_contractors
from routes.classifier_route import start_classify_skills, start_classify_locations, start_classify_categories, start_classify_contractors, start_classify_all_features
from routes.suggestion_route import suggest_contractors, suggest_skills
from services.db_service import DBService
import config

app = Flask(__name__)

app.add_url_rule('/noop', 'noop', noop, methods=["GET"])

app.add_url_rule('/classify/all', 'start_classify_all_features', start_classify_all_features, methods=["POST"])
app.add_url_rule('/classify/skills', 'start_classify_skills', start_classify_skills, methods=["POST"])
app.add_url_rule('/classify/locations', 'start_classify_locations', start_classify_locations, methods=["POST"])
app.add_url_rule('/classify/categories', 'start_classify_categories', start_classify_categories, methods=["POST"])
app.add_url_rule('/classify/contractors', 'start_classify_contractors', start_classify_contractors, methods=["POST"])

app.add_url_rule('/search/contractors', 'search_contractors', search_contractors, methods=["POST"])

app.add_url_rule('/suggest/contractors', 'suggest_contractors', suggest_contractors, methods=["POST"])
app.add_url_rule('/suggest/skills', 'suggest_skills', suggest_skills, methods=["POST"])

if __name__ == "__main__":
    DBService.connect(config.db_connection_string)
    app.run(host='0.0.0.0', port=os.environ.get('PORT', 3003), debug=True)

