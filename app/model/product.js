const mongoose=require('mongoose')
const Schema=mongoose.Schema

const prouuctSchema=new Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    price:{
        type:String,
        required:true,
        default:0
    },
    description:{
        type:String,
        minlength:5
    },
    imageURL:{
        type:String
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:"Category"
    }

})
const Product=prouuctSchema
module.exports=mongoose.model('Product',prouuctSchema)