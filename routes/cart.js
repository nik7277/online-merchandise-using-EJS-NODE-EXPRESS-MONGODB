const express = require('express');
const router =  new express.Router();
const auth = require('../middleware/auth');
const {Cart} = require('../models/cart');
const {Item} = require('../models/item');

router.post('/', auth, async(req, res) => {
    const item = await Item.findOne({ name: req.body.item, deleted: false});
    const item_id = item._id;
    // User id from the auth payload
    if(req.logged){
        const user_id = req.user._id;
            // Check if the user has a cart 
        const user_id_c = await Cart.findOne({user: user_id});
        let cart;
        let p = false;
        let qty = 0;
        // If already has a cart
        if(user_id_c){
            // console.log("User in cart")
            // _id in cart
            const id_c = user_id_c._id;
            // console.log(id_c);
            // console.log(item_id);
            // _id: user_id_c,
            const present = await Cart.find({ item: 
            { $elemMatch: {
                itemid : item_id
            }
            }});

            // console.log('present items : ', present);

            // console.log(present.length);
            if(present.length){
                p = true;
                qty = present[0].item[0].quantity;
                cart = await Cart.update({_id: id_c,
                    "item.itemid": item_id
                }, 
                {$set: {
                        "item.$.quantity": qty+1
                } } ); 
            }
            else{
                cart = await Cart.update({_id: id_c}, 
                    { $addToSet: { 
                        item: {
                        itemid: item_id,
                        quantity: 1 
                    } } } );    
            } 
        }
        else{
            // console.log("New to cart");
            cart = new Cart({
                user: user_id,
                item: [{
                    itemid: item_id,
                    quantity: 1
                }],    
            })
            cart = await cart.save();
        }
        if(p){
            res.send("Item quantity updated in cart");
        }
        else{
            
            res.send("Item added to cart");
        }
        }
    else{
        res.send("Login or SignUp to add to Cart");
        
    }
    

    
})

module.exports = router;
