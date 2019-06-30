const express=require('express')
const Product=require('../model/product')
const router=express.Router()
const authouriesUser=require('../middlewares/adminauthentication')

router.get('/',(req,res)=>{
Product.find()    
.then(products=>{
    res.send(products)
})
.catch(err=>{
    res.send(err)
})
    
})
router.get('/:id',(req,res)=>{
    const id=req.params.id
    Product.findOne(id)
    .then(product=>{
        res.send(product)
    })
    .catch(err=>{
        res.send(err)
    })
})

router.post('/',authouriesUser,(req,res)=>{
    const user=req.user
    const body=req.body
    const product=new Product(body)
    product.save()
    .then(product=>{
        res.json(product)

    })
    .catch(err=>{
        res.json(err)
    })

})

router.put('/:id',authouriesUser,(req,res)=>{
    const id=req.params.id
    const body=req.body
    product.findAndUpdate(body,{new:true,runValidator:true})
    .then(product=>{
        res.send(product)
    })
    .catch(err=>{
        res.send(err)
    })
})
router.delete('/:id',authouriesUser,(req,res)=>{
    const id=req.params.id
    Product.findByIdAndDelete(id)
    .then(product=>{
        res.json(product)
    })
    .catch(err=>{
        res.json(err)
    })
})
const productRouter=router
module.exports=productRouter