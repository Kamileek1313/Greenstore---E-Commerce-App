const pool = require("../models/db");
exports.getProducts = async (req, res) => {
 try {

  const products = await pool.query(
   "SELECT * FROM products"
  );

  res.json(products.rows);

 } catch (err) {
  console.error(err.message);
  res.status(500).send("Server error");
 }
};
exports.getProductById = async (req, res) => {
 try {

  const { id } = req.params;

  const product = await pool.query(
   "SELECT * FROM products WHERE id=$1",
   [id]
  );

  res.json(product.rows[0]);

 } catch (err) {
  console.error(err.message);
  res.status(500).send("Server error");
 }
};

exports.createProduct = async (req, res) => {
 try {

  const { name, description, price, stock } = req.body;

  const newProduct = await pool.query(
   "INSERT INTO products (name, description, price, stock) VALUES ($1,$2,$3,$4) RETURNING *",
   [name, description, price, stock]
  );

  res.status(201).json(newProduct.rows[0]);

 } catch (err) {
  console.error(err.message);
  res.status(500).send("Server error");
 }
};

exports.updateProduct = async (req, res) => {
 try {

  const { id } = req.params;
  const { name, description, price, stock } = req.body;

  await pool.query(
   "UPDATE products SET name=$1, description=$2, price=$3, stock=$4 WHERE id=$5",
   [name, description, price, stock, id]
  );

  res.json("Product updated");

 } catch (err) {
  console.error(err.message);
  res.status(500).send("Server error");
 }
};

exports.deleteProduct = async (req, res) => {
 try {

  const { id } = req.params;

  await pool.query(
   "DELETE FROM products WHERE id=$1",
   [id]
  );

  res.json("Product deleted");

 } catch (err) {
  console.error(err.message);
  res.status(500).send("Server error");
 }
};