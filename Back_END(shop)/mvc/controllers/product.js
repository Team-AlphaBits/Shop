const { resolveInclude } = require("ejs");
const mongoose = require("mongoose");
mongoose.set('useFindAndModify', false);
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

const getUserByID = function(req, res){
    user_id = req.params.userid;
    User.findById(user_id, function(err, User_data){
        if(err){
            res.send("ERROR IN SENDING DATA!!");
            }
            res.json(User_data);
    });
}

const addToCart = function(req, res){
    //testing
   
    var user_id = req.body.user_id;                 // NEED USER INFO FROM CLIENT
    var prod_id = req.params.prodid;
    var cart_data;
    
    let p1 = new Promise(function(resolve, reject) {

        User.find({"_id":user_id},function(err ,User_data) {

        if(err){
            reject("ERROR IN FETCHING USER DATA");
            console.log("ERROR IN SENDING DATA!!");
            }
           console.log("SUCCESSFULL ON RETREIVING USER_DATA");
             cart_data =  User_data;
    resolve("USER INFO FETCHED");
        //  console.log(cart_data);
    });
});




Promise.all([p1]).then(()=>{
    

//http://localhost:8080/api/add-to-cart/5f984e6563dfba42c45a8291/5f97381a2d9c4010ec3c9303
    //
   // var cart = req.cart;
    
   // PROBLEM NEED FIXING
    var found =false;
    console.log(cart_data.cartlist[0]);
    var tmp = cart_data.cartlist[0];
    console.log(tmp);
    console.log("________________________");


    //ERRORRRRRR
    new Promise(function(resolve, reject){
        if(tmp){
            console.log("******^^^^^^^^^*******");
            resolve();
        }
        User.find({"cart.cartlist.product_id" : prod_id},'', function (err,callback){
        if(err){
            reject("ERROR!!");
            res.send("ERROR IN FINDING PRODUCT IN CART");
        }
        found = true;
        resolve("FOUND..!! PRODUCT EXIST ALREADY..!!");
    });
}).then(()=>{
    if(found){
        User.findOneAndUpdate({"cart.cartlist.product_id":prod_id}, 
            {
                "cart.cartlist.$.quantity": cart.cartlist.$.quantity+1
            },function(err,suc){
                if(err){
                    console.log(err);
                }else{
                    console.log(suc);
                }
            }
        );
    }else{
        // PROBLEM NEED TO INCLUDE PROMISE HERE TOO.
        var tmp_data;
        console.log("Need to add cart from new");
        new Promise(function(resolve, reject) {

            Product.findById(prod_id,function(err ,Prod_data) {
    
            if(err){
                reject("ERROR IN FETCHING USER DATA");
                console.log("ERROR IN SENDING DATA!!");
                }
               console.log("SUCCESSFULL ON RETREIVING CART");
                 tmp_data =  Prod_data;
                 resolve("USER INFO FETCHED");
             //  console.log(cart_data);
        });
    }).then(()=>{
        
        const new_cart_item = {
            product_id : tmp_data._id,
            image : tmp_data.home_image,
            short_desc : tmp_data.short_desc,
            price : tmp_data.price,
            quantity : 1,
        }
        console.log("**********************");
        console.log(new_cart_item);
        console.log("**********************");
    //    User.findOne({ '_id': user_id }, function(err, user_data) {
    //        if(err){
    //             return res.send({ error : err});
    //        }
    //        if(!user_data){
    //            return res.status(404).send({message: "USER DATA NOT FOUND.!!"});
    //        }
           
    //         user_data.cart.cartlist.push(new_cart_item);
    //         console.log("**********************");
    //         console.log("**UPDATED CART INFO**");
    //         console.log(user_data);
    //         console.log("**********************");
    //         user_data.save(function(err, updated_user_data){
    //             if(err){
    //                 console.log("ERRRRRRRRRRRRRRRRRRRRRR");
    //                 return res.send({error: err});
    //             }
    //            // res.send(updated_user_data);
    //         });
           
    //    }) 
  
    User.findOneAndUpdate(
        { _id: user_id }, 
        { $push: { "cart.cartlist": new_cart_item  } },
       function (err, suc) {
             if (err) {
                 console.log(err);
                 
             } 
         });


    });

    }
    User.findById(user_id , 'cart', function (err, user_data){
        if(err){
            res.send("ERROR IN SENDING DATA!!");
            next();
            }
            console.log(user_data);
           // res.json({message: "ADD TO CART SUCCESSFULL",user_data});
    });
   res.json({message: "ADD TO CART SUCCESSFULL"});
}).catch(err => console.log(err));
});
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
    getUserByID,
    addToCart,
    viewCart,
};