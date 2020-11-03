const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("User");
 


//REGISTER USER
const registerUser = function ({ body }, res) {
  //registration form req 
  console.log(body);
 
  if (
    !body.user_name ||
    !body.email ||
    !body.password 
    // ||
    // !body.password_confirm
  ) {
    return res.send({ message: "ALl Fields are required." });
  }

  // if (body.password !== body.password_confirm) {
  //   return res.send({ message: "Password doesn't match." });
  // }

  const user = new User();
  user.user_name = body.user_name.trim();

  user.email = body.email;
  user.setPassword(body.password);
 
  user.save((err, newUser) => {
    if (err) {
      console.log(err.errmsg);
      if (err.errmsg && err.errmsg.includes("duplicate key error")) {
      //  console.log("__________________ERROR___________________");
        return res.json({ message: "Email already exists.!" });
      }

      return res.json({ message: "stop playing with registration.." });

      // res.status(400).json(err);
    } else {
      
      
       
      const token = newUser.getJwt();
      res.status(200).json(token);
    }
  });
};
//JWT IMPLEMENTED
const loginUser = function (req, res) {
                                                   //authentication req
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(404).json(err);
    }
    if (user) {
      const token = user.getJwt();
      res.status(201).json(token);
    } else {
      res.status(401).json(info);               //error mssg send back
    }
  })(req, res);
};




module.exports = {
  registerUser,
  loginUser,
 
};
