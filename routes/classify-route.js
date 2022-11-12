const router = require("express").Router();
const passport = require("passport");
const bcrypt = require("bcrypt");
const Good_Detail = require("../models/good_detail-model")
const Recommendation = require("../models/recommendation-model"); 

router.get("/type/:type", async (req, res) => {
    console.log("-----------------------------------");
    const product_type = req.params.type;
    let good_detailFound = await Good_Detail.find({classify : product_type});
    let recommendation_array = []
    if(req.user){
        let recommedationFound = await Recommendation.find({ buyer: req.user._id});
        for(let i=0; i<recommedationFound.length; i++){
            let good_Found = await Good_Detail.find({good_id : recommedationFound[i].good});
            recommendation_array.push(good_Found[0]);
        }
    }
    
    res.render("classify", {user: req.user, good_details : good_detailFound, type:product_type, recommendation_goods : recommendation_array});
});

router.get("/color/:color", async (req, res) => {
    const product_color = req.params.color;
    let good_detailFound = await Good_Detail.find({color : product_color});
    let recommendation_array = []
    if(req.user){
        let recommedationFound = await Recommendation.find({ buyer: req.user._id});
        for(let i=0; i<recommedationFound.length; i++){
            let good_Found = await Good_Detail.find({good_id : recommedationFound[i].good});
            recommendation_array.push(good_Found[0]);
        }
    }
    res.render("color", {user: req.user, good_details : good_detailFound, color:product_color, recommendation_goods : recommendation_array});
})


module.exports = router;