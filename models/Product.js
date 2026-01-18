const mongoose = require('mongoose');
//Task 2
const productSchema = new mongoose.Schema({

    name: {type:String, required: true},
    description: {type:String, required: true},
    price:{type:Number, required:true, min:0},
    category: {type:String, required: true},
    inStock:{type:Boolean, default:true},
    tags:[String],
    createdAt:{type:Date, default:Date.now}
})

const Product = mongoose.model('Product', productSchema);
module.exports = Product;