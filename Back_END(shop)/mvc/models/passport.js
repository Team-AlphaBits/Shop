// const { Strategy } = require("passport");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

var opts = {}
opts.jwtFromRequest = function(req) { // tell passport to read JWT from cookies
  var token = null;
  if (req && req.cookies){
    token = req.cookies['jwt']
  }
  // console.log("Extracting COOKIES!!",token); 
    return token;
}
opts.secretOrKey = process.env.JWT_TOKEN;
// console.log("++******************++");
// console.log(opts);
// console.log("++******************++");

passport.use(new localStrategy(
  { usernameField: "email" },
  (username, password, done) => {
    console.log("_______AUTHERIZATION_________");
    User.findOne({ email: username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, {
          message: "Incorrect email.",
        });
      }

      if (!user.validatePassword(password)) {
        return done(null, false, {
          message: "Incorrect Password.",
        });
      }
      return done(null, user);
    });
  }
));



// const jwtOptions = {
//   jwtFromRequest: ExtractJwt.fromHeader('jwt'),
//   secretOrKey: process.env.JWT_TOKEN,
  
// };
// console.log(jwtOptions);
passport.use(new JwtStrategy(
  opts,
  function(jwt_payload, done) {
  console.log("JWT BASED  VALIDATION GETTING CALLED")
  console.log("JWT", jwt_payload)
  if (checkUserExist(jwt_payload._id)) {

      return done(null, jwt_payload._id);
  } else {
      
      return done(null, false);
  }
}));


passport.serializeUser(function(user, done) {
  
  done(null, user);
})
passport.deserializeUser(function(obj, done) {
 
  done(null, obj);
})

const checkUserExist = async function(ID_check){
  user = await User.findById(ID_check);
  if(user){
    return true;
  }
  return false;

}


module.exports = passport;

