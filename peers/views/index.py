"""
Peers index (main) view.

URLs include:
/
"""
import flask
from flask import request
from flask import session
from flask import redirect
from flask import url_for
import pandas as pd
import numpy as np
import os
from lifelines import KaplanMeierFitter
import matplotlib.pyplot as plt
import peers


@peers.app.route('/', methods=['GET'])
def show_index():
    """Display / route."""
    context = {'rtwprob': '0'}
    return flask.render_template("index.html", **context)
