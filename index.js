const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const authRoute = require("./routes/auth-route");
const profileRoute = require("./routes/profile-route");
const classifyRoute = require("./routes/classify-route");
require("./config/passport");
const passport = require("passport");
const session = require("express-session");
const flash = require("connect-flash");
const Recommendation = require("./models/recommendation-model");
const Good_Detail = require("./models/good_detail-model");

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
    if(!req.isAuthenticated()){
        let good_detail_array = [];
        res.render("index", { user: req.user, good_details : good_detail_array });
    }else{
        let recommedationFound = await Recommendation.find({ buyer: req.user._id});
        let good_detail_array = [];
        for(let i=0; i<recommedationFound.length; i++){
            let good_detailFound = await Good_Detail.find({good_id : recommedationFound[i].good});
            good_detail_array.push(good_detailFound[0]);
        }
        // console.log(good_detail_array)
        res.render("index", { user: req.user, good_details : good_detail_array });
    }
});

app.get("/product_detail/:id", async (req, res) => {
    console.log("-----------------------------------");
    const product_id = req.params.id;
    console.log(product_id);
    let good_detailFound = await Good_Detail.find({good_id : product_id});
    console.log(good_detailFound);
    console.log(req.user);
    res.render("product", {user: req.user, good_details : good_detailFound});
});

// app.get("/", (req, res) => {

//     res.render("index", { user: req.user });
// });

app.listen(8080, () => {
    console.log("Server running on port 8080.")
});