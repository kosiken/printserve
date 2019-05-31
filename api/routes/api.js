/* eslint-disable no-console */
const express = require ('express');
const R = express.Router();
const stream= require('fs').createWriteStream('log.txt')
const Console  =  require('console').Console
let logger=new Console({
    stdout:stream
})
const User = require('../models/User.js');
const Job= require('../models/Job.js');
const {serverError, EmptyFilesError, NotFoundError,UnauthorizedError} = require('../helpers/errors.js')
const {toWords} = require('number-in-words')
const mime=require('mime')


const PDF = require('pdf-parse')

const {isEmpty} = require('../helpers/utilities')

async function dataGet(files,req) {
    let  price=0,gees=[], bills=[], metaData={fileDes:[]}, numpages=0,nos=0

   for(let file of files) {
    if(isEmpty(file)){
        throw new Error('EMPTY')
    }
    let name=file.name

    let mill = Date(Date.now()), DateString = mill.slice(4, mill.indexOf(/\d{2}:\d{2}:\d{2}/.exec(mill))+ 8),dar = DateString.replace(/\s|:/ig,'_')
    let short = name.replace(/\s|:/ig,'_'),filename= `${dar + short}`, mimeType = mime.lookup(short)
   if(('application/pdf')===mimeType){ let { numpages:n} = await     PDF(file.data, {version:'v2.0.550'}); numpages+=n;nos=n}
    else if(('application/vnd.openxmlformats-officedocument.wordprocessingml.document')===(mimeType)) {
        numpages+=5; nos=5
    }
    else {
        throw new Error(/\.(\S+)/.exec(short)[0] + ' files are not supported')
    }
    gees.push(name)
    bills.push(filename), metaData.fileDes.push({size:(file.size/1024).toFixed(2)+'KB', uploaded:mill,nos:nos,name:name})
    price+=300
     //   console.log(file.data)
     file.mv(`./prints/${filename}`, err=>{
        if (err) { 
        throw err 
    }
    })
   
 

    
     
   }
   metaData.numpages=numpages
   const newJob = req.user? new Job({
    owner:req.user._id ,
    userMail: req.user.email,
    delivery: false,
    pricing: price.toString(),
    file: bills,shortName: gees.join(','),metaData,location: req.body.location||'Unspecified',
    time: Date.now()+((4 - (req.user.priority||1))*3600*1000)
   
}) : new Job({
    userMail: req.body.email,
 
    delivery: false,
    pricing: price.toString(),
    file: bills,shortName: gees.join(','),metaData,location: req.body.location||'Unspecified',
    time: Date.now()+ (4*3600*1000)
});

 await newJob.save()
 
   return newJob
}





R.get('/',async(_,res)=> {
    if(!_.user){UnauthorizedError(res, 'YOU NEED TO LOGIN'); return }
    if(!_.user.admin){UnauthorizedError(res, 'YOU ARE NOT ALLOWED TO VIEW THIS');return}
    let jobs= await Job.find()
    let users= await User.find()
    res.json({jobs, users})
})






R.get('/error', (_, res)=> {
    NotFoundError(res, 'USER NOT FOUND')
})


R.get('/jobs', (req, res)=> {
    if(!(req.user)){ 
        UnauthorizedError(res,'You need to login first' )
        return
    }
   
   else Job.find({owner: req.user}).then(jobs=> {
       res.json({jobs, message:'You have '+ (jobs.length>1||jobs.length===0?`${toWords(jobs.length)} jobs`: `${toWords(1)} job` )+ ' on the cue'})
   })
})


R.post('/jobbern', (req, res)=> {
    
   
    Job.find({userMail: req.body.email}).then(jobs=> {
       res.json({jobs, message:'You have '+ (jobs.length>1||jobs.length===0?`${toWords(jobs.length)} jobs`: `${toWords(1)} job` )+ ' on the cue'})
   })
})





R.post('/job', async (_, res)=> {
    
   console.log(_.body.location)
    if(!_.user&& !_.body.email) {
        EmptyFilesError(res, 'YOU DIDN\'T  SPECIFY AN EMAIL')
        return
    }
    let files=[]
   _.files? (files = Array.isArray(_.files.file)?files.concat(_.files.file):[_.files.file]):files=[]


    if(files.length>0) dataGet(files, _).then(arr=>res.json(arr)).catch((err)=> {
        logger.log(err.message+'\r\n')
        serverError(res,err.message)})
    else EmptyFilesError(res, 'NO FILES HERE', 'WE SEEM TO NOT BE ABLE TO RECEIVE ANY OF YOUR SENT FILES',' PLEASE REGISTER AN ISSUE IF THIS PERSISTS')


})


R.get('/jobquery', (_, $) => {
    
    if (isEmpty(_.query)) {
            serverError($, ['NO QUERY FOUND'])
            return
    }
 else {
     let {email,name, location} =_.query
    if(email&&name&&location){ Job.find({userMail: email, location:location}).findByLines(name).exec((err, jobs)=> {
         if (err) throw err
        
         $.json(jobs)
     })
    }
    else if(email&&name){
        Job.find({userMail: email}).findByLines(name).exec((err, jobs)=> {
            if (err) throw err
           
            $.json(jobs)
        })
    }
    else if(name&&location) {
        Job.find({location:location}).findByLines(name).exec((err, jobs)=> {
            if (err) throw err
           
            $.json(jobs)
        })
    }
    else if(location&&email) {
        Job.find({userMail:email, location:location}).exec((err, jobs)=> {
            if (err) throw err
           
            $.json(jobs)
        })
    }
    else if(email) {
     
            Job.find({userMail:email}).exec((err, jobs)=> {
                if (err) throw err
               
                $.json(jobs)
            })
        
    }
    else if(name) {
     
        Job.find().findByLines(name).exec((err, jobs)=> {
            if (err) throw err
           
            $.json(jobs)
        })
    
    
}
else if(location) {
     
    Job.find({location}).exec((err, jobs)=> {
        if (err) throw err
       
        $.json(jobs)
    })


}
else {
    let text = '', n = 0
    for(let key in _.query) {
        text+= `${n>0 ?'and ':''}`+key + ' is an invalid query'  + ' '
        n++
    }
    NotFoundError($, text )
}

    
 }
})



module.exports = R
