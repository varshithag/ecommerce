const express=require('express')
const router=express.Router()
const Category=require('../model/category')
const authouriesUser=require('../middlewares/adminauthentication')

router.get('/',(req,res)=>{
        Category.find()
        .then(categories=> res.json(categories))
        .catch(err=> res.json(err))
})

router.post('/',authouriesUser,(req,res)=>{
    const body=req.body
    const category=new Category(body)
    category.save()
    .then(val=>{
        res.send(val)
    })
    .catch(err=>{
        res.send(err)
    })

})
router.delete('/:id',authouriesUser,(req,res)=>{
    const id=req.params.id
    Category.findByIdAndDelete(id)
    .then(category=>{
        console.log(category)
        res.send(category)
    })
    .catch(err=>{
        res.send(err)
    })
})
const categoryRouter=router
module.exports=categoryRouter