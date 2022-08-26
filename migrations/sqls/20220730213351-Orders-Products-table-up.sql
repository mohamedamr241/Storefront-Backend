/* Replace with your SQL commands */
CREATE TABLE Orders_Products(
    id SERIAL PRIMARY KEY,
    product_id bigint REFERENCES Products(id) ON DELETE SET NULL ON UPDATE CASCADE,
    order_id bigint REFERENCES Orders(id) ON DELETE SET NULL ON UPDATE CASCADE,
    quantity INT
);