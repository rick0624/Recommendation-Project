const router = require("express").Router();
const Like = require("../models/like-model");
const Shopping_Cart = require("../models/shopping_cart-model");
const Good_Detail = require("../models/good_detail-model");

router.get("/like/:product_id", async (req, res) => {
    await Like.deleteOne({$and: [{user : req.user._id}, {product : req.params.product_id}]});
    res.redirect("/like");
});

router.get("/shopping-cart/:product_id", async (req, res) => {
    await Shopping_Cart.deleteOne({$and: [{user : req.user._id}, {product : req.params.product_id}]});
    res.redirect("/shopping-cart");
});

module.exports = router;