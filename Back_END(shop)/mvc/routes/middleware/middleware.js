const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwt = require('jsonwebtoken');


//
// const jwt = require("express-jwt");
const authorize = function(req, res, next){
        var token = null;
        req.user = null;
        // console.log("__________________________");
        // console.log(req);
        // console.log("__________________________");
        // console.log(req.headers);
        // console.log("__________________________");
        if (req && req.cookies)
        {   
            token = req.cookies['jwt'] ? req.cookies['jwt'] : null;
            // console.log("^^^^^^^^^^^^^^^^^^^^^");
            // console.log(token);
            // console.log("^^^^^^^^^^^^^^^^^^^^^");
        }
        if ( !token && req && req.headers)
        {   
            token = req.headers['jwt'] ? req.headers['jwt'] : null;
            // console.log("^^^^^^^^^^^^^asdas^^^^^^^^");
            // console.log(token);
            // console.log("^^^^^^^^^^^^asdas^^^^^^^^^");
        }
        if(!token){
            // console.log("helloo!");
            next();
            return;
        }
        try {
            const verified = jwt.verify(token, process.env.JWT_TOKEN);
            // console.log("hellooa!");
            if(checkUserExist(verified._id)){
                req.user = verified._id;
            }else{
                res.status(400).send("Invalid Token, LogIn Again!!");
                return;
            }
            // console.log("^^^^^^^^^^^^^^^^^^^^^");
            // console.log(verified);
            // console.log("^^^^^^^^^^^^^^^^^^^^^");
            next();
            return;
        } catch(err){
            res.status(400).send("Invalid Token, LogIn Again!!");
            return;
        }
         

//    next();

}


const checkUserExist = async function(ID_check){
    user = await User.findById(ID_check);
    if(user){
      return true;
    }
    return false;
  
  }

module.exports = {
    authorize 
}