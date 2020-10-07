const express = require('express');
const router = express.Router();
const middleware = require("./middleware/middleware");


const usersCtrl = require("../controllers/user");
const Product_data = require('../models/Product_data');


router.post("/register",usersCtrl.registerUser);

router.post("/login",usersCtrl.loginUser);

router.get("/generate-feed", middleware.authorize, usersCtrl.generateFeed);

router.get("/getSearchResults", usersCtrl.getSearchResults);

router.delete("/delete-all-products", usersCtrl.deleteAllProduct);

router.delete("/delete-all-users", usersCtrl.deleteAllUser);

router.get("/insert-products", usersCtrl.insertProducts);

router.get("/upload-products", usersCtrl.uploadProductsForm);

router.get("/", usersCtrl.sendProductData);

module.exports = router;
