
const mongoose = require("mongoose");
const crypto = require("crypto");


// console.log("=================");
// console.log("=================");
// console.log("CHECKING");


// console.log("=================");
// console.log("=================");




const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true 
  }, 
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: String,
  salt: String,
  
  
});

userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(64).toString("hex");
  this.password = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex");

}

  userSchema.methods.validatePassword = function(password){
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex");
    return hash === this.password

  }


mongoose.model("User", userSchema); 