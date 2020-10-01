const mongoose = require("mongoose");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
//const { stringify } = require("querystring");

// console.log("=================");
// console.log("=================");
// console.log("CHECKING");

// console.log("=================");
// console.log("=================");

const productDataSchema = new mongoose.Schema(
{  
  id: {
    type: String,
    required: true,
  },
  title:{
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  short_desc: {
    type: String,
    required: true,
  },
  cat_id: {
    type: String,
    required: true,
  },
  seller_name: {
    type: String,
    required:true,
  },

});

const userSchema = new mongoose.Schema(
  {
  user_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: String,
  salt: String,
  cart: [productDataSchema],

});





userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(64).toString("hex");
  this.password = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
};

userSchema.methods.validatePassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
  return hash === this.password;
};

userSchema.methods.getJwt = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    process.env.JWT_TOKEN
  );
};

mongoose.model("User", userSchema);
mongoose.model("Product", productDataSchema);
