require ('dotenv').config();
const express = require('express');
const app = express (); //create an express app
const connectDB = require('./config/connection'); //database connection
const productRoutes = require('./routes/productRoutes'); //routes
const PORT = process.env.PORT || 3001;


//Middleware
app.use(express.json()) //req body for JSON
app.use(express.urlencoded({extended:true})); //for form data

//connect to database
connectDB();

//routes
app.get('/', (req,res)=>{
    res.send('<h1>Zenith API</h1>');
})
app.use('/api/products', productRoutes);
//listen to the port
app.listen(PORT, () =>{
    console.log(`Server is running on the ${PORT}`)
});