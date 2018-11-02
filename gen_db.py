import sqlite3
import numpy as np
conn = sqlite3.connect('var/peersdb.sqlite3')
c = conn.cursor()
diag_pool=['724.2','846','847','847.1','847.2','847.3','847.4','847.9']

for j in range(20000):
    gender = np.random.binomial(1,0.5,size=1)[0]
    age = np.random.randint(18,70)
    diagid = np.random.randint(0,8)
    diagnosis = diag_pool[diagid]
    opioid = np.random.binomial(1,0.4,size=1)[0]
    depression = np.random.binomial(1,0.3,size=1)[0]
    alpha = -10*gender+age+3*diagid+1*opioid+2*depression
    beta = 8*gender+0.8*age+0.1*diagid+2*opioid-3*depression
    duration = int(round(np.random.beta(alpha,beta,size=1)[0]*365))
    c.execute(
        "INSERT INTO cases(duration, gender, age, diagnosis, opioid, depression) VALUES(?,?,?,?,?,?)",
        (int(duration),int(gender),int(age),diagnosis,int(opioid),int(depression)) 
    )

conn.commit()
conn.close()
