const express = require('express');
const router = express.Router();
const middleware = require("./middleware/middleware");


const usersCtrl = require("../controllers/user");
const productsCtrl = require("../controllers/product");
const Product_data = require('../models/Product_data');


router.post("/register",usersCtrl.registerUser);

router.post("/login",usersCtrl.loginUser);


router.get("/getSearchResults", productsCtrl.getSearchResults);

router.get("/reset", productsCtrl.reset);

router.get("/upload-products", productsCtrl.uploadProductsForm);

router.get("/home", productsCtrl.sendProductData);

module.exports = router;
