const express = require ('express');
const R = express.Router();
const bcrypt = require('bcryptjs')
const passport = require('passport')
const Job= require('../models/Job.js');
const localS = require('passport-local').Strategy
const User = require('../models/User.js'),{ ConflictError,UnauthorizedError}= require('../helpers/errors.js'),{ verifyAuth}= require('../helpers/utilities.js')
R.all('/*',(req,res,next)=>{
    req.app.locals.layout='main';
    next()
})
passport.use(new localS({usernameField: 'email'},(email, password, done) => {
   User.findOne({email: email}).then(user => {
       if(!user) return done(null, false, {message: `No user found with ${email}`})

       bcrypt.compare(password, user.password, (err, matched)=>{
           if(err) throw err
           if(matched){
               return done(null,user)
           }else{
               return done(null, false)
           }
       })
   })
}))
R.get('/home', (req, res)=> {
    res.render('home/login')
})

R.get('/register', (req, res)=> {
    res.render('home/register')
})


function genUser(newUser, res,auth) {
   bcrypt.genSalt(10,(err, salt) => {
       bcrypt.hash(newUser.password, salt, (err, hash) => {
         newUser.password=hash;
       if(auth)  newUser.admin = verifyAuth(auth)
         newUser.save().then((user) => {

            res.json(
                {
                    created: true,user
                }
            )
            })
       })
   })
}

R.get('/err',(_,res)=>{
    if(_.body.app){
        res.redirect('./api/error')
        return
    }
   
   res.render('home/login', {message: 'INVALID PASSWORD OR LOGIN'})

})

R.get('/login',(_,res)=>{
    console.log(_.body)
    
    if(!_.user){
        res.redirect('./login')
        return
    }
    if(!_.user.admin){
        res.redirect('./api/jobs')
        return
    }
   res.redirect('/admin')

})

R.post('/register',(req,res)=>{
   let errors = []; 
  if( !(new RegExp (req.body.password).test(req.body.passwordConfirm))){
      errors.push( {message:"Passwords dont match"})

  }
  if (errors.length > 0) {
      res.json({error:true, errors})
   } else {
  const newUser = new User({
      
      email: req.body.email,
      password:req.body.password

  })

  User.findOne({email: req.body.email}, (err, user)=> {
      if (err) {
       
       res.json({error:true, errors: [err.message]})
      }
      else if(user) {
       ConflictError(res,'User ' +req.body.email+' already exists')
       
      }
      else {
          genUser(newUser, res,req.body.auth)
      }
  })
 

   }
});
passport.serializeUser((user,done) => done(null,user.id))
passport.deserializeUser((id,done) => {

User.findById(id, function (err, user) {
   
    done(err,user)
})


})


R.post('/login',(req,res,next)=>{
   passport.authenticate('local',{
       successRedirect: '/admin',
       failureRedirect: '/err',
       
   })(req, res,next)
})

R.get('/jobSearch', async(_, $)=> {
    if(!_.user){
        $.redirect('./err')
        return
    }
    let jobs= await Job.find()
    $.render('home/jobs', {
        jobs:jobs[0]? jobs:false
    })
})

module.exports = R