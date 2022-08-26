/* Replace with your SQL commands */
CREATE TABLE Users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(30) UNIQUE,
    firstName VARCHAR(20),
    lastName VARCHAR(20),
    password CHAR(60)
);