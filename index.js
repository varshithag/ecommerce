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
const productRouter=require('./app/controller/productController')
const reviewRouter=require('./app/controller/reviewController')
const cartLineRouter=require('./app/controller/cartLineController')
const wishListRouter=require('./app/controller/wishlistRouter')
// 

app.use('/users',usersRouter)
app.use('/address',addressRouter)
app.use('/category',categoryRouter)
app.use('/products',productRouter)
app.use('/review',reviewRouter)
app.use('/cartline',cartLineRouter)
app.use('/wishlist',wishListRouter)

app.listen(port,function(){
    console.log('listening to port',port)
})