const pool = require("../models/db");

exports.createOrder = async (req, res) => {

 try {

  const userId = req.user.id;

  const cartItems = await pool.query(
   `
   SELECT cart_items.product_id,
          cart_items.quantity,
          products.price
   FROM carts
   JOIN cart_items
   ON carts.id = cart_items.cart_id
   JOIN products
   ON cart_items.product_id = products.id
   WHERE carts.user_id=$1
   `,
   [userId]
  );

  if (cartItems.rows.length === 0) {
   return res.status(400).json("Cart is empty");
  }

  const order = await pool.query(
   "INSERT INTO orders (user_id) VALUES ($1) RETURNING *",
   [userId]
  );

  const orderId = order.rows[0].id;

  for (const item of cartItems.rows) {

   await pool.query(
    "INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1,$2,$3,$4)",
    [orderId, item.product_id, item.quantity, item.price]
   );

  }

  await pool.query(
   `
   DELETE FROM cart_items
   WHERE cart_id IN (
    SELECT id FROM carts WHERE user_id=$1
   )
   `,
   [userId]
  );

  res.json({
   message: "Order created",
   orderId: orderId
  });

 } catch (err) {

  console.error(err.message);
  res.status(500).send("Server error");

 }

};

exports.getOrders = async (req, res) => {

 try {

  const userId = req.user.id;

  const orders = await pool.query(
   "SELECT * FROM orders WHERE user_id=$1",
   [userId]
  );

  res.json(orders.rows);

 } catch (err) {

  console.error(err.message);
  res.status(500).send("Server error");

 }

};

exports.getOrderById = async (req, res) => {

 try {

  const { id } = req.params;

  const orderItems = await pool.query(
   `
   SELECT products.name,
          order_items.quantity,
          order_items.price
   FROM order_items
   JOIN products
   ON order_items.product_id = products.id
   WHERE order_items.order_id=$1
   `,
   [id]
  );

  res.json(orderItems.rows);

 } catch (err) {

  console.error(err.message);
  res.status(500).send("Server error");

 }

};