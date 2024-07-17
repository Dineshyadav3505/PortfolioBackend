const  Product= require("../Models/analysisModel");
const ErrorHandler = require("../Utils/errorHandler");
const catchAsyncErrors = require("../Middleware/catchAsyncErrors");
const ApiFeatures = require("../Utils/ApiFeatures");


///// Create Product --Admin
exports.createProduct = catchAsyncErrors(async (req, res, next)=>{z
  const product = await Product.create(req.body);
  res.status(201).json({
      success:true,
      product
  });
});

///// update edit proudct --Admin
exports.updateProduct = catchAsyncErrors( async (req, res, next ) => {
  
    let product = await Product.findById(req.params.id);

    if (!product) {
      return next (new ErrorHandler("Product not found",404));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false
    });

    res.status(200).json({
      success: true,
      product
    });
});


///// Delete product --Admin
exports.deleteProduct =  catchAsyncErrors(async (req, res, next) => {
  
    const product = await Product.findById(req.params.id);

    if (!product) {
      return next (new ErrorHandler("Product not found",404));
    }

    await product.deleteOne(); // Use deleteOne() instead of remove()

    res.status(200).json({
      success: true,
      message: "Product deleted"
    });
  
});


////// find all products
exports.getAllProduts = catchAsyncErrors(async (req, res) => {
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
  const products = await apiFeatures.query;

  res.json({
    success: true,
    products,
  });
});


////// find Single products
exports.getProdutsDetails = catchAsyncErrors( async (req, res, next)=>{

  const product = await Product.findById(req.params.id);

    if (!product) {
      return next (new ErrorHandler("Product not found",404));
    }

    res.status(200).json({
      success: true,
      product
    });
})