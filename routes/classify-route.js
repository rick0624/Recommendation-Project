const router = require("express").Router();
const passport = require("passport");
const bcrypt = require("bcrypt");
const Good_Detail = require("../models/good_detail-model")

router.get("/type/:type", async (req, res) => {
    console.log("-----------------------------------");
    const product_type = req.params.type;
    let good_detailFound = await Good_Detail.find({classify : product_type});
    // console.log(good_detailFound);
    // console.log(req.user);
    res.render("classify", {user: req.user, good_details : good_detailFound});
});

router.get("/color/:color", async (req, res) => {
    const product_color = req.params.color;
    let good_detailFound = await Good_Detail.find({color : product_color});
    res.render("color", {user: req.user, good_details : good_detailFound});
})


module.exports = router;