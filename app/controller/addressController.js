const express=require('express')
const Address=require('../model/address')
const router=express.Router()
const authenticateUser=require('../middlewares/authentication')

router.get('/',authenticateUser, function(req,res){
    console.log('i am in address controller')
    const user=req.user
    console.log(user)
    Address.find({user:user._id})
    .then((address)=>{
        console.log(address)
        res.json(address)
    })
    .catch(err=>{   
        res.json(err)
    })
})
router.post('/',authenticateUser,function(req,res){
    const user=req.user
    const body=req.body
    const address=new Address(body)
    address.user=user._id
    address.save()
    .then(address=>{
        res.json(address)
    })
    .catch(err=>{
        res.json(err)
    })
})
router.put('/:id',authenticateUser,(req,res)=>{
    const id=req.params.id
    const body=req.body
    Address.findOneAndUpdate({
            user:req.user._id,
            _id:id}
             ,{$set:body},{new:true,runValidators:true})
    .then(address=>{
        res.json(address)
    })
    .catch(err=>{
        res.json(err)
    })
})

router.delete('/:id',authenticateUser,(req,res)=>{
    const id=req.params.id
    Address.findOneAndDelete({
        user:req.user._id,
        _id:id}
         )
.then(address=>{
    res.json(address)
})
.catch(err=>{
    res.json(err)
})

})
const addressRouter=router
module.exports=addressRouter