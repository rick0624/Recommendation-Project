const router = require("express").Router()
const Post = require("../models/post-model");
const Recommendation = require("../models/recommendation-model");
const Good_Detail = require("../models/good_detail-model");
const Association_Rules = require("../models/association_rules-model");
const Like = require("../models/like-model");
const Shopping_Cart = require("../models/shopping_cart-model");

const authCheck = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl;
        res.redirect("/auth/login");
    }else{
        next();
    }
};

router.get("/", authCheck, async (req, res) => {
    let postFound = await Post.find({ author: req.user._id});
    let recommedationFound = await Recommendation.find({ buyer: req.user._id});
    // console.log(recommedationFound)
    let good_detail_array = [];
    for(let i=0; i<recommedationFound.length; i++){
        // console.log(recommedationFound[i].good);
        let good_detailFound = await Good_Detail.find({good_id : recommedationFound[i].good});
        good_detail_array.push(good_detailFound[0]);
    }
    // console.log(postFound.length);
    // console.log(recommedationFound.length);
    // console.log(good_detail_array)
    res.render("profile", { user: req.user, posts: postFound, recommendations: recommedationFound, good_details : good_detail_array });
});

router.get("/post", authCheck, (req, res) => {
    res.render("post", { user: req.user});
});

//        Original Recommendation
// router.get("/recommendation", authCheck, async (req, res) => {
//     // console.log("aaa");
//     good = "ID: 0002";
//     let newRecommendation = new Recommendation({good, buyer: req.user._id});
//     try{
//         await newRecommendation.save();
//         res.status(200).redirect("/profile");
//     } catch(err){
//         req.flash("error_msg", "Goods are required.");
//         res.redirect("/profile");
//     }
// });

// router.get("/recommendation", authCheck, async (req, res) => {
//     // console.log("aaa");
//     item_A = "ID1";
//     item_B = "ID2";
//     lift = 4.5;
//     let associationRules = new Association_Rules({item_A, item_B, lift});
//     try{
//         await associationRules.save();
//         res.status(200).redirect("/");
//     } catch(err){
//         req.flash("error_msg", "Goods are required.");
//         res.redirect("/");
//     }
// });

router.get("/goodDetail", authCheck, async (req, res) => {
    // console.log("aaa");
    name = "test_name";
    good_id = "test_id";
    description = "test_description";
    image = "test_img";
    color = "test_color";
    classify = "test_classify";
    people = "test_people";
    let goodDetail = new Good_Detail({name:name, good_id:good_id, description: description, image:image, color:color, classify:classify, people:people});
    try{
        await goodDetail.save();
        res.status(200).redirect("/");
    } catch(err){
        req.flash("error_msg", "Goods are required.");
        res.redirect("/");
    }
});

router.get("/association", authCheck, async (req, res) => {
    // console.log("aaa");
    item_A = "ID1";
    item_B = "ID2";
    lift = 4.5;
    let associationRules = new Association_Rules({Item_A : item_A, Item_B : item_B, lift : lift});
    try{
        await associationRules.save();
        res.status(200).redirect("/");
    } catch(err){
        req.flash("error_msg", "Goods are required.");
        res.redirect("/");
    }
});

router.get("/like", authCheck, async (req, res) => {
    // console.log("aaa");
    user = "testUser";
    product = "testProduct";
    let like = new Like({user : user, product : product});
    try{
        await like.save();
        res.status(200).redirect("/");
    } catch(err){
        req.flash("error_msg", "Goods are required.");
        res.redirect("/");
    }
});

router.get("/shopping", authCheck, async (req, res) => {
    user = "testUser";
    product = "testProduct";
    let shopping_cart = new Shopping_Cart({user : user, product : product});
    try{
        await shopping_cart.save();
        res.status(200).redirect("/");
    } catch(err){
        req.flash("error_msg", "Goods are required.");
        res.redirect("/");
    }
});

router.post("/post", authCheck, async (req, res) => {
    title = "fff";
    content = "This is a test.";
    let newPost = new Post({title, content, author: req.user._id});
    try{
        await newPost.save();
        res.status(200).redirect("/profile");
    } catch(err){
        req.flash("error_msg", "Both title and content are required.");
        res.redirect("/profile/post");
    }
});

module.exports = router;