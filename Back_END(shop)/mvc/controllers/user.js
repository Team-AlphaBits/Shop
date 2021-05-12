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
        return res.status(400).json({ message: "Email already exists.!" });
      }

      return res.json({ message: "stop playing with registration.." });

      // res.status(400).json(err);
    } else {
      
      
       
     // const token = newUser.getJwt();
      res.status(200).send("Successfully Registered !!");
    }
  });
};
//JWT IMPLEMENTED
const loginUser =  function (req, res) {
                                                   //authentication req
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  passport.authenticate("local",async (err, user, info) => {
    if (err) {
      return res.status(404).json(err);
    } 
    if (user) {
      const token = user.getJwt();
      res.cookie('jwt', token, { maxAge: 7200000, httpOnly: true })
      // res.setHeader('jwt', token);
     // console.log(token);
     try{
     userData = await User.findById(user._id,'user_name email cart');
     }
     catch{
      res.status(401).json("Error in retrieving User info!!"); 
     }
      res.status(201).json({mssg: "Logged In!!",userData,token});
    } else {
      res.status(401).json("Incorrect Email or Password!");               //error mssg send back
    }
  })(req, res);
};

const logoutUser = function(req, res){
  if(!req.user){
    res.status(401).send("Login First !!");
    return;
  }
  
  console.log(req.user);
  res.clearCookie('jwt');
  res.send("DONE Logged Out!!");
}



module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
