const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const authRoute = require("./routes/auth-route");
const profileRoute = require("./routes/profile-route");
const classifyRoute = require("./routes/classify-route");
const addingRoute = require("./routes/adding-route");
const deletingRoute = require("./routes/deleting-route");
require("./config/passport");
const passport = require("passport");
const session = require("express-session");
const flash = require("connect-flash");
const Recommendation = require("./models/recommendation-model");
const Good_Detail = require("./models/good_detail-model");
const Association_Rules = require("./models/association_rules-model");
const Like = require("./models/like-model");
const Shopping_Cart = require("./models/shopping_cart-model");

mongoose.connect(
    process.env.DB_CONNECT,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("Connect to mongodb altas.");
    }).catch((err) => {
        console.log(err);
    });

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: true,
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    next();
})
app.use( express.static( "src"));
app.use("/auth", authRoute);
app.use("/profile", profileRoute);
app.use("/classify", classifyRoute);
app.use("/adding", addingRoute);
app.use("/deleting", deletingRoute);


const authCheck = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl;
        res.redirect("/auth/login");
    }else{
        next();
    }
};

// app.get("/", authCheck, async (req, res) => {
//     let recommedationFound = await Recommendation.find({ buyer: req.user._id});
//     let good_detail_array = [];
//     for(let i=0; i<recommedationFound.length; i++){
//         let good_detailFound = await Good_Detail.find({good_id : recommedationFound[i].good});
//         good_detail_array.push(good_detailFound[0]);
//     }
//     console.log(good_detail_array)
//     res.render("index", { user: req.user, good_details : good_detail_array });
// });

app.get("/", async (req, res) => {
    // console.log("--------ff---------");
    // console.log(req.originalUrl);
    req.session.returnTo = req.originalUrl;
    if(!req.isAuthenticated()){
        // console.log("hi");
        let good_detail_array = await Good_Detail.find({});
        // console.log(good_detail_array)
        res.render("index", { user: req.user, good_details : good_detail_array });
    }else{
        let recommedationFound = await Recommendation.find({ buyer: req.user._id});
        let good_detail_array = [];
        for(let i=0; i<recommedationFound.length; i++){
            let good_detailFound = await Good_Detail.find({good_id : recommedationFound[i].good});
            good_detail_array.push(good_detailFound[0]);
        }
        let likeFound = await Like.find({user : req.user._id}); 
        let shoppingCartFound = await Shopping_Cart.find({user : req.user._id});
        res.render("index", { user: req.user, good_details : good_detail_array, like_details : likeFound, shoppingCart_details : shoppingCartFound });
    }
});

app.get("/product_detail/:id", async (req, res) => {
    req.session.returnTo = req.originalUrl;
    const product_id = req.params.id;
    // console.log(product_id);
    let good_detailFound = await Good_Detail.find({good_id : product_id});
    let associationFound = await Association_Rules.find({Item_A : product_id});
    let association_good_array = [];
    for(let i=0; i<associationFound.length; i++){
        let good_Found = await Good_Detail.find({good_id : associationFound[i].Item_B});
        association_good_array.push(good_Found[0]);
    }
    let likeFound = await Like.find({user : req.user._id}); 
    let shoppingCartFound = await Shopping_Cart.find({user : req.user._id});
    res.render("product", {user: req.user, good_details : good_detailFound, association_goods : association_good_array, like_details : likeFound, shoppingCart_details : shoppingCartFound});
});

app.get("/like", async (req, res) => {
    let likeFound = await Like.find({user : req.user._id});
    let good_detailFound = [];
    for(let i=0; i<likeFound.length; i++){
        let good_Found = await Good_Detail.find({good_id : likeFound[i].product});
        good_detailFound.push(good_Found[0]);
    }
    res.render("like", {user: req.user, good_details : good_detailFound});
});

app.get("/shopping-cart", async (req, res) => {
    let shoppingCartFound = await Shopping_Cart.find({user : req.user._id});
    let good_detailFound = [];
    for(let i=0; i<shoppingCartFound.length; i++){
        let good_Found = await Good_Detail.find({good_id : shoppingCartFound[i].product});
        good_detailFound.push(good_Found[0]);
    }
    res.render("shopping-cart", {user: req.user, good_details : good_detailFound});
});

// app.get("/", (req, res) => {

//     res.render("index", { user: req.user });
// });

app.listen(8080, () => {
    console.log("Server running on port 8080.")
});