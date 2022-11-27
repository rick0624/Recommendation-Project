const mongoose = require("mongoose");

const shoppingCartSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    product: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("shopping_Cart", shoppingCartSchema);