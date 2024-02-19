const mongoose=require('mongoose')

const stoneSchema=new mongoose.Schema({
    name:{
        type:String,
        minLength:2,
        required:true
    },
    category:{
        type:String,
        minLength:3,
        required:true
    },
    color:{
        type:String,
        minLength:2,
        required:true
    },
    image:{
        type:String,
        match:/^https?:\/\//,
        required:true
    },
    location:{
        type:String,
        minLength:5,
        maxLength:15,
        required:true
    },
    formula:{
        type:String,
        required:true
    },
    description:{
        type:String,
        minLength:10,
        required:true
    },
    likedList: [{
        type:mongoose.Types.ObjectId,
        ref:'User'
    }],
     
    owner:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },

    created: {
        type: Date,
        default: Date.now
    }


})

const Stone=mongoose.model('Stone',stoneSchema)

module.exports=Stone