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
Product.find({name: { $regex: query.query, $options : "i"} }, "name", (err, results) => {
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
const product_details = {
    id: body.id,
    title: body.title,
    image: body.image,
    description: body.description,
    price: body.price,
    quantity: body.quantity,
    short_desc: body.short_desc,
    cat_id: body.cat_id,
    seller_name: body.seller_name
}

body.origin && ( product_details.origin = body.origin)

Product.create(product_details, (err , new_product) => {
    if(err) {
        return res.send({ error : err});
    }
    res.send(new_product);
});
}

const sendProductData = function(req, res, next) {
Product.find({}, function(err, Prod_data){
    if(err){
    res.send("ERROR IN SENDING DATA!!");
    next();
    }
    res.json(Prod_data);
});
}


module.exports = {
    reset,              //development purpose only
    getSearchResults,
    uploadProductsForm,
    sendProductData
};