const router = require("express").Router();
const passport = require("passport");
const bcrypt = require("bcrypt");
const Good_Detail = require("../models/good_detail-model")
const Recommendation = require("../models/recommendation-model"); 

router.get("/type/:type", async (req, res) => {
    req.session.returnTo = req.originalUrl;
    let product_type = req.params.type
    if (product_type == 'Dresses Skirts girls'){
        product_type = 'Dresses/Skirts girls'
    }
    if (product_type == 'Woven Jersey Knitted mix Baby'){
        product_type = 'Woven/Jersey/Knitted mix Baby'
    }
    let good_detailFound = await Good_Detail.find({classify : product_type});
    if (product_type == 'Overview'){
        good_detailFound = await Good_Detail.find({});
    }
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

router.get("/wear/:type", async (req, res) => {
    req.session.returnTo = req.originalUrl;
    let people_type = req.params.type
    if (people_type == 'BabyChildren'){
        people_type = 'Baby/Children'
    }
    let good_detailFound = await Good_Detail.find({people : people_type});
    let recommendation_array = []
    if(req.user){
        let recommedationFound = await Recommendation.find({ buyer: req.user._id});
        for(let i=0; i<recommedationFound.length; i++){
            let good_Found = await Good_Detail.find({good_id : recommedationFound[i].good});
            recommendation_array.push(good_Found[0]);
        }
    }    
    res.render("classify", {user: req.user, good_details : good_detailFound, type:people_type, recommendation_goods : recommendation_array});
});

router.get("/color/:color", async (req, res) => {
    req.session.returnTo = req.originalUrl;
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