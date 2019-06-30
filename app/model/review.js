const mongoose=require('mongoose')
const Schema=mongoose.Schema
const reviewSchema=new Schema({
    title:{
        type:String
    },
    body:{
        type:String
    },
    rating:{
        type:String
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    productId:{
        type:Schema.Types.ObjectId,
        ref:"Product"
    },
    createdAt:{
        type:Date,
        default:Date.now()

    }
})
const Review=reviewSchema
module.exports=Review