if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const app = express();
const path = require('path');
const Product = require('./model/product');
const seedDB = require('./seed');
const productRoutes = require('./routes/products/product');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash'); 
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./model/user');
const authRoutes = require('./routes/auth/auth');
const cartRoutes = require('./routes/cart/cart');
const paymentRoutes = require('./routes/payment/payment');

const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL,
    {   useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useFindAndModify:false,
        useCreateIndex:true
    })
    .then(()=>{
        console.log('DB connected');
    })
    .catch(err=>{
        console.log('OH NO ERROR');
        console.log(err);
    })

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(session({
    secret:'thisisasecret',
    resave:false,
    saveUninitialized:true
}))
app.use(flash());


// setting up passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currentUser = req.user;
    next();
})

// seedDB();
app.get('/',(req,res)=>{
    res.send('Landing Page');
})

app.use(productRoutes);
app.use(authRoutes);
app.use(cartRoutes);
app.use(paymentRoutes);




app.listen(process.env.PORT || 3000,()=>{
    console.log('server running at port 3000');
})