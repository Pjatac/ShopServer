const mongoose = require('mongoose');
const { Schema } = mongoose;

const purchaseModel = new Schema({
    purchases: [
        {
            name: {
                type: String,
                required: true,
                minlength: 2,
                maxlength: 30
            },
            qnt: {
                type: Number,
                required: true,
                min: 1,
                max: 100
            },
            cost: {
                type: Number,
                required: true,
                min: 0.1
            }
        }
    ]
});
module.exports = mongoose.model('PurchaseModel', purchaseModel);