CREATE TABLE cases(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    duration INTEGER NOT NULL,
    gender INTEGER NOT NULL,
    age INTEGER NOT NULL,
    diagnosis VARCHAR(20) NOT NULL,
    opioid INTEGER NOT NULL,
    depression INTEGER NOT NULL
);
