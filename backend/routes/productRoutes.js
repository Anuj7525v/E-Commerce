const express = require("express");
const  formidable = require("express-formidable");
const router = express.Router();
const {authenticate, authorizeAdmin} = require('../middleware/authMiddleware');
const checkId = require("../middleware/checkId");
const {filterProducts,removeProduct,updateProductDetails,
    fetchProductById,fetchTopProducts,fetchNewProducts,
    addProductReview,fetchAllProducts,fetchProducts,addProduct
} = require('../controllers/productController.js');


router.route('/').get(fetchProducts).post(authenticate,authorizeAdmin, formidable(),addProduct);

router.route('/allproducts').get(fetchAllProducts);
router.route('/:id/reviews').post(authenticate,checkId,addProductReview);

router.get('/top',fetchTopProducts);
router.get('/new',fetchNewProducts);

router.route('/:id')
.get(fetchProductById)
.put(authenticate,authorizeAdmin,formidable(),updateProductDetails)
.delete(authenticate,authorizeAdmin,removeProduct);

router.route('/filtered-product').post(filterProducts);

module.exports = router;