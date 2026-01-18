const express = require('express');
const router = express.Router();

const Product = require('../models/Product');

//Post api create
router.post('/', async (req,res)=>{
    try{
        const createProduct = await Product.create(req.body);
        res.status(201).json(createProduct);
    } catch (error) {
        res.status(400).json({
        message: 'Could not create a product',
        error: error.message,
})
}
})

//get api for products id to read a single product
router.get('/:id',async (req,res)=> {
    try{
        const findProduct = await Product.findById(req.params.id);

        if(!findProduct) {
            return res.status(404).json({message:'Couldnt find the product you are looking for'});
        }
        res.json(findProduct);
    } catch (error) {
        res.status(400).json({
            message: 'This doesnt appear to be the right product ID',
            error: error.message
        });
    }
});

module.exports = router;