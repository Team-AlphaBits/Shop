const express = require('express');
const router = express.Router();
const middleware = require("./middleware/middleware");


const usersCtrl = require("../controllers/user");
const productsCtrl = require("../controllers/product");
const Product_data = require('../models/Product_data');



///////////////////////////////////////////////////////////////
/////////////////////USER ROUTES//////////////////////////////
/////////////////////////////////////////////////////////////

router.post("/register",usersCtrl.registerUser);

router.post("/login",usersCtrl.loginUser);


///////////////////////////////////////////////////////////////
/////////////////////PRODUCTS ROUTES//////////////////////////
/////////////////////////////////////////////////////////////

router.get("/getSearchResults", productsCtrl.getSearchResults);

router.get("/reset", productsCtrl.reset);       //ONLY FOR DEVELOPMENT PURPOSE

router.post("/upload-products", productsCtrl.uploadProductsForm);

router.get("/home", productsCtrl.sendProductData);

router.put("/add-to-cart/:prodid", productsCtrl.addToCart);

router.get("/view-cart/:userid", productsCtrl.viewCart);

router.get("/product/:id", productsCtrl.getProductByID);

module.exports = router;
