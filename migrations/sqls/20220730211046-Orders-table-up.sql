/* Replace with your SQL commands */
CREATE TABLE Orders(
    id SERIAL PRIMARY KEY,
    status varchar(9),
    user_id bigint REFERENCES Users(id) ON DELETE SET NULL ON UPDATE CASCADE
);