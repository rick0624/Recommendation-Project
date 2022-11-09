const mongoose = require("mongoose");

const associationRulesSchema = new mongoose.Schema({
    Item_A: {
        type: String,
        required: true,
    },
    Item_B: {
        type: String,
        required: true,
    },
    lift: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model("Association_Rules", associationRulesSchema);