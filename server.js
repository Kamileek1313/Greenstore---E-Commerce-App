const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/products", productRoutes);

app.get("/", (req, res) => {
 res.send("Greenstore API running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
 console.log(`Server running on port ${PORT}`);
});