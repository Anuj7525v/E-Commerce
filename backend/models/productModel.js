const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;
const Schema  = mongoose.Schema;


const reviewSchema = new Schema ({
    name:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    comment:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User',
    },
},{timestamps:true});

const productSchema = new Schema({
    name:{
        type:String, 
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
    },
    brand:{type:String,
        required:true
    },
    category:{
        type:ObjectId,
        ref:'Category',
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    reviews:[reviewSchema],
    rating:{
        type:Number,
        required:true,
        default:0
    },
    numReviews:{
        type:Number,
        required:true,
        default:0,
    },
    price:{
        type:Number,
        required:true,
        default:0
    },
    countInstock:{
        type:Number,
        required:true,
        default:0,
    },

}, {timestamps:true}
);

module.exports = mongoose.model("Product",productSchema);