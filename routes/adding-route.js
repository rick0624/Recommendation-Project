const router = require("express").Router();
const Like = require("../models/like-model");
const Shopping_Cart = require("../models/shopping_cart-model");
const Good_Detail = require("../models/good_detail-model");

router.get("/like/:product_id", async (req, res) => {
    let checkLikeFound = await Like.find({$and: [{user : req.user._id}, {product : req.params.product_id}]});
    if(Object.keys(checkLikeFound).length === 0){
        let user = req.user._id;
        let product_id = req.params.product_id;
        let newLike = new Like({ user:user, product:product_id});
        try{
            await newLike.save();
            res.redirect(req.session.returnTo);
        } catch(err){
            res.redirect(req.session.returnTo);
        }
    }
});

router.get("/shopping-cart/:product_id", async (req, res) => {
    let checkShoppingCartFound = await Shopping_Cart.find({$and: [{user : req.user._id}, {product : req.params.product_id}]});
    if(Object.keys(checkShoppingCartFound).length === 0){
        let user = req.user._id;
        let product_id = req.params.product_id;
        let newShoppingCart = new Shopping_Cart({ user:user, product:product_id});
        try{
            await newShoppingCart.save();
            res.redirect(req.session.returnTo);
        } catch(err){
            res.redirect(req.session.returnTo);
        }
    }
});

module.exports = router;