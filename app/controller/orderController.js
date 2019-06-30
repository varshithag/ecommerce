const express=require('express')
const Order=require('../models/order')
const router=express.Router()
const { authenticateUser } = require('../middleware/authenticateUser')

router.get('/', authenticateUser, (req,res)=>{
    const {user}=req
    Order.find({
    _id:id,
    user:user._id
    })
    .then(orderitems=>res.json(orderitems))
    .catch(err=>res.json(err))
})

router.post('/', authenticateUser, (req,res)=>{
    const body=req.body
    const {user}=req
    const orderitem=new OrderItem(body)
    orderitem.user=user._id
    orderitem.save()
    .then(orderitem=>res.json(orderitem))
    .catch(err=>res.json(err))
})


router.get('/:id', authenticateUser,(req,res)=>{
    const id=req.params.id
    Order.findOne({
        _id:id,
        user:user._id
    })
    .then(orderitem=>{
         res.json(orderitem)
    })
    .catch(err=>res.json(err))
})
router.put('/:id', authenticateUser,(req,res)=>{
    const id=req.params.id
    const body=req.body
    Order.findOneAndUpdate({
        id:id,
        user:user._id},
        {$set:body},
        {new:true, runValidator:true }
    )
    .then(orderitem=>res.json(orderitem))
    .catch(err=>res.json(err))
})

router.delete('/:id', authenticateUser,(req,res)=>{
    const id=req.params.id
    OrderItem.findOneAndDelete({
        _id:id,
        user:user._id
    })
    .then(orderitem => res.json(orderitem))
    .catch(err => res.json(err))
    
})
const orderRouter=router
module.exports=orderRouter