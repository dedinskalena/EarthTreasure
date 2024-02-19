const Stone=require('../models/Stone')

exports.create=async (userId,stoneData)=>{
    const createdStone=await Stone.create(
      {
          owner:userId,
          ...stoneData
  
      })
       
      return createdStone
  }
  exports.getAll=()=>Stone.find()

  exports.getOne=(stoneId)=>Stone.findById(stoneId).populate('owner')

  exports.getLatest=()=>Stone.find().sort({'created':-1}).limit(3)

  exports.delete=(stoneId)=>Stone.findByIdAndDelete(stoneId)

  exports.edit=(stoneId,stoneData)=>Stone.findByIdAndUpdate(stoneId,stoneData,{runValidators:true})


  exports.like=async (stoneId,userId)=>{
        await Stone.findByIdAndUpdate(stoneId,{$push:{likedList:userId}})

  }