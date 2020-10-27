const { resolveInclude } = require("ejs");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Product = mongoose.model("Product");
let default_prod_data = require("../models/Product_data");
let productDatas = default_prod_data.Products;  

//SEARCHING FOR RESult
const getSearchResults = function({query}, res) {
if(!query.query) {
    return res.json({ err: "Missing a query.!" });
}
Product.find({title: { $regex: query.query, $options : "i"} }, "title", (err, results) => {
    if(err){
    return res.json({err: err});
    }
    return res.status(200).json({ message: "Getting SEARCH results.", result: results});
});
}
// development purpose ONLY 
const reset = function(req,  res){
    let prom1 = new Promise(function(resolve, reject){
    Product.deleteMany({} , (err) => {
        if(err) {
            reject("ERROR");
            return res.send({error: err});
        }
        resolve("SUCCESS ALL PRODUCT DELETED!!");
    });
    });
    
    let prom2 = new Promise(function(resolve, reject){   
    User.deleteMany({} , (err) => {
        if(err) {
            reject("ERROR");
            return res.send({error: err});
        }
        resolve("SUCCESS ALL USERS DELETED!!");
    });
    });

    Promise.all([prom1,prom2]).then(function() {
        
        let p1 = new Promise(function(resolve, reject){
        
        Product.insertMany( productDatas , (err, info) => {
            console.log("________________________");
            console.log("PRODUCTS UPLOADING!");
            console.log("________________________");
            if(err) {
                reject("ERROR!");
                return res.send({error: err});
            }
            resolve("SUCCESSFULLY INSERTED ALL PRODUCT DATA!!"); 
        });
        
        });
        Promise.all([p1]).then(()=>{
            res.json({message: "RESET SUCCESSFULL"});
        });
    });

}
//INSERTING ALL PRODUCTS IN DB
//FOR SELLER PURPOSE TO ADD PRODUCT
const uploadProductsForm = function({body}, res){
    let img = [];
   body.image1 && img.push(body.image1);
   body.image2 && img.push(body.image2);
   body.image3 && img.push(body.image3);
   body.image4 && img.push(body.image4);
const product_details = {
    title: body.title,
    home_image: body.home_image,
    description: body.description,
    price: body.price,
    quantity: body.quantity,
    short_desc: body.short_desc,
    cat_id: body.cat_id,
    seller_name: body.seller_name,
    
    images: img
}
console.log("_____________");
console.log(product_details);
console.log("_____________");

body.origin && ( product_details.origin = body.origin)

Product.create(product_details, (err , new_product) => {
    if(err) {
        return res.send({ error : err});
    }
    res.send(new_product);
});
}

const sendProductData = function(req, res, next) {
Product.find({},'title home_image short_desc cat_id price ', function(err, Prod_data){
    if(err){
    res.send("ERROR IN SENDING DATA!!");
    next();
    }
    res.json(Prod_data);
});
}

const getProductByID = function(req, res){
    product_id = req.params.id;
    Product.findById(product_id, function(err, Prod_data){
        if(err){
            res.send("ERROR IN SENDING DATA!!");
            }
            res.json(Prod_data);
    });
}

const addToCart = function(req, res){
    var cart = req.params.cart;
    var prod_id = req.params.id;
    var found =false;
    User.find({"cart.cartlist.product_id" : prod_id},'', function (err,callback){
        if(err){
            res.send("ERROR IN FINDING PRODUCT IN CART");
        }
        found = true;
    });
    if(found){
        User.update({"cart.cartlist.product_id":prod_id}, {
            $set: {
                "cart.cartlist.$.quantity": cart.cartlist.quantity+1
            }
        });
    }else{
        var tmp_data = getProductByID(prod_id);
        const new_cart_item = {
            product_id : tmp_data._id,
            image : tmp_data.home_image,
            short_desc : tmp_data.short_desc,
            price : tmp_data.price,
            quantity : 1,
        }
        User.update({"cart.cartlist.product_id":prod_id}, {
            $push: {
                "cart.cartlist.$.cartlist": new_cart_item
            }
        });

    }
    res.json({message: "RESET SUCCESSFULL"});
}


const viewCart = function(req, res){
    var userid = req.param._id;
    User.findById(userid , 'cart', function (err, cart_data){
        if(err){
            res.send("ERROR IN SENDING DATA!!");
            next();
            }
            res.json(user_data);
    });
}

module.exports = {
    reset,              //development purpose only
    getSearchResults,
    uploadProductsForm,
    sendProductData,
    getProductByID,
    addToCart,
    viewCart,
};