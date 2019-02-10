drop database if exists bamazon;
create database bamazon;
use bamazon;

create table products(
id int(30) auto_increment not null,
product_name varchar(30) not null,
department_name varchar(30) not null,
price decimal(30, 2) not null,
stock_quantity int(30) not null,
primary key(id)
);

insert into products(product_name, department_name, price, stock_quantity) values("Bananas", "Food", 2.99, 30);
insert into products(product_name, department_name, price, stock_quantity) values("Toilet Paper", "Toiletries", 16.99, 20);
insert into products(product_name, department_name, price, stock_quantity) values("Tide Pods", "Cleaning", 11.99, 12);
insert into products(product_name, department_name, price, stock_quantity) values("Apples", "Produce", 4.99, 10);
insert into products(product_name, department_name, price, stock_quantity) values("Chromebook", "Electronics", 159.00, 6);
insert into products(product_name, department_name, price, stock_quantity) values("IPhone X", "Electronics", 699.99, 4);
insert into products(product_name, department_name, price, stock_quantity) values("Track Pants", "Clothing", 18.99, 16);
insert into products(product_name, department_name, price, stock_quantity) values("Toothbrush", "Toiletries", 4.99, 9);
insert into products(product_name, department_name, price, stock_quantity) values("Socks", "Clothing", 8.99, 3);
insert into products(product_name, department_name, price, stock_quantity) values("Muffins", "Food", 7.99, 15);
insert into products(product_name, department_name, price, stock_quantity) values("Lysol Wipes", "Cleaning", 12.99, 2);

select * from products;