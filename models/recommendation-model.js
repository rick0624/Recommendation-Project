const mongoose = require("mongoose");

const recommendationSchema = new mongoose.Schema({
    good: {
        type: String,
        required: true,
    },
    buyer: String,
});

module.exports = mongoose.model("Recommendation", recommendationSchema);