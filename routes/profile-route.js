const router = require("express").Router()
const Post = require("../models/post-model");
const Recommendation = require("../models/recommendation-model");
const Good_Detail = require("../models/good_detail-model");

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
    console.log(postFound.length);
    console.log(recommedationFound.length);
    console.log(good_detail_array)
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

router.get("/recommendation", authCheck, async (req, res) => {
    // console.log("aaa");
    name = "coat"
    good_id = "test_id";
    description = "This is best cloth.";
    image = "https://example.com/media/photo.jpg"
    let goodDetail = new Good_Detail({name, good_id, description, image});
    try{
        await goodDetail.save();
        res.status(200).redirect("/profile");
    } catch(err){
        req.flash("error_msg", "Goods are required.");
        res.redirect("/profile");
    }
});

router.post("/post", authCheck, async (req, res) => {
    let {title, content} = req.body;
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