const mongoose=require('mongoose')
const bcrypt=require('bcrypt')

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        minLength:10,
        unique:true
    },
    password:{
        type:String,
        minLength:4,
        required:true
    }
    
})

userSchema.pre('save',async function(){
    this.password= await bcrypt.hash(this.password,12)

})

// userSchema.virtual('rePassword')
//    .set(function(value){
//         if(value!==this.password){
//            throw new Error('Password missmatch')
//         }
//     })

const User=mongoose.model('User',userSchema)

module.exports=User