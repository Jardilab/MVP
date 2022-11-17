const express = require("express");
const router = express.Router();
const {
  getProducts,
  newProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getAdminProducts,
  createUpdateComments,
  getComments,
  deleteComments,
  } = require("../controllers/productsController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/products").get(getProducts);
router.route("/product/new").post(isAuthenticatedUser, authorizeRoles("admin"), newProduct);
router.route("/product/:id").get(getProductById);
router.route("/product/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct);
router.route("/product/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);
router.route("/admin/products").get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);

router.route("/comment").put(isAuthenticatedUser, createUpdateComments);
router.route("/comments").get(isAuthenticatedUser, getComments);
router.route("/comment").delete(isAuthenticatedUser, deleteComments);

module.exports = router;