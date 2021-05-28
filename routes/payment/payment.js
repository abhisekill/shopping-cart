const express = require('express');
const { isLoggedIn } = require('../../middleware');
const User = require('../../model/user');
const router = express.Router();
const { v4: uuid } = require('uuid');
const jsSHA = require("jssha");
const axios = require('axios');
const request = require('request');

// get the payment form
router.get('/:userid/order',isLoggedIn,async(req,res)=>{
    try{
        const user = await User.findById(req.params.userid).populate('cart');
        res.render('payment/paymentForm',{cart:user.cart});
    }
    catch(e){
        req.flash('error','Cannot Make Payment at this moment');
        res.redirect('/error');
    }
})


// creating an order
router.post('/payment_gateway/payumoney', (req, res) => {
    let pay = {};
    pay.txnid            = uuid();
    pay.amount           = req.body.amount;
    pay.productinfo      = "Payment for appointment";
    pay.firstname        = req.body.name;
    pay.email            = req.body.email;
    pay.service_provider = "payu_paisa";


    const hashString = 'ksdAV3' //store in in different file
     + '|' + pay.txnid
     + '|' + pay.amount 
     + '|' + pay.productinfo 
     + '|' + pay.firstname 
     + '|' + pay.email 
     + '|' + '||||||||||'
     + '338KXGwJ' //store in in different file
    const sha = new jsSHA('SHA-512', "TEXT");
    sha.update(hashString);
    //Getting hashed value from sha module
     const hash = sha.getHash("HEX");
     
     //We have to additionally pass merchant key to API
    pay.key = 'ksdAV3' //store in in different file;
     pay.surl = 'http://localhost:3000/payment/success';
     pay.furl = 'http://localhost:3000/payment/fail';
     pay.hash = hash;
    //Making an HTTP/HTTPS call with request

    // request.post({
    //     headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //     },
    //     url: 'https://test.payu.in/_payment', //Testing url
    //     form: pay
    //     }, function (error, httpRes, body) {
    //    if (error) 
    //     res.send(
    //     {status: false, 
    //     message:error.toString()
    //     }
    //     );
    //    if (httpRes.statusCode === 200) {
    //     res.send(body);
    //     } else if (httpRes.statusCode >= 300 && 
    //     httpRes.statusCode <= 400) {
    //     res.redirect(httpRes.headers.location.toString());
    //     }
    //     })

        axios.post('https://test.payu.in/_payment')
        .then(data=>{
            res.send(data);
        })
        .catch(error=>{
            console.log(error);
            res.send(error.message);
        })
    
});


router.post('/payment/success', (req, res) => {
    //Payumoney will send Success Transaction data to req body. 
     //Based on the response Implement UI as per you want
     res.send(req.body);
})

router.post('/payment/fail', (req, res) => {
    //Payumoney will send Fail Transaction data to req body. 
     //   Based on the response Implement UI as per you want
        res.send(req.body);
})

module.exports = router;