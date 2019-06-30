const express=require('express')
const app=express()
const port=3001
const cors=require('cors')
app.use(cors())
app.use(express.json())

const mongoose=require('./config/database')
const addressRouter=require('./app/controller/addressController')
const usersRouter=require('./app/controller/userController')
const categoryRouter=require('./app/controller/categoryController')
// 

app.use('/users',usersRouter)
app.use('/address',addressRouter)
app.use('/category',categoryRouter)

app.listen(port,function(){
    console.log('listening to port',port)
})