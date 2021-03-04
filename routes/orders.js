const express = require('express');
const router =  new express.Router();
const auth = require('../middleware/auth');
const {Order} = require('../models/order');
const {Cart} = require('../models/cart');
const {Item} = require('../models/item');

router.get('/', auth, async(req, res) => {
    console.log("Hello");
    let orderdate = new Date();
    const user_id = req.user._id;
   
    const cartItems = await Cart.findOne({user: user_id}).populate('item.itemid');

    let itemids = cartItems.item;

    let tax = 0;
    let total = 0;
    let netamount = 0;
    let upq = 0;

    itemids.map((item)=>{
        total+=item.itemid.price*item.quantity;
    })
    tax = 0.06 * total;
    netamount = total + tax;

    console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&   total amount : ',netamount);
    
    //.map(({ itemid })=> itemid._id);

    let order = new Order({
        user: user_id,
        item: itemids,
        order_date: orderdate,
        total_amount: netamount   
    })

    order = await order.save();

    const updatedcart = await Cart.remove({user: user_id});

    itemids.map(async function(item){

        let it = await Item.findOne( {_id: item.itemid._id});

        if(it.quantity>=item.quantity){
            upq = it.quantity - item.quantity;
            let its = await Item.updateOne( {_id: item.itemid._id}, { quantity : upq});
        } 
    });

    // { _id: req.params.id }, {
    //     name: req.body.name,
    //     type: req.body.type,
    //     description: req.body.description,
    //     quantity: req.body.quantity,
    //     price: req.body.price,
    //     image: filename
    // }
    // , {
    //    item : []
    // });

    // const updatedcart = await Cart.update({user: user_id,
    //     "item.itemid": item_id
    // }, 
    // {$set: {
    //         "item.$.quantity": qty+1
    // } } ); 

    res.send("Your Order is confirmed. Thank you");
   
    // const myBookings = await Bookings.findOne({user: user_id}, {_id: 0, bookings: 1}).populate('bookings.game_id');
    // // console.log(myBookings);
    // // for( x of myBookings.bookings){
    // //     console.log(x.game_id.name);
    // // }
    // if(myBookings){
    //     // res.send(myBookings);
    //     res.render('myBookings',{myBookings: myBookings.bookings});
    // }
    // else{
    //     res.send("<p>NO BOOKINGS YET</p>");
    // }

})

router.get('/All', auth, async(req, res) => {
    console.log("Hello");
    const user_id = req.user._id;
    const myorders = await Order.find({user: user_id}).populate('item.itemid');

    console.log('my orders',myorders);
 
    if(myorders){
        res.render('myorders',{myorders: myorders});
    }
    else{
        res.send("<p>NO ORDERS YET</p>");
    }

})



module.exports = router;