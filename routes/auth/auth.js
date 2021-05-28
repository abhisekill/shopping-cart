const express = require('express');
const router = express.Router();
const User = require('../../model/user');
const passport = require('passport');

// get the sign-up form
router.get('/register',(req,res)=>{
    res.render('auth/signup');
})

// register the user to the db
router.post('/register',async(req,res)=>{
    try{
        const user = new User({username:req.body.username, email:req.body.email});
        const newUser = await User.register(user,req.body.password);
        console.log(newUser);
        req.flash('success','Signed Up Successfully');
        res.redirect('/login');
    }catch(e){
        req.flash('error',e.message);
        res.redirect('/register');
    }
})

// get the login-form
router.get('/login',(req,res)=>{
    res.render('auth/login');
})

// login-authentication of user
router.post('/login',passport.authenticate('local',{
        failureRedirect:'/login',
        failureFlash: true
    }),(req,res)=>{
        req.flash('success',`Welcome Back ${req.user.username}!`);
        res.redirect('/products');
    }
)

// logout a user
router.get('/logout',(req,res)=>{
    req.logOut();
    req.flash('success','Logged Out Successfully');
    res.redirect('/login');
})

module.exports = router;