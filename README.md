# Peers-Web-App
## Project Goal
This is a project under collaboration between University of Michigan and Peers Health. The ultimate goal of the project can be checked [here](https://www.peershealth.com/university-of-michigan-rtw-intelligent-learning-research/).

This repository contains the code to generate a web app which offers treatment consultation for people injured during work. The users can visualize expected return-to-work duration with different combination of treatment options. The current prototype can be checked [here](https://notebooks.umichpeers.org). 

*Note: The current version is a toy example. The figures and numerical results are generated from a mock dataset. This project is still at the beginning stage and the prototype you are playing with is for illustration purposes only.*
## Overview of the Prototype Solution
This prototype consists of several parts: **backend database**, **backend server** and **frontend**. This solution is developed on a [DigitalOcean](https://www.digitalocean.com/) droplet with 50GB storage and 4GB memory, Ubuntu 16.04.4 operating system. The backend database is built with [**SQLite**](https://www.sqlite.org/index.html). The backend server is built up using [**flask**](http://flask.pocoo.org/) package of python. The front end is built by compiling [REACT.js](https://reactjs.org/) into raw javascript.
## File Structure
