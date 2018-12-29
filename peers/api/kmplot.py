"""REST API for kmplot"""
import flask
from flask import Flask, send_file
import pandas as pd
import numpy as np
import io
import peers
import base64
from lifelines import KaplanMeierFitter
import matplotlib.pyplot as plt

@peers.app.route('/api/kmplot/',methods=["POST"])
def get_kmplot():
    """return the kmplot """
    d_b = peers.model.get_db()
    # we know that the request will always be a post request
    feedback = flask.request.get_json()
    query = "SELECT duration FROM cases"
    allcond = []
    minage = str(feedback["minage"])
    maxage = str(feedback["maxage"])
    agecond = "age BETWEEN "+minage+" AND "+maxage
    allcond.append(agecond)
    diagcode = feedback["diagcode"]
    diagcond = 'diagnosis IN '+ '(' + ','.join(diagcode) + ')'
    allcond.append(diagcond)
    gender = feedback["gender"]
    depression = feedback["depression"]
    opioid = feedback["opioid"]
    if len(depression)==1:
        depresscond = "depression = " + depression[0]
        allcond.append(depresscond)
    if len(opioid)==1:
        opioidcond = "opioid = " + opioid[0]
        allcond.append(opioidcond)
    if len(gender)==1:
        gendercond = "gender = " + gender[0]
        allcond.append(gendercond)
    query += " WHERE "+ " AND ".join(allcond)
    df = pd.read_sql_query(query, d_b)
    df['censor']=1
    plt.figure(figsize=(3,4))
    kmf = KaplanMeierFitter()
    kmf.fit(df['duration'],df['censor'])
    kmf.plot()
    plt.xlabel("Disability Duration")
    plt.ylabel("Return to Work Probability")
    strIO = io.BytesIO()
    plt.savefig(strIO, format='png')
    strIO.seek(0)
    plotcode = base64.encodestring(strIO.read())
    return plotcode.decode('utf-8'), 200, {'Content-Type': 'text/plain'}
