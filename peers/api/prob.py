"""REST API for probability"""
import flask
import pandas as pd
import numpy as np
import peers

@peers.app.route('/api/prob/',methods=["GET","POST"])
def get_prob():
    """return probability of a person RTW."""
    d_b = peers.model.get_db()
    context = {'rtwprob': '0'}
    if flask.request.method == "POST":
        feedback = flask.request.get_json()
        query = "SELECT duration FROM cases"
        allcond=[]
        age = int(feedback["age"])
        minage = int(age) - 5
        maxage = int(age) + 5
        agecond = "age BETWEEN "+str(minage)+" AND "+str(maxage)
        diagcond = 'diagnosis IN (' + feedback["diagcode"] + ")"
        depresscond = 'depression = '+ feedback["depression"]
        opioidcond = 'opioid = '+ feedback["opioid"]
        gendercond = 'gender = '+ feedback["gender"]
        allcond = [agecond, diagcond, depresscond, opioidcond, gendercond]
        query += " WHERE "+ " AND ".join(allcond)
        df = pd.read_sql_query(query, d_b)
        sublength = np.sum(df['duration'] < float(feedback["duration"]))
        context['rtwprob'] = str(round(sublength/len(df)*100,2))
    return flask.jsonify(**context)