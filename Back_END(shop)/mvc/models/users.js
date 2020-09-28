const mongoose = require("mongoose");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
//const { stringify } = require("querystring");

// console.log("=================");
// console.log("=================");
// console.log("CHECKING");

// console.log("=================");
// console.log("=================");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
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
 // cart: [productDataSchema],

});


const productDataSchema = new mongoose.Schema({  
  
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    default: 10,
  },
  detail: {
    type: String,
    required: true,
  },
  product_image: {
    type: String,
    required: true,
  },
  catergory: {
    type: String,
    required: true,
  },

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
