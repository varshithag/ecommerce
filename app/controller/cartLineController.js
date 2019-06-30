const express=require('express')
const router=express.Router()
const Cart=require('../model/cartLineItem')
const authentication=require('../middlewares/authentication')
const User=require('../model/user')
router.get('/',authentication,(req,res)=>{
    const {user}=req
    Cart.findOne({
        user:user._id
    })
    .select('cart')
    .then(cartItem=>{
        res.json(cartItem)
    })
   
})
router.post('/',authentication,(req,res)=>{
    const body=req.body
    const user=req.user
    const cart=new Cart(body)
    cart.user=user._id
    cart.save()
    .then(cartItem=>{
        res.json(cartItem)
    })
    .catch(err=>{
        res.json(err)
    })
})
router.put('/:id', (req, res) => {
    const id = req.params.id
    const body = req.body
    CartItem.findOneAndUpdate({
        _id: id,
        user: user._id
    },body,{ new: true, runValidators: true })
        .then(cartItem => {
             res.json(cartItem)
        })
        .catch(err => res.json(err))
})

router.delete('/:id', (req, res) => {
    const id = req.params.id
    const { user } = req
    CartItem.findOneAndDelete({
        _id: id,
        user: user._id
    })
        .then(cartItem => {
             res.json(cartItem)
        })
        .catch(err => res.json(err))

})

const cartLineRouter= router
module.exports=cartLineRouter



