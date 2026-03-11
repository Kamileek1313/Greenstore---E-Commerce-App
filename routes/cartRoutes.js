const express = require("express");
const router = express.Router();
const passport = require("passport");

const cartController = require("../controllers/cartController");

router.post(
 "/add",
 passport.authenticate("jwt", { session: false }),
 cartController.addToCart
);

router.get(
 "/",
 passport.authenticate("jwt", { session: false }),
 cartController.getCart
);

router.delete(
 "/:id",
 passport.authenticate("jwt", { session: false }),
 cartController.removeFromCart
);

module.exports = router;