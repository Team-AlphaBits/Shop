const express = require('express');
const router = express.Router();
const middleware = require("./middleware/middleware");
const passport = require("passport");
const jwt = require('jsonwebtoken');
const usersCtrl = require("../controllers/user");
const productsCtrl = require("../controllers/product");
const Product_data = require('../models/Product_data');



///////////////////////////////////////////////////////////////
/////////////////////USER ROUTES//////////////////////////////
/////////////////////////////////////////////////////////////

router.post("/register",usersCtrl.registerUser);

router.post("/login",usersCtrl.loginUser);

router.get("/logout", middleware.authorize,usersCtrl.logoutUser);

///////////////////////////////////////////////////////////////
/////////////////////PRODUCTS ROUTES//////////////////////////
/////////////////////////////////////////////////////////////

router.get("/getSearchResults",middleware.authorize, productsCtrl.getSearchResults);

router.get("/reset/:pass", productsCtrl.reset);       //ONLY FOR DEVELOPMENT PURPOSE

router.post("/upload-products", productsCtrl.uploadProductsForm);

router.post("/upload-carousal", productsCtrl.uploadCarousalForm);

router.get("/home",middleware.authorize, productsCtrl.sendProductData);

            

router.get("/product/:id",middleware.authorize, productsCtrl.getProductByID);

router.get("/category/:category_name",middleware.authorize, productsCtrl.getProductByCategory);


///////////////////////////////////////////////////////////////////////////////
/////////////////////////PROTECTED ROUTES/////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

router.put("/add-to-cart/:prodid",passport.authenticate('jwt', { session: false }), productsCtrl.addToCart);       //id fetched from client cookie  

<<<<<<< HEAD
<<<<<<< HEAD
///////////////////////////////////////////////////////////////
/////////////////////PRODUCTS ROUTES//////////////////////////
/////////////////////////////////////////////////////////////

router.get("/getSearchResults", productsCtrl.getSearchResults);

router.get("/reset", productsCtrl.reset);       //ONLY FOR DEVELOPMENT PURPOSE

router.post("/upload-products", productsCtrl.uploadProductsForm);
=======
router.get("/view-Cart/",passport.authenticate('jwt', { session: false }), productsCtrl.viewCart);  //user_id from client side
=======
router.get("/view-Cart/",passport.authenticate('jwt', { session: false }), productsCtrl.viewCart);  //id fetched from client cookie  
>>>>>>> origin/master

router.put("/incProd/:prodid",passport.authenticate('jwt', { session: false }), productsCtrl.increaseQuantity);         //id fetched from client cookie  

<<<<<<< HEAD
router.put("/decProd/:prodid",passport.authenticate('jwt', { session: false }), productsCtrl.decreaseQuantity);          //user_id needed from client
>>>>>>> origin/master


router.put("/add-to-cart/:prodid", productsCtrl.addToCart);

router.get("/view-cart/:userid", productsCtrl.viewCart);
=======
router.put("/decProd/:prodid",passport.authenticate('jwt', { session: false }), productsCtrl.decreaseQuantity);          //id fetched from client cookie  
>>>>>>> origin/master

router.get("/product/:id", productsCtrl.getProductByID);

module.exports = router;
