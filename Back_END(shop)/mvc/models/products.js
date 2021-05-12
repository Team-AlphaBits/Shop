const mongoose = require("mongoose");


const productDataSchema = new mongoose.Schema(
    {  
      
      title:{
        type: String,
        required: true,
      },
      home_image: {
        type: String,
        required: true,
      },
      images: {
        type: Array,
        default: null,
      },
      description: {
        type: String,
        required: true,
      },
      price: {
        type: String,
        required: true,
      },
      quantity: {
        type: String,
        required: true,
      },
      short_desc: {
        type: String,
        required: true,
      },
      cat_id: {
        type: String,
        required: true,
      },
      seller_name: {
        type: String,
        required:true,
      },
    
    });

const cartProductList = new mongoose.Schema(
  {
    product_id:{
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    short_desc: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
  
    });

    
const orderSchema =  new mongoose.Schema({
    userId: {
      type: String,
      // required: true,
    },
    userName: {
        type: String,
        // required: true,
    },
    email: {
        type: String,
        // required: true,
    },
    mobileNo: {
        type: Number,
        // required: true,
    },
    totalPrice: {
        type: Number,
        // required: true,
    },
    totalProducts: {
        type: Number,
        // required: true,
    },
    productDetails: [cartProductList],
    address: {
        type: String,
        // required: true,
    },
    paymentMethod:{
        type: String,
        // required: true,
    },
    paymentSuccessful: {
        type: Boolean,
        // required: true,
    },
    date: { type: Date, default: Date.now },

    });

const carousalDataSchema = new mongoose.Schema({
    carousal_images: { 
        type: String,
        required: true,
        
    }
    });




mongoose.model("Product", productDataSchema);
mongoose.model("Order", orderSchema);
mongoose.model("Carousal", carousalDataSchema);