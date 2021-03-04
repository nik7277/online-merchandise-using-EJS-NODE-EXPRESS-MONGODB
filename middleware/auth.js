const jwt = require('jsonwebtoken');
function auth(req, res, next){
    const token = req.cookies['merch-jwt-token'];

    console.log('COOKIE TOKEN : ',token);

    const url = req.originalUrl;
    

    // Store the logged information in logged
    if(!token){
        //No user logged in- redirect to homepage
        req.logged = false;
        return next();
    }

    try{
    // return payload
    console.log("user logged");
    const payload = jwt.verify(token, 'jwtSecretToken');

    console.log('payload : ',payload);

    //store the user id in the request with a user property
    req.user = payload;
    req.logged = true;
    console.log(req.user.name);
    // pass the request to the route handler
    next();
    }
    catch(e){
        console.log("error in jwt");
        req.error = "User not valid. Login again." ;
        return next();
    }
    
}
module.exports = auth;