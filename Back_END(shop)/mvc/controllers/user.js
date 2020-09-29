const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Product = mongoose.model("Product");
const product_data = require("../models/Product_data");

const registerUser = function ({ body }, res) {
  //registration form req

  if (
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.password ||
    !body.password_confirm
  ) {
    return res.send({ message: "ALl Fields are required." });
  }

  if (body.password !== body.password_confirm) {
    return res.send({ message: "Password doesn't match." });
  }

  const user = new User();
  user.firstname = body.first_name.trim();
  user.lastname = body.last_name.trim();

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
      // console.log(user);
      const token = newUser.getJwt();
      res.status(200).json(token);
    }
  });
};
                                                    //working on jwt
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

const generateFeed = function(req, res) {         //need to be done later..
                                                
    res.status(200).json({message: "Genrating posts for user feeds.."});
}

const getSearchResults = function({query}, res) {
  if(!query.query) {
    return res.json({ err: "Missing a query.!" });
  }
  Product.find({name: { $regex: query.query, $options : "i"} }, "name", (err, results) => {
    if(err){
      return res.json({err: err});
    }
    return res.status(200).json({ message: "Getting SEARCH results.", result: results});
  });
}


 // development purpose ONLY 
const deleteAllUsers = function(req, res){
  User.deleteMany({} , (err, info) => {
      if(err) {
        return res.sen({error: err});
      }
      return res.json({ message: "Deleted ALL USERs", info: info}); 
  });
}


const insertProducts = function(req, res){
  User.insertMany( product_data.products , (err, info) => {
      if(err) {
        return res.sen({error: err});
      }
      return res.json({ message: "INSERTED ALL PRODUCTS", info: info}); 
  });
}


module.exports = {
  deleteAllUsers,       //development purpose only
  registerUser,
  loginUser,
  generateFeed,
  getSearchResults,
  insertProducts
};
