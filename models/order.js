const mongoose  = require('mongoose');

const OrderSchema  = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    item:[{
        itemid : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Item'
        },
        quantity:{
            type:Number,
            required: true
        }
    }],
    order_date: {
        type: mongoose.Schema.Types.Date,
        required: true
    },
    total_amount: {
        type: mongoose.Schema.Types.Number,
        required: true
    },
});

const Order = mongoose.model('Order', OrderSchema);

exports.Order = Order;