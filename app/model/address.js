const express=require('express')
const Schema=express.Schema
const addressSchema=new Schema({
    street:{
        type:String
    },
    city:{
        type:String
    },
    pin:{
        type:Number,
        minlength:6,
        maxlength:6
    },
    landmark:{
        type:String
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
})
const Address=mongoose.connect('Address',addressSchema)
module.exports=Address