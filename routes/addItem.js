const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const {Item, validateItem}  = require('../models/item');

// upload a file in the images folder
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/images');
     },
    filename: function (req, file, cb) {
        cb(null , file.originalname);
    }
});

//const upload = multer({ storage: storage })

router.post('/', async (req,res) => {

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
    let item = await Item.findOne(
        { name: req.body.name, 
          type: req.body.type
       });
    if(item){
        await Item.update({ name: req.body.name, type: req.body.type },
           {description: req.body.description, quantity:  req.body.quantity,
               price:  req.body.price,
               image: filename,
               deleted : false});
    }
    else{
          item = new Item({
          name: req.body.name,
          type: req.body.type,
          description: req.body.description,
          quantity:  req.body.quantity,
          price:  req.body.price,
          image: filename
  
      }); 
      item = await item.save();
    }
      
    //res.render('items');
    res.send("success");
    
    });
 // console.log('file object',req.body.itemImage);


})

module.exports = router;


// router.post('/', upload.single('itemImage'), async(req,res) => {

//     console.log('file object',req.body.itemImage);
  
//     const {error} = validateItem(req.body);
//     if(error){
//         return res.status(400).send(error.details[0].message);
//     }
//     let item = await Item.findOne(
//         { name: req.body.name, 
//           type: req.body.type
//        });
//     if(item){
//         await Item.update({ name: req.body.name, type: req.body.type },
//            {description: req.body.description, quantity:  req.body.quantity,
//                price:  req.body.price,
//                image: req.body.itemImage.originalname,
//                deleted : false});
//     }
//     else{
//           item = new Item({
//           name: req.body.name,
//           type: req.body.type,
//           description: req.body.description,
//           quantity:  req.body.quantity,
//           price:  req.body.price,
//           image: req.body.itemImage.originalname
  
//       }); 
//       item = await item.save();
//     }
      
//     res.redirect('/items');
//   })