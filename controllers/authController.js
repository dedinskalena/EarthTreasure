const router=require('express').Router()
const authService=require('../services/authService')
const { getErrorMessage } = require('../utils/errorUtils')
const {isAuth,isGuest}=require('../middlewares/authMiddleware')

router.get('/register',(req,res)=>{
    res.render('auth/register')
})
router.post('/register',async(req,res)=>{
    const userData=req.body
     
    try{
        const token=await authService.register(userData)
        res.cookie('auth',token)
        res.redirect('/')

    }catch(err){
        res.render('auth/register',{error:getErrorMessage(err)})
    }
     
})
router.get('/login',isGuest,(req,res)=>{
    res.render('auth/login')
})

router.post('/login',isGuest,async (req,res)=>{
    const loginData=req.body
    try{
        const token=await authService.login(loginData)
        res.cookie('auth',token)
        res.redirect('/')

    }catch(err){
        res.render('auth/login',{error:getErrorMessage(err)})

    }
})

router.get('/logout',isAuth,(req,res)=>{
    res.clearCookie('auth')
    res.redirect('/')
})
module.exports=router