#!/usr/bin/env python

import os
from flask import Flask
from routes.profiling_route import noop_handler
from routes.statistics_route import all_statistics_handler, contractor_statistics_handler
from routes.search_route import search_contractors_handler
from routes.train_route import train_skills_model_handler
from routes.classifier_route import classify_skills_handler, classify_locations_handler, classify_categories_handler, classify_contractors_handler, classify_all_features_handler
from routes.suggestion_route import suggest_contractors_handler, suggest_skills_handler
from services.db_service import DBService
import config

app = Flask(__name__)

"""profiling API"""
app.add_url_rule('/noop', 'noop_handler', noop_handler, methods=["GET"])

"""statistics API"""
app.add_url_rule('/statistics/all', 'all_statistics_handler', all_statistics_handler, methods=["GET"])
app.add_url_rule('/statistics/contractor', 'contractor_statistics_handler', contractor_statistics_handler, methods=["GET"])

"""classify API"""
app.add_url_rule('/classify/all', 'classify_all_features_handler', classify_all_features_handler, methods=["POST"])
app.add_url_rule('/classify/skills', 'classify_skills_handler', classify_skills_handler, methods=["POST"])
app.add_url_rule('/classify/locations', 'classify_locations_handler', classify_locations_handler, methods=["POST"])
app.add_url_rule('/classify/categories', 'classify_categories_handler', classify_categories_handler, methods=["POST"])
app.add_url_rule('/classify/contractors', 'classify_contractors_handler', classify_contractors_handler, methods=["POST"])

"""train API"""
app.add_url_rule('/train/skills', 'train_skills_model_handler', train_skills_model_handler, methods=["POST"])

"""search API"""
app.add_url_rule('/search/contractors', 'search_contractors_handler', search_contractors_handler, methods=["POST"])

"""suggest API"""
app.add_url_rule('/suggest/skills', 'suggest_skills_handler', suggest_skills_handler, methods=["POST"])
app.add_url_rule('/suggest/contractors', 'suggest_contractors_handler', suggest_contractors_handler, methods=["POST"])

if __name__ == "__main__":
    DBService.connect(config.db_connection_string)
    app.run(host='0.0.0.0', port=os.environ.get('PORT', 3003), debug=True)
