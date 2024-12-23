const Category = require("../models/categoryModel");
const asyncHandler = require("../middleware/asyncHandler");

const createCategory = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.json({ error: "Name is required" });
        }

        const existCategory = await Category.findOne({ name });
        if (existCategory) {
            return res.json({ error: "Alredy exists" });
        }
        const category = await new Category({ name }).save();
        res.json(category);
    }
    catch (error) {
        console.error(error);
        return res.status(400).json(error);
    }
});

const updateCategory = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body;
        const { categoryId } = req.params;

        const category = await Category.findOne({ _id: categoryId });
        if (!category) {
            return res.status(400).json({ error: "Category not found" });
        }

        category.name = name;

        const updateCategory = await category.save();
        res.json(updateCategory);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});


const removeCategory = asyncHandler(async (req, res) => {
    try {
        const removed = await Category.findByIdAndDelete(req.params.categoryId);
        res.json(removed);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

const listCategory = asyncHandler(async (req, res) => {
    try {
        const all = await Category.find({});
        res.json(all);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error.message);
    }
});


const readCategory = asyncHandler(async (req, res) => {
    try {
        const category = await Category.findOne({ _id: req.params.id });
        res.json(category);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error.message);
    }
});


module.exports = {
    readCategory, listCategory, removeCategory, updateCategory,
    createCategory
};