const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const producto = require("../models/products");
const APIFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");
const fetch = (url) => import('node-fetch').then(({ default: fetch }) => fetch(url)); //Usurpación del require

// View All Products --> /api/products
exports.getProducts = catchAsyncErrors(async (req, res, next) => {
  const resPerPage = 4;
  const productsCount = await producto.countDocuments();

  const apiFeatures = new APIFeatures(producto.find(), req.query)
    .search()
    .filter();

  let products = await apiFeatures.query;
  let filteredProductsCount = products.length;
  apiFeatures.pagination(resPerPage);
  products = await apiFeatures.query.clone();

  res.status(200).json({
    success: true,
    productsCount,
    resPerPage,
    filteredProductsCount,
    products
  })
})

// =======================================================================================================

// View product by ID --> /api/product/id
exports.getProductById = catchAsyncErrors(async (req, res, next) => {
  const product = await producto.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404))

  }

  res.status(200).json({
    success: true,
    message: "Product reference found: ",
    product
  })
})

// =======================================================================================================

// Add a new product --> /api/product/new
exports.newProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await producto.create(req.body);

  res.status(201).json({
    success: true,
    product
  })
})

// =======================================================================================================

// Users comments --> Create - Update
exports.createUpdateComments = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, idProduct } = req.body;

  const userComment = {
    nameCustomer: req.user.name,
    rating: Number(rating),
    comment
  }

  const product = await producto.findById(idProduct);

  const isCommented = product.comments.find(item =>
    item.nameCustomer === req.user.name)

  if (isCommented) {
    product.comments.forEach(userComment => {
      if (userComment.nameCustomer === req.user.name) {
          userComment.comment = comment,
          userComment.rating = rating
      }
    })
  } else {
    product.comments.push(userComment)
    product.scoreProduct = product.comments.length
  }

  product.rating = product.comments.reduce((accumulator, userComment) =>
    userComment.serviceRating + accumulator, 0) / product.comments.length

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "Thank you for leaving your comment!."
  })
})

// View all comments of a product
exports.getComments = catchAsyncErrors(async (req, res, next) => {
  const product = await producto.findById(req.query.id)

  res.status(200).json({
    success: true,
    comment: product.comment
  })
})

// Delete comment of a product
exports.deleteComments = catchAsyncErrors(async (req, res, next) => {
  const product = await producto.findById(req.query.idProduct);

  const comm = product.comment.filter(userComment =>
    userComment._id.toString() !== req.query.idReview.toString());

  const scoreProduct = comm.length;

  const rating = product.comm.reduce((accumulator, userComment) =>
    userComment.rating + accumulator, 0) / comm.length;

  await producto.findByIdAndUpdate(req.query.idProduct, {
    comm,
    rating,
    scoreProduct
  }, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  })
  res.status(200).json({
    success: true,
    message: "comment deleted successfully."
  })

})

// =======================================================================================================

// Update product --> /api/product/id

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await producto.findById(req.params.id)

  // Validation 1: The product exists? --> NOT
  if (!product) {
    return next(new ErrorHandler("Product not found", 404))
  }

  // Validation 2: The product exists? --> YES --> Validate only new or updated attributes
  producto = await producto.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  })

  // Answer option: The product has been successfully updated
  res.status(200).json({
    success: true,
    message: "Product upgraded successfully",
    product
  })
})

// =======================================================================================================

// Delete product --> /api/product/id

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await producto.findById(req.params.id);

  // Validation 1: The product exists? --> NOT
  if (!product) {
    return next(new ErrorHandler("Product not found", 404))
  }

  // Validation 2: The product exists? --> YES --> Answer Option: The product has been successfully removed
  await producto.remove()
  res.status(200).json({
    success: true,
    message: "Product removed successfully"
  })
})

// =======================================================================================================

// View All Products - FETCH

function viewProducts() {
  fetch("http://localhost:4000/api/products")
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.error(err))
}

//viewProducts(); Invoke the created method to test the query.

//View by ID
function viewProductById(id) {
  fetch("http://localhost:4000/api/product/" + id)
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.error(err))
}

// //viewProductById('000'); method test