const stoneService=require('../services/stoneService')

async function isStoneOwner(req,res,next){
    const stone=await stoneService.getOne(req.params.stoneId).lean()
    if(stone.owner._id!=req.user?._id){
        return res.redirect(`/dashboard/${req.params.stoneId}/details`)
    }
    req.stone=stone
    next()
}

exports.isStoneOwner=isStoneOwner