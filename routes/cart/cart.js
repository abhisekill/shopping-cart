const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const {isLoggedIn} = require('../../middleware');
const Product = require('../../model/product');
const User = require('../../model/user');

// display the cart items
router.get('/user/:userid/cart',isLoggedIn, async(req,res)=>{
    try{
        const user = await User.findById(req.params.userid).populate('cart');
        res.render('cart/showCart',{cart:user.cart});
    }
    catch(e){
        req.flash('error','Cart is unavailable at this moment');
        res.redirect('/error');
    }
  
})

// save productID into the cart(array) of user DB
router.post('/user/:id/cart',isLoggedIn, async(req,res)=>{
    try{
        const product = await Product.findById(req.params.id);
        req.user.cart.push(product);
        await req.user.save();
        req.flash('success','Added to Cart Successfully');
        res.redirect(`/user/${req.user._id}/cart`);
    }
    catch(e){
        req.flash('error','Cannot Add item to Cart');
        res.redirect('/error');
    }
   
})

// removing an item from the cart
router.delete('/user/:userid/cart/:id',isLoggedIn,async(req,res)=>{
    const {userid,id} = req.params;
    await User.findByIdAndUpdate(userid,{$pull:{cart:id}});
    res.redirect(`/user/${req.user._id}/cart`);
})

module.exports = router;