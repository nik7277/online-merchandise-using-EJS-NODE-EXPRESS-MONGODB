const mongoose  = require('mongoose');
const validator = require('validator');
const Joi = require('Joi');
const itemTypes = ['T-Shirts', 'Action Figures', 'Phone Cases'];
const ItemSchema  = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique:true,
        trim: true,
        minlength: 3,
        maxlength: 25
    },
    type:{
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function(v){
                return validator.isIn(v, itemTypes);
                },
                message: 'Invalid item type'
            }
    },
    description:{
        type:String,
        trim:true,
    },
    image:{
        type:String,
        trim:true,
    },
    quantity:{
        type:Number,
        default: 10
    },
    price:{
        type:Number,
        default: 40
    },
    deleted:{
        type: Boolean,
        default: false
    }
});

const Item = mongoose.model('Item', ItemSchema);


function validateItem(item){
    const schema = {
        itemid: Joi.string().required(), 
        name: Joi.string().min(3).max(25).required(),
        type: Joi.string().max(255).required(),
        description: Joi.string(),
        image: Joi.string(),
        quantity: Joi.number(),
        price: Joi.number()

    }
    return Joi.validate(item, schema);
}


exports.Item = Item;
exports.validateItem = validateItem;
