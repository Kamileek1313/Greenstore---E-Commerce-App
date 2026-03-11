const express = require("express");
const cors = require("cors");
const passport = require("passport");
const swaggerSpec = require("./docs/swagger");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const swaggerDocument = YAML.load("./docs/openapi.yaml");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(passport.initialize());

require("./config/passport")(passport);

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", orderRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (req, res) => {
 res.send("Welcome to the greenstore");
})

app.listen(5000, () => {
 console.log("Server running");
});