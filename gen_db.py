import sqlite3
import numpy as np
conn = sqlite3.connect('var/peersdb.sqlite3')
c = conn.cursor()
diag_pool=['724.2','846','847','847.1','847.2','847.3','847.4','847.9']

for j in range(100000):
    duration = np.random.randint(0,365)
    age = np.random.randint(18,70)
    diagnosis = diag_pool[np.random.randint(0,8)]
    opioid = np.random.binomial(1,0.4,size=1)[0]
    depression = np.random.binomial(1,0.3,size=1)[0]
    c.execute(
        "INSERT INTO cases(duration, age, diagnosis, opioid, depression) VALUES(?,?,?,?,?)",
        (int(duration),int(age),diagnosis,int(opioid),int(depression)) 
    )

conn.commit()
conn.close()
