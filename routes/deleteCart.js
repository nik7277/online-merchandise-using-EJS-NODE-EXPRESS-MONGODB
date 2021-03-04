const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// const {Item, validateItem} = require('../models/item');
const {Cart}  = require('../models/cart');
const auth = require('../middleware/auth');


router.delete('/:id', auth, async(req,res) => {

    // find the item to be deleted from the cart
   // const item_details = await Item.findOne({name: req.body.item_name},{_id: 1});

    // get the id of the item to be deleted from the cart
    const item_id = req.params.id;
    
    //item_details._id;

    // get the user id from the auth middleware
    const user_id = req.user._id;

    // Update the cart document of that user
    const updatedcart = await Cart.updateOne({user: user_id}, {
        $pull: {
            item: {
                itemid: item_id
            }
        }
    });

    console.log('updated cart : ',updatedcart);

    // Populate the updatedcart with the items collection and render it to cartItems template
    const cartItems = await Cart.findOne({user: user_id}).populate('item.itemid');
    //await Cart.findOne({user: user_id},{_id: 0, item: 1 }).populate('item');

    console.log('cart items : ',cartItems.item);

    if(cartItems.item.length > 0){
        res.render('cart',{cartItems: cartItems.item});
    }
    else{
        res.send("<h2>No cart Items</h2>");
    }
});
module.exports = router;