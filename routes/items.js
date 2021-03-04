const express = require('express');
const router =  new express.Router();
const {Item} = require('../models/item');

router.post('/', async(req, res) => {
    
    var perPage = 3;
    var page = req.body.page;
    let count;
    
    // String given in the search field
    var search_for_Item = req.body.search_for || "";

    // Item selected in the filter
    const filter = req.body.filter || "";

    console.log('search for item : ', new RegExp(search_for_Item, 'i'));

    // console.log('Mongoose Item : ',Item);

    console.log('Filter: ', filter);

    console.log('Filter status : ',filter == "All")

    console.log('skip ',(perPage * page) - perPage)

    console.log('perpage ', perPage)

    // Find the items according to the filter and search
    let items;
    if(filter == "All" && search_for_Item==""){
        items = await Item.find({ deleted: false, quantity: { $gt: 0 }});
        count = items.length;
        items =  await Item.find({ deleted: false, quantity: { $gt: 0 }})
                           .skip((perPage * page) - perPage).limit(perPage);
    }
    else if (filter == "All") {
        items = await Item.find({  name: new RegExp(search_for_Item, 'i'),  deleted: false , quantity: { $gt: 0 }});
        count = items.length;
        items =  await Item.find({  name: new RegExp(search_for_Item, 'i'),  deleted: false , quantity: { $gt: 0 }})
                            .skip((perPage * page) - perPage).limit(perPage);
    } else if (search_for_Item=="") {
        items = await Item.find({ type: req.body.filter, deleted: false , quantity: { $gt: 0 }});
        count = items.length;
        items =  await Item.find({ type: req.body.filter, deleted: false , quantity: { $gt: 0 }})
                            .skip((perPage * page) - perPage).limit(perPage);
    } else {
        items = await Item.find({ type: req.body.filter, name: new RegExp(search_for_Item, 'i'),  deleted: false , quantity: { $gt: 0 }});
        count = items.length;
        items =  await Item.find({ type: req.body.filter, name: new RegExp(search_for_Item, 'i'),  deleted: false , quantity: { $gt: 0 }})
                            .skip((perPage * page) - perPage).limit(perPage);
    }


    console.log('items obtained : ',items);

    // If the user is not logged-in
    if(!req.logged){
        // Not an admin

        res.locals.isAdmin = false;
    }    
    else{
        // User is logged-in
        // Check if user isAdmin
        if(req.user.isAdmin){
            // Send to view that isAdmin is true
            res.locals.isAdmin = true;
        }
        else{
            // User not an admin
            res.locals.isAdmin = false;
        }
        
    }
    await res.render('items',{items: items, current: page, pages: Math.ceil(count / perPage)});
    return null;
    
})

module.exports = router;
