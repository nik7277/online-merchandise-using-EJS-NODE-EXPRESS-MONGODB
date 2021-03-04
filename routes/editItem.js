const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const {Item, validateItem}  = require('../models/item');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/images');
     },
    filename: function (req, file, cb) {
        cb(null , file.originalname);
    }
});


//const upload = multer({ storage: storage })


router.post('/:id',  async(req,res) => {
//   console.log('create Item called');
//upload.single('ItemImage'),

let upload  = multer({ storage: storage }).single('itemImage');

upload(req, res, async function(err) {

   let filename;

   if(!req.fileValidationError && !err){
       filename = req.file.originalname;
   }
  
  const {error} = validateItem(req.body);
  if(error){
      return res.status(400).send(error.details[0].message);
  }
  let it = await Item.updateOne({ _id: req.params.id }, {
      name: req.body.name,
      type: req.body.type,
      description: req.body.description,
      quantity: req.body.quantity,
      price: req.body.price,
      image: filename

  });

  res.send("success");
    
});

})

module.exports = router;