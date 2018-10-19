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
import insta485


@peers.app.route('/', methods=['GET', 'POST'])
def show_index():
    """Display / route."""
    if 'username' not in session.keys():
        # print('no keys!')
        return redirect(url_for('.show_login'))
    d_b = insta485.model.get_db()
    cursor = d_b.cursor()
    context = {}
    username = session['username']
    if request.method == 'POST':
        feedback = request.get_json()
        postid = feedback.get('postid')
        if 'like' in feedback:  # the click is cliking a like
            cursor.execute(
                "INSERT INTO likes(owner, postid) VALUES(?,?)",
                (username, postid)
            )
        elif 'unlike' in feedback:  # the click is clicking an unlike
            cursor.execute(
                "DELETE FROM likes WHERE owner=? AND postid=?",
                (username, postid)
            )
            return ('', 204)
        else:  # commenting on a post
            comment = feedback.get('text')
            cursor.execute(
                "INSERT INTO comments(owner, postid, text) VALUES(?, ?, ?)",
                (username, postid, comment)
            )
        return ('', 201)
    # above is all the possible requests
    # below is preparing the dictionary and rendering the page
    context['logname'] = username
    context['posts'] = []
    posts = insta485.views.format.get_postid(cursor, username)
    for post in posts:
        context['posts'].append(
            insta485.views.format.get_post(cursor, post['postid'], username)
        )
    # print(context)
    # insta485.model.close_db(cursor)
    return flask.render_template("index.html", **context)
