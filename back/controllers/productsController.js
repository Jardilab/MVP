const products = require("../models/products");
const fetch =(url)=>import('node-fetch').then(({default:fetch})=>fetch(url)); //Usurpación del require

// View All Products --> /api/products
exports.getProducts = async (req, res, next) => {
  const product = await products.find(req.body);
  if (!products) {
    return res.status(400).json({
      success: false,
      error: true
    })
  }
  res.status(200).json({
    success: true,
    count: product.length,
    product,
  })
}

// =======================================================================================================

// View product by ID --> /api/product/id
exports.getProductById = async (req, res, next) => {
  const product = await products.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }
  res.status(201).json({
    success: true,
    message: "Product reference found: ",
    product,
  });
};

// =======================================================================================================

// Add a new product --> /api/product/new
exports.newProduct = async (req, res, next) => {
  const product = await products.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
};

// =======================================================================================================

// Update product --> /api/product/id

exports.updateProduct = async (req, res, next) => {
  let product = await products.findById(req.params.id);

  // Validation 1: The product exists? --> NOT
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  // Validation 2: The product exists? --> YES --> Validate only new or updated attributes
  product = await products.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  // Answer option: The product has been successfully updated
  res.status(200).json({
    success: true,
    message: "Product upgraded successfully",
    product,
  });
};

// =======================================================================================================

// Delete product --> /api/product/id

exports.deleteProduct = async (req, res, next) => {
  const product = await products.findById(req.params.id);

  // Validation 1: The product exists? --> NOT
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  // Validation 2: The product exists? --> YES --> Answer Option: The product has been successfully removed
  await products.remove();
  {
    res.status(200).json({
      success: true,
      message: "Product removed successfully"
    });
  }
};

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

//viewProductById('63456a8d9163cb9dbbcaa235'); method test