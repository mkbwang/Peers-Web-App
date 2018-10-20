"""
Insta485 index (main) view.

URLs include:
/
"""
import flask
from flask import request
from flask import session
from flask import redirect
from flask import url_for
import pandas as pd
import os
from lifelines import KaplanMeierFitter
import matplotlib.pyplot as plt
import peers


@peers.app.route('/', methods=['GET', 'POST'])
def show_index():
    """Display / route."""
    d_b = peers.model.get_db()
    context = {}
    if request.method == 'POST':
        feedback = request.form
        if "kmplot" in feedback.keys():
            diagcode = request.form.getlist('diagcode')
            depression = request.form.getlist('depression')
            opioid = request.form.getlist('opioid')
            query = "SELECT duration FROM cases"
            allcond = []
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
            if len(allcond)>0:
                query += " WHERE " + ' AND '.join(allcond)
            print(query)
            df = pd.read_sql_query(query, d_b)
            df['censor']=1
    else:
        df = pd.read_sql_query("SELECT duration FROM cases", d_b)
        df['censor']=1
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
    print(figure_file)
    plt.savefig(figure_file)
    return flask.render_template("index.html", **context)
