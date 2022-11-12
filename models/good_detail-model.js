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
    },
    people: {
        type: String,
<<<<<<< HEAD
        require: true,
=======
        required: true,
>>>>>>> e2414e52a35ead03d21c11dd1a26fb865b85de4a
    }
});

module.exports = mongoose.model("Good_Detail", goodDetailSchema);