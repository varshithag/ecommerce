const express = require('express')
const WishList = require('../model/wishList')
const router = express.Router()
const authenticateUser = require('../middlewares/authentication')

router.get('/', authenticateUser, (req, res) => {
    const { user } = req
     WishList.find({
        _id: id,
        user: user._id
    })
        .then( wishLists => res.json( wishLists))
        .catch(err => res.json(err))
})

router.post('/', authenticateUser, (req, res) => {
    const body = req.body
    const { user } = req
    const  wishList = new  WishList(body)
     wishList.user = user._id
     wishList.save()
        .then( wishList => res.json( wishList))
        .catch(err => res.json(err))
})


router.get('/:id', authenticateUser, (req, res) => {
    const id = req.params.id
     WishList.findOne({
        _id: id,
        user: user._id
    })
        .then( wishList => {           
                res.json( wishList)
            
        })
        .catch(err => res.json(err))
})
router.put('/:id', authenticateUser, (req, res) => {
    const id = req.params.id
    const body = req.body
     WishList.findOneAndUpdate({
        id: id,
        user: user._id
    },
        { $set: body },
        { new: true, runValidator: true }
    )
        .then( wishList => res.json( wishList))
        .catch(err => res.json(err))
})

router.delete('/:id', authenticateUser, (req, res) => {
    const id = req.params.id
     WishList.findOneAndDelete({
        _id: id,
        user: user._id
    })
        .then( wishList => res.json( wishList))
        .catch(err => res.json(err))

})

const wishListRouter=router
module.exports=wishListRouter