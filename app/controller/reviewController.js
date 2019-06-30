const express=require('express')
const router=express.Router()
const Review=require('../model/review')
const authenticateUser=require('../middlewares/authentication')

router.get('/',(req,res)=>{
     Router.find()
     .then(review=>{
         res.json(review)
     })
     .catch(err=>{
         res.json(err)
     })
})
router.get('/:id',(req,res)=>{
    const id=req.params.id
    Review.findOne({_id:id})
    .then(review=>{
        res.json(review)
    })
    .catch(err=>{
        res.json(err)
    })
})
router.post('/',authenticateUser,(req,res)=>{
    const body=req.body
    const user=req.user
    const review=new Review(body)
    review.save()
    .then(review=>{
        res.json(review)
    })
    .catch(err=>{
        res.json(err)
    })    
})
router.put('/:id',authenticateUser,(req,res)=>{
    const body=req.body
    const user=req.user
    const id=req.params.id
    Review.findAndUpdate(id,{$set:body},{new:true})
    .then(review=>{        
        res.send(review)
    })
    .catch(err=>{
        res.send(err)
    })
})
router.delete('/:id',authenticateUser,(req,res)=>{
    const user=req.user
    Review.findByIdAndDelete({id:req.params.id,userid:user._id})
    .then(review=>{
        res.json(review)
    })
    .catch(err=>{
        res.json(err)
    })
})
const reviewRouter=router
module.exports=reviewRouter