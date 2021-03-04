var express = require('express');
var auth = require('../middleware/auth');
var router = express.Router();

/* GET home page. */
router.get('/', auth,function(req, res, next) {
  if(req.error){
    res.locals.error = req.error;
  }
  if(req.user){
    // console.log(req.user);
    res.locals.user = req.user;
  }
  res.locals.title = 'Online Merchandise';
  res.render('index');
  
});

router.post('/', auth,function(req, res, next) {
  if(req.error){
    res.locals.error = req.error;
  }
  if(req.user){
    // console.log(req.user);
    res.locals.user = req.user;
  }
  res.locals.title = 'Online Merchandise';
  res.render('index');
  
});

module.exports = router;



