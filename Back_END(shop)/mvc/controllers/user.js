const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("User");

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
      if (err.errmsg && err.errmsg.include("duplicate key error")) {
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
      res.status(401).json(info);
    }
  })(req, res);
};

module.exports = {
  registerUser,
  loginUser,
};
