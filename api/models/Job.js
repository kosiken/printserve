const M = require('mongoose')
const {Schema} = M

const JobSchema = new Schema({
    file:{
        type: [String],
        required: true
    },

    owner:{
        type: Schema.Types.ObjectId,
        required: false
    },
    location: {
        type:String, required: true
    },

    delivery: {
        type: Boolean,
        default:false
    },
    time: {
        type:Number
    },
    pricing: {
        
            type: String,
            required: true
        
    },

    priority: {
        type: Number,
        default: 0
    },

    done: {
        type: Boolean,
        default:false
    },
    userMail: {
        type:String,
        required: false
    },

    shortName: {
        type:String,
        required:true
    },
    metaData: {
        type:Object,required:true
    },
    created:{
        type:Number, default:Date.now()
    }
})
JobSchema.query.findByLines =function(name) {
    return this.where({ shortName: new RegExp(name) });
  }
  JobSchema.query.findByEmail =function(name) {
    return this.where({ userMail: new RegExp(name) });
  }
  JobSchema.query.findByLocation =function(name) {
    return this.where({ location: new RegExp(name) });
  }
module.exports =  M.model('jobs', JobSchema)

