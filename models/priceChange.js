const mongoose = require('mongoose');
const { Schema } = mongoose;

const priceChangeModel = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 30
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true,
    }
});
module.exports = mongoose.model('PriceChangeModel', priceChangeModel);