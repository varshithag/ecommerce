const express=require('express')
const Address=require('../model/address')
const router=express.Router()
const {authenticateUser}=require('../middlewares/authentication')
router.get('/',function(req,res){
    console.log('i am in address controller')
    const user=req.user
    const Address=this
    Address.find({
        user:user._id
    })
    .then((address)=>{
        res.json(address)
    })
    .catch(err=>{   
        res.json(err)
    })
})
router.post('/',function(req,res){
    const {user}=req
    const body=req.body
    const address=new Address(body)
    user=user._id
    address.save()
    .then(address=>{
        res.json(address)
    })
    .catch(err=>{
        res.json(err)
    })
})
router.put('/:id',(req,res)=>{
    const id=req.params.id
    const body=req.body
    Address.findOneAndUpdate({
            user:req.user._id,
            _id:id}
             ,{$set:body},{new:true})
    .then(address=>{
        res.json(address)
    })
    .catch(err=>{
        res.json(err)
    })
})

router.delete('/:id',(req,res)=>{
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