const express=require('express')
const handlebars=require('express-handlebars')
const mongoose=require('mongoose')
const cookieParser=require('cookie-parser')

const routes=require('./routes')
const {authMiddleware}=require('./middlewares/authMiddleware')
const app=express()

app.use(express.static('public'))
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(authMiddleware)

app.engine('hbs',handlebars.engine({
    extname:'hbs'
}))
app.set('view engine','hbs')

app.use(routes)
//to change db name
mongoose.connect('mongodb://127.0.0.1:27017/earthTreasure')
mongoose.connection.on('connected',()=>console.log('DB is connected'))

 

app.listen(3000,console.log('Server listening on port 3000'))