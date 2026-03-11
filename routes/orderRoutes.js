const express = require("express");
const router = express.Router();
const passport = require("passport");

const orderController = require("../controllers/orderController");

router.post(
 "/",
 passport.authenticate("jwt", { session: false }),
 orderController.createOrder
);

router.get(
 "/",
 passport.authenticate("jwt", { session: false }),
 orderController.getOrders
);

router.get(
 "/:id",
 passport.authenticate("jwt", { session: false }),
 orderController.getOrderById
);

module.exports = router;