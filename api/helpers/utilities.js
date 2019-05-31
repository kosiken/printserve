module.exports= {
    isEmpty:  function (obj){
        for(let key in obj){
            if(obj.hasOwnProperty(key)){
                return false
            }
        }
        return true
    },
    verifyNotExist: async (req, name,job) => {
       return job.findOne({userMail:req.body.email, shortName:name})
       },
       verifyAuth: (auth)=> process.env.SECRET===auth

       
}