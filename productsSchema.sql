DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE  bamazon;
USE bamazon;
CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(100) NOT NULL,
	department_name VARCHAR(100) NOT NULL,
	price DECIMAL(10,2) NULL,
	stock_quantity INTEGER(10),
	PRIMARY KEY (item_id)
);

CREATE INDEX by_product_name ON products (product_name);
CREATE INDEX by_department_name ON products (department_name);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Chevrolet Colorado Floor Mats", "Automotive", 79.95, 1000);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Jeep Grand Cherokee Headlight", "Automotive", 109.99, 2530);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Arizona Mens Denim Vest", "Clothing", 29.45, 250);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Spalding Golf Cap", "Clothing", 9.95, 3250);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Waterpik Water Flosser", "Personal", 88.00, 2000);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Ladies Gold and Diamond Pendant", "Jewelry", 20195.00, 25);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Chevrolet Colorado Floor Mats", "Automotive", 79.95, 1000);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Vizio 65-inch LED TV", "Electronics", 999.95, 1200);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("AudioSource 100-watt Amplifier", "Electronics", 229.05, 355);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Roomba Robot Vacuum", "Household", 975.50, 1895);

SELECT * FROM products;







