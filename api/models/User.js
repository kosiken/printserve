const mongoose = require ('mongoose');

const  Schema = mongoose.Schema;

const UserSchema= new Schema({

     email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },

    admin: {
        type: Boolean, default:false
    }

})

module.exports  = mongoose.model('User',UserSchema)