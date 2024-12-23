const express = require('express');
const router = express.Router();
const {authenticate,authorizeAdmin} = require('../middleware/authMiddleware.js');
const {
    readCategory, listCategory, removeCategory, updateCategory,
    createCategory
} = require("../controllers/categoryController.js");

router.route('/').post(authenticate,authorizeAdmin,createCategory);
router.route('/:categoryId').put(authenticate,authorizeAdmin,updateCategory);

router.route('/:categoryId').delete(authenticate,authorizeAdmin, removeCategory);

router.route('/categories').get(listCategory);
router.route('/:id').get(readCategory);

module.exports = router;