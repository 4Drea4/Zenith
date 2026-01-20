const express = require('express');
const router = express.Router();

const Product = require('../models/Product');

// still working on this advance query 
//querying
router.get ('/', async (req, res) => {
    try {
        const {category, minPrice, maxPrice , sortBy, page, limit} = req.query;

        //filter
        const filter ={};

        if (category) {
            filter.category = category;
        }
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte= Number(maxPrice)
        }

    //omg help me ...query
        let query = Product.find(filter)
        .select({name:1,inStock: 1, price: 1, category: 1, createdAt:1 });
       

    //sorting
    if (sortBy === 'price_asc') query = query.sort({price:1});
    if (sortBy === 'price_desc') query = query.sort({price:-1});
    
    //pagination
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;
    const skipNum = (pageNum -1) * limitNum;
    const products = await query.skip(skipNum).limit(limitNum);

    res.json(products);
    }catch (error) {
        res.status(500).json({
            message: 'Uh oh couldnt load the products',
            error: error.message
        })
    }

    }
)


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

//put api product id ...update it
router.put('/:id', async (req,res)=> {
    try {
        const updatedProduct = await Product.findByIdAndUpdate (
            req.params.id,
            req.body,
            {new:true, runValidators:true}
        );

        if(!updatedProduct) {
            return res.status(404).json({message: 'Can not update this product'});
        }
        res.json(updatedProduct);
    } catch (error) {
        res.status(400).json({
            message: 'Failed to update product',
            error: error.message
        });
    }

})

//delete api products id
router .delete('/:id', async (req,res) => {
    try{
        const deleteProduct = await Product.findByIdAndDelete(req.params.id);

        if(!deleteProduct) {
            return res.status(404).json({message: 'Product could not be found'});
        }
            res.json({message: 'Product was deleted'});
        } catch (error) {
            res.status(400).json({ message: 'Couldnt delete product',
                error:error.message

            });
        }
})

module.exports = router;