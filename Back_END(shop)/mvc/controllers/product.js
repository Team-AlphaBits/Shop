const { resolveInclude } = require("ejs");
const mongoose = require("mongoose");
const passport = require("passport");

const User = mongoose.model("User");
const Product = mongoose.model("Product");
const Carousal = mongoose.model("Carousal");
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
    
    if(req.params.pass != 'reseting') res.send({message: "NOT AUTHORIZE"});

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
        return res.status(500).send({ error : err});
    }
    res.status(200).send(new_product);
});
}

const sendProductData = async function(req, res) {
    let productData,carousalData,userData;
    try{
    var userId = req.user;
    if(userId){
    userData = await User.findById(userId,'user_name email cart');
    }else{
        userData = null;
    }
    }
    catch{
        return res.status(500).send("ERROR IN SENDING userData!!");
    }
    let p1 = new Promise(function(resolve, reject) {
        Product.find({},'title home_image short_desc cat_id price ', function(err, data){
    if(err){
        reject("ERROR!!");
        res.status(500).send("ERROR IN SENDING ProdData!!");
    }
    productData = data;
    resolve();
         });
    });

    let p2 = new Promise(function(resolve, reject) {

        Carousal.find({},function(err, data){
            if(err){
                reject("ERROR");
                res.status(500).send("ERROR IN SENDING CAROUSAL DATA");
            }
            carousalData = data;
            resolve();
        });
    });
    Promise.all([p1,p2]).then(()=>{
    res.status(200).json({userData,productData,carousalData});
});
}

const getProductByID = async function(req, res){
    try{
    let userData = null;
    var userId = req.user;
    if(userId){
    userData = await User.findById(userId,'user_name email cart');
    }

    product_id = req.params.id;
    productData = await Product.findById(product_id)
    res.status(200).json({productData,userData});
}
catch{
    res.status(400).send("ERROR IN SENDING PRODUCT DATA!!");
}
}

const getUserByID =  function(req, res){
    user_id = req.params.userid;
    User.findById(user_id, function(err, User_data){
        if(err){
            res.send("ERROR IN SENDING DATA!!");
            }
            res.status(200).json(User_data);
    });
}

const addToCart =  function(req, res){
    //testing
   
    var user_id = req.user;                 // NEED USER INFO FROM CLIENT
    var prod_id = req.params.prodid;
    var cart_data;
    
    new Promise(function(resolve, reject) {

        User.find({"_id":user_id},function(err ,User_data) {

        if(err){
            reject("ERROR IN FETCHING USER DATA");
            console.log("ERROR IN SENDING DATA!!");
            }
           console.log("SUCCESSFULL ON RETREIVING USER_DATA");
             cart_data =  User_data;
            //   console.log(cart_data);
    resolve("USER INFO FETCHED");
    });
}).then(()=>{

   // PROBLEM NEED FIXING
    var found =false;
    new Promise(function(resolve, reject){
        // if(tmp){
        //     console.log("******^^^^^^^^^*******");
        //     resolve();
        // }
       
        User.find({"cart.cartlist.product_id" : prod_id}, function (err,result){
        if(err){
            reject("ERROR!!");
            res.send("ERROR IN FINDING PRODUCT IN CART");
        }
        if(result.length)  {
         found = true;
        }
        console.log("**********____________**********");
        console.log(found);
        console.log(result);
        console.log("**********____________**********");
        resolve("FOUND..!! PRODUCT EXIST ALREADY..!!");
    });
}).then(()=>{

    if(found){
        new Promise((resolve, reject)=> {
        User.findOneAndUpdate({"cart.cartlist.product_id":prod_id}, 
                { $inc: { [`cart.cartlist.$.quantity`]: 1 } }, {new: true}
            ,function(err,suc){
                if(err){
                    console.log(err);
                    reject("ERROR!!");
                }else{
                    console.log(suc);
                    console.log("************************");
                    console.log("____IM HERE YOO HOO .. SUCCESS IN INC QUANTITY____");
                    console.log("***********************");
                    resolve("done"); 
                }
            }
        );
    }).then(()=> { 
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        console.log("message: ADD TO CART SUCCESSFULL ");
        update_price(user_id).then((tmp) =>{
            userData = tmp
        
        
            console.log("*********************SENDING DATA*******************");
            console.log(userData);
            res.status(200).send({message: "ADD TO CART SUCCESSFULL" ,userData});
        }).catch(err => console.log(err));
        }).catch(err => console.log(err));
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
        // console.log(convert_price(new_cart_item.price));
        console.log("**********************");
        new Promise((resolve, reject)=> {
        User.findOneAndUpdate(
            { _id: user_id }, 
            { $push: { "cart.cartlist": new_cart_item  } },
           function (err, suc) {
                 if (err) {
                     console.log(err);
                     reject("ERROR!!");
                 }
                 resolve("done"); 
             });
            
    
    
        }).then(()=> { 
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");

            console.log("message: ADD TO CART SUCCESSFULL ");
            update_price(user_id).then((tmp) =>{
                userData = tmp
            
            
                console.log("*********************SENDING DATA*******************");
                console.log(userData);
                res.status(200).send({message: "ADD TO CART SUCCESSFULL" ,userData});
            });
            }).catch(err => console.log(err));
            }).catch(err => console.log(err));
    
        }
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
    // User.findById(user_id , 'cart', function (err, user_data){
    //     if(err){
    //         res.send("ERROR IN SENDING DATA!!");
    //         next();
    //         }
    //         console.log("||||||||||||||FINAL RESULT AFTER ADD_TO_CART OPERATION|||||||||||||||||||");
    //         console.log(user_data);
    //         console.log("|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||");
    //        // res.json({message: "ADD TO CART SUCCESSFULL",user_data});
    // });
   

}).catch(err => console.log(err));
}).catch(err => console.log(err));



}


