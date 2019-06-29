const mongoose=require('mongoose')

mongoose.Promise=global.Promise

mongoose.connect('mongodb://localhost:27017/e-commerce',{useNewUrlParser:true})
.then(response=>{
    console.log('connected to db')
})
.catch(err=>{
    console.log('err connecting to db')
})

module.exports=mongoose
