const mongoose=require('mongoose')
const Schema=mongoose.Schema
const cartLineItemSchema=new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    productId:{
        type:Schema.Types.ObjectId,
        ref:'Product'
    },
    quantity:{
        type:Number,
        default:0
    }
    
})
const Cart=cartLineItemSchema
module.exports=Cart