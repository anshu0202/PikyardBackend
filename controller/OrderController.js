const Order = require("../models/OrderModel");
const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Product = require("../models/ProductModel");


const Variant = require("../models/VariantModel");


// Create Order
exports.createOrder = catchAsyncErrors(async (req, res, next) => {


  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const userId = orderItems[0].userId;


  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
   
    paidAt: Date.now(),
    // user: req.user._id,
    userId
  });

  res.status(201).json({
    success: true,
    order,
  });
});

//  Get Single order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  // const order = await Order.findById(req.params.id).populate(
  //     "user",
  //     "name email"
  // );

  const order = await Order.findOne({ _id: req.params.id })


  if (!order) {
    return next(new ErrorHandler("Order not found with this id", 404));
  }

  res.status(200).json({
    success: true,
    order
  });
});

// Get all orders
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  // const orders = await Order.find({user: req.user._id});
  // res.status(200).json({
  //     success: true,
  //     orders
  // });

  



  const order = await Order.find({ userId: req.params.id })

  if (!order) {
    return next(new ErrorHandler("Order not found with this id", 404));
  }

  res.status(200).json({
    success: true,
    order
  });
});

// Get All orders ---Admin
exports.getAdminAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders
  });
});

// update Order Status ---Admin
exports.updateAdminOrder = catchAsyncErrors(async (req, res, next) => {

  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("You have already delivered this order", 400));
  }

  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (o) => {
    
      await updateStock(o.productName, o.quantity,o.size);
    });
  }
  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

async function updateStock(name, quantity, mm) {

  const product = await Variant.findOne({name,mm}); 

  if(product===null || product===undefined){
    return;
  }
 
  product.Stock -= quantity;
  await product.save({ validateBeforeSave: false });
}


// delete Order ---Admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {

  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Order not found with this Id", 404));
  }

  await order.remove();

  res.status(200).json({
    success: true,
  });
});
