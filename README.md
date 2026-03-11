# Greenstore---E-Commerce-App

RELATION
users
  │
  ├── carts
  │     └── cart_items
  │            └── products
  │
  └── orders
         └── order_items
                └── products

users
-----
id
email
password
role
created_at

products
--------
id
name
description
price
stock


carts
-----
id
user_id


cart_items
----------
id
cart_id
product_id
quantity


orders
------
id
user_id
status
created_at


order_items
-----------
id
order_id
product_id
quantity
price
