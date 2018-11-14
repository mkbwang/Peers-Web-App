# Peers-Web-App
## Project Goal
This is a project under collaboration between University of Michigan and Peers Health. The ultimate goal of the project can be checked [here](https://www.peershealth.com/university-of-michigan-rtw-intelligent-learning-research/).

This repository contains the code to generate a web app which offers treatment consultation for people injured during work. The users can visualize expected return-to-work duration with different combination of treatment options. The current prototype can be checked [here](https://notebooks.umichpeers.org). 

*Note: The current version is a toy example. The figures and numerical results are generated from a mock dataset. This project is still at the beginning stage and the prototype you are playing with is for illustration purposes only.*
## Overview of the Prototype Solution
This prototype consists of several parts: **backend database**, **backend server** and **frontend**. This solution is developed on a [DigitalOcean](https://www.digitalocean.com/) droplet with 50GB storage and 4GB memory, Ubuntu 16.04.4 operating system. The backend database is built with [**SQLite**](https://www.sqlite.org/index.html). The backend server is built up using [**flask**](http://flask.pocoo.org/) package of python. The front end is built by compiling [REACT.js](https://reactjs.org/) into raw javascript.
## File Structure
**The files you can find in this repository don't include all the files. There will be additional log files generated when you run the server, and the actual data will NEVER be on this repository because of privacy.**

The data structure in the home directory is as follows:
```
Peers-Web-App/
├── env
├── gen_db.py
├── node_modules
├── package.json
├── package-lock.json
├── peers
├── peers.egg-info
├── peers.ini
├── __pycache__
├── README.md
├── setup.py
├── sql
├── var
├── webpack.config.js
└── wsgi.py
```
The `env` is the folder contains relevant programs to start a virtual python environment. The `gen_db.py` is a python file to generate mock data set that we are serving right now in this toy example. `node_modules` include REACT javascript libraries. `package.json` and `package-lock.json` are two files that configure how to install the javascript libraries. `peers` is the python web app object we are serving. `setup.py` configures the python packages to install in this virtual environment. `sql` contains the file to set up the SQLite database. `var` folder is where the database lies. `webpack.config.js` configures how to compile the ES6 style javascripts that I have written into raw javascript. `peers.ini` and `wsgi.py` are configuration files to deploy our web app on the DigitalOcean server.

The `peers` folder structure is as follows:
```
peers
├── api
├── config.py
├── __init__.py
├── js
├── model.py
├── __pycache__
├── static
├── templates
└── views
```
The `api` folder contains the python program that returns a json object upon request sent from the frontend javascript. `config.py`, `__init__.py` are configuration files of this web app. They defines the specific location where the web app reads in information from the backend database and where to store static files such as pictures. `js` include the ES6-style javascript files. `static` folder contains the static files(pictures, css and compiled raw javascript). `templates` folder include HTML web templates. `views` contain python file that renders the whole website with the HTML templates. 
## Acknowledgement
The technical skills used for this web app are learnt from University of Michigan [EECS 485 Web Databases and Information Systems](https://eecs485staff.github.io/eecs485.org/)
