
const fs = require('fs')
const express = require ('express');
const app = express();
const path = require('path');

const mongoose = require('mongoose');
const bodyParser = require('body-parser')

const upload = require('express-fileupload')
const hbs = require('express-handlebars')
const session = require('express-session')
const flash = require("connect-flash")
const passport = require('passport')

const  mongoDbUrl  =process.env.MONGODB_URI
const home = require("./api/routes/home")
const api = require("./api/routes/api")
const errors = require("./api/routes/errors")
const PORT = process.env.PORT
fs.exists(path.join(__dirname, 'prints'), (been)=> {
    if(!been) {
        fs.mkdirSync('prints')
    }
})
app.use((_,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Methods','*')
    res.setHeader('Access-Control-Allow-Headers','*')
    next()
})
app.use(express.static(path.join(__dirname,'dist')))



mongoose.connect(mongoDbUrl,{ useNewUrlParser: true }).then(
    ()=>{
        // eslint-disable-next-line no-console
        console.log("CONNECTED TO "+ mongoDbUrl);
    }
).catch(err=>{
    // eslint-disable-next-line no-console
    console.error(err)
})




app.use(express.static(path.join(__dirname,'build')))



app.use(upload())

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())







app.use(session({secret: 'baba-k', resave: true,
    saveUninitialized:true}))
app.use(flash())



app.use(passport.initialize());
app.use(passport.session())

app.use((req,res,next)=>{
    res.locals.user = req.user ? req.user :  {firstName:'default'}
    res.locals.error_message = req.flash('error_message')
    res.locals.success_message = req.flash('success_message')
    res.locals.form_errors =  req.flash('form_errors');
    res.locals.error = req.flash('error')
    next()
})



app.engine('hbs', hbs({defaultLayout:'main',extname:'hbs'}))

app.set('view engine', 'hbs');

app.use('/',home);
app.use('/api',api)
app.use('/err',errors)
app.use(function(req, res) {
    return res.sendFile(path.join(__dirname, 'build','index.html'));
})


app.listen(PORT,console.log('LISTENING ON ' +PORT));