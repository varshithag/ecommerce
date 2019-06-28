const mongoose=require('mongoose')
mongoose.Promise=global.Promise

mongoose.connect('mongodb://localhost:27017/contact-app',{useNewUrlParser:true})
.then((res)=>{
    console.log('connected to db')
})
.catch((err)=>{
    console.log('erro connecting to db')
})
module.exports=mongoose
