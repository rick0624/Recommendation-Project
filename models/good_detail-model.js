const mongoose = require("mongoose");

const goodDetailSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    good_id: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    classify: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Good_Detail", goodDetailSchema);