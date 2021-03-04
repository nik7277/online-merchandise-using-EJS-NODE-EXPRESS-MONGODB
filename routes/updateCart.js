const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {Cart}  = require('../models/cart');
const auth = require('../middleware/auth');


router.post('/inc/:id', auth, async(req,res) => {


    const item_id = req.params.id;
    
    const user_id = req.user._id;

    // Update the cart document of that user
    // const updatedcart = await Cart.updateOne({user: user_id}, {
    //     $set: {
    //         item: {
    //             itemid: item_id
    //         }
    //     }
    // });

    let qty = 0;

    const present = await Cart.find({ item: 
        { $elemMatch: {
            itemid : item_id
        }
        }});

    console.log('present item : ',present);

    qty = present[0].item[0].quantity;

    const updatedcart = await Cart.update({user: user_id,
        "item.itemid": item_id
    }, 
    {$set: {
            "item.$.quantity": qty+1
    } } ); 

    console.log('updated cart : ',updatedcart);

    const cartItems = await Cart.findOne({user: user_id}).populate('item.itemid');

    console.log('cart items : ',cartItems.item);

    if(cartItems.item.length > 0){
        res.render('cart',{cartItems: cartItems.item});
    }
    else{
        res.send("<h2>No cart Items</h2>");
    }
});

router.post('/dec/:id', auth, async(req,res) => {


    const item_id = req.params.id;
    
    const user_id = req.user._id;

    // const updatedcart = await Cart.updateOne({user: user_id}, {
    //     $pull: {
    //         item: {
    //             itemid: item_id
    //         }
    //     }
    // });

    let qty = 0;

    const present = await Cart.find({ item: 
        { $elemMatch: {
            itemid : item_id
        }
        }});

    qty = present[0].item[0].quantity;

    console.log('present item : ',present);

    const updatedcart = await Cart.update({user: user_id,
        "item.itemid": item_id
    }, 
    {$set: {
            "item.$.quantity": qty-1
    } } ); 

    console.log('updated cart : ',updatedcart);

    const cartItems = await Cart.findOne({user: user_id}).populate('item.itemid');

    console.log('cart items : ',cartItems.item);

    if(cartItems.item.length > 0){
        res.render('cart',{cartItems: cartItems.item});
    }
    else{
        res.send("<h2>No cart Items</h2>");
    }
});


module.exports = router;