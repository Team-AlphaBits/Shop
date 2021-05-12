const { resolveInclude } = require("ejs");
const mongoose = require("mongoose");
const passport = require("passport");

const User = mongoose.model("User");
const Product = mongoose.model("Product");
const Carousal = mongoose.model("Carousal");
const Order = mongoose.model("Order");
let default_prod_data = require("../models/Product_data");
let productDatas = default_prod_data.Products;  

//SEARCHING FOR RESult
const getSearchResults = function({query}, res) {
  //  console.log(query);
    if(!query.query) {
        return res.json({ err: "Missing a query.!" });
    }
    let searchingFor = escapeRegex(query.query);
    Product.find({$or:[{title: { $regex: searchingFor, $options : "i"} },{ cat_id: { $regex: searchingFor, $options : "i"} },{ short_desc: { $regex: searchingFor, $options : "i"} }]}, 'title home_image short_desc cat_id price ', (err, results) => {
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
    catch(err){
        return res.status(500).send(err);
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
catch(err){
    res.status(400).send(err);
}
}

const getUserByID =  async function(req, res){
    try{
    let userId = req.user,userData = null;
    if(userId){
        userData = await User.findById(userId,'user_name email cart');
        }
    res.status(200).json({userData});
    }catch(err){
        res.status(400).send("ERROR IN FETCHING USER DATA!!");
    }
    
}

const addToCart =  function(req, res){
    //testing
   try{
    var user_id = req.user;                 // NEED USER INFO FROM CLIENT
    var prod_id = req.params.prodId;
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
       
        User.find({"_id":user_id,"cart.cartlist.product_id" : prod_id}, function (err,result){
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
        User.findOneAndUpdate({"_id":user_id,"cart.cartlist.product_id":prod_id}, 
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
    

}).catch(err => console.log(err));
}).catch(err => console.log(err));

}catch(err){
    res.status(500).send(err);
}

}


const viewCart = async function(req, res){
    try{
    var userid = req.user;
    cartData = await User.findById(userid , 'user_name cart');
    
    res.status(200).json({message: "Cart Data fetched successfully" , cartData});
}
catch(err){
    res.status(400).send(err);
}
    
}

const getProductByCategory = async function(req, res){
    try{
    let category = req.params.category_name;
    let userId = req.user,userData = null;
    if(userId){
    userData = await User.findById(userId,'user_name email cart');
    }
    console.log("________CATEGORY Filter___________");
    // console.log(category);
    // console.log("__________________________________");
    let productData = await Product.find({"cat_id": category },'title home_image short_desc cat_id price ');
    res.status(200).json({userData, productData});
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

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
/////////////////////////////////////////////////////////////////////
///////////////-CALCULATING PRICES AFTER UPDATE-////////////////////
///////////////////////////////////////////////////////////////////
async function update_price(user_id){
    
    return new Promise(function(resolve, reject) {
        let tmp;
    console.log("Calculating TOTAL PRICE");
    
    User.findById(user_id ,'user_name email cart', function (err, user_data){
        if(err){
            res.json("ERROR IN SENDING DATA!!");
            reject(err);
            }
            
            tmp =user_data;
            // console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
            // console.log(tmp.cart);                                              //WHATS INSIDE CART HERE IT IS..
            let tot_price = 0;
            let tot_product = 0;
            console.log("*");
            for(var i=0;i<tmp.cart.cartlist.length;i++){
                let q = convert_price(tmp.cart.cartlist[i].price);
                tot_price += tmp.cart.cartlist[i].quantity * q;
                // tot_product += tmp.cart.cartlist[i].quantity;
            }
            // console.log(tot_price);
            tmp.cart.total_price = tot_price;
            tmp.cart.total_product = tmp.cart.cartlist.length;
            console.log("*");
            // console.log("^^^^^^^^^^^^^^^^^^^^^CART^^^^^^^^^^^^^^^^^^^^^^^^");
            // console.log(tmp)
            //     console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
            // }
           tmp.save(function(err , suc) {
               if(err){
                   console.log("ERROR IN SAVING CART ADDITIONAL INFO");
                   reject(err);
               }
               console.log("SAVING DONE");
            //    console.log(suc);                         //CHECKING IF IS WORKING OR NOT
                resolve(user_data);
           });
        });
        // reject("did't do user ops!");
// }
// ).then(()=>{
//     console.log("===============FINAL  DATA AFTER CALCULATION=====================");
//     console.log(tmp);
//     return tmp;
});
}
const increaseQuantityByValue = async function(req, res){
    let userID = req.user;
    let prodID = req.params.prodId;
    let value = req.params.value;
    if(value>10){
        value = 10;
    }
    try{
    await User.findOneAndUpdate({"cart.cartlist.product_id":prodID,"_id": userID}, 
                {'cart.cartlist.$.quantity': value },function(err,suc){
                if(err){
                    console.log(err);
                }
                if(!suc){        
                    console.log("PRODUCT DATA NOT FOUND ERRORR!!!!!!!!!!!!");
                     return res.json({message : "ERROR GETTING NULL DATA"});
                }
                    console.log("++++++++++++++++++++++++++++++++");
                    console.log(suc);
                    console.log("++++++++++++++++++++++++++++++++");     
            }
        );
    }
    catch(err){
         return res.status(500).send("Error while increasing product quatity by value");
    }
    try{
        let userData = await update_price(userID);
         res.status(200).json({message: "Quantity increased..!!!!",userData});
    }
    catch(err){
        return res.status(500).send("Error after increasing product quatity by value while updating userData!!");
    }
}

const increaseQuantity = function(req, res){
    try{
    let user_id = req.user;                 // NEED USER INFO FROM CLIENT
    let prod_id = req.params.prodId;

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
                    return res.status(202).json({message : "ERROR GETING NULL DATA"});
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
    catch(err){
       return res.status(500).send(err);
    }
}


const decreaseQuantity = function(req, res){
    try{
    let user_id = req.user;                 // NEED USER INFO FROM CLIENT
    let prod_id = req.params.prodId;
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
                return res.status(202).json({message : "ERROR GETING NULL DATA"});
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
    catch(err){
        return res.status(500).send(err);
    }
}

const removeProduct = async function(req, res) {
    let prodID = req.params.prodId;
    let userID = req.user;
    console.log("Removing product with id:" + prodID);
    try{
    await User.updateOne(
        { "_id": userID}, 
        { "$pull": { "cart.cartlist": {"product_id": prodID} }});
    userData = await update_price(userID);
    res.status(200).json(userData);
    }
    catch(err){
       return  res.status(500).send(err);
    }
};



const placeOrder = async function(req, res){
    try {
        let userId = req.user;  
        console.log(userId);
        let userData = await User.findById(userId,'user_name email cart');
        
        // console.log(req.body);
        // console.log(userData);
        
        const orderDetails = {
            userId : userData._id,
            userName: req.body.name,
            email: userData.email,
            productDetails: userData.cart.cartlist,
            totalProducts: userData.cart.total_product,
            totalPrice: userData.cart.total_price,
            mobileNo: req.body.mobileNo,
            address: req.body.addressLine1 +','+ req.body.addressLine2 +','+ req.body.landmark +','+
                    req.body.city +','+ req.body.state+','+ req.body.pincode ,
            paymentMethod: req.body.paymentMethod,
            paymentSuccessful: true,
        }
        if(orderDetails.totalProducts == 0){
            return res.status(201).json("Product list is null!!");
        }
        console.log("***************ORDER DETAILS***************");
        console.log(orderDetails);
        // body.origin && ( orderDetails.origin = body.origin)
        await Order.create(orderDetails,async (err,done) =>{
            if(err){
                return res.status(500).json("Can't Place Order into Database!!");
            }
            console.log("***Order in database feeding***");
            console.log(done);
            console.log("*******************************");
            // res.status(200).json({message: "Order Placed!!"});
            await User.findOneAndUpdate({"_id":userId},{"cart.cartlist" : []},async (err,suc)=>{
                if(err){
                    console.log("************************erere******************");
                    console.log(err);
                    return res.status(500).json("Can't Find User Details!!");
                }
                console.log("Deleting user products!!");
                await update_price(userId);
                return res.status(201).json("Order Placed!!");
            });

        });
        console.log("************************22222******************");
        // res.status(202).json("Something went wrong!!");
        // {
        //     "name":"Dezx",
        //     "mobileNo": 45421,
        //     "addressLine1": "H. No 1",
        //     "addressLine2": "near hospital",
        //     "landmark": "infront og water tank",
        //     "city": "balrampur",
        //     "state": "CG",
        //     "pincode": "492015",
        //     "paymentMethod": "COD"
        // }

       
    }
    catch(err){
        console.log("catcherror");
        console.log(err);
        return res.status(500).json({error: err});
    }
}


const previousOrder = async function(req, res){
    try{
    let userID = req.user;  
    orderDetails = await Order.find({"userId":userID});
    res.status(200).send(orderDetails);
    
}catch(err){
    res.status(500).send("ERROR IN GETTING PREVOUS ORDERS DETAILS!!");
}

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
    removeProduct,  
    increaseQuantity,
    decreaseQuantity,
    convert_price,
    placeOrder,
    increaseQuantityByValue,
    previousOrder,
};