const viewCart = function(req, res){
    var userid = req.user;
    User.findById(userid , 'cart', function (err, cart_data){
        if(err){
            res.send("ERROR IN SENDING DATA!!");
            next();
            }
            res.json(cart_data);
    });
}

const getProductByCategory = async function(req, res){
    try{
    let category = req.params.category_name;
    let userId = req.user,userData = null;
    if(userId){
    userData = await User.findById(userId,'user_name email cart');
    }
    console.log("________CATEGORY Filter___________");
    console.log(category);
    console.log("__________________________________");
    let productData = await Product.find({"cat_id": category },'title home_image short_desc cat_id price ');
    res.status(201).json({userData, productData});
}
catch{
    res.status(400).send("ERROR IN CATEGORY FILTER");
}
}

const uploadCarousalForm =  function({body}, res){
    
    const data = {
        carousal_images : body.image
    }
    
   
    Carousal.create(data , function(err, done) {
        if(err){
           return res.send({error: err});
        }
        res.send(done);
    })
}

/////////////////////////////////////////////////////////////////////
///////////////-regex for converting price-/////////////////////////
///////////////////////////////////////////////////////////////////
function convert_price(text){
    console.log("<<<<<<<<<<<<<<<<CONVERTING>>>>>>>>>>>>>>>>>");
    return (parseFloat(text.replace( /[^\d\.]*/g, '')));
}

/////////////////////////////////////////////////////////////////////
///////////////-CALCULATING PRICES AFTER UPDATE-////////////////////
///////////////////////////////////////////////////////////////////
async function update_price(user_id){
    
    return new Promise(function(resolve, reject) {
        let tmp;
    console.log("Calculating TOTAL PRICE");
    
    User.findById(user_id ,'user_name email cart' , function (err, user_data){
        if(err){
            res.send("ERROR IN SENDING DATA!!");
            next();
            }
            
            tmp =user_data;
            // console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
            // console.log(tmp.cart);                                              //WHATS INSIDE CART HERE IT IS..
            tot_price = 0;
            
            for(var i=0;i<tmp.cart.cartlist.length;i++){
                    let q = convert_price(tmp.cart.cartlist[i].price);
                    tot_price += tmp.cart.cartlist[i].quantity * q;
            }
            console.log(tot_price);
            tmp.cart.total_price = tot_price;
            tmp.cart.total_product = tmp.cart.cartlist.length;
            // console.log("^^^^^^^^^^^^^^^^^^^^^CART^^^^^^^^^^^^^^^^^^^^^^^^");
            // console.log(tmp)
            //     console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
            // }
           tmp.save(function(err , suc) {
               if(err){
                   console.log("ERROR IN SAVING CART ADDITIONAL INFO");
               }
            //    console.log("SAVING DONE");
            //    console.log(suc);                         //CHECKING IF IS WORKING OR NOT
            resolve(tmp);
           });
           
    });
// }
// ).then(()=>{
//     console.log("===============FINAL  DATA AFTER CALCULATION=====================");
//     console.log(tmp);
//     return tmp;
});
}


