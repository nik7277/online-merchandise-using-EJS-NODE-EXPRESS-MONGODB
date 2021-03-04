const mongoose  = require('mongoose');

const CartSchema  = new mongoose.Schema({
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
    deleted:{
        type: Boolean,
        default: false
    }
})

const Cart = mongoose.model('Cart', CartSchema);
exports.Cart = Cart;