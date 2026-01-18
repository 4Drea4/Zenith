const express = require('express');
const router = express.Router();

const Product = require('..models/Product');

//Post api
router.post('/', async (req,res)=>{
    try{
        const createProduct = await Product.create(req.body);
        res.status(200).json(createProduct);
    } catch (error) {
        res.status(400).json({
        message: 'Could not create a product',
        error: error.message,
    
})
}
})