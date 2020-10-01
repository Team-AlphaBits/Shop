const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Product = mongoose.model("Product");
let default_prod_data = require("../models/Product_data");
let productDatas = default_prod_data.Products;   


//REGISTER USER
const registerUser = function ({ body }, res) {
  //registration form req

  if (
    !body.user_name ||
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
       console.log(user);
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
//MIDDLEWARE
const generateFeed = function(req, res) {
    res.status(200).json({message: "Genrating posts for user feeds.."});
}
//SEARCHING FOR RESult
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
const deleteAllProduct = function(req, res){
  Product.deleteMany({} , (err, info) => {
      if(err) {
        return res.sen({error: err});
      }
      return res.json({ message: "Deleted ALL Products.!", info: info}); 
  });
}

const deleteAllUser = function(req, res){
  User.deleteMany({} , (err, info) => {
      if(err) {
        return res.sen({error: err});
      }
      return res.json({ message: "Deleted ALL USERs.!", info: info}); 
  });
}
//INSERTING ALL PRODUCTS IN DB
const insertProducts = function(req, res){
  Product.deleteMany({}, (err, info) =>{
    if(err) {
      return res.send({error: err});
    }
   // res.json({message: "deleted"});
  Product.insertMany( productDatas , (err, info) => {
    console.log("________________________");
    console.log("PRODUCTS UPLOADING!");
    console.log("________________________");
      if(err) {
        return res.send({error: err});
      }
      return res.json({ message: "INSERTED ALL PRODUCTS", info: info}); 
  });
});
}
//FOR SELLER PURPOSE TO ADD PRODUCT
const uploadProductsForm = function({body}, res){
  const product_details = {
    id: body.id,
    title: body.title,
    image: body.image,
    description: body.description,
    price: body.price,
    quantity: body.quantity,
    short_desc: body.short_desc,
    cat_id: body.cat_id,
    seller_name: body.seller_name
  }

  body.origin && ( product_details.origin = body.origin)

  Product.create(product_details, (err , new_product) => {
      if(err) {
        return res.send({ error : err});
      }
      res.send(new_product);
  });
}

module.exports = {
  deleteAllProduct,       //development purpose only
  deleteAllUser,
  registerUser,
  loginUser,
  generateFeed,
  getSearchResults,
  insertProducts,
  uploadProductsForm
};
