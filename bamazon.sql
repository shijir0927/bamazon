DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(45) NOT NULL,
    department_name VARCHAR(45) NOT NULL,
    price DECIMAL (10,2) NOT NULL,
    stock_quantity INT (10) NOT NULL,
    primary key (item_id)

);

SELECT * FROM products;

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("TV", "Electronics", 1399.99, 10),
("Vans", "Clothing", 45.00, 149.99),
("Backpack", "Clothing", 89.99, 50),
("Beats Pro", "Electronics", 199.99, 25),
("Drone", "Electronics", 399.99, 20),
("Rolex Watch", "Accessories", 1999.99, 5),("Chair", "Furniture", 29.99, 100),
("Bicycle", "Toys", 260.00, 15),
("IPhone 11", "Electronics", 1199.99, 20),
("Laptop", "Electronics", 1998.99, 33);
