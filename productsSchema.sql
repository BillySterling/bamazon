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
VALUES ("Ford Explorer Console Cover", "Automotive", 49.95, 500);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Vizio 65-inch LED TV", "Electronics", 999.95, 1200);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("AudioSource 100-watt Amplifier", "Electronics", 229.05, 355);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Roomba Robot Vacuum", "Household", 975.50, 1895);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Fisher-Price Stroller", "Baby", 125.99, 795);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Claw Hammer", "Home Improvement", 5.99, 5);

SELECT * FROM products;
SELECT DISTINCT department_name FROM products ORDER BY department_name;



SELECT item_id, price, stock_quantity FROM products WHERE item_id = 12;

UPDATE products set stock_quantity = 1 WHERE item_id = 12;

DELETE FROM products WHERE item_id = 14;

ALTER TABLE products
ADD CONSTRAINT UC_item UNIQUE (product_name, department_name);

ALTER TABLE products
ADD product_sales DECIMAL(10,2) NULL;

UPDATE products set product_sales = 0; 

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Crowbar", "Home Improvement", 1.29, 8,0);

CREATE TABLE departments (
	department_id INT NOT NULL AUTO_INCREMENT,
	department_name VARCHAR(100) NOT NULL,
	over_head_costs DECIMAL(10,2) NULL,
	PRIMARY KEY (department_id)
);

SELECT * FROM departments;
TRUNCATE TABLE departments;

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Accessories", "6000");
INSERT INTO departments (department_name, over_head_costs)
VALUES ("Automotive", "4670");
INSERT INTO departments (department_name, over_head_costs)
VALUES ("Baby", "8050");
INSERT INTO departments (department_name, over_head_costs)
VALUES ("Clothing", "12570");
INSERT INTO departments (department_name, over_head_costs)
VALUES ("Electronics", "3547");
INSERT INTO departments (department_name, over_head_costs)
VALUES ("Home Improvement", "8795");
INSERT INTO departments (department_name, over_head_costs)
VALUES ("Household", "2790");
INSERT INTO departments (department_name, over_head_costs)
VALUES ("Jewelry", "10259");
INSERT INTO departments (department_name, over_head_costs)
VALUES ("Personal", "2325");

ALTER TABLE departments
ADD CONSTRAINT UC_item UNIQUE (department_name);

CREATE OR REPLACE VIEW deptsummary AS 
SELECT d.department_id, d.department_name, d.over_head_costs, sum(p.product_sales) AS total_sales FROM departments d
INNER JOIN products p
ON d.department_name = p.department_name
GROUP BY p.department_name
ORDER BY p.department_name;

SELECT department_id, department_name, over_head_costs, total_sales AS product_sales, total_sales-over_head_costs AS total_profit
FROM deptsummary
ORDER BY department_name;

SELECT * FROM deptsummary;




