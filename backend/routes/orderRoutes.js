const express = require('express');
const router =  express.Router();
const {authenticate,authorizeAdmin} = require('../middleware/authMiddleware');
const {markOrderAsDelivered,markOrderAsPaid,findOrderById,
    calculateTotalSalesByDate,calculateTotalSales,countTotalOrders,
    getUserOrders,getAllOrders,createOrder,
} = require("../controllers/orderController");

router.route('/').post(authenticate,createOrder)
.get(authenticate,authorizeAdmin,getAllOrders);

router.route('./mine').get(authenticate,getUserOrders);
router.route('/total-orders').get(countTotalOrders);
router.route('/total-sales').get(calculateTotalSales);
router.route('/total-sales-by-date').get(calculateTotalSalesByDate);
router.route('/:id').get(authenticate,findOrderById);
router.route('/:id/pay').put(authenticate,markOrderAsPaid);

router.route('/:id/deliver').put(authenticate,authorizeAdmin,markOrderAsDelivered);


module.exports = router;