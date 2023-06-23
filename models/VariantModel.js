const mongoose = require("mongoose");

const variantSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please add name of variant"]
    },
    price:{
        type:Number,
        required: [true, "Please add a price for your product"],
        maxLength:[8, "Price can not exceed than 8 characters"],
    },
    mm:{
        type:Number,
        required:[true,"Please give size of product"]
    },
    Stock:{
        type:Number,
        required:[true,"Please add the stock of the product"]
    }
})
module.exports = mongoose.model("Variant",variantSchema);