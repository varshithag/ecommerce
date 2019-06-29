const express=require('express')
const app=express()
const port=3001
const cors=require('cors')
const {mongoose}=require('./config/database')
const addressRouter=require('./app/controller/addressController')
const usersRouter=require('./app/controller/userController')
app.use(cors())
app.use(express.json())
app.use('/users',usersRouter)
app.use('/address',addressRouter)
app.get('/',function(request,response){
    response.send('welcome to the website')
})
app.listen(port,()=>{
    console.log('listening to port',port)
})