const increaseQuantity = function(req, res){
    let user_id = req.user;                 // NEED USER INFO FROM CLIENT
    let prod_id = req.params.prodid;

    new Promise(function(resolve, reject) {

        User.findOneAndUpdate({"cart.cartlist.product_id":prod_id ,"_id": user_id}, 
                { $inc: { [`cart.cartlist.$.quantity`]: 1 } }, {new: true}
            ,function(err,suc){
                if(err){
                    console.log(err);
                    reject("ERROR!!");
                }
                if(!suc){                         // ERRRO HANDLING FOR NULL DATA

                    console.log("PRODUCT DATA NOT FOUND ERRORR!!!!!!!!!!!!");
                    res.json({message : "ERROR GETING NULL DATA"});
                    reject();
                }
                    console.log("++++++++++++++++++++++++++++++++");
                    console.log("____SUCCESS IN INC QUANTITY____");
                    console.log(suc);
                    console.log("++++++++++++++++++++++++++++++++");
                    resolve("done"); 
                
            }
        );
}).then(()=> {
    update_price(user_id).then((tmp) =>{
        userData = tmp
    
    
        console.log("*********************SENDING DATA*******************");
        console.log(userData);
        res.status(200).json({message: "Quantity increased..!!!!",userData});
       
    }).catch(err => console.log(err));

    
  


}).catch(err => console.log(err));
}


const decreaseQuantity = function(req, res){
    let user_id = req.user;                 // NEED USER INFO FROM CLIENT
    let prod_id = req.params.prodid;
    let curr_qnt;
    
        
        new Promise(function(resolve, reject) {
        User.findOne({"cart.cartlist.product_id":prod_id ,"_id": user_id},'cart.cartlist.product_id.$ cart.cartlist.quantity cart.cartlist.short_desc',function(err,user_data){
            if(err){
                console.log(err);
                reject();
                next();
            }
            if(!user_data){                         // ERRRO HANDLING FOR NULL DATA

                console.log("PRODUCT DATA NOT FOUND ERRORR!!!!!!!!!!!!");
                res.json({message : "ERROR GETING NULL DATA"});
                reject();
            }
            curr_qnt = user_data.cart.cartlist[0].quantity;
           
            resolve();
        });
    }).then(()=>{
        if(curr_qnt > 1){
            new Promise((resolve, reject)=> {  
        User.findOneAndUpdate({"cart.cartlist.product_id":prod_id ,"_id": user_id}, 
                { $inc: { [`cart.cartlist.$.quantity`]: -1 } }, {new: true}
            ,function(err,suc){
                if(err){
                    console.log(err);
                   reject("ERROR!!");
                }else{
                    console.log(suc);
                    console.log("++++++++++++++++++++++++++++++++");
                    console.log("____SUCCESS IN DECR QUANTITY____");
                    console.log("++++++++++++++++++++++++++++++++");
                   resolve("done"); 
                }
            }
        );
    }).then(()=> {


        
        update_price(user_id).then((tmp) =>{
            userData = tmp
        
        
            console.log("*********************SENDING DATA*******************");
            console.log(userData);
           
            res.status(200).json({message: "Quantity Decreased..!!!!",userData});
           
        }).catch(err => console.log(err));
    
    
    }).catch(err => console.log(err));
    }else{                              //NNED TO WORK FROM HERE
        new Promise((resolve, reject)=> {                   // TO DO>> REMOVE PRODUCT FROM CART
            User.updateOne(
                { "_id": user_id}, 
                { "$pull": { "cart.cartlist": {"product_id": prod_id} }} ,
                // { safe: true, multi:true },
               function (err, suc) {
                     if (err) {
                         console.log(err);
                         reject("ERROR!!");
                     }

                     console.log("___---_____------_____---___");
                     console.log(suc);
                     console.log("___---_____------_____---___");
                     resolve("done"); 
                 });
                }).then(()=> {


        
                    update_price(user_id).then((tmp) =>{
                        userData = tmp
                    
                    
                        console.log("*********************SENDING DATA*******************");
                        console.log(userData);
                       
                        res.status(200).json({message: "Quantity Decreased..!!!!",userData});
                       
                    }).catch(err => console.log(err));
                
                
                }).catch(err => console.log(err));
    }
    


}).catch(err => console.log(err));
}


module.exports = {
    reset,              //development purpose only
    getSearchResults,
    uploadProductsForm,
    uploadCarousalForm,
    sendProductData,
    getProductByID,
    getProductByCategory,
    getUserByID,
    addToCart,
    viewCart,
    increaseQuantity,
    decreaseQuantity,
    convert_price,
};