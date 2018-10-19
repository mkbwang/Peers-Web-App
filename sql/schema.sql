CREATE TABLE cases(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    duration INT NOT NULL,
    age INT NOT NULL,
    diagnosis VARCHAR(40) NOT NULL,
    opioid INT NOT NULL,
    depression INT NOT NULL
);
