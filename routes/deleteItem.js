const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {Item}  = require('../models/item');


router.delete('/:id', async(req,res) => {
  // user is the admin
  //res.locals.isAdmin = true;

  const item_id = req.params.id;
  // find the item to be deleted
  
  let item = await Item.findOne({ _id: item_id });
  if(!item){
      res.send("Item not found")
  }
  // set the item show to false
  
  item.set({deleted: true});
  item = await item.save();
  // const items = await Item.find({ deleted: true});
  // console.log(items); 
  // res.send(items);
  res.send('success');
})

module.exports = router;