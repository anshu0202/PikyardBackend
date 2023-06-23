const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, "Please enter your product name"],
  },
  productPrice: {
    type: Number,
    required: [true, "Please enter your product price"],
  },
  size:{
    type:Number,
    default:0
},   
  productImages:[
    {
        public_id:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required:true,
        },
    }
],
  quantity: {
    type: Number,
    required: [true, "Please enter your product quantity"],
  },
  userId: {
    type: String,
    required: [true, "Please enter your user id"],
  },
  productId: {
    type: String,
    required: [true, "Please enter your user id"],
  },
  Stock: {
    type: Number,
    required: [true, "Please enter your product stock"],
  }
});

module.exports = mongoose.model("Cart", cartSchema);
