const router=require('express').Router()
const {isAuth}=require('../middlewares/authMiddleware')
const {getErrorMessage}=require('../utils/errorUtils')
const stoneService=require('../services/stoneService')
const {isStoneOwner}=require('../middlewares/stoneMidllerware')

router.get('/',async (req,res)=>{

    const stones=await stoneService.getAll().lean()
    res.render('dashboard/dashboard',{stones})
})


router.get('/create',isAuth,(req,res)=>{
    res.render('dashboard/create')
})

router.post('/create',async(req,res)=>{
    const stoneData=req.body
    console.log(req.user)
    try{

        await stoneService.create(req.user._id,stoneData)
        res.redirect('/dashboard')
    }catch(err){
        res.render('dashboard/create',{...stoneData,error:getErrorMessage(err)})
    }
})

router.get('/:stoneId/details',async (req,res)=>{
    const stoneId=req.params.stoneId
    const stone=await stoneService.getOne(stoneId).lean()
     
    const isNotLiked=!stone.likedList.some(user=>user._id==req.user?._id)
    const isOwner=stone.owner&&stone.owner._id==req.user?._id
     console.log(isNotLiked)
    res.render('dashboard/details',{...stone,isOwner,isNotLiked})
})


router.get('/:stoneId/delete',isStoneOwner,async (req,res)=>{
     
    await stoneService.delete(req.params.stoneId)
    res.redirect('/dashboard')
})
router.get('/:stoneId/edit',isStoneOwner,async(req,res)=>{
    
    res.render('dashboard/edit',{...req.stone})
})
router.post('/:stoneId/edit',isStoneOwner,async(req,res)=>{
    const stoneData=req.body
    try{
        await stoneService.edit(req.params.stoneId, stoneData)
        res.redirect(`/dashboard/${req.params.stoneId}/details`)
    }catch(err){
        res.render('dashboard/edit',{...stoneData,error:getErrorMessage(err)})
    }
})
router.get('/:stoneId/like',async(req,res)=>{
    await stoneService.like(req.params.stoneId,req.user._id)
    res.redirect(`/dashboard/${req.params.stoneId}/details`)
})


module.exports=router