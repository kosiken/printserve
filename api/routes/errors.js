const express = require ('express');
const R = express.Router();
const HttpStatus = require('http-status-codes');


R.all('/*',(req,res,next)=>{
    req.app.locals.layout='err';
    next()
})

R.get('/', (_, $)=> {
   $.status(401).render('errors/unauth',{code:401,message:HttpStatus.getStatusText(401).toUpperCase()})
})

module.exports=R