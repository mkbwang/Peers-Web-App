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


@peers.app.route('/', methods=['GET', 'POST'])
def show_index():
    """Display / route."""
    d_b = peers.model.get_db()
    context = {'rtwprob': '0'}
    if request.method == 'POST':
        feedback = request.form
        if "kmplot" in feedback.keys():
            diagcode = request.form.getlist('diagcode')
            depression = request.form.getlist('depression')
            opioid = request.form.getlist('opioid')
            gender = request.form.getlist('gender')
            query = "SELECT duration FROM cases"
            allcond = []
            minage = request.form.get("agemin")
            maxage = request.form.get("agemax")
            agecond = "age BETWEEN "+minage+" AND "+maxage
            allcond.append(agecond)
            if len(diagcode)!=0 and len(diagcode)!=8:
                diagcond = 'diagnosis IN '+ '(' + ','.join(diagcode) + ')'
                allcond.append(diagcond)
            if len(depression)==1:
                if depression[0]=='Depression':
                    depresscond = 'depression = 1'
                else:
                    depresscond = 'depression = 0'
                allcond.append(depresscond)
            if len(opioid)==1:
                if opioid[0]=='Opioid':
                    opioidcond = 'opioid = 1'
                else:
                    opioidcond = 'opioid = 0'
                allcond.append(opioidcond)
            if len(gender)==1:
                if gender[0]=='male':
                    gendercond = 'gender = 0'
                else:
                    gendercond = 'gender = 1'
                allcond.append(gendercond)
            if len(allcond)>0:
                query += " WHERE " + ' AND '.join(allcond)
            print(query)
        else:
            query = "SELECT duration FROM cases"
            allcond=[]
            age = feedback.get("age")
            minage = int(age) - 5
            maxage = int(age) + 5
            agecond = "age BETWEEN "+str(minage)+" AND "+str(maxage)
            diagcond = 'diagnosis IN (' + feedback.get("diagcode") + ")"
            depresscond = 'depression = '+ feedback.get("depression")
            opioidcond = 'opioid = '+ feedback.get("opioid")
            gendercond = 'gender = '+ feedback.get("gender")
            allcond = [agecond, diagcond, depresscond, opioidcond, gendercond]
            query += " WHERE "+ " AND ".join(allcond)
            print(query)
        df = pd.read_sql_query(query, d_b)
        df['censor']=1
    else:
        df = pd.read_sql_query("SELECT duration FROM cases", d_b)
        df['censor']=1
    if request.method=="GET" or "kmplot" in request.form.keys():
        plt.figure(figsize=(3,4))
        kmf = KaplanMeierFitter()
        kmf.fit(df['duration'],df['censor'])
        kmf.plot()
        plt.xlabel("Disability Duration")
        plt.ylabel("Return to Work Probability")
        figure_file = os.path.join(
            peers.app.config["UPLOAD_FOLDER"],
            'kmplot.png'
        )
        plt.savefig(figure_file)
    else:
        sublength = np.sum(df['duration'] < float(request.form.get("duration")))
        context['rtwprob'] = str(sublength/len(df)*100)
    return flask.render_template("index.html", **context)
