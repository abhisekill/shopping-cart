const express = require('express');
const router = express.Router();
const Product = require('../../model/product');
const Review = require('../../model/review');
const {isLoggedIn} = require('../../middleware');

// display all the products
router.get('/products',async(req,res)=>{
    try{
        const products = await Product.find();
        res.render('products/index',{products});
    } catch (e) {
        console.log('Something went wrong');
        console.log(e.message);
        req.flash('error','Cannot Find Products')
        res.redirect('/error');
    }
    
})

// form to add a new product
router.get('/products/new',isLoggedIn,(req,res)=>{
    res.render('products/new');
})

// create a new product
router.post('/products',async(req,res)=>{
    try{
        await Product.create(req.body.product);
        req.flash('success','Product Created Successfully');
        res.redirect('/products');
    }catch (e){
        console.log(e.message);
        req.flash('error','Cannot Create Product')
        res.redirect('/error');
    }
    
})

// show a specific product
router.get('/products/:id',async(req,res)=>{
    try{
        const product = await Product.findById(req.params.id).populate('reviews');
        res.render('products/show',{product});
    }catch (e){
        console.log(e.message);
        req.flash('error','Cannot find this Product')
        res.redirect('/error');
    }
  
})

// form to edit a product
router.get('/products/:id/edit',isLoggedIn, async(req,res)=>{
    try{
        const product = await Product.findById(req.params.id);
        res.render('products/edit',{product});
    }catch (e){
        console.log(e.message);
        req.flash('error','Cannot edit this Product')
        res.redirect('/error');
    }
   
})

// update a product
router.patch('/products/:id',async(req,res)=>{
    try{
        await Product.findByIdAndUpdate(req.params.id,req.body.product);
        req.flash('success','Product Updated Successfully');
        res.redirect(`/products/${req.params.id}`);
    }catch (e){
        console.log(e.message);
        req.flash('error','Cannot update this Product')
        res.redirect('/error');
    }
    
})

// delete a product
router.delete('/products/:id',isLoggedIn, async(req,res)=>{
    try{
        await Product.findByIdAndDelete(req.params.id);
        req.flash('success','Producted Deleted Successfully');
        res.redirect('/products');
    }catch (e){
        console.log(e.message);
        req.flash('error','Cannot delete this Product')
        res.redirect('/error');
    }
})

// save a review on a particular product
router.post('/products/:id/review',isLoggedIn, async(req,res)=>{
    try{
        const product = await Product.findById(req.params.id);
        const review = new Review({...req.body,user:req.user.username});
        await review.save();
        product.reviews.push(review);
        await product.save();
        req.flash('success','Review Submitted Successfully');
        res.redirect(`/products/${req.params.id}`);
    }catch (e){
        console.log(e.message);
        req.flash('error','Cannot add review to this Product')
        res.redirect('/error');
    }
    
})

router.get('/error', (req, res) => {
    res.status(404).render('error');
})

module.exports = router;