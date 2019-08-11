const mongoose = require('mongoose');
const {Schema} = mongoose;

const productModel = new Schema ({
    name: {
        type: String,
        required: true,
        minlength:2,
        maxlength:30
    },
    qnt: {
        type:Number,
        required: true,
        min: 1,
        max:100
    },
    currPrice: {
        type:Number,
        required: true,
        min: 0.1
    },
    priceChange: {type:Number}
    });
module.exports = mongoose.model('Product', productModel);