const pool = require("../models/db");

exports.addToCart = async (req, res) => {

 try {

  const userId = req.user.id;
  const { product_id, quantity } = req.body;

  let cart = await pool.query(
   "SELECT * FROM carts WHERE user_id=$1",
   [userId]
  );

  if (cart.rows.length === 0) {

   cart = await pool.query(
    "INSERT INTO carts (user_id) VALUES ($1) RETURNING *",
    [userId]
   );

  }

  const cartId = cart.rows[0].id;

  const item = await pool.query(
   "INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ($1,$2,$3) RETURNING *",
   [cartId, product_id, quantity]
  );

  res.json(item.rows[0]);

 } catch (err) {

  console.error(err.message);
  res.status(500).send("Server error");

 }

};

exports.getCart = async (req, res) => {

 try {

  const userId = req.user.id;

  const cart = await pool.query(
   `
   SELECT cart_items.id,
          products.name,
          products.price,
          cart_items.quantity
   FROM carts
   JOIN cart_items
   ON carts.id = cart_items.cart_id
   JOIN products
   ON cart_items.product_id = products.id
   WHERE carts.user_id=$1
   `,
   [userId]
  );

  res.json(cart.rows);

 } catch (err) {

  console.error(err.message);
  res.status(500).send("Server error");

 }

};

exports.removeFromCart = async (req, res) => {

 try {

  const { id } = req.params;

  await pool.query(
   "DELETE FROM cart_items WHERE id=$1",
   [id]
  );

  res.json("Item removed");

 } catch (err) {

  console.error(err.message);
  res.status(500).send("Server error");

 }

};