const express = require("express");
const router = express.Router();
const {
  getProducts,
  newProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productsController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

// Test authentication -- Route for view getProducts
// router.route('/products').get(isAuthenticatedUser, authorizeRoles("admin"), getProducts)

// Build route view all products
router.route("/products").get(getProducts);

// Build route view products by ID
router.route("/product/:id").get(getProductById);

// Build route view a new product
router.route("/product/new").post(isAuthenticatedUser, authorizeRoles("admin"), newProduct);

// Build route update product by ID
router.route("/product/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct);

// Build route delete product by ID
router.route("/product/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

module.exports = router;