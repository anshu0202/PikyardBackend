const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  shippingInfo: {
    address: {
      type: String,
      required: true,
    },
    // city: {
    //   type: String,
    //   required: true,
    // },
    state: {
      type: String,
      required: true,
    },
    country: {
      type: String,
       required: true,
    },
    // pinCode: {
    //   type: Number,
    //   required: true,
    // },
    phoneNo: {
      type: Number,
       required: true,
    },
  },
  orderItems: [
    {
      productName: {
        type: String,
        required: true,
      },
      productPrice: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
       productImages: {
        // type: String,
        type: Array,
         required: true,
       },
      productId: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
      },
      size:{
        type:Number,
        default:0
      }

    },
  ],
  // user: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: "users",
  //   // required: true,
  // },
  userId:{
    type:String,
    required:[true,"Please give user Id"]
  },
  paymentInfo: {
    id: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  paidAt: {
    type: Date,
    required: true,
  },
  itemsPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  taxPrice: {
    type: Number,
    default: 0,
  },
  shippingPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0,
  },
  orderStatus: {
    type: String,
    required: true,
    default: "Processing",
  },
  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", orderSchema);