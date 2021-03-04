const express = require('express');
const router =  new express.Router();

router.get('/', async(req, res, next) => {
    res.cookie("merch-jwt-token", {maxAge: 0}).redirect('/')
})

module.exports = router;