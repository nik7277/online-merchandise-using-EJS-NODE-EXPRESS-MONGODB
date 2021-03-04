const express = require('express');
const router =  new express.Router();
const auth = require('../middleware/auth');
const {Cart} = require('../models/cart');

router.get('/', auth, async(req, res) => {
    const user_id = req.user._id;
    console.log('logger in user ',user_id)
    const cartItems = await Cart.findOne({user: user_id}).populate('item.itemid');
   // console.log('cart items ',cartItems.item);
    // {_id: 0, game: 1 }
    if(cartItems && cartItems.item.length > 0){
        res.render('cart',{cartItems: cartItems.item});
    }
    else{
        res.send("<h2>No cart Items</h2>");
    }

})

router.get('/checkout', auth, async(req, res) => {
    const user_id = req.user._id;
    console.log('logger in user ',user_id)
    const cartItems = await Cart.findOne({user: user_id}).populate('item.itemid');
    console.log('cart items ',cartItems.item);
    // {_id: 0, game: 1 }
    let tax = 0;
    let total = 0;
    let netamount = 0;
    cartItems.item.map((item)=>{
        total+=item.itemid.price*item.quantity;
    })
    tax = 0.06 * total;
    netamount = total + tax;
    if(cartItems.item.length > 0){
        res.render('checkout',{cartItems: cartItems.item, tax: tax, netamount: netamount});
    }
    else{
        res.send("<h2>No cart Items</h2>");
    }

})

module.exports = router;