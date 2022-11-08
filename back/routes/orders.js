const express=require("express");
const router=express.Router();
const { newOrder, 
    getOrderById, 
    myOrders, 
    getAllOrders,
    updateOrder,
    deleteOrder
} = require("../controllers/ordersController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/order/new").post(isAuthenticatedUser, newOrder)
router.route("/order/:id").get(isAuthenticatedUser, getOrderById)
router.route("/orders/myOrders").get(isAuthenticatedUser, myOrders)

router.route("/admin/viewAllOrders").get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders)
router.route('/admin/order/:id').get(isAuthenticatedUser, authorizeRoles("admin"), getOrderDetails)
router.route("/admin/updateOrder/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
router.route("/admin/deleteOrder/:id").delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder)

module.exports=router;