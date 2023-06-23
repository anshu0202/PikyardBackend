const Variant = require("../models/VariantModel.js");
const ErrorHandler = require("../utils/ErrorHandler.js");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");


// add Product variant --Admin

// exports.addVariant = catchAsyncErrors(async (req, res, next) => {


//   const name=req.params.id;

     
//     const {
//         price,
//         mm,
//         Stock
//       } = req.body;
//       let productVariant = await Variant.findOne({ name,price,mm });
//       if (productVariant) {
//         return res
//           .status(400)
//           .json({ success: false, message: "This variant of product already exists" });
//       }
//     // const variant = await Variant.create({
//     //      name,
//     //      price,
//     //     mm,
//     //     Stock
//     //   });
//   res.status(201).json({
//     success: true,
//     //  variant,
//   });
// });



exports.addVariant = catchAsyncErrors(async (req, res, next) => {

  // console.log("req body is ",req.body);

  const name=req.params.id;

  // console.log("name is ",name)

  const variants = req.body;

  for (let variant of variants) {
    const {
      price,
      mm,
      Stock
    } = variant;
    
    let productVariant = await Variant.findOne({ name,price,mm });
    if (productVariant) {
      continue;
    }

    const newVariant = new Variant({
      name,
      price,
      mm,
      Stock
    });

    await newVariant.save();
  }
  res.status(201).json({
    success: true,
    message:"Variant added Successfully"
  });
});




// Get All Variants 
exports.getAllVariants = catchAsyncErrors(async (req, res, next) => {
      const productName=req.params.id
     const variants = await Variant.find({name:productName});
  res.status(200).json({
    success: true,
    variants,
  });
});


exports.getVariantDetail=catchAsyncErrors(async(req,res,next)=>{
  const name=req.params.id1;
  const mm=req.params.id2;
  const variant=await Variant.findOne({name,mm});
  if(variant){
    res.status(200).json({
      success: true,
      variant,
    });
  }
  else{
    res.status(200).json({
      success: false,
      message: "No such variant exists",
    });
  }

})
