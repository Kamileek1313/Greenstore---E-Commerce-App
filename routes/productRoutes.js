const express = require("express");
const router = express.Router();
const passport = require("passport");
const adminMiddleware = require("../middleware/adminMiddleware");

const productController = require("../controllers/productController");

router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);
router.post("/", passport.authenticate("jwt", { session: false }), adminMiddleware, productController.createProduct);
router.put("/:id", passport.authenticate("jwt", { session: false }), adminMiddleware, productController.updateProduct);
router.delete("/:id", passport.authenticate("jwt", { session: false }), adminMiddleware, productController.deleteProduct);

module.exports = router;